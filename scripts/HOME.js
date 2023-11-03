"use strict";

const userIcon = 'user-icon';
const DATA = "data";

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

function obterHoraAtual() {
    const dataAtual = new Date();
    const horas = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();

    const horaFormatada = horas < 10 ? `0${horas}` : horas;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;

    return `${horaFormatada}:${minutosFormatados}`;
}

function obterDiaDaSemana() {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const dataAtual = new Date();
    const diaDaSemana = diasDaSemana[dataAtual.getDay()];

    return diaDaSemana;
}

function obterDataCompleta() {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.toLocaleString('pt-BR', { month: 'long' }); // Obtém o mês por extenso
    const ano = dataAtual.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
}



function principal(){
    defineEventHandlersParaElementosHTML();
    document.getElementById("hora").textContent = obterHoraAtual();
    document.getElementById("dsemana").textContent = obterDiaDaSemana();
    document.getElementById("data").textContent = obterDataCompleta();
}

window.addEventListener("load", principal);

