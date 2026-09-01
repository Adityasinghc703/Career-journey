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
  activeAssessmentId: null,
  activeChallengeId: null,
  selectedFile: null,
  isRecording: false,
  recognition: null
};

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  initSpeechRecognition();
  await loadInitialData();
  renderAllViews();
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
    const [userRes, careersRes, analysisRes, roadmapRes, readinessRes, assessRes, codeRes, jobsRes] = await Promise.all([
      fetch('/api/user').then(r => r.json()),
      fetch('/api/career-targets').then(r => r.json()),
      fetch('/api/skill-analysis').then(r => r.json()),
      fetch('/api/roadmap').then(r => r.json()),
      fetch('/api/readiness-score').then(r => r.json()),
      fetch('/api/assessments').then(r => r.json()),
      fetch('/api/coding-practice').then(r => r.json()),
      fetch('/api/jobs').then(r => r.json())
    ]);

    if (userRes.success) APP_STATE.user = userRes.user;
    if (careersRes.success) APP_STATE.careers = careersRes.careers;
    if (analysisRes.success) APP_STATE.analysis = analysisRes.analysis;
    if (roadmapRes.success) APP_STATE.roadmap = roadmapRes.roadmap;
    if (readinessRes.success) APP_STATE.readiness = readinessRes.readiness;
    if (assessRes.success) APP_STATE.assessments = assessRes.assessments;
    if (codeRes.success) APP_STATE.codingChallenges = codeRes.codingChallenges;
    if (jobsRes.success) APP_STATE.jobs = jobsRes.jobs;

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
// VIEW 4: ASSESSMENTS & PRACTICE
// ========================================================
function renderAssessmentsView() {
  const user = APP_STATE.user || {};
  document.getElementById('assess-badges-row').innerHTML = (user.badges || []).map(b => `
    <div class="min-w-[120px] p-3 bg-surface rounded-2xl border border-black/5 flex flex-col items-center text-center shadow-xs shrink-0">
      <div class="w-9 h-9 bg-${b.color}-fixed text-${b.color} rounded-full flex items-center justify-center mb-1.5 font-bold">
        <span class="material-symbols-outlined text-base">${b.icon}</span>
      </div>
      <span class="text-xs font-bold text-on-surface">${b.title}</span>
      <span class="text-[10px] text-on-surface-variant font-semibold">${b.rank}</span>
    </div>
  `).join('');

  document.getElementById('assessments-list').innerHTML = (APP_STATE.assessments || []).map(a => `
    <div class="p-4 rounded-2xl bg-white border border-black/5 shadow-xs space-y-2">
      <div class="flex justify-between items-start">
        <h4 class="text-xs font-bold text-on-surface">${a.title}</h4>
        <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full ${a.completed ? 'bg-green-100 text-green-800' : 'bg-primary-fixed text-primary'}">
          ${a.completed ? `Score: ${a.score}%` : a.difficulty}
        </span>
      </div>
      <p class="text-[11px] text-on-surface-variant leading-relaxed">${a.description}</p>
      <div class="flex justify-between items-center pt-2 border-t border-black/5">
        <span class="text-[10px] text-outline flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px]">schedule</span> ${a.duration} • ${a.questionCount} Questions
        </span>
        <button onclick="startAssessment('${a.id}')" class="text-xs font-bold text-primary hover:underline flex items-center gap-1">
          ${a.completed ? 'Retake' : 'Start'} <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  `).join('');

  document.getElementById('interview-history-list').innerHTML = (APP_STATE.mockInterviews || []).slice(0, 2).map(m => `
    <div class="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-black/5">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center text-sm font-bold">
          <span class="material-symbols-outlined text-base">psychology</span>
        </div>
        <div>
          <span class="text-xs font-bold text-on-surface block">${m.title}</span>
          <span class="text-[10px] text-on-surface-variant">${m.date} • Score: ${m.score} / 10</span>
        </div>
      </div>
      <button onclick="openInterviewModal()" class="text-xs font-bold text-primary hover:underline">Launch</button>
    </div>
  `).join('');

  renderCodingChallengesTable(APP_STATE.codingChallenges || []);
}

function renderCodingChallengesTable(challenges) {
  const tbody = document.getElementById('coding-table-body');
  tbody.innerHTML = challenges.map(c => {
    let statusIcon = "circle";
    let statusClass = "text-outline";
    if (c.status === "Solved") {
      statusIcon = "check_circle";
      statusClass = "text-green-600";
    }

    let diffClass = "bg-green-100 text-green-800";
    if (c.difficulty === "Medium") diffClass = "bg-amber-100 text-amber-800";
    if (c.difficulty === "Hard") diffClass = "bg-rose-100 text-rose-800";

    return `
      <tr class="border-b border-black/5 hover:bg-surface-container-low transition-colors">
        <td class="py-2.5 px-3">
          <span class="material-symbols-outlined text-base ${statusClass}">${statusIcon}</span>
        </td>
        <td class="py-2.5 px-3 font-bold text-on-surface">${c.title}</td>
        <td class="py-2.5 px-3 text-on-surface-variant font-medium">${c.topic}</td>
        <td class="py-2.5 px-3">
          <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full ${diffClass}">${c.difficulty}</span>
        </td>
        <td class="py-2.5 px-3 hidden md:table-cell text-on-surface-variant font-semibold">${c.acceptance || '60%'}</td>
        <td class="py-2.5 px-3 text-right">
          <button onclick="openCodingModal('${c.id}')" class="text-xs px-3 py-1 rounded-xl border border-primary/30 text-primary font-bold hover:bg-primary hover:text-white transition-all">
            ${c.status === "Solved" ? "Review" : "Solve"}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterCodingChallenges() {
  const filter = document.getElementById('coding-filter').value;
  if (filter === "All") {
    renderCodingChallengesTable(APP_STATE.codingChallenges || []);
  } else {
    const filtered = (APP_STATE.codingChallenges || []).filter(c => c.difficulty === filter);
    renderCodingChallengesTable(filtered);
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

// Auth Modal
function openAuthModal() {
  openModal('modal-auth');
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;

  if (!email) return;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(r => r.json());

    if (res.success) {
      APP_STATE.user = res.user;
      APP_STATE.analysis = res.analysis;
      APP_STATE.roadmap = res.roadmap;
      APP_STATE.readiness = res.readiness;
      APP_STATE.jobs = res.jobs;
      renderAllViews();
      closeModal('modal-auth');
      showToast(`Welcome back, ${res.user.name}!`);
    }
  } catch (err) {
    showToast("Login failed", true);
  }
}

async function logout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    showToast("Logged out successfully");
    await loadInitialData();
    renderAllViews();
  } catch (err) {
    console.error(err);
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
