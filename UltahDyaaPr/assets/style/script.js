document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!"); // Debugging

    const galleryImages = document.querySelectorAll(".gallery img");

    if (galleryImages.length === 0) {
        console.warn("No images found in .gallery!");
        return;
    }

    // Menggunakan IntersectionObserver untuk deteksi gambar yang masuk viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                createFireworkEffect(entry.target);
                observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
            }
        });
    }, {
        root: null, // Pakai viewport sebagai area pengamatan
        threshold: 0.2, // 20% gambar harus masuk viewport untuk dianggap terlihat
    });

    galleryImages.forEach(img => {
        observer.observe(img); // Mendaftarkan setiap gambar ke observer
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

    // Efek Kembang Api
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
        const numParticles = 15;
        const rect = element.getBoundingClientRect();

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: rect.left + rect.width / 2 + window.scrollX,
                y: rect.top + rect.height / 2 + window.scrollY,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 5,
                speedY: (Math.random() - 0.5) * 5,
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
});
