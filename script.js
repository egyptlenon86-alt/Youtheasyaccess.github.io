/**
 * YOUTHCONNECT NYC - Core Application Script
 * Handles: Navigation, Theme, Onboarding, AI Assistant, and Lessons
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupNavigation();
    setupTheme();
    setupSearch();
    setupOnboarding();
    setupAuth();
    setupLessons();
    setupResumeUpload();
    setupLukeAI();
    console.log('🚀 YouthConnect NYC: Fully Initialized');
}

// --- 1. NAVIGATION & UI ---
function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });
    }
}

// --- 2. THEME MANAGEMENT ---
function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme on load
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
}

// --- 3. SEARCH & JOBS ---
function setupSearch() {
    const jobSearchInput = document.getElementById('jobSearch');
    if (!jobSearchInput) return;

    jobSearchInput.addEventListener('keyup', (e) => {
        const query = e.target.value.toLowerCase();
        // Placeholder for future logic: filterJobCards(query);
        console.log(`Filtering for: ${query}`);
    });
}

// --- 4. ONBOARDING & STORAGE ---
function setupOnboarding() {
    const onboardingForm = document.querySelector('.onboarding-form');
    if (!onboardingForm) return;

    onboardingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(onboardingForm);
        const data = Object.fromEntries(formData.entries());

        localStorage.setItem('onboardingData', JSON.stringify(data));
        alert('Career preferences saved successfully!');
    });
}

// --- 5. AUTHENTICATION PLACEHOLDERS ---
function setupAuth() {
    const signInBtn = document.querySelector('.signin-btn');
    const joinBtn = document.querySelector('.join-btn');

    signInBtn?.addEventListener('click', () => alert('Opening Sign In...'));
    joinBtn?.addEventListener('click', () => alert('Opening Registration...'));
}

// --- 6. LESSON SYSTEM ---
function setupLessons() {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    if (lessonButtons.length === 0) return;

    const getCompleted = () => JSON.parse(localStorage.getItem('completedLessons')) || [];

    const updateUI = () => {
        const completed = getCompleted();
        lessonButtons.forEach((btn, index) => {
            if (completed.includes(index)) {
                btn.innerText = 'Lesson Completed ✓';
                btn.classList.add('completed');
            }
        });
        updateProgressBar(completed.length);
    };

    lessonButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            btn.disabled = true;
            btn.innerText = 'Processing...';

            setTimeout(() => {
                const completed = getCompleted();
                if (!completed.includes(index)) completed.push(index);
                localStorage.setItem('completedLessons', JSON.stringify(completed));
                
                btn.disabled = false;
                updateUI();
            }, 1500);
        });
    });

    updateUI();
}

function updateProgressBar(count) {
    const progressBar = document.querySelector('.dashboard-progress');
    if (progressBar) {
        const progress = Math.min(count * 20, 100);
        progressBar.style.width = `${progress}%`;
    }
}

// --- 7. RESUME UPLOAD ---
function setupResumeUpload() {
    const uploadBtn = document.querySelector('.upload-btn');
    if (!uploadBtn) return;

    uploadBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                localStorage.setItem('resumeName', file.name);
                alert(`Uploaded: ${file.name}`);
            }
        };
        input.click();
    });
}

// --- 8. LUKE AI ASSISTANT ---
function setupLukeAI() {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const voiceBtn = document.getElementById('voiceBtn');

    if (!sendBtn || !userInput || !chatBox) return;

    const addMessage = (text, sender) => {
        const msg = document.createElement('div');
        msg.className = `message ${sender}-message`;
        msg.textContent = text;
        chatBox.appendChild(msg);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const getLukeResponse = (msg) => {
        const input = msg.toLowerCase();
        if (input.includes('resume')) return 'Include your skills and achievements!';
        if (input.includes('interview')) return 'Confidence is key! Prepare specific examples.';
        if (input.includes('job')) return 'Look into tech and retail internships in NYC.';
        return "I'm Luke! Ask me about resumes, jobs, or lessons.";
    };

    const handleSend = () => {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        setTimeout(() => {
            const response = getLukeResponse(text);
            addMessage(response, 'bot');
            if ('speechSynthesis' in window) {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(response));
            }
        }, 600);
    };

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSend());

    // Voice Recognition Logic
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && voiceBtn) {
        const recognition = new SpeechRecognition();
        voiceBtn.addEventListener('click', () => recognition.start());
        recognition.onresult = (e) => {
            userInput.value = e.results[0][0].transcript;
            handleSend();
        };
    } else if (voiceBtn) {
        voiceBtn.style.display = 'none';
    }
}
