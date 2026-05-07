```javascript
// ===============================
// YOUTHCONNECT NYC - SCRIPT.JS
// ===============================

// -------------------------------
// MOBILE MENU TOGGLE
// -------------------------------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// -------------------------------
// DARK MODE TOGGLE
// -------------------------------
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Save Theme Preference
    const isLightMode = document.body.classList.contains('light-mode');

    localStorage.setItem(
      'theme',
      isLightMode ? 'light' : 'dark'
    );
  });
}

// Load Saved Theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
});

// -------------------------------
// SEARCH FUNCTIONALITY
// -------------------------------
const jobSearchInput = document.getElementById('jobSearch');

if (jobSearchInput) {
  jobSearchInput.addEventListener('keyup', () => {
    const searchValue = jobSearchInput.value.toLowerCase();

    console.log('Searching for:', searchValue);

    // Future API integration placeholder
  });
}

// -------------------------------
// ONBOARDING FORM
// -------------------------------
const onboardingForm = document.querySelector('.onboarding-form');

if (onboardingForm) {
  onboardingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formInputs = onboardingForm.querySelectorAll(
      'input, select'
    );

    const onboardingData = {};

    formInputs.forEach((input) => {
      onboardingData[input.placeholder || input.name] =
        input.value;
    });

    // Save onboarding data
    localStorage.setItem(
      'onboardingData',
      JSON.stringify(onboardingData)
    );

    alert(
      'Career preferences saved successfully!'
    );

    console.log(onboardingData);
  });
}

// -------------------------------
// PASSWORD VALIDATION
// -------------------------------
function validatePassword(password) {
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialRegex =
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  return (
    password.length >= minLength &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password) &&
    specialRegex.test(password)
  );
}

// Example Password Check
const examplePassword = 'Password123!';

console.log(
  'Password Valid:',
  validatePassword(examplePassword)
);

// -------------------------------
// AUTH BUTTONS
// -------------------------------
const signInBtn =
  document.querySelector('.signin-btn');

const joinBtn =
  document.querySelector('.join-btn');

if (signInBtn) {
  signInBtn.addEventListener('click', () => {
    alert('Open Sign In Modal');
  });
}

if (joinBtn) {
  joinBtn.addEventListener('click', () => {
    alert('Open Join Now Registration');
  });
}

// -------------------------------
// LESSON SYSTEM
// -------------------------------
const lessonButtons =
  document.querySelectorAll('.lesson-btn');

lessonButtons.forEach((button, index) => {
  button.addEventListener('click', () => {

    button.innerText = 'Lesson In Progress...';

    button.disabled = true;

    // Simulate Lesson Completion
    setTimeout(() => {

      button.innerText =
        'Lesson Completed ✓';

      // Save Progress
      saveLessonProgress(index);

      button.disabled = false;

    }, 3000);
  });
});

// Save Lesson Progress
function saveLessonProgress(lessonId) {

  let completedLessons =
    JSON.parse(
      localStorage.getItem('completedLessons')
    ) || [];

  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId);
  }

  localStorage.setItem(
    'completedLessons',
    JSON.stringify(completedLessons)
  );

  console.log(
    'Completed Lessons:',
    completedLessons
  );
}

// Load Lesson Progress
function loadLessonProgress() {

  const completedLessons =
    JSON.parse(
      localStorage.getItem('completedLessons')
    ) || [];

  lessonButtons.forEach((button, index) => {

    if (completedLessons.includes(index)) {

      button.innerText =
        'Lesson Completed ✓';
    }
  });
}

loadLessonProgress();

// -------------------------------
// RESUME UPLOAD SYSTEM
// -------------------------------
const uploadBtn =
  document.querySelector('.upload-btn');

if (uploadBtn) {

  uploadBtn.addEventListener('click', () => {

    const fileInput =
      document.createElement('input');

    fileInput.type = 'file';

    fileInput.accept =
      '.pdf,.doc,.docx';

    fileInput.click();

    fileInput.addEventListener(
      'change',
      () => {

        const file = fileInput.files[0];

        if (file) {

          localStorage.setItem(
            'resumeName',
            file.name
          );

          alert(
            `Resume Uploaded: ${file.name}`
          );

          console.log(
            'Uploaded Resume:',
            file.name
          );
        }
      }
    );
  });
}

// -------------------------------
// LUKE AI ASSISTANT
// -------------------------------
const sendBtn =
  document.getElementById('sendBtn');

const userInput =
  document.getElementById('userInput');

const chatBox =
  document.getElementById('chatBox');

const voiceBtn =
  document.getElementById('voiceBtn');

// Add Chat Message
function addMessage(message, sender) {

  const messageDiv =
    document.createElement('div');

  messageDiv.classList.add('message');

  if (sender === 'user') {
    messageDiv.classList.add('user-message');
  } else {
    messageDiv.classList.add('bot-message');
  }

  messageDiv.innerText = message;

  chatBox.appendChild(messageDiv);

  chatBox.scrollTop =
    chatBox.scrollHeight;
}

// Text-to-Speech
function speakResponse(text) {

  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = 'en-US';
  speech.pitch = 1;
  speech.rate = 1;
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}

// AI Logic
function generateLukeResponse(userMessage) {

  const message =
    userMessage.toLowerCase();

  // Resume Help
  if (
    message.includes('resume')
  ) {
    return (
      'Your resume should include your skills, experience, achievements, and contact information.'
    );
  }

  // Interview Help
  if (
    message.includes('interview')
  ) {
    return (
      'Practice speaking confidently and prepare examples of teamwork and leadership experiences.'
    );
  }

  // Job Search Help
  if (
    message.includes('job')
  ) {
    return (
      'I recommend exploring internships and part-time jobs in retail, technology, and customer service.'
    );
  }

  // Lesson Help
  if (
    message.includes('lesson')
  ) {
    return (
      'You can continue your career lessons in the Learning Center section.'
    );
  }

  // Default Response
  return (
    'I am Luke, your AI career assistant. Ask me about resumes, interviews, jobs, or lessons.'
  );
}

// Send Chat Message
function handleSendMessage() {

  const message =
    userInput.value.trim();

  if (message === '') return;

  addMessage(message, 'user');

  const response =
    generateLukeResponse(message);

  setTimeout(() => {

    addMessage(response, 'bot');

    speakResponse(response);

  }, 600);

  userInput.value = '';
}

// Button Click
if (sendBtn) {

  sendBtn.addEventListener(
    'click',
    handleSendMessage
  );
}

// Press Enter
if (userInput) {

  userInput.addEventListener(
    'keypress',
    (e) => {

      if (e.key === 'Enter') {
        handleSendMessage();
      }
    }
  );
}

// -------------------------------
// VOICE RECOGNITION
// -------------------------------
const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {

  const recognition =
    new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  if (voiceBtn) {

    voiceBtn.addEventListener(
      'click',
      () => {

        recognition.start();

        addMessage(
          'Listening...',
          'bot'
        );
      }
    );
  }

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    userInput.value = transcript;

    handleSendMessage();
  };

  recognition.onerror = () => {

    addMessage(
      'Voice recognition failed. Please try again.',
      'bot'
    );
  };

} else {

  console.warn(
    'Speech Recognition not supported'
  );

  if (voiceBtn) {
    voiceBtn.style.display = 'none';
  }
}

// -------------------------------
// DASHBOARD PROGRESS
// -------------------------------
function updateDashboardProgress() {

  const completedLessons =
    JSON.parse(
      localStorage.getItem(
        'completedLessons'
      )
    ) || [];

  const progressBar =
    document.querySelector(
      '.dashboard-progress'
    );

  if (progressBar) {

    const progressPercent =
      Math.min(
        completedLessons.length * 20,
        100
      );

    progressBar.style.width =
      `${progressPercent}%`;
  }
}

updateDashboardProgress();

// -------------------------------
// FAKE JOB DATA
// -------------------------------
const jobs = [
  {
    title: 'Retail Associate',
    borough: 'Manhattan'
  },
  {
    title: 'Marketing Intern',
    borough: 'Brooklyn'
  },
  {
    title: 'Customer Service Rep',
    borough: 'Queens'
  },
  {
    title: 'Graphic Design Intern',
    borough: 'Bronx'
  }
];

console.log('Available Jobs:', jobs);

// -------------------------------
// SAVE USER SETTINGS
// -------------------------------
function saveUserSetting(key, value) {

  localStorage.setItem(key, value);

  console.log(
    `Saved Setting: ${key} = ${value}`
  );
}

// Example Usage
saveUserSetting(
  'notifications',
  'enabled'
);

// -------------------------------
// APP INITIALIZATION
// -------------------------------
function initializeApp() {

  console.log(
    'YouthConnect NYC Loaded Successfully'
  );

  console.log(
    'Luke AI Assistant Activated'
  );

  console.log(
    'Lesson Tracking Ready'
  );

  console.log(
    'Voice Recognition Enabled'
  );
}

initializeApp();
```
