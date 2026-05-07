/* ═══════════════════════════════════════════════════════
   LAUNCHPAD NYC — script.js
   Full interactivity for the youth career platform
═══════════════════════════════════════════════════════ */

'use strict';

/* ── State ─────────────────────────────────── */
const state = {
  user: null,
  savedJobs: [],
  appliedJobs: [],
  completedLessons: [],
  currentJobFilter: {},
  lukeOpen: false,
  lukeMessages: [],
  voiceActive: false,
  currentView: 'home',
  joinStep: 1,
  profileData: {},
  accentColor: '#7C3AED',
};

/* ── Data ──────────────────────────────────── */
const JOBS = [
  { id: 1,  emoji: '🏢', title: 'Junior Web Developer', company: 'TechStart NYC', type: 'Internship',  borough: 'Manhattan',   pay: '$22/hr',  tags: ['Tech', 'Beginner OK', 'Remote Flex'], industry: 'tech',       description: 'Build and maintain web apps using HTML, CSS, and JavaScript. Perfect for those starting their tech journey.' },
  { id: 2,  emoji: '🎨', title: 'Graphic Design Assistant', company: 'Creative Studio BK', type: 'Part-Time',  borough: 'Brooklyn',    pay: '$18/hr',  tags: ['Arts', 'Part-Time', 'On-Site'], industry: 'arts',       description: 'Support senior designers with layout, branding, and social media content for local clients.' },
  { id: 3,  emoji: '🏥', title: 'Medical Office Helper', company: 'NYC Health+Hospitals', type: 'Part-Time',  borough: 'Bronx',       pay: '$17/hr',  tags: ['Healthcare', 'Entry Level', 'Benefits'], industry: 'healthcare', description: 'Assist administrative staff with scheduling, filing, and patient check-in at a busy NYC clinic.' },
  { id: 4,  emoji: '🛍️', title: 'Retail Sales Associate', company: 'Urban Outfitters', type: 'Part-Time',  borough: 'Manhattan',   pay: '$16/hr',  tags: ['Retail', 'Flexible Hours', 'Employee Discount'], industry: 'retail',     description: 'Provide excellent customer service, stock shelves, and support daily store operations.' },
  { id: 5,  emoji: '🍕', title: 'Food Service Team Member', company: 'Shake Shack', type: 'Full-Time',  borough: 'Queens',      pay: '$17/hr',  tags: ['Food & Bev', 'No Experience', 'Tips'], industry: 'food',       description: 'Join a fast-paced food service team. Training provided. Great entry-level opportunity!' },
  { id: 6,  emoji: '💰', title: 'Finance Intern', company: 'Wall Street Prep', type: 'Internship',  borough: 'Manhattan',   pay: '$20/hr',  tags: ['Finance', 'Internship', 'Hybrid'], industry: 'finance',    description: 'Learn financial modeling, data analysis, and client reporting alongside industry professionals.' },
  { id: 7,  emoji: '🌱', title: 'Community Outreach Worker', company: 'BK GreenFuture', type: 'Seasonal',   borough: 'Brooklyn',    pay: '$15/hr',  tags: ['Nonprofit', 'Seasonal', 'Paid'], industry: 'nonprofit',  description: 'Connect residents with environmental programs, workshops, and community events.' },
  { id: 8,  emoji: '🏛️', title: 'Government Intern', company: 'NYC Mayor\'s Office', type: 'Internship',  borough: 'Manhattan',   pay: '$19/hr',  tags: ['Government', 'Internship', 'Stipend'], industry: 'gov',        description: 'Gain hands-on policy experience working with NYC government officials and departments.' },
  { id: 9,  emoji: '📱', title: 'Social Media Coordinator', company: 'Bronx Media Group', type: 'Part-Time',  borough: 'Bronx',       pay: '$18/hr',  tags: ['Arts', 'Creative', 'Remote OK'], industry: 'arts',       description: 'Manage Instagram, TikTok, and Twitter for local brands. Bring your creativity!' },
  { id: 10, emoji: '🔧', title: 'IT Support Technician', company: 'Queens Tech Solutions', type: 'Full-Time',  borough: 'Queens',      pay: '$21/hr',  tags: ['Tech', 'On-Site', 'Benefits'], industry: 'tech',       description: 'Troubleshoot hardware/software issues and support office staff with technical needs.' },
  { id: 11, emoji: '📚', title: 'Youth Tutor', company: 'MOUSE NYC', type: 'Part-Time',  borough: 'Staten Island', pay: '$16/hr',  tags: ['Education', 'Flexible', 'Rewarding'], industry: 'nonprofit',  description: 'Tutor K-12 students in math, science, and digital literacy after school.' },
  { id: 12, emoji: '💊', title: 'Pharmacy Tech Trainee', company: 'Duane Reade', type: 'Full-Time',  borough: 'Brooklyn',    pay: '$19/hr',  tags: ['Healthcare', 'Training Provided', 'Benefits'], industry: 'healthcare', description: 'Learn pharmacy operations while helping customers with prescriptions and OTC products.' },
];

const PROGRAMS = [
  { id: 1,  emoji: '💼', org: 'NYC Department of Youth', name: 'Summer Youth Employment Program (SYEP)', desc: 'The largest youth employment program in the country. Get paid to work and learn while exploring careers across NYC.', duration: '6 weeks', pay: 'Paid · Min Wage+', age: '14–24', deadline: 'Apply by Mar 15', spots: '75,000 spots' },
  { id: 2,  emoji: '🚀', org: 'NYC Tech Talent Pipeline', name: 'Tech Bootcamp Apprenticeship', desc: 'Free coding bootcamp followed by a paid apprenticeship at a NYC tech company. No prior experience required.', duration: '6 months', pay: '$25/hr during apprenticeship', age: '18–26', deadline: 'Rolling admissions', spots: '200 spots' },
  { id: 3,  emoji: '🏥', org: 'NYC Health+Hospitals', name: 'Healthcare Career Pathways', desc: 'Explore a career in healthcare through paid training, mentorship, and job placement at NYC public hospitals.', duration: '1 year', pay: 'Stipend + Full-Time placement', age: '17–24', deadline: 'Apply by Apr 1', spots: '500 spots' },
  { id: 4,  emoji: '🎭', org: 'NYC Cultural Institutions', name: 'Arts Internship Program', desc: 'Paid internships at museums, theaters, and galleries across all five boroughs. Perfect for creative minds.', duration: '3 months', pay: '$18/hr', age: '16–24', deadline: 'Apply by Feb 28', spots: '150 spots' },
  { id: 5,  emoji: '🌿', org: 'NYC Parks Department', name: 'GreenThumb Youth Workforce', desc: 'Work outdoors maintaining NYC parks, gardens, and green spaces while learning environmental stewardship.', duration: 'Seasonal', pay: '$16/hr', age: '14–21', deadline: 'Open now', spots: '1,200 spots' },
  { id: 6,  emoji: '🏗️', org: 'NYC Building Skills NY', name: 'Construction Trades Apprenticeship', desc: 'Learn the building trades through hands-on training and earn a union card. No experience needed.', duration: '2 years', pay: '$22/hr + Benefits', age: '18–25', deadline: 'Apply by May 31', spots: '300 spots' },
];

