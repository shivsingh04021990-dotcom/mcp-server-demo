const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const status = document.getElementById("status");
const togglePassword = document.getElementById("togglePassword");

function setStatus(message, tone = "neutral") {
  status.textContent = message;
  status.dataset.tone = tone;
}

togglePassword.addEventListener("click", () => {
  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";
  togglePassword.textContent = hidden ? "Hide" : "Show";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!username.value.trim()) {
    setStatus("Enter a username.", "error");
    username.focus();
    return;
  }

  if (!email.value.trim()) {
    setStatus("Enter your email address.", "error");
    email.focus();
    return;
  }

  if (!password.value || password.value.length < 6) {
    setStatus("Password must be at least 6 characters.", "error");
    password.focus();
    return;
  }

  if (confirmPassword.value !== password.value) {
    setStatus("Passwords do not match.", "error");
    confirmPassword.focus();
    return;
  }

  setStatus(`Creating account for ${username.value.trim()}...`, "success");
  form.reset();
  togglePassword.textContent = "Show";
  password.type = "password";
});
