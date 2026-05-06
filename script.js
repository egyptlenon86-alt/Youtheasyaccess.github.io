/ UI Toggles
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

document.getElementById('menuToggle').onclick = toggleDropdown;

function toggleSettings() {
    document.getElementById('settingsSidebar').classList.toggle('active');
}

function toggleLuke() {
    document.getElementById('lukeAI').classList.toggle('active');
}

// Dark/Light Mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
    if(themeToggle.checked) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});

// Mock Job Data Generation
const jobs = [
    { title: "Junior Web Designer", location: "Brooklyn, NY", type: "Full-time", tags: ["UI/UX", "Teens"] },
    { title: "Social Media Assistant", location: "Manhattan, NY", type: "Internship", tags: ["Creative", "Part-time"] },
    { title: "Direct Support Aide", location: "Queens, NY", type: "Entry Level", tags: ["Community", "Social Work"] }
];

function loadJobs() {
    const list = document.getElementById('jobList');
    jobs.forEach(job => {
        const item = document.createElement('div');
        item.style.borderBottom = "1px solid #f0f0f0";
        item.style.padding = "15px 0";
        item.innerHTML = `
            <h4 style="color: var(--primary)">${job.title}</h4>
            <p>${job.location} • ${job.type}</p>
            <div style="margin-top:5px">
                ${job.tags.map(t => `<span style="background:#E3F2FD; color:#1565C0; padding:2px 8px; border-radius:10px; font-size:12px; margin-right:5px">${t}</span>`).join('')}
            </div>
        `;
        list.appendChild(item);
    });
}

// Audio Button Logic (Simulated)
document.querySelector('.audio-btn').addEventListener('click', () => {
    alert("Voice Mode Activated: Luke is listening...");
});

// Drag and Drop Logic
const dropBox = document.getElementById('dropBox');
dropBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropBox.style.background = "#f0f0ff";
});
dropBox.addEventListener('drop', (e) => {
    e.preventDefault();
    alert("Resume saved to your database!");
    dropBox.style.background = "transparent";
});

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', loadJobs);