const LESSONS = [
  { id: 1,  emoji: '📄', category: 'resume',    title: 'Build Your First Resume', duration: '12 min', level: 'Beginner', points: 50,  desc: 'Create a standout resume even with no work experience. Learn what employers look for.' },
  { id: 2,  emoji: '🎤', category: 'interview', title: 'Ace Your First Interview', duration: '18 min', level: 'Beginner', points: 75,  desc: 'Master common interview questions, body language, and how to make a great first impression.' },
  { id: 3,  emoji: '💌', category: 'resume',    title: 'Write a Cover Letter That Works', duration: '10 min', level: 'Beginner', points: 40,  desc: 'Craft a compelling cover letter that gets you noticed, even without experience.' },
  { id: 4,  emoji: '👔', category: 'workplace', title: 'Workplace Professionalism 101', duration: '15 min', level: 'Beginner', points: 60,  desc: 'Learn what employers expect: punctuality, communication, dress code, and teamwork.' },
  { id: 5,  emoji: '💵', category: 'money',     title: 'Understanding Your First Paycheck', duration: '8 min',  level: 'Beginner', points: 30,  desc: 'Decode taxes, deductions, net vs. gross pay, and what to do with your earnings.' },
  { id: 6,  emoji: '💻', category: 'digital',   title: 'LinkedIn Profile Essentials', duration: '14 min', level: 'Beginner', points: 55,  desc: 'Build a professional LinkedIn profile that gets recruiters to come to you.' },
  { id: 7,  emoji: '🤝', category: 'workplace', title: 'Networking for Beginners', duration: '20 min', level: 'Intermediate', points: 80, desc: 'How to make connections, ask for help, and grow your professional network in NYC.' },
  { id: 8,  emoji: '📊', category: 'digital',   title: 'Google Workspace Basics', duration: '16 min', level: 'Beginner', points: 65,  desc: 'Master Docs, Sheets, and Slides — the tools every job uses.' },
  { id: 9,  emoji: '💰', category: 'money',     title: 'Budgeting on Your First Salary', duration: '12 min', level: 'Beginner', points: 45,  desc: 'Learn the 50/30/20 rule and start saving from your very first paycheck.' },
  { id: 10, emoji: '🎭', category: 'interview', title: 'Behavioral Interview Questions', duration: '22 min', level: 'Intermediate', points: 90, desc: 'Answer "Tell me about yourself" and STAR-format questions with confidence.' },
  { id: 11, emoji: '📧', category: 'workplace', title: 'Professional Email Writing', duration: '9 min',  level: 'Beginner', points: 35,  desc: 'Write clear, professional emails that make you look like a pro.' },
  { id: 12, emoji: '🔒', category: 'digital',   title: 'Cybersecurity at Work', duration: '11 min', level: 'Beginner', points: 40,  desc: 'Protect yourself and your employer with basic cybersecurity best practices.' },
];

const BADGES = [
  { id: 1,  emoji: '🚀', name: 'First Login',      earned: false },
  { id: 2,  emoji: '📄', name: 'Resume Ready',     earned: false },
  { id: 3,  emoji: '🎤', name: 'Interview Pro',    earned: false },
  { id: 4,  emoji: '💼', name: 'Applied!',         earned: false },
  { id: 5,  emoji: '⭐', name: '5 Lessons',        earned: false },
  { id: 6,  emoji: '🗽', name: 'NYC Explorer',     earned: false },
  { id: 7,  emoji: '💰', name: 'Money Smart',      earned: false },
  { id: 8,  emoji: '🤝', name: 'Networker',        earned: false },
  { id: 9,  emoji: '🔥', name: 'On a Streak',      earned: false },
  { id: 10, emoji: '🏆', name: 'Top Achiever',     earned: false },
  { id: 11, emoji: '🌟', name: 'Profile Complete', earned: false },
  { id: 12, emoji: '🎓', name: 'Grad Ready',       earned: false },
];

const READINESS_TRACKS = [
  { label: 'Resume & Cover Letter', pct: 20 },
  { label: 'Interview Skills',      pct: 10 },
  { label: 'Workplace Readiness',   pct: 15 },
  { label: 'Digital Skills',        pct: 30 },
  { label: 'Financial Literacy',    pct: 5  },
];

