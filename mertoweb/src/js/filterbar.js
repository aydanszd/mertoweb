const API_URL = 'http://localhost:1337/api';
let allProducts = [];
let filteredProducts = [];
let tempFilters = {
    colors: [],
    brands: [],
    priceRanges: [],
    minPrice: null,
    maxPrice: null,
    ratings: []
};
let activeFilters = {
    colors: [],
    brands: [],
    priceRanges: [],
    minPrice: null,
    maxPrice: null,
    ratings: []
};

const colorMapping = {
    'Blue': ['blue'],
    'Yellow': ['yellow'],
    'Black': ['black'],
    'Pink': ['pink'],
    'Brown': ['brown'],
    'Gray': ['gray'],
    'Green': ['green']
};
function createProductCard(product) {
    let imageUrl = 'https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/05/furniture-7-300x300.jpg';
    if (product.image) {
        imageUrl = `http://localhost:1337${product.image.url || product.image.formats?.medium?.url || product.image.formats?.small?.url || ''}`;
    }

    const rating = product.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        starsHTML += i < fullStars ? '<i class="ri-star-fill text-black"></i>' :
            i === fullStars && hasHalfStar ? '<i class="ri-star-half-fill text-black"></i>' :
                '<i class="ri-star-line text-black"></i>';
    }

    const brandName = product.product_brands?.[0]?.name || '';
    const colorHex = product.product_colors?.[0]?.hexCode || null;

    return `
    <article class="relative group/item bg-white border p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="h-56 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
            <img src="${imageUrl}" alt="${product.name}" class="object-contain max-h-56 w-full"
                onerror="this.src='https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/05/furniture-7-300x300.jpg'">
        </div>
        <div class="mt-3">
            <h3 class="text-sm text-gray-700 font-medium line-clamp-2 h-10">${product.name}</h3>
            ${brandName ? `<p class="text-xs text-gray-500 mt-1 font-[Poppins]">${brandName}</p>` : ''}
            <div class="flex items-center gap-1 mt-2">${starsHTML}<span class="text-xs text-gray-500 ml-1">(${rating.toFixed(1)})</span></div>
            <div class="mt-3 flex items-center justify-between">
                <div class="text-lg font-semibold text-gray-900">${product.price}</div>
                ${colorHex ? `<div class="flex items-center gap-1"><span class="w-4 h-4 rounded border" style="background-color: ${colorHex}"></span></div>` : ''}
            </div>
        </div>
        <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4
            group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">
            <button class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
                <i class="ri-heart-line text-gray-700"></i>
            </button>
            <button onclick="window.location.href='details.html?id=${product.id}'" 
                class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
                <i class="ri-arrow-left-right-fill text-gray-700"></i>
            </button>
            <button class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
                <i class="ri-shopping-cart-2-line text-gray-700"></i>
            </button>
            <button class="bg-white hover:bg-gray-100 w-9 h-9 flex items-center justify-center rounded-lg shadow-md transition-colors">
                <i class="ri-search-line text-gray-700"></i>
            </button>
        </div>
    </article>
    `;
}
function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!products.length) {
        container.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <i class="ri-inbox-line text-6xl text-gray-300"></i>
                <p class="mt-4 text-gray-500 text-lg font-medium">No products found</p>
                <p class="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    container.innerHTML = products.map(createProductCard).join('');
}
function attachFilterListeners(selector, filterKey, parser = v => parseInt(v)) {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('change', e => {
            const value = parser(e.target.value);
            if (e.target.checked) {
                if (!tempFilters[filterKey].includes(value)) tempFilters[filterKey].push(value);//Hər dəyişiklikdən sonra applyFilters() çağırılır və məhsullar filtrə uyğun göstərilir
            } else {
                tempFilters[filterKey] = tempFilters[filterKey].filter(v => v !== value);
            }
            applyFilters();
        });
    });
}
function attachColorListeners() {
    const colorItems = document.querySelectorAll('#color-filters li');
    colorItems.forEach(item => {
        const colorName = item.querySelector('span.font-medium').textContent.trim();
        item.style.cursor = 'pointer';
        item.classList.add('hover:bg-gray-50', 'transition-colors', 'p-1', 'rounded');
        item.addEventListener('click', async () => {
            item.classList.toggle('bg-gray-100');
            try {
                const colorsRes = await fetch(`${API_URL}/product-colors`);
                const colorsData = await colorsRes.json();
                const matchedColor = colorsData.data.find(color => {
                    const apiColor = color.name.toLowerCase();       //~Istifadəçi bir və ya bir neçə rəngi klikləyə bilər.Seçilən rənglər tempFilters.colors - a əlavə olunur.
                    const htmlColor = colorName.toLowerCase();
                    const mappings = colorMapping[colorName] || [];
                    return apiColor === htmlColor || mappings.some(m => apiColor.includes(m) || m.includes(apiColor));
                });
                if (!matchedColor) return;
                const id = matchedColor.id;
                const index = tempFilters.colors.indexOf(id);
                if (index > -1) tempFilters.colors.splice(index, 1);
                else tempFilters.colors.push(id);
                applyFilters();
            } catch (err) {
                console.error('Error fetching colors:', err);
            }
        });
    });
}
async function loadBrands() {
    try {
        const res = await fetch(`${API_URL}/product-brands`);
        const data = await res.json();
        const brandList = document.getElementById('brand-filters');
        const renderBrands = brands => {
            brandList.innerHTML = brands.map(brand => `
                <li class="flex items-center gap-3">
                    <input type="checkbox" value="${brand.id}" class="brand-filter peer h-4 w-4 border-gray-300 rounded accent-black hover:bg-black hover:border-black" />
                    <span class="text-black font-[Poppins] text-[13px] peer-checked:text-orange-800 font-medium">
                        ${brand.name} <span class="text-gray-400 ml-1">(${brand.productCount || 0})</span>
                    </span>
                </li>
            `).join('');
            attachFilterListeners('.brand-filter', 'brands');
        };
        renderBrands(data.data);
        document.getElementById('brand-search').addEventListener('input', e => {
            const filtered = data.data.filter(b => b.name.toLowerCase().includes(e.target.value.toLowerCase()));
            renderBrands(filtered);
        });
    } catch (err) {
        console.error('Error loading brands:', err);
    }
}

