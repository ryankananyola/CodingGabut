document.addEventListener("DOMContentLoaded", () => {
    setupFireworks();
    releaseBalloons();
});

// ----------------- FIREWORKS EFFECT -----------------
function setupFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];

    class Firework {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.particles = [];
            
            for (let i = 0; i < 30; i++) {
                this.particles.push(new Particle(this.x, this.y, this.color));
            }
        }

        update() {
            this.particles.forEach(p => p.update());
        }

        draw() {
            this.particles.forEach(p => p.draw());
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = Math.random() * 4 + 2;
            this.speedX = (Math.random() - 0.5) * 8;
            this.speedY = (Math.random() - 0.5) * 8;
            this.life = 100;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 1;
        }

        draw() {
            ctx.globalAlpha = this.life / 100;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((fw, i) => {
            fw.update();
            fw.draw();
            if (fw.particles[0].life <= 0) {
                fireworks.splice(i, 1);
            }
        });
        requestAnimationFrame(animateFireworks);
    }

    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 2);
        const colors = ["#ff0000", "#ff7300", "#ffeb00", "#00ff2b", "#00e1ff", "#7300ff", "#ff00d9"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        fireworks.push(new Firework(x, y, color));
    }, 1000);

    animateFireworks();
}

// ----------------- BALLOON EFFECT -----------------
function releaseBalloons() {
    setInterval(() => {
        const balloon = document.createElement("div");
        balloon.className = "balloon";

        // Pilih warna acak
        const colors = ["#ff0000", "#ff7300", "#ffeb00", "#00ff2b", "#00e1ff", "#7300ff", "#ff00d9"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        balloon.style.backgroundColor = randomColor;
        balloon.style.left = `${Math.random() * window.innerWidth}px`;

        document.body.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, 5000);
    }, 1200);
}

function changeBackground() {
    const colors = ["#FFDEE9", "#B5FFFC", "#D4FC79", "#FFD3A5", "#B0EACD"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.style.background = randomColor;
    document.body.style.transition = "background 1s ease-in-out";
}

// Ubah warna background setiap 5 detik
setInterval(changeBackground, 2000);