/* ── Luke AI Responses ──────────────────────── */
const LUKE_RESPONSES = {
  job: [
    "Great! Let me help you find a job. 🔍 Based on what I know, NYC has tons of entry-level opportunities. Head to the **Jobs & Internships** tab to browse by borough, pay, and type. What industry are you most interested in?",
    "Looking for work in NYC? Smart move! 🗽 Check out the **Jobs** tab and use the filters — you can sort by borough, pay rate, and job type. The Summer Youth Employment Program (SYEP) is also amazing if you're 14–24!",
  ],
  resume: [
    "Resume time! 📄 Even with zero experience, you can build a strong resume. Here's what to include:\n\n• **Contact info** at the top\n• **Skills** you already have (even from school!)\n• **Activities** like clubs, volunteer work, or hobbies\n• **Education** section\n\nCheck out our free **Resume Workshop** lesson in the Learning Center!",
    "Let's build that resume! 💪 The biggest mistake teens make is thinking they have 'nothing to put.' You always have something! Think about:\n\n• School projects you're proud of\n• Any volunteer or community work\n• Sports teams, clubs, or hobbies\n• Babysitting, yard work, or helping family\n\nAll of that counts. Want to start the Resume lesson?",
  ],
  interview: [
    "Interview prep — let's go! 🎤 The 3 most important things:\n\n1. **Research the company** before you go\n2. **Practice your 'Tell me about yourself'** out loud\n3. **Have 2 questions ready** to ask them\n\nThe biggest tip? Be yourself. Employers want to see your personality! Check out our Interview Ace lesson for practice questions.",
    "Nervous about interviews? Totally normal! 😅 Here's a secret: interviewers WANT you to succeed. Try the **STAR method** for answering questions:\n\n• **S**ituation\n• **T**ask\n• **A**ction\n• **R**esult\n\nHead to the Learning Center for our full interview prep lesson with practice questions!",
  ],
  lessons: [
    "Learning is the best investment! 🎓 I'd recommend starting with these based on your level:\n\n1. **Build Your First Resume** (12 min)\n2. **Ace Your First Interview** (18 min)\n3. **Workplace Professionalism 101** (15 min)\n\nEach lesson earns you points and badges. Head to the **Learning Center** to get started!",
    "Here are my top lesson picks for beginners:\n\n📄 **Resume Workshop** — even with no experience\n💌 **Cover Letter Writing** — short and easy\n💵 **Understanding Your Paycheck** — super useful\n\nComplete all three and you'll unlock the **Resume Ready** badge! 🏆",
  ],
  program: [
    "Programs are where it's AT! 🚀 The **Summer Youth Employment Program (SYEP)** is NYC's biggest — it pays you to work and you can get placed almost anywhere. Up to 75,000 spots! Applications usually open in January. Check the **Career Programs** tab for all current openings.",
    "Looking for structured career programs? Check out:\n\n🏥 **Healthcare Career Pathways** — great if you like helping people\n💻 **Tech Bootcamp Apprenticeship** — free coding training + paid job\n🌿 **GreenThumb Youth Workforce** — outdoor work in NYC parks\n\nAll are paid and have no experience requirements!",
  ],
  nyc: [
    "NYC is full of opportunities for young workers! 🗽 Some key things to know:\n\n• Minimum wage is **$16/hr** in NYC\n• Workers 14–17 need **working papers** from their school\n• The city runs free programs for youth through DYCD\n• Many subway lines have free/reduced fare for students\n\nAnything specific about working in NYC I can help with?",
  ],
  default: [
    "That's a great question! I'm still learning more about that topic. In the meantime, check out our **Resources** tab — there's a ton of helpful info there. Or feel free to ask me about jobs, resume help, or interview prep!",
    "Interesting! I want to make sure I give you the best answer. Could you tell me more? Are you looking for job search help, resume advice, interview tips, or something else?",
    "I hear you! Let me point you in the right direction. The best places to start on LaunchPad are:\n\n🔍 **Jobs tab** — for finding work\n📚 **Learning Center** — for building skills\n🎯 **Career Programs** — for structured opportunities\n\nWhat would you like to explore?",
  ],
};

/* ── Helpers ───────────────────────────────── */
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function showToast(msg, type = 'info', duration = 3500) {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.info}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function openModal(id) {
  const el = $(`#${id}`);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  const el = $(`#${id}`);
  if (el) el.classList.remove('open');
}

function setView(viewId) {
  $$('.view').forEach(v => v.classList.remove('active'));
  const target = $(`#view-${viewId}`);
  if (target) {
    target.classList.add('active');
    state.currentView = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav active state
  $$('.nav-link, .mobile-nav-link').forEach(a => a.classList.remove('active'));
}

function getLukeReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('job') || lower.includes('work') || lower.includes('hire') || lower.includes('employ')) return randomFrom(LUKE_RESPONSES.job);
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('application')) return randomFrom(LUKE_RESPONSES.resume);
  if (lower.includes('interview') || lower.includes('prep') || lower.includes('practice')) return randomFrom(LUKE_RESPONSES.interview);
  if (lower.includes('lesson') || lower.includes('learn') || lower.includes('course') || lower.includes('skill')) return randomFrom(LUKE_RESPONSES.lessons);
  if (lower.includes('program') || lower.includes('internship') || lower.includes('apprentice') || lower.includes('syep')) return randomFrom(LUKE_RESPONSES.program);
  if (lower.includes('nyc') || lower.includes('new york') || lower.includes('city') || lower.includes('borough')) return randomFrom(LUKE_RESPONSES.nyc);
  return randomFrom(LUKE_RESPONSES.default);
}

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function parseLukeMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

/* ── Loader ────────────────────────────────── */
function initLoader() {
  const loader = $('#loader');
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 600);
  }, 1800);
}

/* ── Header Scroll ──────────────────────────── */
function initHeader() {
  const header = $('#header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ── Theme Toggle ───────────────────────────── */
function initTheme() {
  const toggle = $('#themeToggle');
  const darkCheck = $('#darkModeCheck');
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (darkCheck) darkCheck.checked = (theme === 'dark');
    localStorage.setItem('lp-theme', theme);
  }

  // Load saved theme
  const saved = localStorage.getItem('lp-theme') || 'dark';
  applyTheme(saved);

  toggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  darkCheck?.addEventListener('change', () => {
    applyTheme(darkCheck.checked ? 'dark' : 'light');
  });
}

/* ── Navigation ─────────────────────────────── */
function initNavigation() {
  // Any element with data-view navigates
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-view]');
    if (el) {
      e.preventDefault();
      setView(el.dataset.view);
    }
  });

  // Mobile menu
  const mobileMenuBtn = $('#mobileMenuBtn');
  const mobileNav = $('#mobileNav');
  mobileMenuBtn?.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Logo → home
  $('#logoBtn')?.addEventListener('click', (e) => { e.preventDefault(); setView('home'); });

  // Sign In button
  $('#signInBtn')?.addEventListener('click', () => openModal('signInModal'));
  $('#mobileSignIn')?.addEventListener('click', () => openModal('signInModal'));

  // Join buttons
  ['joinBtn', 'mobileJoin', 'heroJoinBtn', 'lukeBannerBtn'].forEach(id => {
    $(`#${id}`)?.addEventListener('click', () => openModal('joinModal'));
  });

  // Modal close buttons
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) closeModal(closeBtn.dataset.close);

    // Click outside modal
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('open');
    }
  });
}

/* ── Global Search ──────────────────────────── */
function initSearch() {
  const input = $('#globalSearch');
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      setView('jobs');
      const jobSearch = $('#jobSearch');
      if (jobSearch) {
        jobSearch.value = input.value;
        filterJobs();
      }
      input.value = '';
    }
  });
}

