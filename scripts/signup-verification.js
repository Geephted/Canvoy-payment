"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const verificationForm = document.getElementById("verificationForm");
  const otpInputs = document.querySelectorAll(".otp-input");
  const fullOtpInput = document.getElementById("full-otp");
  const errorMessage = document.getElementById("errorMessage");

  // Get email from session storage (was set during signup)
  const userEmail = sessionStorage.getItem("emailForVerification");

  // Auto-focus first input on page load
  if (otpInputs.length > 0) otpInputs[0].focus();

  // OTP input navigation logic
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      // Auto-focus next input when a digit is entered
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }

      // Update full OTP value
      updateFullOtp();
    });

    input.addEventListener("keydown", (e) => {
      // Handle backspace navigation
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        otpInputs[index - 1].focus();
      }

      // Allow only numeric input
      if (e.key.length === 1 && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });
  });

  // Combine OTP digits into single value
  function updateFullOtp() {
    const otp = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");
    fullOtpInput.value = otp;
    return otp;
  }

  // Form submission
  verificationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const otp = updateFullOtp();

    if (otp.length !== 6) {
      errorMessage.textContent = "Please enter all 6 digits";
      return;
    }

    try {
      const response = await fetch(
        "https://4b168cdbda98.ngrok-free.app/api/auth/verify-registration",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, otp }),
        }
      );

      const data = await response.json();

      if (data.success) {
        window.location.href = "../successful-verification/index.html";
      } else {
        errorMessage.textContent = data.message || "Verification failed";
        // Clear OTP fields on error
        otpInputs.forEach((input) => (input.value = ""));
        otpInputs[0].focus();
      }
    } catch (error) {
      errorMessage.textContent = "Network error. Please try again.";
    }
  });
});
