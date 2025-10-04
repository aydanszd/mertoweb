const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 800, 
    effect: 'slide', 
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true, 
        dynamicBullets: false,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
});