const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const specialtyTabs = document.querySelectorAll("[data-specialty-tab]");
const specialtyPanels = document.querySelectorAll("[data-specialty-panel]");

specialtyTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-specialty-tab");

    specialtyTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", active ? "true" : "false");
    });

    specialtyPanels.forEach((panel) => {
      panel.hidden = panel.getAttribute("data-specialty-panel") !== target;
    });
  });
});
