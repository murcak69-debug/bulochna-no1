const pages = [...document.querySelectorAll('.page')];
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');

function showPage() {
  const id = location.hash.replace('#', '') || 'home';
  const target = pages.find(page => page.id === id) || document.getElementById('home');
  pages.forEach(page => page.classList.toggle('active', page === target));
  document.querySelectorAll('.nav a').forEach(link => link.classList.toggle('current', link.getAttribute('href') === `#${target.id}`));
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener('hashchange', showPage);
window.addEventListener('DOMContentLoaded', showPage);


const strip = document.getElementById('productStrip');
document.getElementById('prevSlide').addEventListener('click', () => strip.scrollBy({ left: -strip.clientWidth * .75, behavior: 'smooth' }));
document.getElementById('nextSlide').addEventListener('click', () => strip.scrollBy({ left: strip.clientWidth * .75, behavior: 'smooth' }));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.menu-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

// У демоверсії посилання на філії показують загальну мапу міста.
// Після отримання точної адреси можна замінити адресу в посиланні та iframe.
document.querySelectorAll('.branch a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mapAddress').textContent = link.dataset.address;
  });
});



// =================================
// SCROLL REVEAL ANIMATIONS
// =================================

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(`
        .section-heading,
        .favorite-card,
        .season-banner,
        .page-intro,
        .menu-card,
        .about-image,
        .about-copy,
        .values > div,
        .branch,
        .contact-card,
        .map-card,
        .job-card,
        .jobs-contact
    `);

    elements.forEach((element, index) => {
        element.classList.add("reveal");

        // Небольшая задержка для последовательного появления
        element.style.transitionDelay =
            `${(index % 4) * 100}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Повторная проверка после переключения страниц
    window.addEventListener("hashchange", () => {
        setTimeout(() => {
            elements.forEach(element => {
                if (!element.classList.contains("visible")) {
                    observer.observe(element);
                }
            });
        }, 100);
    });

});



/* =====================================
   MOBILE NAVIGATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (!toggle || !nav) return;

    function closeMenu() {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
    }

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.textContent = isOpen ? "✕" : "☰";
    });

    // Закрываем меню после выбора раздела
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Закрываем при нажатии за пределами меню
    document.addEventListener("click", event => {
        if (!nav.contains(event.target) &&
            !toggle.contains(event.target)) {
            closeMenu();
        }
    });

    // Закрываем клавишей Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Закрываем меню при переходе на большой экран
    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            closeMenu();
        }
    });

});
