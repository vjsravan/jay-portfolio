export const personalInfo = {
  name: "Jay Sravan Vadlamudi",
  title: "Java Full Stack Developer",
  subtitle: "AI & ML Engineering | Angular · React · Spring Boot",
  email: "jay.sravan.dev@gmail.com",
  location: "United States",
  yearsOfExperience: 8,
  summary: `Full-Stack Java Developer with 8+ years of experience building enterprise-grade,
cloud-native applications across logistics, automotive finance, biopharmaceuticals, and fintech.
Expert in Java (Spring Boot), Angular, React, and microservices architecture. Hands-on AI/ML
experience with TensorFlow predictive modeling, MLflow/MLops pipelines, and LLM integrations.
Actively targeting AI Engineering roles — passionate about building intelligent, data-driven systems.`,
  aiSummary: `Real production AI/ML experience: TensorFlow loan-default prediction models (Indiabulls),
MLflow model tracking & MLops deployment pipelines (UPS & Mercedes-Benz), GitHub Copilot at
enterprise scale, and LLM-based log-summarization prototypes. Goal: Java Full Stack → AI Engineering Lead.`,
};

export const skills = {
  languages: ["Java 8–21", "TypeScript", "JavaScript ES6+", "Python", "SQL", "PL/SQL"],
  frontend: ["Angular (v15–17)", "React.js", "Vue.js", "Redux", "HTML5", "CSS3", "Bootstrap", "Material UI"],
  backend: [
    "Spring Boot", "Spring MVC", "Spring Cloud", "Spring Security",
    "Hibernate", "JPA", "JDBC", "Apache Camel", "Node.js", "Express.js",
    "GraphQL", "RESTful APIs", "SOAP", "Microservices Architecture",
  ],
  ai: [
    "TensorFlow", "MLflow", "MLops", "Scikit-learn",
    "GitHub Copilot", "ChatGPT (GPT-4/5)", "LLM Prompt Engineering",
    "OpenAI API", "RAG Concepts", "Vector Embeddings",
    "AI Log Summarization", "Agent-based Workflows",
  ],
  cloud: ["AWS (EC2, S3, Lambda, Beanstalk)", "OpenShift", "Azure", "Docker", "Kubernetes", "Argo CD", "Helm"],
  databases: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "Cassandra", "Elasticsearch", "SQL Server"],
  cicd: ["Jenkins", "GitHub Actions", "GitLab CI/CD", "Maven", "Gradle", "SonarQube"],
  messaging: ["Apache Kafka", "RabbitMQ", "ActiveMQ", "JMS"],
  testing: ["JUnit 5", "Mockito", "Selenium", "Postman", "Swagger / OpenAPI"],
  security: ["OAuth 2.0", "JWT", "API Gateway", "Spring Security", "TLS/SSL", "HIPAA Compliance", "PCI Compliance"],
};

