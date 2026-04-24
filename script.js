const canvas = document.getElementById('matrixCanvas');
const navToggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.header');
const navMenu = document.getElementById('site-nav');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+-/';
    const chars = matrixChars.split('');
    const fontSize = 16;
    let columns = 0;
    let drops = [];
    let animationId = null;

    function setupMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.ceil(canvas.width / fontSize);
        drops = Array.from({ length: columns }, () => Math.floor(Math.random() * (canvas.height / fontSize)));
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(2, 11, 13, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < drops.length; i += 1) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const opacity = Math.max(0.14, Math.random() * 0.55);

            ctx.fillStyle = `rgba(224, 255, 64, ${opacity})`;
            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.985) {
                drops[i] = 0;
            } else {
                drops[i] += 1;
            }
        }

        animationId = window.requestAnimationFrame(drawMatrix);
    }

    setupMatrix();
    drawMatrix();

    window.addEventListener('resize', () => {
        if (animationId) {
            window.cancelAnimationFrame(animationId);
        }

        setupMatrix();
        drawMatrix();
    });
}

if (navToggle && header && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open menu');
        });
    });
}
