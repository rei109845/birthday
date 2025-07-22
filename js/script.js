document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("surpriseBtn");
  const surprise = document.getElementById("surprise");
  const audio = document.getElementById("bgMusic");
  const doorContainer = document.getElementById("doorContainer");
  const openDoorBtn = document.getElementById("openDoorBtn");
  const mainContent = document.getElementById("mainContent");
  const galleryImages = document.querySelectorAll('.photo');
  const typewriter = document.getElementById("typewriter");
  const msgContent = document.getElementById("birthdayMsg");

  // Door open animation
  openDoorBtn.addEventListener("click", () => {
    document.body.classList.add("door-open");

    setTimeout(() => {
      doorContainer.style.display = "none";
      mainContent.classList.remove("hidden");

      // Typewriter effect trigger
      typeTypewriter("Happy Birthday, My Love!", typewriter, 75);
    }, 1500);
  });

  // Surprise button functionality
  btn.addEventListener("click", function () {
    msgContent.style.display = "none";
    surprise.classList.remove("hidden");
    surprise.scrollIntoView({ behavior: 'smooth' });

    if (audio) {
      audio.play().catch(error => {
        console.warn("Audio playback failed:", error);
      });
    }

    // Fade in gallery images with stagger
    galleryImages.forEach((img, index) => {
      img.style.setProperty('--i', index + 1);
      setTimeout(() => {
        img.style.opacity = 1;
      }, (index + 1) * 1000);
    });
  });

  // Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector("#lightbox .close");

  document.querySelectorAll(".photo").forEach(img => {
    img.addEventListener("click", () => {
      if (lightbox && lightboxImg) {
        lightbox.classList.remove("hidden");
        lightboxImg.src = img.src;
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
    });
  }

  // Typewriter effect
  function typeTypewriter(text, target, speed = 100) {
    let i = 0;
    function type() {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    target.textContent = "";
    type();
  }
});

// Autoplay fallback
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgMusic");

  audio.currentTime = 15;

  audio.play().catch(() => {
    document.body.addEventListener("click", () => {
      audio.currentTime = 15;
      audio.play();
    }, { once: true });
  });
});
