// Add this to your existing script.js

function completeLesson(lessonId, weight) {
    const item = document.getElementById(lessonId);
    
    if (!item.classList.contains('completed')) {
        item.classList.add('completed');
        item.querySelector('button').textContent = "✅ Completed";
        item.querySelector('button').disabled = true;

        // Update overall progress
        updateGlobalProgress(weight);

        // Luke's Reaction
        const lessonName = item.querySelector('h4').textContent;
        const cheer = `Nice! You just finished the '${lessonName}' lesson. Knowledge is power! 📖✨`;
        appendMessage('luke', cheer);
        lukeSpeak(cheer);
    }
}

// Re-usable progress updater
function updateGlobalProgress(amount) {
    let currentProgress = parseInt(localStorage.getItem('userProgress') || 0);
    currentProgress = Math.min(currentProgress + amount, 100); // Cap at 100%
    
    localStorage.setItem('userProgress', currentProgress);
    const display = document.getElementById('progress-total');
    if (display) display.textContent = `${currentProgress}% Complete`;
}

// Ensure progress persists on page refresh
window.addEventListener('DOMContentLoaded', () => {
    const savedProgress = localStorage.getItem('userProgress') || 0;
    const display = document.getElementById('progress-total');
    if (display) display.textContent = `${savedProgress}% Complete`;
});
