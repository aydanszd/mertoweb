const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 800, // animasiya sürəti
    effect: 'slide', // səhifə kimi keçid animasiyası
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,   // 🔑 nöqtələr qalacaq
        dynamicBullets: false, // nöqtələrin sabit qalması üçün
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
});