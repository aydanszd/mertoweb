
document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', function () {
        const newImage = this.getAttribute('data-image');
        const mainImage = document.getElementById('mainImage');
        mainImage.src = newImage;
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('ring', 'ring-black'));
        this.classList.add('ring', 'ring-black');
    });
});

// Zoom funksiyası
const imageWrapper = document.getElementById('imageWrapper');
const mainImage = document.getElementById('mainImage');

imageWrapper.addEventListener('mousemove', (e) => {
    const rect = imageWrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mainImage.style.transformOrigin = `${x}% ${y}%`;
    mainImage.style.transform = 'scale(2.5)';
    imageWrapper.style.cursor = 'zoom-out';
});

imageWrapper.addEventListener('mouseleave', () => {
    mainImage.style.transform = 'scale(1)';
    imageWrapper.style.cursor = 'zoom-in';
});

const thumbs = document.querySelectorAll('.thumb');
thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('border-gray-800'));
        thumb.classList.add('border-gray-800');
        const newImage = thumb.dataset.image;
        mainImage.src = newImage;
    });
});
const qtyInput = document.getElementById('qtyInput');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');

decreaseBtn.addEventListener('click', () => {
    if (qtyInput.value > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
});
document.getElementById('addToCartBtn').addEventListener('click', () => {
    alert(`${qtyInput.value} ədəd məhsul səbətə əlavə edildi!`);
});

// Geri sayım taymeri
// function startCountdown() {
//     const endDate = new Date();
//     endDate.setHours(endDate.getHours() + 12);

//     setInterval(() => {
//         const now = new Date().getTime();
//         const distance = endDate - now;

//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         document.getElementById('days').textContent = String(days).padStart(2, '0');
//         document.getElementById('hours').textContent = String(hours).padStart(2, '0');
//         document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
//         document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
//     }, 1000);
// }

// startCountdown();

const sliderContainer = document.getElementById("flashbest-slider");
const btnNext = document.getElementById("nextbest");
const btnPrev = document.getElementById("prevbest");
const track = sliderContainer.querySelector('div.flex');

const cardWidth = track.children[0].offsetWidth + parseInt(getComputedStyle(track.children[0]).marginRight);
btnNext.addEventListener("click", () => {
    const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;
    if (Math.abs(sliderContainer.scrollLeft - maxScroll) < 5) {
        track.appendChild(track.children[0]);
        sliderContainer.scrollBy({ left: -cardWidth, behavior: "auto" });
    }
    sliderContainer.scrollBy({ left: cardWidth, behavior: "smooth" });
});
btnPrev.addEventListener("click", () => {
    if (sliderContainer.scrollLeft <= 0) {
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        sliderContainer.scrollBy({ left: cardWidth, behavior: "auto" });
    }
    sliderContainer.scrollBy({ left: -cardWidth, behavior: "smooth" });
});

setInterval(() => {
    track.appendChild(track.children[0]);
    sliderContainer.scrollBy({ left: -cardWidth, behavior: "auto" });
}, 100000);
