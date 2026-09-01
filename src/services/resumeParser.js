import pdfParse from 'pdf-parse';

export const COMPREHENSIVE_SKILLS_DICTIONARY = [
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C", "C#", "Go", "Rust", "Kotlin", "Swift", "PHP", "Ruby", "R", "Dart", "Scala", "Bash", "SQL", "HTML5", "CSS3",

  // Frontend Frameworks & Libraries
  "React.js", "React 18", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "Redux", "Redux Toolkit", "Zustand", "MobX", "Tailwind CSS", "Bootstrap", "Chakra UI", "Material UI", "Styled Components", "Sass", "Framer Motion", "Three.js", "WebGL", "Vite", "Webpack", "Babel",

  // Backend & APIs
  "Node.js", "Express.js", "NestJS", "FastAPI", "Flask", "Django", "Spring Boot", "ASP.NET Core", "Ruby on Rails", "GraphQL", "REST APIs", "gRPC", "WebSockets", "Socket.io", "Microservices", "Serverless",

  // Databases & Caching
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "DynamoDB", "Cassandra", "Elasticsearch", "Neo4j", "Firebase", "Supabase", "Prisma", "TypeORM", "Mongoose", "Vector Databases", "Pinecone", "ChromaDB", "pgvector",

  // Cloud & DevOps
  "AWS", "Amazon Web Services", "Microsoft Azure", "Google Cloud Platform (GCP)", "Docker", "Kubernetes", "Terraform", "Ansible", "CI/CD Pipelines", "GitHub Actions", "GitLab CI", "Jenkins", "Linux", "Nginx", "Prometheus", "Grafana", "Datadog",

  // AI, Data Science & Machine Learning
  "Machine Learning", "Deep Learning", "PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "NumPy", "Pandas", "SciPy", "OpenCV", "Natural Language Processing (NLP)", "Large Language Models (LLMs)", "Generative AI", "LangChain", "LlamaIndex", "Retrieval-Augmented Generation (RAG)", "Hugging Face", "Transformers", "Data Engineering", "Apache Spark", "Apache Kafka", "Airflow", "dbt", "Snowflake", "BigQuery", "Tableau", "Power BI",

  // Testing & Quality Assurance
  "Jest", "Mocha", "Chai", "Cypress", "Playwright", "Selenium", "Postman", "JUnit", "PyTest", "Unit Testing", "Integration Testing", "End-to-End Testing",

  // Mobile & Cross-Platform
  "React Native", "Flutter", "Android SDK", "iOS Development", "SwiftUI", "Expo", "Ionic",

  // Cybersecurity & Security
  "OWASP", "Penetration Testing", "Network Security", "Cryptography", "OAuth2 / JWT", "Burp Suite", "Wireshark", "Nmap", "Metasploit", "Vulnerability Assessment", "SIEM",

  // CS Fundamentals & Methodologies
  "Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "System Design", "Low-Level Design (LLD)", "High-Level Design (HLD)", "Design Patterns", "Agile / Scrum", "Git & GitHub", "GitLab", "CI / CD", "Clean Architecture", "TDD (Test-Driven Development)"
];

export async function parseResumeBuffer(buffer, fileName, mimeType) {
  let rawText = "";

  if (mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
    try {
      const data = await pdfParse(buffer);
      rawText = data.text;
    } catch (err) {
      console.error("PDF Parsing error, attempting text fallback:", err);
      rawText = buffer.toString('utf-8');
    }
  } else {
    rawText = buffer.toString('utf-8');
  }

  return extractProfileFromText(rawText, fileName);
}

export function extractProfileFromText(text, fileName = "Uploaded_Resume") {
  const cleanText = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');

  // 1. Skill Extraction
  const extractedSkills = new Set();

  for (const skill of COMPREHENSIVE_SKILLS_DICTIONARY) {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#])${escaped}([^a-zA-Z0-9_#]|$)`, 'i');

    if (regex.test(cleanText)) {
      extractedSkills.add(skill);
    }
  }

  // Common synonym normalization
  if (/react(js|\.js)?\b/i.test(cleanText)) extractedSkills.add("React.js");
  if (/next(js|\.js)?\b/i.test(cleanText)) extractedSkills.add("Next.js");
  if (/node(js|\.js)?\b/i.test(cleanText)) extractedSkills.add("Node.js");
  if (/mongo(db)?\b/i.test(cleanText)) extractedSkills.add("MongoDB");
  if (/postgres(ql)?\b/i.test(cleanText)) extractedSkills.add("PostgreSQL");
  if (/tailwind(css)?\b/i.test(cleanText)) extractedSkills.add("Tailwind CSS");
  if (/aws\b/i.test(cleanText)) extractedSkills.add("AWS");
  if (/docker\b/i.test(cleanText)) extractedSkills.add("Docker");
  if (/dsa\b|leetcode\b|codeforces\b/i.test(cleanText)) extractedSkills.add("Data Structures & Algorithms");

  // 2. Candidate Name Extraction
  let candidateName = "Student Candidate";
  const nameMatch = text.match(/^([A-Z][a-z]{1,15}\s+[A-Z][a-z]{1,15})/m) ||
                    text.match(/([A-Z][A-Za-z]+\s+[A-Z][A-Za-z]+)\s*(?:\|\s*)?(?:[\w.-]+@[\w.-]+\.\w+)?/);
  if (nameMatch && nameMatch[1] && !["Resume", "Curriculum", "Experience", "Education", "Projects", "Skills"].includes(nameMatch[1].trim())) {
    candidateName = nameMatch[1].trim();
  }

  // 3. Education / College Extraction
  let education = "B.Tech in Computer Science & Engineering";
  if (/B\.?Tech|Bachelor of Technology/i.test(text)) {
    education = "B.Tech Computer Science & Engineering";
  } else if (/B\.?E|Bachelor of Engineering/i.test(text)) {
    education = "B.E Computer Science";
  } else if (/M\.?Tech|Master of Technology/i.test(text)) {
    education = "M.Tech in Artificial Intelligence / CS";
  } else if (/BCA|MCA/i.test(text)) {
    education = "BCA / MCA Computer Applications";
  } else if (/B\.?Sc|Bachelor of Science/i.test(text)) {
    education = "B.Sc Computer Science / IT";
  }

  // 4. College / University extraction
  const collegeMatch = text.match(/(?:IIT|NIT|IIIT|BITS|VIT|SRM|DTU|NSUT|Manipal|Amity|Delhi University|Mumbai University|Anna University|[A-Za-z\s]+Institute of Technology|[A-Za-z\s]+University)/i);
  const college = collegeMatch ? collegeMatch[0].trim() : "Technical University (India)";

  // 5. Degree summary
  const summary = `Candidate with strong hands-on foundation in ${Array.from(extractedSkills).slice(0, 4).join(', ') || 'Software Development'}. Demonstrated practical capability in building full-stack projects, solving data structure algorithms, and modern software architectures.`;

  return {
    fileName,
    candidateName,
    education: `${education} • ${college}`,
    skills: Array.from(extractedSkills),
    summary,
    rawLength: text.length
  };
}
