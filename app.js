/* ═══════════════════════════════════════════════════════
   LaunchPad NYC — app.js
   Lesson engine: YouTube + animations + games + XP avatar
═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════
   AVATAR / XP SYSTEM CONFIG
══════════════════════════════════════════ */
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
══════════════════════════════════════════ */
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
          { title: 'Summary Statement', desc: "2–3 lines at the top that describe who you are and what you're looking for" },
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
            { q: 'How long should a first resume typically be?', options: ['2–3 pages', '1 page', 'As long as needed', '5 pages'], correct: 1, explanation: '✅ One page! Hiring managers spend about 7 seconds on a first scan. Keep it tight and focused.' },
            { q: 'You have no formal job experience. What should you include?', options: ['Leave the experience section blank', 'Make up a fake job', 'Include clubs, volunteer work, or school projects', 'Only list your GPA'], correct: 2, explanation: '✅ Clubs, volunteer work, babysitting, sports teams — they all count! Show what you\'ve done, not what you haven\'t.' },
            { q: 'Which is the stronger bullet point?', options: ['"I helped with social media"', '"Managed Instagram page — grew followers by 200+"', '"Did some posting online"', '"Social media person"'], correct: 1, explanation: '✅ Numbers make it real! Quantifying your work ("200+") makes you stand out and is more believable.' },
            { q: 'What is ATS?', options: ['A type of job interview', 'Software that scans resumes for keywords', 'A resume format', 'An NYC career program'], correct: 1, explanation: '✅ ATS (Applicant Tracking System) scans your resume BEFORE a human sees it. Using keywords from the job description helps you pass.' },
            { q: 'Should you include a photo on your resume?', options: ['Yes, always — it shows your personality!', 'Only if you\'re attractive', 'No — it can lead to unconscious bias and isn\'t standard in the US', 'Only for creative jobs'], correct: 2, explanation: '✅ No photos on US resumes! Unlike Europe, American employers don\'t expect or want them, and they can create bias.' },
          ],
        },
      },
    ],
  },

  /* ─── LESSON 2: Ace Your First Interview ─── */
  {
    id: 2,
    emoji: '🎤',
    category: 'interview',
    title: 'Ace Your First Interview',
    duration: '18 min',
    level: 'Beginner',
    xpReward: 75,
    desc: 'Master common interview questions, body language, and how to make a great first impression.',
    sections: [
      {
        type: 'video',
        icon: '▶',
        label: 'Watch: Top 7 Interview Questions and Answers',
        videoId: 'HG68Ymazo18',
        videoTitle: 'TOP 7 Interview Questions and Answers (PASS GUARANTEED!)',
        thumbnail: 'https://img.youtube.com/vi/HG68Ymazo18/hqdefault.jpg',
        badge: 'YouTube · 10 min',
      },
      {
        type: 'animation',
        icon: '🎬',
        label: 'Watch: The Do\'s and Don\'ts of Interviews',
        animType: 'interview-dos-donts',
      },
      {
        type: 'animation',
        icon: '🎙',
        label: 'Interactive: STAR Method Explainer',
        animType: 'star-method',
      },
      {
        type: 'checklist',
        icon: '✅',
        label: 'Pre-Interview Checklist',
        items: [
          { title: 'Research the Company', desc: 'Know what they do, their mission, and recent news. Go to their website and social media.' },
          { title: 'Prepare Your "Tell Me About Yourself"', desc: 'Practice a 60-second intro: who you are, what you study/do, and why you want this job.' },
          { title: 'Have 2 Questions Ready to Ask Them', desc: '"What does a typical day look like?" or "What does success look like in this role?" shows initiative.' },
          { title: 'Dress One Level Up from the Role', desc: 'Retail job? Business casual. Office job? Business formal. When in doubt, overdress slightly.' },
          { title: 'Arrive 10–15 Minutes Early', desc: 'Never late, never MORE than 15 min early. Bring a printed copy of your resume.' },
          { title: 'Bring a Notepad and Pen', desc: "Taking notes shows you're serious and interested. Write down the interviewer's name." },
        ],
      },
      {
        type: 'game',
        icon: '🎮',
        label: 'Game: What Would YOU Say? Interview Simulator',
        gameType: 'salary',
        xpBonus: 35,
        config: {
          title: '🎤 Interview Response Simulator',
          scenarios: [
            {
              scenario: '👔 The interviewer says: "Tell me about yourself."',
              choices: [
                { text: '"Um... I don\'t know, I\'m just a student, I guess..."', type: 'bad', feedback: '❌ Too vague and lacks confidence. Prepare a strong 60-second pitch!' },
                { text: '"I\'m a senior at Brooklyn High, passionate about tech. I\'ve built 3 school projects and led our coding club — I\'m excited to bring that energy here."', type: 'best', feedback: '✅ Perfect! Specific, confident, and connects your background to the role.' },
                { text: '"I\'m 17 and I need money for college."', type: 'bad', feedback: '❌ Too personal and doesn\'t show what you bring to THEM. Focus on value, not need.' },
                { text: '"I\'m a hardworking person who is very dedicated and passionate."', type: 'ok', feedback: '⚠️ Better, but vague. Add specific examples to back up those claims!' },
              ],
            },
            {
              scenario: '💬 "What\'s your biggest weakness?"',
              choices: [
                { text: '"I have no weaknesses."', type: 'bad', feedback: '❌ Overconfident and unbelievable. Everyone has areas to grow — showing self-awareness is powerful.' },
                { text: '"I\'m a perfectionist — sometimes I take too long on tasks."', type: 'ok', feedback: '⚠️ A classic answer. It\'s OK, but overused. Try to be more specific and genuine.' },
                { text: '"I\'m working on public speaking — I joined Toastmasters and already notice improvement in class presentations."', type: 'best', feedback: '✅ Real weakness + active steps to fix it = shows growth mindset and initiative!' },
                { text: '"I\'m bad at waking up early."', type: 'bad', feedback: '❌ Too casual and raises a red flag about reliability. Never mention anything that could hurt your chances.' },
              ],
            },
            {
              scenario: '❓ End of interview: "Do you have any questions for us?"',
              choices: [
                { text: '"No, I think I\'m good."', type: 'bad', feedback: '❌ This signals low interest. ALWAYS have questions prepared — it shows you\'re serious.' },
                { text: '"What\'s the salary?"', type: 'ok', feedback: '⚠️ Save salary questions for after you have an offer, or for the HR screen. Not ideal in a first interview.' },
                { text: '"What does a typical day look like in this role? And what qualities do your best employees share?"', type: 'best', feedback: '✅ Amazing! These questions show real curiosity about the job AND help you learn if it\'s right for you.' },
                { text: '"When will I hear back?"', type: 'ok', feedback: '⚠️ OK to ask, but ask it LAST and pair it with a more substantive question first.' },
              ],
            },
          ],
        },
      },
      {
        type: 'game',
        icon: '❓',
        label: 'Quiz: Interview Knowledge Check',
        gameType: 'quiz',
        xpBonus: 30,
        config: {
          questions: [
            { q: 'What does S.T.A.R. stand for in the STAR interview method?', options: ['Skills, Talent, Ambition, Results', 'Situation, Task, Action, Result', 'Story, Time, Action, Reaction', 'Strengths, Tasks, Aims, Reflection'], correct: 1, explanation: '✅ STAR = Situation, Task, Action, Result. Use this structure to tell compelling stories about your experience.' },
            { q: 'How early should you arrive for an in-person interview?', options: ['5 minutes early', '10–15 minutes early', '30 minutes early', 'Right on time'], correct: 1, explanation: '✅ 10–15 minutes is perfect. Earlier is awkward for the employer; later creates a bad first impression.' },
            { q: 'An interviewer asks: "Where do you see yourself in 5 years?" The best answer...', options: ['Says exactly how much money you want to make', "Shows ambition while tying it to the company's growth", 'Says you want their job', "Admits you don't know"], correct: 1, explanation: '✅ Show ambition and growth, and connect it to the company. E.g., "I want to grow in [industry] and develop skills in X, ideally in a place like this."' },
            { q: 'What\'s the best way to follow up after an interview?', options: ['Send a thank-you email within 24 hours', 'Call every day until you hear back', 'Post about it on social media', "Don't follow up — it seems desperate"], correct: 0, explanation: '✅ A thank-you email within 24 hours is professional, memorable, and sets you apart from other candidates.' },
          ],
        },
      },
    ],
  },

  /* ─── LESSON 3: Cover Letter Writing ─── */
  {
    id: 3,
    emoji: '💌',
    category: 'resume',
    title: 'Write a Cover Letter That Works',
    duration: '10 min',
    level: 'Beginner',
    xpReward: 40,
    desc: 'Craft a compelling cover letter that gets you noticed — even without work experience.',
    sections: [
      {
        type: 'video',
        icon: '▶',
        label: 'Watch: How to Write a Cover Letter as a Teenager',
        videoId: 'HR-9CJT1oZc',
        videoTitle: 'How To Write A Cover Letter (Example Included)',
        thumbnail: 'https://img.youtube.com/vi/HR-9CJT1oZc/hqdefault.jpg',
        badge: 'YouTube · 7 min',
      },
      {
        type: 'animation',
        icon: '🎬',
        label: 'Interactive: Cover Letter Structure',
        animType: 'cover-letter-structure',
      },
      {
        type: 'game',
        icon: '🔤',
        label: 'Game: Career Vocab Scramble',
        gameType: 'scramble',
        xpBonus: 20,
        config: {
          words: [
            { scrambled: 'ICIOTTIVAMNO', answer: 'MOTIVATION', hint: 'Why you want the job' },
            { scrambled: 'IAATNOIZROG', answer: 'ORGANIZATION', hint: 'The company you\'re applying to' },
            { scrambled: 'AAOLTNPPICI', answer: 'APPLICATION', hint: 'What you submit to get a job' },
            { scrambled: 'NQTOIIIFLACU', answer: 'QUALIFICATION', hint: 'Skills or experience that make you suitable' },
            { scrambled: 'SRPFOINAOSELISM', answer: 'PROFESSIONALISM', hint: 'Acting with skill and courtesy at work' },
          ],
        },
      },
      {
        type: 'game',
        icon: '❓',
        label: 'Quiz: Cover Letter Check',
        gameType: 'quiz',
        xpBonus: 20,
        config: {
          questions: [
            { q: 'Who should you address your cover letter to?', options: ['"To Whom It May Concern"', 'The hiring manager by name (if known)', '"Dear Sir or Madam"', 'No greeting needed'], correct: 1, explanation: '✅ Always try to find the hiring manager\'s name. LinkedIn, the company website, or calling the company can help. Personal is better!' },
            { q: 'A cover letter should primarily focus on:', options: ['Your entire life story', 'Why you want the job and what value you bring THEM', 'Repeating your resume word-for-word', 'Your salary expectations'], correct: 1, explanation: '✅ A cover letter answers "Why you, why them, why now." Make it about what you bring to THEM, not just what you want.' },
            { q: 'How long should a cover letter be?', options: ['5+ paragraphs, full page', '3–4 sentences max', '3 focused paragraphs, under one page', 'Exactly 2 pages'], correct: 2, explanation: '✅ 3 clear paragraphs: why you\'re interested, what you bring, and a call to action. Short and punchy wins.' },
          ],
        },
      },
    ],
  },

  /* ─── LESSON 4: Workplace Professionalism ─── */
  {
    id: 4,
    emoji: '👔',
    category: 'workplace',
    title: 'Workplace Professionalism 101',
    duration: '15 min',
    level: 'Beginner',
    xpReward: 60,
    desc: "Learn what employers expect: punctuality, communication, dress code, and teamwork.",
    sections: [
      {
        type: 'video',
        icon: '▶',
        label: 'Watch: Workplace Professionalism Tips for Teens',
        videoId: 'QphclWBydD8',
        videoTitle: 'Work Ethic: How to Succeed in Your First Job',
        thumbnail: 'https://img.youtube.com/vi/QphclWBydD8/hqdefault.jpg',
        badge: 'YouTube · 9 min',
      },
      {
        type: 'animation',
        icon: '🎬',
        label: 'Interactive: Pro vs. Unprofessional Behaviors',
        animType: 'pro-vs-unpro',
      },
      {
        type: 'game',
        icon: '🎮',
        label: 'Game: Workplace Situations — What Do You Do?',
        gameType: 'salary',
        xpBonus: 30,
        config: {
          title: '💼 Workplace Simulator',
          scenarios: [
            {
              scenario: '⏰ You\'re going to be 10 minutes late to your shift due to a subway delay.',
              choices: [
                { text: 'Say nothing and hope no one notices', type: 'bad', feedback: '❌ Never ghost! Not communicating makes it look like you don\'t care — even if it\'s not your fault.' },
                { text: 'Text your manager ASAP explaining the situation and your ETA', type: 'best', feedback: '✅ Always communicate early! A quick text shows respect for your team\'s time and they\'ll respect you back.' },
                { text: 'Call in sick instead so you\'re not penalized', type: 'bad', feedback: '❌ Lying creates bigger problems long-term. Honesty is always the better policy.' },
                { text: 'Walk in late and say nothing, act normal', type: 'bad', feedback: '❌ Ignoring the situation can come across as disrespectful. A quick apology goes a long way.' },
              ],
            },
            {
              scenario: '🤝 A coworker keeps taking credit for your ideas in team meetings.',
              choices: [
                { text: 'Say nothing to keep the peace', type: 'ok', feedback: '⚠️ Understandable, but over time this erodes your confidence and others\' perception of your contribution.' },
                { text: 'Argue loudly in the meeting to defend yourself', type: 'bad', feedback: '❌ Public confrontations make YOU look difficult, not them. Handle it privately and professionally.' },
                { text: 'Have a calm, private conversation: "Hey, I noticed X — I\'d appreciate credit when it\'s due"', type: 'best', feedback: '✅ Direct, professional, and respectful. Most situations resolve well with a calm, honest conversation.' },
                { text: 'Start doing the same to them as payback', type: 'bad', feedback: '❌ Two wrongs don\'t make a right. This can escalate the situation and hurt your reputation.' },
              ],
            },
          ],
        },
      },
      {
        type: 'game',
        icon: '❓',
        label: 'Quiz: Professionalism Check',
        gameType: 'quiz',
        xpBonus: 25,
        config: {
          questions: [
            { q: 'Your manager gives you constructive criticism. You should:', options: ['Defend yourself immediately', 'Ignore it', 'Listen, thank them, and apply the feedback', 'Quit if you disagree'], correct: 2, explanation: '✅ Feedback is a gift! Even if it stings, managers notice who takes feedback gracefully and grows from it.' },
            { q: 'What is the most professional way to communicate with your manager?', options: ['Only text emojis and abbreviations', 'Be clear, concise, and respectful — match their communication style', 'Only talk in person, never text', 'Always email, never speak face to face'], correct: 1, explanation: '✅ Mirror your manager\'s style. If they email, email. If they prefer Slack, use Slack. Always be clear and respectful.' },
            { q: 'What is "code-switching" in the workplace?', options: ['Switching computer systems', 'Adjusting your communication style for different contexts', 'Hacking into company systems', 'Changing your outfit mid-shift'], correct: 1, explanation: '✅ Code-switching means adapting how you speak and present yourself depending on the context — more formal in meetings, relaxed with teammates at lunch.' },
          ],
        },
      },
    ],
  },

  /* ─── LESSON 5: Understanding Your Paycheck ─── */
  {
    id: 5,
    emoji: '💵',
    category: 'money',
    title: 'Understanding Your First Paycheck',
    duration: '8 min',
    level: 'Beginner',
    xpReward: 30,
    desc: 'Decode taxes, deductions, net vs. gross pay, and what to do with your earnings.',
    sections: [
      {
        type: 'video',
        icon: '▶',
        label: 'Watch: How to Read Your First Paycheck',
        videoId: 'RNjDGxBiJkQ',
        videoTitle: 'Understanding Your Paycheck: Taxes Explained for Teens',
        thumbnail: 'https://img.youtube.com/vi/RNjDGxBiJkQ/hqdefault.jpg',
        badge: 'YouTube · 6 min',
      },
      {
        type: 'animation',
        icon: '🎬',
        label: 'Interactive: Where Does Your Money Go?',
        animType: 'paycheck-breakdown',
      },
      {
        type: 'terms',
        icon: '📖',
        label: 'Paycheck Terms Glossary',
        terms: [
          { word: 'Gross Pay', def: 'Your total earnings BEFORE any deductions. If you earn $15/hr × 40 hrs = $600 gross.' },
          { word: 'Net Pay', def: 'Your take-home pay AFTER taxes and deductions. This is what hits your bank account.' },
          { word: 'Federal Income Tax', def: 'Tax paid to the federal government based on how much you earn. Teens often owe little or nothing.' },
          { word: 'FICA / Social Security', def: '7.65% of your gross pay goes to Social Security and Medicare — required by law.' },
          { word: 'W-4', def: 'A form you fill out when hired telling your employer how much tax to withhold from each check.' },
          { word: 'W-2', def: 'A form you get in January showing all the money you earned and taxes paid in the previous year. Use it to file taxes.' },
          { word: 'Direct Deposit', def: 'Your paycheck goes straight to your bank account electronically. Faster and safer than paper checks.' },
        ],
      },
      {
        type: 'game',
        icon: '❓',
        label: 'Quiz: Paycheck Knowledge Check',
        gameType: 'quiz',
        xpBonus: 20,
        config: {
          questions: [
            { q: 'You earn $15/hr and work 20 hours. Your gross pay is $300, but you receive $258. Why?', options: ['Your boss stole $42', 'Taxes and FICA deductions (~14%) were withheld', 'You worked overtime and were penalized', 'The government made a mistake'], correct: 1, explanation: '✅ Taxes (federal, state, FICA) are withheld automatically. At low income levels it\'s usually 10–15%. You may get some back when you file taxes!' },
            { q: 'What is the difference between gross and net pay?', options: ['They\'re the same thing', 'Gross is after taxes, net is before', 'Gross is before taxes, net is your take-home after deductions', 'Net is higher than gross'], correct: 2, explanation: '✅ Gross = total earned. Net = what you actually take home. Always budget from your NET pay, not gross.' },
            { q: 'When should you fill out a W-4 form?', options: ['Every year in April', 'When you start a new job', 'Only if you earn over $50,000', 'Never — employers fill it out for you'], correct: 1, explanation: '✅ You fill out a W-4 when you\'re hired. It tells your employer how much tax to withhold. Get it right to avoid owing money at tax time.' },
          ],
        },
      },
    ],
  },

  /* ─── LESSON 6: LinkedIn Essentials ─── */
  {
    id: 6,
    emoji: '💻',
    category: 'digital',
    title: 'LinkedIn Profile Essentials',
    duration: '14 min',
    level: 'Beginner',
    xpReward: 55,
    desc: 'Build a professional LinkedIn profile that gets recruiters to come to you.',
    sections: [
      {
        type: 'video',
        icon: '▶',
        label: 'Watch: How to Create a LinkedIn Profile as a Student',
        videoId: 'SG5Sb5WTV_g',
        videoTitle: 'How to Create a LinkedIn Profile (Complete 2024 Guide)',
        thumbnail: 'https://img.youtube.com/vi/SG5Sb5WTV_g/hqdefault.jpg',
        badge: 'YouTube · 11 min',
      },
      {
        type: 'checklist',
        icon: '✅',
        label: 'LinkedIn Profile Checklist',
        items: [
          { title: 'Professional Profile Photo', desc: 'Good lighting, clean background, business casual clothing. Your face should take up 60% of the frame.' },
          { title: 'Strong Headline', desc: 'Not just your title — your value. "NYC Teen | Aspiring UX Designer | Building Skills in Figma & HTML"' },
          { title: 'About Section (Summary)', desc: '3–5 sentences: who you are, what you\'re skilled at, what you\'re looking for, and a fun fact.' },
          { title: 'Add Your Experience', desc: 'Every job, internship, volunteer role, and notable school project. Use bullet points with action verbs.' },
          { title: 'Skills Section', desc: 'Add 15+ skills. Connections can endorse you, which boosts your credibility and search visibility.' },
          { title: 'Custom URL', desc: 'Edit your LinkedIn URL to linkedin.com/in/yourname — looks cleaner on your resume.' },
          { title: '500+ Connections', desc: 'Connect with classmates, teachers, family friends, and professionals you meet. Volume matters for visibility.' },
        ],
      },
      {
        type: 'game',
        icon: '❓',
        label: 'Quiz: LinkedIn Strategy',
        gameType: 'quiz',
        xpBonus: 25,
        config: {
          questions: [
            { q: 'What should your LinkedIn headline say?', options: ['Just your job title', 'A value statement showing skills and goals', 'Your age and location', 'Nothing — leave it blank'], correct: 1, explanation: '✅ Your headline is prime real estate! Show your value proposition, not just a title. Make recruiters want to click.' },
            { q: 'How often should you post or engage on LinkedIn?', options: ['Never — just have a profile', 'Once a year', '1–3 times per week — share learning, wins, or thoughts on your industry', 'Every hour for maximum visibility'], correct: 2, explanation: '✅ Consistency beats frequency. Sharing your journey, lessons learned, or industry news 1–3x/week builds your brand naturally.' },
            { q: 'Someone you don\'t know sends a connection request with no message. You should:', options: ['Always ignore unknown people', 'Accept if they seem legit, or ask why they\'re connecting', 'Report them immediately', 'Accept everyone to boost your number'], correct: 1, explanation: '✅ Quality over quantity. Accepting makes sense if they\'re in your industry or seem legitimate. When in doubt, ask them to introduce themselves.' },
          ],
        },
      },
    ],
  },

  /* ─── LESSON 9: Budgeting on Your First Salary ─── */
  {
    id: 9,
    emoji: '💰',
    category: 'money',
    title: 'Budgeting on Your First Salary',
    duration: '12 min',
    level: 'Beginner',
    xpReward: 45,
    desc: 'Learn the 50/30/20 rule and start saving from your very first paycheck.',
    sections: [
      {
        type: 'video',
        icon: '▶',
        label: 'Watch: Budgeting for Beginners',
        videoId: 'sVKQn2I4HDM',
        videoTitle: 'How to Budget Your Money — Simple 50/30/20 Rule',
        thumbnail: 'https://img.youtube.com/vi/sVKQn2I4HDM/hqdefault.jpg',
        badge: 'YouTube · 8 min',
      },
      {
        type: 'animation',
        icon: '🎬',
        label: 'Interactive: The 50/30/20 Budget Rule',
        animType: 'budget-503020',
      },
      {
        type: 'game',
        icon: '❓',
        label: 'Quiz: Money Smarts Check',
        gameType: 'quiz',
        xpBonus: 25,
        config: {
          questions: [
            { q: 'Using the 50/30/20 rule, if you earn $1,000/month, how much goes to savings?', options: ['$50', '$200', '$300', '$500'], correct: 1, explanation: '✅ 20% of $1,000 = $200 to savings/debt. Even small amounts add up fast — $200/month = $2,400 per year!' },
            { q: 'What is an "emergency fund"?', options: ['Money for fun activities', '3–6 months of expenses saved for unexpected situations', 'A savings account for vacation', 'A loan from the bank'], correct: 1, explanation: '✅ An emergency fund is your financial safety net. Job loss, medical bills, car repairs — life happens. Start with $500 as your first goal.' },
            { q: 'Which is the BEST first use for your first paycheck?', options: ['Spend it all on wants immediately', 'Pay yourself first — put 20% in savings before spending', 'Invest everything in stocks', 'Give it all to your parents'], correct: 1, explanation: '✅ "Pay yourself first" is the golden rule. Move savings out BEFORE you can spend it. You\'ll never miss what you never had.' },
          ],
        },
      },
    ],
  },

];

