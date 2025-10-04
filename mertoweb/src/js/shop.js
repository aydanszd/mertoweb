// // Məhsul kartı yaratmaq üçün funksiya
// function createProductCard(product) {
//     // Şəkil URL-ini əldə et
//     let imageUrl = 'https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/05/furniture-7-300x300.jpg';
    
//     if (product.image) {
//         if (product.image.url) {
//             imageUrl = `http://localhost:1337${product.image.url}`;
//         } else if (product.image.formats?.medium?.url) {
//             imageUrl = `http://localhost:1337${product.image.formats.medium.url}`;
//         } else if (product.image.formats?.small?.url) {
//             imageUrl = `http://localhost:1337${product.image.formats.small.url}`;
//         }
//     }
    
//     return `
//         <article onclick="window.location.href='details.html?id=${product.id}'" 
//                 class="relative group/item bg-white border p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
//             <div class="h-56 flex items-center justify-center bg-gray-50 rounded-lg">
//                 <img src="${imageUrl}"
//                     alt="${product.name}" 
//                     class="object-contain max-h-56"
//                     onerror="this.src='https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/05/furniture-7-300x300.jpg'">
//             </div>
            
//             <h3 class="mt-3 text-sm text-gray-700 line-clamp-2">${product.name}</h3>
//             <div class="mt-3 text-lg font-semibold text-gray-900">$${product.price}</div>

//             <!-- Hover buttons -->
//             <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4
//                 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">
//                 <button class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
//                     <i class="ri-heart-line text-gray-700"></i>
//                 </button>
//                 <button class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
//                     <i class="ri-arrow-left-right-fill text-gray-700"></i>
//                 </button>
//                 <button class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
//                     <i class="ri-shopping-cart-2-line text-gray-700"></i>
//                 </button>
//                 <button class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
//                     <i class="ri-search-line text-gray-700"></i>
//                 </button>
//             </div>
//         </article>
//     `;
// }
