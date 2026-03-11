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
