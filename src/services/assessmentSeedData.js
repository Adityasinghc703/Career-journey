/**
 * Original Seed Data for Technical Assessment & Practice System
 * 8 Roles, 30+ Skills, and 45+ Original Questions
 * (No scraped/copyrighted questions; 100% original content)
 */

export const SEED_ROLES = [
  {
    id: "role_frontend_dev",
    name: "Frontend Developer",
    slug: "frontend-developer",
    description: "Building responsive, accessible, high-performance web applications using modern JavaScript/TypeScript, React, and browser APIs."
  },
  {
    id: "role_backend_dev",
    name: "Backend Developer",
    slug: "backend-developer",
    description: "Architecting scalable server-side systems, REST/GraphQL APIs, database persistence, caching, and secure backend microservices."
  },
  {
    id: "role_fullstack_dev",
    name: "Full-Stack Developer",
    slug: "full-stack-developer",
    description: "End-to-end web engineering covering modern reactive frontends, Node.js API services, relational databases, and authentication."
  },
  {
    id: "role_python_dev",
    name: "Python Developer",
    slug: "python-developer",
    description: "Developing clean, Pythonic applications, automation pipelines, RESTful APIs, OOP architectures, and algorithmic problem solving."
  },
  {
    id: "role_java_dev",
    name: "Java Developer",
    slug: "java-developer",
    description: "Enterprise application engineering using modern Java, Spring principles, OOP design patterns, collections, and database persistence."
  },
  {
    id: "role_data_analyst",
    name: "Data Analyst",
    slug: "data-analyst",
    description: "Extracting actionable insights from data using SQL queries, Python data analysis, statistical modeling, and data visualization."
  },
  {
    id: "role_devops_eng",
    name: "DevOps Engineer",
    slug: "devops-engineer",
    description: "Automating cloud infrastructure, CI/CD deployment pipelines, Linux server administration, Docker containerization, and security."
  },
  {
    id: "role_qa_eng",
    name: "QA Engineer",
    slug: "qa-engineer",
    description: "Quality engineering, comprehensive test planning, automated API and UI testing, regression verification, and bug triage."
  }
];

export const SEED_SKILLS = [
  // Frontend
  { id: "skill_html", name: "HTML5", slug: "html5", category: "Frontend" },
  { id: "skill_css", name: "CSS3 & Layouts", slug: "css3-layouts", category: "Frontend" },
  { id: "skill_js", name: "JavaScript", slug: "javascript", category: "Frontend" },
  { id: "skill_ts", name: "TypeScript", slug: "typescript", category: "Frontend" },
  { id: "skill_react", name: "React", slug: "react", category: "Frontend" },
  { id: "skill_a11y", name: "Web Accessibility (a11y)", slug: "accessibility", category: "Frontend" },
  { id: "skill_browser_apis", name: "Browser APIs & DOM", slug: "browser-apis", category: "Frontend" },

  // Backend
  { id: "skill_node", name: "Node.js", slug: "nodejs", category: "Backend" },
  { id: "skill_apis", name: "REST APIs & Architecture", slug: "rest-apis", category: "Backend" },
  { id: "skill_auth", name: "Authentication & Security", slug: "auth-security", category: "Backend" },
  { id: "skill_db", name: "Databases & SQL", slug: "databases-sql", category: "Backend" },
  { id: "skill_caching", name: "Caching & Redis", slug: "caching-redis", category: "Backend" },
  { id: "skill_sys_design", name: "System Design", slug: "system-design", category: "Backend" },

  // Languages & Core
  { id: "skill_python", name: "Python", slug: "python", category: "Programming" },
  { id: "skill_java", name: "Java", slug: "java", category: "Programming" },
  { id: "skill_oop", name: "Object-Oriented Programming (OOP)", slug: "oop", category: "CS Theory" },
  { id: "skill_dsa", name: "Data Structures & Algorithms", slug: "dsa", category: "CS Theory" },
  { id: "skill_dbms", name: "DBMS & Transactions", slug: "dbms", category: "CS Theory" },
  { id: "skill_os", name: "Operating Systems", slug: "operating-systems", category: "CS Theory" },
  { id: "skill_networking", name: "Computer Networking", slug: "networking", category: "CS Theory" },

  // DevOps & Tooling
  { id: "skill_git", name: "Git & Version Control", slug: "git", category: "DevOps & Tools" },
  { id: "skill_linux", name: "Linux Administration", slug: "linux", category: "DevOps & Tools" },
  { id: "skill_docker", name: "Docker & Containers", slug: "docker", category: "DevOps & Tools" },
  { id: "skill_cicd", name: "CI/CD Pipelines", slug: "cicd", category: "DevOps & Tools" },
  { id: "skill_cloud", name: "Cloud Fundamentals", slug: "cloud-basics", category: "DevOps & Tools" },

  // QA & Testing
  { id: "skill_testing_fund", name: "Testing Fundamentals", slug: "testing-fundamentals", category: "QA & Testing" },
  { id: "skill_api_testing", name: "API & Integration Testing", slug: "api-testing", category: "QA & Testing" },
  { id: "skill_automation", name: "Test Automation", slug: "test-automation", category: "QA & Testing" },
  { id: "skill_debugging", name: "Debugging & Problem Isolation", slug: "debugging", category: "QA & Testing" },

  // Data
  { id: "skill_stats", name: "Statistics & Data Analysis", slug: "statistics", category: "Data Science" },
  { id: "skill_data_viz", name: "Data Visualization", slug: "data-visualization", category: "Data Science" }
];

