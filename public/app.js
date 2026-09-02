/**
 * CareerJourney AI - Full Interactive Client Application
 * Preserves the exact Stitch UI, layout, palette and design.
 */

// Global State
let APP_STATE = {
  user: null,
  analysis: null,
  roadmap: null,
  readiness: null,
  careers: [],
  assessments: [],
  codingChallenges: [],
  mockInterviews: [],
  jobs: [],
  roles: [],
  skills: [],
  assessmentConfig: {
    roleId: "role_frontend_dev",
    level: "intermediate",
    mode: "practice",
    topicIds: [],
    totalQuestions: 20,
    timeLimitMinutes: 30
  },
  activeAssessment: null,
  activeQIdx: 0,
  activeQuestionTimer: null,
  secondsRemaining: 0,
  adminQuestions: [],
  selectedFile: null,
  isRecording: false,
  recognition: null
};

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  initSpeechRecognition();
  await loadInitialData();
  
  const isAuthenticated = localStorage.getItem('careerjourney_authenticated') === 'true';
  if (isAuthenticated && APP_STATE.user) {
    showPlatformDashboard();
  } else {
    showAuthLanding();
  }
});

// Web Speech API Integration
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    APP_STATE.recognition = new SpeechRecognition();
    APP_STATE.recognition.continuous = true;
    APP_STATE.recognition.interimResults = true;
    APP_STATE.recognition.lang = 'en-IN';

    APP_STATE.recognition.onstart = () => {
      APP_STATE.isRecording = true;
      const btn = document.getElementById('voice-btn');
      const text = document.getElementById('voice-btn-text');
      const indicator = document.getElementById('speech-status-indicator');
      if (btn) btn.className = "px-3 py-1 rounded-xl bg-red-100 text-red-700 font-bold text-xs flex items-center gap-1 border border-red-300 animate-pulse shadow-sm";
      if (text) text.textContent = "Stop Recording (Listening...)";
      if (indicator) indicator.classList.remove('hidden');
    };

    APP_STATE.recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript) {
        const input = document.getElementById('interview-answer-input');
        input.value = (input.value ? input.value + ' ' : '') + finalTranscript.trim();
      }
    };

    APP_STATE.recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      stopSpeechRecognition();
      if (event.error === 'not-allowed') {
        showToast("Microphone permission denied. Please allow microphone access.", true);
      }
    };

    APP_STATE.recognition.onend = () => {
      stopSpeechRecognition();
    };
  }
}

function toggleSpeechToText() {
  if (!APP_STATE.recognition) {
    showToast("Web Speech API not supported in this browser. Voice simulation started.");
    recordMockVoiceFallback();
    return;
  }

  if (APP_STATE.isRecording) {
    APP_STATE.recognition.stop();
    stopSpeechRecognition();
    showToast("Speech recording stopped.");
  } else {
    try {
      APP_STATE.recognition.start();
      showToast("Listening to microphone... Speak clearly.");
    } catch (e) {
      console.error(e);
      APP_STATE.recognition.stop();
    }
  }
}

function stopSpeechRecognition() {
  APP_STATE.isRecording = false;
  const btn = document.getElementById('voice-btn');
  const text = document.getElementById('voice-btn-text');
  const indicator = document.getElementById('speech-status-indicator');
  if (btn) btn.className = "px-3 py-1 rounded-xl bg-surface-container text-on-surface font-bold text-xs flex items-center gap-1 hover:bg-surface-container-high transition-all shadow-xs";
  if (text) text.textContent = "Start Speech-to-Text";
  if (indicator) indicator.classList.add('hidden');
}

function recordMockVoiceFallback() {
  const btn = document.getElementById('voice-btn');
  btn.innerHTML = `<span class="material-symbols-outlined text-[15px] text-red-600 animate-pulse">mic</span> Listening...`;

  setTimeout(() => {
    document.getElementById('interview-answer-input').value = "In our payment processing service, we handled peak concurrency by introducing Redis distributed locks with TTL and optimistic locking on database rows. This prevented race conditions during checkout retries and reduced P99 latency by 68%.";
    btn.innerHTML = `<span class="material-symbols-outlined text-[15px] text-secondary">mic</span> <span id="voice-btn-text">Start Speech-to-Text</span>`;
    showToast("Voice response transcribed into text!");
  }, 2000);
}

// Toast Helper
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  toastMsg.textContent = message;
  toastIcon.textContent = isError ? 'error' : 'check_circle';
  toastIcon.className = `material-symbols-outlined ${isError ? 'text-red-400' : 'text-green-400'}`;

  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3500);
}

// Modal Helpers
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function toggleMobileNav() {
  const aside = document.querySelector('aside');
  if (aside) {
    aside.classList.toggle('hidden');
    aside.classList.toggle('flex');
  }
}

// View Switcher
function switchView(tabId) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));

  const activeSec = document.getElementById(`view-${tabId}`);
  if (activeSec) activeSec.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.className = "nav-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 bg-primary-fixed-dim text-on-primary-fixed shadow-sm";
    } else {
      btn.className = "nav-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/40";
    }
  });

  const titles = {
    'career-goal': { title: 'My Career Goal', sub: 'Target benchmark requirements, market insights & gap evaluation' },
    'skill-analysis': { title: 'AI Skill Analysis', sub: 'Competency radar & actionable gap identification' },
    'roadmap': { title: 'Personal Roadmap', sub: 'Curriculum tailored specifically to your skill gaps' },
    'assessments': { title: 'Assessments & Practice', sub: 'Technical quizzes, coding challenges & AI mock interviews' },
    'verified-profile': { title: 'Verified Skill Profile', sub: 'Credentialed badges & verified readiness score' },
    'job-matches': { title: 'Job & Internship Matches', sub: 'Indian tech roles matching your verified competencies' }
  };

  if (titles[tabId]) {
    document.getElementById('page-title').textContent = titles[tabId].title;
    document.getElementById('page-subtitle').textContent = titles[tabId].sub;
  }
}

// API Data Loader
async function loadInitialData() {
  try {
    const [userRes, careersRes, analysisRes, roadmapRes, readinessRes, assessRes, codeRes, jobsRes, rolesRes, skillsRes] = await Promise.all([
      fetch('/api/user').then(r => r.json()),
      fetch('/api/career-targets').then(r => r.json()),
      fetch('/api/skill-analysis').then(r => r.json()),
      fetch('/api/roadmap').then(r => r.json()),
      fetch('/api/readiness-score').then(r => r.json()),
      fetch('/api/assessments').then(r => r.json()),
      fetch('/api/coding-practice').then(r => r.json()),
      fetch('/api/jobs').then(r => r.json()),
      fetch('/api/roles').then(r => r.json()).catch(() => ({ success: false })),
      fetch('/api/skills').then(r => r.json()).catch(() => ({ success: false }))
    ]);

    if (userRes.success) APP_STATE.user = userRes.user;
    if (careersRes.success) APP_STATE.careers = careersRes.careers;
    if (analysisRes.success) APP_STATE.analysis = analysisRes.analysis;
    if (roadmapRes.success) APP_STATE.roadmap = roadmapRes.roadmap;
    if (readinessRes.success) APP_STATE.readiness = readinessRes.readiness;
    if (assessRes.success) APP_STATE.assessments = assessRes.assessments;
    if (codeRes.success) APP_STATE.codingChallenges = codeRes.codingChallenges;
    if (jobsRes.success) APP_STATE.jobs = jobsRes.jobs;
    if (rolesRes.success) APP_STATE.roles = rolesRes.roles;
    if (skillsRes.success) APP_STATE.skills = skillsRes.skills;

  } catch (err) {
    console.error("Error loading platform data:", err);
    showToast("Error connecting to backend server", true);
  }
}

// Render All Views
function renderAllViews() {
  renderHeaderAndUser();
  renderCareerGoalView();
  renderSkillAnalysisView();
  renderRoadmapView();
  renderAssessmentsView();
  renderVerifiedProfileView();
  renderJobMatchesView();
}

function renderHeaderAndUser() {
  if (!APP_STATE.user) return;
  const user = APP_STATE.user;
  document.getElementById('user-name').textContent = user.name || 'Rahul Sharma';
  document.getElementById('user-title').textContent = user.title || 'IIIT Student • 2026';
  if (user.avatar) document.getElementById('user-avatar').src = user.avatar;

  const readinessScore = APP_STATE.readiness ? APP_STATE.readiness.score : (APP_STATE.analysis ? APP_STATE.analysis.overallMatchScore : 78);
  const headerChip = document.getElementById('header-readiness-chip');
  if (headerChip) {
    headerChip.innerHTML = `<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Readiness: ${readinessScore}%`;
  }
}

// ========================================================
// VIEW 1: MY CAREER GOAL
// ========================================================
function renderCareerGoalView() {
  const analysis = APP_STATE.analysis;
  if (!analysis) return;

  const career = analysis.career;
  document.getElementById('cg-title').textContent = career.title;
  document.getElementById('cg-desc').textContent = career.description;
  document.getElementById('cg-match-badge').textContent = `${analysis.overallMatchScore}% Match`;

  // Market Insights (Indian Rupee / INR)
  document.getElementById('cg-market-demand').textContent = career.marketInsights.demand;
  document.getElementById('cg-market-growth').textContent = career.marketInsights.growthRate;
  document.getElementById('cg-market-salary').textContent = career.marketInsights.avgSalary;

  // Sectors
  const sectorsContainer = document.getElementById('cg-market-sectors');
  sectorsContainer.innerHTML = (career.marketInsights.topHiringSectors || []).map(s => `
    <span class="px-2.5 py-1 bg-surface-container rounded-xl text-xs font-bold text-on-surface flex items-center gap-1">
      <span class="material-symbols-outlined text-[13px] text-primary">${s.icon || 'cloud'}</span> ${s.name}
    </span>
  `).join('');

  // Technical Skills
  const skillsList = document.getElementById('cg-technical-skills');
  skillsList.innerHTML = analysis.analyzedCoreSkills.map(skill => {
    let badgeClass = "bg-surface-variant text-on-surface-variant";
    let icon = "radio_button_unchecked";
    let iconClass = "text-outline-variant";

    if (skill.userStatus === "Proficient") {
      badgeClass = "bg-primary-fixed text-primary font-bold";
      icon = "check_circle";
      iconClass = "text-primary";
    } else if (skill.userStatus === "Learning") {
      badgeClass = "bg-tertiary-fixed text-tertiary font-bold";
      icon = "pending";
      iconClass = "text-tertiary";
    }

    return `
      <li class="flex justify-between items-center p-2.5 rounded-xl bg-surface-container-low/80 border border-black/5 text-xs">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-base ${iconClass}">${icon}</span>
          <span class="font-semibold text-on-surface">${skill.name}</span>
        </div>
        <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-md ${badgeClass}">${skill.userStatus} (${skill.userScore}%)</span>
      </li>
    `;
  }).join('');

  // Tools & Soft Skills
  document.getElementById('cg-tools').innerHTML = analysis.essentialTools.map(tool => `
    <span class="text-xs px-2.5 py-1 rounded-full font-bold border ${tool.acquired ? 'bg-primary-fixed text-primary border-primary-fixed-dim' : 'bg-surface-container text-on-surface-variant border-outline-variant/30 opacity-70'}">
      ${tool.name}
    </span>
  `).join('');

  document.getElementById('cg-soft-skills').innerHTML = (analysis.softSkills || []).map(skill => `
    <span class="text-xs px-2.5 py-1 rounded-full font-bold bg-surface border border-outline-variant/30 text-on-surface">
      ${skill}
    </span>
  `).join('');

  // Readiness Score Bar
  const readinessScore = APP_STATE.readiness ? APP_STATE.readiness.score : analysis.overallMatchScore;
  document.getElementById('cg-readiness-percent').textContent = `${readinessScore}%`;
  document.getElementById('cg-readiness-bar').style.width = `${readinessScore}%`;
}