/* ══════════════════════════════════════════
   ALL-LESSONS LIST (for "Next Up" section)
══════════════════════════════════════════ */
const ALL_LESSONS_PREVIEW = LESSONS_DB.map(l => ({ id: l.id, emoji: l.emoji, title: l.title, duration: l.duration, level: l.level, xpReward: l.xpReward }));

/* ══════════════════════════════════════════
   XP / AVATAR STATE
══════════════════════════════════════════ */
const xpState = {
  totalXp:     parseInt(localStorage.getItem('lp_totalXp') || '0'),
  activeSkin:  localStorage.getItem('lp_activeSkin') || 'sprout',
  completedLessons: JSON.parse(localStorage.getItem('lp_completedLessons') || '[]'),
  gameXpEarned: {},
};

function saveXpState() {
  localStorage.setItem('lp_totalXp', xpState.totalXp);
  localStorage.setItem('lp_activeSkin', xpState.activeSkin);
  localStorage.setItem('lp_completedLessons', JSON.stringify(xpState.completedLessons));
}

function getLevel(xp) {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return Math.min(level, LEVEL_THRESHOLDS.length);
}

function getLevelXp(xp) {
  const level = getLevel(xp);
  const idx = level - 1;
  const current = LEVEL_THRESHOLDS[idx] || 0;
  const next = LEVEL_THRESHOLDS[idx + 1] || LEVEL_THRESHOLDS[idx] + 500;
  const progress = xp - current;
  const needed = next - current;
  return { level, progress, needed, pct: Math.min(100, Math.round((progress / needed) * 100)) };
}

