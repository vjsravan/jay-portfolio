export const personalInfo = {
  name: "Jay Sravan Vadlamudi",
  title: "Sr. Software Development Engineer",
  subtitle: "Java Full Stack · Distributed Systems · AI Engineering",
  email: "jay.sravan.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/jaysravan-fullstack/",
  github: "https://github.com/vjsravan",
  location: "New Jersey, USA",
  yearsOfExperience: 5,
  summary: `Senior Software Engineer with 5+ years of experience designing and scaling distributed systems
across logistics and financial domains. Specialized in Java, Spring Boot, Reactive Systems, and
Microservices Architecture, with strong expertise in event-driven platforms, cloud-native deployments,
and high-throughput processing. Delivered measurable impact including 30–40% performance gains,
50% faster deployments, and 99.9% system reliability across mission-critical platforms handling
100K+ transactions weekly. Actively targeting AI Engineering roles — passionate about building
intelligent, data-driven systems.`,
  aiSummary: `Production-grade distributed systems at scale: 25+ microservices at UPS, reactive pipelines with
Project Reactor, LLM-based portfolio AI assistant, MLflow/MLops integrations, and GitHub Copilot at
enterprise scale. Goal: Java Full Stack → AI/ML Engineering Lead.`,
};

export const skills = {
  languages: ["Java 8/11/21", "TypeScript", "JavaScript ES6+", "Python", "SQL", "basic C#"],
  frontend: ["Angular 17", "React.js", "Vaadin", "Redux", "HTML5", "CSS3", "Bootstrap", "Material UI"],
  backend: [
    "Spring Boot", "Spring WebFlux", "Project Reactor (Mono/Flux)", "Spring MVC",
    "Spring Cloud", "Spring Security", "Apache Camel",
    "Hibernate", "JPA", "JDBC", "SimpleJdbcCall",
    "WebClient", "RESTful APIs", "SOAP", "Microservices Architecture",
  ],
  ai: [
    "TensorFlow", "MLflow", "MLops", "Scikit-learn",
    "GitHub Copilot", "ChatGPT (GPT-4/5)", "LLM Prompt Engineering",
    "OpenAI API", "RAG Concepts", "Vector Embeddings",
    "AI Log Summarization", "Agent-based Workflows",
  ],
  cloud: [
    "OpenShift", "Docker", "Kubernetes", "Jenkins",
    "Azure DevOps (YAML)", "ArgoCD", "Helm", "JFrog",
    "AWS (EC2, S3, Lambda)", "GitOps",
  ],
  databases: ["PostgreSQL", "MySQL", "DB2", "SQL Server", "MongoDB", "Redis", "Elasticsearch"],
  messaging: ["Apache Kafka", "RabbitMQ", "Google Pub/Sub", "ActiveMQ", "JMS"],
  testing: ["JUnit 5", "Mockito", "Postman", "Selenium", "SonarQube", "ELK Stack", "Grafana", "Swagger / OpenAPI"],
  security: ["OAuth 2.0", "JWT", "HashiCorp Vault", "Spring Security", "TLS/SSL", "API Gateway"],
};

