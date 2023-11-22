let searchFrom = document.querySelector(".search-form");

document.querySelector("#search_icon").onclick = () =>{
    searchFrom.classList.toggle("active");
}

document.addEventListener("scroll", function() {
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
    
  });

  var products = [
    {
        image: "../media/image-firgo-1.jpg",
        name: "Cenoura",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-2.jpg",
        name: "Leite Açores",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-3.jpg",
        name: "Leite Lactea",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-4.jpg",
        name: "Leite Lactea",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-5.jpg",
        name: "Cogumelos",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-6.jpg",
        name: "Queijo",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-7.jpg",
        name: "Agua",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-8.jpg",
        name: "Product 1",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-9.jpg",
        name: "Frango",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-10.jpg",
        name: "Peru",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-11.jpg",
        name: "Ovos",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-12.jpg",
        name: "Piemntos",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-13.jpg",
        name: "Iogurte",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-14.jpg",
        name: "Cerveja",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-15.jpg",
        name: "Vinho",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-1.jpg",
        name: "Product 1",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-1.jpg",
        name: "Product 1",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    {
        image: "../media/image-firgo-1.jpg",
        name: "Product 1",
        description: "Validade: \n 15/12/2023",
        link: "#"
    },
    // Add more products as needed
];

// Function to create a product box
function createProductBox(product) {
    var box = document.createElement("div");
    box.className = "box";

    var img = document.createElement("img");
    img.src = product.image;

    var h3 = document.createElement("h3");
    h3.textContent = product.name;

    var p = document.createElement("p");
    console.log(product.description);
    p.textContent = product.description;

    // Append elements to the box
    box.appendChild(img);
    box.appendChild(h3);
    box.appendChild(p);

    return box;
}

// Function to create a product box
function createProductBox_Inv(product) {
    var box = document.createElement("div");
    box.className = "box";

    var img = document.createElement("img");
    img.src = product.image;

    var h3 = document.createElement("h3");
    h3.textContent = product.name;

    var p = document.createElement("p");
    console.log(product.description);
    p.textContent = product.description;


    // Append elements to the box
    box.appendChild(img);
    box.appendChild(h3);
    box.appendChild(p);
    

    return box;
}

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get or generate the randomized products
function getOrGenerateRandomizedProducts() {
    // Check if the products are already stored in session storage
    var storedProducts = sessionStorage.getItem("randomizedProducts");

    if (storedProducts) {
        // If products are stored, parse and return them
        return JSON.parse(storedProducts);
    } else {
        // If no products are stored, shuffle the products, store them in session storage, and return
        var shuffledProducts = shuffleArray(products.slice());
        sessionStorage.setItem("randomizedProducts", JSON.stringify(shuffledProducts));
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
            var box = createProductBox_Inv(product);
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



// Call the displayProducts function to show products on page load
displayProducts1(products1);
displayProducts2(products2);
