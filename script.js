// --- STATE MANAGEMENT ---
let isVoiceEnabled = false;

// --- MODAL CONTROLS ---
function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

// --- NAVIGATION ---
function showSection(sectionId) {
    const sections = ['job-feed', 'map-section', 'training-hub'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === sectionId) ? 'block' : 'none';
    });
}

// --- SETTINGS LOGIC ---
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('theme-toggle').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
};

document.getElementById('voice-toggle').onclick = function() {
    isVoiceEnabled = !isVoiceEnabled;
    this.textContent = isVoiceEnabled ? "🔊 On" : "🔇 Off";
    this.classList.toggle('btn-primary', isVoiceEnabled);
};

// --- WORK READINESS & PROGRESS ---
function completeLesson(lessonId, weight) {
    const item = document.getElementById(lessonId);
    if (!item.classList.contains('completed')) {
        item.classList.add('completed');
        const btn = item.querySelector('button');
        btn.textContent = "✅ Done";
        btn.disabled = true;

        updateGlobalProgress(weight);

        const lessonName = item.querySelector('h4').textContent;
        const cheer = `Awesome! You finished ${lessonName}. Keep that momentum! 📚`;
        appendMessage('luke', cheer);
        lukeSpeak(cheer);
    }
}

function updateGlobalProgress(amount) {
    let current = parseInt(localStorage.getItem('userProgress') || 0);
    current = Math.min(current + amount, 100);
    localStorage.setItem('userProgress', current);
    
    const display = document.getElementById('progress-total');
    if (display) display.textContent = `${current}% Complete`;
}

// --- APPLICATION SUBMISSION (From Screenshot) ---
function submitApplication(jobTitle) {
    openModal('success-modal'); // Triggers the "YOU DID IT!" message
    
    const msg = `YES! Your application for ${jobTitle} is in. Big moves! 🚀`;
    appendMessage('luke', msg);
    lukeSpeak(msg);
    
    updateGlobalProgress(5);
}

// --- LUKE AI LOGIC ---
function lukeSpeak(text) {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
}

document.getElementById('send-ai-btn').onclick = () => {
    const input = document.getElementById('ai-user-input');
    if (input.value.trim()) {
        appendMessage('user', input.value);
        input.value = '';
        setTimeout(() => {
            appendMessage('luke', "I'm on it! Let's get you set up for success. 🗽");
        }, 600);
    }
};

function appendMessage(sender, text) {
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    msg.className = sender === 'luke' ? 'ai-msg-luke' : 'user-msg';
    msg.innerHTML = sender === 'luke' ? `<strong>Luke:</strong> ${text}` : text;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
}

// Init progress on load
window.onload = () => updateGlobalProgress(0);