export const SEED_ROLE_SKILLS = [
  // Frontend Developer
  { roleId: "role_frontend_dev", skillId: "skill_js", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_frontend_dev", skillId: "skill_react", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_frontend_dev", skillId: "skill_html", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_frontend_dev", skillId: "skill_css", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_frontend_dev", skillId: "skill_ts", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_frontend_dev", skillId: "skill_browser_apis", importanceWeight: 7, recommendedLevel: "intermediate" },
  { roleId: "role_frontend_dev", skillId: "skill_a11y", importanceWeight: 6, recommendedLevel: "beginner" },
  { roleId: "role_frontend_dev", skillId: "skill_git", importanceWeight: 7, recommendedLevel: "beginner" },
  { roleId: "role_frontend_dev", skillId: "skill_debugging", importanceWeight: 8, recommendedLevel: "intermediate" },

  // Backend Developer
  { roleId: "role_backend_dev", skillId: "skill_node", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_backend_dev", skillId: "skill_apis", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_backend_dev", skillId: "skill_db", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_backend_dev", skillId: "skill_auth", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_backend_dev", skillId: "skill_caching", importanceWeight: 7, recommendedLevel: "intermediate" },
  { roleId: "role_backend_dev", skillId: "skill_sys_design", importanceWeight: 9, recommendedLevel: "advanced" },
  { roleId: "role_backend_dev", skillId: "skill_git", importanceWeight: 7, recommendedLevel: "beginner" },
  { roleId: "role_backend_dev", skillId: "skill_dbms", importanceWeight: 8, recommendedLevel: "intermediate" },

  // Full-Stack Developer
  { roleId: "role_fullstack_dev", skillId: "skill_js", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_fullstack_dev", skillId: "skill_react", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_fullstack_dev", skillId: "skill_node", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_fullstack_dev", skillId: "skill_apis", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_fullstack_dev", skillId: "skill_db", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_fullstack_dev", skillId: "skill_auth", importanceWeight: 7, recommendedLevel: "intermediate" },
  { roleId: "role_fullstack_dev", skillId: "skill_git", importanceWeight: 7, recommendedLevel: "beginner" },
  { roleId: "role_fullstack_dev", skillId: "skill_debugging", importanceWeight: 8, recommendedLevel: "intermediate" },

  // Python Developer
  { roleId: "role_python_dev", skillId: "skill_python", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_python_dev", skillId: "skill_oop", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_python_dev", skillId: "skill_dsa", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_python_dev", skillId: "skill_apis", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_python_dev", skillId: "skill_db", importanceWeight: 7, recommendedLevel: "intermediate" },
  { roleId: "role_python_dev", skillId: "skill_testing_fund", importanceWeight: 7, recommendedLevel: "beginner" },
  { roleId: "role_python_dev", skillId: "skill_git", importanceWeight: 7, recommendedLevel: "beginner" },
  { roleId: "role_python_dev", skillId: "skill_debugging", importanceWeight: 8, recommendedLevel: "intermediate" },

  // Java Developer
  { roleId: "role_java_dev", skillId: "skill_java", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_java_dev", skillId: "skill_oop", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_java_dev", skillId: "skill_dsa", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_java_dev", skillId: "skill_db", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_java_dev", skillId: "skill_apis", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_java_dev", skillId: "skill_testing_fund", importanceWeight: 7, recommendedLevel: "intermediate" },
  { roleId: "role_java_dev", skillId: "skill_git", importanceWeight: 7, recommendedLevel: "beginner" },

  // Data Analyst
  { roleId: "role_data_analyst", skillId: "skill_db", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_data_analyst", skillId: "skill_python", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_data_analyst", skillId: "skill_stats", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_data_analyst", skillId: "skill_data_viz", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_data_analyst", skillId: "skill_dbms", importanceWeight: 8, recommendedLevel: "intermediate" },

  // DevOps Engineer
  { roleId: "role_devops_eng", skillId: "skill_linux", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_devops_eng", skillId: "skill_docker", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_devops_eng", skillId: "skill_cicd", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_devops_eng", skillId: "skill_cloud", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_devops_eng", skillId: "skill_networking", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_devops_eng", skillId: "skill_git", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_devops_eng", skillId: "skill_auth", importanceWeight: 7, recommendedLevel: "intermediate" },

  // QA Engineer
  { roleId: "role_qa_eng", skillId: "skill_testing_fund", importanceWeight: 10, recommendedLevel: "intermediate" },
  { roleId: "role_qa_eng", skillId: "skill_api_testing", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_qa_eng", skillId: "skill_automation", importanceWeight: 8, recommendedLevel: "intermediate" },
  { roleId: "role_qa_eng", skillId: "skill_debugging", importanceWeight: 9, recommendedLevel: "intermediate" },
  { roleId: "role_qa_eng", skillId: "skill_db", importanceWeight: 7, recommendedLevel: "beginner" },
  { roleId: "role_qa_eng", skillId: "skill_git", importanceWeight: 7, recommendedLevel: "beginner" }
];

export const SEED_QUESTIONS = [
  // 1. MULTIPLE CHOICE THEORY (15 QUESTIONS)
  {
    id: "q_mcq_01",
    title: "JavaScript Event Loop & Microtasks",
    slug: "js-event-loop-microtasks",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "In JavaScript's concurrency model, what is the execution priority between `Promise.resolve().then(...)` (Microtask queue) and `setTimeout(..., 0)` (Macrotask queue) after the current synchronous call stack empties?",
    explanation: "Microtasks (resolved Promise callbacks, queueMicrotask) are always completely drained before the event loop picks the next macrotask (such as setTimeout/setInterval).",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_js", weight: 1.0 }],
    options: [
      { id: "opt_1", text: "The Promise callback executes before the setTimeout callback.", isCorrect: true, explanation: "Microtask queue executes immediately after synchronous code." },
      { id: "opt_2", text: "The setTimeout callback executes first because it has a 0ms timer.", isCorrect: false, explanation: "Timers go to the macrotask queue, which yields to microtasks." },
      { id: "opt_3", text: "They run simultaneously on parallel CPU threads.", isCorrect: false, explanation: "JavaScript runtime execution is single-threaded on the main thread." },
      { id: "opt_4", text: "The execution order is completely non-deterministic.", isCorrect: false, explanation: "The ECMAScript specification defines strict queue order." }
    ]
  },
  {
    id: "q_mcq_02",
    title: "React useEffect Dependency Invalidation",
    slug: "react-useeffect-dependency-invalidation",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "Why does passing an inline object (e.g. `{ id: userId }`) inside a React `useEffect` dependency array frequently cause infinite re-render loops if state updates occur inside the effect?",
    explanation: "In JavaScript, objects are compared by referential identity (Object.is), not deep value equality. On every component render, a new object reference in memory is created, causing React to treat the dependency as changed every render.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_react", weight: 1.0 }, { skillId: "skill_js", weight: 0.5 }],
    options: [
      { id: "opt_1", text: "Inline object literals create a new memory reference on every render, failing referential equality check (Object.is).", isCorrect: true, explanation: "React uses Object.is referential comparison for dependency checking." },
      { id: "opt_2", text: "React useEffect only supports primitive numbers in dependency arrays.", isCorrect: false, explanation: "Objects are allowed, but will trigger on every reference change." },
      { id: "opt_3", text: "React freezes all objects declared inside JSX.", isCorrect: false, explanation: "React does not freeze inline object references." },
      { id: "opt_4", text: "Objects in dependencies automatically mutate state synchronously.", isCorrect: false, explanation: "Dependencies do not mutate state; they only control trigger conditions." }
    ]
  },
  {
    id: "q_mcq_03",
    title: "SQL Indexing B-Tree vs Hash",
    slug: "sql-indexing-btree-vs-hash",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "Which query pattern benefits from a standard B-Tree database index but CANNOT utilize a Hash index?",
    explanation: "Hash indexes only support direct equality operators (=, <=>) because hash functions scatter keys non-linearly. B-Tree indexes keep keys sorted, making range scans (BETWEEN, >, <) and prefix searches extremely efficient.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_db", weight: 1.0 }, { skillId: "skill_dbms", weight: 0.8 }],
    options: [
      { id: "opt_1", text: "Range queries such as `WHERE created_at BETWEEN '2026-01-01' AND '2026-06-30'`", isCorrect: true, explanation: "Hash indexes cannot preserve ordering for range comparisons." },
      { id: "opt_2", text: "Exact match lookups such as `WHERE user_id = 452`", isCorrect: false, explanation: "Hash indexes are optimal for exact equality lookups." },
      { id: "opt_3", text: "Boolean lookups such as `WHERE is_active = true`", isCorrect: false, explanation: "Hash indexes can evaluate equality matches." },
      { id: "opt_4", text: "Primary key joins with identical IDs", isCorrect: false, explanation: "Primary key equality joins can use hash indexes." }
    ]
  },
  {
    id: "q_mcq_04",
    title: "ACID Isolation Levels & Phantom Reads",
    slug: "acid-isolation-phantom-reads",
    questionType: "multiple_choice",
    difficulty: "advanced",
    prompt: "In relational database management systems (RDBMS), which SQL transaction isolation level guarantees protection against 'Phantom Reads' (where re-running a range query finds new rows inserted by another concurrent transaction)?",
    explanation: "SERIALIZABLE is the highest isolation level and prevents dirty reads, non-repeatable reads, and phantom reads (typically using range locks or multiversion concurrency control serializability checks).",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_dbms", weight: 1.0 }, { skillId: "skill_db", weight: 0.7 }],
    options: [
      { id: "opt_1", text: "SERIALIZABLE", isCorrect: true, explanation: "Serializable isolation enforces predicate locks preventing new phantom row insertions." },
      { id: "opt_2", text: "READ COMMITTED", isCorrect: false, explanation: "Read Committed allows both non-repeatable reads and phantom reads." },
      { id: "opt_3", text: "REPEATABLE READ (Standard ANSI)", isCorrect: false, explanation: "In standard ANSI SQL, Repeatable Read protects row modifications but permits phantom row inserts." },
      { id: "opt_4", text: "READ UNCOMMITTED", isCorrect: false, explanation: "Read Uncommitted is vulnerable to dirty reads, non-repeatable reads, and phantoms." }
    ]
  },
  {
    id: "q_mcq_05",
    title: "HTTP/2 Multiplexing vs HTTP/1.1 Head-of-Line Blocking",
    slug: "http2-multiplexing-vs-http1",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "How does HTTP/2 solve the application-layer Head-of-Line (HoL) blocking problem present in HTTP/1.1?",
    explanation: "HTTP/2 introduces a binary framing layer that breaks request and response messages down into independent, interleaved frames over a single shared TCP connection.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_networking", weight: 1.0 }, { skillId: "skill_apis", weight: 0.6 }],
    options: [
      { id: "opt_1", text: "By breaking HTTP messages into binary frames that can be multiplexed concurrently over a single TCP connection.", isCorrect: true, explanation: "Binary framing allows interleaved streams without waiting for preceding responses." },
      { id: "opt_2", text: "By opening 50 separate TCP socket connections per domain name simultaneously.", isCorrect: false, explanation: "Opening multiple connections was the HTTP/1.1 workaround, not HTTP/2 multiplexing." },
      { id: "opt_3", text: "By replacing TCP entirely with UDP datagram packets.", isCorrect: false, explanation: "Replacing TCP with UDP (QUIC) is the feature of HTTP/3, not HTTP/2." },
      { id: "opt_4", text: "By compressing request bodies with Gzip automatically.", isCorrect: false, explanation: "HPACK handles header compression, but multiplexing solves HoL blocking." }
    ]
  },
  {
    id: "q_mcq_06",
    title: "Docker Layer Caching Optimization",
    slug: "docker-layer-caching-optimization",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "In a Node.js Dockerfile, why is it recommended to copy `package.json` and run `npm install` BEFORE copying the entire project source directory (`COPY . .`)?",
    explanation: "Docker caches each build step layer. If source code changes but package.json remains untouched, Docker can reuse the cached `npm install` layer, accelerating build times from minutes to seconds.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_docker", weight: 1.0 }, { skillId: "skill_cicd", weight: 0.5 }],
    options: [
      { id: "opt_1", text: "To maximize Docker layer caching so dependencies are not reinstalled when only application source code changes.", isCorrect: true, explanation: "Docker reuses cached layers up until the first step where file hashes change." },
      { id: "opt_2", text: "Because npm install cannot access files in the root folder.", isCorrect: false, explanation: "npm install only needs package.json/package-lock.json." },
      { id: "opt_3", text: "To prevent TypeScript files from being compiled into the container.", isCorrect: false, explanation: "Layer ordering does not determine file compilation." },
      { id: "opt_4", text: "Because Docker containers cannot write to disk after COPY commands.", isCorrect: false, explanation: "Containers remain writable during all RUN steps in multi-stage builds." }
    ]
  },
  {
    id: "q_mcq_07",
    title: "Git Rebase vs Git Merge",
    slug: "git-rebase-vs-git-merge",
    questionType: "multiple_choice",
    difficulty: "beginner",
    prompt: "What is the primary difference in Git commit history when integrating a feature branch using `git rebase main` compared to `git merge main`?",
    explanation: "`git rebase` replays your feature commits on top of the tip of the target branch, creating a linear, chronological commit history without generating an extra merge commit.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_git", weight: 1.0 }],
    options: [
      { id: "opt_1", text: "Rebase rewrites commit history to create a clean, linear sequence, whereas merge preserves exact commit timestamps and creates a dedicated merge commit.", isCorrect: true, explanation: "Rebasing creates new commit hashes replayed on top of the upstream branch." },
      { id: "opt_2", text: "Rebase deletes all past commit messages permanently.", isCorrect: false, explanation: "Rebase preserves commit messages unless interactive squash is requested." },
      { id: "opt_3", text: "Merge is only possible between remote repositories on GitHub.", isCorrect: false, explanation: "Merge is a core local Git operation." },
      { id: "opt_4", text: "Rebase automatically resolves all merge conflicts without developer input.", isCorrect: false, explanation: "Conflicts must still be resolved during each replayed commit." }
    ]
  },
  {
    id: "q_mcq_08",
    title: "Python GIL (Global Interpreter Lock) Concurrency",
    slug: "python-gil-concurrency",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "How does CPython's Global Interpreter Lock (GIL) affect multi-threaded CPU-bound programs in Python?",
    explanation: "The GIL ensures that only one native OS thread executes Python bytecode at any single instant within a single interpreter process. For CPU-bound tasks, multi-threading cannot leverage multiple CPU cores; the `multiprocessing` module is required instead.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_python", weight: 1.0 }, { skillId: "skill_os", weight: 0.6 }],
    options: [
      { id: "opt_1", text: "It restricts bytecode execution to a single CPU core at any given time, preventing CPU-bound threads from achieving true multi-core parallelism.", isCorrect: true, explanation: "CPython GIL serializes bytecode execution across threads in a process." },
      { id: "opt_2", text: "It prevents Python from making asynchronous HTTP network calls.", isCorrect: false, explanation: "I/O bound operations release the GIL while waiting." },
      { id: "opt_3", text: "It forces all Python variables to become immutable.", isCorrect: false, explanation: "GIL manages memory safety, not object mutability." },
      { id: "opt_4", text: "It disables garbage collection during loop executions.", isCorrect: false, explanation: "Reference counting and cyclical GC operate alongside the GIL." }
    ]
  },
  {
    id: "q_mcq_09",
    title: "Java Memory Model: Heap vs Stack",
    slug: "java-memory-heap-vs-stack",
    questionType: "multiple_choice",
    difficulty: "beginner",
    prompt: "In the Java Virtual Machine (JVM), where are object instances allocated versus local primitive variable declarations?",
    explanation: "In the JVM, all object instances reside on the shared Garbage Collected Heap, while local primitive variables and method call execution frames reside on the per-thread Call Stack.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_java", weight: 1.0 }, { skillId: "skill_oop", weight: 0.6 }],
    options: [
      { id: "opt_1", text: "Object instances are allocated on the Heap; local primitive variables are stored on the thread's Stack.", isCorrect: true, explanation: "The Heap stores reference types; thread execution stacks store local primitives." },
      { id: "opt_2", text: "All variables and objects are stored exclusively on the Stack.", isCorrect: false, explanation: "Stack memory cannot accommodate dynamic lifetime objects." },
      { id: "opt_3", text: "Primitive variables reside on the Heap, while classes reside in CPU cache.", isCorrect: false, explanation: "Local primitives are allocated within stack frames." },
      { id: "opt_4", text: "The JVM does not separate Heap and Stack memory.", isCorrect: false, explanation: "The JVM specification explicitly separates Heap and Stack regions." }
    ]
  },
  {
    id: "q_mcq_10",
    title: "REST Idempotency",
    slug: "rest-idempotency",
    questionType: "multiple_choice",
    difficulty: "beginner",
    prompt: "Which of the following HTTP methods is defined by the HTTP/1.1 specification as strictly IDEMPOTENT (making multiple identical requests produces the exact same server state as a single request)?",
    explanation: "PUT and DELETE are idempotent because executing `PUT /users/1` or `DELETE /users/1` multiple times results in the same end state on the server. POST is not idempotent as repeated calls create multiple resources.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_apis", weight: 1.0 }],
    options: [
      { id: "opt_1", text: "PUT and DELETE", isCorrect: true, explanation: "Repeating PUT or DELETE results in the same resource state." },
      { id: "opt_2", text: "POST and PATCH", isCorrect: false, explanation: "POST creates new records on repeat; PATCH can apply relative increments." },
      { id: "opt_3", text: "Only POST", isCorrect: false, explanation: "POST is explicitly non-idempotent." },
      { id: "opt_4", text: "HTTP specification does not define idempotency for any method.", isCorrect: false, explanation: "RFC 7231 specifically defines idempotent methods." }
    ]
  },
  {
    id: "q_mcq_11",
    title: "TypeScript Discriminated Unions",
    slug: "ts-discriminated-unions",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "What is a 'Discriminated Union' (tagged union) in TypeScript and how does it assist type narrowing?",
    explanation: "A discriminated union is a union of object types where each type shares a common literal property (the discriminant, such as `type: 'success' | 'error'`). TypeScript's control flow analysis uses this tag to narrow down specific object shapes in switch or if statements.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_ts", weight: 1.0 }, { skillId: "skill_js", weight: 0.5 }],
    options: [
      { id: "opt_1", text: "A union of types sharing a common literal discriminator field, enabling TypeScript to narrow types accurately in conditional branches.", isCorrect: true, explanation: "The shared literal property acts as a type guard for compiler narrowing." },
      { id: "opt_2", text: "A method of converting JavaScript numbers to binary strings.", isCorrect: false, explanation: "This describes radix formatting, not union types." },
      { id: "opt_3", text: "A mechanism that hides private class variables at runtime.", isCorrect: false, explanation: "Discriminated unions are compile-time structural typing constructs." },
      { id: "opt_4", text: "A tool to merge CSS stylesheets into TypeScript definitions.", isCorrect: false, explanation: "Unions describe data types, not styling modules." }
    ]
  },
  {
    id: "q_mcq_12",
    title: "Web Accessibility (a11y) ARIA Labels",
    slug: "a11y-aria-labels",
    questionType: "multiple_choice",
    difficulty: "beginner",
    prompt: "When designing an accessible icon-only button (e.g. `<button><svg>...</svg></button>`), what is the best practice to ensure screen reader assistive technologies can convey the button's purpose?",
    explanation: "Icon buttons lack readable text nodes. Providing an `aria-label=\"Close dialog\"` attribute gives screen readers descriptive text to announce to visually impaired users.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_a11y", weight: 1.0 }, { skillId: "skill_html", weight: 0.7 }],
    options: [
      { id: "opt_1", text: "Add an `aria-label` attribute describing the specific action (e.g. `aria-label=\"Close modal\"`).", isCorrect: true, explanation: "aria-label provides accessible naming for interactive elements without visible text." },
      { id: "opt_2", text: "Add an inline CSS hover tooltip with `title`.", isCorrect: false, explanation: "title attributes are not reliably announced and fail touch screen accessibility." },
      { id: "opt_3", text: "Change the button element to a generic `<div>` with `onclick`.", isCorrect: false, explanation: "Non-semantic divs lose keyboard focus and ARIA button roles." },
      { id: "opt_4", text: "Apply CSS `display: none` to the icon.", isCorrect: false, explanation: "Hiding the icon removes it from visual rendering altogether." }
    ]
  },
  {
    id: "q_mcq_13",
    title: "Database Normalization (3NF)",
    slug: "db-normalization-3nf",
    questionType: "multiple_choice",
    difficulty: "intermediate",
    prompt: "A database table is considered to be in Third Normal Form (3NF) if it is already in 2NF and satisfies which key condition?",
    explanation: "Third Normal Form requires that every non-prime attribute is non-transitively dependent on every candidate key (no non-key attribute depends on another non-key attribute).",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_dbms", weight: 1.0 }, { skillId: "skill_db", weight: 0.7 }],
    options: [
      { id: "opt_1", text: "It contains no transitive functional dependencies (no non-key attribute determines another non-key attribute).", isCorrect: true, explanation: "3NF eliminates transitive dependencies between non-primary attributes." },
      { id: "opt_2", text: "Every column contains a JSON formatted document.", isCorrect: false, explanation: "JSON columns often violate 1NF atomicity." },
      { id: "opt_3", text: "It possesses at least 3 foreign key constraints.", isCorrect: false, explanation: "Foreign key count does not determine normalization level." },
      { id: "opt_4", text: "All columns are declared with NOT NULL constraints.", isCorrect: false, explanation: "Nullable columns are permitted in 3NF." }
    ]
  },
  {
    id: "q_mcq_14",
    title: "Linux File Permissions & Octal Masks",
    slug: "linux-file-permissions-octal",
    questionType: "multiple_choice",
    difficulty: "beginner",
    prompt: "In a Linux terminal, what permissions does executing `chmod 754 script.sh` grant to the User (Owner), Group, and Others respectively?",
    explanation: "7 = Read(4)+Write(2)+Execute(1) (rwx for owner). 5 = Read(4)+Execute(1) (r-x for group). 4 = Read(4) (r-- for others).",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_linux", weight: 1.0 }, { skillId: "skill_os", weight: 0.5 }],
    options: [
      { id: "opt_1", text: "User: Read/Write/Execute (rwx), Group: Read/Execute (r-x), Others: Read-only (r--)", isCorrect: true, explanation: "7 = 4+2+1 (rwx), 5 = 4+0+1 (r-x), 4 = 4+0+0 (r--)." },
      { id: "opt_2", text: "User: Read-only, Group: Write-only, Others: Execute-only", isCorrect: false, explanation: "Octal permissions sum binary bit flags." },
      { id: "opt_3", text: "User: Read/Write, Group: Read/Write, Others: Read/Write", isCorrect: false, explanation: "Full read/write is 666." },
      { id: "opt_4", text: "All users receive root administrator execution access", isCorrect: false, explanation: "Permissions are scoped specifically to owner/group/other masks." }
    ]
  },
  {
    id: "q_mcq_15",
    title: "Software Testing Pyramid",
    slug: "software-testing-pyramid",
    questionType: "multiple_choice",
    difficulty: "beginner",
    prompt: "According to the industry-standard Testing Pyramid principle, how should a test suite be distributed for optimal speed, cost, and reliability?",
    explanation: "The pyramid advocates for a large foundation of fast, inexpensive Unit Tests, a moderate middle layer of Integration/API tests, and a lean top tier of End-to-End (E2E) UI tests.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_testing_fund", weight: 1.0 }, { skillId: "skill_api_testing", weight: 0.6 }],
    options: [
      { id: "opt_1", text: "A broad base of fast Unit tests, a moderate layer of Integration tests, and a minimal set of End-to-End UI tests.", isCorrect: true, explanation: "Unit tests are fast and deterministic, while E2E tests are slower and prone to flakiness." },
      { id: "opt_2", text: "100% End-to-End UI tests and zero unit tests.", isCorrect: false, explanation: "An inverted pyramid leads to brittle, slow CI pipelines." },
      { id: "opt_3", text: "Only manual exploratory testing performed right before deployment.", isCorrect: false, explanation: "Automated regression suites are essential for continuous delivery." },
      { id: "opt_4", text: "Equal 33% distribution across unit, integration, and load tests.", isCorrect: false, explanation: "Unit tests should always outnumber higher-level tests." }
    ]
  },

  // 2. SCENARIO / DEBUGGING (10 QUESTIONS)
  {
    id: "q_scen_01",
    title: "Scenario: Node.js Memory Leak in Event Listeners",
    slug: "scenario-nodejs-eventlistener-memory-leak",
    questionType: "scenario",
    difficulty: "intermediate",
    prompt: `You notice an Express.js production microservice steadily consuming RAM until it crashes with 'JavaScript heap out of memory'. Code review reveals the following route handler:

\`\`\`javascript
const EventEmitter = require('events');
const notificationHub = new EventEmitter();

app.get('/api/stream-updates', (req, res) => {
  const onNewData = (data) => res.write(JSON.stringify(data));
  notificationHub.on('broadcast', onNewData);
  // Connection remains open...
});
\`\`\`

What is the root cause of the memory leak and how should it be resolved?`,
    explanation: "Every incoming HTTP request adds a new listener function closure referencing `res` to the global `notificationHub`. When clients disconnect or abort, the listener is never removed, preventing the garbage collector from reclaiming response objects. The fix is to listen for `req.on('close', () => notificationHub.removeListener('broadcast', onNewData))`.",
    estimatedMinutes: 4,
    status: "published",
    skills: [{ skillId: "skill_node", weight: 1.0 }, { skillId: "skill_debugging", weight: 0.9 }],
    options: [
      { id: "opt_1", text: "The event listener references the `res` closure and is never removed when the client disconnects. Fix: Bind `req.on('close', ...)` to remove the listener.", isCorrect: true, explanation: "Unregistered event listeners retain closures in heap memory indefinitely." },
      { id: "opt_2", text: "Express does not support JSON.stringify inside route handlers.", isCorrect: false, explanation: "JSON stringification is standard in streams." },
      { id: "opt_3", text: "Node.js EventEmitters cannot be instantiated as constants.", isCorrect: false, explanation: "Const variables do not cause memory leaks." },
      { id: "opt_4", text: "The route path must end in '.json' to avoid memory leaks.", isCorrect: false, explanation: "URL naming has no bearing on V8 heap memory." }
    ]
  },
  {
    id: "q_scen_02",
    title: "Scenario: Database N+1 Query Anti-Pattern",
    slug: "scenario-database-n-plus-1-query",
    questionType: "scenario",
    difficulty: "intermediate",
    prompt: `An API endpoint fetching 50 blog posts takes 4.2 seconds to load. Server logs show 51 separate SQL queries generated for a single HTTP request:
1. \`SELECT * FROM posts LIMIT 50;\`
2. \`SELECT * FROM authors WHERE id = 1;\`
3. \`SELECT * FROM authors WHERE id = 2;\`
... (repeated 50 times in a loop)

What database optimization technique eliminates this performance bottleneck?`,
    explanation: "This is the classic N+1 query problem. Instead of executing an isolated query inside a loop for each parent record, you should execute an eager JOIN (`SELECT * FROM posts JOIN authors ON posts.author_id = authors.id`) or a single batch lookup (`SELECT * FROM authors WHERE id IN (...)`).",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_db", weight: 1.0 }, { skillId: "skill_dbms", weight: 0.8 }],
    options: [
      { id: "opt_1", text: "Use eager loading with a SQL JOIN or batch `IN (...)` lookup to retrieve all authors in a single query.", isCorrect: true, explanation: "Eager loading reduces 51 queries down to 1 or 2 consolidated queries." },
      { id: "opt_2", text: "Increase database connection pool size to 500 connections.", isCorrect: false, explanation: "Pool resizing does not fix inefficient O(N) query loops." },
      { id: "opt_3", text: "Convert all author names to uppercase in SQL.", isCorrect: false, explanation: "String formatting does not improve I/O latency." },
      { id: "opt_4", text: "Add a database trigger to execute a sleep delay.", isCorrect: false, explanation: "Delays will further degrade response latency." }
    ]
  },
  {
    id: "q_scen_03",
    title: "Scenario: CORS Preflight Request Failure",
    slug: "scenario-cors-preflight-failure",
    questionType: "scenario",
    difficulty: "intermediate",
    prompt: `A frontend app hosted on \`https://app.careerjourney.com\` makes a \`fetch()\` with custom header \`Authorization: Bearer <token>\` to backend \`https://api.careerjourney.com\`. The browser console reports:
\`Access to fetch has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present.\`

Why did the browser trigger a preflight request and what must the backend server respond with?`,
    explanation: "Requests with non-simple headers (like Authorization or application/json) trigger an automatic HTTP OPTIONS preflight request. The backend server must intercept `OPTIONS` requests and return `204/200` with headers `Access-Control-Allow-Origin: https://app.careerjourney.com` and `Access-Control-Allow-Headers: Authorization, Content-Type`.",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_apis", weight: 1.0 }, { skillId: "skill_auth", weight: 0.8 }],
    options: [
      { id: "opt_1", text: "The custom `Authorization` header triggers an HTTP OPTIONS preflight; the backend must respond with 200/204 and valid `Access-Control-Allow-Origin` & `Access-Control-Allow-Headers` headers.", isCorrect: true, explanation: "Non-simple HTTP requests require successful OPTIONS preflight response with permission headers." },
      { id: "opt_2", text: "The user has JavaScript disabled in their browser settings.", isCorrect: false, explanation: "CORS errors occur during browser network stack execution." },
      { id: "opt_3", text: "The frontend must switch from HTTPS to plain unencrypted HTTP.", isCorrect: false, explanation: "Downgrading to HTTP compromises security and does not resolve origin domain mismatches." },
      { id: "opt_4", text: "CORS only applies to GET requests with URL query parameters.", isCorrect: false, explanation: "CORS governs cross-origin requests across all HTTP verbs." }
    ]
  },
  {
    id: "q_scen_04",
    title: "Scenario: E-Commerce Inventory Concurrency Race Condition",
    slug: "scenario-ecommerce-concurrency-race-condition",
    questionType: "scenario",
    difficulty: "advanced",
    prompt: `During a flash sale with 1 item left in stock, two users click 'Buy Now' at the exact same millisecond. Both requests execute:
\`\`\`sql
-- Step 1: Check stock
SELECT stock FROM products WHERE id = 101; -- returns 1 for both
-- Step 2: Update stock
UPDATE products SET stock = stock - 1 WHERE id = 101; -- both update to 0
\`\`\`
Both users receive order confirmations, resulting in overselling (-1 stock). Which database mechanism guarantees atomic updates and prevents this race condition?`,
    explanation: "Executing a single atomic conditional update (`UPDATE products SET stock = stock - 1 WHERE id = 101 AND stock > 0`) or utilizing pessimistic locking (`SELECT ... FOR UPDATE`) inside a transaction ensures only one transaction acquires the lock and updates successfully.",
    estimatedMinutes: 4,
    status: "published",
    skills: [{ skillId: "skill_dbms", weight: 1.0 }, { skillId: "skill_sys_design", weight: 0.8 }],
    options: [
      { id: "opt_1", text: "Use an atomic conditional query (`WHERE stock > 0`) or pessimistic locking with `SELECT ... FOR UPDATE` inside a transaction.", isCorrect: true, explanation: "Row-level locks or atomic conditional updates guarantee stock cannot decrement past zero." },
      { id: "opt_2", text: "Add a 5-second `setTimeout()` delay between the SELECT and UPDATE queries.", isCorrect: false, explanation: "Sleep timers widen the race condition window rather than fixing it." },
      { id: "opt_3", text: "Store inventory numbers as floating-point decimals.", isCorrect: false, explanation: "Data types do not prevent race conditions." },
      { id: "opt_4", text: "Disable all database indexes on the products table.", isCorrect: false, explanation: "Removing indexes degrades search performance and does not provide atomicity." }
    ]
  },
  {
    id: "q_scen_05",
    title: "Scenario: React State Batching & Stale Closures",
    slug: "scenario-react-stale-closures",
    questionType: "scenario",
    difficulty: "beginner",
    prompt: `A student writes a counter increment function inside a React component:
\`\`\`javascript
const [count, setCount] = useState(0);

const handleTripleIncrement = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
\`\`\`
When the button is clicked once, the counter only increments by 1 instead of 3. Why does this happen and how is it fixed?`,
    explanation: "In React, state updates are batched. Because `count` is captured from the current render's closure (e.g. 0), all three calls evaluate `setCount(0 + 1)`. The correct fix is to use functional state updates: `setCount(prev => prev + 1)`.",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_react", weight: 1.0 }, { skillId: "skill_js", weight: 0.6 }],
    options: [
      { id: "opt_1", text: "Each call reads the same stale `count` closure value. Fix: Use functional updater form `setCount(prev => prev + 1)`.", isCorrect: true, explanation: "Functional updates guarantee access to the most pending updated state." },
      { id: "opt_2", text: "React only allows one state update per hour.", isCorrect: false, explanation: "React has no time-based rate limits on state calls." },
      { id: "opt_3", text: "useState must always be declared with let instead of const.", isCorrect: false, explanation: "State setter functions update component state, not the local constant identifier." },
      { id: "opt_4", text: "The component must be converted to an HTML iframe.", isCorrect: false, explanation: "Iframes isolate browsing contexts, not React state cycles." }
    ]
  },
  {
    id: "q_scen_06",
    title: "Scenario: Python Mutable Default Argument Bug",
    slug: "scenario-python-mutable-default-argument",
    questionType: "scenario",
    difficulty: "beginner",
    prompt: `Consider the following Python function definition:
\`\`\`python
def append_submission(user_id, scores=[]):
    scores.append(user_id)
    return scores

print(append_submission(101)) # Output: [101]
print(append_submission(202)) # Output: [101, 202] (Unexpected!)
\`\`\`
Why is the list retained between separate function invocations?`,
    explanation: "In Python, default parameter expressions are evaluated once when the function is defined, NOT each time the function is called. If a mutable object (like a list or dict) is used as a default, all calls without an explicit argument share the exact same list instance in memory. Standard fix: `scores=None` and initialize `if scores is None: scores = []`.",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_python", weight: 1.0 }, { skillId: "skill_debugging", weight: 0.8 }],
    options: [
      { id: "opt_1", text: "Default arguments are evaluated once at function definition time; the mutable list is shared across calls. Fix: Use `scores=None` and initialize inside the function body.", isCorrect: true, explanation: "Mutable default arguments are a classic Python gotcha caused by definition-time evaluation." },
      { id: "opt_2", text: "Python integers are automatically cast to string arrays.", isCorrect: false, explanation: "Python is strongly typed and does not perform implicit list conversions." },
      { id: "opt_3", text: "The print function alters global variables in memory.", isCorrect: false, explanation: "print() only writes to standard output stream." },
      { id: "opt_4", text: "Functions in Python cannot accept more than one parameter.", isCorrect: false, explanation: "Python functions support multiple positional and keyword arguments." }
    ]
  },
  {
    id: "q_scen_07",
    title: "Scenario: Java NullPointerException with Auto-Unboxing",
    slug: "scenario-java-npe-auto-unboxing",
    questionType: "scenario",
    difficulty: "intermediate",
    prompt: `A Java backend microservice throws a \`NullPointerException\` on line 4:
\`\`\`java
1: Map<String, Integer> userCredits = new HashMap<>();
2: userCredits.put("alice", 100);
3: // "bob" key does not exist in the map
4: int bobCredits = userCredits.get("bob"); 
\`\`\`
Why does line 4 fail with an NPE even though no explicit method was called on a null reference?`,
    explanation: "`Map.get(\"bob\")` returns `null` (an `Integer` wrapper object). When assigning this to a primitive `int bobCredits`, the JVM automatically attempts auto-unboxing by invoking `.intValue()` on the null Integer reference, which triggers a NullPointerException.",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_java", weight: 1.0 }, { skillId: "skill_debugging", weight: 0.7 }],
    options: [
      { id: "opt_1", text: "`userCredits.get(\"bob\")` returns `null` (Integer wrapper); JVM auto-unboxing attempts `null.intValue()`, causing the NullPointerException.", isCorrect: true, explanation: "Auto-unboxing null wrapper objects to primitives causes runtime NPEs." },
      { id: "opt_2", text: "Java HashMaps cannot hold String keys.", isCorrect: false, explanation: "Strings are standard hashable keys in Java collections." },
      { id: "opt_3", text: "HashMap requires manual garbage collection before reading.", isCorrect: false, explanation: "Garbage collection is automatic in the JVM." },
      { id: "opt_4", text: "Primitive `int` variables can only store negative numbers.", isCorrect: false, explanation: "int stores 32-bit signed integers." }
    ]
  },
  {
    id: "q_scen_08",
    title: "Scenario: Git Detached HEAD State",
    slug: "scenario-git-detached-head",
    questionType: "scenario",
    difficulty: "beginner",
    prompt: `A developer runs \`git checkout a1b2c3d\` (a specific commit hash) and makes several new commits. Later, they switch back to \`main\` and discover their new commits are missing from the branch log.
What state was the repository in, and how should they recover their commits?`,
    explanation: "Checking out a commit hash directly places Git in a 'Detached HEAD' state (HEAD points directly to a commit rather than a branch ref). New commits are not associated with any named branch. They can be found using `git reflog` and recovered by creating a new branch from that commit: `git branch recovery-branch <commit-hash>`.",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_git", weight: 1.0 }, { skillId: "skill_debugging", weight: 0.5 }],
    options: [
      { id: "opt_1", text: "The repository was in 'Detached HEAD' state. Recovery: Locate commit hashes in `git reflog` and create a named branch (`git branch <name> <hash>`).", isCorrect: true, explanation: "git reflog maintains a history of HEAD movements even for unreferenced commits." },
      { id: "opt_2", text: "The Git repository was corrupted and must be re-cloned from scratch.", isCorrect: false, explanation: "Commits remain in the local object database until pruned by garbage collection." },
      { id: "opt_3", text: "Git commits are permanently deleted immediately after branch switching.", isCorrect: false, explanation: "Git is append-only by default; reflog preserves orphaned commits." },
      { id: "opt_4", text: "Commits cannot be made without an active internet connection.", isCorrect: false, explanation: "Git is a distributed version control system that operates offline." }
    ]
  },
  {
    id: "q_scen_09",
    title: "Scenario: CI/CD Pipeline Docker Permission Denied",
    slug: "scenario-cicd-docker-socket-permission",
    questionType: "scenario",
    difficulty: "intermediate",
    prompt: `In a GitHub Actions / GitLab CI runner script, the step \`docker build -t my-app .\` fails with:
\`Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock\`.

What is the standard Linux security cause and resolution?`,
    explanation: "The user account executing the CI agent does not belong to the `docker` group (or lack read/write permissions on `/var/run/docker.sock`). Resolution: Add the runner user to the docker group via `sudo usermod -aG docker $USER` and restart the agent session.",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_docker", weight: 1.0 }, { skillId: "skill_linux", weight: 0.8 }, { skillId: "skill_cicd", weight: 0.7 }],
    options: [
      { id: "opt_1", text: "The runner user is not in the `docker` group. Resolution: Add user to docker group (`usermod -aG docker <user>`) to grant access to `/var/run/docker.sock`.", isCorrect: true, explanation: "Docker daemon socket ownership is restricted to root and the docker group." },
      { id: "opt_2", text: "Docker daemon only runs on Windows 98.", isCorrect: false, explanation: "Docker is native to Linux containerization primitives (cgroups/namespaces)." },
      { id: "opt_3", text: "The Dockerfile must be renamed to index.html.", isCorrect: false, explanation: "Docker build looks specifically for Dockerfile." },
      { id: "opt_4", text: "The runner must delete all RAM memory before executing.", isCorrect: false, explanation: "System RAM has no correlation with Unix socket group permissions." }
    ]
  },
  {
    id: "q_scen_10",
    title: "Scenario: Flaky Automated UI Test in Cypress/Playwright",
    slug: "scenario-flaky-ui-test-timing",
    questionType: "scenario",
    difficulty: "intermediate",
    prompt: `An automated end-to-end test clicks a 'Submit Order' button and immediately asserts that the confirmation modal is visible:
\`\`\`javascript
await page.click('#submit-order-btn');
expect(await page.isVisible('#confirmation-modal')).toBe(true);
\`\`\`
This test randomly fails in CI 20% of the time. What is causing the flakiness and how should it be structured?`,
    explanation: "Network latency causes the async API call triggered by the button click to take variable time. Checking `isVisible` immediately results in a race condition. The fix is to use auto-waiting assertions (e.g. `await expect(page.locator('#confirmation-modal')).toBeVisible({ timeout: 5000 })`) that poll until the element renders.",
    estimatedMinutes: 3,
    status: "published",
    skills: [{ skillId: "skill_automation", weight: 1.0 }, { skillId: "skill_testing_fund", weight: 0.8 }],
    options: [
      { id: "opt_1", text: "Race condition due to async network delay. Fix: Use auto-waiting assertions (`await expect(locator).toBeVisible()`) that poll until the modal appears.", isCorrect: true, explanation: "Auto-waiting eliminates arbitrary timing race conditions in modern test frameworks." },
      { id: "opt_2", text: "UI tests cannot run on computers with more than 8GB RAM.", isCorrect: false, explanation: "Hardware specs do not cause web element race conditions." },
      { id: "opt_3", text: "The test must be converted into a manual spreadsheet test.", isCorrect: false, explanation: "Properly awaited automated tests provide consistent regression protection." },
      { id: "opt_4", text: "Modals are illegal in modern HTML5 specifications.", isCorrect: false, explanation: "HTML5 includes native `<dialog>` and ARIA modal components." }
    ]
  },

  // 3. CODING QUESTIONS (10 QUESTIONS WITH PUBLIC & HIDDEN TESTS)
  {
    id: "q_code_01",
    title: "Original: Two Pointer Target Pair",
    slug: "two-pointer-target-pair",
    questionType: "coding",
    difficulty: "beginner",
    prompt: "Write a function `findTargetPair(arr, target)` that takes a sorted array of distinct integers and a target integer. Return an array containing the indices of the two elements that sum up to target `[idx1, idx2]`. If no such pair exists, return `null`.\n\nConstraint: Implement an O(N) two-pointer solution.",
    explanation: "Using two pointers (left at start, right at end), check sum. If equal, return [left, right]; if smaller, left++; if larger, right--.",
    estimatedMinutes: 8,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }, { skillId: "skill_js", weight: 0.8 }],
    coding: {
      starterCodeJson: {
        javascript: `function findTargetPair(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return null;
}`
      },
      solutionCodeJson: {
        javascript: `function findTargetPair(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}`
      },
      testCases: [
        { input: "findTargetPair([2, 7, 11, 15], 9)", expected: "[0,1]", isHidden: false },
        { input: "findTargetPair([1, 3, 5, 8, 12, 19], 17)", expected: "[2,4]", isHidden: false },
        { input: "findTargetPair([1, 2, 4, 9], 20)", expected: "null", isHidden: true },
        { input: "findTargetPair([-5, -2, 0, 3, 8], -2)", expected: "[0,3]", isHidden: true }
      ],
      allowedLanguages: ["javascript", "python", "cpp", "java"],
      executionNotes: "Two-pointer technique on sorted integer arrays."
    }
  },
  {
    id: "q_code_02",
    title: "Original: String Run-Length Compression",
    slug: "string-run-length-compression",
    questionType: "coding",
    difficulty: "beginner",
    prompt: "Write a function `compressString(str)` that performs basic run-length encoding. For example, `'aabcccccaaa'` becomes `'a2b1c5a3'`. If the compressed string would NOT become strictly shorter than the original string, return the original string.",
    explanation: "Iterate through characters while counting consecutive repetitions. Append char and count to result. Compare lengths at the end.",
    estimatedMinutes: 8,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }, { skillId: "skill_js", weight: 0.8 }],
    coding: {
      starterCodeJson: {
        javascript: `function compressString(str) {
  if (!str || str.length <= 2) return str;
  let compressed = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      compressed += str[i] + count;
      count = 1;
    }
  }

  return compressed.length < str.length ? compressed : str;
}`
      },
      solutionCodeJson: {
        javascript: `function compressString(str) {
  if (!str || str.length <= 2) return str;
  let compressed = "";
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) count++;
    else {
      compressed += str[i] + count;
      count = 1;
    }
  }
  return compressed.length < str.length ? compressed : str;
}`
      },
      testCases: [
        { input: "compressString('aabcccccaaa')", expected: '"a2b1c5a3"', isHidden: false },
        { input: "compressString('abcdef')", expected: '"abcdef"', isHidden: false },
        { input: "compressString('wwwwaaadexxxxxx')", expected: '"w4a3d1e1x6"', isHidden: true },
        { input: "compressString('aabb')", expected: '"aabb"', isHidden: true }
      ],
      allowedLanguages: ["javascript", "python", "cpp", "java"],
      executionNotes: "String manipulation and boundary checking."
    }
  },
  {
    id: "q_code_03",
    title: "Original: Flatten Nested Object Hierarchy",
    slug: "flatten-nested-object-hierarchy",
    questionType: "coding",
    difficulty: "intermediate",
    prompt: "Write a function `flattenObject(obj, prefix = '')` that takes a deeply nested JavaScript object and returns a flat key-value dictionary where keys are dot-separated paths.\n\nExample:\n`flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } })`\nReturns:\n`{ 'a': 1, 'b.c': 2, 'b.d.e': 3 }`",
    explanation: "Recursively traverse object keys. If value is a non-null object and not an array, recurse with accumulated prefix + key + '.'. Otherwise assign to output dictionary.",
    estimatedMinutes: 10,
    status: "published",
    skills: [{ skillId: "skill_js", weight: 1.0 }, { skillId: "skill_dsa", weight: 0.8 }],
    coding: {
      starterCodeJson: {
        javascript: `function flattenObject(obj, prefix = '') {
  const result = {};

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;

    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val, newKey));
    } else {
      result[newKey] = val;
    }
  }

  return result;
}`
      },
      solutionCodeJson: {
        javascript: `function flattenObject(obj, prefix = '') {
  const result = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val, newKey));
    } else {
      result[newKey] = val;
    }
  }
  return result;
}`
      },
      testCases: [
        { input: "flattenObject({ user: { name: 'Rahul', address: { city: 'Bengaluru' } } })", expected: '{"user.name":"Rahul","user.address.city":"Bengaluru"}', isHidden: false },
        { input: "flattenObject({ a: 1, b: { c: 2 } })", expected: '{"a":1,"b.c":2}', isHidden: false },
        { input: "flattenObject({ app: { config: { db: { port: 5432 } } } })", expected: '{"app.config.db.port":5432}', isHidden: true }
      ],
      allowedLanguages: ["javascript", "python"],
      executionNotes: "Recursive dictionary flattening."
    }
  },
  {
    id: "q_code_04",
    title: "Original: Async Promise Concurrency Pool",
    slug: "async-promise-concurrency-pool",
    questionType: "coding",
    difficulty: "advanced",
    prompt: "Implement an asynchronous batch runner `asyncBatchRunner(items, asyncFn, limit)` that executes an asynchronous task `asyncFn(item)` over an array of items with a maximum concurrency `limit`. It must return a Promise resolving to an array of all results in the original order.",
    explanation: "Maintain an active executing pool of promises. As each promise resolves, replace it with the next item until all items are processed.",
    estimatedMinutes: 12,
    status: "published",
    skills: [{ skillId: "skill_js", weight: 1.0 }, { skillId: "skill_node", weight: 0.8 }],
    coding: {
      starterCodeJson: {
        javascript: `function asyncBatchRunner(items, asyncFn, limit = 2) {
  return new Promise((resolve, reject) => {
    const results = new Array(items.length);
    let currentIndex = 0;
    let completedCount = 0;

    if (items.length === 0) return resolve([]);

    function launchNext() {
      if (currentIndex >= items.length) return;
      const idx = currentIndex++;
      
      Promise.resolve(asyncFn(items[idx]))
        .then(res => {
          results[idx] = res;
          completedCount++;
          if (completedCount === items.length) {
            resolve(results);
          } else {
            launchNext();
          }
        })
        .catch(reject);
    }

    const initialBatch = Math.min(limit, items.length);
    for (let i = 0; i < initialBatch; i++) {
      launchNext();
    }
  });
}`
      },
      solutionCodeJson: {
        javascript: `function asyncBatchRunner(items, asyncFn, limit = 2) {
  return new Promise((resolve, reject) => {
    const results = new Array(items.length);
    let currentIndex = 0, completedCount = 0;
    if (items.length === 0) return resolve([]);
    function launchNext() {
      if (currentIndex >= items.length) return;
      const idx = currentIndex++;
      Promise.resolve(asyncFn(items[idx])).then(res => {
        results[idx] = res;
        completedCount++;
        if (completedCount === items.length) resolve(results);
        else launchNext();
      }).catch(reject);
    }
    const batch = Math.min(limit, items.length);
    for (let i = 0; i < batch; i++) launchNext();
  });
}`
      },
      testCases: [
        { input: "asyncBatchRunner([1, 2, 3, 4], x => x * 10, 2)", expected: "[10,20,30,40]", isHidden: false },
        { input: "asyncBatchRunner(['a', 'b'], x => x.toUpperCase(), 1)", expected: '["A","B"]', isHidden: false },
        { input: "asyncBatchRunner([5, 10, 15], x => x + 1, 3)", expected: "[6,11,16]", isHidden: true }
      ],
      allowedLanguages: ["javascript"],
      executionNotes: "Concurrency throttle algorithm with Promise resolution."
    }
  },
  {
    id: "q_code_05",
    title: "Original: Valid Parentheses Validator",
    slug: "valid-parentheses-validator",
    questionType: "coding",
    difficulty: "beginner",
    prompt: "Write a function `isValidBrackets(str)` that determines if a string containing only brackets `()`, `{}`, `[]` is structurally valid (brackets must close in correct order and type).",
    explanation: "Use a LIFO Stack. Push opening brackets. On encountering a closing bracket, check if it matches the popped element from the stack.",
    estimatedMinutes: 6,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }, { skillId: "skill_js", weight: 0.6 }],
    coding: {
      starterCodeJson: {
        javascript: `function isValidBrackets(str) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of str) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }

  return stack.length === 0;
}`
      },
      solutionCodeJson: {
        javascript: `function isValidBrackets(str) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of str) {
    if (char === '(' || char === '{' || char === '[') stack.push(char);
    else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`
      },
      testCases: [
        { input: "isValidBrackets('()[]{}')", expected: "true", isHidden: false },
        { input: "isValidBrackets('(]')", expected: "false", isHidden: false },
        { input: "isValidBrackets('{[]()}')", expected: "true", isHidden: true },
        { input: "isValidBrackets('([)]')", expected: "false", isHidden: true }
      ],
      allowedLanguages: ["javascript", "python", "cpp", "java"],
      executionNotes: "Stack data structure verification."
    }
  },
  {
    id: "q_code_06",
    title: "Original: Group Anagrams by Signature",
    slug: "group-anagrams-by-signature",
    questionType: "coding",
    difficulty: "intermediate",
    prompt: "Write a function `groupAnagrams(words)` that takes an array of lowercase strings and groups anagrams together into a 2D array. Words can be returned in any order within groups.",
    explanation: "Use a Hash Map where the key is the sorted version of each word, and the value is an array of corresponding words.",
    estimatedMinutes: 8,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }, { skillId: "skill_python", weight: 0.8 }],
    coding: {
      starterCodeJson: {
        javascript: `function groupAnagrams(words) {
  const map = new Map();
  for (const word of words) {
    const sorted = word.split('').sort().join('');
    if (!map.has(sorted)) map.set(sorted, []);
    map.get(sorted).push(word);
  }
  return Array.from(map.values()).map(g => g.sort());
}`
      },
      solutionCodeJson: {
        javascript: `function groupAnagrams(words) {
  const map = new Map();
  for (const word of words) {
    const sorted = word.split('').sort().join('');
    if (!map.has(sorted)) map.set(sorted, []);
    map.get(sorted).push(word);
  }
  return Array.from(map.values()).map(g => g.sort());
}`
      },
      testCases: [
        { input: "groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])", expected: '[["ate","eat","tea"],["bat"],["nat","tan"]]', isHidden: false },
        { input: "groupAnagrams(['a'])", expected: '[["a"]]', isHidden: false },
        { input: "groupAnagrams(['rat', 'tar', 'art'])", expected: '[["art","rat","tar"]]', isHidden: true }
      ],
      allowedLanguages: ["javascript", "python"],
      executionNotes: "HashMap anagram signature categorization."
    }
  },
  {
    id: "q_code_07",
    title: "Original: Debounce Function Utility",
    slug: "debounce-function-utility",
    questionType: "coding",
    difficulty: "intermediate",
    prompt: "Implement a classic `debounce(fn, delayMs)` utility in JavaScript that delays invoking `fn` until after `delayMs` milliseconds have elapsed since the last time the debounced function was invoked.",
    explanation: "Clear existing timeout on every call and set a new timer invoking the callback with arguments.",
    estimatedMinutes: 6,
    status: "published",
    skills: [{ skillId: "skill_js", weight: 1.0 }],
    coding: {
      starterCodeJson: {
        javascript: `function debounce(fn, delayMs) {
  let timerId = null;
  return function(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delayMs);
  };
}`
      },
      solutionCodeJson: {
        javascript: `function debounce(fn, delayMs) {
  let timerId = null;
  return function(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}`
      },
      testCases: [
        { input: "(function(){ let x = 0; const d = debounce(() => x++, 50); d(); d(); return typeof d === 'function'; })()", expected: "true", isHidden: false },
        { input: "(function(){ const fn = debounce((a,b) => a+b, 100); return typeof fn === 'function'; })()", expected: "true", isHidden: true }
      ],
      allowedLanguages: ["javascript"],
      executionNotes: "JavaScript closures and timers."
    }
  },
  {
    id: "q_code_08",
    title: "Original: Subarray Sum Equals K Counter",
    slug: "subarray-sum-equals-k",
    questionType: "coding",
    difficulty: "intermediate",
    prompt: "Write a function `countSubarraysWithSum(nums, k)` that returns the total number of continuous non-empty subarrays whose sum equals `k`.\n\nRequirement: Solve in O(N) time complexity using prefix sums and a hash map.",
    explanation: "Maintain a running prefixSum. If (prefixSum - k) exists in the prefix map, add its frequency to total count. Increment map[prefixSum].",
    estimatedMinutes: 10,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }],
    coding: {
      starterCodeJson: {
        javascript: `function countSubarraysWithSum(nums, k) {
  let count = 0;
  let prefixSum = 0;
  const prefixMap = new Map();
  prefixMap.set(0, 1);

  for (const num of nums) {
    prefixSum += num;
    const diff = prefixSum - k;
    if (prefixMap.has(diff)) {
      count += prefixMap.get(diff);
    }
    prefixMap.set(prefixSum, (prefixMap.get(prefixSum) || 0) + 1);
  }

  return count;
}`
      },
      solutionCodeJson: {
        javascript: `function countSubarraysWithSum(nums, k) {
  let count = 0, prefixSum = 0;
  const map = new Map([[0, 1]]);
  for (const n of nums) {
    prefixSum += n;
    if (map.has(prefixSum - k)) count += map.get(prefixSum - k);
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }
  return count;
}`
      },
      testCases: [
        { input: "countSubarraysWithSum([1, 1, 1], 2)", expected: "2", isHidden: false },
        { input: "countSubarraysWithSum([1, 2, 3], 3)", expected: "2", isHidden: false },
        { input: "countSubarraysWithSum([3, 4, 7, 2, -3, 1, 4, 2], 7)", expected: "4", isHidden: true }
      ],
      allowedLanguages: ["javascript", "python", "java", "cpp"],
      executionNotes: "Prefix sum hash map optimization."
    }
  },
  {
    id: "q_code_09",
    title: "Original: LRU Cache Simulation",
    slug: "lru-cache-simulation",
    questionType: "coding",
    difficulty: "advanced",
    prompt: "Implement an `LRUCache(capacity)` class that supports:\n- `get(key)`: Returns value if key exists; otherwise -1. Marks key as most recently used.\n- `put(key, value)`: Updates or inserts key. If capacity is exceeded, evicts the Least Recently Used key.",
    explanation: "A JavaScript Map preserves insertion order. Deleting and re-inserting a key moves it to the most recently used (end) position.",
    estimatedMinutes: 12,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }, { skillId: "skill_sys_design", weight: 0.7 }],
    coding: {
      starterCodeJson: {
        javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}`
      },
      solutionCodeJson: {
        javascript: `class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, v);
    return v;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) this.map.delete(this.map.keys().next().value);
    this.map.set(key, val);
  }
}`
      },
      testCases: [
        { input: "(function(){ const c = new LRUCache(2); c.put(1, 10); c.put(2, 20); const v1 = c.get(1); c.put(3, 30); const v2 = c.get(2); return [v1, v2]; })()", expected: "[10,-1]", isHidden: false },
        { input: "(function(){ const c = new LRUCache(1); c.put(5, 50); return c.get(5); })()", expected: "50", isHidden: true }
      ],
      allowedLanguages: ["javascript", "python", "cpp", "java"],
      executionNotes: "Least Recently Used eviction policy."
    }
  },
  {
    id: "q_code_10",
    title: "Original: Max Continuous Subarray Sum (Kadane's)",
    slug: "max-continuous-subarray-sum",
    questionType: "coding",
    difficulty: "intermediate",
    prompt: "Write a function `maxSubarraySum(nums)` that finds the contiguous subarray with the largest sum and returns that maximum sum.\n\nExample: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` returns `6` (from `[4, -1, 2, 1]`).",
    explanation: "Kadane's Algorithm: At each index, maxCurrent = max(nums[i], maxCurrent + nums[i]). maxGlobal = max(maxGlobal, maxCurrent).",
    estimatedMinutes: 8,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }],
    coding: {
      starterCodeJson: {
        javascript: `function maxSubarraySum(nums) {
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
    }
  }

  return maxGlobal;
}`
      },
      solutionCodeJson: {
        javascript: `function maxSubarraySum(nums) {
  let cur = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    if (cur > max) max = cur;
  }
  return max;
}`
      },
      testCases: [
        { input: "maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])", expected: "6", isHidden: false },
        { input: "maxSubarraySum([1])", expected: "1", isHidden: false },
        { input: "maxSubarraySum([5, 4, -1, 7, 8])", expected: "23", isHidden: true },
        { input: "maxSubarraySum([-5, -2, -8])", expected: "-2", isHidden: true }
      ],
      allowedLanguages: ["javascript", "python", "cpp", "java"],
      executionNotes: "Kadane's linear dynamic programming algorithm."
    }
  },

  // 4. SHORT ANSWER & MULTI-SELECT & TRUE/FALSE (10 QUESTIONS)
  {
    id: "q_sa_01",
    title: "Short Answer: HTTP Status Code for Rate Limiting",
    slug: "http-status-rate-limiting",
    questionType: "short_answer",
    difficulty: "beginner",
    prompt: "What is the standard 3-digit HTTP status code returned by an API server when a client exceeds their allocated rate limit / quota?",
    explanation: "HTTP 429 Too Many Requests indicates the user has sent too many requests in a given amount of time (rate limiting).",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_apis", weight: 1.0 }],
    acceptableShortAnswers: ["429", "429 Too Many Requests", "HTTP 429"]
  },
  {
    id: "q_sa_02",
    title: "Short Answer: Standard SQL Keyword for Sorting",
    slug: "sql-keyword-for-sorting",
    questionType: "short_answer",
    difficulty: "beginner",
    prompt: "Which two-word SQL clause is used at the end of a SELECT query to sort the returned result set by one or more columns?",
    explanation: "`ORDER BY` is the standard SQL clause for sorting records ascending (ASC) or descending (DESC).",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_db", weight: 1.0 }],
    acceptableShortAnswers: ["ORDER BY", "order by"]
  },
  {
    id: "q_sa_03",
    title: "Short Answer: Git Command for Temporary Work Stashing",
    slug: "git-command-stashing",
    questionType: "short_answer",
    difficulty: "beginner",
    prompt: "Which Git command saves uncommitted local modifications to a temporary stack without creating a permanent commit, allowing you to return to a clean working directory?",
    explanation: "`git stash` records the current state of the working directory and index onto a storage stack.",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_git", weight: 1.0 }],
    acceptableShortAnswers: ["git stash", "stash"]
  },
  {
    id: "q_sa_04",
    title: "Short Answer: Time Complexity of Hash Table Average Lookup",
    slug: "time-complexity-hashtable-lookup",
    questionType: "short_answer",
    difficulty: "beginner",
    prompt: "What is the Big-O average-case time complexity for key lookups and insertions in a properly hashed Hash Table (e.g. O(1), O(log n), O(n))?",
    explanation: "Hash tables achieve average O(1) constant time complexity for key lookups, insertions, and deletions.",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_dsa", weight: 1.0 }],
    acceptableShortAnswers: ["O(1)", "o(1)", "O(1) constant", "constant", "1"]
  },
  {
    id: "q_sa_05",
    title: "Short Answer: React Hook for Mutable DOM References",
    slug: "react-hook-mutable-dom-ref",
    questionType: "short_answer",
    difficulty: "beginner",
    prompt: "What is the name of the standard built-in React hook used to persist mutable values across renders and hold direct references to DOM nodes without triggering re-renders?",
    explanation: "`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument and persists across the entire component lifetime.",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_react", weight: 1.0 }],
    acceptableShortAnswers: ["useRef", "useRef()", "use_ref"]
  },
  {
    id: "q_ms_01",
    title: "Multi-Select: Non-Relational NoSQL Database Types",
    slug: "nosql-database-types",
    questionType: "multi_select",
    difficulty: "intermediate",
    prompt: "Select ALL options below that represent valid categories of NoSQL non-relational database architectures:",
    explanation: "NoSQL databases are typically categorized into Document stores (MongoDB), Key-Value stores (Redis), Wide-Column stores (Cassandra), and Graph databases (Neo4j).",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_db", weight: 1.0 }, { skillId: "skill_dbms", weight: 0.8 }],
    options: [
      { id: "opt_1", text: "Document Stores (e.g. MongoDB)", isCorrect: true },
      { id: "opt_2", text: "Key-Value Stores (e.g. Redis)", isCorrect: true },
      { id: "opt_3", text: "Graph Databases (e.g. Neo4j)", isCorrect: true },
      { id: "opt_4", text: "ANSI SQL Strict Relational Engines (e.g. SQLite)", isCorrect: false }
    ]
  },
  {
    id: "q_ms_02",
    title: "Multi-Select: Core Principles of OOP",
    slug: "core-principles-of-oop",
    questionType: "multi_select",
    difficulty: "beginner",
    prompt: "Select the foundational pillars of Object-Oriented Programming (OOP):",
    explanation: "The 4 core pillars of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction.",
    estimatedMinutes: 2,
    status: "published",
    skills: [{ skillId: "skill_oop", weight: 1.0 }, { skillId: "skill_java", weight: 0.6 }],
    options: [
      { id: "opt_1", text: "Encapsulation", isCorrect: true },
      { id: "opt_2", text: "Polymorphism", isCorrect: true },
      { id: "opt_3", text: "Inheritance", isCorrect: true },
      { id: "opt_4", text: "Linear Regressive Compilation", isCorrect: false }
    ]
  },
  {
    id: "q_tf_01",
    title: "True/False: REST APIs Require JSON Format Only",
    slug: "rest-json-only-true-false",
    questionType: "true_false",
    difficulty: "beginner",
    prompt: "True or False: The REST architectural specification strictly mandates that all payload representations MUST be serialized in JSON format and forbids XML or protocol buffers.",
    explanation: "False. REST is an architectural style and media-type agnostic. It fully supports XML, HTML, plain text, protobuf, and binary payloads.",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_apis", weight: 1.0 }],
    options: [
      { id: "opt_true", text: "True", isCorrect: false },
      { id: "opt_false", text: "False", isCorrect: true }
    ]
  },
  {
    id: "q_tf_02",
    title: "True/False: Primary Keys in Relational Tables Can Be Null",
    slug: "primary-keys-can-be-null",
    questionType: "true_false",
    difficulty: "beginner",
    prompt: "True or False: In standard SQL relational database management systems, a column designated as the PRIMARY KEY can store NULL values.",
    explanation: "False. A primary key constraint strictly enforces both UNIQUE and NOT NULL constraints across all relational database implementations.",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_db", weight: 1.0 }, { skillId: "skill_dbms", weight: 0.9 }],
    options: [
      { id: "opt_true", text: "True", isCorrect: false },
      { id: "opt_false", text: "False", isCorrect: true }
    ]
  },
  {
    id: "q_tf_03",
    title: "True/False: Docker Containers Share Host OS Kernel",
    slug: "docker-containers-share-host-kernel",
    questionType: "true_false",
    difficulty: "intermediate",
    prompt: "True or False: Unlike traditional Virtual Machines (VMs) which run a full guest operating system on a hypervisor, Docker containers run in isolated user space while sharing the underlying host operating system kernel.",
    explanation: "True. Containers share the host kernel via cgroups and namespaces, which makes them lightweight and rapid to boot compared to heavy VMs.",
    estimatedMinutes: 1,
    status: "published",
    skills: [{ skillId: "skill_docker", weight: 1.0 }, { skillId: "skill_linux", weight: 0.7 }],
    options: [
      { id: "opt_true", text: "True", isCorrect: true },
      { id: "opt_false", text: "False", isCorrect: false }
    ]
  }
];
