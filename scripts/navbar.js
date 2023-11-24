"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.navigation ul li a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!navbar.classList.contains('clicked')) {
                e.preventDefault();
            }
        });
    });

    navbar.addEventListener('click', function(e) {
        e.stopPropagation();
        navbar.classList.toggle('clicked');

        setTimeout(function() {
            navbar.classList.toggle('closing');
        }, 1000);
    });

    document.addEventListener('click', function() {
        navbar.classList.remove('clicked', 'closing');
    });

    links.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('clicked', 'closing');
        });
    });
});
