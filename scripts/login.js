"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const visibilityToggle = document.querySelector(".passwordVisibilityToggle");

  // Password visibility toggle
  visibilityToggle.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    // Toggle eye icons
    const [hiddenEye, openEye] = visibilityToggle.querySelectorAll("img");
    hiddenEye.classList.toggle("hidden");
    openEye.classList.toggle("hidden");
  });

  // Form submission handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset errors and states
    emailError.textContent = passwordError.textContent = "";
    emailInput.dataset.invalid = passwordInput.dataset.invalid = "false";

    // Get values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // Email validation
    if (!email) {
      showError(emailInput, emailError, "Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError(emailInput, emailError, "Invalid email format");
      isValid = false;
    }

    // Password validation
    if (!password) {
      showError(passwordInput, passwordError, "Password is required");
      isValid = false;
    } else if (password.length < 8) {
      showError(
        passwordInput,
        passwordError,
        "Password must be at least 8 characters"
      );
      isValid = false;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      showError(
        passwordInput,
        passwordError,
        "Must include uppercase, lowercase, number, and special character"
      );
      isValid = false;
    }

    if (!isValid) return;

    // Submit to API
    try {
      const response = await fetch("https://4b168cdbda98.ngrok-free.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("OTP sent to your email!");
      } else {
        showError(emailInput, emailError, "Invalid credentials");
        showError(passwordInput, passwordError, "Invalid credentials");
      }
    } catch (error) {
      showError(emailInput, emailError, "Network error. Please try again.");
      console.error("Login error:", error);
    }
  });

  //  functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.dataset.invalid = "true";
  }
});
