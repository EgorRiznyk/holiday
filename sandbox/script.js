/* 🎈 Основные эффекты для сайта — чистая версия */

/* ===========================
🌸 1. Побочные шарики
=========================== */
function createSideBalloons() {
    const leftContainer = document.getElementById('leftBalloons');
    const rightContainer = document.getElementById('rightBalloons');
    if (!leftContainer || !rightContainer) return;

    const balloonsCount = 10;
    for (let i = 0; i < balloonsCount; i++) {
        const balloonLeft = document.createElement('div');
        balloonLeft.className = 'balloon';
        balloonLeft.style.top = Math.random() * 100 + 'vh';
        balloonLeft.style.animationDuration = (Math.random() * 3 + 3) + 's';
        leftContainer.appendChild(balloonLeft);

        const balloonRight = document.createElement('div');
        balloonRight.className = 'balloon';
        balloonRight.style.top = Math.random() * 100 + 'vh';
        balloonRight.style.animationDuration = (Math.random() * 3 + 3) + 's';
        rightContainer.appendChild(balloonRight);
    }
}


/* ===========================
🎨 2. Шарики внутри контейнера
=========================== */
function createSketchBalloons() {
    const container = document.querySelector('.container');
    if (!container) return;

    const sketchContainer = document.createElement('div');
    sketchContainer.className = 'sketch-balloons';
    container.prepend(sketchContainer);

    const balloonCount = window.innerWidth <= 768 ? 25 : 15;

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'sketch-balloon';

        // Позиция и размеры
        balloon.style.left = Math.random() * 95 + '%';
        balloon.style.top = Math.random() * 85 + '%';
        const size = Math.random() * 25 + 15;
        balloon.style.width = size + 'px';
        balloon.style.height = size + 'px';
        balloon.style.opacity = Math.random() * 0.4 + 0.4;
        balloon.style.animationDuration = (Math.random() * 5 + 5) + 's';
        balloon.style.animationDelay = Math.random() * 4 + 's';

        sketchContainer.appendChild(balloon);
    }
}


/* ===========================
   📈 3. Анимация статистики
=========================== */
let statsAnimating = false;

function animateStats() {
    if (statsAnimating) return;
    statsAnimating = true;

    const stats = document.querySelectorAll('.stat-number');
    let completed = 0;

    stats.forEach(stat => {
        const targetText = stat.textContent;
        const target = parseInt(targetText);
        let suffix = '';
        if (targetText.includes('+')) suffix = '+';
        else if (targetText.includes('%')) suffix = '%';
        else if (targetText.includes('/')) suffix = '/7';

        let current = 0;
        const increment = target / 50;

        stat.textContent = '0' + suffix;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                completed++;
                if (completed === stats.length) statsAnimating = false;
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 40);
    });
}

// Наблюдатель для запуска анимации при появлении блока
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) animateStats();
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) observer.observe(statsSection);


/* ===========================
   🖱️ 4. Кастомный курсор-шарик
=========================== */
if (window.innerWidth > 768) {
    const balloonCursor = document.createElement('div');
    balloonCursor.classList.add('cursor-balloon');
    document.body.appendChild(balloonCursor);

    const balloonString = document.createElement('div');
    balloonString.classList.add('cursor-string');
    document.body.appendChild(balloonString);

    document.addEventListener('mousemove', e => {
        const overButton = e.target.closest('a, button, .cta-button');

        if (overButton) {
            balloonCursor.style.display = 'none';
            balloonString.style.display = 'none';
        } else {
            balloonCursor.style.display = 'block';
            balloonString.style.display = 'block';
            balloonCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            balloonString.style.transform = `translate(${e.clientX}px, ${e.clientY + 15}px) translate(-50%, 0)`;
        }
    });
}


/* ===========================
   💌 5. Модальное окно связи
=========================== */
const contactBtn = document.getElementById('contactBtn');
const modal = document.getElementById('contactModal');

if (contactBtn && modal) {
    const closeBtn = modal.querySelector('.modal-close');

    // Открываем
    contactBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    // Закрываем по кнопке
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрываем по клику вне окна
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Закрываем по Esc
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') modal.style.display = 'none';
    });

    // Обработка кнопок выбора
    modal.querySelectorAll('.modal-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            if (action === 'call') {
                window.location.href = "tel:+37377742921";
            } else if (action === 'telegram') {
                window.open("https://t.me/+8axplsiFQ6FiNjUy", "_blank");
            } else if (action === 'whatsapp') {
                window.location.href = "https://api.whatsapp.com/send/?phone=37377742921&text&type=phone_number&app_absent=0";
            }
            modal.style.display = 'none';
        });
    });
}


/* ===========================
   🚀 6. Запуск после загрузки
=========================== */
document.addEventListener('DOMContentLoaded', () => {
    createSketchBalloons();
    createSideBalloons();
});





/* 💖 Волшебные пожелания */
const wishes = [
    "Пусть этот праздник будет незабываемым ✨",
    "Здесь начинается радость 🎈",
    "Каждая деталь — с любовью 💕",
    "Сегодня будет волшебно 🌸",
    "Создаём праздник мечты 💖"
];

function showWish(x = window.innerWidth / 2, y = window.innerHeight - 80) {
    const popup = document.getElementById('wishPopup');
    const text = wishes[Math.floor(Math.random() * wishes.length)];
    popup.textContent = text;

    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 2200);

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = Math.random() > 0.5 ? '💖' : '🎈';
        heart.style.left = x + (Math.random() * 40 - 20) + 'px';
        heart.style.top = y + 'px';
        heart.style.animationDuration = (Math.random() * 1 + 2) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
}

/* Запуск по кнопке */
if (contactBtn) {
    contactBtn.addEventListener('click', e => {
        showWish(e.clientX, e.clientY);
    });
}

/* И по клику по странице */
document.addEventListener('click', e => {
    if (!e.target.closest('button, a')) {
        showWish(e.clientX, e.clientY);
    }
});
