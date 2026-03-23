export const personalInfo = {
  name: "Jay Sravan Vadlamudi",
  title: "Sr. Software Engineer",
  subtitle: "Applied AI Engineer",
  email: "jayforfullstack@gmail.com",
  location: "United States",
  yearsOfExperience: 9,
  summary: `Senior Full-Stack Software Engineer with 9+ years of experience designing and delivering 
high-performance, cloud-native applications across logistics, automotive finance, and healthcare. 
Skilled in building scalable microservices with Java (Spring Boot WebFlux) and intuitive front ends 
with Angular & React. Actively expanding into AI-driven engineering by integrating LLM-powered tools 
for intelligent automation, documentation generation, and developer productivity optimization.`,
  aiSummary: `Passionate about combining backend engineering excellence with AI-enabled system intelligence 
to build next-generation enterprise platforms. Experience with GitHub Copilot, ChatGPT (GPT-4/5), 
LLM Prompt Engineering, OpenAI API, RAG Concepts, and Agent-based Workflow Design.`,
};

export const skills = {
  languages: ["Java 8–21", "TypeScript", "JavaScript ES6+", "Python", "SQL", "PL/SQL"],
  frontend: ["React.js", "Angular (v21)", "Redux", "HTML5", "CSS3", "Bootstrap", "Material UI"],
  backend: [
    "Spring Boot", "Spring WebFlux", "Spring MVC", "Spring Data JPA",
    "Hibernate", "Apache Camel", "Node.js", "Express.js", "Flask",
    "Django", "GraphQL", "RESTful APIs", "SOAP", "EJB", "JMS"
  ],
  ai: [
    "GitHub Copilot", "ChatGPT (GPT-4/5)", "LLM Prompt Engineering",
    "OpenAI API", "RAG Concepts", "Vector Embeddings",
    "AI Log Summarization", "Agent-based Workflows", "AI-assisted Development"
  ],
  cloud: ["AWS", "GCP", "Azure DevOps", "OpenShift (OCP)", "Docker", "Argo CD", "Helm"],
  databases: ["PostgreSQL", "MongoDB", "DB2", "MySQL", "SQL Server", "Oracle"],
  cicd: ["Jenkins", "Azure Pipelines", "GitHub Actions", "GitLab CI", "uDeploy", "Gradle", "Maven"],
  messaging: ["Apache Kafka", "Google Pub/Sub", "ActiveMQ", "JMS"],
  testing: ["JUnit", "TestNG", "Selenium", "Cucumber", "Postman", "SonarQube", "JFrog"],
  security: ["OAuth 2.0", "JWT", "HashiCorp Vault", "HIPAA Compliance"],
};

export const experiences = [
  {
    id: 1,
    company: "United Parcel Service (UPS)",
    role: "Sr. Software Development Engineer – Java Full Stack",
    domain: "Logistics – International Package & Customs Processing",
    location: "Parsippany, NJ",
    period: "Mar 2024 – Present",
    current: true,
    color: "#06b6d4",
    logo: "📦",
    tech: ["Java 21", "Spring Boot WebFlux", "Apache Camel", "Reactor", "Angular 17", "OpenShift", "ArgoCD", "Jenkins", "Docker", "Google Pub/Sub", "ActiveMQ", "HashiCorp Vault", "OAuth 2.0"],
    achievements: [
      { metric: "10+", desc: "Microservices deployed for customs & logistics" },
      { metric: "30%", desc: "Improvement in customs processing time" },
      { metric: "40%", desc: "Faster non-blocking data transfer via reactive pipelines" },
      { metric: "100k+", desc: "Transaction logs traced per week" },
      { metric: "50%", desc: "Reduction in deployment time via CI/CD automation" },
      { metric: "99.9%", desc: "Uptime for customs message delivery" },
    ],
    highlights: [
      "Designed reactive pipelines using Reactor (Mono/Flux) for 40% faster non-blocking data transfer",
      "Applied Strategy Pattern for country-specific customs logic across UK, UAE, and CA",
      "Deployed via GitOps workflow using ArgoCD with Helm charts on OpenShift",
      "Leveraged GitHub Copilot & ChatGPT for AI-assisted code refactoring and documentation",
      "Prototyped LLM-based log summarization for customs error analysis",
      "Explored AI-agent workflows for automated rule explanation and developer onboarding",
    ],
    aiWork: [
      "GitHub Copilot for AI-assisted code refactoring & test generation",
      "Structured prompt templates for system architecture documentation",
      "LLM-based log summarization prototype for root cause analysis",
      "AI-agent workflows for regulatory rule explanation",
    ],
  },
  {
    id: 2,
    company: "Mercedes Benz Financial Services",
    role: "Software Development Engineer – Java Full Stack",
    domain: "Automotive Finance and Leasing Platforms",
    location: "Farmington Hills, MI",
    period: "Apr 2022 – Mar 2024",
    current: false,
    color: "#8b5cf6",
    logo: "🚗",
    tech: ["Java", "Spring Boot", "Angular 17", "OAuth 2.0", "JWT", "DB2", "PostgreSQL", "Jenkins", "AWS CodeDeploy", "Jira"],
    achievements: [
      { metric: "40%", desc: "Reduction in maintenance effort via platform modernization" },
      { metric: "25%", desc: "Improvement in transaction throughput" },
      { metric: "30%", desc: "DB performance improvement via query tuning" },
      { metric: "40%", desc: "Reduction in rollback incidents" },
      { metric: "20+", desc: "Agile sprints delivered on schedule" },
    ],
    highlights: [
      "Modernized legacy Struts apps to Angular 17 + Spring Boot architecture",
      "Engineered microservices for loan payment and lease tracking systems",
      "Used AI tools to accelerate UI migration and automate component scaffolding",
      "Researched LLM-based document summarization for financial statements",
    ],
    aiWork: [
      "AI-assisted UI migration and component scaffolding",
      "LLM-based document summarization research for financial statements",
    ],
  },
  {
    id: 3,
    company: "United Healthcare",
    role: "Full Stack Java Developer",
    domain: "Healthcare Information Systems",
    location: "Los Angeles, CA",
    period: "Jan 2020 – Apr 2022",
    current: false,
    color: "#10b981",
    logo: "🏥",
    tech: ["Java 8", "Spring Boot", "Angular", "TypeScript", "GraphQL", "Apache Kafka", "Hibernate", "MySQL", "AWS (S3, EC2, ELB)", "CloudWatch", "JWT", "OAuth"],
    achievements: [
      { metric: "HIPAA", desc: "Compliant GraphQL APIs with fine-grained access control" },
      { metric: "AWS", desc: "Full cloud deployment with CloudWatch monitoring" },
    ],
    highlights: [
      "Designed Angular healthcare claims portal with TypeScript and Bootstrap",
      "Created GraphQL APIs with JWT/OAuth for HIPAA compliance",
      "Developed async microservices with Apache Kafka",
      "Deployed to AWS (S3, EC2, ELB, VPC) with CloudWatch monitoring",
    ],
    aiWork: [],
  },
  {
    id: 4,
    company: "Wells Fargo Bank",
    role: "Java Full Stack Developer",
    domain: "Payments & Digital Banking",
    location: "Remote",
    period: "Apr 2017 – Dec 2019",
    current: false,
    color: "#f59e0b",
    logo: "🏦",
    tech: ["React", "Redux", "Java", "Spring Boot", "Hibernate", "MongoDB", "Apache Kafka", "Docker", "Azure Cloud", "Log4J"],
    achievements: [
      { metric: "Real-time", desc: "Payment notifications via Apache Kafka" },
      { metric: "Docker", desc: "Containerized & deployed to Azure Cloud" },
    ],
    highlights: [
      "Built React/Redux payment dashboard integrated with Spring Boot microservices",
      "Migrated SQL data models to MongoDB for large-volume transactions",
      "Containerized applications with Docker and deployed to Azure Cloud",
      "Implemented real-time payment notifications using Apache Kafka",
    ],
    aiWork: [],
  },
];

export const education = {
  degree: "Masters in Computer and Information Science",
  school: "Western Illinois University",
  location: "Macomb, IL",
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
  { value: 9, suffix: "+", label: "Years Experience", color: "cyan" },
  { value: 10, suffix: "+", label: "Microservices Built @ UPS", color: "purple" },
  { value: 4, suffix: "", label: "Industry Domains", color: "green" },
  { value: 50, suffix: "%", label: "CI/CD Time Reduction", color: "orange" },
];

export const projects = [
  {
    id: 1,
    title: "Customs Intelligence Engine",
    subtitle: "UPS — Reactive Microservices Platform",
    description: "Reactive pipeline handling 100k+ weekly customs transactions across UK, UAE & CA. Features LLM-powered log summarization for root-cause analysis and AI-agent workflows for regulatory explanation.",
    tech: ["Java 21", "Spring WebFlux", "Apache Camel", "Google Pub/Sub", "OpenShift", "ArgoCD"],
    metric: "99.9%",
    metricLabel: "Uptime",
    color: "#00d4ff",
    icon: "📦",
    featured: true,
  },
  {
    id: 2,
    title: "AI Log Summarizer",
    subtitle: "LLM + RAG Prototype",
    description: "Prototype tool using OpenAI API and RAG concepts to transform complex customs error logs into concise, actionable insights for on-call engineers. Reduced MTTR by ~60%.",
    tech: ["Python", "OpenAI API", "RAG", "Vector Embeddings", "FastAPI"],
    metric: "60%",
    metricLabel: "Faster RCA",
    color: "#ff006e",
    icon: "🤖",
    featured: true,
  },
  {
    id: 3,
    title: "Auto Finance Platform",
    subtitle: "Mercedes-Benz Financial Services",
    description: "Modernized legacy Struts applications to Angular 17 + Spring Boot microservices. Built loan payment and lease tracking systems with AI-assisted component scaffolding.",
    tech: ["Angular 17", "Spring Boot", "OAuth 2.0", "JWT", "DB2", "Jenkins"],
    metric: "40%",
    metricLabel: "Less Maintenance",
    color: "#bd00ff",
    icon: "🚗",
    featured: false,
  },
  {
    id: 4,
    title: "Healthcare Claims Portal",
    subtitle: "United Healthcare — HIPAA Compliant",
    description: "Angular portal with HIPAA-compliant GraphQL APIs, fine-grained JWT/OAuth access control, and async microservices with Apache Kafka for real-time claims processing.",
    tech: ["Angular", "GraphQL", "Spring Boot", "Kafka", "AWS (S3, EC2)", "CloudWatch"],
    metric: "HIPAA",
    metricLabel: "Compliant",
    color: "#00ff88",
    icon: "🏥",
    featured: false,
  },
  {
    id: 5,
    title: "Real-time Payment Dashboard",
    subtitle: "Wells Fargo Digital Banking",
    description: "React/Redux payment dashboard with real-time Kafka notifications, MongoDB migration from SQL for high-volume transactions, containerized on Azure Cloud.",
    tech: ["React", "Redux", "Apache Kafka", "MongoDB", "Docker", "Azure Cloud"],
    metric: "Real-time",
    metricLabel: "Notifications",
    color: "#ff6b00",
    icon: "💳",
    featured: false,
  },
  {
    id: 6,
    title: "GitOps CI/CD Pipeline",
    subtitle: "ArgoCD + Helm on OpenShift",
    description: "Fully automated GitOps deployment pipeline with ArgoCD, Helm charts, and zero-downtime rolling deployments. Reduced deployment time by 50% across 10+ microservices.",
    tech: ["ArgoCD", "Helm", "OpenShift", "Docker", "Jenkins", "HashiCorp Vault"],
    metric: "50%",
    metricLabel: "Faster Deploys",
    color: "#ffd700",
    icon: "⚡",
    featured: false,
  },
];

export const aiAssistantContext = `
You are Jay Sravan Vadlamudi's AI portfolio assistant. You have deep knowledge about Jay's career, skills, and experiences.

ABOUT JAY:
- Full name: Jay Sravan Vadlamudi
- Title: Sr. Software Engineer & Applied AI Engineer
- Email: jayforfullstack@gmail.com
- 9+ years of experience in full-stack software engineering
- Education: Masters in CS from Western Illinois University (2021)
- AWS Certified Developer – Associate

CURRENT ROLE: Sr. Software Development Engineer at UPS (Mar 2024 - Present)
- Building customs & logistics microservices using Java 21, Spring Boot WebFlux, Apache Camel
- Working on international package processing for UK, UAE, CA markets
- Using AI tools: GitHub Copilot, ChatGPT for code refactoring and documentation
- Prototyping LLM-based log summarization for customs error analysis

PREVIOUS EXPERIENCE:
1. Mercedes Benz Financial Services (Apr 2022 - Mar 2024) - Automotive finance platform modernization
2. United Healthcare (Jan 2020 - Apr 2022) - Healthcare claims portal, HIPAA compliance
3. Wells Fargo (Apr 2017 - Dec 2019) - Digital banking, React/Redux payment dashboard

TECHNICAL SKILLS:
- Languages: Java (8-21), TypeScript, JavaScript, Python, SQL
- Frontend: React.js, Angular (v21), Redux
- Backend: Spring Boot, Spring WebFlux, Hibernate, Apache Camel, Node.js
- AI/ML: OpenAI API, LLM Prompt Engineering, RAG Concepts, Agent Workflows
- Cloud: AWS, GCP, Azure, OpenShift, Docker, Argo CD
- Databases: PostgreSQL, MongoDB, DB2, MySQL

Answer questions about Jay's experience, skills, and background in a friendly, professional manner.
If asked about salary or confidential info, politely decline.
Keep responses concise and helpful. You can use emojis occasionally.
`;

