// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});

// Modal Controls
const settingsTrigger = document.getElementById('settings-trigger');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');

settingsTrigger.onclick = () => settingsModal.classList.remove('hidden');
closeSettings.onclick = () => settingsModal.classList.add('hidden');

// Resume Upload Mock
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

dropZone.onclick = () => fileInput.click();
fileInput.onchange = (e) => {
    const fileName = e.target.files[0].name;
    dropZone.querySelector('p').innerText = `Uploaded: ${fileName}`;
    dropZone.style.borderColor = 'var(--secondary)';
};

// Application Celebration
const applyBtn = document.getElementById('apply-trigger');
const overlay = document.getElementById('success-overlay');

applyBtn.onclick = () => {
    overlay.classList.remove('hidden');
    triggerConfetti();
};

function closeOverlay() {
    overlay.classList.add('hidden');
}

function triggerConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute;
            width: 10px; height: 10px;
            background: ${['#6366f1', '#ec4899', '#06b6d4'][Math.floor(Math.random()*3)]};
            left: ${Math.random()*100}%;
            top: ${Math.random()*100}%;
            border-radius: 50%;
            animation: fall 1s ease-out forwards;
        `;
        container.appendChild(div);
    }
}

// Voice Assistant Mock
const voiceBtn = document.getElementById('voice-btn');
const chatArea = document.getElementById('chat-area');

voiceBtn.onclick = () => {
    voiceBtn.style.background = '#f43f5e'; // pulsing color
    chatArea.innerHTML += `<p style="color:var(--secondary); margin-top:10px;"><i>Listening...</i></p>`;
    
    setTimeout(() => {
        voiceBtn.style.background = 'var(--secondary)';
        chatArea.innerHTML = `<p><b>Luke:</b> I've highlighted 3 summer programs in Brooklyn that match your interest in coding!</p>`;
    }, 2000);
};
