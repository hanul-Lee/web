// Enhancements for pre-rendered project pages.
(() => {
  if (!document.body.dataset.project) return;
  installImageViewer();
  const progressItems = [
    ["overview", "개요"],
    ["brief", "핵심"],
    ["context", "배경"],
    ["evidence", "근거"],
    ["reframe", "재정의"],
    ["decision", "결정"],
    ["iteration", "조정"],
    ["solution", "경험"],
    ["impact", "결과"],
    ["reflection", "회고"],
  ].filter(([id]) => document.getElementById(id)).sort(([a], [b]) =>
    document.getElementById(a).compareDocumentPosition(document.getElementById(b)) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );
  if (progressItems.length) {
    const progressMarkup = progressItems
      .map(([id, label]) => `<a href="#${id}">${label}</a>`)
      .join("");
    document
      .querySelector(".case-main")
      .insertAdjacentHTML(
        "beforeend",
        `<nav class="case-progress" aria-label="사례 진행 순서">${progressMarkup}</nav>`,
      );
    const progressLinks = [...document.querySelectorAll(".case-progress a")];
    const progressSections = progressLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const setActiveSection = (id) => {
      progressLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    setActiveSection("overview");
    if ("IntersectionObserver" in window) {
      const progressObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActiveSection(visible.target.id);
        },
        { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.15, 0.35, 0.6] },
      );
      progressSections.forEach((section) => progressObserver.observe(section));
    }
  }

function installImageViewer() {
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  const dialog = document.createElement("dialog");
  dialog.className = "image-viewer";
  dialog.setAttribute("aria-label", "프로젝트 화면 확대");
  dialog.innerHTML = '<div class="viewer-toolbar"><p id="viewer-caption"></p><button type="button" autofocus>닫기 <span aria-hidden="true">×</span></button></div><div class="viewer-canvas"></div>';
  document.body.append(dialog);
  const image = document.createElement("img");
  const closeButton = dialog.querySelector("button");
  let opener;
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("viewer-open");
    opener?.focus({ preventScroll: true });
  });
  document.querySelectorAll(".visual-frame, .comparison-image, .ui-stage .final-mockup").forEach(frame => {
    const source = frame.querySelector("img");
    if (!source) return;
    frame.classList.add("zoomable-frame");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "image-zoom";
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M7.5 10.5h6M10.5 7.5v6"/></svg><span>화면 확대</span>';
    button.setAttribute("aria-label", `${source.alt} 확대`);
    button.addEventListener("click", () => {
      opener = button;
      image.src = source.src;
      image.alt = source.alt;
      image.style.setProperty("--viewer-image-width", `${Math.min(source.naturalWidth || 900, 1200)}px`);
      dialog.querySelector(".viewer-canvas").replaceChildren(image);
      dialog.querySelector("#viewer-caption").textContent = source.alt;
      dialog.showModal();
      document.body.classList.add("viewer-open");
      dialog.querySelector(".viewer-canvas").scrollTo(0, 0);
    });
    frame.append(button);
  });
}

})();