async function loadProducts() {
    try {
        const res = await fetch(`${API_URL}/products?populate=*`);
        const data = await res.json();
        allProducts = data.data;
        filteredProducts = [...allProducts];
        displayProducts(filteredProducts);
    } catch (err) {
        console.error('Error loading products:', err);
        document.getElementById('products-container').innerHTML = `
            <div class="col-span-full text-center py-10 text-red-600">
                <i class="ri-error-warning-line text-4xl"></i>
                <p class="mt-2">Error loading products</p>
            </div>
        `;
    }
}
function applyFilters() {
    activeFilters = JSON.parse(JSON.stringify(tempFilters));

    filteredProducts = allProducts.filter(product => {
        if (activeFilters.colors.length) {
            const colorIds = product.product_colors?.map(c => c.id) || [];
            if (!colorIds.some(id => activeFilters.colors.includes(id))) return false;
        }
        if (activeFilters.brands.length) {
            const brandIds = product.product_brands?.map(b => b.id) || [];
            if (!brandIds.some(id => activeFilters.brands.includes(id))) return false;
        }

        const price = parseFloat(product.price);
        if ((activeFilters.minPrice !== null && price < activeFilters.minPrice) ||
            (activeFilters.maxPrice !== null && price > activeFilters.maxPrice)) return false;

        if (activeFilters.priceRanges.length) {
            const inRange = activeFilters.priceRanges.some(range => {
                switch (range) {
                    case '0-100': return price >= 0 && price <= 100;
                    case '100-200': return price > 100 && price <= 200;
                    case '200-500': return price > 200 && price <= 500;
                    case '500+': return price > 500;
                    default: return false;
                }
            });
            if (!inRange) return false;
        }

        if (activeFilters.ratings.length) {
            const rating = Math.floor(product.rating || 0);
            if (!activeFilters.ratings.includes(rating)) return false;
        }

        return true;
    });

    displayProducts(filteredProducts);
}
document.addEventListener('DOMContentLoaded', () => {
    attachColorListeners();
    attachFilterListeners('.price-filter', 'priceRanges', v => v);
    attachFilterListeners('.rating-filter', 'ratings');
    document.getElementById('min-price').addEventListener('input', e => { tempFilters.minPrice = e.target.value ? parseFloat(e.target.value) : null; applyFilters(); });
    document.getElementById('max-price')?.addEventListener('input', e => { tempFilters.maxPrice = e.target.value ? parseFloat(e.target.value) : null; applyFilters(); });
    document.getElementById('price-filter-btn')?.addEventListener('click', applyFilters);

    loadBrands();
    loadProducts();//Səhifə tam yüklənəndə bütün filtr sistemləri aktiv olur
});