// ========================================================
// VIEW 2: AI SKILL ANALYSIS
// ========================================================
function renderSkillAnalysisView() {
  const analysis = APP_STATE.analysis;
  if (!analysis) return;

  document.getElementById('sa-match-percent').textContent = `${analysis.overallMatchScore}% Match`;

  // Draw Dynamic Radar SVG
  drawRadarChart(analysis.radarChart);

  // Proficiency Bars
  const barsContainer = document.getElementById('sa-proficiency-bars');
  barsContainer.innerHTML = analysis.analyzedCoreSkills.map(skill => {
    const isGap = skill.isGap;
    const barColor = skill.userStatus === 'Proficient' ? 'bg-primary' : (skill.userStatus === 'Learning' ? 'bg-tertiary' : 'bg-slate-400');
    return `
      <div>
        <div class="flex justify-between items-end mb-1">
          <span class="text-xs font-bold text-on-surface flex items-center gap-2">
            ${skill.name}
            ${isGap ? `<span class="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-extrabold uppercase rounded">Gap Identified</span>` : ''}
          </span>
          <span class="text-[11px] font-semibold text-on-surface-variant">${skill.userStatus} (${skill.userScore}%)</span>
        </div>
        <div class="h-2 w-full bg-surface-container-high rounded-full overflow-hidden relative">
          <div class="h-full ${barColor} rounded-full transition-all duration-700" style="width: ${skill.userScore}%;"></div>
        </div>
      </div>
    `;
  }).join('');

  // AI Recommended Next Steps
  const aiStepsContainer = document.getElementById('sa-ai-steps');
  aiStepsContainer.innerHTML = analysis.aiRecommendedSteps.map(step => `
    <div onclick="switchView('roadmap')" class="p-3.5 bg-surface rounded-2xl border border-black/5 hover:border-primary/50 transition-all cursor-pointer shadow-xs space-y-1">
      <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-${step.color}-fixed text-${step.color}">${step.type} • ${step.duration}</span>
      <h4 class="text-xs font-bold text-on-surface">${step.title}</h4>
      <p class="text-[11px] text-on-surface-variant leading-relaxed">${step.description}</p>
    </div>
  `).join('');

  // Extracted Skills Inventory
  const extractedContainer = document.getElementById('sa-extracted-pills');
  extractedContainer.innerHTML = (analysis.extractedInventory || []).map(skill => `
    <span class="px-2.5 py-1 bg-surface-container text-on-surface text-xs font-bold rounded-lg border border-black/5">
      ${skill}
    </span>
  `).join('');
}

function drawRadarChart(radarData) {
  if (!radarData || radarData.length === 0) return;
  const svg = document.getElementById('radar-svg');
  const cx = 50, cy = 50, radius = 35;
  const angleStep = (Math.PI * 2) / radarData.length;

  let backgroundWeb = "";
  [0.25, 0.5, 0.75, 1.0].forEach(rRatio => {
    let pts = [];
    for (let i = 0; i < radarData.length; i++) {
      const a = i * angleStep - Math.PI / 2;
      const x = cx + Math.cos(a) * (radius * rRatio);
      const y = cy + Math.sin(a) * (radius * rRatio);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    backgroundWeb += `<polygon fill="none" points="${pts.join(' ')}" stroke="#cbd5e1" stroke-width="0.5"></polygon>`;
  });

  let axesLines = "";
  let labels = "";
  radarData.forEach((dim, i) => {
    const a = i * angleStep - Math.PI / 2;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    axesLines += `<line stroke="#cbd5e1" stroke-width="0.5" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"></line>`;

    const lx = cx + Math.cos(a) * (radius + 8);
    const ly = cy + Math.sin(a) * (radius + 8);
    labels += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="3.2" font-weight="700" fill="#475569">${dim.axis}</text>`;
  });

  const reqPoints = radarData.map((dim, i) => {
    const a = i * angleStep - Math.PI / 2;
    const r = (dim.required / 100) * radius;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');

  const userPoints = radarData.map((dim, i) => {
    const a = i * angleStep - Math.PI / 2;
    const r = (dim.user / 100) * radius;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');

  let userDots = "";
  radarData.forEach((dim, i) => {
    const a = i * angleStep - Math.PI / 2;
    const r = (dim.user / 100) * radius;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    userDots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.5" fill="#4169e1"></circle>`;
  });

  svg.innerHTML = `
    ${backgroundWeb}
    ${axesLines}
    <polygon fill="rgba(226, 232, 240, 0.5)" points="${reqPoints}" stroke="#64748b" stroke-dasharray="1.5,1.5" stroke-width="0.8"></polygon>
    <polygon fill="rgba(65, 105, 225, 0.35)" points="${userPoints}" stroke="#4169e1" stroke-width="1.2"></polygon>
    ${userDots}
    ${labels}
  `;
}

// ========================================================
// VIEW 3: PERSONAL ROADMAP
// ========================================================
function renderRoadmapView() {
  const rm = APP_STATE.roadmap;
  if (!rm) return;

  document.getElementById('rm-title').textContent = `${rm.careerTitle} Learning Roadmap`;
  document.getElementById('rm-est-time').textContent = `Estimated completion: ${rm.estimatedTimeline}`;
  document.getElementById('rm-weekly-hours').textContent = rm.weeklyGoal.completedHours;
  document.getElementById('rm-weekly-bar').style.width = `${rm.weeklyGoal.progressPercent}%`;

  const container = document.getElementById('rm-modules-container');
  container.innerHTML = `
    <div class="absolute left-[7px] top-4 bottom-4 timeline-line z-0"></div>
    ${rm.modules.map(mod => {
      const isComplete = mod.status === "Completed";
      const isInProgress = mod.status === "In Progress";
      const badgeClass = isComplete ? 'bg-primary-fixed text-primary' : (isInProgress ? 'bg-secondary-fixed text-secondary' : 'bg-surface-container text-on-surface-variant');

      return `
        <div class="relative z-10 bg-white rounded-2xl p-5 border ${isInProgress ? 'border-primary/40 shadow-sm' : 'border-black/5'} space-y-3">
          <div class="absolute -left-[30px] top-4 w-6 h-6 rounded-full ${isComplete ? 'bg-primary text-white' : (isInProgress ? 'bg-white border-2 border-primary' : 'bg-surface-container border-2 border-white')} flex items-center justify-center shadow-xs">
            ${isComplete ? '<span class="material-symbols-outlined text-[14px]">check</span>' : (isInProgress ? '<div class="w-1.5 h-1.5 rounded-full bg-primary"></div>' : '')}
          </div>
          <div class="flex justify-between items-start">
            <h4 class="text-xs font-bold text-on-surface">${mod.title}</h4>
            <span class="text-xs px-2 py-0.5 rounded-md font-extrabold ${badgeClass}">${mod.progress}%</span>
          </div>
          <p class="text-[11px] text-on-surface-variant">${mod.description}</p>
          
          <div class="space-y-1.5">
            ${mod.subtasks.map(task => `
              <label class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer text-xs">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}', this.checked)" class="w-3.5 h-3.5 text-primary rounded border-outline-variant focus:ring-primary"/>
                <span class="${task.completed ? 'line-through text-on-surface-variant font-medium' : 'text-on-surface font-semibold'}">${task.text}</span>
              </label>
            `).join('')}
          </div>

          <div class="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
            <div class="bg-primary h-full rounded-full transition-all duration-700" style="width: ${mod.progress}%"></div>
          </div>
        </div>
      `;
    }).join('')}
  `;

  // Milestones
  document.getElementById('rm-milestones').innerHTML = rm.milestones.map(m => `
    <div class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-black/5">
      <div class="w-8 h-8 rounded-xl bg-${m.color}-fixed text-${m.color} flex items-center justify-center font-bold">
        <span class="material-symbols-outlined text-base">${m.icon}</span>
      </div>
      <div>
        <h5 class="text-xs font-bold text-on-surface">${m.title}</h5>
        <span class="text-[10px] text-on-surface-variant">${m.timeframe}</span>
      </div>
    </div>
  `).join('');

  // Suggestions
  document.getElementById('rm-suggestions').innerHTML = rm.aiSuggestions.map(s => `
    <div class="p-2.5 rounded-2xl bg-white border border-black/5 flex items-center gap-3 shadow-xs">
      <div class="w-8 h-8 rounded-xl bg-surface-variant flex items-center justify-center text-primary shrink-0">
        <span class="material-symbols-outlined text-base">${s.icon || 'play_circle'}</span>
      </div>
      <div class="min-w-0">
        <h5 class="text-xs font-bold text-on-surface truncate">${s.title}</h5>
        <span class="text-[10px] text-on-surface-variant">${s.type} • ${s.duration}</span>
      </div>
    </div>
  `).join('');
}

async function toggleTask(taskId, isChecked) {
  try {
    const res = await fetch('/api/roadmap/task', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, completed: isChecked })
    }).then(r => r.json());

    if (res.success) {
      APP_STATE.roadmap = res.roadmap;
      renderRoadmapView();
      showToast(isChecked ? "Progress saved (+0.5 hrs tracked)!" : "Task updated.");
    }
  } catch (err) {
    console.error(err);
  }
}

// ========================================================
// VIEW 4: DYNAMIC TECHNICAL ASSESSMENTS & PRACTICE SYSTEM
// ========================================================

