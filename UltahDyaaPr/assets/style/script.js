document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!"); // Debugging

    const galleryImages = document.querySelectorAll(".gallery img");

    if (galleryImages.length === 0) {
        console.warn("No images found in .gallery!");
        return;
    }

    // Tambahkan efek fade-in satu per satu setelah halaman dimuat
    galleryImages.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add("show");
        }, index * 200); // Efek muncul satu per satu setiap 200ms (biar lebih jelas)
    });

    // Menambahkan event listener untuk efek kembang api saat gambar diklik
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            createFireworkEffect(img);
        });
    });

    // Efek hover tombol kembali
    const backButton = document.querySelector(".back-btn");
    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.preventDefault();
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 500);
        });
    }
});

// Fungsi efek kembang api
function createFireworkEffect(element) {
    const canvas = document.getElementById("fireworksCanvas");
    if (!canvas) {
        console.error("Canvas not found!");
        return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 20; // Lebih banyak efek agar terlihat keren
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + rect.height / 2 + window.scrollY,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 6, // Gerakan lebih dinamis
            speedY: (Math.random() - 0.5) * 6,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            alpha: 1,
        });
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.alpha -= 0.02;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(animateFireworks);
        }
    }

    animateFireworks();
}
