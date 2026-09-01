import { getCareerById } from './careerEngine.js';

// Industry-Standard Curriculum Knowledge Base for Top Tech Professions
const PROFESSION_ROADMAP_CURRICULUM = {
  "senior-frontend-dev": [
    {
      phase: "Phase 1: Modern JavaScript & Component Architecture",
      description: "Master ESNext, async event loop, TypeScript generics, and React 18+ component composition & hooks architecture.",
      tasks: [
        "Deep dive into JavaScript Closures, Prototypes, Event Loop & Microtasks",
        "Master TypeScript: Discriminated Unions, Generics, Utility Types & Type Narrowing",
        "Build modular components with React 18: useEffect dependencies, useRef, and custom hooks",
        "Implement accessible UI primitives with ARIA attributes and keyboard navigation"
      ]
    },
    {
      phase: "Phase 2: State Management, SSR & Next.js Ecosystem",
      description: "Scalable state patterns (Zustand / Redux Toolkit), Server Components (RSC), routing, and server-side rendering.",
      tasks: [
        "Implement global state management with Zustand / Redux Toolkit with selectors",
        "Master Next.js App Router: Server Components, Client Boundaries & Server Actions",
        "Optimistic UI updates, caching strategies & data fetching with React Query / SWR",
        "Build responsive design systems using Tailwind CSS and CSS Grid layouts"
      ]
    },
    {
      phase: "Phase 3: Web Performance, Core Web Vitals & Micro-Frontends",
      description: "Optimizing bundle size, Core Web Vitals (LCP, INP, CLS), caching, and frontend architecture.",
      tasks: [
        "Profile re-renders using React Profiler & optimize with useMemo / React.memo",
        "Optimize Core Web Vitals (LCP, CLS, INP) via code-splitting, lazy loading & image optimization",
        "Implement end-to-end testing with Playwright / Cypress and unit tests with Jest",
        "Design scalable micro-frontend architecture using Webpack / Vite Module Federation"
      ]
    },
    {
      phase: "Phase 4: Full Verification, Mock Interviews & Job Applications",
      description: "Pass technical certifications, solve frontend coding problems, and practice system design interviews.",
      tasks: [
        "Pass React Architecture & Performance Technical Assessment",
        "Solve frontend utility coding challenges (Debounce, Throttle, Deep Clone, Virtualized List)",
        "Complete AI Mock Interview Studio technical and STAR behavioral rounds",
        "Submit 1-click applications to matched SDE-1 and Frontend Engineering roles"
      ]
    }
  ],

  "devops-cloud-engineer": [
    {
      phase: "Phase 1: Linux Administration & Networking Fundamentals",
      description: "Core Linux operating system internals, Bash scripting, systemd, process management, and TCP/IP networking.",
      tasks: [
        "Master Linux CLI, permissions, systemd services, SSH keys, and process signals",
        "Automate administrative tasks with Bash scripts, cron jobs, and text processing (awk/sed/grep)",
        "Understand TCP/IP, DNS resolution, subnets, firewalls, iptables, and load balancing",
        "Configure reverse proxies and SSL/TLS termination with Nginx and Caddy"
      ]
    },
    {
      phase: "Phase 2: Docker Containers & Kubernetes Orchestration",
      description: "Container internals, multi-stage builds, Kubernetes pods, deployments, services, ingress, and Helm charts.",
      tasks: [
        "Write production-grade multi-stage Dockerfiles with minimal image footprints",
        "Deploy and scale microservices using Kubernetes Pods, Deployments, and StatefulSets",
        "Configure Kubernetes Networking: Services (ClusterIP, NodePort, LoadBalancer) & Ingress Controllers",
        "Package and version cloud applications using Helm charts and ConfigMaps/Secrets"
      ]
    },
    {
      phase: "Phase 3: Cloud Infrastructure (AWS), Terraform (IaC) & CI/CD",
      description: "Automating cloud infrastructure on AWS using Terraform and building robust GitHub Actions CI/CD pipelines.",
      tasks: [
        "Provision AWS VPC, EC2, S3, IAM roles, and RDS instances with least-privilege security",
        "Write modular Infrastructure as Code (IaC) using Terraform with remote S3 state locks",
        "Build automated CI/CD pipelines with GitHub Actions / GitLab CI for testing & deployments",
        "Implement zero-downtime Blue/Green and Canary deployment strategies"
      ]
    },
    {
      phase: "Phase 4: Observability (Prometheus/Grafana) & Interview Prep",
      description: "Metrics collection, distributed tracing, incident response, and mock interview practice.",
      tasks: [
        "Set up Prometheus metrics scrapers and build real-time Grafana monitoring dashboards",
        "Configure distributed log aggregation and alerting with Alertmanager / Loki",
        "Complete AI Mock Interview Studio rounds on cloud architecture & incident triage",
        "Apply to verified DevOps, Cloud Engineering, and SRE openings across India"
      ]
    }
  ],

  "ai-ml-engineer": [
    {
      phase: "Phase 1: Python, Applied Mathematics & Data Engineering",
      description: "Advanced Python, vector algebra, calculus, NumPy, Pandas data pipelines, and feature engineering.",
      tasks: [
        "Master scientific Python: vectorized operations in NumPy and high-performance Pandas",
        "Review Linear Algebra, Matrix Decompositions, Probability & Gradient Descent Optimization",
        "Build automated data preprocessing, outlier detection, and normalization pipelines",
        "Implement exploratory data analysis and feature engineering on real-world datasets"
      ]
    },
    {
      phase: "Phase 2: Deep Learning, PyTorch & Transformer Architectures",
      description: "Neural network fundamentals, backpropagation, CNNs, RNNs, Self-Attention mechanisms, and Transformers.",
      tasks: [
        "Train custom neural networks using PyTorch with custom loss functions and optimizers",
        "Master Transformer architecture: Multi-Head Self-Attention, Positional Encodings & BERT/GPT blocks",
        "Fine-tune pre-trained models from Hugging Face for domain classification & NER tasks",
        "Optimize training with mixed-precision (FP16/BF16) and gradient accumulation"
      ]
    },
    {
      phase: "Phase 3: Generative AI, LLM Orchestration & RAG Systems",
      description: "Building production RAG pipelines, vector embeddings, LangChain/LlamaIndex, and guardrail evaluation.",
      tasks: [
        "Design production RAG pipelines with chunking strategies, Pinecone/Chroma vector DBs, and re-ranking",
        "Build agentic workflows with LangChain / LlamaIndex using function calling & tool use",
        "Fine-tune open-source LLMs using LoRA / QLoRA with Hugging Face PEFT",
        "Deploy high-throughput LLM inference endpoints with FastAPI, vLLM, and ONNX"
      ]
    },
    {
      phase: "Phase 4: MLOps, System Design & Technical Mock Interviews",
      description: "Model registry, monitoring, latency optimization, and AI architecture interview preparation.",
      tasks: [
        "Implement model experiment tracking and versioning with Weights & Biases / MLflow",
        "Pass AI & Deep Learning Technical Assessment and solve algorithmic challenges",
        "Complete AI Mock Interview Studio rounds on enterprise RAG architecture & trade-offs",
        "Apply to top GenAI, ML Engineer, and Data Science roles in India"
      ]
    }
  ],

  "fullstack-software-engineer": [
    {
      phase: "Phase 1: Full-Stack Foundations & Modern TypeScript",
      description: "Master full-stack JavaScript/TypeScript across frontend UI and Node.js backend runtimes.",
      tasks: [
        "Deep dive into TypeScript: interfaces, types, generics, and strict compiler configs",
        "Build modular React frontend components with custom hooks and Tailwind CSS",
        "Architect RESTful APIs with Node.js, Express, middleware chains, and input validation (Zod)",
        "Implement secure authentication with JWT access tokens, refresh tokens & httpOnly cookies"
      ]
    },
    {
      phase: "Phase 2: Database Architecture, SQL & Distributed Caching",
      description: "Relational database schema design, indexing, PostgreSQL, ORMs, and Redis caching layers.",
      tasks: [
        "Design normalized PostgreSQL schemas with foreign keys, constraints, and indexes",
        "Write complex SQL queries, JOINs, subqueries, and analyze execution plans with EXPLAIN ANALYZE",
        "Integrate ORMs (Prisma / TypeORM) with migration pipelines and connection pooling",
        "Implement Cache-Aside caching patterns and rate limiting with Redis"
      ]
    },
    {
      phase: "Phase 3: System Design, Microservices & Docker Deployment",
      description: "Scalable system architecture, message queues, containerization, and automated CI/CD.",
      tasks: [
        "Dockerize full-stack application with multi-container docker-compose environments",
        "Implement asynchronous event processing with background job queues (BullMQ / RabbitMQ)",
        "Design scalable system architectures for high concurrency (load balancers, DB replication)",
        "Write automated unit & integration tests with Jest, Supertest, and GitHub Actions CI"
      ]
    },
    {
      phase: "Phase 4: Skill Verification & Job Applications Sprint",
      description: "Verify full-stack proficiencies, solve coding challenges, and submit job applications.",
      tasks: [
        "Pass Full-Stack Scalability & System Architecture Exam",
        "Solve algorithmic DSA challenges (Arrays, Linked Lists, Trees, Dynamic Programming)",
        "Practice Full-Stack System Design in AI Mock Interview Studio",
        "Apply to SDE-1 and Full-Stack openings with verified readiness credentials"
      ]
    }
  ]
};

