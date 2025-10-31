---
slug:ragflow in practice an intelligent agent for in depth research on company research reports
title:ragflow in practice an intelligent agent for in depth research on company research reports
tags:
---

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

### 2.3.1 Yahoo Finance Tools: Request for Financial Data

By using the "Yahoo Finance Tools" node, select "Balance sheet" and pass the `stockCode` output by the upstream Agent as a parameter. This allows you to fetch the core financial indicators of the corresponding company.

The returned results contain key data such as total assets, total equity, and tangible book value, which are used to generate the "Company Financial Statements" feature.

![]()

### 2.3.2 Financial table generation by Code node

Utilize the Code node to perform field mapping and numerical formatting on the financial data returned by Yahoo Finance Tools through Python scripts, ultimately generating a Markdown table with bilingual indicator comparisons, enabling a clear and intuitive display of the "Company Financial Statements."

![]()

Code:

```
import re

def format_number(value: str) -> str:
    """Convert scientific notation or float to formatted number with commas."""
    try:
        num = float(value)
        if num.is_integer():
            return f"{int(num):,}"
        else:
            return f"{num:,.2f}"
    except:
        return value  # Return as is if not a number (e.g., — or empty)

def extract_md_table_single_column(input_text: str) -> str:
    # Core financial indicators (English only)
    indicators = [
        "Total Assets",
        "Total Equity",
        "Tangible Book Value",
        "Total Debt",
        "Net Debt",
        "Cash And Cash Equivalents",
        "Working Capital",
        "Long Term Debt",
        "Common Stock Equity",
        "Ordinary Shares Number"
    ]

    # Units for each indicator
    unit_map = {
        "Total Assets": "USD",
        "Total Equity": "USD",
        "Tangible Book Value": "USD",
        "Total Debt": "USD",
        "Net Debt": "USD",
        "Cash And Cash Equivalents": "USD",
        "Working Capital": "USD",
        "Long Term Debt": "USD",
        "Common Stock Equity": "USD",
        "Ordinary Shares Number": "Shares"
    }

    lines = input_text.splitlines()

    # Detect header line containing dates
    date_pattern = r"\d{4}-\d{2}-\d{2}"
    header_line = ""
    for line in lines:
        if re.search(date_pattern, line):
            header_line = line
            break

    if not header_line:
        raise ValueError("No header line with date found.")

    dates = re.findall(date_pattern, header_line)
    first_date = dates[0]  # Use only the first column (latest or leftmost date)
    header = f"| Key Indicator | {first_date} |"
    divider = "|-------------------------|---------------|"

    rows = []
    for ind in indicators:
        unit = unit_map.get(ind, "")
        display_name = f"{ind} ({unit})" if unit else ind

        found = False
        for line in lines:
            if ind in line:
                # Match numeric value (float, int, or scientific)
                pattern = r"(nan|[0-9\.]+(?:[eE][+-]?\d+)?)"
                values = re.findall(pattern, line)
                # Clean up value
                first_value = values[0].strip() if values and values[0].strip().lower() != "nan" else "—"
                first_value = format_number(first_value) if first_value != "—" else "—"
                rows.append(f"| {display_name} | {first_value} |")
                found = True
                break
        if not found:
            rows.append(f"| {display_name} | — |")

    md_table = "\n".join([header, divider] + rows)
    return md_table

def main(input_text: str):
    return extract_md_table_single_column(input_text)
```

We have also received requests from everyone expressing a preference not to extract JSON fields through coding, and we will gradually provide solutions in future versions.

## 2.4

### 2.4.1

### 2.4.2

## 2.5

## 2.6

## 2.7

# Summary and Outlook