/* ── Render Jobs ────────────────────────────── */
function renderJobCard(job, mode = 'grid') {
  const isSaved = state.savedJobs.includes(job.id);
  const isApplied = state.appliedJobs.includes(job.id);
  return `
    <div class="job-card ${mode === 'list' ? 'list-style' : ''}" data-job-id="${job.id}">
      <div class="job-card-header">
        <div class="job-company-logo">${job.emoji}</div>
        <div class="job-card-info">
          <div class="job-title">${job.title}</div>
          <div class="job-company">${job.company}</div>
        </div>
        <button class="job-save-btn ${isSaved ? 'saved' : ''}" data-save-job="${job.id}" title="${isSaved ? 'Unsave' : 'Save job'}">
          <i data-lucide="${isSaved ? 'bookmark' : 'bookmark'}"></i>
          ${isSaved ? '🔖' : '🏷️'}
        </button>
      </div>
      <div class="job-tags">
        <span class="job-tag highlight">${job.type}</span>
        ${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
      </div>
      <div class="job-footer">
        <span class="job-pay">${job.pay}</span>
        <span class="job-location">📍 ${job.borough}</span>
        ${isApplied ? '<span class="job-tag" style="color:var(--success);background:rgba(16,185,129,0.1)">✓ Applied</span>' : ''}
      </div>
    </div>`;
}

function renderProgram(prog) {
  return `
    <div class="program-card" data-prog-id="${prog.id}">
      <div class="program-card-header">
        <div class="program-icon">${prog.emoji}</div>
        <div>
          <div class="program-org">${prog.org}</div>
          <div class="program-name">${prog.name}</div>
        </div>
      </div>
      <div class="program-card-body">
        <p class="program-desc">${prog.desc}</p>
        <div class="program-meta">
          <div class="program-meta-item">⏱ ${prog.duration}</div>
          <div class="program-meta-item">💰 ${prog.pay}</div>
          <div class="program-meta-item">🎂 Ages ${prog.age}</div>
          <div class="program-meta-item">👥 ${prog.spots}</div>
        </div>
      </div>
      <div class="program-footer">
        <span class="program-deadline">⏰ ${prog.deadline}</span>
        <button class="btn btn-primary btn-sm" data-apply-prog="${prog.id}">Apply Now</button>
      </div>
    </div>`;
}

function renderLesson(lesson, compact = false) {
  const done = state.completedLessons.includes(lesson.id);
  return `
    <div class="lesson-card" data-lesson-id="${lesson.id}">
      <div class="lesson-thumb">
        ${lesson.emoji}
        <span class="lesson-thumb-badge">${lesson.duration}</span>
        ${done ? '<span class="lesson-thumb-badge" style="left:10px;right:auto;background:var(--success)">✓ Done</span>' : ''}
      </div>
      <div class="lesson-card-body">
        <div class="lesson-category">${lesson.category.toUpperCase()}</div>
        <div class="lesson-name">${lesson.title}</div>
        <div class="lesson-meta">
          <span>⚡ ${lesson.level}</span>
          <span>🏅 +${lesson.points} pts</span>
        </div>
        <div class="lesson-progress-bar">
          <div class="lesson-progress-fill" style="width:${done ? '100' : '0'}%"></div>
        </div>
      </div>
    </div>`;
}

/* ── Jobs View ──────────────────────────────── */
function initJobsView() {
  // Featured
  const featuredEl = $('#featuredJobs');
  if (featuredEl) {
    featuredEl.innerHTML = JOBS.slice(0, 6).map(j => renderJobCard(j)).join('');
    lucide.createIcons({ attrs: { width: 18, height: 18 } });
  }

  // All Jobs
  renderAllJobs(JOBS);

  // Filters
  $('#applyFilters')?.addEventListener('click', filterJobs);
  $('#jobSearch')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') filterJobs(); });

  // Category filter from home
  $$('.cat-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      $$('.cat-card').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      setView('jobs');
      renderAllJobs(JOBS.filter(j => j.industry === filter));
    });
  });
}

function filterJobs() {
  const search  = $('#jobSearch')?.value.toLowerCase() || '';
  const type    = $('#jobType')?.value || '';
  const borough = $('#jobBorough')?.value || '';
  const pay     = $('#jobPay')?.value || '';

  let filtered = JOBS.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search) || j.company.toLowerCase().includes(search) || j.tags.some(t => t.toLowerCase().includes(search));
    const matchType   = !type    || j.type === type;
    const matchBoro   = !borough || j.borough === borough;
    const matchPay    = !pay     || matchPayFilter(j.pay, pay);
    return matchSearch && matchType && matchBoro && matchPay;
  });

  renderAllJobs(filtered);
}

function matchPayFilter(payStr, filter) {
  const num = parseInt(payStr.replace(/\D/g, '')) || 0;
  if (filter === '$15–$18/hr') return num >= 15 && num <= 18;
  if (filter === '$18–$22/hr') return num > 18 && num <= 22;
  if (filter === '$22+/hr')    return num > 22;
  return true;
}

function renderAllJobs(jobs) {
  const el = $('#allJobs');
  if (!el) return;
  if (jobs.length === 0) {
    el.innerHTML = '<p class="empty-state">No jobs match your filters. Try adjusting your search!</p>';
    return;
  }
  el.innerHTML = jobs.map(j => renderJobCard(j, 'list')).join('');
  lucide.createIcons();
  initJobInteractions();
}

function initJobInteractions() {
  // Job card click → modal
  $$('.job-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.job-save-btn')) return;
      const id = parseInt(card.dataset.jobId);
      const job = JOBS.find(j => j.id === id);
      if (job) openJobModal(job);
    });
  });

  // Save buttons
  document.querySelectorAll('[data-save-job]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.saveJob);
      toggleSaveJob(id);
    });
  });
}