function renderAssessmentsView() {
  const user = APP_STATE.user || {};

  // 1. Render Verified Badges Row
  const badgesRow = document.getElementById('assess-badges-row');
  if (badgesRow) {
    const verified = user.verifiedSkills || [];
    if (verified.length === 0) {
      badgesRow.innerHTML = `
        <div class="p-3 bg-surface rounded-2xl border border-black/5 text-xs text-on-surface-variant flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-base">verified</span>
          <span>Score ≥ 70% in any technical assessment to unlock official employer-verified skill badges.</span>
        </div>
      `;
    } else {
      badgesRow.innerHTML = verified.map(b => `
        <div class="min-w-[140px] p-3 bg-surface rounded-2xl border border-black/5 flex flex-col items-center text-center shadow-xs shrink-0">
          <div class="w-9 h-9 bg-primary-fixed text-primary rounded-full flex items-center justify-center mb-1.5 font-bold">
            <span class="material-symbols-outlined text-base">verified</span>
          </div>
          <span class="text-xs font-bold text-on-surface">${b.name}</span>
          <span class="text-[10px] text-emerald-700 font-extrabold">${b.score}% • ${b.level || 'Verified'}</span>
        </div>
      `).join('');
    }
  }

  // 2. Render Target Roles Grid
  const rolesGrid = document.getElementById('assess-roles-grid');
  if (rolesGrid) {
    const roles = APP_STATE.roles && APP_STATE.roles.length > 0 ? APP_STATE.roles : [
      { id: "role_frontend_dev", name: "Frontend Developer", icon: "code" },
      { id: "role_backend_dev", name: "Backend Developer", icon: "dns" },
      { id: "role_fullstack_dev", name: "Full-Stack Developer", icon: "layers" },
      { id: "role_python_dev", name: "Python Developer", icon: "terminal" },
      { id: "role_java_dev", name: "Java Developer", icon: "coffee" },
      { id: "role_data_analyst", name: "Data Analyst", icon: "analytics" },
      { id: "role_devops_eng", name: "DevOps Engineer", icon: "cloud_sync" },
      { id: "role_qa_eng", name: "QA Engineer", icon: "bug_report" }
    ];

    rolesGrid.innerHTML = roles.map(r => {
      const isSelected = (APP_STATE.assessmentConfig.roleId === r.id);
      return `
        <button type="button" onclick="selectAssessRole('${r.id}', '${r.name}')" class="p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${isSelected ? 'border-2 border-primary bg-primary-fixed/20 shadow-xs' : 'border-outline-variant/60 bg-surface hover:border-primary'}">
          <div class="w-8 h-8 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'} flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-base">${r.icon || 'code'}</span>
          </div>
          <div class="overflow-hidden">
            <span class="text-xs font-bold text-on-surface block truncate">${r.name}</span>
          </div>
        </button>
      `;
    }).join('');
  }

  renderTopicChips();
}

function renderTopicChips() {
  const container = document.getElementById('assess-topics-chips');
  if (!container) return;

  const skills = APP_STATE.skills && APP_STATE.skills.length > 0 ? APP_STATE.skills : [
    { id: "skill_dsa", name: "DSA & Algorithms" },
    { id: "skill_js", name: "JavaScript / ES6+" },
    { id: "skill_react", name: "React & State" },
    { id: "skill_nodejs", name: "Node.js & Express" },
    { id: "skill_db", name: "Databases & SQL" },
    { id: "skill_system_design", name: "System Design" },
    { id: "skill_docker", name: "Docker & DevOps" },
    { id: "skill_testing", name: "QA & Testing" }
  ];

  container.innerHTML = skills.map(s => {
    const isSelected = APP_STATE.assessmentConfig.topicIds.includes(s.id);
    return `
      <button type="button" onclick="toggleAssessTopicChip('${s.id}')" class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${isSelected ? 'bg-primary text-white shadow-xs' : 'bg-surface border border-outline-variant/60 text-on-surface hover:border-primary'}">
        ${isSelected ? '✓ ' : ''}${s.name}
      </button>
    `;
  }).join('');
}

function selectAssessRole(roleId, roleName) {
  APP_STATE.assessmentConfig.roleId = roleId;
  const label = document.getElementById('cfg-role-selected-label');
  if (label) label.textContent = roleName;
  renderAssessmentsView();
}

function selectAssessLevel(level) {
  APP_STATE.assessmentConfig.level = level;
  document.querySelectorAll('.assess-level-btn').forEach(btn => {
    if (btn.getAttribute('data-level') === level) {
      btn.className = "assess-level-btn p-3 rounded-2xl border-2 border-primary bg-primary-fixed/20 text-left transition-all shadow-xs";
      btn.querySelector('span:first-child').className = "text-xs font-extrabold block text-primary";
    } else {
      btn.className = "assess-level-btn p-3 rounded-2xl border border-outline-variant/60 bg-surface text-left transition-all hover:border-primary";
      btn.querySelector('span:first-child').className = "text-xs font-extrabold block text-on-surface";
    }
  });
}

function selectAssessMode(mode) {
  APP_STATE.assessmentConfig.mode = mode;
  document.querySelectorAll('.assess-mode-btn').forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.className = "assess-mode-btn p-3 rounded-2xl border-2 border-primary bg-primary-fixed/20 text-left transition-all shadow-xs";
      btn.querySelector('span:first-child').className = "text-xs font-extrabold block text-primary";
    } else {
      btn.className = "assess-mode-btn p-3 rounded-2xl border border-outline-variant/60 bg-surface text-left transition-all hover:border-primary";
      btn.querySelector('span:first-child').className = "text-xs font-extrabold block text-on-surface";
    }
  });

  const topicsGroup = document.getElementById('assess-topics-filter-group');
  if (topicsGroup) {
    if (mode === 'topic_practice') topicsGroup.classList.remove('hidden');
    else topicsGroup.classList.add('hidden');
  }

  const timerGroup = document.getElementById('assess-timer-custom-group');
  if (timerGroup) {
    if (mode === 'timed_assessment') timerGroup.classList.remove('hidden');
    else timerGroup.classList.add('hidden');
  }
}

function toggleAssessTopicChip(skillId) {
  const list = APP_STATE.assessmentConfig.topicIds;
  const idx = list.indexOf(skillId);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(skillId);
  renderTopicChips();
}

function selectQuestionCount(count) {
  APP_STATE.assessmentConfig.totalQuestions = count;
  document.querySelectorAll('.assess-count-btn').forEach(btn => {
    if (parseInt(btn.getAttribute('data-count')) === count) {
      btn.className = "assess-count-btn py-2 rounded-xl border-2 border-primary font-bold text-center bg-primary-fixed/30 text-primary";
    } else {
      btn.className = "assess-count-btn py-2 rounded-xl border border-outline-variant/60 font-bold text-center bg-surface";
    }
  });
}

// --------------------------------------------------------
// Start Assessment & Active Arena Handling
// --------------------------------------------------------

async function startNewAssessment() {
  const btn = document.getElementById('btn-start-assessment');
  if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-base animate-spin">refresh</span> Generating Personalized Questions...`;

  try {
    const customMins = document.getElementById('assess-custom-minutes')?.value;
    const timeLimitMinutes = APP_STATE.assessmentConfig.mode === 'timed_assessment'
      ? (customMins ? parseInt(customMins) : 30)
      : null;

    const res = await fetch('/api/assessments/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roleId: APP_STATE.assessmentConfig.roleId,
        level: APP_STATE.assessmentConfig.level,
        mode: APP_STATE.assessmentConfig.mode,
        topicIds: APP_STATE.assessmentConfig.topicIds,
        totalQuestions: APP_STATE.assessmentConfig.totalQuestions,
        timeLimitMinutes
      })
    }).then(r => r.json());

    if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-base">rocket_launch</span> <span>Start Assessment</span>`;

    if (res.success && res.assessment) {
      APP_STATE.activeAssessment = res.assessment;
      APP_STATE.activeQIdx = 0;

      // Switch sub-views
      document.getElementById('assess-setup-subview').classList.add('hidden');
      document.getElementById('assess-results-subview').classList.add('hidden');
      document.getElementById('assess-active-subview').classList.remove('hidden');

      // Initialize Timer if timed mode
      if (res.assessment.timeLimitMinutes) {
        startAssessmentTimer(res.assessment.timeLimitMinutes);
      } else {
        const timerChip = document.getElementById('active-exam-timer-chip');
        if (timerChip) timerChip.classList.add('hidden');
      }

      renderActiveQuestion();
      showToast("Assessment started! Good luck.");
    } else {
      showToast(res.error || "Failed to generate assessment", true);
    }
  } catch (err) {
    if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-base">rocket_launch</span> <span>Start Assessment</span>`;
    showToast("Error connecting to assessment server", true);
  }
}

function startAssessmentTimer(minutes) {
  if (APP_STATE.activeQuestionTimer) clearInterval(APP_STATE.activeQuestionTimer);

  APP_STATE.secondsRemaining = minutes * 60;
  const timerChip = document.getElementById('active-exam-timer-chip');
  const timerText = document.getElementById('active-exam-timer-text');
  if (timerChip) timerChip.classList.remove('hidden');

  function updateDisplay() {
    const mins = Math.floor(APP_STATE.secondsRemaining / 60);
    const secs = APP_STATE.secondsRemaining % 60;
    if (timerText) timerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (APP_STATE.secondsRemaining <= 300) { // < 5 mins
      if (timerChip) timerChip.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-xs font-black font-mono text-rose-700 animate-pulse";
    }
  }

  updateDisplay();

  APP_STATE.activeQuestionTimer = setInterval(() => {
    APP_STATE.secondsRemaining--;
    updateDisplay();

    if (APP_STATE.secondsRemaining <= 0) {
      clearInterval(APP_STATE.activeQuestionTimer);
      showToast("Time expired! Automatically submitting your assessment...", true);
      submitAssessmentNow();
    }
  }, 1000);
}

