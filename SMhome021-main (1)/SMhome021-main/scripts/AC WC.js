"use strict";


function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const powerOnButton = document.getElementById('powerOnButton');
    const powerOffButton = document.getElementById('powerOffButton');
    const decreaseTemperature = document.getElementById('decreaseTemperature');
    const increaseTemperature = document.getElementById('increaseTemperature');
    const decreasePower = document.getElementById('decreasePower');
    const increasePower = document.getElementById('increasePower');
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
    decreasePower.addEventListener('click', decreasePowerValue);
    increasePower.addEventListener('click', increasePowerValue);
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

function Cancel(){
    window.location.href = "AC WC.html";
}

function SchedulePage(){
    window.location.href = "AGENDAMENTOS.html";
}

function ScheduleAC(name,connection,temperature,power,mode, dayOfWeek, starthour, startminute, endhour, endminute) {
    this.name= name;
    this.connection = connection;
    this.temperature = temperature;
    this.power = power;
    this.mode = mode;
    this.dayOfWeek = dayOfWeek;
    this.starthour = starthour;
    this.startminute = startminute;
    this.endhour = endhour;
    this.endminute = endminute;
}

function schedule() {
    const selectedDays = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(checkbox => checkbox.value);
    const selectedHourElement = document.getElementById('selectedHour');
    const selectedMinuteElement = document.getElementById('selectedMinute');
    const selectedHourElement2 = document.getElementById('selectedHour2');
    const selectedMinuteElement2 = document.getElementById('selectedMinute2');
    
    const Dialog = document.getElementById("scheduleconfirmed");
    const Horario = document.getElementById('horario');
    const selectedHour = selectedHourElement.value;
    const selectedMinute = selectedMinuteElement.value;
    const selectedHour2 = selectedHourElement2.value;
    const selectedMinute2 = selectedMinuteElement2.value;

    if (selectedDays.length > 0 && selectedHour != undefined && selectedMinute != undefined && selectedHour2 != undefined && selectedMinute2 != undefined) {
        
        let ScheduleData = new ScheduleAC("AC WC",isACOn,currentTemperature,currentPower,currentMode, selectedDays, selectedHour, selectedMinute, selectedHour2, selectedMinute2);
        
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
    const hourScroll2 = document.getElementById('hourScroll2');
    
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

    for (let hour = 0; hour < 24; hour++) {
        const hourOption = document.createElement('div');
        hourOption.textContent = (hour < 10 ? '0' : '') + hour;
        hourOption.classList.add('scroll-item');
        hourOption.dataset.value = hour;
        hourOption.addEventListener('click', function() {
            updateSelectedTime(hourOption, hourOption.dataset.value, 'selectedHour2', 'hourScroll2');
        });
        hourScroll2.appendChild(hourOption);
    }

}

function populateTimeScrolls2() {
    const minuteScroll = document.getElementById('minuteScroll');
    const minuteScroll2 = document.getElementById('minuteScroll2');
    
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

    for (let minute = 0; minute < 60; minute++) {
        const minuteOption = document.createElement('div');
        minuteOption.textContent = (minute < 10 ? '0' : '') + minute;
        minuteOption.classList.add('scroll-item');
        minuteOption.dataset.value = minute;
        minuteOption.addEventListener('click', function() {
            updateSelectedTime(minuteOption, minuteOption.dataset.value, 'selectedMinute2', 'minuteScroll2');
        });
        minuteScroll2.appendChild(minuteOption);
    }
}


let isACOn = false;
let currentTemperature = 22;
let currentPower = 2;
const modes = ["RESFRIAMENTO", "AQUECIMENTO", "VENTILAÇÃO", "AUTOMÁTICO"];
let currentModeIndex = 0;
let currentMode="AUTOMÁTICO"
let change = false;
let previousTemperature = currentTemperature;
let previousPower = currentPower;
let previousMode = currentMode;
let ACinfo = []




function toggleAC(state) {
    const statusText = document.getElementById('status');
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    const TemperatureControl= document.getElementById("temperature-control");
    const currentPowerDisplay = document.getElementById('currentpower');
    const PowerControl= document.getElementById("powercontrol");
    const currentModeDisplay = document.getElementById('currentMode');
    const ModeControl= document.getElementById("mode-control");
    const saveChangesButton = document.getElementById('guardarButton');
    const powerOnButton = document.getElementById('powerOnButton');
    const powerOffButton = document.getElementById('powerOffButton');
    

    if (state === 'on') {
        isACOn = true;
        statusText.textContent = 'O ar condicionado está ligado.';
        powerOnButton.classList.add('selected');
        powerOffButton.classList.remove('selected');
        statusText.style.color="#4CAF50";
        TemperatureControl.style.color = '#000';
        TemperatureControl.style.pointerEvents = "all";
        TemperatureControl.style.borderColor ="#000";
        currentTemperatureDisplay.style.borderColor ="#000";
        PowerControl.style.color = '#000';
        PowerControl.style.pointerEvents = "all";
        PowerControl.style.borderColor ="#000";
        currentPowerDisplay.style.borderColor ="#000";
        ModeControl.style.color = '#000';
        ModeControl.style.pointerEvents = "all";
        ModeControl.style.borderColor ="#000";
        currentModeDisplay.style.borderColor ="#000";
        change=true;
        

    } else if (state === 'off') {
        isACOn = false;
        statusText.textContent = 'O ar condicionado está desligado.';
        powerOnButton.classList.remove('selected');
        powerOffButton.classList.add('selected');
        statusText.style.color="red";
        TemperatureControl.style.color = '#777'; 
        TemperatureControl.style.pointerEvents = "none"
        TemperatureControl.style.borderColor = '#777'; 
        currentTemperatureDisplay.style.borderColor ="#777";
        PowerControl.style.color = '#777'; 
        PowerControl.style.pointerEvents = "none"
        PowerControl.style.borderColor = '#777'; 
        currentPowerDisplay.style.borderColor ="#777";
        ModeControl.style.color = '#777'; 
        ModeControl.style.pointerEvents = "none"
        ModeControl.style.borderColor = '#777'; 
        currentModeDisplay.style.borderColor ="#777";
        change=true;
        
    }
}

function decreaseTemperatureValue() {
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentTemperature > 16) {
        currentTemperature--;
        currentTemperatureDisplay.textContent = currentTemperature + '°C';
        change = true;
        
    }
}

