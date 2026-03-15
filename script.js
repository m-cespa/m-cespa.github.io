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

function initTypewriter() {
  const target = document.getElementById("typewriter-text");
  if (!target) return;

  const content = target.innerText;
  target.innerText = ""; // clear for reconstruction

  // create spans for each character to maintain exact width/height
  const charSpans = content.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.opacity = "0"; // start invisible
    target.appendChild(span);
    return span;
  });

  let i = 0;
  function reveal() {
    if (i < charSpans.length) {
      charSpans[i].style.opacity = "1";
      i++;
      const nextDelay = 100;
      setTimeout(reveal, nextDelay);
    }
  }

  // start after short initial delay
  setTimeout(reveal, 500);
}

// run once dom fully loaded
document.addEventListener("DOMContentLoaded", initTypewriter);
