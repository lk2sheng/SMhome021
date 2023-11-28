

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

function Cancel(){
    window.location.href = "../HOME.html";
}

function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const dialog = document.getElementById("scheduleconfirmed");
    const okButton = document.getElementById("okButton");
    const BackButton = document.getElementById('back-button');
    const MBWayButton = document.getElementById('MBWAY');
    const cartaoButton = document.getElementById('CARTAO');


    userIcon.addEventListener("click", Menu_Perfil);
    BackButton.addEventListener("click", GoBack); 
    MBWayButton.addEventListener("click", function(){dialog.style.display = 'block'; }) 
    cartaoButton.addEventListener("click", function(){dialog.style.display = 'block';}) 
    
    okButton.addEventListener('click', Cancel);
}



function principal(){
    defineEventHandlersParaElementosHTML();
}


window.addEventListener("load", principal);