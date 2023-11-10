"use strict";

const userIcon = 'user-icon';

function defineEventHandlersParaElementosHTML(){
    document.getElementById(userIcon).addEventListener("click",Menu_Perfil);
}


function Menu_Perfil(){
    const userMenu = document.getElementById('user-menu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else {
        userMenu.style.display = 'block';
    }
}

function principal(){
    defineEventHandlersParaElementosHTML();
}

window.addEventListener("load", principal);