"use strict";

function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const powerOnButton = document.getElementById('powerOnButton');
    const powerOffButton = document.getElementById('powerOffButton');
    const prevModeButton = document.getElementById('prevMode');
    const nextModeButton = document.getElementById('nextMode');
    const saveChangesButton = document.getElementById('guardarButton');
    const BackButton = document.getElementById('back-button');
    const schedulingButton = document.getElementById('agendamentosButton');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
    const okButton = document.getElementById('okButton');

    userIcon.addEventListener("click", Menu_Perfil);
    powerOnButton.addEventListener('click', () => toggleCleaner('on'));
    powerOffButton.addEventListener('click', () => toggleCleaner('off'));
    prevModeButton.addEventListener('click', () => changeMode(-1));
    nextModeButton.addEventListener('click', () => changeMode(1));
    saveChangesButton.addEventListener('click', saveChanges);
    BackButton.addEventListener("click",GoBack);
    schedulingButton.addEventListener("click", Scheduling);
    confirmButton.addEventListener('click', schedule);
    cancelButton.addEventListener('click', Cancel);
    okButton.addEventListener('click', Cancel);

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
    window.location.href = "ASPIRADOR.html";
}

function ScheduleCleaner(name,connection, mode, dayOfWeek, starthour, startminute, endhour, endminute) {
    this.name= name;
    this.connection = connection;
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

        console.log(selectedHour2)
        
        let ScheduleData = new ScheduleCleaner("ASPIRADOR", isCleanerOn, currentMode, selectedDays, selectedHour, selectedMinute, selectedHour2, selectedMinute2);
        
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





let isCleanerOn = false;
const modes = ["ECONÓMICO", "SILENCIOSO", "POTENTE", "AUTOMÁTICO"];
let currentModeIndex = 0;
let currentMode="AUTOMÁTICO"
let change = false;

let previousMode = currentMode;
let Cleanerinfo = []


function toggleCleaner(state) {

    const statusText = document.getElementById('status');
    const currentModeDisplay = document.getElementById('currentMode');
    const ModeControl= document.getElementById("mode-cleaner");
    const saveChangesButton = document.getElementById('guardarButton');
    

    if (state === 'on') {
        isCleanerOn = true;
        statusText.textContent = 'O Aspirador está ligado.';
        powerOnButton.classList.add('selected');
        powerOffButton.classList.remove('selected');
        statusText.style.color="green"
        
        ModeControl.style.color = '#000';
        ModeControl.style.pointerEvents = "all";
        ModeControl.style.borderColor ="#000";
        currentModeDisplay.style.borderColor ="#000";
        change=true;
        saveChangesButton.style.backgroundColor="green";

    } else if (state === 'off') {
        isCleanerOn = false;
        statusText.textContent = 'O Aspirador está desligado.';
        powerOnButton.classList.remove('selected');
        powerOffButton.classList.add('selected');
        statusText.style.color="red";
        ModeControl.style.color = '#777'; 
        ModeControl.style.pointerEvents = "none"
        ModeControl.style.borderColor = '#777'; 
        currentModeDisplay.style.borderColor ="#777";
        change=true;
        saveChangesButton.style.backgroundColor="green"
    }
}

function changeMode(delta) {
    const currentModeDisplay = document.getElementById('currentMode');
    const saveChangesButton = document.getElementById('guardarButton');
    currentModeIndex = (currentModeIndex + delta) % modes.length;
    if (currentModeIndex < 0) {
        currentModeIndex = modes.length - 1;
        change = true;
        saveChangesButton.style.backgroundColor="green"
    }
    change=true;
    currentMode = modes[currentModeIndex]; 
    currentModeDisplay.textContent = currentMode;
}

function saveChanges() {
    if (change) {
        const newMode = currentMode;
        const customDialog = document.getElementById('custom-dialog');
        const confirmYes = document.getElementById('confirm-yes');
        const confirmNo = document.getElementById('confirm-no');


        customDialog.style.display = 'block';

        confirmYes.addEventListener('click', function() {
            previousMode = newMode;
            currentMode = newMode;
            customDialog.style.display = 'none';
            window.location.href = "../HOME.html";
            
            let CleanerData = new Cleaner(isCleanerOn, currentMode);
            Cleanerinfo.push(CleanerData);
            localStorage.setItem("ASPIRADOR",JSON.stringify(Cleanerinfo));
            change = false;

        });

        confirmNo.addEventListener('click', function() {
            customDialog.style.display = 'none';
            
            let storedCleanerInfo = localStorage.getItem("ASPIRADOR");
            if (storedCleanerInfo) {
                Cleanerinfo = JSON.parse(storedCleanerInfo);
                const lastCleanerData = Cleanerinfo[Cleanerinfo.length - 1];
                if (lastCleanerData) {
                    isCleanerOn = lastCleanerData.connection;
                    currentMode = lastCleanerData.mode;
                    if (isCleanerOn){
                        toggleCleaner("on")
                    }else{
                        toggleCleaner("off")
                    }
                    const currentModeDisplay = document.getElementById('currentMode');
                    currentModeDisplay.textContent = currentMode;
                }
            }else{
                currentMode = previousMode;
                const currentModeDisplay = document.getElementById('currentMode');
                currentModeDisplay.textContent = currentMode;
            }
            change = false;
        });
    }
    
}

function Cleaner(connection,mode){
    this.connection = connection;
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
    let storedCleanerInfo = localStorage.getItem("ASPIRADOR");
    
    if (storedCleanerInfo) {
        Cleanerinfo = JSON.parse(storedCleanerInfo);
        const lastCleanerData = Cleanerinfo[Cleanerinfo.length - 1];
        if (lastCleanerData) {
            isCleanerOn = lastCleanerData.connection;
            currentMode = lastCleanerData.mode;
          
            
        }
        if (isCleanerOn){
            toggleCleaner("on")
        }
    } 
    
    
    const currentModeDisplay = document.getElementById('currentMode');
    currentModeDisplay.textContent = currentMode;

    defineEventHandlersParaElementosHTML();
    
}

window.addEventListener("load", principal);
