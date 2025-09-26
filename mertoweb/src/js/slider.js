const products = [
    {
        img: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-2.png",
        thumb: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-2.png",
        title: "Athletics Embroidered Relaxed Hoodie",
        desc: "64% cotton, 36% polyester • Do not dry clean • Machine wash",
        price: "$89",
        oldPrice: "$129",
    },
    {
        img: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-4.png",
        thumb: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-4.png",
        title: "Casual Oversized Streetwear",
        desc: "100% cotton • Do not bleach • Machine wash cold",
        price: "$89",
        oldPrice: "$129",
    },
    {
        img: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-3.png",
        thumb: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-3.png",
        title: "Classic Summer T-Shirt",
        desc: "Soft & breathable • 80% cotton, 20% polyester",
        price: "$89",
        oldPrice: "$129",
    },
    {
        img: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-1.png",
        thumb: "https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/09/slide-hoodie-1.png",
        title: "Classic Summer T-Shirt",
        desc: "Soft & breathable • 80% cotton, 20% polyester",
        price: "$89",
        oldPrice: "$129",
    },
];

const mainImage = document.getElementById("mainImage");
const productPrice = document.getElementById("productPrice");
const thumbsContainer = document.getElementById("thumbsContainer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cardPrev = document.getElementById("cardPrev");
const cardNext = document.getElementById("cardNext");

let currentIndex = 0;

function renderProduct(index) {
    const product = products[index];
    mainImage.src = product.img;
    productPrice.textContent = product.price;
    productOldPrice.textContent = product.oldPrice;

    thumbsContainer.innerHTML = "";
    products.forEach((p, i) => {
        const thumb = document.createElement("img");
        thumb.src = p.thumb;
        thumb.className =
            "w-14 h-14 object-cover rounded cursor-pointer border transition " +
            (i === index
                ? "border-black scale-105 shadow"
                : "border-gray-300 hover:border-black");
        thumb.addEventListener("click", () => {
            currentIndex = i;
            renderProduct(currentIndex);
        });
        thumbsContainer.appendChild(thumb);
    });
}

function nextProduct() {
    currentIndex = (currentIndex + 1) % products.length;
    renderProduct(currentIndex);
}

function prevProduct() {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    renderProduct(currentIndex);
}

nextBtn.addEventListener("click", nextProduct);
prevBtn.addEventListener("click", prevProduct);
cardNext.addEventListener("click", nextProduct);
cardPrev.addEventListener("click", prevProduct);

renderProduct(currentIndex);

const sliderTrack = document.getElementById("sliderTrack");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

const visibleSlides = 3; // eyni anda görünən slide sayı
const slides = sliderTrack.children;
const slideWidth = sliderTrack.clientWidth / visibleSlides; // 1 slide eni

btnNext.addEventListener("click", () => {
    // Əgər son slide-lara çatmışıqsa, ilk elementi sona əlavə et
    if (sliderTrack.scrollLeft + sliderTrack.clientWidth >= sliderTrack.scrollWidth) {
        sliderTrack.appendChild(slides[0]);
        sliderTrack.scrollLeft -= slideWidth;
    }
    sliderTrack.scrollBy({ left: slideWidth, behavior: "smooth" });
});

btnPrev.addEventListener("click", () => {
    // Əgər scroll başındayıqsa, son elementi başa əlavə et
    if (sliderTrack.scrollLeft <= 0) {
        sliderTrack.insertBefore(slides[slides.length - 1], slides[0]);
        sliderTrack.scrollLeft += slideWidth;
    }
    sliderTrack.scrollBy({ left: -slideWidth, behavior: "smooth" });
});



