export const personalInfo = {
  name: "Jay Sravan Vadlamudi",
  title: "Senior Software Engineer",
  subtitle: "Distributed Systems & Cloud-Native Architecture · AI Engineering· Full Stack",
  email: "jay.sravan.dev@gmail.com",
  phone: "734-394-7436",
  linkedin: "https://www.linkedin.com/in/jaysravan-fullstack/",
  github: "https://github.com/vjsravan",
  portfolio: "https://vjsravan.github.io/jay-portfolio/",
  location: "Missouri, USA",
  yearsOfExperience: 6,
  summary: `Results-driven Senior Software Engineer with 6+ years of experience architecting and delivering
scalable, cloud-native distributed systems and event-driven microservices across healthcare,
logistics, customs, and automotive finance domains. Recognized for engineering high-throughput
Java platforms that process 400K+ records daily, reducing system latency by up to 40%, and
spearheading CI/CD automation that accelerates release cycles by 50%.`,
  aiSummary: `Cloud-native distributed systems engineer with production Java 21, Spring Boot, WebFlux,
Kafka, Google Pub/Sub, GCP, AWS, Kubernetes, Redis caching, GraphQL, and AI-augmented development
experience. Built this AI/ML portfolio platform with React, TypeScript, Framer Motion, canvas
animation, and retrieval-style AI workflow simulations.`,
};

export const skills = {
  languages: ["Java 8/11/21", "JavaScript", "TypeScript", "Python", "SQL", "C", "C++", "C#"],
  frontend: [
    "Angular 15/17/19", "React", "Vaadin", "HTML5", "CSS3",
    "Bootstrap", "JSON", "Server-Side Pagination",
  ],
  backend: [
    "Spring Boot", "Spring MVC", "Spring WebFlux", "Apache Camel",
    "Hibernate", "JPA", "GraphQL", "REST APIs", "WebClient",
    "SOAP/XML", "Swagger", "Microservices Architecture", "System Design",
  ],
  ai: [
    "AI-Augmented Development", "LLM Workflow Simulation", "Retrieval-Based Systems",
    "GitHub Copilot", "Prompt Engineering", "AI/ML Portfolio Architecture",
    "Reactive Programming", "Java Virtual Threads",
  ],
  cloud: [
    "GCP", "AWS SQS", "AWS Lambda", "AWS S3", "AWS EC2",
    "AWS ELB", "AWS CloudWatch", "OpenShift", "Kubernetes",
    "Docker", "Helm",
  ],
  devops: [
    "Azure DevOps", "Jenkins", "Argo CD", "GitHub Actions",
    "Git", "Maven", "JFrog", "CI/CD Pipelines",
  ],
  databases: ["MySQL", "PostgreSQL", "SQL Server", "DB2", "MongoDB", "Redis"],
  messaging: [
    "Apache Kafka", "Google Pub/Sub", "ActiveMQ", "Asynchronous Processing",
    "Dead-Letter Queues", "Retry Patterns",
  ],
  observability: ["Grafana", "ELK Stack", "AWS CloudWatch", "Distributed Tracing", "SRE Practices"],
  testing: ["JUnit", "Mockito", "Playwright", "Selenium", "Postman"],
  security: ["OAuth 2.0", "JWT", "RBAC", "HIPAA Compliance"],
  methods: ["Agile/Scrum", "SDLC", "System Design", "IntelliJ IDEA", "VS Code"],
};

