
    
   // ✅ Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ✅ Handle mobile reset
document.getElementById("resetPasswordMobile").addEventListener("click", () => {
  const email = document.getElementById("emailMobile").value.trim();
  const errorEl = document.getElementById("emailErrorMobile");

  errorEl.textContent = "";
  errorEl.classList.add("hidden");

  if (!email) {
    errorEl.textContent = "Please enter your email.";
    errorEl.classList.remove("hidden");
    return;
  }

  if (!validateEmail(email)) {
    errorEl.textContent = "Please enter a valid email address.";
    errorEl.classList.remove("hidden");
    return;
  }

  handleResetPassword(email);
});

// ✅ Handle desktop reset
document.getElementById("resetPasswordDesktop").addEventListener("click", () => {
  const email = document.getElementById("emailDesktop").value.trim();
  const errorEl = document.getElementById("emailErrorDesktop");

  errorEl.textContent = "";
  errorEl.classList.add("hidden");

  if (!email) {
    errorEl.textContent = "Please enter your email.";
    errorEl.classList.remove("hidden");
    return;
  }

  if (!validateEmail(email)) {
    errorEl.textContent = "Please enter a valid email address.";
    errorEl.classList.remove("hidden");
    return;
  }

  handleResetPassword(email);
});

// Clear mobile error as user types
document.getElementById("emailMobile").addEventListener("input", () => {
  const email = document.getElementById("emailMobile").value.trim();
  const errorEl = document.getElementById("emailErrorMobile");

  if (email && validateEmail(email)) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }
});

// Clear desktop error as user types
document.getElementById("emailDesktop").addEventListener("input", () => {
  const email = document.getElementById("emailDesktop").value.trim();
  const errorEl = document.getElementById("emailErrorDesktop");

  if (email && validateEmail(email)) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }
});


// ✅ API Request Logic
async function handleResetPassword(email) {
  const isMobile = window.innerWidth < 768;
  const btnMobile = document.getElementById("resetPasswordMobile");
  const btnDesktop = document.getElementById("resetPasswordDesktop");
  const msgMobile = document.getElementById("responseMessageMobile");
  const msgDesktop = document.getElementById("responseMessageDesktop");

  const button = isMobile ? btnMobile : btnDesktop;
  const messageBox = isMobile ? msgMobile : msgDesktop;

  // Reset any old message
  messageBox.classList.add("hidden");
  messageBox.textContent = "";

  // Disable button + show loading
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const response = await fetch("https://4b168cdbda98.ngrok-free.app/api/auth/forgot-password/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const result = await response.json();

    if (response.ok) {
      messageBox.textContent = result.message || "Reset link sent successfully!";
      messageBox.className = "text-green-600 text-sm mt-2";
    } else {
      messageBox.textContent = result.message || "Unable to send reset link. Please try again.";
      messageBox.className = "text-red-500 text-sm mt-2";
    }

  } catch (error) {
    console.error("Fetch error:", error);
    messageBox.textContent = "Network error. Please check your connection.";
    messageBox.className = "text-red-500 text-sm mt-2";
  } finally {
    button.disabled = false;
    button.textContent = isMobile ? "Reset Password" : "Continue";

    // ✅ Auto-clear message after 5 seconds
    setTimeout(() => {
      messageBox.textContent = "";
      messageBox.classList.add("hidden");
    }, 5000);
  }
}
