let shop = document.getElementById('shop');

let shopItemsData = [{
    id: "aldjsf",
    name: "Casual Shirt",
    price: 500,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti cumque dolores",
    img: "images/fem-shirt.avif"
}, 
{
    id: "fddjsdf",
    name: "Jacket",
    price: 750,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti cumque dolores",
    img: "images/jacket.avif"
}, 
{
    id: "dfajdka",
    name: "Crop Top",
    price: 200,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti cumque dolores",
    img: "images/crop-top.avif"
}, 
{
    id: "adshdhadh",
    name: "Dress",
    price: 1200,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti cumque dolores",
    img: "images/dress.avif"
}];

let basket = [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x;
        return `
        <div id=product-id-${id} class="item">
            <img class="image" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>₱ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">0</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join(""));
};

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item++;
    }

    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search.item === 0) {
        return;
    } else {
        search.item--;
    }

    update(selectedItem.id);
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);

    document.getElementById(id).innerHTML = search.item;

    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartNumber");

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};