export const experiences = [
  {
    id: 1,
    company: "United Parcel Service (UPS)",
    role: "Senior Software Development Engineer - Java Full Stack",
    domain: "International Logistics, Customs & Regulatory Processing",
    location: "Parsippany, NJ",
    period: "Mar 2024 - Present",
    current: true,
    color: "#06b6d4",
    logo: "📦",
    tech: [
      "Java 21", "Spring Boot", "Spring WebFlux", "Virtual Threads",
      "Angular 17/19", "Vaadin", "Hibernate", "JPA", "REST",
      "Kafka", "Google Pub/Sub", "ActiveMQ", "Redis", "MySQL", "DB2",
      "GCP", "Docker", "Kubernetes", "OpenShift", "Azure DevOps",
      "Jenkins", "Argo CD", "Helm", "JFrog", "Grafana", "ELK Stack",
    ],
    achievements: [
      { metric: "25+", desc: "Production microservices for customs and regulatory workflows" },
      { metric: "400K+", desc: "Records processed daily through a GCP synchronization platform" },
      { metric: "40%", desc: "Higher throughput in high-volume event-driven transaction flows" },
      { metric: "50%", desc: "Faster deployment cycles through CI/CD automation" },
      { metric: "99.9%", desc: "Service reliability under peak international traffic" },
      { metric: "60%", desc: "Shorter feedback loops through an internal Vaadin testing platform" },
    ],
    highlights: [
      "Architected and delivered 25+ production microservices supporting customs and regulatory workflows across the UK, UAE, and Canada, reducing end-to-end processing latency by 30%",
      "Engineered reactive, event-driven microservices using Spring Boot WebFlux and asynchronous messaging patterns, elevating throughput by 40% while sustaining 99.9% service reliability",
      "Spearheaded a high-throughput data synchronization platform on GCP using Java 21 virtual threads and parallel processing to ingest and process 400K+ records daily",
      "Designed Redis-based caching strategies with intelligent TTL policies, reducing database load by 35% and improving API response times by 40%",
      "Delivered Angular 17/19 operational dashboards with server-side pagination, optimized API contracts, and client-side caching to remove UI load bottlenecks",
      "Architected resilient service communication using REST and Kafka/Pub-Sub messaging with dead-letter queues, retries, and circuit breakers, reducing distributed failure impact by 25%",
      "Engineered a GCP archival service for historical shipment data, enabling downstream teams to query 3+ years of regulatory records with sub-second performance",
      "Built an internal developer testing platform using Vaadin and Java 21 to simulate full agency flows, shortening pre-production feedback loops by 60%",
      "Automated Azure DevOps, Jenkins, Docker, Helm, Argo CD, and OpenShift workflows, reducing deployment cycle time by 50% across 25+ microservices",
      "Led collaborative system design sessions covering service decomposition, data flow architecture, and scalability trade-offs",
    ],
    aiWork: [
      "Applied AI-augmented development practices with GitHub Copilot for refactoring and test generation",
      "Adopted emerging technologies including reactive programming and Java virtual threads for scalable platform engineering",
      "Modeled distributed data flows and observability patterns that support future AI-assisted operations workflows",
    ],
  },
  {
    id: 2,
    company: "Mercedes-Benz Financial Services",
    role: "Software Engineer - Java Full Stack",
    domain: "Automotive Finance & Leasing Platforms",
    location: "Michigan",
    period: "Mar 2022 - Mar 2024",
    current: false,
    color: "#8b5cf6",
    logo: "🚗",
    tech: [
      "Java", "Spring Boot", "Spring MVC", "Angular", "React",
      "REST APIs", "Apache Kafka", "AWS SQS", "AWS Lambda",
      "DB2", "PostgreSQL", "OAuth 2.0", "JWT", "RBAC",
      "Docker", "Kubernetes", "Jenkins", "Azure DevOps", "GitHub Actions",
    ],
    achievements: [
      { metric: "45%", desc: "Release agility gain from Struts-to-Spring Boot modernization" },
      { metric: "35%", desc: "Higher async workflow reliability with Kafka and AWS services" },
      { metric: "30%", desc: "Lower average query response time across DB2 and PostgreSQL" },
      { metric: "100K+", desc: "Automotive finance customers protected by OAuth/JWT/RBAC" },
    ],
    highlights: [
      "Modernized finance and leasing platforms by decomposing legacy Struts monoliths into Spring Boot microservices and secure REST APIs, improving release agility by 45%",
      "Engineered event-driven data processing pipelines using Apache Kafka and AWS SQS/Lambda, increasing asynchronous workflow reliability by 35%",
      "Optimized DB2 and PostgreSQL query patterns, service-layer data access, and ORM persistence logic, reducing average query response time by 30%",
      "Architected OAuth 2.0 and JWT authentication with role-based access control, securing sensitive financial APIs and downstream integrations for 100K+ customers",
      "Delivered Angular full-stack features and REST APIs supporting customer servicing, leasing origination, and portfolio management across 5+ applications",
      "Automated containerized deployments and release workflows using Docker, Kubernetes, Jenkins, Azure DevOps, and GitHub Actions, reducing environment-specific defects by 40%",
      "Owned features end to end across design, API development, testing, deployment, and production support with zero SLA breaches over 24 months",
    ],
    aiWork: [
      "Used automation and AI-assisted engineering practices to improve delivery consistency and testing coverage",
    ],
  },
  {
    id: 3,
    company: "United Healthcare",
    role: "Full Stack Java Developer",
    domain: "Healthcare Information Systems",
    location: "Los Angeles, CA",
    period: "Jan 2018 - Dec 2019",
    current: false,
    color: "#00ff88",
    logo: "🏥",
    tech: [
      "Java 8", "Spring Boot", "Angular", "TypeScript", "Bootstrap",
      "REST APIs", "GraphQL", "Swagger", "JWT", "OAuth 2.0",
      "Apache Kafka", "MySQL", "SQL Server", "AWS S3", "AWS EC2",
      "AWS ELB", "AWS VPC", "CloudWatch", "Maven", "Jenkins",
    ],
    achievements: [
      { metric: "50K+", desc: "Healthcare plan members served by a modernized claims portal" },
      { metric: "35%", desc: "Lower average page load time through Angular modernization" },
      { metric: "40%", desc: "Reduced processing lag for critical claims workflows" },
      { metric: "99.5%", desc: "Uptime SLA for AWS-hosted healthcare workloads" },
    ],
    highlights: [
      "Engineered a modern Angular claims portal using TypeScript, Bootstrap, and Angular CLI, reducing average page load time by 35% for 50K+ healthcare plan members",
      "Architected RESTful APIs using Spring Boot, Java 8 lambdas and streams, and Swagger documentation, accelerating downstream integration by 30%",
      "Built GraphQL APIs with JWT and OAuth 2.0 for fine-grained access control, supporting HIPAA-compliant healthcare data exchange",
      "Delivered event-driven microservices using Spring Boot and Apache Kafka, enabling asynchronous data exchange between 10+ healthcare systems",
      "Optimized SQL queries, triggers, and stored procedures across MySQL and SQL Server, improving claims processing retrieval performance by 25%",
      "Deployed and managed applications on AWS S3, EC2, ELB, and VPC with CloudWatch monitoring, achieving a 99.5% uptime SLA",
      "Automated build, test, and integration workflows using Maven and Jenkins, reducing manual deployment errors by 30%",
    ],
    aiWork: [],
  },
];