function getUnlockedSkins(xp) {
  return AVATAR_SKINS.filter(s => xp >= s.xpRequired);
}

function getActiveSkinData() {
  return AVATAR_SKINS.find(s => s.id === xpState.activeSkin) || AVATAR_SKINS[0];
}

/* ══════════════════════════════════════════
   UI UPDATES
══════════════════════════════════════════ */
function updateAvatarUI() {
  const { level, progress, needed, pct } = getLevelXp(xpState.totalXp);
  const skin = getActiveSkinData();

  // Top bar
  const topEmoji = document.getElementById('topAvatarEmoji');
  const levelLabel = document.getElementById('xpLevelLabel');
  const barMini = document.getElementById('xpBarMini');
  if (topEmoji) topEmoji.textContent = skin.emoji;
  if (levelLabel) levelLabel.textContent = `Lv.${level}`;
  if (barMini) barMini.style.width = pct + '%';

  // Panel
  const apEmoji = document.getElementById('apAvatarEmoji');
  const apName = document.getElementById('apName');
  const apLevel = document.getElementById('apLevelText');
  const apFill = document.getElementById('apXpFill');
  const apLabel = document.getElementById('apXpLabel');
  const apRing = document.getElementById('apAvatarRing');
  if (apEmoji) apEmoji.textContent = skin.emoji;
  if (apName) apName.textContent = LEVEL_TITLES[level] || skin.name;
  if (apLevel) apLevel.textContent = `Level ${level} · ${xpState.totalXp} total XP`;
  if (apFill) apFill.style.width = pct + '%';
  if (apLabel) apLabel.textContent = `${progress} / ${needed} XP to Level ${level + 1}`;
  if (apRing) apRing.style.setProperty('--ring-pct', pct + '%');

  // Skins grid
  const skinsEl = document.getElementById('apSkins');
  if (skinsEl) {
    const unlocked = getUnlockedSkins(xpState.totalXp);
    const unlockedIds = unlocked.map(s => s.id);
    skinsEl.innerHTML = AVATAR_SKINS.map(s => {
      const isUnlocked = unlockedIds.includes(s.id);
      const isActive = s.id === xpState.activeSkin;
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
          <div class="ap-skin ${isUnlocked ? 'unlocked' : ''} ${isActive ? 'active' : ''}"
               data-skin="${s.id}" title="${s.name}${isUnlocked ? '' : ' · '+s.xpRequired+' XP'}">
            ${s.emoji}
          </div>
          <div class="ap-unlock-at">${isUnlocked ? '' : s.xpRequired+'xp'}</div>
        </div>`;
    }).join('');

    // Skin click handlers
    skinsEl.querySelectorAll('.ap-skin.unlocked').forEach(el => {
      el.addEventListener('click', () => {
        xpState.activeSkin = el.dataset.skin;
        saveXpState();
        updateAvatarUI();
        showToast('Avatar updated! ' + getActiveSkinData().emoji, 'success');
      });
    });
  }
}

function addXp(amount, label = 'XP earned!') {
  const prevLevel = getLevel(xpState.totalXp);
  xpState.totalXp += amount;
  saveXpState();

  // Show popup
  const popup = document.getElementById('xpPopup');
  const popupNum = document.getElementById('xpPopupNum');
  const popupLabel = document.getElementById('xpPopupLabel');
  if (popup && popupNum) {
    popupNum.textContent = '+' + amount + ' XP';
    popupLabel.textContent = label;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 3000);
  }

  const newLevel = getLevel(xpState.totalXp);

  // Level up?
  if (newLevel > prevLevel) {
    setTimeout(() => showLevelUp(newLevel), 800);
  }

  updateAvatarUI();
  updateLessonProgress();
}

function showLevelUp(level) {
  const overlay = document.getElementById('levelupOverlay');
  const title = document.getElementById('luTitle');
  const sub = document.getElementById('luSub');
  const newSkin = document.getElementById('luNewSkin');
  const skinText = document.getElementById('luSkinText');

  if (!overlay) return;

  const newlyUnlocked = AVATAR_SKINS.filter(s => s.xpRequired <= xpState.totalXp && s.xpRequired > 0);
  const justUnlocked = newlyUnlocked.find(s => s.level === level);

  if (title) title.textContent = `Level ${level}! 🎉`;
  if (sub) sub.textContent = `You're now a "${LEVEL_TITLES[level] || 'Rising Star'}"!`;
  if (justUnlocked && newSkin) {
    newSkin.textContent = justUnlocked.emoji;
    if (skinText) skinText.textContent = `New avatar unlocked: ${justUnlocked.name}!`;
    xpState.activeSkin = justUnlocked.id;
    saveXpState();
  } else {
    if (newSkin) newSkin.textContent = '';
    if (skinText) skinText.textContent = '';
  }

  overlay.classList.add('show');
  updateAvatarUI();
}

/* ══════════════════════════════════════════
   LESSON PROGRESS TRACKING
══════════════════════════════════════════ */
let lessonSections = 0;
let completedSections = new Set();

function updateLessonProgress() {
  if (lessonSections === 0) return;
  const pct = Math.round((completedSections.size / lessonSections) * 100);
  const bar = document.getElementById('lessonProgress');
  if (bar) bar.style.width = pct + '%';
}

function markSectionComplete(idx) {
  completedSections.add(idx);
  updateLessonProgress();
}

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `toast-item ${type}`;
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => div.remove(), 3500);
}

/* ══════════════════════════════════════════
   RENDER HELPERS
══════════════════════════════════════════ */
function renderVideoSection(s, idx) {
  return `
    <div class="section-card" data-section="${idx}">
      <div class="section-header" data-collapse="${idx}">
        <span class="section-icon">${s.icon}</span>
        <span class="section-label">${s.label}</span>
        <span class="section-badge">${s.badge}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="collapse-chevron" style="transition:.2s;color:var(--text-muted)"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="section-body" id="section-body-${idx}">
        <div class="video-container">
          <div class="video-thumbnail" id="vt-${idx}" onclick="loadYouTube('${s.videoId}','${idx}')">
            <img src="${s.thumbnail}" alt="Video thumbnail" loading="lazy" onerror="this.style.display='none'"/>
            <div class="play-btn">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
          <iframe id="yt-${idx}" style="display:none" allowfullscreen allow="autoplay; encrypted-media"></iframe>
        </div>
        <div class="video-label">📺 ${s.videoTitle}</div>
        <div style="margin-top:16px">
          <button class="btn btn-ghost btn-sm" onclick="sectionWatched(${idx})">✅ Mark as Watched +10 XP</button>
        </div>
      </div>
    </div>`;
}

function loadYouTube(videoId, idx) {
  const thumb = document.getElementById(`vt-${idx}`);
  const iframe = document.getElementById(`yt-${idx}`);
  if (thumb) thumb.style.display = 'none';
  if (iframe) {
    iframe.style.display = 'block';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  }
}
window.loadYouTube = loadYouTube;

function sectionWatched(idx) {
  if (!completedSections.has(idx)) {
    markSectionComplete(idx);
    addXp(10, 'Video watched!');
    showToast('Marked as watched! +10 XP ⭐', 'success');
    const btn = document.querySelector(`[data-section="${idx}"] .section-body .btn`);
    if (btn) { btn.textContent = '✓ Watched'; btn.disabled = true; }
  }
}
window.sectionWatched = sectionWatched;

function renderChecklistSection(s, idx) {
  const items = s.items.map((item, i) => `
    <div class="check-item" id="chk-${idx}-${i}" onclick="toggleCheck(${idx},${i})">
      <div class="checkmark" id="chkmark-${idx}-${i}"></div>
      <div class="check-text">
        <strong>${item.title}</strong>
        <span>${item.desc}</span>
      </div>
    </div>`).join('');
  return `
    <div class="section-card" data-section="${idx}">
      <div class="section-header" data-collapse="${idx}">
        <span class="section-icon">${s.icon}</span>
        <span class="section-label">${s.label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="collapse-chevron" style="transition:.2s;color:var(--text-muted)"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="section-body" id="section-body-${idx}">
        <div class="checklist" id="checklist-${idx}">${items}</div>
        <div style="margin-top:14px;font-size:.82rem;color:var(--text-muted)">Check each item as you review it (+5 XP each)</div>
      </div>
    </div>`;
}

function toggleCheck(sIdx, itemIdx) {
  const el = document.getElementById(`chk-${sIdx}-${itemIdx}`);
  const mark = document.getElementById(`chkmark-${sIdx}-${itemIdx}`);
  if (!el || !mark) return;
  const wasChecked = el.classList.contains('checked');
  el.classList.toggle('checked');
  mark.textContent = wasChecked ? '' : '✓';
  if (!wasChecked) {
    addXp(5, 'Checklist item done!');
    // Check if all done
    const checklist = document.getElementById(`checklist-${sIdx}`);
    if (checklist) {
      const all = checklist.querySelectorAll('.check-item').length;
      const done = checklist.querySelectorAll('.check-item.checked').length;
      if (all === done && !completedSections.has(sIdx)) {
        markSectionComplete(sIdx);
        showToast('Checklist complete! 🎉', 'success');
      }
    }
  }
}
window.toggleCheck = toggleCheck;

function renderTermsSection(s, idx) {
  const terms = s.terms.map((t, i) => `
    <div class="term-card" id="term-${idx}-${i}" onclick="toggleTerm(${idx},${i})">
      <div class="term-word">${t.word} <span class="term-arrow">▾</span></div>
      <div class="term-def">${t.def}</div>
    </div>`).join('');
  return `
    <div class="section-card" data-section="${idx}">
      <div class="section-header" data-collapse="${idx}">
        <span class="section-icon">${s.icon}</span>
        <span class="section-label">${s.label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="collapse-chevron" style="transition:.2s;color:var(--text-muted)"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="section-body" id="section-body-${idx}">
        <div class="terms-grid">${terms}</div>
        <div style="margin-top:14px">
          <button class="btn btn-ghost btn-sm" onclick="termsReviewed(${idx})">✅ Mark as Reviewed +10 XP</button>
        </div>
      </div>
    </div>`;
}

function toggleTerm(sIdx, termIdx) {
  const el = document.getElementById(`term-${sIdx}-${termIdx}`);
  if (el) el.classList.toggle('open');
}
window.toggleTerm = toggleTerm;

function termsReviewed(idx) {
  if (!completedSections.has(idx)) {
    markSectionComplete(idx);
    addXp(10, 'Glossary reviewed!');
    showToast('Glossary done! +10 XP 📖', 'success');
    const btn = document.querySelector(`[data-section="${idx}"] .section-body button`);
    if (btn) { btn.textContent = '✓ Reviewed'; btn.disabled = true; }
  }
}
window.termsReviewed = termsReviewed;

/* ══════════════════════════════════════════
   ANIMATION SECTIONS
══════════════════════════════════════════ */
function renderAnimationSection(s, idx) {
  let animHTML = '';
  switch (s.animType) {
    case 'resume-anatomy':      animHTML = buildResumeAnatomy(idx); break;
    case 'interview-dos-donts': animHTML = buildInterviewDsDonts(idx); break;
    case 'star-method':         animHTML = buildStarMethod(idx); break;
    case 'cover-letter-structure': animHTML = buildCoverLetterAnim(idx); break;
    case 'paycheck-breakdown':  animHTML = buildPaycheckAnim(idx); break;
    case 'budget-503020':       animHTML = buildBudgetAnim(idx); break;
    case 'pro-vs-unpro':        animHTML = buildProVsUnpro(idx); break;
    default: animHTML = '<div class="anim-stage"><p style="color:var(--text-muted)">Animation loading...</p></div>';
  }
  return `
    <div class="section-card" data-section="${idx}">
      <div class="section-header" data-collapse="${idx}">
        <span class="section-icon">${s.icon}</span>
        <span class="section-label">${s.label}</span>
        <span class="section-badge">Interactive</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="collapse-chevron" style="transition:.2s;color:var(--text-muted)"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="section-body" id="section-body-${idx}">${animHTML}</div>
    </div>`;
}

/* Resume anatomy animation */
function buildResumeAnatomy(idx) {
  const steps = [
    { label: '1 · Contact Info', highlight: 'name', tip: '📋 Your name (big!), phone, professional email, LinkedIn, city' },
    { label: '2 · Summary', highlight: 'summary', tip: '💬 2–3 sentences: who you are, what you bring, what you want' },
    { label: '3 · Skills', highlight: 'skills', tip: '⚡ 6–10 skills. Mix hard skills (Excel) with soft skills (communication)' },
    { label: '4 · Experience', highlight: 'exp', tip: '💼 Jobs, clubs, volunteer work. Use bullet points starting with action verbs' },
    { label: '5 · Education', highlight: 'edu', tip: '🎓 School name, graduation year, GPA if above 3.0' },
  ];
  return `
    <div>
      <div class="anim-stage" id="anim-${idx}">
        <div class="resume-doc" id="rdoc-${idx}">
          <div class="rline name" id="rl-name-${idx}"></div>
          <div class="rline" style="width:50%" id="rl-contact-${idx}"></div>
          <div class="rsection" id="rl-sumhdr-${idx}" style="opacity:0">SUMMARY</div>
          <div class="rline" id="rl-sum1-${idx}" style="width:0"></div>
          <div class="rline" id="rl-sum2-${idx}" style="width:0"></div>
          <div class="rsection" id="rl-sklhdr-${idx}" style="opacity:0">SKILLS</div>
          <div style="display:flex;gap:4px;flex-wrap:wrap" id="rl-skills-${idx}"></div>
          <div class="rsection" id="rl-exphdr-${idx}" style="opacity:0">EXPERIENCE</div>
          <div class="rline" id="rl-exp1-${idx}" style="width:0"></div>
          <div class="rline" id="rl-exp2-${idx}" style="width:0"></div>
          <div class="rline" id="rl-exp3-${idx}" style="width:0"></div>
          <div class="rsection" id="rl-eduhdr-${idx}" style="opacity:0">EDUCATION</div>
          <div class="rline" id="rl-edu1-${idx}" style="width:0"></div>
        </div>
        <div style="flex:1;max-width:220px;margin-left:20px">
          <div class="anim-bubble" id="abubble-${idx}">👆 Click a step to highlight that section on the resume!</div>
        </div>
      </div>
      <div class="anim-controls">
        ${steps.map((s,i) => `<button class="anim-btn" onclick="resumeStep(${idx},${i})">${s.label}</button>`).join('')}
        <span class="anim-step-label" id="anim-step-label-${idx}">Step 0/${steps.length}</span>
      </div>
      <div style="margin-top:14px">
        <button class="btn btn-ghost btn-sm" onclick="animDone(${idx})">✅ Got it! +10 XP</button>
      </div>
    </div>`;
}

const RESUME_STEPS = [
  { highlight:'name', tip:'📋 Your name (big!), phone, professional email, LinkedIn, city' },
  { highlight:'summary', tip:'💬 2–3 sentences: who you are, what you bring, what you want' },
  { highlight:'skills', tip:'⚡ 6–10 skills. Mix hard skills (Excel) with soft skills (communication)' },
  { highlight:'exp', tip:'💼 Jobs, clubs, volunteer work. Use bullet points starting with action verbs' },
  { highlight:'edu', tip:'🎓 School name, graduation year, GPA if above 3.0' },
];

window.resumeStep = function(idx, step) {
  document.querySelectorAll(`[onclick^="resumeStep(${idx}"]`).forEach(b => b.classList.remove('active'));
  document.querySelectorAll(`[onclick="resumeStep(${idx},${step})"]`).forEach(b => b.classList.add('active'));
  const label = document.getElementById(`anim-step-label-${idx}`);
  if (label) label.textContent = `Step ${step+1}/5`;

  const bubble = document.getElementById(`abubble-${idx}`);
  if (bubble) { bubble.style.animation='none'; void bubble.offsetHeight; bubble.style.animation=''; bubble.textContent = RESUME_STEPS[step].tip; }

  // Highlight logic
  const allLines = [`rl-name-${idx}`,`rl-contact-${idx}`,`rl-sum1-${idx}`,`rl-sum2-${idx}`,`rl-exp1-${idx}`,`rl-exp2-${idx}`,`rl-exp3-${idx}`,`rl-edu1-${idx}`];
  allLines.forEach(id => { const el = document.getElementById(id); if(el) el.style.background = 'var(--border)'; });

  function hlLines(ids) { ids.forEach(id => { const el = document.getElementById(id); if(el) el.style.background = 'var(--accent)'; }); }
  const h = RESUME_STEPS[step].highlight;
  if (h==='name') hlLines([`rl-name-${idx}`,`rl-contact-${idx}`]);
  if (h==='summary') {
    [`rl-sumhdr-${idx}`,`rl-sum1-${idx}`,`rl-sum2-${idx}`].forEach(id=>{const el=document.getElementById(id);if(el){el.style.opacity='1';el.style.width='90%';}});
    hlLines([`rl-sum1-${idx}`,`rl-sum2-${idx}`]);
  }
  if (h==='skills') {
    const sklHdr = document.getElementById(`rl-sklhdr-${idx}`);
    if(sklHdr) sklHdr.style.opacity='1';
    const skillsEl = document.getElementById(`rl-skills-${idx}`);
    if(skillsEl && !skillsEl.children.length) {
      ['HTML','Excel','Canva','Teamwork','Communication'].forEach(sk=>{
        const span=document.createElement('span');
        span.style.cssText='background:var(--accent);color:#fff;font-size:.55rem;padding:2px 5px;border-radius:3px;font-weight:700;';
        span.textContent=sk;
        skillsEl.appendChild(span);
      });
    }
  }
  if (h==='exp') {
    [`rl-exphdr-${idx}`,`rl-exp1-${idx}`,`rl-exp2-${idx}`,`rl-exp3-${idx}`].forEach(id=>{const el=document.getElementById(id);if(el){el.style.opacity='1';el.style.width='88%';}});
    hlLines([`rl-exp1-${idx}`,`rl-exp2-${idx}`,`rl-exp3-${idx}`]);
  }
  if (h==='edu') {
    [`rl-eduhdr-${idx}`,`rl-edu1-${idx}`].forEach(id=>{const el=document.getElementById(id);if(el){el.style.opacity='1';el.style.width='65%';}});
    hlLines([`rl-edu1-${idx}`]);
  }
};

/* Interview dos/don'ts */
function buildInterviewDsDonts(idx) {
  const items = [
    { type:'good', icon:'💪', text:'Arrive 10–15 min early and greet warmly' },
    { type:'bad',  icon:'📱', text:'Look at your phone during the interview' },
    { type:'good', icon:'👁',  text:'Maintain eye contact and smile naturally' },
    { type:'bad',  icon:'😤', text:'Badmouth your previous employer' },
    { type:'good', icon:'❓', text:'Ask thoughtful questions about the role' },
    { type:'bad',  icon:'💰', text:'Ask about salary in the first question' },
    { type:'good', icon:'📧', text:'Send a thank-you email within 24 hours' },
    { type:'bad',  icon:'🤷', text:'Show up without knowing anything about the company' },
  ];
  return `
    <div>
      <div class="anim-items" id="anim-items-${idx}" style="max-width:100%">
        ${items.map((it,i)=>`
          <div class="anim-item ${it.type}" id="ai-${idx}-${i}" style="transition-delay:${i*0.08}s">
            <span class="anim-item-icon">${it.icon}</span>
            <span style="flex:1">${it.text}</span>
          </div>`).join('')}
      </div>
      <div class="anim-controls" style="margin-top:16px">
        <button class="anim-btn active" onclick="showAllItems(${idx})">▶ Show All</button>
        <button class="anim-btn" onclick="showGoodOnly(${idx})">✅ Dos Only</button>
        <button class="anim-btn" onclick="showBadOnly(${idx})">❌ Don'ts Only</button>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="animDone(${idx})">Got it! +10 XP</button>
      </div>
    </div>`;
}

window.showAllItems = function(idx) {
  document.querySelectorAll(`#anim-items-${idx} .anim-item`).forEach(el => { el.style.display='flex'; setTimeout(()=>el.classList.add('visible'),50); });
};
window.showGoodOnly = function(idx) {
  document.querySelectorAll(`#anim-items-${idx} .anim-item`).forEach(el => {
    el.style.display = el.classList.contains('good') ? 'flex' : 'none';
    if(el.classList.contains('good')) setTimeout(()=>el.classList.add('visible'),50);
  });
};
window.showBadOnly = function(idx) {
  document.querySelectorAll(`#anim-items-${idx} .anim-item`).forEach(el => {
    el.style.display = el.classList.contains('bad') ? 'flex' : 'none';
    if(el.classList.contains('bad')) setTimeout(()=>el.classList.add('visible'),50);
  });
};

/* STAR method */
function buildStarMethod(idx) {
  const steps = [
    { letter:'S', word:'Situation', color:'var(--accent)', desc:'Set the scene. "I was working on a group project when..."' },
    { letter:'T', word:'Task', color:'var(--accent2)', desc:'What was YOUR responsibility? "My job was to organize the presentation..."' },
    { letter:'A', word:'Action', color:'var(--success)', desc:'What did YOU do specifically? "I created a shared doc and held 3 check-ins..."' },
    { letter:'R', word:'Result', color:'var(--warning)', desc:'What happened? Use numbers if possible! "We got an A and our teacher used our work as an example."' },
  ];
  return `
    <div>
      <div class="anim-stage" style="flex-direction:column;gap:12px;min-height:180px" id="anim-${idx}">
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center" id="star-circles-${idx}">
          ${steps.map((s,i)=>`
            <div id="star-c-${idx}-${i}" onclick="starStep(${idx},${i})" style="width:70px;height:70px;border-radius:50%;background:var(--bg-card);border:2px solid var(--border);display:grid;place-items:center;flex-direction:column;cursor:pointer;transition:.3s;">
              <div style="font-size:1.5rem;font-weight:900;color:${s.color};font-family:var(--font-display)">${s.letter}</div>
            </div>`).join('')}
        </div>
        <div class="anim-bubble" id="star-bubble-${idx}" style="text-align:center">👆 Click each letter to see how to use the STAR method</div>
      </div>
      <div class="anim-controls">
        ${steps.map((s,i)=>`<button class="anim-btn" onclick="starStep(${idx},${i})">${s.letter} — ${s.word}</button>`).join('')}
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="animDone(${idx})">Got it! +10 XP</button>
      </div>
    </div>`;
}

window.starStep = function(idx, step) {
  const steps = [
    { letter:'S', word:'Situation', color:'var(--accent)', desc:'Set the scene. "I was working on a group project when my teammate dropped out last minute..."' },
    { letter:'T', word:'Task', color:'var(--accent2)', desc:'What was YOUR responsibility? "My job was to cover their part AND still hit our deadline..."' },
    { letter:'A', word:'Action', color:'var(--success)', desc:'What did YOU do? "I stayed 2 extra hours, rewrote the section, and coordinated with the rest of the team..."' },
    { letter:'R', word:'Result', color:'var(--warning)', desc:'What happened? Numbers = power! "We still submitted on time, got an A, and our teacher praised the work."' },
  ];
  const s = steps[step];
  const bubble = document.getElementById(`star-bubble-${idx}`);
  if(bubble) { bubble.style.animation='none'; void bubble.offsetHeight; bubble.style.animation=''; bubble.innerHTML = `<strong style="color:${s.color}">${s.letter} = ${s.word}:</strong><br>${s.desc}`; }
  for(let i=0;i<4;i++) {
    const c = document.getElementById(`star-c-${idx}-${i}`);
    if(c) c.style.borderColor = i===step ? s.color : 'var(--border)';
  }
};

/* Paycheck breakdown */
function buildPaycheckAnim(idx) {
  return `
    <div>
      <div class="anim-stage" style="flex-direction:column;gap:16px" id="anim-${idx}">
        <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-display)">Your $600 Paycheck</div>
        <div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:360px">
          ${[
            {label:'Gross Pay (earned)',pct:100,color:'var(--success)',amount:'$600'},
            {label:'Federal Income Tax (~10%)',pct:10,color:'var(--danger)',amount:'-$60'},
            {label:'FICA / Social Security (7.65%)',pct:7.65,color:'var(--warning)',amount:'-$46'},
            {label:'State Tax (NY ~4%)',pct:4,color:'#F87171',amount:'-$24'},
            {label:'NET PAY (take-home)',pct:78.35,color:'var(--accent)',amount:'≈ $470'},
          ].map((r,i)=>`
            <div>
              <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:3px">
                <span style="color:var(--text-secondary)">${r.label}</span>
                <span style="font-weight:700;color:${r.color}">${r.amount}</span>
              </div>
              <div style="height:12px;background:var(--bg-overlay);border-radius:6px;overflow:hidden">
                <div id="pbar-${idx}-${i}" style="height:100%;background:${r.color};border-radius:6px;width:0;transition:width .8s ${i*0.15}s ease"></div>
              </div>
            </div>`).join('')}
        </div>
      </div>
      <div class="anim-controls">
        <button class="anim-btn active" onclick="runPaycheckAnim(${idx})">▶ Animate!</button>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="animDone(${idx})">Got it! +10 XP</button>
      </div>
    </div>`;
}

const PAYCHECK_PCTS = [100, 10, 7.65, 4, 78.35];
window.runPaycheckAnim = function(idx) {
  PAYCHECK_PCTS.forEach((pct, i) => {
    const el = document.getElementById(`pbar-${idx}-${i}`);
    if(el) { el.style.width='0'; setTimeout(()=>{ el.style.width = pct+'%'; }, 50); }
  });
};

/* Budget 50/30/20 */
function buildBudgetAnim(idx) {
  const categories = [
    { label:'Needs', pct:50, color:'var(--accent)', desc:'Rent, food, transport, utilities', examples:'🏠🚇🍔💡' },
    { label:'Wants', pct:30, color:'var(--accent2)', desc:'Entertainment, clothes, eating out', examples:'🎬👟🍕🎮' },
    { label:'Savings', pct:20, color:'var(--success)', desc:'Emergency fund, future goals', examples:'🏦💰🎓✈️' },
  ];
  return `
    <div>
      <div class="anim-stage" style="flex-direction:column;gap:16px" id="anim-${idx}">
        <div style="font-size:1rem;font-weight:700;color:var(--text-secondary)">For a $1,000/month take-home paycheck:</div>
        <div class="budget-bars" id="bbudget-${idx}" style="align-items:flex-end;justify-content:center">
          ${categories.map((c,i)=>`
            <div class="budget-bar-wrap">
              <div class="budget-bar-pct" style="color:${c.color}" id="bpct-${idx}-${i}">0%</div>
              <div class="budget-bar-col" id="bbar-${idx}-${i}" style="height:0;min-height:20px;background:${c.color};transition:height .8s ${i*0.2}s ease"></div>
              <div class="budget-bar-label" style="color:${c.color}">${c.label}<br>$${c.pct*10}/mo</div>
            </div>`).join('')}
        </div>
        <div id="budget-detail-${idx}" class="anim-bubble" style="max-width:100%;text-align:center">Click a bar or press Animate to see the breakdown!</div>
      </div>
      <div class="anim-controls">
        <button class="anim-btn active" onclick="runBudgetAnim(${idx})">▶ Animate!</button>
        ${categories.map((c,i)=>`<button class="anim-btn" onclick="showBudgetDetail(${idx},${i})">${c.label}</button>`).join('')}
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="animDone(${idx})">Got it! +10 XP</button>
      </div>
    </div>`;
}

const BUDGET_CATS = [
  { pct:50, desc:'🏠 <strong>Needs (50%)</strong><br>Rent, food, transport, utilities. These are non-negotiables.' },
  { pct:30, desc:'🎮 <strong>Wants (30%)</strong><br>Fun stuff! Entertainment, dining out, clothes, subscriptions.' },
  { pct:20, desc:'💰 <strong>Savings (20%)</strong><br>Emergency fund, college savings, future goals. Pay yourself first!' },
];
window.runBudgetAnim = function(idx) {
  const maxH = 100;
  BUDGET_CATS.forEach((c,i) => {
    const bar = document.getElementById(`bbar-${idx}-${i}`);
    const pct = document.getElementById(`bpct-${idx}-${i}`);
    if(bar) { bar.style.height='0'; setTimeout(()=>{ bar.style.height=(maxH*(c.pct/50))+'px'; },50); }
    if(pct) { pct.textContent = c.pct+'%'; }
  });
};
window.showBudgetDetail = function(idx, catIdx) {
  const el = document.getElementById(`budget-detail-${idx}`);
  if(el) { el.style.animation='none'; void el.offsetHeight; el.style.animation=''; el.innerHTML = BUDGET_CATS[catIdx].desc; }
};

/* Cover letter structure */
function buildCoverLetterAnim(idx) {
  const parts = [
    { emoji:'👋', label:'Opening', desc:'Address by name if possible. State the role and ONE sentence on why you\'re excited about this specific company.', color:'var(--accent)' },
    { emoji:'💼', label:'Your Value', desc:'What can YOU bring? 2–3 sentences linking your skills/experience to what they need. Use their job description keywords!', color:'var(--accent2)' },
    { emoji:'🔥', label:'Why Them?', desc:'Show you did your homework. Mention something specific about the company culture, mission, or a recent project you admire.', color:'var(--success)' },
    { emoji:'🚀', label:'Call to Action', desc:'Express enthusiasm, ask for an interview, and thank them. "I\'d love to discuss how I can contribute — thank you for your time!"', color:'var(--warning)' },
  ];
  return `
    <div>
      <div class="anim-stage" style="flex-direction:column;gap:10px;padding:16px" id="anim-${idx}">
        ${parts.map((p,i)=>`
          <div id="clpart-${idx}-${i}" onclick="showClPart(${idx},${i})" style="display:flex;gap:12px;align-items:flex-start;padding:10px 14px;border-radius:8px;border:1px solid var(--border);background:var(--bg-card);cursor:pointer;transition:.2s;opacity:0;transform:translateY(10px)">
            <span style="font-size:1.4rem">${p.emoji}</span>
            <div>
              <div style="font-weight:700;color:${p.color};margin-bottom:3px;font-size:.9rem">${p.label}</div>
              <div style="font-size:.8rem;color:var(--text-secondary);line-height:1.5;display:none" id="cltext-${idx}-${i}">${p.desc}</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="anim-controls">
        <button class="anim-btn active" onclick="runCLAnim(${idx})">▶ Build It!</button>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="animDone(${idx})">Got it! +10 XP</button>
      </div>
    </div>`;
}

window.runCLAnim = function(idx) {
  for(let i=0;i<4;i++) {
    const el = document.getElementById(`clpart-${idx}-${i}`);
    if(el) setTimeout(()=>{ el.style.opacity='1'; el.style.transform='translateY(0)'; }, i*200);
  }
};
window.showClPart = function(idx, partIdx) {
  for(let i=0;i<4;i++) {
    const t = document.getElementById(`cltext-${idx}-${i}`);
    if(t) t.style.display = i===partIdx ? 'block' : 'none';
  }
};

/* Pro vs unprofessional */
function buildProVsUnpro(idx) {
  const items = [
    { pro:'Texts manager before being late: "Running 5 min late, on my way!"', unpro:'Walks in late, says nothing' },
    { pro:'Listens fully before responding in meetings', unpro:'Interrupts colleagues mid-sentence' },
    { pro:'Dresses appropriately and looks put-together', unpro:'Shows up in wrinkled clothes or pajamas' },
    { pro:'Takes notes during training and asks smart questions', unpro:'Checks phone during onboarding' },
  ];
  return `
    <div>
      <div class="anim-stage" style="flex-direction:column;gap:0;padding:0;background:transparent" id="anim-${idx}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;width:100%">
          <div style="padding:12px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);border-radius:8px 0 0 8px">
            <div style="font-weight:800;color:var(--success);margin-bottom:10px;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">✅ Professional</div>
            ${items.map((it,i)=>`<div id="propro-${idx}-${i}" style="padding:8px;border-radius:6px;font-size:.82rem;color:var(--text-secondary);margin-bottom:6px;border:1px solid transparent;transition:.3s;cursor:pointer" onclick="hlProItem(${idx},${i})">${it.pro}</div>`).join('')}
          </div>
          <div style="padding:12px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.15);border-radius:0 8px 8px 0">
            <div style="font-weight:800;color:var(--danger);margin-bottom:10px;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">❌ Unprofessional</div>
            ${items.map((it,i)=>`<div id="prounpro-${idx}-${i}" style="padding:8px;border-radius:6px;font-size:.82rem;color:var(--text-secondary);margin-bottom:6px;border:1px solid transparent;transition:.3s">${it.unpro}</div>`).join('')}
          </div>
        </div>
      </div>
      <div class="anim-controls">
        <span style="font-size:.82rem;color:var(--text-muted)">Click any professional item to highlight the pair</span>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="animDone(${idx})">Got it! +10 XP</button>
      </div>
    </div>`;
}

window.hlProItem = function(idx, i) {
  for(let j=0;j<4;j++) {
    const pro = document.getElementById(`propro-${idx}-${j}`);
    const unpro = document.getElementById(`prounpro-${idx}-${j}`);
    if(pro) pro.style.background = j===i ? 'rgba(16,185,129,.15)' : '';
    if(unpro) unpro.style.background = j===i ? 'rgba(239,68,68,.12)' : '';
    if(pro) pro.style.borderColor = j===i ? 'rgba(16,185,129,.4)' : 'transparent';
    if(unpro) unpro.style.borderColor = j===i ? 'rgba(239,68,68,.3)' : 'transparent';
  }
};

window.animDone = function(idx) {
  if(!completedSections.has(idx)) {
    markSectionComplete(idx);
    addXp(10, 'Animation completed!');
    showToast('Section done! +10 XP 🎬', 'success');
  }
  const btn = document.querySelector(`[data-section="${idx}"] .section-body button:last-child`);
  if(btn) { btn.textContent = '✓ Done'; btn.disabled = true; }
};

/* ══════════════════════════════════════════
   GAME SECTIONS
══════════════════════════════════════════ */
function renderGameSection(s, idx) {
  let gameHTML = '';
  const cfg = s.config;
  switch(s.gameType) {
    case 'quiz':     gameHTML = buildQuizGame(cfg, idx, s.xpBonus); break;
    case 'dragdrop': gameHTML = buildDragDropGame(cfg, idx, s.xpBonus); break;
    case 'salary':   gameHTML = buildSalaryGame(cfg, idx, s.xpBonus); break;
    case 'scramble': gameHTML = buildScrambleGame(cfg, idx, s.xpBonus); break;
    default: gameHTML = '<p>Game loading...</p>';
  }
  return `
    <div class="section-card" data-section="${idx}">
      <div class="section-header" data-collapse="${idx}">
        <span class="section-icon">${s.icon}</span>
        <span class="section-label">${s.label}</span>
        <span class="section-badge">+${s.xpBonus} XP</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="collapse-chevron" style="transition:.2s;color:var(--text-muted)"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="section-body" id="section-body-${idx}">
        <div class="game-container">${gameHTML}</div>
      </div>
    </div>`;
}

/* ── QUIZ GAME ── */
function buildQuizGame(cfg, sIdx, xpBonus) {
  const state = { q: 0, score: 0, answered: false };
  window[`quizState_${sIdx}`] = state;
  window[`quizCfg_${sIdx}`] = cfg;

  function renderQ(qIdx) {
    const q = cfg.questions[qIdx];
    return `
      <div class="game-header">
        <span class="game-title">❓ Knowledge Check</span>
        <span class="game-score">Score: <span id="qscore-${sIdx}">0</span>/${cfg.questions.length}</span>
      </div>
      <div class="quiz-question" id="qq-${sIdx}">${q.q}</div>
      <div class="quiz-options" id="qopts-${sIdx}">
        ${q.options.map((o,i)=>`<button class="quiz-opt" onclick="quizAnswer(${sIdx},${i})">${o}</button>`).join('')}
      </div>
      <div class="quiz-feedback" id="qfb-${sIdx}"></div>
      <div class="quiz-nav">
        <button class="btn btn-primary btn-sm" id="qnext-${sIdx}" style="display:none" onclick="quizNext(${sIdx})">Next →</button>
        <span class="quiz-progress" id="qprog-${sIdx}">${qIdx+1} / ${cfg.questions.length}</span>
      </div>`;
  }

  const id = `qgame-${sIdx}`;
  setTimeout(() => {
    const el = document.getElementById(id);
    if(el) el.innerHTML = renderQ(0);
  }, 100);
  return `<div id="${id}">${renderQ(0)}</div>`;
}

window.quizAnswer = function(sIdx, optIdx) {
  const state = window[`quizState_${sIdx}`];
  const cfg = window[`quizCfg_${sIdx}`];
  if(state.answered) return;
  state.answered = true;

  const q = cfg.questions[state.q];
  const opts = document.querySelectorAll(`#qopts-${sIdx} .quiz-opt`);
  opts.forEach(o => o.classList.add('disabled'));
  opts[optIdx].classList.add(optIdx === q.correct ? 'correct' : 'wrong');
  opts[q.correct].classList.add('correct');

  const fb = document.getElementById(`qfb-${sIdx}`);
  if(fb) {
    fb.classList.add('show', optIdx === q.correct ? 'correct' : 'wrong');
    fb.textContent = q.explanation;
  }
  if(optIdx === q.correct) state.score++;
  const scoreEl = document.getElementById(`qscore-${sIdx}`);
  if(scoreEl) scoreEl.textContent = state.score;

  const nextBtn = document.getElementById(`qnext-${sIdx}`);
  if(nextBtn) nextBtn.style.display='inline-flex';
};

window.quizNext = function(sIdx) {
  const state = window[`quizState_${sIdx}`];
  const cfg = window[`quizCfg_${sIdx}`];
  state.q++;
  state.answered = false;

  if(state.q >= cfg.questions.length) {
    const el = document.getElementById(`qgame-${sIdx}`);
    const pct = Math.round((state.score / cfg.questions.length) * 100);
    const xpEarned = state.score > 0 ? Math.round((state.score / cfg.questions.length) * (window[`quizXp_${sIdx}`] || 30)) : 0;
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '📚';
    if(el) el.innerHTML = `
      <div class="game-result show">
        <div class="result-emoji">${emoji}</div>
        <div class="result-text">${pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Great job!' : 'Keep learning!'}</div>
        <div class="result-sub">You got ${state.score}/${cfg.questions.length} correct (${pct}%)</div>
        <div class="xp-earned-badge">⭐ +${xpEarned} XP earned</div><br>
        <button class="btn btn-ghost btn-sm" onclick="retryQuiz(${sIdx})">🔁 Retry</button>
      </div>`;
    if(!completedSections.has(sIdx)) { markSectionComplete(sIdx); addXp(xpEarned, 'Quiz complete!'); }
    return;
  }

  const el = document.getElementById(`qgame-${sIdx}`);
  const q = cfg.questions[state.q];
  if(el) el.innerHTML = `
    <div class="game-header">
      <span class="game-title">❓ Knowledge Check</span>
      <span class="game-score">Score: ${state.score}/${cfg.questions.length}</span>
    </div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="qopts-${sIdx}">
      ${q.options.map((o,i)=>`<button class="quiz-opt" onclick="quizAnswer(${sIdx},${i})">${o}</button>`).join('')}
    </div>
    <div class="quiz-feedback" id="qfb-${sIdx}"></div>
    <div class="quiz-nav">
      <button class="btn btn-primary btn-sm" id="qnext-${sIdx}" style="display:none" onclick="quizNext(${sIdx})">Next →</button>
      <span class="quiz-progress">${state.q+1} / ${cfg.questions.length}</span>
    </div>`;
};

window.retryQuiz = function(sIdx) {
  const state = window[`quizState_${sIdx}`];
  const cfg = window[`quizCfg_${sIdx}`];
  state.q = 0; state.score = 0; state.answered = false;
  const el = document.getElementById(`qgame-${sIdx}`);
  const q = cfg.questions[0];
  if(el) el.innerHTML = `
    <div class="game-header">
      <span class="game-title">❓ Knowledge Check</span>
      <span class="game-score">Score: <span id="qscore-${sIdx}">0</span>/${cfg.questions.length}</span>
    </div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="qopts-${sIdx}">
      ${q.options.map((o,i)=>`<button class="quiz-opt" onclick="quizAnswer(${sIdx},${i})">${o}</button>`).join('')}
    </div>
    <div class="quiz-feedback" id="qfb-${sIdx}"></div>
    <div class="quiz-nav">
      <button class="btn btn-primary btn-sm" id="qnext-${sIdx}" style="display:none" onclick="quizNext(${sIdx})">Next →</button>
      <span class="quiz-progress">1 / ${cfg.questions.length}</span>
    </div>`;
};

/* ── DRAG-DROP GAME ── */
function buildDragDropGame(cfg, sIdx, xpBonus) {
  const state = { placed: {}, attempts: 0, correct: 0 };
  window[`ddState_${sIdx}`] = state;
  window[`ddCfg_${sIdx}`] = cfg;

  return `
    <div class="dragdrop-game" id="ddgame-${sIdx}">
      <div style="font-size:.9rem;color:var(--text-secondary);margin-bottom:4px">${cfg.instruction}</div>
      <div class="drag-items" id="drag-bank-${sIdx}">
        ${cfg.items.map(item=>`
          <div class="drag-item" draggable="true" data-id="${item.id}" data-correct="${item.correct}" id="di-${sIdx}-${item.id}"
               ondragstart="ddDragStart(event,'${sIdx}','${item.id}')"
               onclick="ddClickItem(event,'${sIdx}','${item.id}')">${item.text}</div>`).join('')}
      </div>
      <div class="drop-zones">
        ${cfg.zones.map(zone=>`
          <div class="drop-zone" id="dz-${sIdx}-${zone.id}"
               ondragover="event.preventDefault();this.classList.add('dragover')"
               ondragleave="this.classList.remove('dragover')"
               ondrop="ddDrop(event,'${sIdx}','${zone.id}')" data-zone="${zone.id}">
            <div class="drop-zone-label">${zone.label}</div>
            <div class="dropped-items" id="dropped-${sIdx}-${zone.id}"></div>
            <div style="font-size:.78rem;color:var(--text-muted)" id="dz-empty-${sIdx}-${zone.id}">${zone.emptyText}</div>
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;align-items:center">
        <button class="btn btn-primary btn-sm" onclick="ddCheck(${sIdx})">Check Answers</button>
        <button class="btn btn-ghost btn-sm" onclick="ddReset(${sIdx})">🔁 Reset</button>
        <span style="font-size:.8rem;color:var(--text-muted)" id="dd-score-${sIdx}"></span>
      </div>
    </div>`;
}

let ddDragging = null;
window.ddDragStart = function(e, sIdx, itemId) {
  ddDragging = { sIdx, itemId };
  e.dataTransfer.setData('text/plain', `${sIdx}::${itemId}`);
};

window.ddClickItem = function(e, sIdx, itemId) {
  const el = document.getElementById(`di-${sIdx}-${itemId}`);
  if(el && el.classList.contains('placed')) return;
  // Highlight to show it's selected (for keyboard users / touch)
  document.querySelectorAll(`#drag-bank-${sIdx} .drag-item`).forEach(d => d.style.boxShadow = '');
  if(el) el.style.boxShadow = '0 0 0 2px var(--accent)';
  ddDragging = { sIdx, itemId };
};

window.ddDrop = function(e, sIdx, zoneId) {
  e.preventDefault();
  const zone = document.getElementById(`dz-${sIdx}-${zoneId}`);
  if(zone) zone.classList.remove('dragover');
  if(!ddDragging || ddDragging.sIdx !== sIdx) return;

  const { itemId } = ddDragging;
  const itemEl = document.getElementById(`di-${sIdx}-${itemId}`);
  if(!itemEl || itemEl.classList.contains('placed')) return;

  itemEl.classList.add('placed');
  itemEl.style.boxShadow = '';

  const dropped = document.getElementById(`dropped-${sIdx}-${zoneId}`);
  const emptyMsg = document.getElementById(`dz-empty-${sIdx}-${zoneId}`);
  if(dropped) {
    const chip = document.createElement('div');
    chip.className = 'dropped-item';
    chip.textContent = itemEl.textContent;
    chip.dataset.itemId = itemId;
    chip.dataset.zone = zoneId;
    dropped.appendChild(chip);
  }
  if(emptyMsg) emptyMsg.style.display = 'none';

  const state = window[`ddState_${sIdx}`];
  state.placed[itemId] = zoneId;
  ddDragging = null;
};

window.ddCheck = function(sIdx) {
  const state = window[`ddState_${sIdx}`];
  const cfg = window[`ddCfg_${sIdx}`];
  let correct = 0, total = 0;

  cfg.items.forEach(item => {
    if(state.placed[item.id] !== undefined) {
      total++;
      if(state.placed[item.id] === item.correct) correct++;
    }
  });

  const scoreEl = document.getElementById(`dd-score-${sIdx}`);
  const pct = total > 0 ? Math.round((correct/total)*100) : 0;
  if(scoreEl) scoreEl.textContent = `${correct}/${total} correct (${pct}%)`;

  // Color the zones
  cfg.zones.forEach(z => {
    const zoneEl = document.getElementById(`dz-${sIdx}-${z.id}`);
    if(zoneEl) {
      const allCorrect = cfg.items.filter(i=>i.correct===z.id).every(i=>state.placed[i.id]===z.id);
      zoneEl.classList.toggle('correct-zone', allCorrect);
    }
  });

  if(correct === cfg.items.length && !completedSections.has(sIdx)) {
    markSectionComplete(sIdx);
    const xp = window[`ddXp_${sIdx}`] || 25;
    addXp(xp, 'Sorting game complete!');
    showToast(`Perfect! All ${cfg.items.length} items correct! +${xp} XP 🎯`, 'success');
  } else if(pct >= 70 && !completedSections.has(sIdx)) {
    markSectionComplete(sIdx);
    const xp = Math.round((window[`ddXp_${sIdx}`] || 25) * (pct/100));
    addXp(xp, `Sorting game done! ${pct}%`);
  }
};

window.ddReset = function(sIdx) {
  const cfg = window[`ddCfg_${sIdx}`];
  cfg.items.forEach(item => {
    const el = document.getElementById(`di-${sIdx}-${item.id}`);
    if(el) { el.classList.remove('placed'); el.style.boxShadow = ''; }
  });
  cfg.zones.forEach(zone => {
    const dropped = document.getElementById(`dropped-${sIdx}-${zone.id}`);
    const empty = document.getElementById(`dz-empty-${sIdx}-${zone.id}`);
    const zoneEl = document.getElementById(`dz-${sIdx}-${zone.id}`);
    if(dropped) dropped.innerHTML = '';
    if(empty) empty.style.display = 'block';
    if(zoneEl) { zoneEl.classList.remove('correct-zone','wrong-zone'); }
  });
  window[`ddState_${sIdx}`] = { placed:{}, attempts:0, correct:0 };
  const scoreEl = document.getElementById(`dd-score-${sIdx}`);
  if(scoreEl) scoreEl.textContent = '';
};

/* ── SALARY/SCENARIO GAME ── */
function buildSalaryGame(cfg, sIdx, xpBonus) {
  const state = { q: 0, score: 0 };
  window[`salState_${sIdx}`] = state;
  window[`salCfg_${sIdx}`] = cfg;
  window[`salXp_${sIdx}`] = xpBonus;

  function renderScenario(qIdx) {
    const sc = cfg.scenarios[qIdx];
    return `
      <div class="salary-game" id="sal-${sIdx}">
        <div class="game-header">
          <span class="game-title">${cfg.title}</span>
          <span class="game-score">${qIdx+1} / ${cfg.scenarios.length}</span>
        </div>
        <div class="salary-scenario">${sc.scenario}</div>
        <div class="salary-choices">
          ${sc.choices.map((c,i)=>`<button class="salary-choice" onclick="salAnswer(${sIdx},${i})" data-type="${c.type}">${c.text}</button>`).join('')}
        </div>
        <div style="display:none" id="sal-fb-${sIdx}"></div>
        <div style="margin-top:12px;display:none" id="sal-next-${sIdx}">
          <button class="btn btn-primary btn-sm" onclick="salNext(${sIdx})">Next Scenario →</button>
        </div>
      </div>`;
  }

  return renderScenario(0);
}

window.salAnswer = function(sIdx, choiceIdx) {
  const state = window[`salState_${sIdx}`];
  const cfg = window[`salCfg_${sIdx}`];
  const sc = cfg.scenarios[state.q];
  const choice = sc.choices[choiceIdx];

  document.querySelectorAll(`#sal-${sIdx} .salary-choice`).forEach((btn,i) => {
    btn.classList.add('disabled');
    btn.classList.add(sc.choices[i].type === 'best' ? 'best' : sc.choices[i].type === 'ok' ? 'ok' : 'bad');
  });

  const fb = document.getElementById(`sal-fb-${sIdx}`);
  if(fb) {
    fb.style.display='block';
    fb.style.cssText='display:block;margin-top:12px;padding:12px 16px;border-radius:8px;font-size:.88rem;line-height:1.6;background:var(--bg-elevated);border:1px solid var(--border)';
    fb.textContent = choice.feedback;
  }
  if(choice.type === 'best') state.score++;

  const next = document.getElementById(`sal-next-${sIdx}`);
  if(next) next.style.display = 'block';
};

window.salNext = function(sIdx) {
  const state = window[`salState_${sIdx}`];
  const cfg = window[`salCfg_${sIdx}`];
  state.q++;

  if(state.q >= cfg.scenarios.length) {
    const container = document.querySelector(`[data-section="${sIdx}"] .game-container`);
    const xp = window[`salXp_${sIdx}`] || 30;
    const earned = Math.round(xp * (state.score / cfg.scenarios.length + 0.5));
    if(container) container.innerHTML = `
      <div class="game-result show">
        <div class="result-emoji">${state.score === cfg.scenarios.length ? '🏆' : '💪'}</div>
        <div class="result-text">${state.score === cfg.scenarios.length ? 'Perfect Responses!' : 'Great Thinking!'}</div>
        <div class="result-sub">You chose the best answer ${state.score}/${cfg.scenarios.length} times</div>
        <div class="xp-earned-badge">⭐ +${earned} XP earned</div>
      </div>`;
    if(!completedSections.has(sIdx)) { markSectionComplete(sIdx); addXp(earned, 'Simulator complete!'); }
    return;
  }

  // Render next scenario
  const sc = cfg.scenarios[state.q];
  const container = document.querySelector(`[data-section="${sIdx}"] .game-container`);
  if(container) container.innerHTML = `
    <div class="salary-game" id="sal-${sIdx}">
      <div class="game-header">
        <span class="game-title">${cfg.title}</span>
        <span class="game-score">${state.q+1} / ${cfg.scenarios.length}</span>
      </div>
      <div class="salary-scenario">${sc.scenario}</div>
      <div class="salary-choices">
        ${sc.choices.map((c,i)=>`<button class="salary-choice" onclick="salAnswer(${sIdx},${i})" data-type="${c.type}">${c.text}</button>`).join('')}
      </div>
      <div style="display:none" id="sal-fb-${sIdx}"></div>
      <div style="margin-top:12px;display:none" id="sal-next-${sIdx}">
        <button class="btn btn-primary btn-sm" onclick="salNext(${sIdx})">Next Scenario →</button>
      </div>
    </div>`;
};

/* ── SCRAMBLE GAME ── */
function buildScrambleGame(cfg, sIdx, xpBonus) {
  const state = { q: 0, score: 0, total: cfg.words.length };
  window[`scrState_${sIdx}`] = state;
  window[`scrCfg_${sIdx}`] = cfg;
  window[`scrXp_${sIdx}`] = xpBonus;

  function renderWord(wIdx) {
    const w = cfg.words[wIdx];
    return `
      <div class="scramble-game" id="scr-${sIdx}">
        <div class="game-header">
          <span class="game-title">🔤 Career Vocab Scramble</span>
          <span class="game-score">${wIdx+1}/${state.total}</span>
        </div>
        <div class="scramble-word">${w.scrambled}</div>
        <div class="scramble-hint">💡 Hint: ${w.hint}</div>
        <input class="scramble-input" id="scr-input-${sIdx}" placeholder="TYPE YOUR ANSWER" maxlength="30"
               oninput="this.value=this.value.toUpperCase()"
               onkeydown="if(event.key==='Enter')checkScramble(${sIdx})"/>
        <div class="btns-row" style="margin-top:8px;justify-content:center">
          <button class="btn btn-primary btn-sm" onclick="checkScramble(${sIdx})">Check Answer</button>
          <button class="btn btn-ghost btn-sm" onclick="skipScramble(${sIdx})">Skip →</button>
        </div>
        <div style="font-size:.8rem;color:var(--text-muted);margin-top:8px" id="scr-fb-${sIdx}"></div>
      </div>`;
  }
  return renderWord(0);
}

window.checkScramble = function(sIdx) {
  const state = window[`scrState_${sIdx}`];
  const cfg = window[`scrCfg_${sIdx}`];
  const w = cfg.words[state.q];
  const input = document.getElementById(`scr-input-${sIdx}`);
  const fb = document.getElementById(`scr-fb-${sIdx}`);
  if(!input) return;

  const answer = input.value.trim().toUpperCase();
  if(answer === w.answer) {
    input.classList.add('correct');
    if(fb) fb.textContent = '✅ Correct! +5 XP';
    state.score++;
    addXp(5, 'Word unscrambled!');
    setTimeout(() => skipScramble(sIdx), 800);
  } else {
    input.classList.add('wrong');
    if(fb) fb.textContent = '❌ Not quite — try again!';
    setTimeout(() => { input.classList.remove('wrong'); input.value=''; if(fb) fb.textContent=''; }, 600);
  }
};

window.skipScramble = function(sIdx) {
  const state = window[`scrState_${sIdx}`];
  const cfg = window[`scrCfg_${sIdx}`];
  state.q++;

  if(state.q >= state.total) {
    const container = document.querySelector(`[data-section="${sIdx}"] .game-container`);
    const xp = window[`scrXp_${sIdx}`] || 20;
    const earned = Math.round(xp * (state.score / state.total));
    if(container) container.innerHTML = `
      <div class="game-result show">
        <div class="result-emoji">🔤</div>
        <div class="result-text">Vocab Master!</div>
        <div class="result-sub">You unscrambled ${state.score}/${state.total} words correctly</div>
        <div class="xp-earned-badge">⭐ +${earned} XP earned</div>
      </div>`;
    if(!completedSections.has(sIdx)) { markSectionComplete(sIdx); addXp(earned, 'Scramble complete!'); }
    return;
  }

  const container = document.querySelector(`[data-section="${sIdx}"] .game-container`);
  const w = cfg.words[state.q];
  if(container) container.innerHTML = `
    <div class="scramble-game" id="scr-${sIdx}">
      <div class="game-header">
        <span class="game-title">🔤 Career Vocab Scramble</span>
        <span class="game-score">${state.q+1}/${state.total}</span>
      </div>
      <div class="scramble-word">${w.scrambled}</div>
      <div class="scramble-hint">💡 Hint: ${w.hint}</div>
      <input class="scramble-input" id="scr-input-${sIdx}" placeholder="TYPE YOUR ANSWER" maxlength="30"
             oninput="this.value=this.value.toUpperCase()"
             onkeydown="if(event.key==='Enter')checkScramble(${sIdx})"/>
      <div class="btns-row" style="margin-top:8px;justify-content:center">
        <button class="btn btn-primary btn-sm" onclick="checkScramble(${sIdx})">Check Answer</button>
        <button class="btn btn-ghost btn-sm" onclick="skipScramble(${sIdx})">Skip →</button>
      </div>
      <div style="font-size:.8rem;color:var(--text-muted);margin-top:8px" id="scr-fb-${sIdx}"></div>
    </div>`;
};

/* ══════════════════════════════════════════
   FULL LESSON RENDERER
══════════════════════════════════════════ */
function renderLesson(lesson) {
  const layout = document.getElementById('lessonLayout');
  if (!layout) return;

  lessonSections = lesson.sections.length;
  completedSections = new Set();

  // Store quiz/game XP
  lesson.sections.forEach((s, idx) => {
    if(s.xpBonus) {
      window[`quizXp_${idx}`] = s.xpBonus;
      window[`ddXp_${idx}`] = s.xpBonus;
      window[`salXp_${idx}`] = s.xpBonus;
      window[`scrXp_${idx}`] = s.xpBonus;
    }
  });

  const isCompleted = xpState.completedLessons.includes(lesson.id);
  const alreadyDoneHTML = isCompleted ? `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.3);color:var(--success);padding:6px 14px;border-radius:99px;font-size:.82rem;font-weight:700;">✅ Completed — Replay for review</div>` : '';

  const sectionsHTML = lesson.sections.map((s, idx) => {
    switch(s.type) {
      case 'video':     return renderVideoSection(s, idx);
      case 'animation': return renderAnimationSection(s, idx);
      case 'checklist': return renderChecklistSection(s, idx);
      case 'terms':     return renderTermsSection(s, idx);
      case 'game':      return renderGameSection(s, idx);
      default: return '';
    }
  }).join('');

  // Next lessons
  const others = ALL_LESSONS_PREVIEW.filter(l => l.id !== lesson.id).slice(0, 4);

  layout.innerHTML = `
    <!-- Lesson Header -->
    <div class="lesson-header">
      <div class="lesson-meta-row">
        ${alreadyDoneHTML}
        <span class="lesson-tag cat">${lesson.category.toUpperCase()}</span>
        <span class="lesson-tag level-${lesson.level.toLowerCase().split(' ')[0]}">${lesson.level}</span>
      </div>
      <h1 class="lesson-title">${lesson.emoji} ${lesson.title}</h1>
      <p class="lesson-desc">${lesson.desc}</p>
      <div class="lesson-stats">
        <div class="lesson-stat"><span>⏱</span><strong>${lesson.duration}</strong></div>
        <div class="lesson-stat"><span>🎮</span><strong>${lesson.sections.filter(s=>s.type==='game').length} games</strong></div>
        <div class="lesson-stat"><span>🎬</span><strong>${lesson.sections.filter(s=>s.type==='animation').length} animations</strong></div>
        <div class="lesson-stat"><span>⭐</span><strong>Up to ${lesson.xpReward + lesson.sections.filter(s=>s.xpBonus).reduce((a,s)=>a+(s.xpBonus||0),0) + lesson.sections.filter(s=>['video','animation','checklist','terms'].includes(s.type)).length*10} XP</strong></div>
      </div>
    </div>

    <!-- Sections -->
    ${sectionsHTML}

    <!-- Completion Card -->
    <div class="completion-card" id="completionCard">
      <div class="completion-icon">🎓</div>
      <div class="completion-title">Complete This Lesson!</div>
      <div class="completion-sub">Work through the sections above, then click the button to claim your XP reward and mark this lesson done.</div>
      <div class="completion-xp">⭐ +${lesson.xpReward} XP Reward</div>
      <div>
        <button class="btn btn-primary" id="completeBtn" onclick="completeLesson(${lesson.id}, ${lesson.xpReward})">
          🚀 Complete Lesson &amp; Claim XP
        </button>
      </div>
    </div>

    <!-- Next Up -->
    <div>
      <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;margin-bottom:16px">Next Up →</h2>
      <div class="next-grid">
        ${others.map(l=>`
          <a class="next-card" href="lesson.html?id=${l.id}">
            <div class="next-emoji">${l.emoji}</div>
            <div class="next-title">${l.title}</div>
            <div class="next-meta">${l.duration} · ${l.level}</div>
            <div class="next-xp">⭐ +${l.xpReward} XP</div>
          </a>`).join('')}
      </div>
    </div>`;

  // Init collapsible sections
  initCollapsibles();

  // Trigger initial animations after render
  setTimeout(() => {
    lesson.sections.forEach((s, idx) => {
      if(s.animType === 'pro-vs-unpro') {
        // items start visible
      }
      if(s.animType === 'interview-dos-donts') {
        document.querySelectorAll(`#anim-items-${idx} .anim-item`).forEach((el,i) => {
          setTimeout(() => el.classList.add('visible'), i * 100);
        });
      }
    });
  }, 400);
}

/* ══════════════════════════════════════════
   COMPLETE LESSON
══════════════════════════════════════════ */
window.completeLesson = function(lessonId, xpReward) {
  const btn = document.getElementById('completeBtn');
  if(!xpState.completedLessons.includes(lessonId)) {
    xpState.completedLessons.push(lessonId);
    saveXpState();
    addXp(xpReward, 'Lesson complete!');
    if(btn) { btn.textContent = '✅ Completed!'; btn.disabled = true; btn.style.background = 'var(--success)'; }
    showToast(`Lesson complete! +${xpReward} XP earned 🎓`, 'success');
  } else {
    showToast('Already completed! XP awarded once per lesson.', 'info');
  }
};

/* ══════════════════════════════════════════
   COLLAPSIBLES
══════════════════════════════════════════ */
function initCollapsibles() {
  document.querySelectorAll('[data-collapse]').forEach(header => {
    header.addEventListener('click', () => {
      const idx = header.dataset.collapse;
      const body = document.getElementById(`section-body-${idx}`);
      const chevron = header.querySelector('.collapse-chevron');
      if(body) {
        body.classList.toggle('collapsed');
        if(chevron) chevron.style.transform = body.classList.contains('collapsed') ? 'rotate(-90deg)' : '';
      }
    });
  });
}

/* ══════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════ */
function initTheme() {
  const btn = document.getElementById('themeBtn');
  const html = document.documentElement;
  const saved = localStorage.getItem('lp-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  btn?.addEventListener('click', () => {
    const cur = html.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('lp-theme', next);
  });
}

