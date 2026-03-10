function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function scrollProjects(direction) {
  const container = document.querySelector(".experience-details-container");
  let scrollAmount = 0;
  const maxScroll = 600;
  const step = 10;

  function smoothScroll() {
    if (scrollAmount < maxScroll) {
      container.scrollBy({ left: direction * step, behavior: "smooth" });
      scrollAmount += step;
      requestAnimationFrame(smoothScroll);
    }
  }

  smoothScroll();
}
