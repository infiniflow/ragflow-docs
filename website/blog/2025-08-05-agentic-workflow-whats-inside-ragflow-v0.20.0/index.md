---
slug: agentic-workflow-whats-inside
title: Agentic Workflow - What's inside in RAGFlow 0.20.0
authors: InfiniFlow
tags: [agentic, agents, workflow]
---

![](./agentic_workflow.jpg)

## 1. From Workflow to Agentic Workflow

After a long wait, RAGFlow 0.20.0 has finally been released—a milestone update that completes the bigger picture of RAG/Agent. A year ago, RAGFlow introduced Agent functionality, but it only supported manually managed Workflows and lacked Agentic Workflow capabilities. By RAGFlow's definition, a true Agent requires both: Workflows for human-defined tasks and Agentic Workflows powered by LLM-driven automation. Anthropic’s 2024 article "Building Effective Agents" emphasized this distinction, noting that Workflows continue to be the primary way Agents are used. Now, in 2025, as LLMs become more advanced, Agentic Workflows are enabling more impressive use cases.

![Image](./agenticworkflow1.PNG)

Ideally, fully LLM-driven Agentic Workflows are the ultimate goal for most Agent applications. However, due to current limitations of LLMs, they introduce unpredictability and a lack of control—issues that are especially problematic in enterprise settings. On the other hand, traditional Workflows take the opposite approach: using low-code platforms where every variable, condition, and loop is explicitly defined. This allows non-technical business users to effectively “program” based on their understanding of the logic. While this ensures predictability, it often leads to overly complex, tangled workflows that are hard to maintain and prone to misuse. More importantly, it makes it difficult to properly break down and manage tasks. Therefore, the long-term solution requires both Agentic and manual Workflows working together in harmony. Only this unified approach can truly meet the demands of enterprise-level Agents.
With full Agent capabilities now in place, RAGFlow has become a more enterprise-ready, platform-level LLM engine. In the enterprise ecosystem, RAG occupies a role similar to traditional databases, while Agents serve as the specific applications—yet there are important differences. First, RAG focuses on leveraging unstructured data rather than structured datasets. Second, the interaction between RAG and Agents is much more frequent and intensive compared to typical application-database relationships because Agents need real-time, precise context to ensure their actions align closely with user intent. RAG plays a vital role in providing this context. For these reasons, completing the Agent capabilities is key to RAGFlow’s evolution.

![Image](./darkdata.PNG)

Let’s take a look at the key features of RAGFlow 0.20.0.

## 2. Key Updates in RAGFlow 0.20.0

The key features of this release include:

- Unified orchestration of both Agents and Workflows.
- A complete refactor of the Agent, significantly improving its capabilities and usability, with support for Multi-Agent configurations, planning and reflection, and visual features.
- Full MCP functionality, enabling MCP Server import, Agents to act as MCP Clients, and RAGFlow itself to function as an MCP Server.
- Access to runtime logs for Agents.
- Chat histories with Agents available via the management panel.

How does the updated Agent-building experience differ for developers?

Take the 0.19.1 customer service template as an example: previously, building this Workflow required seven types of components (Begin, Interact, Refine Question, Categorize, Knowledge Retrieval, Generate, and Message), with the longest chain for a category 4 question involving seven steps.

![Image](./old_flow.PNG)

In the new version, building in pure Workflow mode requires only five types of components (Begin, Categorize, Knowledge Retrieval, Agent, and Message), with the workflow for a category 4 question (product related) reduced to five steps.

![Image](./new_workflow.png)

With Agentic mode, just three types of components are needed - the original workflow logic can now be handled entirely through prompt engineering.

![Image](./agentic_mode.png)

Developers can inspect Agents' execution paths and verify their inputs/outputs.

![Image](./execution_path.png)

Business users can view Agents' reasoning processes through either the embedded page or chat interface.

![Image](./reasoning_process.png)

This comparison quantitatively demonstrates reduced complexity and improved efficiency. Further details follow below - we encourage you to try it yourself.

## 3. A unified orchestration engine for Agents

RAGFlow 0.20.0 introduces unified orchestration of both Workflow and Agentic Workflow. As mentioned earlier, these represent two extremes, but enterprise scenarios demand their collaboration. The platform now supports co-orchestration on one, inherently Multi-Agent canvas—users can designate uncertain inputs as Agentic Workflows and deterministic ones as Workflows. To align with common practice, Agentic Workflows are represented as separate Agent components on the canvas.
This release redesigns the orchestration interface and component functions around this goal, while also improving usability issues from earlier Workflow versions. Key improvements include reducing core Components from 12 to 10, with the main changes as follows:

![Image](./19vs20.jpg)

### Begin component