/* ══════════════════════════════════════════
   AVATAR PANEL TOGGLE
══════════════════════════════════════════ */
function initAvatarPanel() {
  const pill = document.getElementById('xpPill');
  const panel = document.getElementById('avatarPanel');
  pill?.addEventListener('click', (e) => {
    e.stopPropagation();
    panel?.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if(panel && !panel.contains(e.target) && e.target !== pill) {
      panel.classList.remove('open');
    }
  });
}

/* ══════════════════════════════════════════
   BOOT
══════════════════════════════════════════ */
function boot() {
  initTheme();
  initAvatarPanel();
  updateAvatarUI();

  // Parse URL
  const params = new URLSearchParams(window.location.search);
  const lessonId = parseInt(params.get('id')) || 1;
  const lesson = LESSONS_DB.find(l => l.id === lessonId);

  if(!lesson) {
    document.getElementById('lessonLayout').innerHTML = `
      <div style="text-align:center;padding:60px 20px">
        <div style="font-size:3rem;margin-bottom:16px">😕</div>
        <h2 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:10px">Lesson Not Found</h2>
        <p style="color:var(--text-muted);margin-bottom:20px">Lesson #${lessonId} doesn't exist yet.</p>
        <a href="index.html" class="btn btn-primary">← Back to All Lessons</a>
      </div>`;
    return;
  }

  // Update page title
  document.title = `${lesson.title} — LaunchPad NYC`;
  const topbarTitle = document.getElementById('topbarTitle');
  if(topbarTitle) topbarTitle.textContent = lesson.title;

  renderLesson(lesson);
  updateLessonProgress();
}

document.addEventListener('DOMContentLoaded', boot);
