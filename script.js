let isVoiceEnabled = false;

// Modal Logic
function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

window.onclick = (e) => { if (e.target.className === 'modal') e.target.style.display = 'none'; }

// Navigation
function showSection(sectionId) {
    ['job-feed', 'map-section', 'training-hub'].forEach(id => {
        document.getElementById(id).style.display = (id === sectionId) ? 'block' : 'none';
    });
}

// Settings Controls
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

// Application Flow (Screenshot 2026-05-01 at 4.24.20 PM.png)
function submitApplication(jobTitle) {
    openModal('success-modal');
    const msg = `LFG! You applied for ${jobTitle}. You're crushing it! 🚀`;
    appendMessage('luke', msg);
    lukeSpeak(msg);
    updateProgress(10);
}

// Progress and Lessons
function completeLesson(id, weight) {
    const item = document.getElementById(id);
    if (!item.classList.contains('completed')) {
        item.classList.add('completed');
        item.querySelector('button').textContent = "✅ Done";
        updateProgress(weight);
        appendMessage('luke', "Knowledge gained! 📚");
    }
}

function updateProgress(amount) {
    let current = parseInt(localStorage.getItem('youthProgress') || 0);
    current = Math.min(current + amount, 100);
    localStorage.setItem('youthProgress', current);
    document.getElementById('progress-total').textContent = `${current}% Complete`;
}

// Luke AI
function appendMessage(sender, text) {
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    msg.className = sender === 'luke' ? 'ai-msg-luke' : 'user-msg';
    msg.innerHTML = `<strong>${sender === 'luke' ? 'Luke' : 'You'}:</strong> ${text}`;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
}

function lukeSpeak(text) {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

// Init
window.onload = () => updateProgress(0);