function openJobModal(job) {
  const isSaved   = state.savedJobs.includes(job.id);
  const isApplied = state.appliedJobs.includes(job.id);
  const content = `
    <div style="padding:8px 0">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
        <div class="job-company-logo" style="width:64px;height:64px;font-size:2rem;border-radius:16px">${job.emoji}</div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;margin-bottom:4px">${job.title}</h2>
          <div style="color:var(--text-secondary)">${job.company} · ${job.borough}</div>
        </div>
      </div>
      <div class="job-tags" style="margin-bottom:20px">
        <span class="job-tag highlight">${job.type}</span>
        ${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
      </div>
      <div style="margin-bottom:20px">
        <h3 style="font-weight:700;margin-bottom:8px">About This Role</h3>
        <p style="color:var(--text-secondary);line-height:1.7">${job.desc}</p>
      </div>
      <div style="display:flex;gap:20px;margin-bottom:24px;padding:16px;background:var(--bg-elevated);border-radius:var(--radius)">
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Pay</div><div style="font-weight:700;color:var(--success)">${job.pay}</div></div>
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Type</div><div style="font-weight:700">${job.type}</div></div>
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Location</div><div style="font-weight:700">${job.borough}</div></div>
      </div>
      <div style="display:flex;gap:12px">
        <button class="btn btn-primary btn-lg" style="flex:1;justify-content:center" id="applyJobBtn" data-job-id="${job.id}" ${isApplied ? 'disabled style="opacity:0.6"' : ''}>
          ${isApplied ? '✓ Applied!' : '🚀 Apply Now'}
        </button>
        <button class="btn btn-ghost" id="saveJobModalBtn" data-job-id="${job.id}">
          ${isSaved ? '🔖 Saved' : '🏷️ Save'}
        </button>
      </div>
    </div>`;
  $('#jobModalContent').innerHTML = content;
  openModal('jobModal');

  $('#applyJobBtn')?.addEventListener('click', () => {
    const id = parseInt($('#applyJobBtn').dataset.jobId);
    if (!state.appliedJobs.includes(id)) {
      state.appliedJobs.push(id);
      updateDashboardStats();
      showToast('Application submitted! Good luck! 🚀', 'success');
      closeModal('jobModal');
      renderAllJobs(JOBS);
      renderFeaturedJobs();
    }
  });

  $('#saveJobModalBtn')?.addEventListener('click', () => {
    const id = parseInt($('#saveJobModalBtn').dataset.jobId);
    toggleSaveJob(id);
    closeModal('jobModal');
  });
}

function toggleSaveJob(id) {
  const idx = state.savedJobs.indexOf(id);
  if (idx === -1) {
    state.savedJobs.push(id);
    showToast('Job saved! ✨', 'success');
  } else {
    state.savedJobs.splice(idx, 1);
    showToast('Job removed from saved.', 'info');
  }
  updateDashboardStats();
  renderAllJobs(JOBS);
  renderFeaturedJobs();
}

function renderFeaturedJobs() {
  const el = $('#featuredJobs');
  if (el) {
    el.innerHTML = JOBS.slice(0, 6).map(j => renderJobCard(j)).join('');
    lucide.createIcons();
    initJobInteractions();
  }
}

/* ── Programs View ──────────────────────────── */
function initProgramsView() {
  const featuredEl = $('#featuredPrograms');
  if (featuredEl) {
    featuredEl.innerHTML = PROGRAMS.slice(0, 3).map(p => renderProgram(p)).join('');
  }

  const allEl = $('#allPrograms');
  if (allEl) {
    allEl.innerHTML = PROGRAMS.map(p => renderProgram(p)).join('');
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-apply-prog]');
    if (btn) {
      showToast('Redirecting to program application... 🚀', 'info');
    }
  });
}

/* ── Lessons View ───────────────────────────── */
function initLessonsView() {
  const featuredEl = $('#featuredLessons');
  if (featuredEl) {
    featuredEl.innerHTML = LESSONS.slice(0, 5).map(l => renderLesson(l)).join('');
  }

  renderAllLessons('all');

  // Category filter tabs
  $$('.lesson-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.lesson-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAllLessons(btn.dataset.lcat);
    });
  });

  // Lesson click → modal
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.lesson-card');
    if (card) {
      const id = parseInt(card.dataset.lessonId);
      const lesson = LESSONS.find(l => l.id === id);
      if (lesson) openLessonModal(lesson);
    }
  });
}

function renderAllLessons(cat) {
  const el = $('#allLessons');
  if (!el) return;
  const filtered = cat === 'all' ? LESSONS : LESSONS.filter(l => l.category === cat);
  el.innerHTML = filtered.map(l => renderLesson(l)).join('');
}

function openLessonModal(lesson) {
  const done = state.completedLessons.includes(lesson.id);
  const content = `
    <div style="padding:8px 0">
      <div style="font-size:4rem;text-align:center;margin-bottom:16px">${lesson.emoji}</div>
      <div class="lesson-category" style="text-align:center;margin-bottom:8px">${lesson.category.toUpperCase()}</div>
      <h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:800;text-align:center;margin-bottom:8px">${lesson.title}</h2>
      <div style="display:flex;justify-content:center;gap:16px;margin-bottom:20px;font-size:0.85rem;color:var(--text-muted)">
        <span>⏱ ${lesson.duration}</span>
        <span>⚡ ${lesson.level}</span>
        <span>🏅 +${lesson.points} pts</span>
      </div>
      <p style="color:var(--text-secondary);line-height:1.7;text-align:center;margin-bottom:28px">${lesson.desc}</p>
      ${done
        ? '<div style="text-align:center;color:var(--success);font-weight:700;font-size:1.1rem;margin-bottom:20px">✅ You\'ve completed this lesson!</div>'
        : ''}
      <button class="btn btn-primary btn-full btn-lg" id="startLessonBtn" data-lesson-id="${lesson.id}" ${done ? 'disabled style="opacity:0.6"' : ''}>
        ${done ? '✓ Completed' : '▶ Start Lesson'}
      </button>
    </div>`;
  $('#lessonModalContent').innerHTML = content;
  openModal('lessonModal');

  $('#startLessonBtn')?.addEventListener('click', () => {
    const id = parseInt($('#startLessonBtn').dataset.lessonId);
    completeLesson(id);
  });
}

function completeLesson(id) {
  if (!state.completedLessons.includes(id)) {
    state.completedLessons.push(id);
    showToast('Lesson complete! 🎓 Points added to your profile.', 'success');
    updateDashboardStats();
    renderAllLessons($('.lesson-cat-btn.active')?.dataset.lcat || 'all');
  }
  closeModal('lessonModal');
}

