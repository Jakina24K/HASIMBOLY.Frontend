# 🌱 HASIMBOLY — Intelligent Agriculture Platform

**An AI-powered agricultural platform combining Machine Learning and Semantic Web technologies to support crop disease identification and context-aware crop recommendations in Madagascar.**

---

## 📌 Overview

HASIMBOLY is an intelligent agriculture project designed to support farmers and agricultural stakeholders in making better-informed decisions about crop production and plant health.

Agriculture plays a major role in Madagascar's economy and livelihoods. However, farmers face several challenges, including plant diseases, changing climatic conditions, soil variability, and limited access to agricultural knowledge.

HASIMBOLY addresses these challenges through the integration of two complementary Artificial Intelligence approaches:

- **Machine Learning:** for identifying plant diseases from leaf images and providing relevant treatment and prevention information.
- **Semantic Web:** for recommending suitable crops based on geographical location, soil characteristics, seasonal conditions, and climate-related factors.

By combining predictive models with structured agricultural knowledge, HASIMBOLY aims to provide relevant, explainable, and context-aware assistance for agricultural decision-making.

## 🎯 Project Objectives

The main objectives of HASIMBOLY are:

- Develop an intelligent system capable of identifying plant diseases from images.
- Provide relevant treatment and prevention recommendations based on the detected disease.
- Build a knowledge-based crop recommendation system adapted to Madagascar's agricultural conditions.
- Structure agricultural knowledge using ontologies and Semantic Web standards.
- Explore the integration of Machine Learning and knowledge representation in a practical agricultural application.

## 🚀 Core Features

### 1. Plant Disease Detection

The platform uses a Machine Learning model based on image classification to identify potential plant diseases from submitted leaf images.

**Main capabilities:**
- Image-based plant disease identification.
- Image preprocessing and classification.
- Prediction of the most likely disease.
- Display of relevant disease information.
- Access to associated treatment and prevention recommendations.

**Workflow:**

```text
Leaf Image
    |
    v
Image Preprocessing
    |
    v
Machine Learning Model
    |
    v
Disease Classification
    |
    v
Disease Information
    |
    +------> Treatment Recommendations
    |
    +------> Prevention Guidelines
```

### 2. Intelligent Crop Recommendation

HASIMBOLY also provides a crop recommendation approach based on agricultural and environmental conditions.

Rather than relying exclusively on predefined recommendations, this component uses an agricultural knowledge base represented through an ontology.

**Recommendation criteria include:**
- Geographical region.
- Soil characteristics.
- Growing season.
- Climate conditions.
- Agricultural requirements of different crops.

The system uses SPARQL queries to retrieve relevant knowledge and identify crops associated with the provided conditions.

**Workflow:**

```text
User Input
    |
    v
Agricultural Conditions
    |
    +------> Region
    +------> Soil Type
    +------> Season
    +------> Climate
    |
    v
Ontology / Knowledge Base
    |
    v
SPARQL Queries
    |
    v
Crop Recommendation Results
```

## 🧠 Technical Approach

HASIMBOLY combines two different approaches to Artificial Intelligence.

### Machine Learning

The disease detection component relies on supervised image classification techniques.

The general development process includes:

1. Agricultural image dataset collection.
2. Image preprocessing and preparation.
3. Model training and experimentation.
4. Model evaluation.
5. Integration of the trained model into the backend.
6. Association of predicted diseases with treatment and prevention knowledge.

### Semantic Web

The crop recommendation component uses knowledge representation technologies to organize agricultural information.

The knowledge base is structured around agricultural concepts such as:

- Crops
- Soil types
- Regions
- Seasons
- Climate conditions
- Plant diseases
- Agricultural requirements

The ontology is designed using **Protégé** and represented through OWL/RDF standards. **Apache Jena Fuseki** provides the SPARQL endpoint used to query the agricultural knowledge base.

This approach makes it possible to represent relationships between agricultural concepts and retrieve recommendations based on multiple conditions.

## 🏗️ System Architecture

The project follows a modular architecture in which the backend coordinates communication between the application, the database, the Machine Learning component, and the Semantic Web knowledge base.

```text
                 Frontend
                     |
                     v
               Django Backend
                     |
          +----------+----------+
          |          |          |
          v          v          v
      Database   ML Model    Fuseki Server
   (PostgreSQL)    |             |
                   |             v
                   |        OWL Ontology
                   |             |
                   |         SPARQL
                   |             |
                   +-------------+
                         |
                         v
                  Application Results
```

Each component has a specific responsibility:

| Component | Responsibility |
|---|---|
| Frontend | User interaction and presentation of results |
| Django | Business logic, API endpoints and component integration |
| PostgreSQL | Application data storage |
| Machine Learning | Plant disease image classification |
| Protégé | Ontology design and knowledge modeling |
| Apache Jena Fuseki | RDF dataset hosting and SPARQL querying |

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React Native |
| Backend | Python, Django |
| Database | PostgreSQL |
| Machine Learning | Python, Deep Learning, CNN |
| Knowledge Representation | OWL, RDF |
| Ontology Development | Protégé |
| Semantic Querying | SPARQL |
| Semantic Web Server | Apache Jena Fuseki |
| Development Tools | Git, GitHub, Google Colab |

## 👥 Team & Contributions

HASIMBOLY is a collaborative academic project developed by a multidisciplinary team of seven members.

The work is organized around several complementary areas:

- Frontend development.
- Backend development and API integration.
- Machine Learning and image classification.
- Semantic Web and ontology engineering.
- Database design and management.
- System integration and testing.
- Agricultural data collection and documentation.

### My Contributions

My responsibilities within the project include:

- Researching and collecting agricultural information from documentary and institutional sources.
- Studying plant diseases, their symptoms, and associated treatment and prevention practices.
- Contributing to the design of the Machine Learning approach for plant disease identification.
- Exploring image classification techniques for agricultural applications.
- Working on the relationship between disease identification and agricultural recommendations.

## 🌍 Project Context

HASIMBOLY is specifically oriented toward the agricultural context of Madagascar.

The agricultural knowledge used in the project is informed by documentary research, including publications and resources from organizations such as:

- [FAO — Food and Agriculture Organization](https://www.fao.org/)
- [CIRAD — French Agricultural Research Centre for International Development](https://www.cirad.fr/)

These resources provide information about regional agricultural production, crop cultivation systems, soil conditions, and climate-related challenges.

## 🔬 Project Status

HASIMBOLY is an academic research and development project.

Its development focuses on the implementation and integration of its two main intelligent components: plant disease detection and context-aware crop recommendation.

The project also provides an opportunity to explore how Machine Learning and Semantic Web technologies can complement each other in addressing real-world agricultural challenges.

## 🔮 Future Improvements

Potential future improvements include:

- Expanding the plant disease image dataset.
- Improving model accuracy and evaluating performance on real-world images.
- Extending the agricultural knowledge base to cover more regions and crop varieties in Madagascar.
- Incorporating additional agronomic data from agricultural experts and field observations.
- Implementing a crowdsourcing mechanism to allow farmers to contribute agricultural information.
- Improving the explainability and traceability of crop recommendations.
- Strengthening offline accessibility for users in areas with limited Internet connectivity.

## 🎓 Academic Project

HASIMBOLY explores the practical application of Artificial Intelligence, Machine Learning, and Semantic Web technologies to agricultural challenges.

**Project focus:** Smart Agriculture · Artificial Intelligence · Deep Learning · Semantic Web · Knowledge Representation

---

*Developed collaboratively as part of an academic project.*
