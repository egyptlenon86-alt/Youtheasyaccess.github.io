// --- State & Mock Data ---
let appState = {
    user: null, // Set to {username, avatarUrl} after simulated signin
    theme: localStorage.getItem('theme') || 'light',
    lukeOpen: false,
    resume: null
};

const mockJobs = [
    { title: "Junior Web Developer", company: "TechNYC", type: "Hybrid", tags: ["Web", "Frontend"] },
    { title: "UI Design Intern", company: "Creative Hub", type: "On-site", tags: ["Design", "UX"] },
    { title: "Social Media Coordinator", company: "City Events", type: "Remote", tags: ["Creative"] },
    { title: "Community Support Aide", company: "Neighborhood Association", type: "On-site", tags: ["Community"] }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(appState.theme);
    renderJobs(mockJobs);
    initDropZone();
});

// --- Theme Management ---
document.getElementById('themeToggle').addEventListener('change', (e) => {
    appState.theme = e.target.checked ? 'dark' : 'light';
    applyTheme(appState.theme);
    localStorage.setItem('theme', appState.theme);
});

function applyTheme(theme) {
    document.body.className = theme + '-mode';
    document.getElementById('themeToggle').checked = (theme === 'dark');
}

// --- Sidebar Interaction (Removed Dropdown) ---
function toggleSettings() {
    const sidebar = document.getElementById("settingsSidebar");
    sidebar.classList.toggle("open");
}

// --- Authentication (Simulated Interactivity) ---
function simulateSignIn() {
    // Hide auth buttons, show profile fixed button
    document.querySelector('.header-auth').style.display = 'none';
    document.getElementById('profileTrigger').style.display = 'block';

    // Mock User Data
    appState.user = {
        username: "Egypt Lenon",
        avatarUrl: "https://via.placeholder.com/40/6c5ce7/ffffff?text=EL"
    };

    updateUIForUser();
    renderJobs(filterJobsByInterest()); // Initial interest-based jobs
    simulateLukeResponse("Welcome back, Egypt! I see you're interested in UX. Check out the latest Design Intern opening.");
}

function simulateSignOut() {
    // Show auth buttons, hide profile fixed button
    document.querySelector('.header-auth').style.display = 'flex';
    document.getElementById('profileTrigger').style.display = 'none';
    
    appState.user = null;
    toggleSettings(); // Close sidebar
    updateUIForUser();
    renderJobs(mockJobs); // Reset jobs to full guest list
}

function updateUIForUser() {
    const displayName = document.getElementById('display-name');
    const userAvatarSmall = document.getElementById('userAvatarSmall');
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const messageFeed = document.getElementById('messageFeed');

    if (appState.user) {
        displayName.textContent = appState.user.username;
        userAvatarSmall.src = appState.user.avatarUrl;
        sidebarAvatar.src = appState.user.avatarUrl.replace('40', '80'); // Large version
        messageFeed.innerHTML = "<p>Sign in to your real account to sync your database.</p>";
    } else {
        displayName.textContent = "Guest";
        sidebarAvatar.src = "https://via.placeholder.com/80";
        messageFeed.innerHTML = "<p>Sign in to view your messages.</p>";
    }
}

// --- Interest Selector Interaction ---
function toggleInterest(element, interest) {
    element.classList.toggle('selected');
    if(element.classList.contains('selected')) {
        simulateLukeResponse(`Okay, saving your interest in ${interest}. Filtering jobs now.`);
    }
    renderJobs(filterJobsByInterest()); // Interactive filtering
}

// Simulated Filtering based on interest-tags
function filterJobsByInterest() {
    if (!appState.user) return mockJobs; // Show all for guest
    
    const selectedTags = Array.from(document.querySelectorAll('.interest-tag.selected'))
                             .map(t => t.textContent.toLowerCase());

    if (selectedTags.length === 0) return mockJobs;

    return mockJobs.filter(job => job.tags.some(tag => selectedTags.includes(tag.toLowerCase())));
}

// --- Job Feed Interaction ---
function renderJobs(jobs) {
    const container = document.getElementById('jobCards');
    container.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h4>${job.title}</h4>
            <p>${job.company} • ${job.type}</p>
            <div class="tags">
                ${job.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <button class="btn-small" onclick="quickApply('${job.title}')">Apply with Luke</button>
        </div>
    `).join('');
}

function filterJobs() {
    const searchTerm = document.getElementById('mainSearch').value.toLowerCase();
    const filtered = mockJobs.filter(job => job.title.toLowerCase().includes(searchTerm));
    renderJobs(filtered);
}

function quickApply(title) {
    alert(`Quick Apply for ${title} initiated... Luke AI is helping.`);
    simulateLukeResponse(`Started applying for ${title}. I'll use your basic info.`);
}

// --- Resume Drop Zone Interaction ---
function initDropZone() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('resumeFile');

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    if (files.length > 0) {
        appState.resume = files[0];
        document.getElementById('dropZoneStatus').textContent = `Resume: ${appState.resume.name}`;
        simulateLukeResponse(`Saved your resume: ${appState.resume.name}. When you sign in to a real account, I can match it to jobs.`);
    }
}

// --- Luke AI Assistant Interaction ---
function toggleLuke() {
    const modal = document.getElementById("lukeAI");
    appState.lukeOpen = !appState.lukeOpen;
    modal.style.display = appState.lukeOpen ? "flex" : "none";
}

function sendLukeMessage() {
    const input = document.getElementById('lukeInput');
    const text = input.value.trim();
    if (!text) return;

    addChatMessage('user', text);
    input.value = '';

    // Simulated AI response
    setTimeout(() => {
        if(text.toLowerCase().includes('ux')) {
            simulateLukeResponse("UX design is about improving user experience. There's a Design Intern job at Creative Hub on your recommended feed.");
        } else if (text.toLowerCase().includes('community')) {
             simulateLukeResponse("Community support is vital! The Neighborhood Association has a Community Support Aide position listed.");
        } else {
            simulateLukeResponse(`Okay, interesting. Let me search the map or training database for that.`);
        }
    }, 1000);
}

function addChatMessage(role, text) {
    const chatBody = document.getElementById('chatBody');
    const msg = document.createElement('p');
    msg.className = `ai-msg ${role}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function simulateLukeResponse(text) {
    setTimeout(() => {
        if (!appState.lukeOpen) toggleLuke(); // Open Luke if not already
        addChatMessage('bot', text);
    }, 1000);
}

function activateLukeAudio() {
    alert("Audio mode: Luke is listening... (Simulated)");
    simulateLukeResponse("I'm listening! Tell me what you're looking for.");
}

function interactMap() {
    alert('Interacting with the map...');
    simulateLukeResponse("The map shows all jobs near you. Try zooming or filtering!");
}
