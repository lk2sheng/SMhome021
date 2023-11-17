"use strict";

class Item {
    constructor(name, expirationDate, image, n = 1) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.image = image;
        this.n = n;
    }

}


let searchFrom = document.querySelector(".search-form");

const stock = [new Item("Queijo", "2023-12-20", "../media/image-firgo-6.jpg", 1), 
    new Item("Leite", "2023-11-3", "../media/image-firgo-2.jpg", 3), 
new Item("Iogurte", "2023-12-25", "../media/image-firgo-2.jpg", 2)];

const suggested = [new Item("Farinha", "../media/image-firgo-2.jpg"),
 ("Leite", "../media/image-firgo-2.jpg"),
  ("Ovos", "../media/image-firgo-2.jpg")];


document.querySelector("#search_icon").onclick = () =>{
    searchFrom.classList.toggle("active");
}

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
    console.log(change);
    if (change) {
        const outDialog = document.getElementById('out-dialog');
        const confirmYes = document.getElementById('yes');
        const confirmNo = document.getElementById('no');
        
        outDialog.style.display = 'block';
        
        confirmYes.addEventListener('click', function() {
            window.history.back();
        });

        confirmNo.addEventListener('click', function() {
            outDialog.style.display = 'none';
        });
    } else {
        window.history.back();
    }
}

function createProductBox(product) {
    var box = document.createElement("div");
    box.className = "box";

    var img = document.createElement("img");
    img.src = product.image;

    var h3 = document.createElement("h3");
    h3.textContent = product.name;

    var p = document.createElement("p");
    p.textContent = product.expirationDate;

    // Append elements to the box
    box.appendChild(img);
    box.appendChild(h3);
    box.appendChild(p);

    return box;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get or generate the randomized products
function getOrGenerateRandomizedProducts() {
    // Check if the products are already stored in local storage
    var storedProducts = localStorage.getItem("randomizedProducts");

    if (storedProducts) {
        // If products are stored, parse and return them
        return JSON.parse(storedProducts);
    } else {
        // If no products are stored, shuffle the products, store them, and return
        var shuffledProducts = shuffleArray(stock.slice());
        localStorage.setItem("randomizedProducts", JSON.stringify(shuffledProducts));
        return shuffledProducts;
    }
}

// Get or generate the randomized products
var randomizedProducts = getOrGenerateRandomizedProducts();

// Split the randomized array into two
var products1 = randomizedProducts.slice(0, Math.ceil(randomizedProducts.length / 2));
var products2 = randomizedProducts.slice(Math.ceil(randomizedProducts.length / 2));

// Function to display products
function displayProducts1(filteredProducts) {
    var container = document.getElementById("product-container1");
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        var noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No matching products found.";
        container.appendChild(noResultsMessage);
    } else {
        filteredProducts.forEach(function(product) {
            var box = createProductBox(product);
            container.appendChild(box);
        });
    }
}

function displayProducts2(filteredProducts) {
    var container = document.getElementById("product-container2");
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        var noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No matching products found.";
        container.appendChild(noResultsMessage);
    } else {
        filteredProducts.forEach(function(product) {
            var box = createProductBox(product);
            container.appendChild(box);
        });
    }
}


function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const itemInfoButton = document.getElementById('itemInfoButton');
    const BackButton = document.getElementById('back-button');

    document.addEventListener("scroll", scrollHelper);
    userIcon.addEventListener("click", Menu_Perfil);
    BackButton.addEventListener("click",GoBack);   
}


function principal(){
    defineEventHandlersParaElementosHTML();

    displayProducts1(products1);
    displayProducts2(products2);
  
}

document.getElementById("search-box").addEventListener("input", function() {
    var searchTerm = this.value.toLowerCase();

    var filteredProducts1 = products1.filter(function(product) {
        return product.name.toLowerCase().startsWith(searchTerm);
    });

    var filteredProducts2 = products2.filter(function(product) {
        return product.name.toLowerCase().startsWith(searchTerm);
    });

    displayProducts1(filteredProducts1);
    displayProducts2(filteredProducts2);
});


window.addEventListener("load", principal);