---
slug: context-as-infrastructure-walkthrough-of-arxiv-paper
title: 'Context as Infrastructure: A Walkthrough of Our Latest arXiv Paper on Knowledge Compilation'
tags: [Insights]
draft: true
---

**Subtitle: A Paper Walkthrough — From the Failure of Structured Artifacts to the Economics of Evidence Chains**

If you are still building systems with the classic Naive RAG pipeline—“chunk documents → embed them → compute similarity → stuff into Prompt”—you will inevitably hit a dead end. No matter how much you upgrade your embedding models or fine-tune your chunking strategies, your system will simply fail to "search accurately" when faced with complex questions.

Why? Because Naive RAG has a fatal architectural flaw at its core: **it attempts to solve a "multi-step exploration" problem with "single-shot retrieval."**

In real-world enterprise scenarios, user queries often come with vague preconditions, or they require stitching together facts across multiple documents. The biggest issue with single-shot vector matching is that it's essentially **"grasping in the dark."** Once the first round of retrieval misses the chunk containing the answer, it doesn't matter how powerful the generation model is; it is helpless. Even if you add Reranking and Hybrid Search, you are still just tinkering within the realm of single-shot queries.

The biggest drawback of this approach is that it **sacrifices the LLM's role as the "reasoning hub"** of the entire task. If you only use a static retriever to match vocabulary or vectors, you are essentially downgrading the LLM into a machine that only reads literal meanings—excelling at local performance but weak in global reasoning. Once a task requires multi-step exploration, accuracy will inevitably collapse. This is why in complex production environments, **Agentic Search is the only way to guarantee accuracy.**

Since LLMs already possess powerful reasoning and instruction-following capabilities, why force them to roll the dice with a "single match"? It's better to hand them the steering wheel and let the model search for itself. It writes a lexical query, reads the results, realizes it's on the wrong track, and reformulates the query or narrows the scope until it has gathered sufficient evidence to answer.

This autonomous **"Search → Read → Reformulate"** loop completely liberates RAG from a rigid assembly line. When the Agent is in control of its own loop, you'll notice an interesting phenomenon: **the underlying retrieval algorithm suddenly seems far less critical.**

An Agent equipped with only BM25 and Grep often outperforms a heavily fine-tuned vector database in terms of accuracy. The reason is simple: the Agent has already taken over the semantic understanding within its loop. The underlying Grep only needs to provide the most authentic "localization primitive" without any semantic bias.

In this context, **Search has fundamentally become a Harness problem**, rather than an indexing algorithm problem. The Harness orchestrates the loop, manages the constraints, and decides what goes into the context; the underlying retrieval just needs to be a reliable localization tool. However, the Harness is still a very new concept, and the industry is still exploring what kind of architecture truly empowers an Agent.

A highly intuitive hypothesis emerges: since the Harness is so powerful, what if we equip it with more sophisticated "structured gear"—like a RAPTOR summary tree, a PageIndex directory, or a GraphRAG knowledge graph? Would it make the Agent even more unstoppable and accurate?

In our latest paper submitted to arXiv, ***"Context as Infrastructure: Knowledge Compilation for Retrieval in Agentic Systems with Harnesses,"*** we rigorously falsified this intuition through ablation studies.

As a paper walkthrough, this article won't teach you how to write code. Instead, it breaks down the two most critical findings of the paper for you: **First, why do structured artifacts fail to improve accuracy? Second, if they don't improve accuracy, why is knowledge compilation still a highly profitable commercial endeavor?**

---

### I. Why Are BM25 + Grep Sufficient?

Before discussing "addition," we must first look at the baseline.

The baseline in the paper is remarkably clean: **Only BM25 + Grep, zero vector indexes, zero compiled indexes, and MiniMax M3 as the answering model.**

In this incredibly "naive" configuration, the Harness achieved **85%** accuracy on the highly complex multi-hop dataset BrowseComp-Plus, and **91%** on FRAMES.

