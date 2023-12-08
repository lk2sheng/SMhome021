"use strict";


function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const powerOnButton = document.getElementById('powerOnButton');
    const powerOffButton = document.getElementById('powerOffButton');
    const decreaseTemperature = document.getElementById('decreaseTemperature');
    const increaseTemperature = document.getElementById('increaseTemperature');
    const prevModeButton = document.getElementById('prevMode');
    const nextModeButton = document.getElementById('nextMode');
    const saveChangesButton = document.getElementById('guardarButton');
    const BackButton = document.getElementById('back-button');
    const schedulingButton = document.getElementById('agendamentosButton');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
    const okButton = document.getElementById('okButton');
   
    
    userIcon.addEventListener("click", Menu_Perfil);
    powerOnButton.addEventListener('click', () => toggleAC('on'));
    powerOffButton.addEventListener('click', () => toggleAC('off'));
    decreaseTemperature.addEventListener('click', decreaseTemperatureValue);
    increaseTemperature.addEventListener('click', increaseTemperatureValue);
    prevModeButton.addEventListener('click', () => changeMode(-1));
    nextModeButton.addEventListener('click', () => changeMode(1));
    saveChangesButton.addEventListener('click', saveChanges);
    BackButton.addEventListener("click",GoBack);
    schedulingButton.addEventListener("click", Scheduling);
    confirmButton.addEventListener('click', schedule);
    cancelButton.addEventListener('click', Cancel);
    okButton.addEventListener('click', SchedulePage);
}

function Menu_Perfil(){
    const userMenu = document.getElementById('user-menu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else {
        userMenu.style.display = 'block';
    }
}

function Scheduling(){
    const Horario = document.getElementById('horario');
    if (Horario.style.display === 'block') {
        Horario.style.display = 'none';
    } else {
        Horario.style.display = 'block';
    }
}

function SchedulePage(){
    window.location.href = "AGENDAMENTOS.html";
}


function Cancel(){
    window.location.href = "MAQUINACAFE.html";
}

function ScheduleCoffe(name,connection,temperature,mode, dayOfWeek, hour, minute) {
    this.name= name;
    this.connection = connection;
    this.temperature = temperature;
    this.mode = mode;
    this.dayOfWeek = dayOfWeek;
    this.hour = hour;
    this.minute = minute;
}

function schedule() {
    const selectedDays = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(checkbox => checkbox.value);
    const selectedHourElement = document.getElementById('selectedHour');
    const selectedMinuteElement = document.getElementById('selectedMinute');
    const Dialog = document.getElementById("scheduleconfirmed");
    const Horario = document.getElementById('horario');
    const selectedHour = selectedHourElement.value;
    const selectedMinute = selectedMinuteElement.value;

    if (selectedDays.length > 0 && selectedHour != undefined && selectedMinute != undefined) {
        
        let ScheduleData = new ScheduleCoffe("MÁQUINA DE CAFÉ",isCoffeOn,currentTemperature,currentMode, selectedDays, selectedHour, selectedMinute);
        
        let Schedule = JSON.parse(localStorage.getItem('Schedule')) || [];
        
        Schedule.push(ScheduleData);

        localStorage.setItem("Schedule", JSON.stringify(Schedule));

        Dialog.style.display = 'block';
        Horario.style.display = "none"; 
        
    }
    
}

function updateSelectedTime(selectedItem, value, selectedTimeId, containerId) {
    const selectedTimeElement = document.getElementById(selectedTimeId);
    const scrollContainer = document.getElementById(containerId);

    if (selectedTimeElement && scrollContainer) {
        const otherTimeElements = scrollContainer.querySelectorAll('.scroll-item');
        otherTimeElements.forEach(element => {
            element.style.backgroundColor = '';
        });

        selectedItem.style.backgroundColor = '#4caf50';

        selectedTimeElement.value = (value < 10 ? '0' : '') + value;
    } 
}

function populateTimeScrolls1() {
    const hourScroll = document.getElementById('hourScroll');
    
    for (let hour = 0; hour < 24; hour++) {
        const hourOption = document.createElement('div');
        hourOption.textContent = (hour < 10 ? '0' : '') + hour;
        hourOption.classList.add('scroll-item');
        hourOption.dataset.value = hour;
        hourOption.addEventListener('click', function() {
            updateSelectedTime(hourOption, hourOption.dataset.value, 'selectedHour', 'hourScroll');
        });
        hourScroll.appendChild(hourOption);
    }
}

function populateTimeScrolls2() {
    const minuteScroll = document.getElementById('minuteScroll');
    
    for (let minute = 0; minute < 60; minute++) {
        const minuteOption = document.createElement('div');
        minuteOption.textContent = (minute < 10 ? '0' : '') + minute;
        minuteOption.classList.add('scroll-item');
        minuteOption.dataset.value = minute;
        minuteOption.addEventListener('click', function() {
            updateSelectedTime(minuteOption, minuteOption.dataset.value, 'selectedMinute', 'minuteScroll');
        });
        minuteScroll.appendChild(minuteOption);
    }
}

let isCoffeOn = false;
let currentTemperature = 90;
const modes = ["CURTO", "LONGO", "DUPLO", "AMERICANO", "CAFÉ COM LEITE"];
let currentModeIndex = 0;
let currentMode="LONGO"
let change = false;
let previousTemperature = currentTemperature;
let previousMode = currentMode;
let Coffeinfo = []