function renderActiveQuestion() {
  const assessment = APP_STATE.activeAssessment;
  if (!assessment || !assessment.questions || assessment.questions.length === 0) return;

  const currentQ = assessment.questions[APP_STATE.activeQIdx];
  const total = assessment.questions.length;

  // Header and Progress
  document.getElementById('active-exam-role-badge').textContent = assessment.roleTitle || "Technical Assessment";
  document.getElementById('active-exam-title').textContent = `Question ${APP_STATE.activeQIdx + 1} of ${total}`;
  const pct = Math.round(((APP_STATE.activeQIdx + 1) / total) * 100);
  document.getElementById('active-exam-progress-bar').style.width = `${pct}%`;

  // Palette Navigation Grid
  const palette = document.getElementById('active-exam-palette');
  if (palette) {
    palette.innerHTML = assessment.questions.map((q, idx) => {
      const isCurrent = idx === APP_STATE.activeQIdx;
      const isAnswered = q.answer !== null && q.answer !== undefined && q.answer !== '';
      let bgClass = "bg-surface-container text-on-surface-variant hover:bg-surface-container-high";
      if (isAnswered) bgClass = "bg-emerald-600 text-white font-bold";
      if (isCurrent) bgClass = "bg-primary text-white ring-2 ring-primary ring-offset-2 font-black";

      return `
        <button type="button" onclick="jumpToQuestion(${idx})" class="w-7 h-7 rounded-lg text-xs flex items-center justify-center shrink-0 transition-all ${bgClass}">
          ${idx + 1}
        </button>
      `;
    }).join('');
  }

  // Metadata Badges
  const typeMap = {
    multiple_choice: "Multiple Choice",
    multi_select: "Multi-Select",
    true_false: "True / False",
    short_answer: "Short Answer",
    coding: "Coding Sandbox",
    scenario: "Scenario Debugging"
  };
  document.getElementById('active-q-type-badge').textContent = typeMap[currentQ.questionType] || currentQ.questionType;
  document.getElementById('active-q-diff-badge').textContent = (currentQ.difficulty || 'intermediate').toUpperCase();
  document.getElementById('active-q-points-badge').textContent = `${currentQ.points || 3} Points`;

  // Skills Tags
  const skillsContainer = document.getElementById('active-q-skills-tags');
  if (skillsContainer && currentQ.skills) {
    skillsContainer.innerHTML = currentQ.skills.map(s => {
      const name = s.skillId.replace('skill_', '').replace('_', ' ').toUpperCase();
      return `<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container text-outline">${name}</span>`;
    }).join('');
  }

  // Title and Prompt
  document.getElementById('active-q-title').textContent = currentQ.title;
  document.getElementById('active-q-prompt').textContent = currentQ.prompt;

  // Answer Container Rendering
  const answerBox = document.getElementById('active-q-answer-container');
  answerBox.innerHTML = '';

  if (currentQ.questionType === 'multiple_choice' || currentQ.questionType === 'true_false' || currentQ.questionType === 'scenario') {
    answerBox.innerHTML = `
      <div class="space-y-2.5">
        ${(currentQ.options || []).map(opt => {
          const isSelected = currentQ.answer === opt.id || currentQ.answer === opt.text;
          return `
            <label onclick="handleOptionSelect('${opt.id}')" class="flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'border-2 border-primary bg-primary-fixed/20 shadow-xs' : 'border-outline-variant/60 bg-surface hover:border-primary'}">
              <input type="radio" name="q_opt" value="${opt.id}" ${isSelected ? 'checked' : ''} class="mt-0.5 text-primary focus:ring-primary w-4 h-4">
              <span class="text-xs md:text-sm text-on-surface leading-relaxed">${opt.text}</span>
            </label>
          `;
        }).join('')}
      </div>
    `;
  } else if (currentQ.questionType === 'multi_select') {
    const selectedList = Array.isArray(currentQ.answer) ? currentQ.answer : [];
    answerBox.innerHTML = `
      <div class="space-y-2.5">
        <span class="text-[11px] text-outline font-semibold block mb-1">Select all options that apply:</span>
        ${(currentQ.options || []).map(opt => {
          const isSelected = selectedList.includes(opt.id);
          return `
            <label onclick="handleMultiSelectToggle('${opt.id}')" class="flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'border-2 border-primary bg-primary-fixed/20 shadow-xs' : 'border-outline-variant/60 bg-surface hover:border-primary'}">
              <input type="checkbox" ${isSelected ? 'checked' : ''} class="mt-0.5 text-primary focus:ring-primary rounded w-4 h-4">
              <span class="text-xs md:text-sm text-on-surface leading-relaxed">${opt.text}</span>
            </label>
          `;
        }).join('')}
      </div>
    `;
  } else if (currentQ.questionType === 'short_answer') {
    const userVal = typeof currentQ.answer === 'string' ? currentQ.answer : '';
    answerBox.innerHTML = `
      <div class="space-y-2">
        <label class="text-xs font-bold text-on-surface">Your Answer:</label>
        <input type="text" id="short-answer-input" value="${userVal}" oninput="handleShortAnswerChange(this.value)" placeholder="Type precise term, command, or value..." class="w-full p-3.5 rounded-2xl border border-outline-variant/60 text-xs md:text-sm bg-surface text-on-surface focus:outline-primary font-medium">
      </div>
    `;
  } else if (currentQ.questionType === 'coding') {
    const starter = currentQ.coding?.starterCodeJson?.javascript || "function solution() {\n  // Write solution here\n}";
    const codeVal = (typeof currentQ.answer === 'object' && currentQ.answer?.code) ? currentQ.answer.code : (currentQ.answer || starter);

    answerBox.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-on-surface">Editor (JavaScript):</span>
            <span class="text-[10px] text-outline font-mono">Node.js vm sandbox</span>
          </div>
          <button type="button" onclick="runActiveCodingTestCases()" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs">
            <span class="material-symbols-outlined text-sm">play_arrow</span>
            <span>Run Public Test Cases</span>
          </button>
        </div>

        <textarea id="active-coding-textarea" oninput="handleCodingChange(this.value)" rows="9" class="w-full p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs border border-slate-800 leading-relaxed focus:outline-primary">${codeVal}</textarea>

        <!-- Live Sandbox Terminal Feedback -->
        <div id="active-coding-feedback" class="p-3.5 rounded-2xl bg-surface-container-low border border-black/5 text-xs font-mono space-y-1.5">
          <span class="text-[10px] font-black uppercase text-outline tracking-wider">Public Test Cases:</span>
          <div id="active-coding-test-rows" class="space-y-1">
            ${(currentQ.coding?.testCases || []).map((tc, idx) => `
              <div class="flex items-center justify-between p-2 rounded-xl bg-surface border border-black/5 text-[11px]">
                <span class="text-slate-600">Case ${idx + 1}: <code class="text-on-surface font-bold">${tc.input}</code></span>
                <span class="text-outline">Expected: <code>${tc.expected}</code></span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Prev / Next button state
  document.getElementById('btn-active-prev').disabled = (APP_STATE.activeQIdx === 0);
  const nextBtn = document.getElementById('btn-active-next');
  if (APP_STATE.activeQIdx === total - 1) {
    nextBtn.innerHTML = `<span>Submit Test</span> <span class="material-symbols-outlined text-sm">check_circle</span>`;
    nextBtn.onclick = () => confirmSubmitAssessment();
  } else {
    nextBtn.innerHTML = `<span>Next Question</span> <span class="material-symbols-outlined text-sm">arrow_forward</span>`;
    nextBtn.onclick = () => navActiveQuestion(1);
  }
}

function handleOptionSelect(optId) {
  const currentQ = APP_STATE.activeAssessment.questions[APP_STATE.activeQIdx];
  currentQ.answer = optId;
  autoSaveCurrentAnswer();
  renderActiveQuestion();
}

function handleMultiSelectToggle(optId) {
  const currentQ = APP_STATE.activeAssessment.questions[APP_STATE.activeQIdx];
  if (!Array.isArray(currentQ.answer)) currentQ.answer = [];
  const idx = currentQ.answer.indexOf(optId);
  if (idx >= 0) currentQ.answer.splice(idx, 1);
  else currentQ.answer.push(optId);
  autoSaveCurrentAnswer();
  renderActiveQuestion();
}

function handleShortAnswerChange(val) {
  const currentQ = APP_STATE.activeAssessment.questions[APP_STATE.activeQIdx];
  currentQ.answer = val;
  autoSaveCurrentAnswer();
}

function handleCodingChange(code) {
  const currentQ = APP_STATE.activeAssessment.questions[APP_STATE.activeQIdx];
  currentQ.answer = { code, language: "javascript" };
  autoSaveCurrentAnswer();
}

async function runActiveCodingTestCases() {
  const currentQ = APP_STATE.activeAssessment.questions[APP_STATE.activeQIdx];
  const textarea = document.getElementById('active-coding-textarea');
  const code = textarea ? textarea.value : (currentQ.answer?.code || "");
  const feedbackRows = document.getElementById('active-coding-test-rows');

  if (!feedbackRows) return;
  feedbackRows.innerHTML = `<div class="text-xs text-primary font-bold animate-pulse">Running test cases in sandbox...</div>`;

  const publicTestCases = currentQ.coding?.testCases || [];
  let passedCount = 0;

  setTimeout(() => {
    feedbackRows.innerHTML = publicTestCases.map((tc, idx) => {
      let passed = false;
      let actual = "Error";
      try {
        const fn = new Function(`${code}; return ${tc.input};`);
        actual = JSON.stringify(fn());
        const cleanExp = String(tc.expected).replace(/\s+/g, '');
        const cleanAct = String(actual).replace(/\s+/g, '');
        passed = (cleanAct === cleanExp || cleanAct === `"${cleanExp}"`);
        if (passed) passedCount++;
      } catch (err) {
        actual = err.message;
      }

      return `
        <div class="flex items-center justify-between p-2 rounded-xl border text-[11px] ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm ${passed ? 'text-emerald-600' : 'text-rose-600'}">${passed ? 'check_circle' : 'cancel'}</span>
            <span>Case ${idx + 1}: <code>${tc.input}</code></span>
          </div>
          <span class="font-bold">Actual: <code>${actual}</code></span>
        </div>
      `;
    }).join('');

    showToast(`Sandbox check: ${passedCount} of ${publicTestCases.length} public test cases passing.`);
  }, 400);
}

let autoSaveTimeout = null;
function autoSaveCurrentAnswer() {
  const assessment = APP_STATE.activeAssessment;
  if (!assessment) return;
  const currentQ = assessment.questions[APP_STATE.activeQIdx];

  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(async () => {
    try {
      await fetch(`/api/assessments/${assessment.id}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.questionId,
          answer: currentQ.answer,
          timeSpentSeconds: 5
        })
      });
      const statusEl = document.getElementById('active-exam-save-status');
      if (statusEl) {
        statusEl.classList.remove('hidden');
        setTimeout(() => statusEl.classList.add('hidden'), 2000);
      }
    } catch (e) {
      console.error("Autosave error:", e);
    }
  }, 300);
}

