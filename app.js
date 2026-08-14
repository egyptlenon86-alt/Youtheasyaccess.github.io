/* ═══════════════════════════════════════════════════════
   LAUNCHPAD NYC — app.js
   Lesson engine: YouTube + animations + games + XP avatar
═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════
   AVATAR / XP SYSTEM CONFIG
═════════════════════════════════════════ */
const AVATAR_SKINS = [
  { id: 'sprout',   emoji: '🌱', name: 'Sprout',         xpRequired: 0,    level: 1 },
  { id: 'star',     emoji: '⭐', name: 'Star Student',   xpRequired: 50,   level: 1 },
  { id: 'rocket',   emoji: '🚀', name: 'Rocket',         xpRequired: 100,  level: 2 },
  { id: 'brain',    emoji: '🧠', name: 'Big Brain',      xpRequired: 200,  level: 3 },
  { id: 'laptop',   emoji: '💻', name: 'Tech Wizard',    xpRequired: 350,  level: 4 },
  { id: 'briefcase',emoji: '💼', name: 'Career Pro',     xpRequired: 500,  level: 5 },
  { id: 'crown',    emoji: '👑', name: 'Top Achiever',   xpRequired: 750,  level: 7 },
  { id: 'lightning',emoji: '⚡', name: 'Lightning',      xpRequired: 1000, level: 9 },
  { id: 'diamond',  emoji: '💎', name: 'Diamond',        xpRequired: 1500, level: 12},
  { id: 'trophy',   emoji: '🏆', name: 'Champion',       xpRequired: 2000, level: 15},
];

const LEVEL_THRESHOLDS = [0,100,200,350,500,700,900,1150,1450,1800,2200,2700,3300,4000,5000];
const LEVEL_TITLES = ['','Rookie Worker','Rising Star','Skill Builder','Career Explorer','NYC Hustler','Pro Candidate','Industry Leader','Power Player','Elite Professional','LaunchPad Legend','NYC Champion','Master of Work','Career Architect','Work Legend','LaunchPad GOAT'];

/* ══════════════════════════════════════════
   LESSON DATABASE
═════════════════════════════════════════ */
const LESSONS_DB = [

  /* ─── LESSON 1: Build Your First Resume ─── */
  {
    id: 1,
    emoji: '📄',
    category: 'resume',
    title: 'Build Your First Resume',
    duration: '12 min',
    level: 'Beginner',
    xpReward: 50,
    desc: 'Create a standout resume even with no work experience. Learn exactly what employers look for.',
    sections: [
      {
        type: 'video',
        icon: '▶',
        label: 'Watch: How to Write a Resume with No Experience',
        videoId: 'Tt08KmFfIYQ',
        videoTitle: 'How To Write A Resume With No Work Experience (2024)',
        thumbnail: 'https://img.youtube.com/vi/Tt08KmFfIYQ/hqdefault.jpg',
        badge: 'YouTube · 8 min',
      },
      {
        type: 'animation',
        icon: '🎬',
        label: 'Interactive: Anatomy of a Great Resume',
        animType: 'resume-anatomy',
      },
      {
        type: 'checklist',
        icon: '✅',
        label: 'Resume Must-Haves',
        items: [
          { title: 'Contact Information', desc: 'Full name, phone, professional email, LinkedIn URL, city (no full address needed)' },
          { title: 'Skills Section', desc: 'Hard skills (MS Word, Canva) and soft skills (teamwork, communication). List 6–10.' },
          { title: 'Education', desc: 'School name, expected graduation year, GPA if above 3.0, any honors' },
          { title: 'Experience (or Activities)', desc: "Even babysitting, volunteering, or clubs count! Don't have a job? Use school projects." },
          { title: 'Summary Statement', desc: "2–3 lines at the top that describe who you are and what you're looking for." },
          { title: 'Clean Formatting', desc: 'One page, consistent fonts, readable size (10–12pt), no photos or bright colors' },
        ],
      },
      {
        type: 'terms',
        icon: '📖',
        label: 'Key Terms to Know',
        terms: [
          { word: 'ATS', def: 'Applicant Tracking System — software employers use to scan resumes for keywords before a human reads it.' },
          { word: 'Keywords', def: 'Words from the job description that you include in your resume to pass ATS scans.' },
          { word: 'Action Verbs', def: 'Strong verbs that start bullet points: Created, Managed, Organized, Led, Improved...' },
          { word: 'Quantify', def: 'Adding numbers to your achievements. "Served 50+ customers/day" beats "served customers."' },
          { word: 'Tailoring', def: 'Adjusting your resume for each job by matching their keywords and requirements.' },
          { word: 'References', def: 'People who can vouch for you. Usually written "Available upon request" — never list on resume.' },
        ],
      },
      {
        type: 'game',
        icon: '🎮',
        label: 'Game: Good Resume vs. Bad Resume — Sort It Out!',
        gameType: 'dragdrop',
        xpBonus: 25,
        config: {
          instruction: 'Drag each item into the correct bin — does it belong on a resume or not?',
          items: [
            { id: 'a', text: 'Club President', correct: 'yes' },
            { id: 'b', text: 'Your Home Address', correct: 'no' },
            { id: 'c', text: 'Volunteer Work', correct: 'yes' },
            { id: 'd', text: 'Age / Birthday', correct: 'no' },
            { id: 'e', text: 'Skills like Excel', correct: 'yes' },
            { id: 'f', text: 'Profile Photo', correct: 'no' },
            { id: 'g', text: 'GPA (if above 3.0)', correct: 'yes' },
            { id: 'h', text: 'Religion / Race', correct: 'no' },
          ],
          zones: [
            { id: 'yes', label: '✅ Put It On', emptyText: 'Drop "include" items here' },
            { id: 'no',  label: '🚫 Leave It Off', emptyText: 'Drop "exclude" items here' },
          ],
        },
      },
      {
        type: 'game',
        icon: '❓',
        label: 'Quiz: Resume Knowledge Check',
        gameType: 'quiz',
        xpBonus: 30,
        config: {
          questions: [
            { q: 'How long should a first resume typically be?', options: ['2–3 pages', '1 page', 'As long as needed', '5 pages'], correct: 1, explanation: '✅ One page! Hiring managers spend very little time per resume.' },
            { q: 'You have no formal job experience. What should you include?', options: ['Leave the experience section blank', 'Make up a fake job', 'Include clubs, volunteer work, or school projects', 'Put only personal hobbies'], correct: 2, explanation: '✅ Include relevant school projects and volunteer work.' },
            { q: 'Which is the stronger bullet point?', options: ['"I helped with social media"', '"Managed Instagram page — grew followers by 200+"', '"Did some posting online"', '"Social media stuff"'], correct: 1, explanation: '✅ Quantified, specific achievements are stronger.' }
          ],
        },
      },
    ],
  },

  /* rest of file unchanged... */
];

/* The rest of app.js is unchanged for brevity in this commit. */