This proves a core fact: **In a Harness architecture, vector search is no longer the default necessity.** Vector search was originally designed to solve the "vocabulary mismatch" problem when humans input short queries. But Agents are different. Through repeated iterations, reformulations, and added constraints (as OpenAI's analysis revealed, Agents love using exact quoted searches), they bridge the vocabulary gap themselves. BM25 is weak in single-shot retrieval, but it is extremely robust inside the Agent Loop because it provides the most precise, explainable anchor. The LLM handles the rest of the semantic reasoning.

**So, is vector search completely useless now?**

Not at all. Vector search hasn't disappeared; it has simply retreated to where it belongs.

For pure "finding the original text" tasks, BM25 + Grep is good enough. But in scenarios where semantic recall is truly irreplaceable, vectors still matter. For instance, in the knowledge compilation system proposed in the paper, if you need to recall extracted **Claims**, since the wording of user queries and the phrasing of claims often differ vastly, directly applying Hybrid Search (BM25 + Vector) to the Claims makes perfect sense. On the BrowseComp-Plus Leaderboard, top-performing solutions also employ ColBERT-based MultiVector approaches. Currently, RAGFlow does not adopt these due to the storage bloat caused by MultiVector, which requires more efficient compression solutions. However, these remain valuable options for the future.

---

### II. Why Do Structured Artifacts Fail Collectively?

Since the baseline is so high, we attempted to mount mainstream "structured methods" onto the same Harness to find the incremental gains for "searching more accurately":

1.  **RAPTOR-style summary trees**: Accuracy neutral (no significant improvement).
2.  **LLM Wiki**: Accuracy neutral.
3.  **Entity-Relation Graph (GraphRAG style)**: Accuracy neutral.
4.  **PageIndex-style outlines**: Not only showed no improvement, but actually degraded negatively at scale.

The conclusion is clear: **Under a competent Harness, structured artifacts do not yield detectable accuracy gains.** Why? Because the Harness itself is adaptive; BM25 + Grep serves as on-demand localization. Static structures merely "describe" the original text without adding any new facts. The deeper the hierarchy, the more severely errors compound.

This "failure" conclusion is crucial. It forces us to step away from the obsession with "accuracy" and look for the true value of knowledge compilation.

---

### III. The True Core Finding: The Token Economics of Knowledge Compilation

If knowledge compilation cannot improve accuracy, what is the point of its existence?

The paper shifts its focus from "accuracy" to "cost" and identifies a mechanism that generates massive positive returns: **knowledge compilation using Claim-Evidence pairs as leaf nodes.**

This does not treat the tree as a retriever, but as a carrier: the tree organizes (providing chapter hierarchies), while the evidence-chain leaf nodes compress (providing "atomic claims + verbatim text citations"). Before the Agent Harness reads the original Chunk, it first reads the Claim/Evidence. If the evidence is deemed consistent with the question, it answers directly, bypassing the need to read the Chunk entirely.

Empirical data reveals a powerful **"asymmetric economics"**:
*   **On a hit**: A single question saves **91%** of Tokens.
*   **On a miss**: The Agent still reads the original Chunk, increasing Token consumption by only about **2%**.
*   **On average**: Across FRAMES, it saves an average of **38%** of Tokens.

This data leads to a highly commercially valuable conclusion:
Assume the compilation cost is \(C\) across \(N\) queries. As long as the hit rate exceeds **2%** (the break-even point), the compilation cost is covered by the query savings. In actual complex multi-hop scenarios, because we use an extremely cheap model (GLM-4-Flash) for evidence extraction, the measured hit rate approaches **43%**.

**As long as the hit rate exceeds 2%, it is a guaranteed profitable trade.** This is the economic foundation of knowledge compilation. It is not responsible for making things "more accurate"; it is responsible for making them "cheaper."

---

### IV. What Engineering Disciplines Are Required to Achieve This Economics?

Since the goal is to "save Tokens," the core principle of the system architecture becomes: **The evidence entering the context must be the smallest sufficient set for the current moment.**

The paper breaks down the engineering disciplines required by the Harness to achieve this:

1.  **Evidence Gate**: This is the true closed loop of Token compression. It does not rerank; it answers, "Is it necessary to send this batch of evidence to the LLM right now?" If sufficient, it passes through; if not, the entire block is discarded (not written into the system prompt, nor assigned citation numbers). **Deciding *not* to send saves more Tokens than *sending better*.** The Evidence Gate is also where Jev-style decision models are truly valuable.
2.  **Deciding Not to Read**: Before deep reading, use Claim/Evidence to judge whether it is already sufficient to answer. If so, do not read the Chunk.
3.  **Mechanical Citation**: Evidence receives its number at the moment of delivery to the model, avoiding repeated model deduction and reducing hallucination and retry costs.
4.  **Channel Isolation**: Strict separation between raw text and derived content ensures every hit on the evidence chain is traceable and auditable.

**Engineering Infrastructure: How is Grep Actually Implemented?**

At this point, many architects will naturally ask: if we rely solely on Grep at the bottom, won't the CPU melt down when the corpus reaches millions of documents and the Agent fires multiple regex queries per second?

Of course not. In RAGFlow 1.0, Grep is engineered as an engine-level **"candidate set generation mechanism."** On both mainstream retrieval engines, it is not a naive full-table scan:

*   **On Elasticsearch**: RAGFlow utilizes ES's `regexp` query, pushing the regex down to execute inside Lucene. This means the regex directly participates in candidate pruning within the inverted index, and only the hit candidate documents enter the regex engine for exact validation.
*   **On Infinity**: It leverages its built-in Sparse n-gram analyzer. It first uses a sparse n-gram index to circle a batch of "possible matching" candidates, then uses the full regex to verify them. This ensures that even high-frequency regex queries will not cripple the system's response speed.

**This is the engineering confidence behind why BM25 + Grep can truly be "All You Need."**

---

### V. Conclusion: From "Better" to "Cheaper"

This paper uses rigorous data to shatter an industry myth: **Do not attempt to use complex structures to improve accuracy, because in the face of a powerful Harness, the baseline retrieval accuracy is already high enough.**

It brings us a brand-new perspective: In the Agentic era, **Search is a Harness problem, while knowledge compilation is an economics problem.**

The best knowledge compilation is not about building a perfect tree, but about extracting **evidence chains** with real textual provenance. Because it can cut Token consumption by more than half without compromising accuracy. This is the reason why "Context as Infrastructure" can truly be grounded in engineering and commerce.

If you are interested in the Token cost model, gate design details, and complete ablation data across different evaluation sets, I highly recommend reading the full paper.

**Paper Link**: [Context as Infrastructure: Knowledge Compilation for Retrieval in Agentic Systems with Harnesses. arXiv:2610.41172](https://arxiv.org/abs/2610.41172)