export const experiences = [
  {
    id: 1,
    company: "United Parcel Service (UPS)",
    role: "Sr. Software Development Engineer – Java Full Stack",
    domain: "Logistics – International Customs Processing",
    location: "Parsippany, NJ",
    period: "Mar 2024 – Present",
    current: true,
    color: "#06b6d4",
    logo: "📦",
    tech: [
      "Java 21", "Spring Boot", "Spring WebFlux", "Project Reactor",
      "Angular 17", "Vaadin", "Hibernate", "JPA", "SimpleJdbcCall",
      "MySQL", "DB2", "Google Pub/Sub", "ActiveMQ", "Apache Kafka",
      "Docker", "Kubernetes", "OpenShift", "Jenkins",
      "Azure DevOps", "ArgoCD", "Helm", "JFrog",
      "OAuth 2.0", "JWT", "HashiCorp Vault", "ELK Stack", "Grafana",
    ],
    achievements: [
      { metric: "25+", desc: "Microservices powering international customs (UK, UAE, Canada)" },
      { metric: "30%", desc: "Reduction in end-to-end processing latency" },
      { metric: "40%", desc: "Faster throughput via reactive (Mono/Flux) pipelines" },
      { metric: "50%", desc: "Deployment time cut via CI/CD automation (Jenkins + ArgoCD)" },
      { metric: "99.9%", desc: "Uptime for mission-critical customs message delivery" },
      { metric: "100k+", desc: "Weekly transactions traced with MDC & WebClient observability" },
    ],
    highlights: [
      "Architected and delivered 25+ microservices powering international customs processing across UK, UAE, and Canada lanes, reducing latency by 30%",
      "Built reactive pipelines with Project Reactor (Mono/Flux), enabling 40% faster non-blocking throughput across high-volume customs workflows",
      "Designed scalable event-driven integrations using Google Pub/Sub and ActiveMQ, achieving 99.9% uptime for mission-critical message delivery",
      "Engineered modular REST APIs and service layers using Spring Boot and WebFlux, reducing onboarding time for new customs rules by 25%",
      "Optimised async communication using Spring WebClient with MDC tracing, improving observability for 100K+ weekly transactions",
      "Developed high-performance DAO abstractions using SimpleJdbcCall and RowMapper, improving DB response time by 20% across MySQL and DB2 services",
      "Applied Strategy Pattern for country-specific customs logic, improving scalability and reducing maintenance overhead by 30%",
      "Introduced 15-minute TTL caching, reducing database load and improving UI retrieval speed by 40%",
      "Implemented interceptor-based validation and global exception handling, reducing error-handling latency by 35%",
      "Led GitOps deployments on OpenShift using ArgoCD and Helm; automated CI/CD via Jenkins, Azure DevOps YAML, and Docker — cutting deployment time by 50%",
      "Strengthened platform security using OAuth 2.0, JWT, and HashiCorp Vault with JFrog artifact governance",
      "Built Angular 17 operational dashboards for customs users, reducing manual lookup effort by 50%",
      "Designed an internal end-to-end developer testing platform using Vaadin and Java 21 to simulate agency flows and accelerate validation",
      "Created a shared parent POM to standardise builds across services; provided on-call production support with root-cause analysis",
    ],
    aiWork: [
      "LLM-based log summarisation prototype for customs error root-cause analysis",
      "GitHub Copilot for AI-assisted code refactoring and test generation at enterprise scale",
      "MDC tracing + ELK Stack observability on 100K+ weekly transaction logs",
    ],
  },
  {
    id: 2,
    company: "Mercedes-Benz Financial Services",
    role: "Software Engineer – Java Full Stack",
    domain: "Automotive Finance & Leasing Platforms",
    location: "Farmington Hills, MI",
    period: "Mar 2022 – Jul 2024",
    current: false,
    color: "#8b5cf6",
    logo: "🚗",
    tech: [
      "Java 17", "Spring Boot", "Spring MVC", "Angular", "React.js",
      "TypeScript", "DB2", "PostgreSQL", "SQL Server",
      "OAuth 2.0", "JWT", "Docker", "Grafana", "Kibana",
      "Jenkins", "Maven",
    ],
    achievements: [
      { metric: "Migration", desc: "Struts → Spring Boot modernisation, improving agility & scale" },
      { metric: "5–10", desc: "Applications independently deployed and managed in production" },
      { metric: "Full", desc: "End-to-end ownership: design → dev → test → deploy → support" },
      { metric: "Secure", desc: "OAuth 2.0 & JWT aligned with financial compliance requirements" },
    ],
    highlights: [
      "Modernised legacy Struts-based applications by migrating them to Spring Boot microservices, improving maintainability and release agility",
      "Designed and developed backend services and REST APIs supporting finance workflows, customer operations, and downstream integrations",
      "Built dynamic Angular and React user interfaces for internal and customer-facing workflows",
      "Implemented OAuth 2.0 and JWT-based authentication aligned with financial security and compliance requirements",
      "Optimised database access patterns across DB2 and PostgreSQL, improving query performance and reducing latency",
      "Delivered end-to-end features independently across design, development, UI/API testing, deployment, and production support",
      "Single-handedly deployed 5–10 applications to web servers and managed release activities across environments",
    ],
    aiWork: [
      "Predictive analytics ML models deployed via MLops and Docker in financial services",
    ],
  },
  {
    id: 3,
    company: "Bristol Myers Squibb",
    role: "Java Developer",
    domain: "Biopharmaceuticals & Life Sciences",
    location: "New Jersey",
    period: "Apr 2021 – Feb 2022",
    current: false,
    color: "#10b981",
    logo: "🧬",
    tech: [
      "Java", "Spring Boot", "Spring Cloud", "Oracle", "PostgreSQL", "JDBC",
      "Apache Camel", "RESTful APIs", "SOAP Web Services",
      "JUnit 5", "Mockito", "OpenShift", "AWS Lambda",
      "JWT", "API Gateway", "SonarQube", "Gradle",
    ],
    achievements: [
      { metric: "HIPAA", desc: "Compliant authentication & secure biomedical data access" },
      { metric: "Serverless", desc: "AWS Lambda + OpenShift containerised deployments" },
      { metric: "100%", desc: "Test-driven development with JUnit 5 and Mockito" },
      { metric: "SOAP+REST", desc: "Secure data exchange between enterprise & research systems" },
    ],
    highlights: [
      "Developed RESTful APIs and Spring Cloud microservices connecting research and business platforms",
      "Automated workflows with Apache Camel, streamlining data exchange between lab systems",
      "Managed sensitive biopharma data with Oracle and PostgreSQL via JDBC",
      "Applied JUnit 5 and Mockito for test-driven development ensuring healthcare compliance",
      "Deployed on OpenShift and AWS Lambda with serverless and containerised workloads",
      "Secured APIs with JWT and API Gateway for HIPAA-compliant authentication and TLS/SSL",
      "Built SOAP and REST Web Services for secure enterprise-to-research data exchange",
    ],
    aiWork: [],
  },
  {
    id: 4,
    company: "Indiabulls Housing Finance",
    role: "Java Developer",
    domain: "Financial Services & Mortgage Lending",
    location: "Mumbai, India",
    period: "Apr 2018 – Nov 2019",
    current: false,
    color: "#f59e0b",
    logo: "🏠",
    tech: [
      "Java", "Angular 15", "Spring Security", "OAuth 2.0",
      "Apache Kafka", "RabbitMQ", "Redis", "Elasticsearch",
      "TensorFlow", "Python", "Jenkins", "GitLab CI/CD",
      "ELK Stack", "Grafana", "Apache Spark", "HDFS", "Swagger / OpenAPI",
    ],
    achievements: [
      { metric: "TensorFlow", desc: "Predictive ML model for loan default risk" },
      { metric: "Real-time", desc: "Financial transaction pipelines via Kafka/RabbitMQ" },
      { metric: "Angular 15", desc: "Loan tracking dashboard with real-time updates" },
      { metric: "Spark", desc: "Large-scale mortgage portfolio analytics with HDFS" },
    ],
    highlights: [
      "Developed Angular dashboards for real-time loan application and customer interaction tracking",
      "Implemented async data processing with Apache Kafka and RabbitMQ for financial transactions",
      "Designed and executed TensorFlow + Python predictive models for loan default risk",
      "Enhanced security with Spring Security and OAuth 2.0 for sensitive customer financial data",
      "Leveraged Redis and Elasticsearch for caching and search optimisation on customer portals",
      "Applied Apache Spark and HDFS for large-scale mortgage portfolio data processing",
    ],
    aiWork: [
      "TensorFlow predictive modelling for loan default risk and customer behaviour analysis",
      "Python-based advanced analytics for mortgage portfolio insights and real-time reporting",
    ],
  },
];

