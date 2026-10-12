/* =========================================================
   Sadaf Turkani — Portfolio scripts (Vanilla JavaScript)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     1. PROJECT DATA
     Keeping projects in one array makes it easy to add more
     later — the cards and modal are both built from this data.
  --------------------------------------------------------- */
  const projects = [
    {
      id: "edunova",
      title: "EduNova",
      category: "Web Development",
      description:
        "A modern programming and technology learning platform landing page designed with a clean, study-friendly visual system and responsive layouts.",
      tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
      art: "art-edunova",
image: "./assets/edunova.png",
      demo: "https://sadafturkani-wq.github.io/EduNova/",
      github: "https://github.com/sadafturkani-wq/EduNova",
    },
    {
      id: "memory",
      title: "AI Memory Palace",
      category: "Creative Web Experience",
      description:
        "A creative web project exploring the concept of preserving and presenting collective human memory through an immersive digital experience.",
      tech: ["HTML", "CSS", "JavaScript"],
      art: "art-memory",
      image: "./assets/ai-memory-palace.png",
      demo: "https://sadafturkani-wq.github.io/AI_Memory_Palace/",
      github: "https://github.com/sadafturkani-wq/AI_Memory_Palace",
    },
    {
      id: "luxe",
      title: "Luxe Library",
      category: "Web Design",
      description:
        "A modern digital library interface focused on elegant visual presentation, clean navigation and an enjoyable browsing experience.",
      tech: ["HTML", "CSS", "JavaScript"],
      art: "art-luxe",
      image: "./assets/luxe-library.png",
      demo: "https://sadafturkani-wq.github.io/Luxe_Library/",
      github: "https://github.com/sadafturkani-wq/Luxe_Library",
    },
    {
      id: "gallery",
      title: "Digital Art Gallery",
      category: "UI/UX & Web Design",
      description:
        "A visually focused digital art gallery concept designed to showcase artwork through a clean and modern interface.",
      tech: ["HTML", "CSS", "UI/UX", "Figma"],
      art: "art-gallery",
      image: "./assets/art-gallery.png",
      demo: "https://sadafturkani-wq.github.io/Digital-Art-Library/",
      github: "https://github.com/sadafturkani-wq/Digital-Art_gallery",
    },
  ];

  // Small helper: builds the abstract CSS "screenshot" used for each project
  
