let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || []; // this or statement is for when there is no existing data in the local storage

let calculation = () => {
    let cartIcon = document.getElementById("cartNumber");

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation(); // this is to retain the total number of items added to cart

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
                <div class="cart-item">
                    <img class="image" src=${search.img} alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4>
                                <p>${search.name}</p>
                                <p>₱ ${search.price}</p>
                            </h4>
                            <i class="bi bi-x-lg"></i>
                        </div>
                        <div class="cart-buttons"></div>
                        <h3></h3>
                    </div>
                </div>
            `;
        }).join(''));
    } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is empty.</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;
    }
}

generateCartItems();