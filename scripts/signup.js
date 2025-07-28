"use strict";

const baseUrl = "https://4b168cdbda98.ngrok-free.app/api/";

document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const signUpForm = document.getElementById("signUpForm");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsCheckbox = document.getElementById("terms");

  // Error elements
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const termsError = document.getElementById("termsError");

  // Password visibility toggles
  const passwordToggles = document.querySelectorAll(
    ".passwordVisibilityToggle"
  );

  // Setup password visibility toggles
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.closest(".relative").querySelector("input");
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      // Toggle eye icons
      const [hiddenEye, openEye] = toggle.querySelectorAll("img");
      hiddenEye.classList.toggle("hidden");
      openEye.classList.toggle("hidden");
    });
  });

  // Validation functions
  const validateFirstName = () => {
    const value = firstNameInput.value.trim();
    if (!value) {
      showError(firstNameInput, firstNameError, "First name is required");
      return false;
    }
    clearError(firstNameInput, firstNameError);
    return true;
  };

  const validateLastName = () => {
    const value = lastNameInput.value.trim();
    if (!value) {
      showError(lastNameInput, lastNameError, "Last name is required");
      return false;
    }
    clearError(lastNameInput, lastNameError);
    return true;
  };

  const validateEmail = () => {
    const email = emailInput.value.trim();
    if (!email) {
      showError(emailInput, emailError, "Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(emailInput, emailError, "Invalid email format");
      return false;
    }

    clearError(emailInput, emailError);
    return true;
  };

  const validatePassword = () => {
    const password = passwordInput.value.trim();
    if (!password) {
      showError(passwordInput, passwordError, "Password is required");
      return false;
    }

    if (password.length < 8) {
      showError(
        passwordInput,
        passwordError,
        "Password must be at least 8 characters"
      );
      return false;
    }

    if (
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
      return false;
    }

    // Validate confirm password when password changes
    if (confirmPasswordInput.value) validateConfirmPassword();

    clearError(passwordInput, passwordError);
    return true;
  };

  const validateConfirmPassword = () => {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!confirmPassword) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        "Please confirm your password"
      );
      return false;
    }

    if (password !== confirmPassword) {
      showError(
        confirmPasswordInput,
        confirmPasswordError,
        "Passwords do not match"
      );
      return false;
    }

    clearError(confirmPasswordInput, confirmPasswordError);
    return true;
  };

  const validateTerms = () => {
    if (!termsCheckbox.checked) {
      termsError.textContent = "You must accept the terms and privacy policy";
      return false;
    }
    termsError.textContent = "";
    return true;
  };

  //  functions
  const showError = (input, errorElement, message) => {
    errorElement.textContent = message;
    input.dataset.invalid = "true";
  };

  const clearError = (input, errorElement) => {
    errorElement.textContent = "";
    input.dataset.invalid = "false";
  };

  // Debounce function for input events
  const debounce = (func, delay = 500) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Setup real-time validation with debouncing
  firstNameInput.addEventListener("input", debounce(validateFirstName));
  firstNameInput.addEventListener("blur", validateFirstName);

  lastNameInput.addEventListener("input", debounce(validateLastName));
  lastNameInput.addEventListener("blur", validateLastName);

  emailInput.addEventListener("input", debounce(validateEmail));
  emailInput.addEventListener("blur", validateEmail);

  passwordInput.addEventListener("input", debounce(validatePassword));
  passwordInput.addEventListener("blur", validatePassword);

  confirmPasswordInput.addEventListener(
    "input",
    debounce(validateConfirmPassword)
  );
  confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

  // SUBMIT FORM
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isTermsValid
    ) {
      return;
    }

    // Prepare form data
      const formData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
      confirmPassword: confirmPasswordInput.value.trim(),
    };

    const middleNameValue = document.getElementById("middleName").value.trim();
    if (middleNameValue) {
      formData.middleName = middleNameValue;
}

    // Submit to API
    try {
      const response = await fetch(
        "https://4b168cdbda98.ngrok-free.app/api/auth/register", 

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        const userEmail = formData.email;
        // Store email in session storage for verification
        sessionStorage.setItem("emailForVerification", userEmail);
        window.location.href = "../signup-verification/";
      } else {
        // Handle server-side validation errors
        const errorMessage =
          data.message || "Registration failed. Please try again.";

        if (data.message.includes("email")) {
          showError(emailInput, emailError, errorMessage);
        } else if (data.message.includes("password")) {
          showError(passwordInput, passwordError, errorMessage);
        } else {
          emailError.textContent = errorMessage;
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      emailError.textContent = "Network error. Please try again.";
    }
  });
});
