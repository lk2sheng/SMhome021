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

const buyList = [new ShopItem("Farinha", "../media/farinha.jpg", 1.79, 1), 
    new ShopItem("Leite", "../media/image-firgo-2.jpg", 0.99, 1), 
new ShopItem("Ovos", "../media/image-firgo-10.jpg", 2.20, 1),
new ShopItem('Frango', "../media/image-firgo-8.jpg", 4.60,1),
new ShopItem('Cogumelos', "../media/image-firgo-5.jpg", 2.39,1),
new ShopItem('Iogurte', "../media/image-firgo-13.jpg", 1.29,1)];

const storedCartInfo = sessionStorage.getItem("CARTINFO");

let cart = [];



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

        const formattedPrice = parseFloat(buyList[i].price).toFixed(2);
        const productPrice = document.createElement("p");
        productPrice.textContent = "Preço: " + formattedPrice + "€";
        
        const itemPrice = document.createElement("p");
        itemPrice.classList.add("itemPrice");
        itemPrice.innerText = buyList[i].price + "€";

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-button");

        const infoButton = document.createElement("button");
        infoButton.classList.add("itemInfoButton");
        infoButton.innerText = "Ver mais";

        const addButton = document.createElement("button");
        addButton.classList.add("addButton");
        addButton.id = "add"+buyList[i].name;
        addButton.innerText = "Adicionar ao carrinho";
        
        document.getElementById("items-container").appendChild(itemBox);
        document.getElementsByClassName("box")[i].appendChild(productImage);
        document.getElementsByClassName("box")[i].appendChild(productPrice);
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

        const itemPrice = document.createElement("p");
        itemPrice.classList.add("itemPrice");
        itemPrice.innerText = cart[i].price + "€";
        
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("cart-info-button");

        const removeButton = document.createElement("button");
        removeButton.classList.add("removeItemButton");
        removeButton.id = "remove"+cartItem.name;
        removeButton.innerText = "remover";

        document.getElementById("cartBox").prepend(cartItemBox);
        cartItemBox.appendChild(productImage);
        cartItemBox.appendChild(itemPrice);
        cartItemBox.appendChild(infoDiv);

        cartItemBox.appendChild(removeButton);
        removeButton.addEventListener("click", function() {removeFromCart(removeButton);});

    }
    printTotal();
}

function addToCart(button){
    let cartItem = null;
    for (let i=0 ; i < buyList.length; i++){
        if ("add"+buyList[i].name == button.id) {
            if (!cart.includes(buyList[i])) {
                cart.push(buyList[i]);

                cartItem = buyList[i];

                const cartItemBox = document.createElement("div");
                cartItemBox.classList.add("cartItemBox");


                const productImage = document.createElement("img");
                productImage.src = cartItem.image;
                productImage.style.width = "100px";

                const productTitle = document.createElement("h4");
                productTitle.innerText = cartItem.name;
                productTitle.style.fontSize = "20px"; 


                const productQuantity = document.createElement("p");
                productQuantity.innerText = "Quantidade: " + cartItem.n;
                
                const quantityButtons = document.createElement("div");
                
                const addButton = document.createElement("button");
                addButton.classList.add("addItemButton");
                addButton.innerText = "+";
                addButton.addEventListener("click", function() {
                    if(cartItem.n < 30){
                        cartItem.n++; 
                        productQuantity.innerText = "Quantidade: " + cartItem.n;
                    }
                    printTotal(); 
                });

                const removeButton1 = document.createElement("button");
                removeButton1.classList.add("removeItemButton1");
                removeButton1.innerText = "-";
                removeButton1.addEventListener("click", function() {
                    if (cartItem.n > 1) {
                        cartItem.n--; 
                        productQuantity.innerText = "Quantidade: " + cartItem.n;
                    }
                    printTotal();

                });

                const removeButton = document.createElement("button");
                removeButton.classList.add("removeItemButton");
                removeButton.id = "remove"+cartItem.name;
                removeButton.innerText = "remover";

                quantityButtons.appendChild(removeButton1);
                quantityButtons.appendChild(addButton);

                document.getElementById("cartBox").prepend(cartItemBox);
                cartItemBox.appendChild(productTitle);
                cartItemBox.appendChild(productImage);
                cartItemBox.appendChild(productQuantity);
                cartItemBox.appendChild(quantityButtons);
                cartItemBox.appendChild(removeButton);

                removeButton.addEventListener("click", function() {
                    cartItem.n=1;
                    removeFromCart(removeButton);
                });


            }

        }
    }

    uploadCartToSessionStorage();
    printTotal();

}

function removeFromCart(button) {
    let removed = false;
    for (let i=0 ; i < cart.length; i++){
        if (("remove"+cart[i].name == button.id) && (removed == false)) {
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
    const checkoutButton = document.getElementById('checkoutButton');

    userIcon.addEventListener("click", Menu_Perfil);
    BackButton.addEventListener("click", GoBack);

    
    displayItems(); 

    for (let i=0 ; i < addButton.length; i++){
        addButton[i].addEventListener("click", function() {addToCart(addButton[i]);});  
    }

}

function printTotal(){
    let total = 0;
    for (let i=0 ; i < cart.length; i++){
        total += parseFloat(cart[i].price)*cart[i].n;
    }
    const formattedTotal = total.toFixed(2); 
    document.getElementById("total").innerHTML = "Total: " + formattedTotal + "€";
    localStorage.setItem("totalValue", formattedTotal);
    
}

function checkout() {
    if (cart.length > 0) {
        window.location.href = "paginaPAY.html";
    } 
}

function principal(){
    downloadCartFromSessionStorage();
    checkCart();
    defineEventHandlersParaElementosHTML();
}


window.addEventListener("load", principal);