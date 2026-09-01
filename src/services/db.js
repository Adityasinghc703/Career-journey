import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../../data/db.json');

export function initDB() {
  return readDB();
}

const DEFAULT_USER = {
  id: "user_rahul_sharma",
  name: "Rahul Sharma",
  email: "rahul.sharma@college.edu",
  title: "Computer Science Undergraduate (Pre-Final Year)",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  college: "Indian Institute of Information Technology (IIIT)",
  degree: "B.Tech Computer Science & Engineering (2022-2026)",
  cgpa: "8.7 / 10.0",
  selectedCareerId: "senior-frontend-dev",
  extractedSkills: [
    "JavaScript",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Git & GitHub",
    "REST APIs",
    "Data Structures & Algorithms",
    "Node.js",
    "SQL",
    "PostgreSQL"
  ],
  verifiedSkills: [
    {
      id: "v1",
      name: "React.js & Component Architecture",
      score: 94,
      level: "Proficient (Level 4)",
      verifiedAt: "2026-08-28"
    },
    {
      id: "v2",
      name: "Modern JavaScript & ESNext",
      score: 88,
      level: "Proficient (Level 4)",
      verifiedAt: "2026-08-15"
    },
    {
      id: "v3",
      name: "Tailwind CSS & Responsive UI",
      score: 92,
      level: "Advanced (Level 5)",
      verifiedAt: "2026-08-20"
    }
  ],
  badges: [
    { id: "b1", title: "React Specialist", rank: "Top 5%", icon: "code", color: "primary" },
    { id: "b2", title: "DSA Problem Solver", rank: "Top 10%", icon: "terminal", color: "secondary" },
    { id: "b3", title: "Clean Coder", rank: "Certified", icon: "verified", color: "tertiary" }
  ],
  assessmentAvgScore: 88,
  mockInterviewScore: 8.5,
  completedMilestones: 0,
  totalMilestones: 6,
  weeklyStudyGoal: 6,
  weeklyStudyHours: 0.0,
  completedRoadmapTasks: []
};

export function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData = {
        users: [DEFAULT_USER],
        user: DEFAULT_USER,
        applications: []
      };
      saveDB(initialData);
      return initialData;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    if (!data.user) data.user = DEFAULT_USER;
    if (!data.users) data.users = [DEFAULT_USER];
    if (!data.applications) data.applications = [];
    return data;
  } catch (err) {
    console.error("Error reading database file, resetting to defaults:", err);
    return {
      users: [DEFAULT_USER],
      user: DEFAULT_USER,
      applications: []
    };
  }
}

export function saveDB(data) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error saving DB:", err);
  }
}

export function updateUser(updates) {
  const db = readDB();
  db.user = { ...db.user, ...updates };

  const userIdx = (db.users || []).findIndex(u => u.id === db.user.id);
  if (userIdx >= 0) {
    db.users[userIdx] = db.user;
  } else {
    db.users.push(db.user);
  }

  saveDB(db);
  return db.user;
}

export function registerUser(name, email, password) {
  const db = readDB();
  if (!db.users) db.users = [];

  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    db.user = existing;
    saveDB(db);
    return { success: true, user: existing, message: "Welcome back! Logged in existing account." };
  }

  const newUser = {
    ...DEFAULT_USER,
    id: `user_${Date.now()}`,
    name,
    email,
    password: password || "password123",
    verifiedSkills: [],
    extractedSkills: ["Data Structures & Algorithms", "JavaScript", "HTML5", "CSS3", "Git & GitHub"],
    assessmentAvgScore: 75,
    mockInterviewScore: 7.0,
    weeklyStudyHours: 0
  };

  db.users.push(newUser);
  db.user = newUser;
  saveDB(db);
  return { success: true, user: newUser, message: "Account created successfully!" };
}

export function loginUser(email, password) {
  const db = readDB();
  if (!db.users) db.users = [DEFAULT_USER];

  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // Auto register for seamless student onboarding
    const name = email.split('@')[0].replace('.', ' ');
    return registerUser(name.charAt(0).toUpperCase() + name.slice(1), email, password);
  }

  db.user = user;
  saveDB(db);
  return { success: true, user, message: `Welcome back, ${user.name}!` };
}

export function googleSignIn(googleProfile) {
  const db = readDB();
  if (!db.users) db.users = [DEFAULT_USER];

  const email = googleProfile.email || "student@google.com";
  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    user = {
      ...DEFAULT_USER,
      id: `google_user_${Date.now()}`,
      name: googleProfile.name || "Google Student",
      email,
      avatar: googleProfile.avatar || DEFAULT_USER.avatar,
      authProvider: "google"
    };
    db.users.push(user);
  }

  db.user = user;
  saveDB(db);
  return { success: true, user, message: `Successfully authenticated with Google as ${user.name}!` };
}

export function logoutUser() {
  const db = readDB();
  db.user = DEFAULT_USER;
  saveDB(db);
  return true;
}
