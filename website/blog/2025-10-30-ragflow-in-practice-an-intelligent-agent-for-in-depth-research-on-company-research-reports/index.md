
![]()

# Background

In the actual work of the investment research department of financial institutions, analysts are exposed to a vast amount of industry and company analysis reports, third-party research data, and real-time market dynamics on a daily basis, with diverse and scattered information sources. The job of financial analysts is to swiftly formulate clear investment recommendations based on the aforementioned information, such as specifically recommending which stocks to buy, how to adjust portfolio allocations, or predicting the next direction of an industry. Therefore, we have developed the "Intelligent Investment Research Assistant" to help financial analysts quickly organize information. It can automatically capture company data, integrate financial indicators, and compile research report viewpoints, enabling analysts to determine within minutes whether a stock is worth buying, eliminating the need to sift through piles of materials and allowing them to focus their time on genuine investment decision-making. To achieve this goal, we have designed a comprehensive technical process.

The technical solution revolves around a core business process:

When an analyst poses a question, the system identifies the company name or abbreviation from the question and retrieves the corresponding stock code with the assistance of a search engine. If identification fails, a prompt is returned directly with the company code. After successfully obtaining the stock code, the system retrieves the company's core financial indicators from data interfaces, organizes and formats the data, and generates a clear financial table. Building on this, intelligent analysis further integrates research report information: on one hand, it gathers the latest authoritative research reports and market viewpoints, and on the other hand, it retrieves relevant research report content from the internal knowledge base. Ultimately, these organized financial data and research report information are combined into a comprehensive response, facilitating analysts in quickly reviewing key indicators and core viewpoints.

The workflow after orchestration is as follows:

![]()

This case utilizes RAGFlow to implement a complete workflow, ranging from stock code extraction, to the generation of company financial statements, and finally to the integration and output of research report information.

The following sections will provide a detailed introduction to the implementation process of this solution.

# 1. Preparing the Knowledge Base

## 1.1 Create a knowledge base

The dataset required for this example can be downloaded from *Hugging Face Datasets*[^1].

![]()

Create an "Internal Stock Research Report" knowledge base and import the corresponding dataset documents.

![]()

## 1.2 Parse documents

For the documents in the "Internal Stock Research Report" knowledge base, we have selected the parsing and slicing method called Paper.

![]()

Research report documents typically include modules such as abstracts, core viewpoints, thematic analyses, financial forecast tables, and risk warnings. The overall structure follows a more thesis-like logical progression rather than a strictly hierarchical table of contents. If sliced based on the lowest-level headings, it can easily disrupt the coherence between paragraphs and tables.

Therefore, RAGFlow is better suited to adopt the "Paper" slicing approach, using chapters or logical paragraphs as the fundamental units. This approach not only preserves the integrity of the research report's structure but also facilitates the model's quick location of key information during retrieval.

The preview of the sliced financial report is as follows:

![]()

# 2. Building the Intelligent Agent

## 2.1 Create an application.

After successful creation, the system will automatically generate a "Start" node on the canvas.

![]()

In the "Start" node, you can set the initial greeting of the assistant, for example: "Hello! I'm your stock research assistant."

![]()

## 2.2 Build the function of "Extract Stock Codes"

### 2.2.1 Agent extracts stock codes

![]()

Use an Agent node and attach a TavilySearch tool to identify stock names or abbreviations from the user's natural language input and return a unique standard stock code. When no match is found, uniformly output "Not Found."

In financial scenarios, users' natural language is often ambiguous. For example:

- "Help me check the research report on Apple Inc."
- "How is NVIDIA's financial performance?"
- "What's the situation with the Shanghai Composite Index today?"

These requests all contain stock-related information, but the system can only further query financial reports, research reports, or market data after accurately identifying the stock code.

This is why we need an Agent with the function of "extracting stock codes."

Below is the system prompt for this Agent:

```
<role> 

Your responsibility is: to identify and extract the stock name or abbreviation from the user's natural language query and return the corresponding unique stock code. 

</role> 



<rules> 

1. Only one result is allowed: - If a stock is identified → return the corresponding stock code only; - If no stock is identified → return “Not Found” only. 

2. **Do not** output any extra words, punctuation, explanations, prefixes, suffixes, or newline prompts. 3. The output must strictly follow the <response_format>. </rules>


<response_format>
Output only the stock code (e.g., AAPL or 600519)
Or output “Not Found”
</response_format>


<response_examples>
User input: “Please check the research report for Apple Inc.” → Output: AAPL
User input: “How is the financial performance of Moutai?” → Output: 600519
User input: “How is the Shanghai Composite Index performing today?” → Output: Not Found
</response_examples>


<tools> - Tavily Search: You may use this tool to query when you're uncertain about the stock code. - If you're confident, there's no need to use the tool. 

</tools> 



<Strict Output Requirements> - Only output the result, no explanations, prompts, or instructions allowed. - The output can only be the stock code or “Not Found,” otherwise, it will be considered an incorrect answer.

 </Strict Output Requirements>
```

### 2.2.2 Conditional node for identifying stock codes

![]()

Use a conditional node to evaluate the output result of the previous Agent node and guide the process flow based on different outcomes:

- If the output is a stock code: It indicates successful identification of the stock, and the process will proceed to the "Case1" branch.
- If the output contains "Not Found": It indicates that no valid stock name was identified from the user's input, and the process will proceed to the "Else" branch, where it will execute a node for replying with an irrelevant message, outputting "Your query is not supported."

![]()

## 2.3 Build the "Company Financial Statements" feature

The data for this feature is sourced from financial data provided by Yahoo Finance. By calling this API, we obtain core financial data for specified stocks, including operating revenue, net profit, etc., which drives the generation of the "Company Financial Statements."

![]()

### 2.3.1

### 2.3.2

## 2.4

### 2.4.1

### 2.4.2

## 2.5

## 2.6

## 2.7

# Summary and Outlook
