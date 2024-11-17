const keypadBox = document.getElementById("keypadBox")
const displayScreen = document.getElementById("displayText")
const memoryPalace = document.getElementById("memoryPalace")

let frstNum = "";
let scndNum = "";
let memNum = "";
let funcPerformed = "";
const calcHistory = [];



function createButtons(){
    const buttons = ["1","2","3","+","<",
                     "4","5","6","-","C",
                     "7","8","9","/","=",
                     "%","0",".","*"];

    const pussycatDolls = [];
        //creates buttons and assigns classes.
    buttons.forEach((label) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.setAttribute("id",label);
        if(isNaN(label) == false){
            button.classList.add("number");
        }
        else if (label == "."){
            button.classList.add("decimal");
        }
        else if (label == "="){
            button.classList.add("equals");
        }
        else if (label == "C"){
            button.classList.add("clear");
        }
        else if (label == "<"){
            button.classList.add("bksp");
        }
        else {
            button.classList.add("functionKey");
        }
        button.classList.add("calculatorButton");
        keypadBox.appendChild(button);
        pussycatDolls.push(button);
    })
    return pussycatDolls
}

function createMemoryButtons(){
    set = [];
    let n = 0;
    for (let n = 0; n<= 8; n++){
        const button = document.createElement("button");
        button.classList.add("memoryButton");
        button.disabled = true;
        button.textContent = "";
        button.setAttribute("id",n);
        memoryPalace.appendChild(button);
        set.push(button);
    }
    return set;
}

function performCalculation(){
    const num1 = parseFloat(frstNum);
    const num2 = parseFloat(scndNum);

    switch(funcPerformed){
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
    }

    displayScreen.textContent = result;
    return result
}



function resetVariablesForEquals(){
    frstNum = "";
    scndNum = "";
    funcPerformed = "";
    memNum = "";
}

function resetNumbersForNextCalculations(memNum){
    frstNum = memNum;
    scndNum = "";
    memNum = "";
    funcPerformed ="";
}

function handleEvent(button){
    if (button.classList.contains("number")){
        if (funcPerformed == ""){
            frstNum += button.textContent;
            displayScreen.textContent = frstNum;
        }
        else{
            scndNum += button.textContent;
            displayScreen.textContent = scndNum;
        }

    }
    else if (button.classList.contains("functionKey")){
        if(funcPerformed == ""){
            funcPerformed += button.textContent;
            displayScreen.textContent = frstNum + funcPerformed;
        }
        else if (funcPerformed != ""){
            memNum = performCalculation();
            calcHistory.push(memNum);
            resetNumbersForNextCalculations(memNum);
            funcPerformed += button.textContent;
            displayScreen.textContent = frstNum + funcPerformed;
        }
    }

    else if (button.classList.contains("decimal")){
        if (funcPerformed == ""){
            if (frstNum == ""){
                frstNum = "0.";
                displayScreen.textContent = frstNum;
            }
            else{
                displayScreen.textContent
            }}
        else{
            if (scndNum == ""){
                scndNum = "0.";
                displayScreen.textContent = scndNum
            }
            else{
                displayScreen.textContent
            }
        }
    }
    
    else if (button.classList.contains("clear")){
        resetVariablesForEquals();
        displayScreen.textContent = frstNum
    }

    else if (button.classList.contains("equals")){
        if (funcPerformed == ""){
            displayScreen.textContent = frstNum;
        }
        else{
            memNum = performCalculation();
            calcHistory.push(memNum);
            resetVariablesForEquals();
        }
    }

    else if (button.classList.contains("bksp")){
        if (funcPerformed == ""){
            frstNum = frstNum.slice(0,-1);
            displayScreen.textContent = frstNum
        }
        else{
            scndNum = scndNum.slice(0,-1);
            displayScreen.textContent = scndNum
        }
    }
}



const buttons = createButtons();
const memories = createMemoryButtons();

keypadBox.addEventListener("click",(event)=> {
    if(event.target.tagName === "BUTTON"){
        handleEvent(event.target);
    }
});
