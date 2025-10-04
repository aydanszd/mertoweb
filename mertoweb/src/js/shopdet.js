const API_URL = 'http://localhost:1337/api';

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function loadProductDetails() {
    try {
        const res = await fetch(`${API_URL}/products/${productId}?populate=*`);
        const data = await res.json();
        const product = data.data;

        if (!product) {
            document.body.innerHTML = <p class="text-center text-red-500 mt-10">Product not found</p>;
            return;
        }
        let imageUrl = 'https://merto-be87.kxcdn.com/merto/wp-content/uploads/2024/05/furniture-7-300x300.jpg';
        if (product.image) {
            if (product.image.url) {
                imageUrl = `http://localhost:1337${product.image.url}`;
            } else if (product.image.formats?.medium?.url) {
                imageUrl = `http://localhost:1337${product.image.formats.medium.url}`;
            }
        }

        document.getElementById('mainImage').src = imageUrl;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price}`;

        const brandName = product.product_brands?.[0]?.name || '';
        const brandEl = document.getElementById('brandName');
        if (brandEl) brandEl.textContent = brandName;

    } catch (err) {
        console.error('Error loading product:', err);
        document.body.innerHTML = <p class="text-center text-red-500 mt-10">Error loading product</p>;
    }
}

document.addEventListener('DOMContentLoaded', loadProductDetails);
