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

/* -------------------------------------
   Blog Modal + Pre-rendered HTML Loading
------------------------------------- */

function openPostMarkdownBlog(filePath) {
  const modal = document.getElementById("markdown-modal-blog");
  const contentDiv = document.getElementById("markdown-content-blog");

  contentDiv.innerHTML = "Loading...";

  // Pre-rendered HTML file
  const htmlFilePath = filePath.replace(/\.md$/, ".html");

  fetch(htmlFilePath)
    .then(res => res.text())
    .then(html => {
      contentDiv.innerHTML = html; // insert pre-rendered HTML

      // Highlight code blocks
      document.querySelectorAll("#markdown-content-blog pre code").forEach(el =>
        hljs.highlightElement(el)
      );

      // Render MathJax
      if (window.MathJax) {
        MathJax.typesetPromise([contentDiv])
          .catch(err => console.error("MathJax error:", err));
      }
    })
    .catch(err => {
      console.error("HTML load error:", err);
      contentDiv.innerHTML = `<p style="color: darkred;">Error loading post: ${err}</p>`;
    });

  // Show modal
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.querySelector(".modal-content-blog").focus();
}

function closeModalBlog() {
  const modal = document.getElementById("markdown-modal-blog");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

// Accessibility: close modal with Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModalBlog();
});
