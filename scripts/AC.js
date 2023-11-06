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

    
}

function Menu_Perfil(){
    const userMenu = document.getElementById('user-menu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else {
        userMenu.style.display = 'block';
    }
}


let isACOn = false;
let currentTemperature = 22;
let currentPower = 2;
const modes = ["Resfriamento", "Aquecimento", "Ventilação", "Automático"];
let currentModeIndex = 0;
let currentMode="Automático"
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
    

    if (state === 'on') {
        isACOn = true;
        statusText.textContent = 'O ar condicionado está ligado.';
        powerOnButton.classList.add('selected');
        powerOffButton.classList.remove('selected');
        statusText.style.color="green"
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
        saveChangesButton.style.backgroundColor="green";

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
        saveChangesButton.style.backgroundColor="green"
    }
}

function decreaseTemperatureValue() {
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentTemperature > 16) {
        currentTemperature--;
        currentTemperatureDisplay.textContent = currentTemperature + '°C';
        change = true;
        saveChangesButton.style.backgroundColor="green"
    }
}

function increaseTemperatureValue() {
    const currentTemperatureDisplay = document.getElementById('currentTemperature');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentTemperature < 30) {
        currentTemperature++;
        currentTemperatureDisplay.textContent = currentTemperature + '°C';
        change = true;
        saveChangesButton.style.backgroundColor="green"
    }
}

function decreasePowerValue() {
    const currentPowerDisplay = document.getElementById('currentpower');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentPower> 1) {
        currentPower--;
        currentPowerDisplay.textContent = currentPower;
        change = true;
        saveChangesButton.style.backgroundColor="green"
    }
}

function increasePowerValue() {
    const currentPowerDisplay = document.getElementById('currentpower');
    const saveChangesButton = document.getElementById('guardarButton');
    if (currentPower < 5) {
        currentPower++;
        currentPowerDisplay.textContent = currentPower;
        change = true;
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
    currentModeDisplay.textContent = modes[currentModeIndex];
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
            console.log('Alterações salvas com sucesso.');
            let ACData = new AC(isACOn,currentTemperature,currentPower,currentMode);
            ACinfo.push(ACData);
            localStorage.setItem("ACINFO",JSON.stringify(ACinfo));
            change = false;

        });

        confirmNo.addEventListener('click', function() {
            customDialog.style.display = 'none';
            // Restaurar os valores anteriores
            currentTemperature = previousTemperature;
            currentPower = previousPower;
            currentMode = previousMode;
            // Atualizar os elementos na interface com os valores anteriores
            const currentTemperatureDisplay = document.getElementById('currentTemperature');
            currentTemperatureDisplay.textContent = currentTemperature + '°C';
            const currentPowerDisplay = document.getElementById('currentpower');
            currentPowerDisplay.textContent = currentPower;
            const currentModeDisplay = document.getElementById('currentMode');
            currentModeDisplay.textContent = currentMode;
            console.log('Alterações não salvas.');
            change = false;
        });
    } else {
        console.log('Nenhuma alteração para salvar.');
    }
}

function AC(connection,temperature,power,mode){
    this.connection = connection
    this.temperature = temperature
    this.power = power
    this.mode = mode
}

function GoBack() {
    console.log(change);
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
    const storedACInfo = localStorage.getItem("ACINFO");
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