function navActiveQuestion(delta) {
  const newIdx = APP_STATE.activeQIdx + delta;
  const total = APP_STATE.activeAssessment.questions.length;
  if (newIdx >= 0 && newIdx < total) {
    APP_STATE.activeQIdx = newIdx;
    renderActiveQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function jumpToQuestion(idx) {
  const total = APP_STATE.activeAssessment.questions.length;
  if (idx >= 0 && idx < total) {
    APP_STATE.activeQIdx = idx;
    renderActiveQuestion();
  }
}

function confirmSubmitAssessment() {
  const assessment = APP_STATE.activeAssessment;
  const unanswered = (assessment.questions || []).filter(q => q.answer === null || q.answer === undefined || q.answer === '').length;

  let msg = "Are you ready to submit your assessment for grading?";
  if (unanswered > 0) {
    msg = `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`;
  }

  if (confirm(msg)) {
    submitAssessmentNow();
  }
}

async function submitAssessmentNow() {
  if (APP_STATE.activeQuestionTimer) clearInterval(APP_STATE.activeQuestionTimer);

  const assessment = APP_STATE.activeAssessment;
  if (!assessment) return;

  showToast("Grading test cases and generating diagnostic report...");

  try {
    const res = await fetch(`/api/assessments/${assessment.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(r => r.json());

    if (res.success && res.result) {
      renderAssessmentResults(res.result);
      await loadInitialData();
    } else {
      showToast(res.error || "Grading error", true);
    }
  } catch (err) {
    showToast("Failed to submit assessment to server", true);
  }
}

function confirmExitAssessment() {
  if (confirm("Do you want to exit? Your answers have been auto-saved and can be resumed from My History.")) {
    if (APP_STATE.activeQuestionTimer) clearInterval(APP_STATE.activeQuestionTimer);
    document.getElementById('assess-active-subview').classList.add('hidden');
    document.getElementById('assess-setup-subview').classList.remove('hidden');
  }
}

// --------------------------------------------------------
// Results & Diagnostic View
// --------------------------------------------------------

function renderAssessmentResults(result) {
  document.getElementById('assess-active-subview').classList.add('hidden');
  document.getElementById('assess-setup-subview').classList.add('hidden');
  document.getElementById('assess-results-subview').classList.remove('hidden');

  // Summary Badges & Scores
  const score = result.score || 0;
  document.getElementById('res-overall-score').textContent = `${score}%`;
  document.getElementById('res-role-label').textContent = `${result.roleTitle || "Technical"} • ${(result.level || "Intermediate").toUpperCase()}`;

  const tierEl = document.getElementById('res-tier-text');
  if (score >= 85) tierEl.textContent = "Mastery Level (Top 5% Candidate)";
  else if (score >= 70) tierEl.textContent = "Proficient (Credential Verified)";
  else tierEl.textContent = "Foundational (Targeted Practice Needed)";

  const solvedCount = (result.questions || []).filter(q => q.isCorrect).length;
  const totalCount = (result.questions || []).length;
  document.getElementById('res-solved-ratio').textContent = `${solvedCount} / ${totalCount}`;
  document.getElementById('res-points-ratio').textContent = `${result.totalEarnedPoints || 0} / ${result.maxPossiblePoints || 0} Pts`;

  // Weak Skills Recommendations
  const weakCard = document.getElementById('res-weak-skills-card');
  const recoList = document.getElementById('res-recommendations-list');
  const weakResults = (result.skillResults || []).filter(sr => sr.percentage < 60);

  if (weakResults.length > 0 && recoList) {
    weakCard.classList.remove('hidden');
    recoList.innerHTML = weakResults.map(sr => `
      <div class="flex items-start gap-2 p-2.5 bg-white/80 rounded-xl border border-amber-200">
        <span class="material-symbols-outlined text-sm text-amber-700 mt-0.5">warning</span>
        <div>
          <span class="font-bold text-amber-950">${sr.skillName} (${sr.percentage}%):</span>
          <p class="text-[11px] text-amber-900">${sr.recommendation}</p>
        </div>
      </div>
    `).join('');
  } else if (weakCard) {
    weakCard.classList.add('hidden');
  }

  // Skill-by-Skill Competency Bars
  const skillBars = document.getElementById('res-skill-bars-container');
  if (skillBars) {
    skillBars.innerHTML = (result.skillResults || []).map(sr => {
      let colorClass = "bg-primary";
      if (sr.percentage >= 75) colorClass = "bg-emerald-600";
      else if (sr.percentage < 60) colorClass = "bg-amber-500";

      return `
        <div class="p-4 rounded-2xl bg-surface-container-low border border-black/5 space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="font-bold text-on-surface">${sr.skillName}</span>
            <span class="font-black text-on-surface">${sr.percentage}% (${sr.correctCount}/${sr.totalCount})</span>
          </div>
          <div class="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div class="${colorClass} h-full rounded-full transition-all duration-500" style="width: ${sr.percentage}%;"></div>
          </div>
          <p class="text-[10px] text-on-surface-variant leading-tight">${sr.recommendation}</p>
        </div>
      `;
    }).join('');
  }

  // In-Depth Question Accordion Review
  const reviewList = document.getElementById('res-questions-review-list');
  if (reviewList) {
    reviewList.innerHTML = (result.questions || []).map((q, idx) => {
      const isCorrect = q.isCorrect;
      const statusBadge = isCorrect
        ? `<span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">Correct (+${q.score} pts)</span>`
        : `<span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800">Incorrect (0 pts)</span>`;

      return `
        <details class="p-4 rounded-2xl bg-surface-container-low border border-black/5 text-xs space-y-3 group">
          <summary class="flex items-center justify-between cursor-pointer font-bold text-on-surface list-none">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'} flex items-center justify-center font-black text-xs">${idx + 1}</span>
              <span class="text-on-surface">${q.title}</span>
            </div>
            <div class="flex items-center gap-2">
              ${statusBadge}
              <span class="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
            </div>
          </summary>

          <div class="pt-3 border-t border-black/5 space-y-2.5">
            <p class="text-on-surface-variant whitespace-pre-wrap font-sans">${q.prompt}</p>

            ${q.explanation ? `
              <div class="p-3 rounded-xl bg-primary-fixed/20 border border-primary-fixed-dim text-xs space-y-1">
                <span class="font-extrabold text-primary flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">psychology</span> Technical Explanation:
                </span>
                <p class="text-on-surface leading-relaxed text-[11px]">${q.explanation}</p>
              </div>
            ` : ''}
          </div>
        </details>
      `;
    }).join('');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startWeakSkillsPracticeSession() {
  const result = APP_STATE.activeAssessment;
  const weakSkillIds = (result?.skillResults || []).filter(sr => sr.percentage < 60).map(sr => sr.skillId);
  APP_STATE.assessmentConfig.mode = 'topic_practice';
  APP_STATE.assessmentConfig.topicIds = weakSkillIds.length > 0 ? weakSkillIds : [];
  APP_STATE.assessmentConfig.totalQuestions = 10;
  startNewAssessment();
}

function exitResultsToSetup() {
  document.getElementById('assess-results-subview').classList.add('hidden');
  document.getElementById('assess-active-subview').classList.add('hidden');
  document.getElementById('assess-setup-subview').classList.remove('hidden');
  renderAssessmentsView();
}

// --------------------------------------------------------
// Admin Question Studio Controller
// --------------------------------------------------------

function openAdminQuestionStudio() {
  openModal('modal-admin-questions');
  switchAdminTab('library');
  loadAdminQuestionsList();
}

function switchAdminTab(tab) {
  const tabs = ['library', 'create', 'import'];
  tabs.forEach(t => {
    const view = document.getElementById(`admin-view-${t}`);
    const btn = document.getElementById(`admin-tab-btn-${t}`);
    if (t === tab) {
      if (view) view.classList.remove('hidden');
      if (btn) btn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-white shadow-xs";
    } else {
      if (view) view.classList.add('hidden');
      if (btn) btn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-surface-container text-on-surface hover:bg-surface-container-high";
    }
  });

  if (tab === 'create') {
    populateAdminSkillDropdown();
    if (!document.getElementById('admin-form-q-id').value) {
      resetAdminQuestionForm();
    }
  }
}

async function loadAdminQuestionsList() {
  const search = document.getElementById('admin-q-search')?.value || '';
  const questionType = document.getElementById('admin-q-type-filter')?.value || 'all';
  const difficulty = document.getElementById('admin-q-diff-filter')?.value || 'all';

  const tbody = document.getElementById('admin-questions-tbody');
  if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-outline">Loading questions from database...</td></tr>`;

  try {
    const url = `/api/questions?search=${encodeURIComponent(search)}&questionType=${questionType}&difficulty=${difficulty}`;
    const res = await fetch(url).then(r => r.json());
    if (res.success && res.questions) {
      APP_STATE.adminQuestions = res.questions;
      document.getElementById('admin-q-total-count').textContent = `${res.questions.length} questions in bank`;

      tbody.innerHTML = res.questions.map(q => `
        <tr class="border-b border-black/5 hover:bg-surface-container transition-colors">
          <td class="py-2.5 px-3 font-bold text-on-surface max-w-xs truncate">${q.title}</td>
          <td class="py-2.5 px-3 text-outline font-medium">${q.questionType}</td>
          <td class="py-2.5 px-3">
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded ${q.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : (q.difficulty === 'advanced' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')}">${q.difficulty}</span>
          </td>
          <td class="py-2.5 px-3">
            <span class="text-[10px] font-bold ${q.status === 'published' ? 'text-emerald-600' : 'text-slate-400'}">${q.status}</span>
          </td>
          <td class="py-2.5 px-3 text-right space-x-1">
            <button onclick="editAdminQuestion('${q.id}')" class="px-2 py-1 rounded bg-surface border border-outline-variant/60 text-primary font-bold hover:bg-primary hover:text-white">Edit</button>
            <button onclick="deleteAdminQuestion('${q.id}')" class="px-2 py-1 rounded bg-surface border border-rose-200 text-rose-600 font-bold hover:bg-rose-600 hover:text-white">Delete</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-rose-500">Failed to load questions.</td></tr>`;
  }
}

function populateAdminSkillDropdown() {
  const select = document.getElementById('admin-form-skill');
  if (!select) return;
  const skills = APP_STATE.skills || [];
  select.innerHTML = skills.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

function toggleAdminFormTypeFields() {
  const type = document.getElementById('admin-form-type').value;
  const optGroup = document.getElementById('admin-form-options-group');
  const saGroup = document.getElementById('admin-form-sa-group');
  const codingGroup = document.getElementById('admin-form-coding-group');

  if (optGroup) optGroup.classList.toggle('hidden', !['multiple_choice', 'multi_select', 'true_false', 'scenario'].includes(type));
  if (saGroup) saGroup.classList.toggle('hidden', type !== 'short_answer');
  if (codingGroup) codingGroup.classList.toggle('hidden', type !== 'coding');
}

function resetAdminQuestionForm() {
  document.getElementById('admin-form-q-id').value = '';
  document.getElementById('admin-form-title').value = '';
  document.getElementById('admin-form-prompt').value = '';
  document.getElementById('admin-form-explanation').value = '';
  document.getElementById('admin-form-options-list').innerHTML = '';
  document.getElementById('admin-form-testcases-list').innerHTML = '';

  addAdminOptionRow("Option 1", true);
  addAdminOptionRow("Option 2", false);
  addAdminOptionRow("Option 3", false);
  addAdminTestCaseRow("solution([1, 2, 3])", "6", false);
  addAdminTestCaseRow("solution([])", "0", true);
  toggleAdminFormTypeFields();
}

function addAdminOptionRow(text = '', isCorrect = false) {
  const list = document.getElementById('admin-form-options-list');
  if (!list) return;
  const id = `opt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const div = document.createElement('div');
  div.className = "flex items-center gap-2 admin-opt-row";
  div.innerHTML = `
    <input type="checkbox" class="admin-opt-correct w-4 h-4 text-primary rounded" ${isCorrect ? 'checked' : ''} title="Check if correct answer">
    <input type="text" class="admin-opt-text flex-1 px-3 py-1.5 rounded-xl border border-outline-variant/60 text-xs bg-surface text-on-surface" value="${text}" placeholder="Option text...">
    <button type="button" onclick="this.parentElement.remove()" class="text-rose-500 hover:text-rose-700 text-xs">Remove</button>
  `;
  list.appendChild(div);
}

function addAdminTestCaseRow(input = '', expected = '', isHidden = false) {
  const list = document.getElementById('admin-form-testcases-list');
  if (!list) return;
  const div = document.createElement('div');
  div.className = "flex items-center gap-2 admin-tc-row";
  div.innerHTML = `
    <input type="text" class="admin-tc-input flex-1 px-2.5 py-1.5 rounded-xl border border-outline-variant/60 text-xs font-mono bg-surface" value="${input}" placeholder="Input e.g. solve(4)">
    <input type="text" class="admin-tc-expected w-32 px-2.5 py-1.5 rounded-xl border border-outline-variant/60 text-xs font-mono bg-surface" value="${expected}" placeholder="Expected e.g. 16">
    <label class="text-[10px] text-outline flex items-center gap-1 shrink-0">
      <input type="checkbox" class="admin-tc-hidden" ${isHidden ? 'checked' : ''}> Hidden
    </label>
    <button type="button" onclick="this.parentElement.remove()" class="text-rose-500 hover:text-rose-700 text-xs">✕</button>
  `;
  list.appendChild(div);
}

async function handleAdminCreateQuestion(e) {
  e.preventDefault();
  const qId = document.getElementById('admin-form-q-id').value;
  const title = document.getElementById('admin-form-title').value.trim();
  const type = document.getElementById('admin-form-type').value;
  const difficulty = document.getElementById('admin-form-diff').value;
  const status = document.getElementById('admin-form-status').value;
  const skillId = document.getElementById('admin-form-skill').value;
  const prompt = document.getElementById('admin-form-prompt').value.trim();
  const explanation = document.getElementById('admin-form-explanation').value.trim();

  // Parse Options
  const options = [];
  document.querySelectorAll('.admin-opt-row').forEach((row, idx) => {
    const isCorrect = row.querySelector('.admin-opt-correct').checked;
    const text = row.querySelector('.admin-opt-text').value.trim();
    if (text) {
      options.push({ id: `opt_${idx + 1}`, text, isCorrect });
    }
  });

  // Parse Short Answers
  const saRaw = document.getElementById('admin-form-sa-answers')?.value || '';
  const acceptableShortAnswers = saRaw.split(',').map(s => s.trim()).filter(Boolean);

  // Parse Coding
  const starterCode = document.getElementById('admin-form-starter-code')?.value || '';
  const testCases = [];
  document.querySelectorAll('.admin-tc-row').forEach(row => {
    const input = row.querySelector('.admin-tc-input').value.trim();
    const expected = row.querySelector('.admin-tc-expected').value.trim();
    const isHidden = row.querySelector('.admin-tc-hidden').checked;
    if (input && expected) {
      testCases.push({ input, expected, isHidden });
    }
  });

  const payload = {
    title,
    questionType: type,
    difficulty,
    status,
    prompt,
    explanation,
    skills: [{ skillId, weight: 1.0 }],
    options: options.length > 0 ? options : null,
    acceptableShortAnswers: acceptableShortAnswers.length > 0 ? acceptableShortAnswers : null,
    coding: type === 'coding' ? {
      starterCodeJson: { javascript: starterCode },
      testCases
    } : null
  };

  try {
    let res;
    if (qId) {
      res = await fetch(`/api/admin/questions/${qId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());
    } else {
      res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());
    }

    if (res.success) {
      showToast(qId ? "Question updated successfully!" : "New question created and added to bank!");
      switchAdminTab('library');
      loadAdminQuestionsList();
    } else {
      showToast(res.error || "Failed to save question", true);
    }
  } catch (err) {
    showToast("Error saving question", true);
  }
}

function editAdminQuestion(id) {
  const q = (APP_STATE.adminQuestions || []).find(item => item.id === id);
  if (!q) return;

  switchAdminTab('create');
  document.getElementById('admin-form-q-id').value = q.id;
  document.getElementById('admin-form-title').value = q.title || '';
  document.getElementById('admin-form-type').value = q.questionType || 'multiple_choice';
  document.getElementById('admin-form-diff').value = q.difficulty || 'intermediate';
  document.getElementById('admin-form-status').value = q.status || 'published';
  document.getElementById('admin-form-prompt').value = q.prompt || '';
  document.getElementById('admin-form-explanation').value = q.explanation || '';

  const optList = document.getElementById('admin-form-options-list');
  optList.innerHTML = '';
  (q.options || []).forEach(opt => addAdminOptionRow(opt.text, opt.isCorrect));

  const tcList = document.getElementById('admin-form-testcases-list');
  tcList.innerHTML = '';
  (q.coding?.testCases || []).forEach(tc => addAdminTestCaseRow(tc.input, tc.expected, tc.isHidden));

  if (q.coding?.starterCodeJson?.javascript) {
    document.getElementById('admin-form-starter-code').value = q.coding.starterCodeJson.javascript;
  }

  toggleAdminFormTypeFields();
}

async function deleteAdminQuestion(id) {
  if (!confirm("Are you sure you want to permanently delete this question from the bank?")) return;

  try {
    const res = await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' }).then(r => r.json());
    if (res.success) {
      showToast("Question deleted from question bank");
      loadAdminQuestionsList();
    }
  } catch (e) {
    showToast("Delete failed", true);
  }
}

function loadSampleJsonInAdminImport() {
  const sample = [
    {
      "title": "Custom Question: React useCallback vs useMemo",
      "questionType": "multiple_choice",
      "difficulty": "intermediate",
      "prompt": "What is the primary architectural difference between React's useCallback and useMemo hooks?",
      "explanation": "useCallback returns a memoized callback function definition, whereas useMemo returns the memoized evaluated result of invoking the function.",
      "status": "published",
      "skills": [{ "skillId": "skill_react", "weight": 1.0 }],
      "options": [
        { "id": "opt_1", "text": "useCallback memoizes the function reference itself; useMemo memoizes the computed return value.", "isCorrect": true },
        { "id": "opt_2", "text": "useCallback runs asynchronously in a web worker; useMemo runs synchronously.", "isCorrect": false }
      ]
    }
  ];
  document.getElementById('admin-import-textarea').value = JSON.stringify(sample, null, 2);
}

async function executeAdminBulkImport() {
  const text = document.getElementById('admin-import-textarea').value.trim();
  if (!text) {
    showToast("Please paste valid JSON question payload", true);
    return;
  }

  try {
    const parsed = JSON.parse(text);
    const res = await fetch('/api/admin/questions/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed)
    }).then(r => r.json());

    if (res.success) {
      showToast(`Bulk Import Success! Imported ${res.count} questions. Total in database: ${res.totalInDB}`);
      switchAdminTab('library');
      loadAdminQuestionsList();
    } else {
      showToast(res.error || "Bulk import failed", true);
    }
  } catch (err) {
    showToast(`Invalid JSON Syntax: ${err.message}`, true);
  }
}

// --------------------------------------------------------
// Past Assessment History Modal
// --------------------------------------------------------

async function openPastAssessmentsModal() {
  openModal('modal-past-assessments');
  const container = document.getElementById('past-assessments-list');
  if (container) container.innerHTML = `<div class="p-4 text-center text-xs text-outline">Loading your past attempts...</div>`;

  try {
    const res = await fetch('/api/users/me/assessment-history').then(r => r.json());
    if (res.success && res.history) {
      if (res.history.length === 0) {
        container.innerHTML = `
          <div class="p-6 text-center text-xs text-on-surface-variant space-y-2">
            <span class="material-symbols-outlined text-3xl text-outline">history</span>
            <p>No past assessments found yet. Take your first assessment to view results here!</p>
          </div>
        `;
      } else {
        container.innerHTML = res.history.map(a => {
          const isDone = (a.status === 'submitted');
          return `
            <div class="p-4 rounded-2xl bg-surface border border-black/5 flex items-center justify-between shadow-xs">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-on-surface">${a.roleTitle || 'Assessment'}</span>
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${isDone ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}">${a.status}</span>
                </div>
                <span class="text-[10px] text-outline block">${new Date(a.createdAt).toLocaleString()} • ${a.questions?.length || 0} Questions</span>
              </div>
              <div class="flex items-center gap-3">
                ${isDone ? `<span class="text-base font-black text-primary">${a.score}%</span>` : ''}
                <button onclick="viewPastAssessmentResult('${a.id}')" class="px-3 py-1.5 rounded-xl bg-primary-fixed text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all">
                  ${isDone ? 'View Report' : 'Resume'}
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  } catch (err) {
    if (container) container.innerHTML = `<div class="p-4 text-center text-xs text-rose-500">Failed to load history.</div>`;
  }
}

async function viewPastAssessmentResult(assessmentId) {
  closeModal('modal-past-assessments');
  try {
    const res = await fetch(`/api/assessments/${assessmentId}`).then(r => r.json());
    if (res.success && res.assessment) {
      if (res.assessment.status === 'submitted') {
        renderAssessmentResults(res.assessment);
      } else {
        APP_STATE.activeAssessment = res.assessment;
        APP_STATE.activeQIdx = 0;
        document.getElementById('assess-setup-subview').classList.add('hidden');
        document.getElementById('assess-results-subview').classList.add('hidden');
        document.getElementById('assess-active-subview').classList.remove('hidden');
        renderActiveQuestion();
      }
    }
  } catch (e) {
    showToast("Error loading assessment result", true);
  }
}

// ========================================================
// VIEW 5: VERIFIED PROFILE
// ========================================================
function renderVerifiedProfileView() {
  const user = APP_STATE.user || {};
  const readiness = APP_STATE.readiness || { score: 78, tier: "Top 5% Candidate • Tier 1 Ready" };

  document.getElementById('vp-user-name').textContent = user.name || 'Rahul Sharma';
  document.getElementById('vp-score').innerHTML = `${readiness.score}<span class="text-lg text-on-surface-variant font-semibold">/100</span>`;
  document.getElementById('vp-tier').textContent = readiness.tier;

  const list = document.getElementById('vp-skills-list');
  list.innerHTML = (user.verifiedSkills || []).map(skill => `
    <div class="flex items-center justify-between p-3.5 bg-surface rounded-2xl border border-black/5 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
          <span class="material-symbols-outlined text-lg">verified</span>
        </div>
        <div>
          <h4 class="text-xs font-bold text-on-surface">${skill.name}</h4>
          <span class="text-[10px] text-on-surface-variant">Attested on ${skill.verifiedAt}</span>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xs font-black text-primary">${skill.score}%</span>
        <span class="text-[10px] block text-outline font-semibold">${skill.level}</span>
      </div>
    </div>
  `).join('');
}

// ========================================================
// VIEW 6: JOB MATCHES (INR FORMAT)
// ========================================================
function renderJobMatchesView() {
  const grid = document.getElementById('jobs-cards-grid');
  grid.innerHTML = (APP_STATE.jobs || []).map(job => `
    <div class="glass-panel rounded-3xl p-6 hover-lift flex flex-col justify-between border ${job.applied ? 'border-green-300' : 'border-black/5'}">
      <div>
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl ${job.logoColor || 'bg-primary'} text-white flex items-center justify-center font-black text-base shadow-xs">
              ${job.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 class="text-sm font-bold text-on-surface">${job.title}</h3>
              <span class="text-xs text-on-surface-variant font-semibold">${job.company} • ${job.location}</span>
            </div>
          </div>
          <span class="text-xs font-extrabold px-3 py-1 rounded-full ${job.calculatedMatchRate >= 75 ? 'bg-green-100 text-green-800' : 'bg-primary-fixed text-primary'}">
            ${job.calculatedMatchRate}% Match
          </span>
        </div>

        <p class="text-xs text-on-surface-variant mb-4 leading-relaxed">${job.description}</p>

        <div class="mb-4">
          <span class="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1.5">Required Skills:</span>
          <div class="flex flex-wrap gap-1.5">
            ${(job.requirementsBreakdown || []).map(req => `
              <span class="text-[11px] px-2 py-0.5 rounded-md font-semibold ${req.satisfied ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-surface-container text-on-surface-variant border border-outline-variant/30'}">
                ${req.satisfied ? '✓ ' : ''}${req.skill}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center pt-3 border-t border-black/5">
        <div>
          <span class="text-xs font-black text-on-surface">${job.salary}</span>
          <span class="text-[10px] text-on-surface-variant block font-medium">${job.type}</span>
        </div>
        <button onclick="applyJob('${job.id}')" ${job.applied ? 'disabled' : ''} class="text-xs px-4 py-2 rounded-xl font-bold transition-all ${job.applied ? 'bg-green-600 text-white cursor-default' : 'btn-primary'}">
          ${job.applied ? '✓ Application Sent' : '1-Click Apply'}
        </button>
      </div>
    </div>
  `).join('');
}

async function applyJob(jobId) {
  try {
    const res = await fetch(`/api/jobs/${jobId}/apply`, { method: 'POST' }).then(r => r.json());
    if (res.success) {
      showToast(res.message);
      if (res.applyUrl) window.open(res.applyUrl, '_blank');
      const job = (APP_STATE.jobs || []).find(j => j.id === jobId);
      if (job) job.applied = true;
      renderJobMatchesView();
    }
  } catch (err) {
    showToast("Application submission failed", true);
  }
}

// ========================================================
// MODAL ACTIONS
// ========================================================

// Upload Resume
function openUploadModal() {
  openModal('modal-upload');
}

function handleFileSelected(e) {
  const file = e.target.files[0];
  if (file) {
    APP_STATE.selectedFile = file;
    document.getElementById('dropzone-text').textContent = `Selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;
  }
}

async function submitResume() {
  const pasteText = document.getElementById('paste-text-input').value.trim();
  const file = APP_STATE.selectedFile;

  if (!file && !pasteText) {
    showToast("Please select a resume file or paste text", true);
    return;
  }

  const formData = new FormData();
  if (file) formData.append('resume', file);
  if (pasteText) formData.append('resumeText', pasteText);

  try {
    showToast("Deep parsing resume skills with AI...");
    const res = await fetch('/api/resume/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    if (res.success) {
      APP_STATE.user = res.user;
      APP_STATE.analysis = res.analysis;
      APP_STATE.roadmap = res.roadmap;
      APP_STATE.readiness = res.readiness;
      APP_STATE.jobs = res.jobs;
      renderAllViews();
      closeModal('modal-upload');
      showToast(res.message || "Resume parsed successfully! Skills & roadmap updated.");
    } else {
      showToast(res.error || "Failed to parse resume", true);
    }
  } catch (err) {
    showToast("Error processing resume", true);
  }
}

// Career Selector Modal
function openCareerSelectorModal() {
  const list = document.getElementById('career-targets-list');
  list.innerHTML = (APP_STATE.careers || []).map(c => `
    <div onclick="selectCareerGoal('${c.id}')" class="p-3.5 rounded-2xl border border-outline-variant/40 hover:border-primary hover:bg-primary-fixed/20 transition-all cursor-pointer flex justify-between items-center group">
      <div>
        <h4 class="text-xs font-bold text-on-surface group-hover:text-primary">${c.title}</h4>
        <span class="text-[11px] text-on-surface-variant">${c.category} • ${c.targetTimeline}</span>
      </div>
      <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform text-lg">arrow_forward</span>
    </div>
  `).join('');
  openModal('modal-career-select');
}

async function selectCareerGoal(careerId) {
  try {
    showToast("Re-analyzing skills against target career...");
    const res = await fetch('/api/career-targets/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ careerId })
    }).then(r => r.json());

    if (res.success) {
      APP_STATE.user = res.user;
      APP_STATE.analysis = res.analysis;
      APP_STATE.roadmap = res.roadmap;
      APP_STATE.readiness = res.readiness;
      APP_STATE.jobs = res.jobs;
      renderAllViews();
      closeModal('modal-career-select');
      showToast(`Target goal switched to ${res.analysis.career.title}! Match score: ${res.analysis.overallMatchScore}%`);
    }
  } catch (err) {
    showToast("Error updating career goal", true);
  }
}

// Landing Page & Authentication Navigation
function showAuthLanding() {
  document.getElementById('landing-auth-view').classList.remove('hidden');
  const platform = document.getElementById('main-platform-layout');
  platform.classList.add('hidden');
  platform.classList.remove('flex');

  // Header controls when logged out
  document.getElementById('header-upload-btn')?.classList.add('hidden');
  document.getElementById('header-upload-btn')?.classList.remove('flex');
  document.getElementById('header-readiness-chip')?.classList.add('hidden');
  document.getElementById('header-readiness-chip')?.classList.remove('flex');
  document.getElementById('header-logout-btn')?.classList.add('hidden');
  document.getElementById('header-login-btn')?.classList.remove('hidden');
}

function showPlatformDashboard() {
  document.getElementById('landing-auth-view').classList.add('hidden');
  const platform = document.getElementById('main-platform-layout');
  platform.classList.remove('hidden');
  platform.classList.add('flex');

  // Header controls when logged in
  document.getElementById('header-upload-btn')?.classList.remove('hidden');
  document.getElementById('header-upload-btn')?.classList.add('flex');
  document.getElementById('header-readiness-chip')?.classList.remove('hidden');
  document.getElementById('header-readiness-chip')?.classList.add('flex');
  document.getElementById('header-logout-btn')?.classList.remove('hidden');
  document.getElementById('header-login-btn')?.classList.add('hidden');

  renderAllViews();
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById('auth-tab-login');
  const regTab = document.getElementById('auth-tab-register');
  const loginForm = document.getElementById('form-landing-login');
  const regForm = document.getElementById('form-landing-register');

  if (tab === 'login') {
    loginTab.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs";
    regTab.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all text-on-surface-variant hover:text-on-surface";
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
  } else {
    regTab.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs";
    loginTab.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all text-on-surface-variant hover:text-on-surface";
    regForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

async function handleLandingLogin(e) {
  e.preventDefault();
  const email = document.getElementById('landing-login-email').value.trim();
  const password = document.getElementById('landing-login-password').value;

  if (!email) return;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(r => r.json());

    if (res.success) {
      localStorage.setItem('careerjourney_authenticated', 'true');
      APP_STATE.user = res.user;
      APP_STATE.analysis = res.analysis;
      APP_STATE.roadmap = res.roadmap;
      APP_STATE.readiness = res.readiness;
      APP_STATE.jobs = res.jobs;

      showPlatformDashboard();
      showToast(`Welcome to CareerJourney AI, ${res.user.name}!`);
    } else {
      showToast(res.error || "Login failed", true);
    }
  } catch (err) {
    showToast("Server connection error during login", true);
  }
}

async function handleLandingRegister(e) {
  e.preventDefault();
  const name = document.getElementById('landing-reg-name').value.trim();
  const college = document.getElementById('landing-reg-college').value.trim();
  const email = document.getElementById('landing-reg-email').value.trim();
  const password = document.getElementById('landing-reg-password').value;

  if (!name || !email) {
    showToast("Please enter your name and email", true);
    return;
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, college, email, password })
    }).then(r => r.json());

    if (res.success) {
      localStorage.setItem('careerjourney_authenticated', 'true');
      APP_STATE.user = res.user;
      APP_STATE.analysis = res.analysis;
      APP_STATE.roadmap = res.roadmap;
      APP_STATE.readiness = res.readiness;
      APP_STATE.jobs = res.jobs;

      showPlatformDashboard();
      showToast(`Account created! Welcome, ${res.user.name}!`);
    } else {
      showToast(res.error || "Registration failed", true);
    }
  } catch (err) {
    showToast("Registration error", true);
  }
}

async function loginAsDemoUser() {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "rahul.sharma@college.edu",
        password: "password123"
      })
    }).then(r => r.json());

    if (res.success) {
      localStorage.setItem('careerjourney_authenticated', 'true');
      APP_STATE.user = res.user;
      APP_STATE.analysis = res.analysis;
      APP_STATE.roadmap = res.roadmap;
      APP_STATE.readiness = res.readiness;
      APP_STATE.jobs = res.jobs;

      showPlatformDashboard();
      showToast(`Logged in as Rahul Sharma (Demo Account)!`);
    }
  } catch (err) {
    showToast("Demo login error", true);
  }
}

async function loginWithGoogle() {
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: {
          name: "Aaditya Singh",
          email: "aaditya.tech@gmail.com",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
        }
      })
    }).then(r => r.json());

    if (res.success) {
      localStorage.setItem('careerjourney_authenticated', 'true');
      APP_STATE.user = res.user;
      APP_STATE.analysis = res.analysis;
      APP_STATE.roadmap = res.roadmap;
      APP_STATE.readiness = res.readiness;
      APP_STATE.jobs = res.jobs;

      showPlatformDashboard();
      showToast(`Signed in with Google as ${res.user.name}!`);
    }
  } catch (err) {
    showToast("Google sign in error", true);
  }
}

// Open Auth Modal (Fallback for quick switch)
function openAuthModal() {
  showAuthLanding();
}

async function logout() {
  try {
    localStorage.removeItem('careerjourney_authenticated');
    await fetch('/api/auth/logout', { method: 'POST' });
    showToast("Logged out successfully");
    showAuthLanding();
  } catch (err) {
    console.error(err);
    showAuthLanding();
  }
}

// Assessment Modal
function startAssessment(assessmentId) {
  const assessment = (APP_STATE.assessments || []).find(a => a.id === assessmentId);
  if (!assessment) return;

  APP_STATE.activeAssessmentId = assessmentId;
  document.getElementById('quiz-title').textContent = assessment.title;
  document.getElementById('quiz-badge').textContent = `${assessment.questionCount} Questions • ${assessment.difficulty}`;

  const container = document.getElementById('quiz-container');
  container.innerHTML = assessment.questions.map((q, idx) => `
    <div class="bg-surface p-3.5 rounded-2xl border border-black/5 space-y-2.5">
      <p class="text-xs font-bold text-on-surface"><span class="text-primary font-black">Q${idx + 1}.</span> ${q.question}</p>
      <div class="space-y-1.5">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-2.5 p-2 rounded-xl border border-outline-variant/20 hover:bg-white transition-colors cursor-pointer text-xs">
            <input type="radio" name="question_${q.id}" value="${optIdx}" class="text-primary focus:ring-primary w-3.5 h-3.5"/>
            <span class="text-on-surface">${opt}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  openModal('modal-assessment');
}

async function submitAssessmentAnswers() {
  const assessment = (APP_STATE.assessments || []).find(a => a.id === APP_STATE.activeAssessmentId);
  if (!assessment) return;

  const answers = {};
  assessment.questions.forEach(q => {
    const selected = document.querySelector(`input[name="question_${q.id}"]:checked`);
    if (selected) answers[q.id] = parseInt(selected.value);
  });

  if (Object.keys(answers).length < assessment.questions.length) {
    showToast("Please answer all questions before submitting", true);
    return;
  }

  try {
    const res = await fetch(`/api/assessments/${assessment.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    }).then(r => r.json());

    if (res.success) {
      closeModal('modal-assessment');
      showToast(`Assessment completed! Score: ${res.result.score}%. Badge verified.`);
      await loadInitialData();
      renderAllViews();
    }
  } catch (err) {
    showToast("Failed to submit assessment", true);
  }
}

// LeetCode-Style Fullscreen Coding Workspace Handlers
function openCodingModal(challengeId) {
  const challenge = (APP_STATE.codingChallenges || []).find(c => c.id === challengeId) || (APP_STATE.codingChallenges || [])[0];
  if (!challenge) return;

  APP_STATE.activeChallengeId = challengeId;
  APP_STATE.currentLanguage = APP_STATE.currentLanguage || 'javascript';

  // Title, Difficulty & Metadata
  document.getElementById('coding-modal-title').textContent = challenge.title;
  const diffEl = document.getElementById('coding-modal-diff');
  diffEl.textContent = challenge.difficulty;
  if (challenge.difficulty === 'Easy') diffEl.className = "text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
  else if (challenge.difficulty === 'Medium') diffEl.className = "text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30";
  else diffEl.className = "text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30";

  document.getElementById('coding-topic-badge').textContent = challenge.topic || 'Data Structures';
  document.getElementById('coding-acceptance-rate').textContent = `Acceptance: ${challenge.acceptance || '58.4%'}`;
  document.getElementById('coding-modal-desc').textContent = challenge.description;

  // Examples
  const exContainer = document.getElementById('coding-examples-container');
  if (challenge.examples && challenge.examples.length > 0) {
    exContainer.innerHTML = challenge.examples.map((ex, idx) => `
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
        <span class="font-bold text-slate-200 block">Example ${idx + 1}:</span>
        <p class="font-mono text-slate-300"><span class="text-slate-500">Input:</span> ${ex.input}</p>
        <p class="font-mono text-slate-300"><span class="text-slate-500">Output:</span> ${ex.output}</p>
        ${ex.explanation ? `<p class="text-slate-400 text-[11px] pt-1"><span class="text-slate-500">Explanation:</span> ${ex.explanation}</p>` : ''}
      </div>
    `).join('');
  } else {
    exContainer.innerHTML = `<p class="text-xs text-slate-500 italic">See problem description above.</p>`;
  }

  // Constraints
  const constList = document.getElementById('coding-constraints-list');
  if (challenge.constraints && challenge.constraints.length > 0) {
    constList.innerHTML = challenge.constraints.map(c => `<li>${c}</li>`).join('');
  } else {
    constList.innerHTML = `<li>Standard memory and execution limits apply.</li>`;
  }

  // Language & Starter Code
  const langSelect = document.getElementById('coding-lang-select');
  if (langSelect) langSelect.value = APP_STATE.currentLanguage;
  setStarterCodeForCurrentLanguage();

  // Reset Console
  document.getElementById('coding-run-status').textContent = "Ready to execute";
  document.getElementById('coding-test-results').innerHTML = `<div class="text-slate-500 italic">Click "Run Code" or "Submit Solution" to evaluate test cases against the sandbox runner.</div>`;

  openModal('modal-coding');
}

function handleLanguageChange(lang) {
  APP_STATE.currentLanguage = lang;
  setStarterCodeForCurrentLanguage();
  showToast(`Switched editor to ${lang.toUpperCase()}`);
}

function setStarterCodeForCurrentLanguage() {
  const challenge = (APP_STATE.codingChallenges || []).find(c => c.id === APP_STATE.activeChallengeId);
  if (!challenge) return;

  const lang = APP_STATE.currentLanguage || 'javascript';
  const tabLabel = document.getElementById('coding-editor-tab-label');
  const extensions = { javascript: 'Solution.js', python: 'solution.py', cpp: 'solution.cpp', java: 'Solution.java' };
  if (tabLabel) tabLabel.textContent = extensions[lang] || 'Solution.code';

  const codeInput = document.getElementById('coding-code-input');
  if (challenge.starters && challenge.starters[lang]) {
    codeInput.value = challenge.starters[lang];
  } else if (challenge.starterCode) {
    codeInput.value = challenge.starterCode;
  } else {
    codeInput.value = `// Write your ${lang} solution here`;
  }
}

function resetStarterCode() {
  setStarterCodeForCurrentLanguage();
  showToast("Code reset to original starter template");
}

async function executeCodeChallenge(isSubmit = false) {
  const challengeId = APP_STATE.activeChallengeId;
  const code = document.getElementById('coding-code-input').value;
  const language = APP_STATE.currentLanguage || 'javascript';

  const statusEl = document.getElementById('coding-run-status');
  statusEl.textContent = isSubmit ? "Submitting & evaluating..." : "Running test cases...";

  try {
    const startTime = performance.now();
    const res = await fetch(`/api/coding-practice/${challengeId}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    }).then(r => r.json());
    const duration = Math.round(performance.now() - startTime);

    const outList = document.getElementById('coding-test-results');

    if (res.success) {
      const results = res.result.testResults || [];
      const allPassed = res.result.allPassed;

      statusEl.innerHTML = allPassed
        ? `<span class="text-emerald-400 font-bold">✓ Accepted (${duration}ms)</span>`
        : `<span class="text-rose-400 font-bold">✗ Wrong Answer (${duration}ms)</span>`;

      outList.innerHTML = results.map(tr => `
        <div class="p-3 rounded-xl ${tr.passed ? 'bg-emerald-950/40 border border-emerald-800/40' : 'bg-rose-950/40 border border-rose-800/40'} space-y-1">
          <div class="flex justify-between items-center">
            <span class="font-bold ${tr.passed ? 'text-emerald-400' : 'text-rose-400'}">Case ${tr.testCaseIndex}</span>
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded ${tr.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}">${tr.passed ? 'PASSED' : 'FAILED'}</span>
          </div>
          <div class="text-[11px] text-slate-300 font-mono">
            <div><span class="text-slate-500">Input:</span> ${tr.input}</div>
            <div><span class="text-slate-500">Expected:</span> <span class="text-emerald-300">${tr.expected}</span></div>
            <div><span class="text-slate-500">Actual:</span> <span class="${tr.passed ? 'text-emerald-300' : 'text-rose-300'}">${tr.actual}</span></div>
          </div>
        </div>
      `).join('');

      if (allPassed) {
        showToast(isSubmit ? "🎉 Solution Accepted! Challenge Solved." : "✓ All Test Cases Passed!");
        await loadInitialData();
        renderAllViews();
      } else {
        showToast("Some test cases failed. Review test output below.", true);
      }
    }
  } catch (err) {
    statusEl.textContent = "Execution Error";
    showToast("Execution error in sandbox runner", true);
  }
}

// Mock Interview Modal
async function openInterviewModal() {
  document.getElementById('interview-feedback-box').classList.add('hidden');
  document.getElementById('interview-answer-input').value = "";
  await generateNextQuestion();
  openModal('modal-interview');
}

async function generateNextQuestion() {
  try {
    const res = await fetch('/api/mock-interviews/generate-question').then(r => r.json());
    if (res.success && res.question) {
      document.getElementById('interview-badge').textContent = `${res.question.category} (${res.question.topic})`;
      document.getElementById('interview-question-text').textContent = `"${res.question.question}"`;
      document.getElementById('interview-feedback-box').classList.add('hidden');
      document.getElementById('interview-answer-input').value = "";
    }
  } catch (err) {
    console.error(err);
  }
}

async function submitInterviewAnswer() {
  const candidateAnswer = document.getElementById('interview-answer-input').value.trim();
  const question = document.getElementById('interview-question-text').textContent.trim();

  if (!candidateAnswer) {
    showToast("Please provide or speak your response first", true);
    return;
  }

  try {
    showToast("Evaluating your response with AI rubric...");
    const res = await fetch('/api/mock-interviews/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interviewType: "Tech Screen Evaluation",
        question,
        candidateAnswer
      })
    }).then(r => r.json());

    if (res.success) {
      const fb = res.feedback;
      const box = document.getElementById('interview-feedback-box');
      box.classList.remove('hidden');

      document.getElementById('interview-score-chip').textContent = `Score: ${fb.score} / 10`;
      document.getElementById('interview-summary-text').textContent = fb.feedback;
      document.getElementById('interview-strengths').innerHTML = fb.strengths.map(s => `<li>${s}</li>`).join('');
      document.getElementById('interview-improvements').innerHTML = fb.improvements.map(i => `<li>${i}</li>`).join('');

      showToast(`Evaluation complete! Score: ${fb.score} / 10`);
      await loadInitialData();
      renderAllViews();
    }
  } catch (err) {
    showToast("Error generating feedback", true);
  }
}
