document.addEventListener("DOMContentLoaded", () => {
  /* 1 · Config */
  const descriptions = [
    {
      label: "Title: Main",
      selector: ".main-title",
      desc: "Primary headline that communicates the core message.",
      linksRelated: [
        {
          text: "Example 1",
          href: "https://www.runmyprocess.com/agribusiness/",
        },
        {
          text: "Example 2",
          href: "https://www.runmyprocess.com/ecommerce-and-retail/",
        },
      ],
    },
    {
      label: "Title: Secondary",
      selector: ".secondary-title",
      desc: "Sub-heading that provides supporting context.",
      linksRelated: [
        {
          text: "Example 1",
          href: "https://www.runmyprocess.com/financial-and-insurance-services/",
        },
        {
          text: "Example 2",
          href: "https://www.runmyprocess.com/national-infrastructure/",
        },
      ],
    },
    {
      label: "Font Family",
      selector: ".font-preview",
      desc: "Sample text with the chosen font family.",
      linksRelated: [
        {
          text: "Google Fonts – Ubuntu Sans",
          href: "https://fonts.google.com/specimen/Ubuntu+Sans",
        },
        {
          text: "MDN – font-family",
          href: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-family",
        },
      ],
    },
  ];

  /* 2 · Helpers (idénticos a la versión previa) */
  const getCssRuleText = (sel) => {
    const out = [];
    for (const sh of document.styleSheets) {
      try {
        for (const r of sh.cssRules) {
          if (r.type !== CSSRule.STYLE_RULE) continue;
          const sels = r.selectorText.split(",").map((s) => s.trim());
          if (
            sels.some(
              (s) =>
                s === sel || s.startsWith(sel + "::") || s.startsWith(sel + ":")
            )
          )
            out.push(r.cssText);
        }
      } catch {}
    }
    return out.join("\n");
  };
  const formatHtml = (html) => {
    const lines = html.replace(/>\s*</g, ">\n<").split("\n");
    let i = 0;
    return lines
      .map((l) => {
        if (/^\s*<\/\w/.test(l)) i--;
        const out = "  ".repeat(i) + l.trim();
        if (/^\s*<\w[^>]*[^/]>.*$/.test(l)) i++;
        return out;
      })
      .join("\n");
  };
  const formatCss = (css) =>
    css
      .split(/(?<=})/)
      .map((b) =>
        b
          .trim()
          .replace(/{/, "{\n  ")
          .replace(/;\s*/g, ";\n  ")
          .replace(/\s*}\s*$/, "\n}")
      )
      .join("\n\n");
  const showToast = (m) => {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = m;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3e3);
  };
  const enableCopy = (el, label) => {
    el.title = "Click to copy";
    el.addEventListener("click", () =>
      navigator.clipboard
        .writeText(el.textContent)
        .then(() => showToast(`${label} copied!`))
        .catch(() => showToast("Copy failed"))
    );
  };

  /* 3 · DOM refs */
  const btnBox = document.getElementById("descriptions-container");
  const display = document.getElementById("display-area");
  descriptions.forEach(({ selector }) =>
    document.querySelector(selector)?.classList.add("hidden")
  );

  /* 4 · Buttons and panels */
  descriptions.forEach(({ label, selector, desc, linksRelated }) => {
    const btn = document.createElement("p");
    btn.className = "description";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      btnBox
        .querySelectorAll(".description")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      display.innerHTML = "";

      const target = document.querySelector(selector);
      if (!target) return;

      /* Descripción */
      const d = document.createElement("p");
      d.className = "pretty-desc";
      d.textContent = desc;
      display.appendChild(d);

      /* Render */
      const render = document.createElement("div");
      render.className = "panel render-panel";
      const clone = target.cloneNode(true);
      clone.classList.remove("hidden", "highlighted");
      render.appendChild(clone);

      /* Links as tags */
      const links = document.createElement("div");
      links.className = "panel links-panel";
      linksRelated.forEach(({ text, href }) => {
        const a = document.createElement("a");
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "tag-link";
        a.textContent = text;
        links.appendChild(a);
      });

      /* HTML */
      const htmlP = document.createElement("div");
      htmlP.className = "panel";
      const hPre = document.createElement("pre");
      const hCode = document.createElement("code");
      hCode.className = "language-html";
      hCode.textContent = formatHtml(target.outerHTML);
      hPre.appendChild(hCode);
      htmlP.appendChild(hPre);

      /* CSS */
      const cssP = document.createElement("div");
      cssP.className = "panel";
      const cPre = document.createElement("pre");
      const cCode = document.createElement("code");
      cCode.className = "language-css";
      cCode.textContent =
        formatCss(getCssRuleText(selector)) || "/* rule not found */";
      cPre.appendChild(cCode);
      cssP.appendChild(cPre);

      display.append(render, links, htmlP, cssP);

      [hCode, cCode].forEach((el) => {
        hljs.highlightElement(el);
        enableCopy(
          el,
          el.className.includes("html") ? "HTML code" : "CSS code"
        );
      });
      display.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    btnBox.appendChild(btn);
  });

  /* 5 · Selección inicial */
  btnBox.querySelector(".description")?.click();
});
