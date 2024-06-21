document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        document.querySelectorAll('.header__nav a').forEach(link => {
            link.classList.remove('active');
        });

        this.classList.add('active');
    });
});


const slides = [
    { img: './assets/images/banner.png' },
    { img: './assets/images/banner 2.png' },
    { img: './assets/images/banner 3.png' }
];

const imgContainer = document.querySelector('.slider__container');
const dotsContainer = document.querySelector('.slider__dots');
let currentSlide = 0;

function showSlide(index) {
    const slide = slides[index];
    imgContainer.innerHTML = `<img src="${slide.img}" alt="slide image">`;
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

showSlide(currentSlide);
setInterval(() => {
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
}, 5000);