It now supports a task-based Agent mode that does not require a conversation to be triggered. Developers can build both conversational and task-based Agents on the same canvas.

![Image](./begin_component.png)

### Retrieval component

Retrieval can function as a component within a workflow and also be used as a Tool by an Agent component, enabling the Agent to determine when and how to invoke retrieval queries.

![Image](./retrieval_component.png)

### Agent component

![Image](./agent1.png)

An Agent capable of independently replacing your work needs to have the following abilities:

- Autonomous reasoning [1], with the capacity to reflect and adjust based on environmental feedback
- The ability to use tools to complete tasks [3]

With the new Agent component, developers only need to configure the Prompt and Tools to quickly build an Agent, as RAGFlow has already handled the underlying technical implementation.

![Image](./agent2.png)

Besides the single-agent mode, the new agent component also supports adding subagents that can be called during runtime.

![Image](./agent3.png)

You can freely add agents to build your own unlimited agent team.

![Image](./agent4.png)

Add and bulk import your already deployed MCP Servers.

![Image](./agent5.png)

Tools from added MCP Servers can be used within the agent.

![Image](./agent6.png)

### Await Response component

The original Interact component has been refactored into an await-response component, allowing developers to actively pause the process to initiate preset conversations and collect key information via forms.

![Image](./await_component.png)

### Switch component

Improved the usability of the switch component.

![Image](./switch_component.png)

### Iteration component

The input parameter type for the Iteration component has been changed to an array; during iteration, both the index and value are accessible to internal components, whose outputs can be formed into an array and passed downstream.

![Image](./iteration.png)

### Reply Message component

Messages can now be replied to directly via Reply Message, eliminating the need for the Interact component.

![Image](./reply.png)

### Text Processing component

Developers can easily concatenate strings through Text Processing.

![Image](./text1.png)

You can also split strings into arrays.

![Image](./text2.png)

### Summary

RAGFlow 0.20 enables simultaneous orchestration of both Agentic and Workflow modes, with built-in Multi-Agent support allowing multiple agents to coexist on a single canvas. For open-ended queries like “Why has company performance declined?” where the approach isn’t predetermined, users can define the process in Agentic style. In contrast, scenarios with clear, fixed steps use Workflow style. This lets developers build Agent applications with minimal configuration. The seamless integration of Agentic and Workflow approaches is the best practice for deploying enterprise-grade intelligent agents.

## 4. Application Ecosystem and Future Development

With a complete, unified no-code Agent framework in place, RAGFlow naturally supports a wide range of scenario-specific Agent applications—this is a major focus for its long-term development. In other words, a vast number of Agent templates will be built on top of RAGFlow, backed by our new ecosystem co-creation initiative.

RAGFlow 0.20.0 introduces Deep Research as a built-in template—an exceptional Agent that can serve both as a standalone application and as a foundation for building other intelligent agents. We will explain how to build the Deep Research template in detail in a forthcoming article.

The example below shows that on the RAGFlow platform, Deep Research can be created using either Agentic Workflow or traditional Workflow methods, with the former offering far greater flexibility and simplicity.
Deep Research built via a traditional Workflow:

![Image](./traditional.png)

Deep Research built with an Agentic Workflow shows significantly reduced complexity compared to the Workflow implementation above:

![Image](./agentic.png)

RAGFlow’s ecosystem initiative aims to provide enterprise-ready Agent templates embedded with industry know-how. Developers can easily customize these templates to fit their own business needs. Among these, Deep Research is the most important, as it represents the most common form of Agentic RAG and represents the essential path for Agents to unlock deeper value from enterprise data. Built on RAGFlow’s built-in Deep Research template, developers can quickly adapt it into specialized assistants—such as legal or medical advisors—significantly narrowing the gap between business systems and underlying infrastructure. This ecosystem approach is made possible by the close collaboration between RAG and Agents.
The 0.20.0 release marks a major step in integrating RAG and Agent capabilities within RAGFlow, with rapid updates planned ahead, including memory management and manual adjustment of Agent Plans. While unifying Workflow and Agentic Workflow greatly lowers the barriers to building enterprise Agents, and the ecosystem expands their application scope, the data foundation that merges structured and unstructured data around RAG remains the cornerstone of Agent capabilities. This approach is now known as “context engineering,” with traditional RAG representing its 1.0 version. Our future articles will explore these advancements in greater detail.

![Image](./context.png)

We welcome your continued support - star RAGFlow on GitHub: https://github.com/infiniflow/ragflow

## Bibliography

1. ReAct: Synergizing Reasoning and Acting in Language Models https://arxiv.org/abs/2210.03629
2. Reflexion: Language Agents with Verbal Reinforcement Learning https://arxiv.org/abs/2303.11366
3. A Practical Guide to Building Agents https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