export const education = [
  {
    degree: "Master of Science in Computer and Information Sciences",
    school: "Western Illinois University",
    location: "Macomb, IL",
    period: "Jan 2020 - Dec 2021",
  },
  {
    degree: "Bachelor of Technology in Electronics and Communication Engineering",
    school: "V.R. Siddhartha Engineering College",
    location: "India",
    period: "Jun 2015 - Apr 2019",
  },
];

export const certifications = [
  {
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    icon: "☁️",
    color: "#f59e0b",
    badge: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
  },
];

export const metrics = [
  { value: 6, suffix: "+", label: "Years Experience", color: "cyan" },
  { value: 25, suffix: "+", label: "Microservices Built", color: "purple" },
  { value: 400, suffix: "K+", label: "Records Daily", color: "green" },
  { value: 50, suffix: "%", label: "Release Cycle Gain", color: "orange" },
];

export const projects = [
  {
    id: 1,
    title: "Jay Nexus AI Portfolio Platform",
    subtitle: "Personal Project - Remote - 2026",
    description: "High-performance AI/ML portfolio platform built with React, TypeScript, and Framer Motion. Includes custom canvas animations, interactive AI workflow simulations, retrieval-based system modeling, responsive architecture, lazy loading, and sub-100ms interaction latency.",
    tech: ["React", "TypeScript", "Framer Motion", "Canvas Animation", "AI Workflow Simulation", "Lazy Loading"],
    metric: "<100ms",
    metricLabel: "Interaction Latency",
    color: "#00d4ff",
    icon: "🤖",
    featured: true,
  },
];

