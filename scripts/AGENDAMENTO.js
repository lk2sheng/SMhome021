"use strict";

let schedule = []

const scheduleContainer = document.getElementById('scheduleContainer');

function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');

    userIcon.addEventListener("click", Menu_Perfil);


}

function createScheduleBox(scheduleItem, index) {
    const scheduleContainer = document.getElementById('scheduleContainer');
    const scheduleBox = document.createElement('div');
    scheduleBox.classList.add('schedule-item');

    if (scheduleItem.name == "AC SALA") {
        const scheduleDetails = document.createElement('div');
        scheduleDetails.classList.add('schedule-details');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', function () {
            const itemIndex = parseInt(this.getAttribute('data-index'));
            schedule.splice(itemIndex, 1);
            localStorage.setItem('Schedule', JSON.stringify(schedule));
            scheduleContainer.removeChild(scheduleBox);
        });

        scheduleDetails.innerHTML = `
            <p><b> AC SALA </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 20px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 20px;"></i> ${scheduleItem.hour}:${scheduleItem.minute}</b></p>
        `;
        
        if (scheduleItem.connection) {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: LIGAR </b></p>
                <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 20px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
                <p><b> <i class="bi bi-battery-full text-success" style="font-size: 20px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
                <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 20px;"></i> MODO: ${scheduleItem.mode}</b> </p>
            `;
        } else {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning text-muted" style="font-size: 20px;"></i>ESTADO: DESLIGAR</b> </p>
            `;
        }

        scheduleDetails.appendChild(deleteIcon);
        scheduleBox.appendChild(scheduleDetails);
    }

    if (scheduleItem.name == "AC QUARTO") {
        const scheduleDetails = document.createElement('div');
        scheduleDetails.classList.add('schedule-details');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', function () {
            const itemIndex = parseInt(this.getAttribute('data-index'));
            schedule.splice(itemIndex, 1);
            localStorage.setItem('Schedule', JSON.stringify(schedule));
            scheduleContainer.removeChild(scheduleBox);
        });

        scheduleDetails.innerHTML = `
            <p><b> AC QUARTO </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 20px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 20px;"></i> ${scheduleItem.hour}:${scheduleItem.minute}</b></p>
        `;
        
        if (scheduleItem.connection) {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: LIGAR </b></p>
                <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 20px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
                <p><b> <i class="bi bi-battery-full text-success" style="font-size: 20px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
                <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 20px;"></i> MODO: ${scheduleItem.mode}</b> </p>
            `;
        } else {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning text-muted" style="font-size: 20px;"></i>ESTADO: DESLIGAR</b> </p>
            `;
        }

        scheduleDetails.appendChild(deleteIcon);
        scheduleBox.appendChild(scheduleDetails);
    }
    if (scheduleItem.name == "AC WC") {
        const scheduleDetails = document.createElement('div');
        scheduleDetails.classList.add('schedule-details');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', function () {
            const itemIndex = parseInt(this.getAttribute('data-index'));
            schedule.splice(itemIndex, 1);
            localStorage.setItem('Schedule', JSON.stringify(schedule));
            scheduleContainer.removeChild(scheduleBox);
        });

        scheduleDetails.innerHTML = `
            <p><b> AC CASA DE BANHO </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 20px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 20px;"></i> ${scheduleItem.hour}:${scheduleItem.minute}</b></p>
        `;
        
        if (scheduleItem.connection) {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: LIGAR </b></p>
                <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 20px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
                <p><b> <i class="bi bi-battery-full text-success" style="font-size: 20px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
                <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 20px;"></i> MODO: ${scheduleItem.mode}</b> </p>
            `;
        } else {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning text-muted" style="font-size: 20px;"></i>ESTADO: DESLIGAR</b> </p>
            `;
        }

        scheduleDetails.appendChild(deleteIcon);
        scheduleBox.appendChild(scheduleDetails);
    }

    if (scheduleItem.name == "AC COZINHA") {
        const scheduleDetails = document.createElement('div');
        scheduleDetails.classList.add('schedule-details');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', function () {
            const itemIndex = parseInt(this.getAttribute('data-index'));
            schedule.splice(itemIndex, 1);
            localStorage.setItem('Schedule', JSON.stringify(schedule));
            scheduleContainer.removeChild(scheduleBox);
        });

        scheduleDetails.innerHTML = `
            <p><b> AC COZINHA </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 20px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 20px;"></i> ${scheduleItem.hour}:${scheduleItem.minute}</b></p>
        `;
        
        if (scheduleItem.connection) {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: LIGAR </b></p>
                <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 20px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
                <p><b> <i class="bi bi-battery-full text-success" style="font-size: 20px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
                <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 20px;"></i> MODO: ${scheduleItem.mode}</b> </p>
            `;
        } else {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning text-muted" style="font-size: 20px;"></i>ESTADO: DESLIGAR</b> </p>
            `;
        }

        scheduleDetails.appendChild(deleteIcon);
        scheduleBox.appendChild(scheduleDetails);
    }
    
    scheduleContainer.appendChild(scheduleBox);
}



function Menu_Perfil(){
    const userMenu = document.getElementById('user-menu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else {
        userMenu.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    schedule = JSON.parse(localStorage.getItem('Schedule')) || [];

    schedule.sort((a, b) => {
        const timeA = parseInt(a.hour) * 60 + parseInt(a.minute);
        const timeB = parseInt(b.hour) * 60 + parseInt(b.minute);
        return timeA - timeB;
    });

    schedule.forEach((item, index) => {
        createScheduleBox(item, index);
    });
});

function principal(){


    defineEventHandlersParaElementosHTML();

}

window.addEventListener("load", principal);
