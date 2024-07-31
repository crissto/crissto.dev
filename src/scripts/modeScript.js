const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function updateMode() {
  const isSystemDarkMode = darkModeMediaQuery.matches;
  const isDarkMode =
    localStorage.getItem("isDarkMode") === "true" ||
    (localStorage.getItem("isDarkMode") === null && isSystemDarkMode);

  document.documentElement.classList.toggle("dark", isDarkMode);

  if (isDarkMode === isSystemDarkMode) {
    localStorage.removeItem("isDarkMode");
  }
}

function disableTransitionsTemporarily() {
  document.documentElement.classList.add("[&_*]:!transition-none");
  requestAnimationFrame(() => {
    document.documentElement.classList.remove("[&_*]:!transition-none");
  });
}

function updateModeWithoutTransitions() {
  disableTransitionsTemporarily();
  updateMode();
}

updateMode();
darkModeMediaQuery.addEventListener("change", updateModeWithoutTransitions);
window.addEventListener("storage", updateModeWithoutTransitions);