export const experiences = [
  {
    id: 1,
    company: "United Parcel Service (UPS)",
    role: "Java Full Stack Developer",
    domain: "Logistics – International Package & Customs Processing",
    location: "Parsippany, NJ",
    period: "Aug 2024 – Present",
    current: true,
    color: "#06b6d4",
    logo: "📦",
    tech: [
      "Java 21", "Spring Boot", "React.js", "Hibernate", "JPA",
      "MySQL", "PostgreSQL", "GraphQL", "RESTful APIs",
      "Apache Kafka", "RabbitMQ", "Docker", "Kubernetes",
      "Jenkins", "GitHub Actions", "MLflow", "MLops", "ELK Stack", "Prometheus",
    ],
    achievements: [
      { metric: "25%", desc: "Referential data consistency improvement via SQL validation" },
      { metric: "40%", desc: "Faster data transfer through optimised API pipelines" },
      { metric: "100k+", desc: "Transaction logs traced and summarised weekly" },
      { metric: "50%", desc: "Reduction in deployment time via CI/CD automation" },
      { metric: "99.9%", desc: "Uptime for customs message delivery" },
      { metric: "MLops", desc: "ML model tracking integrated into full-stack solutions" },
    ],
    highlights: [
      "Built robust Spring Boot microservices with React.js front-end for customs & logistics",
      "Implemented secure data access with Hibernate/JPA, enforcing PCI compliance on MySQL/PostgreSQL",
      "Developed RESTful APIs and GraphQL services for seamless front-end / back-end communication",
      "Designed data-driven microservices to manage reference and master datasets across logistics systems",
      "Led data quality validation using Java and SQL, improving referential consistency by 25%",
      "Integrated event-driven architecture with Apache Kafka and RabbitMQ for real-time data streaming",
      "Containerised and deployed with Docker and Kubernetes for scalability and fault tolerance",
      "Collaborated on MLflow/MLops machine learning workflows integrated into full-stack solutions",
      "Monitored system health with Prometheus and ELK Stack; proactive alerting and troubleshooting",
    ],
    aiWork: [
      "MLflow model tracking integrated into enterprise full-stack Java applications",
      "MLops deployment pipelines enabling reproducible ML model deployments",
      "LLM-based log summarisation prototype for customs error root-cause analysis",
      "GitHub Copilot for AI-assisted code refactoring and test generation at enterprise scale",
    ],
  },
  {
    id: 2,
    company: "Mercedes-Benz Financial Services",
    role: "Java Full Stack Developer",
    domain: "Automotive Finance & Leasing Platforms",
    location: "Farmington Hills, MI",
    period: "Mar 2022 – Jul 2024",
    current: false,
    color: "#8b5cf6",
    logo: "🚗",
    tech: [
      "Java 17", "Spring Boot", "Spring MVC", "Vue.js", "TypeScript",
      "Redis", "Cassandra", "SQL Server", "AWS Elastic Beanstalk",
      "GitLab CI", "Maven", "Spring Security", "OAuth 2.0", "JWT",
      "MLops", "Docker", "Grafana", "Kibana",
    ],
    achievements: [
      { metric: "40%", desc: "Reduction in maintenance effort via platform modernisation" },
      { metric: "30%", desc: "DB performance improvement via caching with Redis" },
      { metric: "Predictive", desc: "ML models deployed via MLops for decision support" },
      { metric: "20+", desc: "Agile sprints delivered on schedule" },
    ],
    highlights: [
      "Engineered authentication & authorisation with Spring Security, OAuth 2.0, and JWT for finance apps",
      "Developed adaptive Vue.js + TypeScript front-end for vehicle leasing and finance customers",
      "Implemented advanced caching with Redis and Cassandra, improving speed and reducing DB load",
      "Developed data integration workflows between MDM systems via REST APIs and SOAP Web Services",
      "Deployed cloud-native applications on AWS Elastic Beanstalk for high availability",
      "Streamlined CI/CD with GitLab CI and Maven, reducing release cycles significantly",
      "Participated in data governance and metadata management for finance compliance standards",
      "Integrated predictive analytics by deploying ML models via MLops and Docker",
      "Monitored reliability using Grafana and Kibana with proactive alerting",
    ],
    aiWork: [
      "Predictive analytics ML models deployed via MLops and Docker in financial services",
      "MLops pipelines enabling data-driven decision support for leasing and finance products",
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
      "Used SonarQube and Gradle for continuous code quality checks in regulated environments",
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
      "Developed Angular 15 dashboards for real-time loan application and customer interaction tracking",
      "Implemented async data processing with Apache Kafka and RabbitMQ for financial transactions",
      "Designed and executed TensorFlow + Python predictive models for loan default risk",
      "Enhanced security with Spring Security and OAuth 2.0 for sensitive customer financial data",
      "Automated CI/CD workflows with Jenkins and GitLab, reducing deployment times significantly",
      "Leveraged Redis and Elasticsearch for caching and search optimisation on customer portals",
      "Applied Apache Spark and HDFS for large-scale mortgage portfolio data processing and analytics",
      "Implemented Swagger / OpenAPI documentation for all services, enabling third-party integrations",
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
  { value: 8, suffix: "+", label: "Years Experience", color: "cyan" },
  { value: 4, suffix: "", label: "Enterprise Domains", color: "purple" },
  { value: 3, suffix: "", label: "AI/ML Tools in Prod", color: "green" },
  { value: 50, suffix: "%", label: "CI/CD Time Reduction", color: "orange" },
];

export const projects = [
  {
    id: 1,
    title: "Loan Default Risk Predictor",
    subtitle: "TensorFlow + Python — Indiabulls Finance",
    description: "Production TensorFlow model predicting loan default risk and customer behaviour. Trained on real mortgage portfolio data using Python and Apache Spark for large-scale feature engineering.",
    tech: ["TensorFlow", "Python", "Apache Spark", "HDFS", "Angular 15", "Apache Kafka"],
    metric: "Real AI/ML",
    metricLabel: "In Production",
    color: "#f59e0b",
    icon: "🧠",
    featured: true,
  },
  {
    id: 2,
    title: "Customs Intelligence Engine",
    subtitle: "UPS — Spring Boot + React Microservices",
    description: "Enterprise Spring Boot + React microservices handling 100k+ weekly customs transactions. Integrated MLflow/MLops tracking, Kafka event streaming, and LLM-powered log summarisation prototype.",
    tech: ["Java 21", "Spring Boot", "React.js", "Apache Kafka", "MLflow", "Docker", "Kubernetes"],
    metric: "99.9%",
    metricLabel: "Uptime",
    color: "#00d4ff",
    icon: "📦",
    featured: true,
  },
  {
    id: 3,
    title: "MLops Predictive Pipeline",
    subtitle: "Mercedes-Benz Financial Services",
    description: "MLops deployment pipeline integrating predictive analytics ML models into Java financial applications. Docker-containerised model serving with Grafana/Kibana observability.",
    tech: ["MLops", "Docker", "Spring Boot", "Vue.js", "Grafana", "Kibana", "AWS Elastic Beanstalk"],
    metric: "Prod ML",
    metricLabel: "Decision Support",
    color: "#bd00ff",
    icon: "🚗",
    featured: true,
  },
  {
    id: 4,
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
    id: 5,
    title: "Biopharma Data Platform",
    subtitle: "Bristol Myers Squibb — Spring Cloud",
    description: "HIPAA-compliant Spring Cloud microservices with Apache Camel automation connecting lab systems to enterprise platforms. Secured with JWT/API Gateway and deployed on OpenShift + AWS Lambda.",
    tech: ["Spring Cloud", "Apache Camel", "OpenShift", "AWS Lambda", "Oracle", "JWT", "SonarQube"],
    metric: "HIPAA",
    metricLabel: "Compliant",
    color: "#10b981",
    icon: "🧬",
    featured: false,
  },
  {
    id: 6,
    title: "Angular Finance Dashboard",
    subtitle: "Indiabulls — Real-time Loan Tracking",
    description: "Angular 15 dashboard for real-time loan application tracking and customer interactions. Kafka/RabbitMQ async pipelines, Redis caching, Elasticsearch search, and Spark-powered portfolio analytics.",
    tech: ["Angular 15", "Apache Kafka", "RabbitMQ", "Redis", "Elasticsearch", "Apache Spark"],
    metric: "Real-time",
    metricLabel: "Data Streaming",
    color: "#ff6b00",
    icon: "📊",
    featured: false,
  },
];

export const aiAssistantContext = `
You are Jay Sravan Vadlamudi's AI portfolio assistant. Answer questions about Jay's career, skills, and background.

ABOUT JAY:
- Full name: Jay Sravan Vadlamudi
- Title: Java Full Stack Developer | AI & ML Engineering
- Email: jay.sravan.dev@gmail.com
- 8+ years of enterprise Java Full Stack experience
- Education: Master's in Computer and Information Science, Western Illinois University (2021)
- AWS Certified Developer – Associate
- Career goal: Java Full Stack → AI/ML Engineering Lead

CURRENT ROLE: Java Full Stack Developer at UPS (Aug 2024 – Present, via I2U Systems)
- Spring Boot + React.js microservices for customs & logistics processing
- Integrated MLflow/MLops machine learning workflows into enterprise Java applications
- Apache Kafka and RabbitMQ event-driven architecture
- LLM-based log summarisation prototype for customs error root-cause analysis
- GitHub Copilot for AI-assisted code refactoring and test generation

PREVIOUS EXPERIENCE:
1. Mercedes-Benz Financial Services (Mar 2022 – Jul 2024) — Vue.js + Java finance platform, MLops predictive analytics
2. Bristol Myers Squibb (Apr 2021 – Feb 2022) — HIPAA-compliant Spring Cloud microservices, Apache Camel, OpenShift
3. Indiabulls Housing Finance (Apr 2018 – Nov 2019) — Angular 15, TensorFlow loan default prediction, Apache Kafka

AI / ML EXPERIENCE (real production):
- TensorFlow predictive models for loan default risk (Indiabulls)
- MLflow model tracking and MLops deployment pipelines (UPS & Mercedes-Benz)
- LLM log summarisation prototype with OpenAI API and RAG
- GitHub Copilot enterprise integration at UPS

TECHNICAL STRENGTHS:
- Languages: Java (8–21), TypeScript, JavaScript, Python, SQL
- Frontend: Angular (v15-17), React.js, Vue.js, Redux
- Backend: Spring Boot, Spring Cloud, Spring MVC, Hibernate, Apache Camel
- AI/ML: TensorFlow, MLflow, MLops, OpenAI API, RAG, LLM Prompting
- Cloud: AWS, OpenShift, Docker, Kubernetes, AWS Lambda
- Databases: PostgreSQL, MySQL, Oracle, Redis, Cassandra, Elasticsearch

CAREER GOALS:
Jay is actively targeting two types of roles:
1. Senior Java Full Stack Developer (Angular / React / Spring Boot)
2. AI/ML Engineering roles — building on real TensorFlow, MLops, and LLM integration experience

Answer questions in a friendly, professional manner. Keep responses concise.
If asked about salary or confidential info, politely decline.
`;

