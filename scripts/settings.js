document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openSettings");
  const settingsOverlay = document.getElementById("settingsOverlay");
  const backdrop = document.getElementById("backdrop");
  const iframe = document.getElementById("settingsIframe");

  openBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    iframe.src = "./settings/settings.html";
    settingsOverlay.classList.remove("hidden");

    setTimeout(() => {
      settingsOverlay.classList.remove("translate-x-full");
    }, 10);

    backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  function closeSettingsOverlay() {
    settingsOverlay.classList.add("translate-x-full");

    setTimeout(() => {
      settingsOverlay.classList.add("hidden");
      backdrop.classList.add("hidden");
      iframe.src = "";
      document.body.style.overflow = "";
    }, 300);
  }

  // Listen for postMessage from the iframe (settings.html)
  window.addEventListener("message", function (event) {
    if (event.data === "closeSettings") {
      closeSettingsOverlay();
    }
  });
});
