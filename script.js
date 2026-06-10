function validateRegistrationForm(values) {
  const usernameValue = values.username.trim();
  const emailValue = values.email.trim();
  const passwordValue = values.password;
  const confirmPasswordValue = values.confirmPassword;

  if (!usernameValue) {
    return { valid: false, field: "username", message: "Enter a username." };
  }

  if (!emailValue) {
    return { valid: false, field: "email", message: "Enter your email address." };
  }

  if (!passwordValue || passwordValue.length < 6) {
    return {
      valid: false,
      field: "password",
      message: "Password must be at least 6 characters.",
    };
  }

  if (confirmPasswordValue !== passwordValue) {
    return { valid: false, field: "confirmPassword", message: "Passwords do not match." };
  }

  return {
    valid: true,
    message: `Creating account for ${usernameValue}...`,
  };
}

if (typeof document !== "undefined") {
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
    togglePassword.setAttribute("aria-pressed", String(hidden));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const result = validateRegistrationForm({
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    if (!result.valid) {
      setStatus(result.message, "error");
      if (result.field === "username") {
        username.focus();
      } else if (result.field === "email") {
        email.focus();
      } else if (result.field === "password") {
        password.focus();
      } else {
        confirmPassword.focus();
      }
      return;
    }

    setStatus(result.message, "success");
    form.reset();
    togglePassword.textContent = "Show";
    togglePassword.setAttribute("aria-pressed", "false");
    password.type = "password";
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateRegistrationForm };
}
