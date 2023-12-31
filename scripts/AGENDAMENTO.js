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
    
            // Exibe o div de confirmação ao clicar no ícone de exclusão
            document.getElementById('out-dialog').style.display = 'block';
    
            // Evento para o botão "SIM"
            document.getElementById('yes').addEventListener('click', function () {
                schedule.splice(itemIndex, 1);
                localStorage.setItem('Schedule', JSON.stringify(schedule));
                if (scheduleBox && scheduleBox.parentNode) {
                    scheduleBox.parentNode.removeChild(scheduleBox);
                }
                for (let i = 0; i < schedule.length; i++) {
                    document.getElementsByClassName("delete-icon")[i].setAttribute('data-index', i);
                }
                document.getElementById('out-dialog').style.display = 'none';
            });
    
            document.getElementById('no').addEventListener('click', function () {
                document.getElementById('out-dialog').style.display = 'none';
            });
        });

        scheduleDetails.innerHTML = `
            <p><b> AC SALA </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 15px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 15px;"></i> INÍCIO: ${scheduleItem.starthour}:${scheduleItem.startminute} | FIM: ${scheduleItem.endhour}:${scheduleItem.endminute}</b></p>
        `;

        scheduleDetails.innerHTML += `
            <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 15px;"></i> ESTADO: LIGAR </b></p>
            <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 15px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
            <p><b> <i class="bi bi-battery-full text-success" style="font-size: 15px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
            <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 15px;"></i> MODO: ${scheduleItem.mode}</b> </p>
        `;

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

            // Exibe o div de confirmação ao clicar no ícone de exclusão
            document.getElementById('out-dialog').style.display = 'block';

            // Evento para o botão "SIM"
            document.getElementById('yes').addEventListener('click', function () {
                schedule.splice(itemIndex, 1);
                localStorage.setItem('Schedule', JSON.stringify(schedule));
                if (scheduleBox && scheduleBox.parentNode) {
                    scheduleBox.parentNode.removeChild(scheduleBox);
                }
                for (let i = 0; i < schedule.length; i++) {
                    document.getElementsByClassName("delete-icon")[i].setAttribute('data-index', i);
                }
                // Esconde o div de confirmação após a exclusão
                document.getElementById('out-dialog').style.display = 'none';
            });

            // Evento para o botão "NÃO"
            document.getElementById('no').addEventListener('click', function () {
                // Esconde o div de confirmação se o usuário clicar em "NÃO"
                document.getElementById('out-dialog').style.display = 'none';
            });
        });
    
        scheduleDetails.innerHTML = `
            <p><b> AC QUARTO </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 15px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 15px;"></i> INÍCIO: ${scheduleItem.starthour}:${scheduleItem.startminute} | FIM: ${scheduleItem.endhour}:${scheduleItem.endminute}</b></p>
        `;

        scheduleDetails.innerHTML += `
            <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 15px;"></i> ESTADO: LIGAR </b></p>
            <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 15px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
            <p><b> <i class="bi bi-battery-full text-success" style="font-size: 15px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
            <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 15px;"></i> MODO: ${scheduleItem.mode}</b> </p>
        `;

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
    
            // Exibe o div de confirmação ao clicar no ícone de exclusão
            document.getElementById('out-dialog').style.display = 'block';
    
            // Evento para o botão "SIM"
            document.getElementById('yes').addEventListener('click', function () {
                schedule.splice(itemIndex, 1);
                localStorage.setItem('Schedule', JSON.stringify(schedule));
                if (scheduleBox && scheduleBox.parentNode) {
                    scheduleBox.parentNode.removeChild(scheduleBox);
                }
                for (let i = 0; i < schedule.length; i++) {
                    document.getElementsByClassName("delete-icon")[i].setAttribute('data-index', i);
                }
                // Esconde o div de confirmação após a exclusão
                document.getElementById('out-dialog').style.display = 'none';
            });
    
            // Evento para o botão "NÃO"
            document.getElementById('no').addEventListener('click', function () {
                // Esconde o div de confirmação se o usuário clicar em "NÃO"
                document.getElementById('out-dialog').style.display = 'none';
            });
        });

        scheduleDetails.innerHTML = `
            <p><b> AC CASA DE BANHO </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 15px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 15px;"></i> INÍCIO: ${scheduleItem.starthour}:${scheduleItem.startminute} | FIM: ${scheduleItem.endhour}:${scheduleItem.endminute}</b></p>
        `;
        
        scheduleDetails.innerHTML += `
            <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 15px;"></i> ESTADO: LIGAR </b></p>
            <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 15px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
            <p><b> <i class="bi bi-battery-full text-success" style="font-size: 15px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
            <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 15px;"></i> MODO: ${scheduleItem.mode}</b> </p>
        `;
        

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
    
            // Exibe o div de confirmação ao clicar no ícone de exclusão
            document.getElementById('out-dialog').style.display = 'block';
    
            // Evento para o botão "SIM"
            document.getElementById('yes').addEventListener('click', function () {
                schedule.splice(itemIndex, 1);
                localStorage.setItem('Schedule', JSON.stringify(schedule));
                if (scheduleBox && scheduleBox.parentNode) {
                    scheduleBox.parentNode.removeChild(scheduleBox);
                }
                for (let i = 0; i < schedule.length; i++) {
                    document.getElementsByClassName("delete-icon")[i].setAttribute('data-index', i);
                }
                // Esconde o div de confirmação após a exclusão
                document.getElementById('out-dialog').style.display = 'none';
            });
    
            // Evento para o botão "NÃO"
            document.getElementById('no').addEventListener('click', function () {
                // Esconde o div de confirmação se o usuário clicar em "NÃO"
                document.getElementById('out-dialog').style.display = 'none';
            });
        });

        scheduleDetails.innerHTML = `
            <p><b> AC COZINHA </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 15px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 15px;"></i> INÍCIO: ${scheduleItem.starthour}:${scheduleItem.startminute} | FIM: ${scheduleItem.endhour}:${scheduleItem.endminute}</b></p>
        `;
        
        scheduleDetails.innerHTML += `
            <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 15px;"></i> ESTADO: LIGAR </b></p>
            <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 15px;"></i>TEMPERATURA: ${scheduleItem.temperature}ºC </b></p>
            <p><b> <i class="bi bi-battery-full text-success" style="font-size: 15px;"></i> POTÊNCIA: ${scheduleItem.power} </b></p>
            <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 15px;"></i> MODO: ${scheduleItem.mode}</b> </p>
        `;

        scheduleDetails.appendChild(deleteIcon);
        scheduleBox.appendChild(scheduleDetails);
    }
    if (scheduleItem.name == "ASPIRADOR") {
        const scheduleDetails = document.createElement('div');
        scheduleDetails.classList.add('schedule-details');
    
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', function () {
            const itemIndex = parseInt(this.getAttribute('data-index'));
    
            // Exibe o div de confirmação ao clicar no ícone de exclusão
            document.getElementById('out-dialog').style.display = 'block';
    
            // Evento para o botão "SIM"
            document.getElementById('yes').addEventListener('click', function () {
                schedule.splice(itemIndex, 1);
                localStorage.setItem('Schedule', JSON.stringify(schedule));
                if (scheduleBox && scheduleBox.parentNode) {
                    scheduleBox.parentNode.removeChild(scheduleBox);
                }
                for (let i = 0; i < schedule.length; i++) {
                    document.getElementsByClassName("delete-icon")[i].setAttribute('data-index', i);
                }
                // Esconde o div de confirmação após a exclusão
                document.getElementById('out-dialog').style.display = 'none';
            });
    
            // Evento para o botão "NÃO"
            document.getElementById('no').addEventListener('click', function () {
                // Esconde o div de confirmação se o usuário clicar em "NÃO"
                document.getElementById('out-dialog').style.display = 'none';
            });
        });

        scheduleDetails.innerHTML = `
            <p><b> ASPIRADOR </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 20px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 20px;"></i> INÍCIO: ${scheduleItem.starthour}:${scheduleItem.startminute} | FIM: ${scheduleItem.endhour}:${scheduleItem.endminute}</b></p>
        `;
        
        if (scheduleItem.connection) {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: LIGAR </b></p>
                <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 20px;"></i> MODO: ${scheduleItem.mode}</b> </p>
            `;
        } else {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: LIGAR </b></p>
                <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 20px;"></i> MODO: ${scheduleItem.mode}</b> </p>
            `;
        }

        scheduleDetails.appendChild(deleteIcon);
        scheduleBox.appendChild(scheduleDetails);
    }
    if (scheduleItem.name == "MÁQUINA DE CAFÉ") {
        const scheduleDetails = document.createElement('div');
        scheduleDetails.classList.add('schedule-details');
    
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', function () {
            const itemIndex = parseInt(this.getAttribute('data-index'));
    
            // Exibe o div de confirmação ao clicar no ícone de exclusão
            document.getElementById('out-dialog').style.display = 'block';
    
            // Evento para o botão "SIM"
            document.getElementById('yes').addEventListener('click', function () {
                schedule.splice(itemIndex, 1);
                localStorage.setItem('Schedule', JSON.stringify(schedule));
                if (scheduleBox && scheduleBox.parentNode) {
                    scheduleBox.parentNode.removeChild(scheduleBox);
                }
                for (let i = 0; i < schedule.length; i++) {
                    document.getElementsByClassName("delete-icon")[i].setAttribute('data-index', i);
                }
                // Esconde o div de confirmação após a exclusão
                document.getElementById('out-dialog').style.display = 'none';
            });
    
            // Evento para o botão "NÃO"
            document.getElementById('no').addEventListener('click', function () {
                // Esconde o div de confirmação se o usuário clicar em "NÃO"
                document.getElementById('out-dialog').style.display = 'none';
            });
        });
        scheduleDetails.innerHTML = `
            <p><b> MÁQUINA DE CAFÉ </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 20px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 20px;"></i> ${scheduleItem.hour}:${scheduleItem.minute}</b></p>
        `;
        if (scheduleItem.connection) {
            scheduleDetails.innerHTML += `
                <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: TIRAR </b></p>
                <p><b> <i class="bi bi-thermometer-half text-info" style="font-size: 20px;"></i>TEMP. ÁGUA: ${scheduleItem.temperature}ºC </b></p>
                <p><b> <i class="bi bi-gear-wide-connected" style="font-size: 20px;"></i> TIPO: ${scheduleItem.mode}</b> </p>
            `;
        }

        scheduleDetails.appendChild(deleteIcon);
        scheduleBox.appendChild(scheduleDetails);
    }

    if (scheduleItem.name == "LUZES") {
        const scheduleDetails = document.createElement('div');
        scheduleDetails.classList.add('schedule-details');
    
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', function () {
            const itemIndex = parseInt(this.getAttribute('data-index'));
    
            // Exibe o div de confirmação ao clicar no ícone de exclusão
            document.getElementById('out-dialog').style.display = 'block';
    
            // Evento para o botão "SIM"
            document.getElementById('yes').addEventListener('click', function () {
                schedule.splice(itemIndex, 1);
                localStorage.setItem('Schedule', JSON.stringify(schedule));
                if (scheduleBox && scheduleBox.parentNode) {
                    scheduleBox.parentNode.removeChild(scheduleBox);
                }
                for (let i = 0; i < schedule.length; i++) {
                    document.getElementsByClassName("delete-icon")[i].setAttribute('data-index', i);
                }
                // Esconde o div de confirmação após a exclusão
                document.getElementById('out-dialog').style.display = 'none';
            });
    
            // Evento para o botão "NÃO"
            document.getElementById('no').addEventListener('click', function () {
                // Esconde o div de confirmação se o usuário clicar em "NÃO"
                document.getElementById('out-dialog').style.display = 'none';
            });
        });
        scheduleDetails.innerHTML = `
            <p><b> LUZES </b></p>
            <p><b><i class="bi bi-calendar" style="font-size: 20px;"></i> ${scheduleItem.dayOfWeek}</b></p>
            <p><b><i class="bi bi-clock" style="font-size: 15px;"></i> INÍCIO: ${scheduleItem.starthour}:${scheduleItem.startminute} | FIM: ${scheduleItem.endhour}:${scheduleItem.endminute}</b></p>
        `;
        
        scheduleDetails.innerHTML += `
        <p><b> <i class="bi bi-lightning-fill text-warning" style="font-size: 20px;"></i> ESTADO: TIRAR </b></p>
        <p><b> <i class="bi bi-battery-full text-success" style="font-size: 15px;"></i> INTENSIDADE: ${scheduleItem.power}% </b></p>
        `;

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
    if (schedule.length == 0){
        let container = document.getElementById('scheduleContainer');
        let textBox = document.createElement("div");
        textBox.classList.add('infoBox');

        textBox.innerHTML = "Ainda não foram definidos agendamentos.";
        container.appendChild(textBox);
    } else {
        schedule.sort((a, b) => {
            const timeA = parseInt(a.hour) * 60 + parseInt(a.minute);
            const timeB = parseInt(b.hour) * 60 + parseInt(b.minute);
            return timeA - timeB;
        });

        schedule.forEach((item, index) => {
            createScheduleBox(item, index);
        });
    }
});

function principal(){


    defineEventHandlersParaElementosHTML();

}

window.addEventListener("load", principal);
