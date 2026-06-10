const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const rememberCheckbox = document.getElementById("remember");
const statusMessage = document.getElementById("formStatus");

const setStatus = (message, tone = "") => {
  statusMessage.textContent = message;
  statusMessage.dataset.tone = tone;
};

togglePasswordButton.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePasswordButton.textContent = isHidden ? "Hide" : "Show";
  togglePasswordButton.setAttribute("aria-pressed", String(isHidden));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!emailInput.value.trim() || !passwordInput.value.trim()) {
    setStatus("Please enter both your email and password.", "error");
    return;
  }

  setStatus(
    rememberCheckbox.checked
      ? "Signed in. We’ll keep you remembered on this device."
      : "Signed in successfully.",
    "success"
  );
});
