
/* =========================================
   1. ELEMENTOS DO SITE
========================================= */

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-links a");

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".nav-links");


/* =========================================
   2. ANIMAÇÕES DE APARECIMENTO
========================================= */

// Verifica se o usuário prefere menos animações
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// Ativa as animações somente se permitido
if ("IntersectionObserver" in window && !prefersReducedMotion) {

    sections.forEach((section) => {
        section.classList.add("reveal");
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

    sections.forEach((section) => {
        revealObserver.observe(section);
    });

} else {

    // Exibe normalmente caso animações não sejam suportadas
    sections.forEach((section) => {
        section.classList.add("visible");
    });

}


/* =========================================
   3. NAVEGAÇÃO ATIVA
========================================= */

if ("IntersectionObserver" in window) {

    const menuObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${currentId}`) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach((section) => {
        menuObserver.observe(section);
    });

}


/* =========================================
   4. MENU MOBILE
========================================= */

// Abre e fecha o menu
if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";

    });


    // Fecha o menu ao clicar em uma seção
    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuToggle.textContent = "☰";

        });

    });


    // Fecha o menu ao pressionar ESC
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            mobileMenu.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuToggle.textContent = "☰";

        }

    });

}