/* ── Map View ───────────────────────────────── */
function initMapView() {
  const sidebar = $('#mapResults');
  const pinsContainer = $('#mapPins');
  if (!sidebar) return;

  sidebar.innerHTML = JOBS.slice(0, 8).map(j => `
    <div class="map-result-card" data-map-job="${j.id}">
      <div style="font-weight:700;font-size:0.9rem">${j.emoji} ${j.title}</div>
      <div style="font-size:0.8rem;color:var(--text-muted)">${j.company} · ${j.borough}</div>
      <div style="font-size:0.85rem;color:var(--success);font-weight:600;margin-top:4px">${j.pay}</div>
    </div>`).join('');

  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-map-job]');
    if (card) {
      $$('.map-result-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const id = parseInt(card.dataset.mapJob);
      const job = JOBS.find(j => j.id === id);
      if (job) showToast(`📍 ${job.title} at ${job.company} — ${job.borough}`, 'info');
    }
  });
}

/* ── Dashboard ──────────────────────────────── */
function initDashboard() {
  renderReadinessTracks();
  renderBadges();
  updateDashboardStats();
}

function renderReadinessTracks() {
  const el = $('#readinessTracks');
  if (!el) return;
  el.innerHTML = READINESS_TRACKS.map(t => `
    <div class="readiness-track">
      <div class="readiness-label">
        <span>${t.label}</span>
        <span>${t.pct}%</span>
      </div>
      <div class="readiness-bar">
        <div class="readiness-fill" style="width:0%" data-target="${t.pct}"></div>
      </div>
    </div>`).join('');

  // Animate bars when dashboard is visible
  setTimeout(() => {
    $$('.readiness-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 300);
}

function renderBadges() {
  const el = $('#badgesGrid');
  if (!el) return;
  el.innerHTML = BADGES.map(b => `
    <div class="badge-item ${b.earned ? '' : 'locked'}" title="${b.name}">
      <div class="badge-icon">${b.emoji}</div>
      <div class="badge-name">${b.name}</div>
    </div>`).join('');
}

function updateDashboardStats() {
  const statApplied = $('#statApplied');
  const statSaved   = $('#statSaved');
  const statLessons = $('#statLessons');
  const statBadges  = $('#statBadges');

  if (statApplied) statApplied.textContent = state.appliedJobs.length;
  if (statSaved)   statSaved.textContent   = state.savedJobs.length;
  if (statLessons) statLessons.textContent = state.completedLessons.length;
  if (statBadges)  statBadges.textContent  = BADGES.filter(b => b.earned).length;

  // Saved jobs list
  const savedList = $('#savedJobsList');
  if (savedList) {
    if (state.savedJobs.length === 0) {
      savedList.innerHTML = '<p class="empty-state">No saved jobs yet. <a href="#" data-view="jobs">Browse jobs →</a></p>';
    } else {
      savedList.innerHTML = state.savedJobs.map(id => {
        const j = JOBS.find(j => j.id === id);
        return j ? `<div class="small-list-item">${j.emoji} <div><strong>${j.title}</strong><br><small style="color:var(--text-muted)">${j.company}</small></div><span class="job-pay" style="margin-left:auto;font-size:0.85rem">${j.pay}</span></div>` : '';
      }).join('');
    }
  }

  // Applied list
  const appliedList = $('#appliedList');
  if (appliedList) {
    if (state.appliedJobs.length === 0) {
      appliedList.innerHTML = '<p class="empty-state">No applications yet. <a href="#" data-view="jobs">Find a job →</a></p>';
    } else {
      appliedList.innerHTML = state.appliedJobs.map(id => {
        const j = JOBS.find(j => j.id === id);
        return j ? `<div class="small-list-item">${j.emoji} <div><strong>${j.title}</strong><br><small style="color:var(--text-muted)">${j.company}</small></div><span style="margin-left:auto;color:var(--success);font-size:0.8rem;font-weight:600">Applied ✓</span></div>` : '';
      }).join('');
    }
  }

  // Recent lessons
  const recentEl = $('#recentLessons');
  if (recentEl) {
    if (state.completedLessons.length === 0) {
      recentEl.innerHTML = '<p class="empty-state">No lessons yet. <a href="#" data-view="lessons">Start learning →</a></p>';
    } else {
      recentEl.innerHTML = state.completedLessons.slice(-3).map(id => {
        const l = LESSONS.find(l => l.id === id);
        return l ? `<div class="small-list-item">${l.emoji} <div><strong>${l.title}</strong><br><small style="color:var(--success)">Completed ✓</small></div><span style="margin-left:auto;color:var(--accent-light);font-size:0.8rem">+${l.points} pts</span></div>` : '';
      }).join('');
    }
  }

  // Settings counts
  const savedCount   = $('#savedCount');
  const appliedCount = $('#appliedCount');
  const lessonsCount = $('#lessonsCount');
  if (savedCount)   savedCount.textContent   = state.savedJobs.length;
  if (appliedCount) appliedCount.textContent = state.appliedJobs.length;
  if (lessonsCount) lessonsCount.textContent = state.completedLessons.length;
}

/* ── Sign In Modal ──────────────────────────── */
function initSignInModal() {
  // Switch to join
  $('#switchToJoin')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('signInModal');
    openModal('joinModal');
  });

  // Switch to sign in from join
  $('#switchToSignIn')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('joinModal');
    openModal('signInModal');
  });

  // Forgot password
  $('#forgotPwdLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('signInModal');
    openModal('forgotModal');
  });

  $('#backToSignIn')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('forgotModal');
    openModal('signInModal');
  });

  // Toggle password visibility
  $('#toggleSignInPwd')?.addEventListener('click', () => {
    const input = $('#signInPassword');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  // Submit sign in
  $('#signInSubmit')?.addEventListener('click', () => {
    const email = $('#signInEmail')?.value.trim();
    const pwd   = $('#signInPassword')?.value;
    if (!email || !pwd) { showToast('Please fill in all fields.', 'error'); return; }
    // Simulate sign in
    state.user = { name: 'User', email };
    closeModal('signInModal');
    showToast('Welcome back! 👋', 'success');
    setView('dashboard');
    updateDashboardStats();
  });

  // Forgot submit
  $('#forgotSubmit')?.addEventListener('click', () => {
    const email = $('#forgotEmail')?.value.trim();
    if (!email) { showToast('Please enter your email.', 'error'); return; }
    showToast('Reset link sent! Check your inbox. 📧', 'success');
    closeModal('forgotModal');
  });
}

/* ── Join / Signup Modal ─────────────────────── */
function initJoinModal() {
  let step = 1;

  function goToStep(n) {
    step = n;
    $$('.modal-step').forEach(s => s.classList.remove('active'));
    $(`#join-step-${n}`)?.classList.add('active');
    $$('.step').forEach((dot, i) => {
      dot.classList.toggle('active', i + 1 === n);
      dot.classList.toggle('done', i + 1 < n);
    });
  }

  // Password strength
  $('#joinPassword')?.addEventListener('input', (e) => {
    const pwd = e.target.value;
    const reqs = {
      len:     pwd.length >= 8,
      upper:   /[A-Z]/.test(pwd),
      num:     /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };

    const score = Object.values(reqs).filter(Boolean).length;
    const bars  = $$('.strength-bar');
    const label = $('#pwdStrengthLabel');

    bars.forEach((b, i) => {
      b.classList.toggle('active', i < score);
      b.classList.toggle('medium', score === 2 || score === 3);
      b.classList.toggle('strong', score === 4);
    });

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong 💪'];
    if (label) label.textContent = pwd ? labels[score] : 'Enter password';

    Object.keys(reqs).forEach(key => {
      const el = $(`#req-${key}`);
      if (el) el.classList.toggle('met', reqs[key]);
    });
  });

  // Password toggle
  $('#toggleJoinPwd')?.addEventListener('click', () => {
    const input = $('#joinPassword');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  // Chips
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('active'));
  });

  // Step navigation
  $('#joinNext1')?.addEventListener('click', () => {
    const first = $('#joinFirst')?.value.trim();
    const email = $('#joinEmail')?.value.trim();
    const pwd   = $('#joinPassword')?.value;
    if (!first || !email || !pwd) { showToast('Please fill in all required fields.', 'error'); return; }
    if (pwd.length < 8) { showToast('Password must be at least 8 characters.', 'error'); return; }
    goToStep(2);
  });

  $('#joinBack2')?.addEventListener('click', () => goToStep(1));

  $('#joinNext2')?.addEventListener('click', () => {
    goToStep(3);
    // Simulate creating user
    const first = $('#joinFirst')?.value.trim();
    const last  = $('#joinLast')?.value.trim();
    const email = $('#joinEmail')?.value.trim();
    state.user = { name: `${first} ${last}`, email };

    // Update dashboard avatar
    if (first) {
      const initials = (first[0] + (last ? last[0] : '')).toUpperCase();
      const dashAvatar = $('#dashAvatar');
      if (dashAvatar) dashAvatar.textContent = initials;
      const profilePhoto = $('#profilePhoto');
      if (profilePhoto) profilePhoto.textContent = initials;
      const dashName = $('#dashName');
      if (dashName) dashName.textContent = `Welcome, ${first}! 👋`;
    }
  });

  $('#joinDone')?.addEventListener('click', () => {
    closeModal('joinModal');
    showToast('Welcome to LaunchPad NYC! 🎉', 'success');
    setView('dashboard');
    goToStep(1); // reset for next time
    updateDashboardStats();
  });
}

