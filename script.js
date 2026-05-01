let isVoiceEnabled = false;

// 1. Navigation & View Control
function showSection(sectionId) {
    document.getElementById('job-feed').style.display = (sectionId === 'job-feed') ? 'block' : 'none';
    document.getElementById('map-section').style.display = (sectionId === 'map-section') ? 'block' : 'none';
}

// 2. Luke's Interactive Voice & Chat
const lukePhrases = [
    "Yo! That's a great question. Let's get you an answer! 🗽",
    "I'm on it! You're making big moves today, friend. 🤜🤛",
    "NYC has so many opportunities—don't sweat it, we'll find yours!",
    "That's the spirit! Want me to help you apply for that right now?",
    "Boom! You're crushing these assignments. Keep going! 🔥"
];

function lukeSpeak(text) {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2; // Youthful tone
    utterance.rate = 1.0;
    
    const avatar = document.getElementById('luke-avatar');
    utterance.onstart = () => avatar.classList.add('speaking');
    utterance.onend = () => avatar.classList.remove('speaking');
    
    window.speechSynthesis.speak(utterance);
}

document.getElementById('send-ai-btn').onclick = () => {
    const input = document.getElementById('ai-user-input');
    const val = input.value.trim();
    if (val) {
        appendMessage('user', val);
        setTimeout(() => {
            const reply = lukePhrases[Math.floor(Math.random() * lukePhrases.length)];
            appendMessage('luke', reply);
            lukeSpeak(reply);
        }, 700);
        input.value = '';
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

// 3. Voice & Theme Toggles
document.getElementById('voice-toggle').onclick = function() {
    isVoiceEnabled = !isVoiceEnabled;
    this.textContent = isVoiceEnabled ? "🔊" : "🔇";
    this.style.opacity = isVoiceEnabled ? "1" : "0.5";
};

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-toggle').textContent = 
        document.body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
};

// 4. Work Readiness Logic
function completeTask(taskId, weight) {
    const card = document.getElementById(taskId);
    if (!card.classList.contains('completed')) {
        card.classList.add('completed');
        card.querySelector('button').textContent = "✅ Done";
        
        let currentProgress = parseInt(localStorage.getItem('userProgress') || 0);
        currentProgress += weight;
        localStorage.setItem('userProgress', currentProgress);
        document.getElementById('progress-total').textContent = `${currentProgress}% Complete`;
        
        const cheer = "LETS GO! You just leveled up your career prep. NYC isn't ready for you! 🚀";
        appendMessage('luke', cheer);
        lukeSpeak(cheer);
    }
}

// 5. Application Flow
function openApply() { document.getElementById('success-modal').style.display = 'block'; }
function closeModal() { document.getElementById('success-modal').style.display = 'none'; }
