// WAIT FOR PAGE TO LOAD
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 700);
});

// CURRENT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();


// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

// CLOSE MENU AFTER CLICKING A LINK
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    });
});


// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// ANIMATED STATISTICS
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        counter.textContent = Math.floor(
            target * easedProgress
        ).toLocaleString("en-IN");

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString("en-IN") + "+";
        }
    }

    requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// BACK TO TOP BUTTON
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// CONTACT FORM VALIDATION
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // FRONTEND DEMO ONLY - NO MESSAGE IS SENT TO A SERVER
    formMessage.textContent =
        "Thank you, " + name + "! Your form has been validated. Connect a backend to submit it.";

    contactForm.reset();
});


// GALLERY IMAGE PREVIEW
const galleryImages = document.querySelectorAll(".gallery-img");

galleryImages.forEach(image => {
    image.addEventListener("click", () => {
        const preview = document.createElement("div");

        preview.className = "image-preview";

        preview.innerHTML = `
            <button class="preview-close" aria-label="Close preview">
                &times;
            </button>
            <img src="${image.src}" alt="${image.alt}">
            <p>${image.alt}</p>
        `;

        document.body.appendChild(preview);

        preview.querySelector(".preview-close").addEventListener("click", () => {
            preview.remove();
        });

        preview.addEventListener("click", (event) => {
            if (event.target === preview) {
                preview.remove();
            }
        });

        const closeWithEscape = (event) => {
            if (event.key === "Escape") {
                preview.remove();
                document.removeEventListener("keydown", closeWithEscape);
            }
        };

        document.addEventListener("keydown", closeWithEscape);
    });
});

console.log("Village Information Portal loaded successfully!");