/* ── Settings ───────────────────────────────── */
function initSettings() {
  // Settings tabs
  $$('.settings-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.settings-nav-btn').forEach(b => b.classList.remove('active'));
      $$('.settings-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      $(`#tab-${tab}`)?.classList.add('active');

      if (tab === 'saved') updateSettingsSaved();
    });
  });

  // Save profile
  $('#saveProfile')?.addEventListener('click', () => {
    const first = $('#profileFirst')?.value.trim();
    const last  = $('#profileLast')?.value.trim();
    if (!first) { showToast('Please enter your first name.', 'error'); return; }
    showToast('Profile saved! ✅', 'success');

    if (first) {
      const initials = (first[0] + (last ? last[0] : '')).toUpperCase();
      const dashAvatar = $('#dashAvatar');
      if (dashAvatar) dashAvatar.textContent = initials;
      const dashName = $('#dashName');
      if (dashName) dashName.textContent = `Welcome back, ${first}! 👋`;
    }
  });

  // Accent colors
  $$('.swatch').forEach(s => {
    s.addEventListener('click', () => {
      $$('.swatch').forEach(sw => sw.classList.remove('active'));
      s.classList.add('active');
      const color = s.dataset.color;
      document.documentElement.style.setProperty('--accent', color);
      document.documentElement.style.setProperty('--accent-light', color);
      localStorage.setItem('lp-accent', color);
      showToast('Accent color updated! 🎨', 'success');
    });
  });

  // Load saved accent
  const savedAccent = localStorage.getItem('lp-accent');
  if (savedAccent) {
    document.documentElement.style.setProperty('--accent', savedAccent);
    document.documentElement.style.setProperty('--accent-light', savedAccent);
    $$('.swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.color === savedAccent);
    });
  }

  // Resume upload
  const uploadArea = $('#resumeUpload');
  const resumeFile = $('#resumeFile');
  uploadArea?.addEventListener('click', () => resumeFile?.click());
  resumeFile?.addEventListener('change', (e) => {
    if (e.target.files[0]) {
      showToast(`Resume "${e.target.files[0].name}" uploaded! 📄`, 'success');
      uploadArea.innerHTML = `<span>✅ ${e.target.files[0].name}</span>`;
    }
  });

  // Danger zone
  $$('[class*="btn-danger"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        showToast('Account deleted. Goodbye! 👋', 'info');
      }
    });
  });

  // Interview prep btn
  $('#interviewPrepBtn')?.addEventListener('click', () => {
    openModal('lessonModal');
    const lesson = LESSONS.find(l => l.category === 'interview');
    if (lesson) openLessonModal(lesson);
  });
}

function updateSettingsSaved() {
  const savedEl   = $('#settingsSavedJobs');
  const appliedEl = $('#settingsAppliedJobs');
  const lessonsEl = $('#settingsLessons');

  if (savedEl) {
    savedEl.innerHTML = state.savedJobs.length === 0
      ? '<p class="empty-state">No saved jobs.</p>'
      : state.savedJobs.map(id => {
          const j = JOBS.find(j => j.id === id);
          return j ? `<div class="small-list-item">${j.emoji} ${j.title} — ${j.company}</div>` : '';
        }).join('');
  }

  if (appliedEl) {
    appliedEl.innerHTML = state.appliedJobs.length === 0
      ? '<p class="empty-state">No applications.</p>'
      : state.appliedJobs.map(id => {
          const j = JOBS.find(j => j.id === id);
          return j ? `<div class="small-list-item">${j.emoji} ${j.title} — <span style="color:var(--success)">Applied ✓</span></div>` : '';
        }).join('');
  }

  if (lessonsEl) {
    lessonsEl.innerHTML = state.completedLessons.length === 0
      ? '<p class="empty-state">No completed lessons.</p>'
      : state.completedLessons.map(id => {
          const l = LESSONS.find(l => l.id === id);
          return l ? `<div class="small-list-item">${l.emoji} ${l.title} — <span style="color:var(--success)">Done ✓</span></div>` : '';
        }).join('');
  }

  const sc = $('#savedCount');   if (sc)  sc.textContent  = state.savedJobs.length;
  const ac = $('#appliedCount'); if (ac)  ac.textContent  = state.appliedJobs.length;
  const lc = $('#lessonsCount'); if (lc)  lc.textContent  = state.completedLessons.length;
}

