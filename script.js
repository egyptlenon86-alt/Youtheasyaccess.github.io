/* script.js */
const jobs = [
    { title: "Junior Web Developer", co: "TechNYC", loc: "Brooklyn", tags: ["Frontend", "JS"] },
    { title: "UI/UX Design Intern", co: "Creative Hub", loc: "Manhattan", tags: ["Design", "Figma"] }
];

document.addEventListener('DOMContentLoaded', () => { renderJobs(jobs); });

function renderJobs(data) {
    const container = document.getElementById('jobCards');
    container.innerHTML = data.map(j => `
        <div class="job-card">
            <h3>${j.title}</h3>
            <p>${j.co} • ${j.loc}</p>
            <button class="btn-small" onclick="applyToJob('${j.title}')">Apply with Luke</button>
        </div>
    `).join('');
}

function openLogin() { document.getElementById('loginModal').style.display = 'block'; }
function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }
function toggleLuke() {
    const modal = document.getElementById('lukeAI');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}
