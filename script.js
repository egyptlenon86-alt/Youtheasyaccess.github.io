const themeToggle = document.getElementById("themeToggle");
      "I heard you say " + transcript + ". I will help you with that."
    );
  };

  recognition.onerror = function(event) {
    console.error(event.error);
  };
}

// ============================
// LESSON PROGRESS SIMULATION
// ============================

const lessonButtons = document.querySelectorAll('.lesson-btn');

lessonButtons.forEach(button => {

  button.addEventListener('click', () => {

    button.innerText = 'Lesson In Progress';

    setTimeout(() => {
      button.innerText = 'Lesson Completed ✔';
    }, 3000);

  });

});

// ============================
// SIMPLE JOIN NOW INTERACTION
// ============================

const joinButton = document.querySelector('.join-btn');

joinButton.addEventListener('click', () => {
  alert('Welcome to YouthConnect NYC! Account creation coming soon.');
});

// ============================
// FUTURE BACKEND FEATURES
// ============================

/*
Future Development Ideas:

1. Connect Firebase Authentication
2. Add Google Login API
3. Add Apple Sign-In
4. Connect MongoDB or PostgreSQL
5. Store lesson progress in database
6. Save resumes and profile data
7. AI backend integration for Luke
8. Real-time messaging system
9. Notifications system
10. Personalized job recommendation engine

Security Requirements:

- Encrypt passwords using bcrypt
- Use HTTPS
- Validate user input
- Add secure authentication tokens
- Protect API routes

*/
