// Плавная прокрутка для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Обновляем URL без перезагрузки страницы
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Кнопка "Наверх"
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Очищаем хэш в URL
        if (history.pushState) {
            history.pushState(null, null, ' ');
        } else {
            location.hash = '';
        }
    });
}

// Анимация элементов при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .case-card');
    const screenPosition = window.innerHeight / 1.3;

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;

        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

// Инициализация анимации
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем начальные стили через классы
    document.querySelectorAll('.service-card, .case-card').forEach(element => {
        element.classList.add('animate-element');
    });

    // Запускаем проверку сразу после загрузки
    animateOnScroll();
});

// Оптимизация производительности при скролле
let isScrolling;
window.addEventListener('scroll', () => {
    // Отменяем предыдущий таймер
    window.clearTimeout(isScrolling);
    
    // Устанавливаем новый таймер
    isScrolling = setTimeout(() => {
        animateOnScroll();
    }, 66); // ~15fps
}, { passive: true });
