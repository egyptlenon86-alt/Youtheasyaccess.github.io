// =========================
// DARK MODE TOGGLE
// =========================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  // Change icon
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.innerHTML = "☀️";
  } else {
    themeToggle.innerHTML = "🌙";
  }

});

// =========================
// AI CHAT ASSISTANT
// =========================

function sendMessage() {

  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const userMessage = input.value.trim();

  // Prevent empty message
  if (userMessage === "") {
    return;
  }

  // Create user message
  const userDiv = document.createElement("div");

  userDiv.classList.add("message", "user");

  userDiv.textContent = userMessage;

  chatBox.appendChild(userDiv);

  // Simulated AI Response
  setTimeout(() => {

    const lukeDiv = document.createElement("div");

    lukeDiv.classList.add("message", "luke");

    lukeDiv.textContent =
      "Luke: I can help you find jobs, improve your resume, or recommend career programs!";

    chatBox.appendChild(lukeDiv);

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;

  }, 1000);

  // Clear input
  input.value = "";

}

// =========================
// ENTER KEY SUPPORT
// =========================

document
  .getElementById("userInput")
  .addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
      sendMessage();
    }

});
