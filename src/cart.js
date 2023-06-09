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
            let { img, name, price } = search;
            return `
                <div class="cart-item">
                    <img class="cart-image" src=${img} alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">₱ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>

                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>

                        <h3>₱ ${item * search.price}</h3>
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

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id); // searches the  item in the basket to see if the item already exists in the basket

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item++;
    }

    generateCartItems(); 
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined || search.item === 0) {
        return;
    } else {
        search.item--;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0); // removes item from the basket when its quantity turns 0
    generateCartItems(); // re renders the cards from the basket so that the items with 0 quantity are removed
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);

    document.getElementById(id).innerHTML = search.item;

    totalAmount();
    calculation();
};

let removeItem = (id) => {
    let selectedItem = id;

    basket = basket.filter((x) => x.id !== selectedItem.id);
    totalAmount();
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
            <h2>Total Bill: ₱ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear cart</button>
        `;
    } else return;
};

totalAmount();

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};