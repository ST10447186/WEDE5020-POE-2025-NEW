document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const captionText = document.getElementById("caption");
  const closeBtn = document.getElementById("close-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let currentImageIndex = 0;
  // New variable to store the element that opened the lightbox (for focus return)
  let previouslyFocusedElement = null;

  // --- 1. Open Lightbox and Initialize Index ---
  galleryItems.forEach((item, index) => {
    // Setting data-index here is good practice, but it's already in the HTML.
    // Keeping it here makes the JS more self-contained if HTML was missing it.
    item.dataset.index = index;

    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Store the element that was focused before the modal opened
      previouslyFocusedElement = document.activeElement;

      // Set the current index based on the clicked image's data-index
      currentImageIndex = parseInt(item.dataset.index);

      showImage(currentImageIndex);
      lightbox.style.display = "block";

      // FIX 1: Accessibility - Move focus into the lightbox when it opens.
      // Focusing the close button is a common and accessible practice.
      closeBtn.focus();
    });
  });

  // --- 2. Function to Display Image ---
  function showImage(index) {
    // Use the modulo operator for a more concise way to handle wrapping,
    // although the existing if/else logic is also correct.
    const len = galleryItems.length;

    // The existing logic for wrapping is fine, ensuring the new index is correctly applied.
    if (index < 0) {
      currentImageIndex = len - 1;
    } else if (index >= len) {
      currentImageIndex = 0;
    } else {
      currentImageIndex = index;
    }

    const currentItem = galleryItems[currentImageIndex];

    lightboxImage.src = currentItem.href;
    lightboxImage.alt = currentItem.dataset.caption || ""; // Good practice: sync alt text with caption
    captionText.textContent = currentItem.dataset.caption || "";
  }

  // --- Helper Function to Close Lightbox ---
  function closeLightbox() {
    lightbox.style.display = "none";

    // FIX 2: Accessibility - Return focus to the element that opened the lightbox.
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  // --- 3. Navigation Controls ---
  prevBtn.addEventListener("click", () => {
    showImage(currentImageIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    showImage(currentImageIndex + 1);
  });

  // --- 4. Close Lightbox ---
  closeBtn.addEventListener("click", closeLightbox);

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close using the ESC key and handle keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Only handle keys if the lightbox is visible
    if (lightbox.style.display === "block") {
      // Handle Escape key
      if (e.key === "Escape") {
        closeLightbox();
        // Prevent default browser behavior (though not strictly necessary for escape)
        e.preventDefault();
        return; // Exit function after closing
      }

      // FIX 3: Robustness - Handle arrow keys only when modal is open
      if (e.key === "ArrowLeft") {
        e.preventDefault(); // Stop page scrolling
        showImage(currentImageIndex - 1);
      }

      if (e.key === "ArrowRight") {
        e.preventDefault(); // Stop page scrolling
        showImage(currentImageIndex + 1);
      }
    }
  });
});
