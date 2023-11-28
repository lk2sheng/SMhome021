"use strict";


class ShopItem {
    constructor(name, image, price, n = 1) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.n = n;
    }

}


let searchFrom = document.querySelector(".search-form");

//imagens estão erradas
const buyList = [new ShopItem("Farinha", "../media/farinha.jpg", 1.79, 1), 
    new ShopItem("Leite", "../media/image-firgo-2.jpg", 2.40, 1), 
new ShopItem("Ovos", "../media/image-firgo-10.jpg", 2.20, 1)];

const storedCartInfo = sessionStorage.getItem("CARTINFO");

let cart = [];

//document.getElementById("search_icon").
//    addEventListener("click", function () {
//    searchFrom.classList.toggle("active");
//});



function scrollHelper() {
    // Get the scroll position
    let scrollPosition = window.scrollY;
  
    // Get the box element
    let movingBox = document.querySelector(".navigation");
  
    // Define the scroll position at which you want the box to move
    let triggerScroll = 10;
  
    // Check if the scroll position is beyond the trigger point
    if (scrollPosition > triggerScroll) {
        movingBox.classList.add("active");
    } else {
        movingBox.classList.remove("active");
    }
    
};

function Menu_Perfil(){
    const userMenu = document.getElementById('user-menu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else {
        userMenu.style.display = 'block';
    }
}

function GoBack() {
    window.history.back();
}

function displayItems() {
    for (let i=0 ; i < buyList.length; i++){
        const itemBox = document.createElement("div");
        itemBox.classList.add("box");

        const productImage = document.createElement("img");
        productImage.src = buyList[i].image;

        itemBox.innerHTML = "<h3>" + buyList[i].name + "</h3>";
        
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-button");

        const infoButton = document.createElement("button");
        infoButton.classList.add("itemInfoButton");
        infoButton.innerText = "Ver mais";

        const addButton = document.createElement("button");
        addButton.classList.add("addButton");
        addButton.id = buyList[i].name;
        addButton.innerText = "Adicionar ao carrinho";
        

        document.getElementById("items-container").appendChild(itemBox);
        document.getElementsByClassName("box")[i].appendChild(productImage);
        document.getElementsByClassName("box")[i].appendChild(infoDiv);
        document.getElementsByClassName("info-button")[i].appendChild(infoButton);
        document.getElementsByClassName("box")[i].appendChild(addButton);
        
    }
}

function displayCartItems() {
    for (let i=0 ; i < cart.length; i++){
        let cartItem = cart[i];

        const cartItemBox = document.createElement("div");
        cartItemBox.classList.add("cartItemBox");

        const productImage = document.createElement("img");
        productImage.src = cartItem.image;

        cartItemBox.innerHTML = "<h3>" + cartItem.name + "</h3>";
        
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("cart-info-button");

        const infoButton = document.createElement("button");
        infoButton.classList.add("cartItemInfoButton");
        infoButton.innerText = "Ver mais";

        const removeButton = document.createElement("button");
        removeButton.classList.add("removeItemButton");
        removeButton.id = cartItem.name;
        removeButton.innerText = "remover";

        document.getElementById("cartBox").prepend(cartItemBox);
        cartItemBox.appendChild(productImage);
        cartItemBox.appendChild(infoDiv);
        infoDiv.appendChild(infoButton);
        cartItemBox.appendChild(removeButton);
        
        printTotal();
    }
}

function addToCart(button){
    let cartItem = null;
    for (let i=0 ; i < buyList.length; i++){
        if (buyList[i].name == button.id) {
            if (!cart.includes(buyList[i])) {
                cart.push(buyList[i]);
                console.log(cart);
                cartItem = buyList[i];

                const cartItemBox = document.createElement("div");
                cartItemBox.classList.add("cartItemBox");

                const productImage = document.createElement("img");
                productImage.src = cartItem.image;

                cartItemBox.innerHTML = "<h3>" + cartItem.name + "</h3>";
                
                const infoDiv = document.createElement("div");
                infoDiv.classList.add("cart-info-button");

                const infoButton = document.createElement("button");
                infoButton.classList.add("cartItemInfoButton");
                infoButton.innerText = "Ver mais";

                const removeButton = document.createElement("button");
                removeButton.classList.add("removeItemButton");
                removeButton.id = cartItem.name;
                removeButton.innerText = "remover";

                document.getElementById("cartBox").prepend(cartItemBox);
                cartItemBox.appendChild(productImage);
                cartItemBox.appendChild(infoDiv);
                infoDiv.appendChild(infoButton);
                cartItemBox.appendChild(removeButton);

                removeButton.addEventListener("click", function() {removeFromCart(removeButton);});

                uploadCartToSessionStorage();
                printTotal();
            }
        }
    }

}

function removeFromCart(button) {
    let removed = false;
    for (let i=0 ; i < cart.length; i++){
        if ((cart[i].name == button.id) && (removed == false)) {
            cart.splice(i, 1);

            button.parentElement.remove();
            uploadCartToSessionStorage();

            removed = true;
            printTotal();
        }
    }
}

function decreaseItemNumber(item) {
    const currentNumber = item.n;
    const currentNumberDisplay = document.getElementById('currentNumber');
    
    if (currentNumber > 1) {
        currentNumber--;
        currentNumberDisplay.textContent = currentNumber;
    }
}

function increaseItemNumber() {
    const currentNumber = item.n;
    const currentNumberDisplay = document.getElementById('currentNumber');

    if (currentNumber < 30) {
        currentNumber++;
        currentNumberDisplay.textContent = currentNumber;
    }
}

function downloadCartFromSessionStorage() {
    if (storedCartInfo) {
        let tempCart = JSON.parse(storedCartInfo);
        for (let i=0 ; i < tempCart.length; i++){
            cart.push(new ShopItem(tempCart[i].name, tempCart[i].image, tempCart[i].price, tempCart[i].n));
        }
        displayCartItems();
    }

}

function uploadCartToSessionStorage() {
    sessionStorage.setItem("CARTINFO",JSON.stringify(cart));
}

function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const BackButton = document.getElementById('back-button');
    const addButton = document.getElementsByClassName("addButton");
    const removeItemButtons = document.getElementsByClassName("removeItemButton");

    document.addEventListener("scroll", scrollHelper);
    userIcon.addEventListener("click", Menu_Perfil);
    BackButton.addEventListener("click", GoBack);  
    
    displayItems(); 

    for (let i=0 ; i < addButton.length; i++){
        addButton[i].addEventListener("click", function() {addToCart(addButton[i]);});  
    }

    for (let i=0 ; i < removeItemButtons.length; i++){
        removeItemButtons[i].addEventListener("click", function() {removeFromCart(removeItemButtons[i]);});  
    }
}

function printTotal(){
    let total = 0;
    for (let i=0 ; i < cart.length; i++){
        total += cart[i].price;
    }
    document.getElementById("total").innerHTML = "Total: " + total + "€";
}



function principal(){
    downloadCartFromSessionStorage();
    defineEventHandlersParaElementosHTML();
}


window.addEventListener("load", principal);