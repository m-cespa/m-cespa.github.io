function toggleMenu() {
    /* target elements, add/remove open class */
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function scrollProjects(direction) {
    const container = document.querySelector('.experience-details-container');
    let scrollAmount = 0;
    const maxScroll = 600; // Max scroll distance
    const step = 10; // Step size per frame

    function smoothScroll() {
        if (scrollAmount < maxScroll) {
            container.scrollBy({ left: direction * step, behavior: 'smooth' });
            scrollAmount += step;
            requestAnimationFrame(smoothScroll);
        }
    }

    smoothScroll();
}