function toggleAC(state) {
    const statusText = document.getElementById('status');
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    const TemperatureControl= document.getElementById("temperature-coffe");
    const currentModeDisplay = document.getElementById('currentMode');
    const ModeControl= document.getElementById("mode-coffe");
    const saveChangesButton = document.getElementById('guardarButton');
    const schedulingButton = document.getElementById('agendamentosButton');
    

    if (state === 'on') {
        isCoffeOn = true;
        statusText.textContent = 'A Máquina de Café está ligada.';
        powerOnButton.classList.add('selected');
        powerOffButton.classList.remove('selected');
        statusText.style.color="#4CAF50";
        TemperatureControl.style.color = '#000';
        TemperatureControl.style.pointerEvents = "all";
        TemperatureControl.style.borderColor ="#000";
        currentTemperatureDisplay.style.borderColor ="#000";
        ModeControl.style.color = '#000';
        ModeControl.style.pointerEvents = "all";
        ModeControl.style.borderColor ="#000";
        currentModeDisplay.style.borderColor ="#000";
        saveChangesButton.removeAttribute('disabled');
        change=true;

    } else if (state === 'off') {
        isCoffeOn = false;
        statusText.textContent = 'A Máquina de Café está desligada.';
        powerOnButton.classList.remove('selected');
        powerOffButton.classList.add('selected');
        statusText.style.color="red";
        TemperatureControl.style.color = '#777'; 
        TemperatureControl.style.pointerEvents = "none"
        TemperatureControl.style.borderColor = '#777'; 
        currentTemperatureDisplay.style.borderColor ="#777";
        ModeControl.style.color = '#777'; 
        ModeControl.style.pointerEvents = "none"
        ModeControl.style.borderColor = '#777'; 
        currentModeDisplay.style.borderColor ="#777";
        
        saveChangesButton.setAttribute('disabled', 'true');
        change=true;
    }
}

function decreaseTemperatureValue() {
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    if (currentTemperature > 85) {
        currentTemperature--;
        currentTemperatureDisplay.textContent = currentTemperature + '°C';
        change = true;
        
    }
}

function increaseTemperatureValue() {
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    if (currentTemperature < 100) {
        currentTemperature++;
        currentTemperatureDisplay.textContent = currentTemperature + '°C';
        change = true;
        
    }
}

function changeMode(delta) {
    const currentModeDisplay = document.getElementById('currentMode');
    currentModeIndex = (currentModeIndex + delta) % modes.length;
    if (currentModeIndex < 0) {
        currentModeIndex = modes.length - 1;
        change = true;
    }
    currentMode = modes[currentModeIndex]; 
    currentModeDisplay.textContent = currentMode;
    change=true;
}

function saveChanges() {
    if (change) {
        const newTemperature = currentTemperature;
        const newMode = currentMode;
        const customDialog = document.getElementById('custom-dialog');
        const confirmYes = document.getElementById('confirm-yes');
        const confirmNo = document.getElementById('confirm-no');


        customDialog.style.display = 'block';

        confirmYes.addEventListener('click', function() {
            previousTemperature = newTemperature;
            previousMode = newMode;
            currentTemperature = newTemperature;
            currentMode = newMode;
            customDialog.style.display = 'none';
            window.location.href = "../HOME.html";
            
            let CoffeData = new Coffe(isCoffeOn,currentTemperature,currentMode);
            Coffeinfo.push(CoffeData);
            localStorage.setItem("MÁQUINACAFÉ",JSON.stringify(Coffeinfo));
            change = false;

        });

        confirmNo.addEventListener('click', function() {
            customDialog.style.display = 'none';
            
            let storedCoffeInfo = localStorage.getItem("MÁQUINACAFÉ");
            if (storedCoffeInfo) {
                Coffeinfo = JSON.parse(storedCoffeInfo);
                const lastCoffeData = Coffeinfo[Coffeinfo.length - 1];
                if (lastCoffeData) {
                    isCoffeOn = lastCoffeData.connection;
                    currentTemperature = lastCoffeData.temperature;
                    currentMode = lastCoffeData.mode;
                    if (isCoffeOn){
                        toggleAC("on")
                    }else{
                        toggleAC("off")
                    }
                    const currentTemperatureDisplay = document.getElementById('currentTemperature');
                    currentTemperatureDisplay.textContent = currentTemperature + '°C';
                    const currentModeDisplay = document.getElementById('currentMode');
                    currentModeDisplay.textContent = currentMode;
                }
            }else{
                currentTemperature = previousTemperature;
                currentMode = previousMode;
                
                const currentTemperatureDisplay = document.getElementById('currentTemperature');
                currentTemperatureDisplay.textContent = currentTemperature + '°C';
                const currentModeDisplay = document.getElementById('currentMode');
                currentModeDisplay.textContent = currentMode;
            }
            change = false;
        });
    }
}

function Coffe(connection,temperature,mode){
    this.connection = connection;
    this.temperature = temperature;
    this.mode = mode;
}

document.addEventListener('DOMContentLoaded', function() {
    populateTimeScrolls1();
    populateTimeScrolls2();
    const saveChangesButton = document.getElementById('guardarButton');
    saveChangesButton.setAttribute('disabled', 'true');
});


function GoBack() {
    
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

function principal(){

    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    currentTemperatureDisplay.textContent = currentTemperature + '°C';
    const currentModeDisplay = document.getElementById('currentMode');
    currentModeDisplay.textContent = currentMode;

    defineEventHandlersParaElementosHTML();
    
}

window.addEventListener("load", principal);
