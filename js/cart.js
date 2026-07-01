let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const cartContent = document.getElementById("cart-content");
const cartCount = document.querySelector(".cart-count");
const totalPrice = document.getElementById("total-price");
const cartIcon = document.getElementById("cart-icon");
const cartClose = document.getElementById("cart-close");
const placeOrder = document.getElementById("place-order");
if(cartIcon){
    cartIcon.addEventListener("click",()=>{
        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");
    });
}
function closeCart(){
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}
if(cartClose){
    cartClose.addEventListener("click",closeCart);
}
if(cartOverlay){
    cartOverlay.addEventListener("click",closeCart);
}
document.querySelectorAll(".add-cart").forEach(button=>{

    button.addEventListener("click",()=>{

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        const existing = cart.find(item=>item.name===name);

        if(existing){

            existing.qty++;

        }else{

            cart.push({

                name,
                price,
                image,
                qty:1

            });

        }

        saveCart();

        updateCart();
        cartPanel.classList.add("active");
cartOverlay.classList.add("active");

    });

});

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

}

function updateCart(){

    if(!cartContent) return;

    cartContent.innerHTML="";

    let total=0;

    let count=0;

    if(cart.length===0){

        cartContent.innerHTML=`

        <div class="empty-cart">

            <i class="fa-solid fa-cart-shopping"></i>

            <h3>Your Cart is Empty</h3>

            <p>Add products to continue shopping.</p>

        </div>

        `;

        cartCount.textContent=0;

        totalPrice.innerHTML="₹0";

        return;

    }

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        count += item.qty;

        cartContent.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${item.qty}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

                <div class="remove"

                     onclick="removeItem(${index})">

                     Remove

                </div>

            </div>

        </div>

        `;

    });

    cartCount.textContent=count;

    totalPrice.innerHTML="₹"+total;

}

window.increaseQty=function(index){

    cart[index].qty++;

    saveCart();

    updateCart();
    cartPanel.classList.add("active");
cartOverlay.classList.add("active");

}

window.decreaseQty=function(index){

    cart[index].qty--;

    if(cart[index].qty<=0){

        cart.splice(index,1);

    }

    saveCart();

    updateCart();
    cartPanel.classList.add("active");
cartOverlay.classList.add("active");

}
window.removeItem=function(index){

    cart.splice(index,1);

    saveCart();

    updateCart();
    cartPanel.classList.add("active");
cartOverlay.classList.add("active");

}



if(placeOrder){

    placeOrder.addEventListener("click",()=>{

        if(cart.length===0){

            alert("Your cart is empty.");

            return;

        }

        alert("Order placed successfully!");

        cart=[];

        saveCart();

        updateCart();
        cartPanel.classList.add("active");
cartOverlay.classList.add("active");

        closeCart();

    });

}

updateCart();
window.addEventListener("DOMContentLoaded", () => {

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "light"){
        document.body.classList.add("light");
    }

        }); 
    let topBtn = document.getElementById("backToTop");
        window.addEventListener("scroll", function () {
            if (document.documentElement.scrollTop > 200){
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        });
        topBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });