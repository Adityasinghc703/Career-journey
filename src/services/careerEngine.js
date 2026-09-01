/**
 * Comprehensive Career Knowledge Graph & Industry Benchmarks (10 Top Tech Careers)
 */

export const CAREER_PROFILES = [
  {
    id: "senior-frontend-dev",
    title: "Senior Frontend Developer",
    category: "Frontend Engineering",
    description: "Focusing on modern reactive user interfaces, component architecture, state management, web performance, micro-frontends, and AI-powered UI integrations.",
    targetTimeline: "12-18 Months",
    matchScoreBase: 75,
    marketInsights: {
      demand: "Very High",
      growthRate: "+18% projected growth by 2030",
      avgSalary: "₹14,00,000 - ₹26,00,000 / yr (14-26 LPA)",
      topHiringSectors: [
        { name: "Tech / SaaS (Bengaluru)", icon: "cloud" },
        { name: "FinTech (Mumbai)", icon: "account_balance" },
        { name: "HealthTech (Hyderabad)", icon: "health_and_safety" },
        { name: "AI Startups (NCR/Gurugram)", icon: "smart_toy" }
      ]
    },
    radarDimensions: [
      { name: "React/Next.js", key: "react", requiredLevel: 90 },
      { name: "TypeScript", key: "typescript", requiredLevel: 85 },
      { name: "State Mgt", key: "stateManagement", requiredLevel: 80 },
      { name: "Testing", key: "testing", requiredLevel: 75 },
      { name: "CSS/Tailwind", key: "css", requiredLevel: 85 },
      { name: "System Design", key: "systemDesign", requiredLevel: 70 }
    ],
    coreTechnicalSkills: [
      { name: "JavaScript / TypeScript", requiredProficiency: "Advanced", minScore: 85 },
      { name: "React.js / Next.js Ecosystem", requiredProficiency: "Advanced", minScore: 85 },
      { name: "State Management (Redux/Zustand)", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Web Performance & Core Web Vitals", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "Modern CSS & Tailwind CSS", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Testing (Jest / Cypress / Playwright)", requiredProficiency: "Intermediate", minScore: 70 },
      { name: "REST APIs & GraphQL Integration", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Frontend System Architecture", requiredProficiency: "Intermediate", minScore: 65 }
    ],
    essentialTools: ["Git/GitHub", "VS Code", "Vite/Webpack", "Docker", "Chrome DevTools", "Figma", "Postman", "CI/CD"],
    softSkills: ["Problem Solving", "Agile/Scrum", "Technical Communication", "Code Review & Mentorship"]
  },
  {
    id: "fullstack-software-engineer",
    title: "Full-Stack Software Engineer",
    category: "Software Engineering",
    description: "Building scalable end-to-end web applications, microservices, robust REST/GraphQL APIs, database architectures, and cloud deployments.",
    targetTimeline: "18 Months",
    matchScoreBase: 65,
    marketInsights: {
      demand: "Extremely High",
      growthRate: "+22% projected growth by 2030",
      avgSalary: "₹12,00,000 - ₹24,00,000 / yr (12-24 LPA)",
      topHiringSectors: [
        { name: "Enterprise SaaS (Bengaluru)", icon: "business" },
        { name: "FinTech & Payments (Mumbai)", icon: "account_balance" },
        { name: "E-Commerce (NCR)", icon: "shopping_cart" },
        { name: "Cloud & DevTools (Pune/Hyderabad)", icon: "cloud" }
      ]
    },
    radarDimensions: [
      { name: "Frontend (React)", key: "frontend", requiredLevel: 80 },
      { name: "Backend (Node/Java/Python)", key: "backend", requiredLevel: 85 },
      { name: "Databases (SQL/MongoDB)", key: "databases", requiredLevel: 80 },
      { name: "System Design", key: "systemDesign", requiredLevel: 75 },
      { name: "DevOps & Cloud", key: "cloud", requiredLevel: 70 },
      { name: "API & Security", key: "apiSecurity", requiredLevel: 80 }
    ],
    coreTechnicalSkills: [
      { name: "JavaScript / TypeScript", requiredProficiency: "Advanced", minScore: 85 },
      { name: "React.js & Modern Frontend", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "Node.js / Express / Spring Boot", requiredProficiency: "Advanced", minScore: 85 },
      { name: "SQL & PostgreSQL / MongoDB", requiredProficiency: "Advanced", minScore: 80 },
      { name: "System Architecture & Caching (Redis)", requiredProficiency: "Intermediate", minScore: 70 },
      { name: "Docker & Containerization", requiredProficiency: "Intermediate", minScore: 70 },
      { name: "RESTful API Design & Auth (JWT/OAuth)", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Automated Testing & CI/CD", requiredProficiency: "Intermediate", minScore: 70 }
    ],
    essentialTools: ["Git/GitHub", "Docker", "AWS/Cloud", "VS Code", "Postman", "Linux/Bash", "Redis", "Prisma/TypeORM"],
    softSkills: ["Problem Solving", "Agile/Scrum", "Communication", "Cross-Functional Collaboration"]
  },
  {
    id: "backend-engineer",
    title: "Backend Systems Engineer",
    category: "Backend Engineering",
    description: "Designing high-throughput microservices, distributed systems, database optimization, queuing systems, and resilient cloud architectures.",
    targetTimeline: "14-18 Months",
    matchScoreBase: 60,
    marketInsights: {
      demand: "Very High",
      growthRate: "+20% projected growth by 2030",
      avgSalary: "₹14,00,000 - ₹28,00,000 / yr (14-28 LPA)",
      topHiringSectors: [
        { name: "High-Frequency Trading", icon: "trending_up" },
        { name: "E-Commerce & Logistics", icon: "local_shipping" },
        { name: "Payments & Banking", icon: "account_balance" }
      ]
    },
    radarDimensions: [
      { name: "Java/Go/Node", key: "languages", requiredLevel: 90 },
      { name: "Database Internals", key: "databases", requiredLevel: 85 },
      { name: "Microservices", key: "microservices", requiredLevel: 85 },
      { name: "System Design", key: "systemDesign", requiredLevel: 80 },
      { name: "Kafka/Queues", key: "messaging", requiredLevel: 75 },
      { name: "Security & Auth", key: "security", requiredLevel: 75 }
    ],
    coreTechnicalSkills: [
      { name: "Java (Spring Boot) / Go / Node.js", requiredProficiency: "Advanced", minScore: 90 },
      { name: "Relational DBs (PostgreSQL/MySQL Indexing)", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Distributed Caching (Redis/Memcached)", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Message Queues (Kafka / RabbitMQ)", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "High-Level & Low-Level System Design", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Docker & Kubernetes Deployment", requiredProficiency: "Intermediate", minScore: 70 },
      { name: "gRPC, REST, and Protocol Buffers", requiredProficiency: "Intermediate", minScore: 75 }
    ],
    essentialTools: ["Java/Spring Boot", "Go", "PostgreSQL", "Kafka", "Redis", "Docker", "Postman", "Git"],
    softSkills: ["Analytical Reasoning", "Concurrency Problem Solving", "System Reliability Mindset"]
  },
  {
    id: "ai-ml-engineer",
    title: "AI / Machine Learning Engineer",
    category: "Artificial Intelligence",
    description: "Designing, training, fine-tuning, and deploying machine learning models, LLMs, NLP pipelines, RAG systems, and agentic workflows into production.",
    targetTimeline: "18-24 Months",
    matchScoreBase: 55,
    marketInsights: {
      demand: "Astronomical",
      growthRate: "+36% projected growth by 2030",
      avgSalary: "₹18,00,000 - ₹35,00,000 / yr (18-35 LPA)",
      topHiringSectors: [
        { name: "GenAI & LLM Labs (Bengaluru)", icon: "psychology" },
        { name: "Autonomous Systems & Robotics", icon: "smart_toy" },
        { name: "Healthcare & Biotech AI", icon: "health_and_safety" },
        { name: "Quant & Algorithmic Trading", icon: "trending_up" }
      ]
    },
    radarDimensions: [
      { name: "Python & PyTorch", key: "pythonPytorch", requiredLevel: 90 },
      { name: "ML Algorithms", key: "algorithms", requiredLevel: 85 },
      { name: "LLMs & RAG", key: "llmRAG", requiredLevel: 85 },
      { name: "Data Engineering", key: "dataPipeline", requiredLevel: 75 },
      { name: "Model Deployment", key: "deployment", requiredLevel: 80 },
      { name: "Math & Stats", key: "mathStats", requiredLevel: 80 }
    ],
    coreTechnicalSkills: [
      { name: "Python (NumPy, Pandas, SciPy)", requiredProficiency: "Advanced", minScore: 90 },
      { name: "PyTorch / TensorFlow & Deep Learning", requiredProficiency: "Advanced", minScore: 85 },
      { name: "LLM Orchestration (LangChain/LlamaIndex/RAG)", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Vector Databases (Pinecone/Chroma/pgvector)", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "API Serving (FastAPI, ONNX, vLLM)", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Data Preprocessing & Feature Engineering", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Docker & GPU Cloud (CUDA/Triton)", requiredProficiency: "Intermediate", minScore: 70 },
      { name: "MLOps & Model Monitoring", requiredProficiency: "Intermediate", minScore: 65 }
    ],
    essentialTools: ["Python", "Jupyter", "PyTorch", "Hugging Face", "FastAPI", "Docker", "Git/GitHub", "Weights & Biases"],
    softSkills: ["Analytical Thinking", "Research Translation", "Experiment Design", "Technical Writing"]
  },
  {
    id: "data-scientist",
    title: "Data Scientist & Analytics Engineer",
    category: "Data Science",
    description: "Extracting actionable insights from big data, building predictive models, designing experimental A/B metrics, and communicating business data narratives.",
    targetTimeline: "12-16 Months",
    matchScoreBase: 60,
    marketInsights: {
      demand: "Very High",
      growthRate: "+25% projected growth by 2030",
      avgSalary: "₹11,00,000 - ₹22,00,000 / yr (11-22 LPA)",
      topHiringSectors: [
        { name: "E-Commerce & Quick Commerce", icon: "shopping_cart" },
        { name: "FinTech & Banking", icon: "account_balance" },
        { name: "AdTech & Analytics", icon: "insights" },
        { name: "Consulting (Big 4 / MBB)", icon: "domain" }
      ]
    },
    radarDimensions: [
      { name: "Python/R", key: "pythonR", requiredLevel: 85 },
      { name: "Advanced SQL", key: "sql", requiredLevel: 90 },
      { name: "Statistics/A/B", key: "statistics", requiredLevel: 85 },
      { name: "Machine Learning", key: "ml", requiredLevel: 75 },
      { name: "Data Viz (Tableau)", key: "dataviz", requiredLevel: 80 },
      { name: "Data Pipelines (dbt)", key: "pipelines", requiredLevel: 70 }
    ],
    coreTechnicalSkills: [
      { name: "Python (Pandas, Scikit-learn, Seaborn)", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Complex SQL & Window Functions", requiredProficiency: "Advanced", minScore: 90 },
      { name: "A/B Testing & Statistical Hypothesis Testing", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Predictive Modeling & Regression/Classification", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "Data Warehousing (Snowflake / BigQuery)", requiredProficiency: "Intermediate", minScore: 70 },
      { name: "Tableau / Power BI / Streamlit", requiredProficiency: "Advanced", minScore: 80 }
    ],
    essentialTools: ["Python", "SQL", "Snowflake", "BigQuery", "dbt", "Tableau", "Git", "Excel"],
    softSkills: ["Business Acumen", "Data Storytelling", "Executive Presentation", "Critical Thinking"]
  },
  {
    id: "devops-cloud-engineer",
    title: "DevOps & Cloud Platform Engineer",
    category: "Infrastructure",
    description: "Automating cloud infrastructure, CI/CD pipelines, Kubernetes orchestration, infrastructure-as-code, and system reliability engineering.",
    targetTimeline: "16-20 Months",
    matchScoreBase: 50,
    marketInsights: {
      demand: "High",
      growthRate: "+21% projected growth by 2030",
      avgSalary: "₹13,00,000 - ₹25,00,000 / yr (13-25 LPA)",
      topHiringSectors: [
        { name: "Cloud Infrastructure Providers", icon: "cloud" },
        { name: "Cybersecurity & DefTech", icon: "security" },
        { name: "FinTech & Banking Infrastructure", icon: "account_balance" }
      ]
    },
    radarDimensions: [
      { name: "AWS/GCP/Azure", key: "cloud", requiredLevel: 85 },
      { name: "Kubernetes/Docker", key: "containers", requiredLevel: 85 },
      { name: "Terraform (IaC)", key: "iac", requiredLevel: 80 },
      { name: "CI/CD Pipelines", key: "cicd", requiredLevel: 85 },
      { name: "Linux & Networking", key: "linux", requiredLevel: 80 },
      { name: "Observability", key: "observability", requiredLevel: 75 }
    ],
    coreTechnicalSkills: [
      { name: "Linux Administration & Bash Scripting", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Docker & Container Internals", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Kubernetes Deployment & Services", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "AWS Services (EC2, S3, IAM, ECS, Lambda)", requiredProficiency: "Advanced", minScore: 80 },
      { name: "Terraform / Infrastructure as Code", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "GitHub Actions / GitLab CI", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Prometheus & Grafana Monitoring", requiredProficiency: "Intermediate", minScore: 70 }
    ],
    essentialTools: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux", "Prometheus", "Grafana"],
    softSkills: ["Incident Response", "Root Cause Analysis", "System Reliability Mindset", "Team Communication"]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity & Security Engineer",
    category: "Information Security",
    description: "Protecting systems from vulnerabilities, threat modeling, penetration testing, network defense, DevSecOps, and compliance architecture.",
    targetTimeline: "14-18 Months",
    matchScoreBase: 50,
    marketInsights: {
      demand: "Critical & High",
      growthRate: "+32% projected growth by 2030",
      avgSalary: "₹12,00,000 - ₹24,00,000 / yr (12-24 LPA)",
      topHiringSectors: [
        { name: "Banking & Financial Services", icon: "account_balance" },
        { name: "Defense & Aerospace", icon: "security" },
        { name: "Cloud & Enterprise SaaS", icon: "cloud" }
      ]
    },
    radarDimensions: [
      { name: "Network Security", key: "network", requiredLevel: 85 },
      { name: "Penetration Testing", key: "pentest", requiredLevel: 80 },
      { name: "AppSec (OWASP)", key: "appsec", requiredLevel: 85 },
      { name: "SIEM & SOC Tools", key: "siem", requiredLevel: 75 },
      { name: "Cryptography", key: "crypto", requiredLevel: 75 },
      { name: "Cloud Security", key: "cloudsec", requiredLevel: 80 }
    ],
    coreTechnicalSkills: [
      { name: "OWASP Top 10 & Application Security", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Network Security (Firewalls, Wireshark, TCP/IP)", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Vulnerability Scanning (Burp Suite, Nessus)", requiredProficiency: "Intermediate", minScore: 80 },
      { name: "Linux Security Hardening & Cryptography", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "SIEM Tools & Log Analysis (Splunk)", requiredProficiency: "Intermediate", minScore: 70 }
    ],
    essentialTools: ["Wireshark", "Burp Suite", "Kali Linux", "Splunk", "Nmap", "Metasploit", "Git"],
    softSkills: ["Ethical Mindset", "Investigative Rigor", "Crisis Management", "Compliance Protocol"]
  },
  {
    id: "mobile-app-dev",
    title: "Mobile App Developer (React Native / Flutter / Android)",
    category: "Mobile Engineering",
    description: "Creating responsive, smooth, 60fps cross-platform and native mobile applications with offline storage and native hardware integrations.",
    targetTimeline: "12-16 Months",
    matchScoreBase: 65,
    marketInsights: {
      demand: "Very High",
      growthRate: "+19% projected growth by 2030",
      avgSalary: "₹10,00,000 - ₹20,00,000 / yr (10-20 LPA)",
      topHiringSectors: [
        { name: "Consumer Apps & Social", icon: "smartphone" },
        { name: "FinTech & UPI Payments", icon: "payments" },
        { name: "Health & Fitness", icon: "fitness_center" }
      ]
    },
    radarDimensions: [
      { name: "React Native/Flutter", key: "framework", requiredLevel: 90 },
      { name: "Mobile UI/UX", key: "uiux", requiredLevel: 85 },
      { name: "State Mgt", key: "state", requiredLevel: 80 },
      { name: "Native APIs", key: "native", requiredLevel: 75 },
      { name: "Offline & SQLite", key: "offline", requiredLevel: 75 },
      { name: "App Store CI/CD", key: "cicd", requiredLevel: 70 }
    ],
    coreTechnicalSkills: [
      { name: "React Native / Flutter / Kotlin", requiredProficiency: "Advanced", minScore: 90 },
      { name: "Mobile State Management (Redux/Bloc)", requiredProficiency: "Advanced", minScore: 85 },
      { name: "Offline Storage (SQLite/WatermelonDB/Realm)", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "Push Notifications & Deep Linking", requiredProficiency: "Intermediate", minScore: 75 },
      { name: "App Performance & Memory Profiling", requiredProficiency: "Intermediate", minScore: 70 }
    ],
    essentialTools: ["React Native", "Flutter", "Android Studio", "Xcode", "Expo", "Firebase", "Git"],
    softSkills: ["Mobile UX Empathy", "Attention to Detail", "Platform Consistency"]
  }
];

export function getCareerById(id) {
  return CAREER_PROFILES.find(c => c.id === id) || CAREER_PROFILES[0];
}

export function getAllCareers() {
  return CAREER_PROFILES.map(c => ({
    id: c.id,
    title: c.title,
    category: c.category,
    description: c.description,
    targetTimeline: c.targetTimeline,
    matchScoreBase: c.matchScoreBase
  }));
}