export const education = {
  degree: "Master's in Computer and Information Science",
  school: "Western Illinois University",
  location: "Macomb, IL, USA",
  year: "2021",
};

export const certifications = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    icon: "☁️",
    color: "#f59e0b",
    badge: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
  },
];

export const metrics = [
  { value: 5, suffix: "+", label: "Years Experience", color: "cyan" },
  { value: 25, suffix: "+", label: "Microservices Built", color: "purple" },
  { value: 99, suffix: ".9%", label: "System Uptime", color: "green" },
  { value: 50, suffix: "%", label: "CI/CD Time Reduction", color: "orange" },
];

export const projects = [
  {
    id: 1,
    title: "Jay Nexus AI Portfolio Platform",
    subtitle: "React · TypeScript · Framer Motion · Canvas — Personal Project 2026",
    description: "High-impact portfolio platform with interactive AI-focused experiences: boot sequence, neural graph, skills system, project panels, and guided onboarding. Features requestAnimationFrame-driven animation and an LLM AI assistant.",
    tech: ["React", "TypeScript", "Framer Motion", "Canvas Animation", "OpenAI API", "RAG Concepts"],
    metric: "Live",
    metricLabel: "Production",
    color: "#00d4ff",
    icon: "🤖",
    featured: true,
  },
  {
    id: 2,
    title: "Customs Intelligence Engine",
    subtitle: "UPS — 25+ Spring Boot + Angular 17 Microservices",
    description: "Architected 25+ microservices powering international customs processing (UK, UAE, Canada). Reactive pipelines with Project Reactor, Google Pub/Sub event streaming, Vaadin testing platform, and GitOps deployment on OpenShift.",
    tech: ["Java 21", "Spring WebFlux", "Angular 17", "Google Pub/Sub", "ArgoCD", "Helm", "OpenShift"],
    metric: "99.9%",
    metricLabel: "Uptime",
    color: "#06b6d4",
    icon: "📦",
    featured: true,
  },
  {
    id: 3,
    title: "Finance Platform Modernisation",
    subtitle: "Mercedes-Benz Financial Services — Struts → Spring Boot",
    description: "Migrated legacy Struts applications to Spring Boot microservices with Angular/React frontends. Full end-to-end ownership: design, development, testing, deployment, and production support for 5–10 applications.",
    tech: ["Spring Boot", "Angular", "React.js", "OAuth 2.0", "JWT", "DB2", "PostgreSQL"],
    metric: "5–10",
    metricLabel: "Apps Owned",
    color: "#8b5cf6",
    icon: "🚗",
    featured: true,
  },
  {
    id: 4,
    title: "Loan Default Risk Predictor",
    subtitle: "TensorFlow + Python — Indiabulls Finance",
    description: "Production TensorFlow model predicting loan default risk and customer behaviour. Trained on real mortgage portfolio data using Python and Apache Spark for large-scale feature engineering.",
    tech: ["TensorFlow", "Python", "Apache Spark", "HDFS", "Angular", "Apache Kafka"],
    metric: "Real AI/ML",
    metricLabel: "In Production",
    color: "#f59e0b",
    icon: "🧠",
    featured: false,
  },
  {
    id: 5,
    title: "LLM Log Summariser",
    subtitle: "GenAI Prototype — OpenAI + RAG",
    description: "Prototype using OpenAI API and RAG concepts to transform complex customs error logs into concise, actionable insights. Reduced MTTR by ~60% in testing environments.",
    tech: ["Python", "OpenAI API", "RAG", "Vector Embeddings", "FastAPI"],
    metric: "60%",
    metricLabel: "Faster RCA",
    color: "#ff006e",
    icon: "🤖",
    featured: false,
  },
  {
    id: 6,
    title: "Biopharma Data Platform",
    subtitle: "Bristol Myers Squibb — Spring Cloud",
    description: "HIPAA-compliant Spring Cloud microservices with Apache Camel automation connecting lab systems to enterprise platforms. Secured with JWT/API Gateway and deployed on OpenShift + AWS Lambda.",
    tech: ["Spring Cloud", "Apache Camel", "OpenShift", "AWS Lambda", "Oracle", "JWT"],
    metric: "HIPAA",
    metricLabel: "Compliant",
    color: "#10b981",
    icon: "🧬",
    featured: false,
  },
];