export function generatePersonalRoadmap(user, careerId) {
  const career = getCareerById(careerId || user.selectedCareerId || "senior-frontend-dev");
  const extractedSkills = (user.extractedSkills || []).map(s => s.toLowerCase());

  // Retrieve profession-specific syllabus or fallback to generic high-quality template
  const syllabus = PROFESSION_ROADMAP_CURRICULUM[career.id] || PROFESSION_ROADMAP_CURRICULUM["senior-frontend-dev"];

  // Retrieve user's tracked task progress from DB
  const userCheckedTasks = user.completedRoadmapTasks || [];

  // Generate interactive modules where all tasks start unchecked (0%) unless explicitly completed by user
  const modules = syllabus.map((moduleData, modIdx) => {
    let completedCount = 0;
    const subtasks = moduleData.tasks.map((taskText, taskIdx) => {
      const taskId = `task_${career.id}_m${modIdx + 1}_${taskIdx + 1}`;
      const isCompleted = userCheckedTasks.includes(taskId);
      if (isCompleted) completedCount++;

      return {
        id: taskId,
        text: taskText,
        completed: isCompleted
      };
    });

    const progress = Math.round((completedCount / subtasks.length) * 100);
    const status = progress === 100 ? "Completed" : (progress > 0 ? "In Progress" : "Upcoming");

    return {
      id: `mod_${modIdx + 1}`,
      title: moduleData.phase,
      description: moduleData.description,
      status,
      progress,
      subtasks
    };
  });

  // Calculate actual hours completed based on genuine user activity
  const completedHours = Number((user.weeklyStudyHours || 0.0).toFixed(1));
  const targetHours = user.weeklyStudyGoal || 6.0;

  // Curated AI Suggestions tailored to this profession
  const aiSuggestions = [
    {
      id: "sug_01",
      title: `Complete ${career.title} Mastery Course`,
      type: "Curated Course",
      duration: "6 hrs",
      url: "#",
      icon: "school"
    },
    {
      id: "sug_02",
      title: `${career.title} Production Architecture Patterns`,
      type: "Article / Whitepaper",
      duration: "15 min read",
      url: "#",
      icon: "article"
    },
    {
      id: "sug_03",
      title: `${career.title} Technical Interview Top 50 Questions`,
      type: "Practice Lab",
      duration: "45 mins",
      url: "#",
      icon: "terminal"
    }
  ];

  // Milestone Badges
  const milestones = [
    {
      id: "m1",
      title: `${career.title} Core Foundation Badge`,
      timeframe: "Phase 1 Completion",
      icon: "workspace_premium",
      color: "secondary"
    },
    {
      id: "m2",
      title: "Production Capstone Project",
      timeframe: "Phase 3 Completion",
      icon: "rocket_launch",
      color: "primary"
    },
    {
      id: "m3",
      title: "Job-Ready Readiness Score 90%+",
      timeframe: "Certification Complete",
      icon: "record_voice_over",
      color: "tertiary"
    }
  ];

  return {
    careerTitle: career.title,
    estimatedTimeline: career.targetTimeline || "Est. 3-4 Months",
    statusText: completedHours > 0 ? "In Progress" : "Ready to Start",
    weeklyGoal: {
      completedHours,
      targetHours,
      progressPercent: Math.min(100, Math.round((completedHours / targetHours) * 100)),
      encouragement: completedHours === 0
        ? "Ready to begin! Check off your first roadmap milestone to track study hours."
        : "Great progress! Keep checking off tasks as you study."
    },
    milestones,
    aiSuggestions,
    modules
  };
}