/* ── Luke AI Chat ───────────────────────────── */
function initLuke() {
  const fab    = $('#lukeFab');
  const chat   = $('#lukeChat');
  const closeBtn = $('#lukeClose');
  const sendBtn  = $('#lukeSend');
  const input    = $('#lukeInput');
  const messages = $('#lukeMessages');
  const micBtn   = $('#lukeMicBtn');
  const micSmall = $('#lukeMicSmall');
  const voiceUI  = $('#lukeVoice');

  fab?.addEventListener('click', () => toggleLukeChat());
  closeBtn?.addEventListener('click', () => toggleLukeChat(false));

  function toggleLukeChat(force) {
    state.lukeOpen = force !== undefined ? force : !state.lukeOpen;
    chat?.classList.toggle('open', state.lukeOpen);
  }

  // Send message
  function sendMessage(text) {
    if (!text.trim()) return;
    addLukeMsg(text, 'out');
    input.value = '';

    // Typing indicator
    const typingId = 'typing-' + Date.now();
    addTypingIndicator(typingId);

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const reply = getLukeReply(text);
      addLukeMsg(reply, 'in');
    }, 800 + Math.random() * 600);
  }

  sendBtn?.addEventListener('click', () => sendMessage(input.value));
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(input.value);
  });

  // Suggestion chips
  document.addEventListener('click', (e) => {
    const suggest = e.target.closest('.luke-suggest');
    if (suggest) {
      const msg = suggest.dataset.msg;
      suggest.closest('.luke-suggestions')?.remove();
      sendMessage(msg);
    }
  });

  // Luke Banner btn opens chat
  $('#lukeBannerBtn')?.addEventListener('click', () => {
    toggleLukeChat(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Voice input
  function toggleVoice() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('Voice input not supported in this browser.', 'warning');
      return;
    }

    if (state.voiceActive) {
      state.recognition?.stop();
      return;
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    state.recognition = new Recognition();
    state.recognition.continuous = false;
    state.recognition.lang = 'en-US';

    state.recognition.onstart = () => {
      state.voiceActive = true;
      if (voiceUI) voiceUI.style.display = 'flex';
      micBtn?.classList.add('active');
      micSmall?.classList.add('active');
    };

    state.recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (input) input.value = transcript;
      sendMessage(transcript);
    };

    state.recognition.onend = () => {
      state.voiceActive = false;
      if (voiceUI) voiceUI.style.display = 'none';
      micBtn?.classList.remove('active');
      micSmall?.classList.remove('active');
    };

    state.recognition.start();
  }

  micBtn?.addEventListener('click', toggleVoice);
  micSmall?.addEventListener('click', toggleVoice);

  function addLukeMsg(text, dir) {
    const div = document.createElement('div');
    div.className = `luke-msg luke-msg-${dir === 'in' ? 'in' : 'out'}`;
    div.innerHTML = `<div class="luke-msg-bubble">${parseLukeMd(text)}</div>`;
    messages?.appendChild(div);
    messages?.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
  }

  function addTypingIndicator(id) {
    const div = document.createElement('div');
    div.className = 'luke-msg luke-msg-in luke-typing';
    div.id = id;
    div.innerHTML = `<div class="luke-msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
    messages?.appendChild(div);
    messages?.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
  }

  function removeTypingIndicator(id) {
    $(`#${id}`)?.remove();
  }
}

/* ── Messages View ──────────────────────────── */
function initMessages() {
  $$('.msg-thread').forEach(thread => {
    thread.addEventListener('click', () => {
      $$('.msg-thread').forEach(t => t.classList.remove('active'));
      thread.classList.add('active');
    });
  });

  const composeInput = $('.msg-input');
  const sendBtn = $('.msg-compose .btn');

  sendBtn?.addEventListener('click', () => {
    const text = composeInput?.value.trim();
    if (!text) return;
    const body = $('.msg-body');
    if (body) {
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble outgoing';
      bubble.textContent = text;
      body.appendChild(bubble);
      body.scrollTop = body.scrollHeight;
    }
    composeInput.value = '';
    showToast('Message sent! ✉️', 'success');
  });

  composeInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn?.click();
  });
}

/* ── Keyboard Shortcuts ──────────────────────── */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Escape closes modals / Luke
    if (e.key === 'Escape') {
      $$('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      if (state.lukeOpen) {
        $('#lukeChat')?.classList.remove('open');
        state.lukeOpen = false;
      }
    }
    // / to focus search
    if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      $('#globalSearch')?.focus();
    }
  });
}

/* ── Scroll Animations ──────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const targets = ['.job-card', '.program-card', '.lesson-card', '.resource-card', '.cat-card'];
  targets.forEach(sel => {
    $$(sel).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  });
}

/* ── Boot ───────────────────────────────────── */
function boot() {
  lucide.createIcons();

  initLoader();
  initHeader();
  initTheme();
  initNavigation();
  initSearch();
  initJobsView();
  initProgramsView();
  initLessonsView();
  initMapView();
  initDashboard();
  initSignInModal();
  initJoinModal();
  initSettings();
  initLuke();
  initMessages();
  initKeyboardShortcuts();

  // Init job interactions after all renders
  setTimeout(() => {
    initJobInteractions();
    initScrollAnimations();
    lucide.createIcons();
  }, 300);

  // Reload icons after modals open
  document.addEventListener('click', () => {
    setTimeout(() => lucide.createIcons(), 50);
  });

  console.log('%c🗽 LaunchPad NYC', 'font-size:24px;font-weight:bold;background:linear-gradient(135deg,#7C3AED,#0EA5E9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;padding:4px 0');
  console.log('%cYour career starts here.', 'color:#9090A8;font-size:14px');
}

document.addEventListener('DOMContentLoaded', boot);
