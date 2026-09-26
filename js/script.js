(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var storedTheme = safeGet("vg-theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme || (prefersDark ? "dark" : "dark")); // default dark regardless of system pref

  themeToggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    safeSet("vg-theme", next);
  });

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  /* ---------- Frontend / Full-Stack framing ----------
     Change this to "fullstack" and redeploy to switch the site's framing. */
  var ACTIVE_VIEW = "frontend";

  var heroRole = document.getElementById("heroRole");
  var heroSub = document.getElementById("heroSub");
  var aboutText = document.getElementById("aboutText");
  var resumeRole = document.getElementById("resumeRole");
  var resumeSummary = document.getElementById("resumeSummary");
  var resumeModeLabel = document.getElementById("resumeModeLabel");

  var CONTENT = {
    frontend: {
      heroRole: "Senior Frontend Software Engineer",
      heroSub: "8 years building fast, data-driven web applications with React, TypeScript & Next.js — from enterprise dashboards at Walmart to platform integrations at ServiceNow.",
      about: "I'm a Full-Stack Software Engineer with 8 years of experience architecting and building scalable web applications and enterprise platforms. My core strength is frontend engineering — React.js, JavaScript, TypeScript, Next.js, and Redux — paired with hands-on backend development in Java and Spring Boot for building REST APIs and integrating enterprise systems. I've delivered high-performance, data-driven applications across retail and enterprise environments, backed by a strong foundation in data structures, algorithms, and system design.",
      resumeRole: "Senior FrontEnd Software Engineer",
      resumeSummary: "Senior FrontEnd Software Engineer with 8 years of experience building scalable web applications and enterprise platforms. Strong expertise in React.js, JavaScript, TypeScript, Next.js, and Redux, with practical experience in Java and Spring Boot. Experienced in developing high-performance, data-driven applications and REST APIs for enterprise environments.",
      resumeModeLabel: "Frontend-focused"
    },
    fullstack: {
      heroRole: "Full-Stack Software Engineer",
      heroSub: "8 years architecting scalable web applications and enterprise platforms — React & TypeScript on the frontend, Java & Spring Boot on the backend, shipped across retail and enterprise environments.",
      about: "I'm a Full-Stack Software Engineer with 8 years of experience architecting and building scalable web applications and enterprise platforms. I work across the stack: React.js, JavaScript, TypeScript, Next.js and Redux on the frontend; Java, Spring Boot and Node.js on the backend, building REST APIs and integrating enterprise systems end to end. I've delivered high-performance, data-driven applications across retail and enterprise environments, backed by a strong foundation in data structures, algorithms, and system design.",
      resumeRole: "Full-Stack Software Engineer",
      resumeSummary: "Full-Stack Software Engineer with 8 years of experience architecting and building scalable web applications and enterprise platforms. Proven frontend expertise in React.js, JavaScript, TypeScript, Next.js, and Redux, paired with hands-on backend development in Java and Spring Boot — building REST APIs and integrating enterprise systems. Delivers high-performance, data-driven applications across retail and enterprise environments, backed by a strong foundation in data structures, algorithms, and system design.",
      resumeModeLabel: "Full-Stack"
    }
  };

  applyView(ACTIVE_VIEW);

  function applyView(view) {
    var c = CONTENT[view] || CONTENT.frontend;
    body.setAttribute("data-view", view);

    heroRole.textContent = c.heroRole;
    heroSub.textContent = c.heroSub;
    aboutText.textContent = c.about;
    resumeRole.textContent = c.resumeRole;
    resumeSummary.textContent = c.resumeSummary;
    resumeModeLabel.textContent = c.resumeModeLabel;

    document.title = "Vikash Gupta — " + c.heroRole;
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Safe localStorage helpers (private browsing can throw) ---------- */
  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
})();