export const aiAssistantContext = `
You are Jay Sravan Vadlamudi's AI portfolio assistant. Answer questions about Jay's career, skills, projects, and background.

ABOUT JAY:
- Full name: Jay Sravan Vadlamudi
- Title: Senior Software Engineer
- Focus: Distributed Systems & Cloud-Native Architecture | Java Full Stack
- Location: Missouri, USA
- Phone: 734-394-7436
- Email: jay.sravan.dev@gmail.com
- LinkedIn: https://www.linkedin.com/in/jaysravan-fullstack/
- GitHub: https://github.com/vjsravan
- Portfolio: https://vjsravan.github.io/jay-portfolio/
- 6+ years of software engineering experience across healthcare, logistics, customs, and automotive finance domains
- AWS Certified Developer - Associate

PROFESSIONAL SUMMARY:
Jay architects and delivers scalable, cloud-native distributed systems and event-driven microservices. His work includes high-throughput Java platforms processing 400K+ records daily, latency reductions up to 40%, CI/CD automation that accelerates release cycles by 50%, and production platforms built with Java 21, Spring Boot, GCP, AWS, Kafka, Kubernetes, Redis, GraphQL, and modern frontend frameworks.

CURRENT ROLE: United Parcel Service (UPS), Senior Software Development Engineer - Java Full Stack (Mar 2024 - Present)
- 25+ production microservices for customs and regulatory workflows across the UK, UAE, and Canada
- Spring Boot WebFlux and asynchronous messaging patterns improving throughput by 40% with 99.9% reliability
- GCP data synchronization platform using Java 21 virtual threads to process 400K+ records daily
- Redis caching reducing database load by 35% and improving API response times by 40%
- Angular 17/19 dashboards with server-side pagination and optimized API contracts
- REST, Kafka/Pub-Sub, dead-letter queues, retry strategies, and circuit breakers
- GCP archival service for 3+ years of regulatory records with sub-second query performance
- Vaadin and Java 21 developer testing platform reducing feedback loops by 60%
- Azure DevOps, Jenkins, Docker, Helm, Argo CD, and OpenShift CI/CD reducing deployment cycle time by 50%

PREVIOUS EXPERIENCE:
1. Mercedes-Benz Financial Services (Mar 2022 - Mar 2024) - Java Full Stack engineer for automotive finance and leasing platforms. Modernized Struts monoliths into Spring Boot microservices, built Kafka and AWS SQS/Lambda event pipelines, optimized DB2/PostgreSQL performance, implemented OAuth/JWT/RBAC, and delivered Angular full-stack features across 5+ applications.
2. United Healthcare (Jan 2018 - Dec 2019) - Full Stack Java Developer for healthcare information systems. Built Angular claims portal features for 50K+ members, Spring Boot REST APIs, GraphQL APIs with OAuth/JWT, Kafka microservices, MySQL/SQL Server optimizations, and AWS deployments with CloudWatch monitoring.

PROJECT:
- Jay Nexus AI Portfolio Platform (2026): React, TypeScript, Framer Motion, custom canvas animation, interactive AI workflow simulations, retrieval-based system modeling, lazy loading, responsive architecture, and sub-100ms interaction latency.

EDUCATION:
- Master of Science in Computer and Information Sciences, Western Illinois University, Macomb, IL (Jan 2020 - Dec 2021)
- Bachelor of Technology in Electronics and Communication Engineering, V.R. Siddhartha Engineering College, India (Jun 2015 - Apr 2019)

TECHNICAL STRENGTHS:
- Languages: Java 8/11/21, JavaScript, TypeScript, Python, SQL, C, C++, C#
- Frameworks: Spring Boot, Spring MVC, WebFlux, Apache Camel, Hibernate/JPA, GraphQL, Angular 15/17/19, React, Vaadin
- API/Web: REST APIs, WebClient, GraphQL, SOAP/XML, HTML5, CSS3, Bootstrap, JSON, Swagger, server-side pagination
- Messaging: Apache Kafka, Google Pub/Sub, ActiveMQ, asynchronous processing, dead-letter queues, retry patterns
- Databases: MySQL, PostgreSQL, SQL Server, DB2, MongoDB, Redis
- Cloud/Infra: GCP, AWS SQS/Lambda/S3/EC2/ELB/CloudWatch, OpenShift, Kubernetes, Docker, Helm
- DevOps: Azure DevOps, Jenkins, Argo CD, GitHub Actions, Git, Maven, JFrog, CI/CD
- Observability: Grafana, ELK Stack, AWS CloudWatch, distributed tracing, SRE practices
- Security: OAuth 2.0, JWT, RBAC, HIPAA compliance
- Testing: JUnit, Mockito, Playwright, Selenium, Postman

Answer in a friendly, professional manner. Keep responses concise and grounded in the resume. If asked about salary or confidential information, politely decline.
`;