function increaseTemperatureValue() {
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentTemperature < 30) {
        currentTemperature++;
        currentTemperatureDisplay.textContent = currentTemperature + '°C';
        change = true;
        
    }
}

function decreasePowerValue() {
    const currentPowerDisplay = document.getElementById('currentpower');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentPower> 1) {
        currentPower--;
        currentPowerDisplay.textContent = currentPower;
        change = true;
        
    }
}

function increasePowerValue() {
    const currentPowerDisplay = document.getElementById('currentpower');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentPower < 5) {
        currentPower++;
        currentPowerDisplay.textContent = currentPower;
        change = true;
        
    }
}

function changeMode(delta) {
    const currentModeDisplay = document.getElementById('currentMode');
    const saveChangesButton = document.getElementById('guardarButton');
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
        const newPower = currentPower;
        const newMode = currentMode;
        const customDialog = document.getElementById('custom-dialog');
        const confirmYes = document.getElementById('confirm-yes');
        const confirmNo = document.getElementById('confirm-no');


        customDialog.style.display = 'block';

        confirmYes.addEventListener('click', function() {
            previousTemperature = newTemperature;
            previousPower = newPower;
            previousMode = newMode;
            currentTemperature = newTemperature;
            currentPower = newPower;
            currentMode = newMode;
            customDialog.style.display = 'none';
            window.location.href = "../HOME.html";
            
            let ACData = new AC(isACOn,currentTemperature,currentPower,currentMode);
            ACinfo.push(ACData);
            localStorage.setItem("ACWC",JSON.stringify(ACinfo));
            change = false;

        });

        confirmNo.addEventListener('click', function() {
            customDialog.style.display = 'none';
            
            let storedACInfo = localStorage.getItem("ACWC");
            if (storedACInfo) {
                ACinfo = JSON.parse(storedACInfo);
                const lastACData = ACinfo[ACinfo.length - 1];
                if (lastACData) {
                    isACOn = lastACData.connection;
                    currentTemperature = lastACData.temperature;
                    currentPower = lastACData.power;
                    currentMode = lastACData.mode;
                    if (isACOn){
                        toggleAC("on")
                    }else{
                        toggleAC("off")
                    }
                    const currentTemperatureDisplay = document.getElementById('currentTemperature');
                    currentTemperatureDisplay.textContent = currentTemperature + '°C';
                    const currentPowerDisplay = document.getElementById('currentpower');
                    currentPowerDisplay.textContent = currentPower;
                    const currentModeDisplay = document.getElementById('currentMode');
                    currentModeDisplay.textContent = currentMode;
                }
            }else{
                currentTemperature = previousTemperature;
                currentPower = previousPower;
                currentMode = previousMode;
                
                const currentTemperatureDisplay = document.getElementById('currentTemperature');
                currentTemperatureDisplay.textContent = currentTemperature + '°C';
                const currentPowerDisplay = document.getElementById('currentpower');
                currentPowerDisplay.textContent = currentPower;
                const currentModeDisplay = document.getElementById('currentMode');
                currentModeDisplay.textContent = currentMode;
            }
            change = false;
        });
    }
}

function AC(connection,temperature,power,mode){
    this.connection = connection;
    this.temperature = temperature;
    this.power = power;
    this.mode = mode;
}


document.addEventListener('DOMContentLoaded', function() {
    populateTimeScrolls1();
    populateTimeScrolls2();
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
    let storedACInfo = localStorage.getItem("ACWC");
    
    if (storedACInfo) {
        ACinfo = JSON.parse(storedACInfo);
        const lastACData = ACinfo[ACinfo.length - 1];
        if (lastACData) {
            isACOn = lastACData.connection;
            currentTemperature = lastACData.temperature;
            currentPower = lastACData.power;
            currentMode = lastACData.mode;
          
            
        }
        if (isACOn){
            toggleAC("on")
        }
    } 
    
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    currentTemperatureDisplay.textContent = currentTemperature + '°C';
    const currentPowerDisplay = document.getElementById('currentpower');
    currentPowerDisplay.textContent = currentPower;
    const currentModeDisplay = document.getElementById('currentMode');
    currentModeDisplay.textContent = currentMode;

    defineEventHandlersParaElementosHTML();
    
}

window.addEventListener("load", principal);
