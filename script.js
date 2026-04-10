const interests = [
  "AI for Science",
  "Embodied AI",
  "Multimodal Learning",
  "World Models",
  "Multi-agent Systems"
];

const publications = [
  {
    year: "2026",
    venue: "CVPR 2026",
    title: "ChordEdit: One-Step Low-Energy Transport for Image Editing",
    titleTag: "First / Co-first",
    paperUrl: "https://arxiv.org/abs/2602.19083",
    badges: [
      { label: "Oral", className: "badge-oral" }
    ]
  },
  {
    year: "2026",
    venue: "WWW 2026",
    title: "Riemannian Liquid Spatio-Temporal Graph Network",
    titleTag: "First / Co-first",
    paperUrl: "https://arxiv.org/abs/2601.14115",
    badges: [
      { label: "Oral", className: "badge-oral" }
    ]
  },
  {
    year: "2026",
    venue: "ACL 2026",
    title: "MMErroR: A Benchmark for Erroneous Reasoning in Vision-Language Models",
    paperUrl: "https://arxiv.org/abs/2601.03331",
    badges: [
      { label: "Main Track", className: "badge-main" }
    ]
  },
  {
    year: "2024",
    venue: "SIGKDD 2024",
    title: "A novel prompt tuning for graph transformers: Tailoring prompts to graph topologies",
    titleTag: "First / Co-first",
    paperUrl: "https://doi.org/10.1145/3637528.3671804",
    badges: []
  },
  {
    year: "2024",
    venue: "ACM MM 2024",
    title: "Beyond direct relationships: Exploring multi-order label pair dependencies for knowledge distillation",
    titleTag: "First / Co-first",
    paperUrl: "https://doi.org/10.1145/3664647.3681029",
    badges: []
  }
];

function renderInterestChips() {
  const container = document.getElementById("interest-cloud");
  if (!container) {
    return;
  }

  container.innerHTML = interests
    .map((item) => `<span class="interest-chip">${item}</span>`)
    .join("");
}

function renderPublications() {
  const container = document.getElementById("publication-list");
  if (!container) {
    return;
  }

  publications.forEach((publication) => {
    const article = document.createElement("article");
    article.className = "publication-card reveal";

    const badges = publication.badges
      .map(
        (badge) =>
          `<span class="badge ${badge.className}">${badge.label}</span>`
      )
      .join("");
    const titleTag = publication.titleTag
      ? `<span class="publication-title-tag">${publication.titleTag}</span>`
      : "";
    const paperLink = publication.paperUrl
      ? `
        <div class="publication-links">
          <a class="publication-link" href="${publication.paperUrl}" target="_blank" rel="noreferrer">Paper</a>
        </div>
      `
      : "";

    article.innerHTML = `
      <div class="publication-year">${publication.year}</div>
      <div>
        <p class="publication-venue">${publication.venue}</p>
        <h3 class="publication-title">${titleTag}${publication.title}</h3>
        ${badges ? `<div class="publication-badges">${badges}</div>` : ""}
        ${paperLink}
      </div>
    `;

    container.appendChild(article);
  });
}

function setupScrollState() {
  const header = document.getElementById("site-header");

  const onScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupRevealAnimation() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  const navLinks = nav.querySelectorAll("a");

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

function setCurrentYear() {
  const year = document.getElementById("current-year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

renderInterestChips();
renderPublications();
setupScrollState();
setupRevealAnimation();
setupMenu();
setCurrentYear();
