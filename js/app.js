// ---------------load product from api ---------------
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// -------------show all product in UI ---------------
const showProducts = (products) => {
  const allProducts = products.map((singleProduct) => singleProduct);
  for (const product of allProducts) {
    console.log(product);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: <span class="text-warning" >$${product.price}</span></h2>
      <h4>
      rating ${product.rating.rate}<i class="fas fa-star  text-warning"></i>
      </h4>
      <p>total rating:${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
//-------------------- add to cart ----------------
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  totalPrice();
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
  //  parseFloat("10.547892").toFixed(2)
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

// //grandTotal update function
// const updateTotal = () => {
//   const grandTotal =
//     getInputValue("price") + getInputValue("delivery-charge") +
//     getInputValue("total-tax");
//   document.getElementById("total").innerText = grandTotal;
// };
// set total price ----------------
const totalPrice = () => {
  const price = document.getElementById('price').innerText;
  const delevaryCharge = document.getElementById('delivery-charge').innerText
  const totalTaxt = document.getElementById('total-tax').innerText;
  console.log(price, delevaryCharge, totalTaxt);
  const total = document.getElementById('total');
  total.innerText = parseFloat(price) + parseFloat(delevaryCharge) + parseFloat(totalTaxt);


}
