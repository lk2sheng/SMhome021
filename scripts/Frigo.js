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

