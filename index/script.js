// 1. Navigation Between Jobs and Map
function showSection(sectionId) {
    const jobFeed = document.getElementById('job-feed');
    const mapSection = document.getElementById('map-section');
    
    if (sectionId === 'job-feed') {
        jobFeed.style.display = 'block';
        mapSection.style.display = 'none';
    } else {
        jobFeed.style.display = 'none';
        mapSection.style.display = 'block';
    }
}

// 2. Open Application Form
function openApply() {
    document.getElementById('application-flow').style.display = 'block';
    document.getElementById('application-flow').scrollIntoView({ behavior: 'smooth' });
}

// 3. Dropdown Toggle
function toggleDropdown() {
    document.getElementById("navDropdown").classList.toggle("show");
}

// 4. Dark Mode Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.onclick = () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
};

// 5. Submit Application & "YOU DID IT"
const form = document.getElementById('job-app-form');
const modal = document.getElementById('success-modal');

form.onsubmit = (e) => {
    e.preventDefault();
    modal.style.display = 'block';
};

function closeModal() {
    modal.style.display = 'none';
    document.getElementById('application-flow').style.display = 'none';
}

// 6. Resume Click
document.getElementById('resume-drop').onclick = () => document.getElementById('resume-file').click();

// 7. AI Assistant
const aiBtn = document.getElementById('send-ai-btn');
const chatHistory = document.getElementById('chat-history');

aiBtn.onclick = () => {
    const input = document.getElementById('ai-user-input');
    if (input.value) {
        const userMsg = document.createElement('p');
        userMsg.style.textAlign = 'right';
        userMsg.innerHTML = `<span style="background:#6366f1; color:white; padding:4px 8px; border-radius:8px;">${input.value}</span>`;
        chatHistory.appendChild(userMsg);
        
        setTimeout(() => {
            const aiMsg = document.createElement('p');
            aiMsg.innerHTML = `<span>I can help you apply for that!</span>`;
            chatHistory.appendChild(aiMsg);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 600);
        input.value = '';
    }
};