export const aiAssistantContext = `
You are Jay Sravan Vadlamudi's AI portfolio assistant. Answer questions about Jay's career, skills, and background.

ABOUT JAY:
- Full name: Jay Sravan Vadlamudi
- Title: Sr. Software Development Engineer – Java Full Stack
- Email: jay.sravan.dev@gmail.com
- LinkedIn: https://www.linkedin.com/in/jaysravan-fullstack/
- GitHub: https://github.com/vjsravan
- 5+ years of enterprise Java Full Stack and distributed systems experience
- Education: Master's in Computer and Information Science, Western Illinois University (2021)
- AWS Certified Developer – Associate
- Career goal: Java Full Stack → AI/ML Engineering Lead

CURRENT ROLE: Sr. Software Development Engineer at UPS (Mar 2024 – Present)
- Architected 25+ microservices for international customs processing (UK, UAE, Canada)
- Reactive pipelines with Project Reactor (Mono/Flux) — 40% faster throughput
- Google Pub/Sub & ActiveMQ event-driven integrations — 99.9% uptime
- Angular 17 dashboards reducing manual lookup by 50%
- Vaadin + Java 21 internal developer testing platform
- GitOps on OpenShift (ArgoCD, Helm), Jenkins + Azure DevOps YAML CI/CD — 50% faster deploys
- HashiCorp Vault, OAuth 2.0, JWT security; JFrog artifact governance
- LLM-based log summarisation prototype and GitHub Copilot enterprise usage

PREVIOUS EXPERIENCE:
1. Mercedes-Benz Financial Services (Mar 2022 – Jul 2024) — Struts→Spring Boot migration, Angular/React, DB2/PostgreSQL, OAuth 2.0/JWT, full end-to-end ownership of 5-10 apps
2. Bristol Myers Squibb (Apr 2021 – Feb 2022) — HIPAA-compliant Spring Cloud microservices, Apache Camel, OpenShift
3. Indiabulls Housing Finance (Apr 2018 – Nov 2019) — TensorFlow loan default prediction, Angular, Apache Kafka

AI / ML EXPERIENCE:
- TensorFlow predictive models for loan default risk (Indiabulls)
- LLM log summarisation prototype with OpenAI API and RAG (UPS)
- GitHub Copilot enterprise integration at UPS
- Built this AI portfolio assistant using OpenAI API + RAG concepts

TECHNICAL STRENGTHS:
- Languages: Java (8/11/21), TypeScript, JavaScript, Python, SQL
- Frontend: Angular 17, React.js, Vaadin
- Backend: Spring Boot, Spring WebFlux (Mono/Flux), Apache Camel, Hibernate, SimpleJdbcCall
- Messaging: Apache Kafka, Google Pub/Sub, RabbitMQ, ActiveMQ
- Cloud/DevOps: OpenShift, Docker, Kubernetes, Jenkins, Azure DevOps, ArgoCD, Helm, JFrog, AWS
- Databases: PostgreSQL, MySQL, DB2, SQL Server, Redis, Elasticsearch
- Security: OAuth 2.0, JWT, HashiCorp Vault, Spring Security

CAREER GOALS:
Jay is actively targeting two types of roles:
1. Senior Java Full Stack / Distributed Systems Engineer (Angular / React / Spring Boot / WebFlux)
2. AI/ML Engineering roles — building on real TensorFlow, MLops, and LLM integration experience

Answer questions in a friendly, professional manner. Keep responses concise.
If asked about salary or confidential info, politely decline.
`;

