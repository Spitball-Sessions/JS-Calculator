const keypadBox = document.getElementById("keypadBox")
const displayScreen = document.getElementById("displayText")

let frstNum = "";
let scndNum = "";
let memNum = "";
let funcPerformed = "";
const calcHistory = [];



function createButtons(){
    const buttons = ["1","2","3","+",
                     "4","5","6","-",
                     "7","8","9","/",
                     "=","0",".","*"];

    const pussycatGirls = [];
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
        else {
            button.classList.add("functionKey")
        }
        button.classList.add("calculatorButton");
        keypadBox.appendChild(button);
        pussycatGirls.push(button);
    })
    return pussycatGirls
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

function resetNumbersForNextCalculations(){
    frstNum = memNum;
    scndNum = "";
    memNum = "";
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
            resetNumbersForNextCalculations
            funcPerformed += button.textContent;
        }
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
}

const buttons = createButtons();

keypadBox.addEventListener("click",(event)=> {
    if(event.target.tagName === "BUTTON"){
        handleEvent(event.target);
    }
});
