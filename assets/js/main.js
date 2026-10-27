document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("mainNav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".copy-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var url = b.getAttribute("data-copy");
      var done = function () {
        var old = b.textContent;
        b.textContent = "Copied ✓";
        setTimeout(function () { b.textContent = old; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
        done();
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Scroll reveal — progressive enhancement only. The CSS hides .reveal
  // elements solely under html.js; if anything here fails, reveal all.
  var els = document.querySelectorAll(".reveal");
  if (els.length) {
    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
      els.forEach(function (el) { io.observe(el); });
    }
  }

  // Newsletter form fallback: until a form endpoint is configured, the
  // submit opens the visitor's mail app with the subscribe request and
  // their typed address — the same flow the site has always used.
  document.querySelectorAll("form.news-form[data-mailto]").forEach(function (f) {
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var input = f.querySelector("input[type=email]");
      var email = input ? input.value : "";
      var addr = f.getAttribute("data-mailto");
      var subject = encodeURIComponent("Subscribe to Daily Insights");
      var body = encodeURIComponent(
        "Please subscribe me to Daily Insights.\n\nMy email: " + email);
      window.location.href =
        "mailto:" + addr + "?subject=" + subject + "&body=" + body;
    });
  });
});
