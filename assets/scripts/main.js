const imageHashes = ["#img1", "#img2", "#img3"];
const tileLinks = document.querySelectorAll(".tier-list-item");
let lastTrigger = null;

function closeLightbox() {
  window.location.replace("#");
  if (lastTrigger) {
    lastTrigger.focus();
  }
}

function moveLightbox(step) {
  const currentIndex = imageHashes.indexOf(window.location.hash);
  if (currentIndex === -1) {
    return;
  }

  const nextIndex = (currentIndex + step + imageHashes.length) % imageHashes.length;
  window.location.replace(imageHashes[nextIndex]);
}

function syncLightboxFocus() {
  const activeBox = document.querySelector(window.location.hash);
  if (activeBox && activeBox.classList.contains("lightbox")) {
    const closeButton = activeBox.querySelector(".close");
    if (closeButton) {
      closeButton.focus();
    }
  }
}

function getActiveLightbox() {
  const activeBox = document.querySelector(window.location.hash);
  if (activeBox && activeBox.classList.contains("lightbox")) {
    return activeBox;
  }

  return null;
}

function trapFocusInLightbox(event) {
  if (event.key !== "Tab") {
    return;
  }

  const activeBox = getActiveLightbox();
  if (!activeBox) {
    return;
  }

  const focusable = activeBox.querySelectorAll("a[href], button, [tabindex]:not([tabindex='-1'])");
  if (!focusable.length) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const current = document.activeElement;

  if (event.shiftKey && current === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && current === last) {
    event.preventDefault();
    first.focus();
  }
}

tileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    lastTrigger = link;
  });
});

document.addEventListener("keydown", (event) => {
  const currentHash = window.location.hash;
  if (!currentHash.startsWith("#img")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowRight") {
    moveLightbox(1);
  } else if (event.key === "ArrowLeft") {
    moveLightbox(-1);
  }
});

document.addEventListener("keydown", trapFocusInLightbox);

document.querySelectorAll(".lightbox a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = link.getAttribute("href");

    if (target === "#") {
      closeLightbox();
      return;
    }

    window.location.replace(target);
  });
});

window.addEventListener("hashchange", syncLightboxFocus);
syncLightboxFocus();
