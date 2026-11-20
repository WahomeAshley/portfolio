
/* =========================================
   ASHLEY WAHOME PORTFOLIO
   JavaScript
========================================= */


/* ---------- MOBILE NAVIGATION ---------- */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    navLinks.classList.remove("show");

    menuToggle.innerHTML = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.innerHTML = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
});


// Close menu when a navigation link is selected

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});


// Close menu when Escape is pressed

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// ---------- FOOTER YEAR ----------

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ---------- IMAGE PLACEHOLDERS ----------

const images = document.querySelectorAll(".replaceable-image");

images.forEach((img) => {

    const fallback = img.parentElement.querySelector(".image-fallback");

    function showFallback() {
        img.style.display = "none";

        if (fallback) {
            fallback.classList.remove("hidden");
        }
    }

    function showImage() {
        img.style.display = "block";

        if (fallback) {
            fallback.classList.add("hidden");
        }
    }

    img.addEventListener("load", showImage);
    img.addEventListener("error", showFallback);

    // Handle images already loaded from cache

    if (img.complete) {
        if (img.naturalWidth > 0) {
            showImage();
        } else {
            showFallback();
        }
    }

});


// ---------- SCROLL REVEAL ----------

const revealElements = document.querySelectorAll(
    ".about-grid, .interests-heading, .interest-card, " +
    ".research-card, .projects-heading, .project-card, " +
    ".involvement-heading, .experience-item, " +
    ".writing-grid, .contact-main, .contact-links"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// ---------- NAV ACTIVE STATE ----------

const pageSections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const currentSection = entry.target.getAttribute("id");

            navItems.forEach((link) => {

                const linkTarget = link.getAttribute("href");

                if (linkTarget === `#${currentSection}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }

            });

        }

    });

}, {
    rootMargin: "-30% 0px -60% 0px"
});


pageSections.forEach((section) => {
    sectionObserver.observe(section);
});


// ---------- CONSOLE MESSAGE ----------

console.log("Ashley Wahome Portfolio loaded successfully ✳");
