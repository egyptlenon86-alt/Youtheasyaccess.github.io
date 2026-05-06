// Job Feed Initialization
const jobs = [
    { title: "Frontend Developer", company: "TechCorp", location: "Brooklyn, NY", salary: "$70k - $90k" },
    { title: "UI/UX Designer", company: "Creatively", location: "Manhattan, NY", salary: "$65k - $85k" },
    { title: "Youth Advocate", company: "NYC Community", location: "Queens, NY", salary: "$25/hr" }
];

function renderJobs() {
    const feed = document.getElementById('jobFeed');
    feed.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong> • ${job.location}</p>
            <p>${job.salary}</p>
            <button class="btn-signin-outline">View Details</button>
        </div>
    `).join('');
}

// UI Handlers
function openLogin() { document.getElementById('loginModal').style.display = 'block'; }
function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }

// Functional Sign-In Logic
function handleSignIn() {
    const headerAuth = document.getElementById('headerAuth');
    closeLogin();
    
    // Updates UI to show profile after login
    headerAuth.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 500;">Welcome, Egypt Sharon Lenon</span>
            <img src="https://ui-avatars.com/api/?name=Egypt+Lenon&background=1967D2&color=fff&rounded=true" width="40" height="40" style="border-radius: 50%;">
        </div>
    `;
}

function toggleLuke() { alert("Luke AI: 'I've highlighted 3 job training programs in Brooklyn for you.'"); }

window.onload = renderJobs;