const artMarkup = (artClass, image = "") => {
  if (image) {
    return `
      <div class="art project-image-art">
        <img
          src="${image}"
          alt="${artClass} project preview"
          loading="lazy"
        />
      </div>`;
  }

  return `
    <div class="art ${artClass}">
      <div class="art-mock">
        <i></i><i></i><i></i>
        <div class="row"><b></b><b></b><b></b></div>
      </div>
    </div>`;
};


  /* ---------------------------------------------------------
     2. RENDER PROJECT CARDS
  --------------------------------------------------------- */
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = projects
    .map(
      (p, i) => `
      <article class="project-card reveal" style="--d:${(i % 2) * 0.1}s" data-id="${p.id}" tabindex="0"
               aria-label="Open details for ${p.title}">
        <div class="project-visual" role="img" aria-label="Abstract preview artwork for ${p.title}">$${artMarkup(p.art, p.image)}</div>
        <div class="project-body">
          <span class="project-cat">${p.category}</span>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="tags">${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <div class="project-actions">
            <button class="btn btn-primary" data-open="${p.id}">View Project</button>
            <a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </article>`,
    )
    .join("");

  /* ---------------------------------------------------------
     3. MOBILE MENU
  --------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  };

  hamburger.addEventListener("click", () =>
    setMenu(!navLinks.classList.contains("open")),
  );
  // Close the menu after choosing a link
  navLinks
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => setMenu(false)));
  // Close the menu if the screen grows to desktop size
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ---------------------------------------------------------
     4. NAVBAR ON SCROLL + BACK-TO-TOP BUTTON
  --------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 30);
    backToTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  /* ---------------------------------------------------------
     5. ACTIVE NAV LINK — highlights the section in view
  --------------------------------------------------------- */
  const links = document.querySelectorAll(".nav-link");
  const sections = ["home", "about", "skills", "projects", "contact"].map(
    (id) => document.getElementById(id),
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle(
            "active",
            l.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => s && sectionObserver.observe(s));

  /* ---------------------------------------------------------
     6. SCROLL REVEAL ANIMATIONS
  --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
     7. PROJECT MODAL
  --------------------------------------------------------- */
  const modal = document.getElementById("projectModal");
  const modalEls = {
    visual: document.getElementById("modalVisual"),
    cat: document.getElementById("modalCat"),
    title: document.getElementById("modalTitle"),
    desc: document.getElementById("modalDesc"),
    tags: document.getElementById("modalTags"),
    demo: document.getElementById("modalDemo"),
    git: document.getElementById("modalGit"),
  };
  let lastFocused = null;

  const openModal = (id) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    lastFocused = document.activeElement;
    modalEls.visual.innerHTML = artMarkup(p.art, p.image);
    modalEls.cat.textContent = p.category;
    modalEls.title.textContent = p.title;
    modalEls.desc.textContent = p.description;
    modalEls.tags.innerHTML = p.tech
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
    modalEls.demo.href = p.demo;
    modalEls.git.href = p.github;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal-close").focus();
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  };

  // Clicking a card (but not its GitHub link) opens the modal
  grid.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const card = e.target.closest(".project-card");
    if (card) openModal(card.dataset.id);
  });
  // Keyboard support: Enter / Space on a focused card
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".project-card");
    if (card && e.target === card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openModal(card.dataset.id);
    }
  });

  modal
    .querySelectorAll("[data-close]")
    .forEach((el) => el.addEventListener("click", closeModal));
  // Placeholder demo links shouldn't jump the page
  modalEls.demo.addEventListener("click", (e) => {
    if (modalEls.demo.getAttribute("href") === "#") {
      e.preventDefault();
      modalEls.demo.textContent = "Demo coming soon";
      setTimeout(() => (modalEls.demo.textContent = "Live Demo"), 1600);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    // Simple focus trap so keyboard users stay inside the modal
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll("button, a[href]");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------------------------------------------------------
     8. CONTACT FORM VALIDATION (frontend demo only)
  --------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) =>
      !v.trim()
        ? "Please enter your email."
        : emailPattern.test(v.trim())
          ? ""
          : "That email doesn't look quite right.",
    message: (v) =>
      v.trim().length >= 10
        ? ""
        : "Please write a message (at least 10 characters).",
  };

  const validateField = (name) => {
    const input = form.elements[name];
    const message = rules[name](input.value);
    document.getElementById(`${name}Error`).textContent = message;
    input.closest(".field").classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  };

  // Re-check a field as the user fixes it
  Object.keys(rules).forEach((name) => {
    form.elements[name].addEventListener("input", () => {
      if (form.elements[name].closest(".field").classList.contains("invalid"))
        validateField(name);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    success.classList.remove("show");
    success.textContent = "";
    const results = Object.keys(rules).map(validateField);
    if (results.every(Boolean)) {
      const firstName = form.elements.name.value.trim().split(" ")[0];
      success.textContent = `Thanks, ${firstName}! Your message looks great. (Demo form — nothing was sent.)`;
      void success.offsetWidth; // restart animation
      success.classList.add("show");
      form.reset();
    } else {
      form
        .querySelector(".field.invalid input, .field.invalid textarea")
        .focus();
    }
  });

  /* ---------------------------------------------------------
     9. SMALL INTERACTIONS
  --------------------------------------------------------- */
  // Ripple effect on button clicks
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const r = document.createElement("span");
    r.className = "ripple";
    r.style.width = r.style.height = `${size}px`;
    r.style.left = `${e.clientX - rect.left - size / 2}px`;
    r.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });

  // Skill cards: glow follows the cursor
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  // Hero profile card: gentle 3D tilt (desktop + motion allowed only)
  const profile = document.getElementById("profileCard");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (profile && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
    const hero = document.getElementById("home");
    hero.addEventListener("mousemove", (e) => {
      const rect = profile.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const y = (e.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      profile.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    hero.addEventListener("mouseleave", () => (profile.style.transform = ""));
  }
});
