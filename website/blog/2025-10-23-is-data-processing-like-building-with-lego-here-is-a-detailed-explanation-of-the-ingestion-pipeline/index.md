---
slug: is-data-processing-like-building-with-lego-here-is-a-detailed-explanation-of-the-ingestion-pipeline
title: Is data processing like building with lego? Here is a detailed explanation of the ingestion pipeline.
tags: 
---

![](./toutu.PNG)

Since its open-source release, RAGFlow has consistently garnered widespread attention from the community. Its core module, DeepDoc, leverages built-in document parsing models to provide intelligent document-sharding capabilities tailored for multiple business scenarios, ensuring that RAGFlow can deliver accurate and high-quality answers during both the retrieval and generation phases. Currently, RAGFlow comes pre-integrated with over a dozen document-sharding templates, covering various business scenarios and file types.

However, as RAGFlow becomes increasingly widely adopted in production environments, the original dozen-plus fixed sharding methods have struggled to keep pace with the complex and diverse array of data sources, document structures, and file types encountered. Specific challenges include:

- The need to flexibly configure different parsing and sharding strategies based on specific business scenarios to accommodate varied document structures and content logic.
- Document parsing and ingestion involve not only segmenting unstructured data into text blocks but also encompass a series of critical preprocessing steps to bridge the "semantic gap" during RAG retrieval. This often requires leveraging models to enrich raw content with semantic information such as summaries, keywords, and hierarchical structures.
- In addition to locally uploaded files, a significant amount of data, files, and knowledge originate from various sources, including cloud drives and online services.
- With the maturation of multimodal vision-language models (VLMs), models like MinerU and Docling, which excel in parsing documents with complex layouts, tables, and mixed text-image arrangements, have emerged. These models demonstrate unique advantages across various application scenarios.

To address these challenges, RAGFlow 0.21.0 has introduced a groundbreaking Ingestion pipeline. This pipeline restructures the cleaning process for unstructured data, allowing users to construct customized data-processing pipelines tailored to specific business needs and enabling precise parsing of heterogeneous documents.

![](./1.PNG)

# Introduction to the Ingestion Pipeline

The Ingestion Pipeline is essentially a visual ETL process tailored for unstructured data. Built upon an Agent foundation, it restructures a typical RAG data ingestion workflow—which usually encompasses key stages such as document parsing, text chunking, vectorization, and index construction—into three distinct phases: Parser, Transformer, and Indexer. These phases correspond to document parsing, data transformation, and index construction, respectively.

- Document Parsing: As a critical step in data cleaning, this module integrates multiple parsing models, with DeepDoc being a representative example. It transforms raw unstructured data into semi-structured content, laying the groundwork for subsequent processing.
- Data Transformation: Currently offering two core types of operators, including Chunker and Transformer, this phase aims to further process the cleaned data into formats suitable for various index access methods, thereby ensuring high-quality recall performance.
- Index Construction: Responsible for the final data write-in. RAGFlow inherently adopts a multi-path recall architecture to guarantee retrieval effectiveness. Consequently, the Indexer incorporates multiple indexing methods, allowing users to configure them flexibly.

Below, we will demonstrate the construction and use of the Ingestion Pipeline through a specific example.

First, click on "Create agent" on the "Agent" page. You can choose "Create from blank" to create an Ingestion Pipeline from scratch:

![](./2.PNG)

Alternatively, you can select "Create from template" to utilize a pre-configured Ingestion pipeline template:

![](./3.PNG)

Next, we will begin to arrange various operators required for the Pipeline. When creating from scratch, only the Begin and Parser operators will be displayed on the initial canvas. Subsequently, you can drag and connect additional operators with different functions from the right side of the existing operators.

![](./4.png)

First, it is necessary to configure the Parser operator.

## Parser

The Parser operator is responsible for reading and parsing documents: identifying their layouts, extracting structural and textual information from them, and ultimately obtaining structured document data.

This represents a "high-fidelity, structured" extraction strategy. The Parser intelligently adapts to and preserves the original characteristics of different files, whether it's the hierarchical outline of a Word document, the row-and-column layout of a spreadsheet, or the complex layout of a scanned PDF. It not only extracts the main text but also fully retains auxiliary information such as titles, tables, headers, and footers, transforming them into appropriate data forms, which will be detailed below. This structured differentiation is crucial, providing the necessary foundation for subsequent refined processing.

Currently, the Parser operator supports input from 8 major categories encompassing 23 file types, summarized as follows:

![]()

When in use, simply click "Add Parser" within the Parser node and select the desired file category (such as PDF, Image, or PPT). When the Ingestion pipeline is running, the Parser node will automatically identify the input file and route it to the corresponding parser for parsing.

![](./6.npg)

Here, we provide further explanations for the parsers of several common file categories:

- For PDF files, RAGFlow offers multiple parsing model options, with a unified output in JSON format:

  1.Default DeepDoc: This is RAGFlow's built-in document understanding model, capable of recognizing layout, columns, and tables. It is suitable for processing scanned documents or those with complex formatting.
  2. MinerU: Currently an outstanding document parsing model in the industry. Besides parsing complex document content and layouts, MinerU also provides excellent parsing for complex file elements such as mathematical formulas.
  3. Naive: A pure text extraction method without using any models. It is suitable for documents with no complex structure or non-textual elements.

![](./7.png)
  
- For Image files, the system will by default invoke OCR to extract text from the image. Additionally, users can also configure VLMs (Vision Language Models) that support visual recognition to process them.

- For Audio files, it is necessary to configure a model that supports speech-to-text conversion. The Parser will then extract the textual content from the Audio. Users can configure the API keys of model providers that support this type of parsing on the "Model provider" page of the homepage. After that, they can return to the Parser node and select it from the dropdown menu. This "configure first, then select" logic also applies to PDF, Image, and Video files.

- For Video files, it is necessary to configure a large model that supports multimodal recognition. The Parser will invoke this model to conduct a comprehensive analysis of the video and output the results in text format.

- When parsing Email files, RAGFlow provides Field options, allowing users to select only the desired fields, such as "subject" and "body." The Parser will then precisely extract the textual content of these fields.

![](./8.png)

- The Spreadsheet parser will output the file in HTML format, preserving its row and column structure intact to ensure that the tabular data remains clear and readable after conversion.
- Files of Word and PPT types will be parsed and output in JSON format. For Word files, the original hierarchical structure of the document, such as titles, paragraphs, lists, headers, and footers, will be retained. For PPT files, the content will be extracted page by page, distinguishing between the title, main text, and notes of each slide.
- The Text & Markup category will automatically strip formatting tags from files such as HTML and MD (Markdown), outputting only the cleanest text content.

##

##

##

#

##

#

#
