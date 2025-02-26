const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".card");
const cardWidth = cards[0].offsetWidth + 60; // Width of one card + gap
let currentIndex = 0;

// Function to move the carousel
function moveCarousel() {
  const offset = -currentIndex * cardWidth ;
  carousel.style.transform = `translateX(${offset}px)`;

  const middleCardIndex = currentIndex + 2; // Middle card is the third card in the visible set
  currentIndex = (currentIndex + 1) % (cards.length / 2); // Loop back to the beginning

  // Reset the carousel position when it reaches the end
  if (currentIndex === 0) {
    setTimeout(() => {
      carousel.style.transition = "none"; // Disable transition for instant reset
      carousel.style.transform = `translateX(0)`;
      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease"; // Re-enable transition
      }, 50);
    }, 1000); // Wait for the transition to complete
  }
}

// Automatically move the carousel every second
setInterval(moveCarousel, 2000);

// Add initial highlight to the middle card
cards[2].classList.add("middle");

// Intersection Observer for the bottom div animation
const bottomDiv = document.querySelector(".tasks > .bottom");
const bottomImage = document.querySelector(".tasks > .bottom > img");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const intersectionRatio = entry.intersectionRatio; // How much of the div is visible (0 to 1)
      if (entry.isIntersecting) {
        // Trigger animation when the bottom div is visible
        animateImage(intersectionRatio);
      } else {
        // Reset the image position when the bottom div is not visible
        resetImage();
      }
    });
  },
  {
    threshold: Array.from({ length: 11 }, (_, i) => i * 0.1), // Thresholds from 0 to 1 in steps of 0.1
  }
);

// Observe the bottom div
observer.observe(bottomDiv);

// Function to animate the image based on visibility
function animateImage(intersectionRatio) {
  const finalTop = 40; // Final position (30%)
  const initialTop = -30; // Initial position (-30%)
  const finalScale = 0.8; // Final scale (80%)
  const initialScale = 1; // Initial scale (100%)

  // Calculate the current position and scale based on intersectionRatio
  const currentTop = initialTop + intersectionRatio * (finalTop - initialTop); // From -30% to 30%
  const currentScale = initialScale + intersectionRatio * (finalScale - initialScale); // From 100% to 80%

  // Apply the calculated position and scale
  bottomImage.style.position = "absolute";
  bottomImage.style.top = `${currentTop}%`;
  bottomImage.style.transform = `scale(${currentScale})`;
  bottomImage.style.transition = "all 0.5s ease"; // Smooth transition
}

// Function to reset the image position
function resetImage() {
  bottomImage.style.position = "absolute";
  bottomImage.style.top = `-30%`; // Original position
  bottomImage.style.transform = `scale(1)`; // Original scale
  bottomImage.style.transition = "all 0.5s ease"; // Smooth transition
}

const nav = document.querySelector("nav");
let lastScrollY = window.scrollY; // Track the last scroll position

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Scrolling down
    nav.style.transform = "translateY(calc(-100% - 10rem))"; // Hide the nav
  } else {
    // Scrolling up
    nav.style.transform = "translateY(0)"; // Show the nav
  }

  lastScrollY = currentScrollY; // Update the last scroll position
});
function toggleNav() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}





document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".why-choose-snabbit");
  const cards = document.querySelectorAll(".why-choose-snabbit .card");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("arranged"); // Moves h1 to middle
        cards.forEach(card => card.classList.add("arrange")); // Arrange cards
      } else {
        section.classList.remove("arranged"); // Reset h1 position
        cards.forEach(card => card.classList.remove("arrange")); // Scatter back
      }
    },
    { threshold: 0.6 }
  );

  observer.observe(section);
});



document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});

