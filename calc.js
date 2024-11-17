const keypadBox = document.getElementById("keypadBox")
const displayScreen = document.getElementById("displayText")
const memoryPalace = document.getElementById("memoryPalace")

let frstNum = "";
let scndNum = "";
let funcPerformed = "";
const calcHistory = [];




function createButtons(){
    const buttons = ["1","2","3","/","<",
                     "4","5","6","*","C",
                     "7","8","9","-","=",
                     "%","0",".","+"];

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
    pussycatDolls = [];
    let n = 0;
    for (let n = 0; n<= 8; n++){
        const button = document.createElement("button");
        button.classList.add("memoryButton");
        button.disabled = true;
        button.textContent = "";
        button.setAttribute("id","m"+n);
        memoryPalace.appendChild(button);

        span2 = document.createElement("span");
        span2.classList.add("span2");
        span1 = document.createElement("span");
        span1.classList.add("span1");

        button.appendChild(span2);
        button.appendChild(span1);


        pussycatDolls.push(button);
    }
    return pussycatDolls;
}

function performCalculation(){
    const num1 = parseFloat(frstNum);
    const num2 = parseFloat(scndNum);

    switch(funcPerformed){
        case "+":
            result = num1 + num2;
            equation = frstNum + " + " + scndNum;
            break;
        case "-":
            result = num1 - num2;
            equation = frstNum + " - " + scndNum;
            break;
        case "*":
            result = num1 * num2;
            equation = frstNum + " * " + scndNum;
            break;
        case "/":
            result = num1 / num2;
            equation = frstNum + " / " + scndNum;
            break;
        case "%":
            result = num1 % num2;
            equation = frstNum + " % " + scndNum;
            break
    }

    displayScreen.textContent = result;
    return [result, equation];
}

function updateMemory(){
    // Loop through calcHistory
    for (let i = calcHistory.length - 1; i >=0; i--) {
        let memNum = calcHistory[i].memNum; // First element of the sub-array
        let equation = calcHistory[i].equation; // Second element of the sub-array

        const clearSpan1 = document.getElementsByClassName("span1");
        const clearSpan2 = document.getElementsByClassName("span2");

        // Find the button by id
        const button = document.getElementById("m"+i); // Assuming button IDs match the index
            button.disabled = false;

            // Update spans inside the button
            const span1 = button.querySelector(".span1"); // Assuming span1 has class 'span1'
            const span2 = button.querySelector(".span2"); // Assuming span2 has class 'span2'

            span1.textContent = memNum; // Update memNum
            span2.textContent = equation; // Update equation
        }
    }


function resetVariablesForEquals(){
    frstNum = "";
    scndNum = "";
    funcPerformed = "";
}

function resetNumbersForNextCalculations(memNum){
    frstNum = memNum;
    scndNum = "";
    funcPerformed ="";
}

function recallmemory(button){
    const span1 = button.querySelector(".span1");

    if (funcPerformed == ""){
        frstNum = span1.textContent;
        displayScreen.textContent = frstNum;
    }
    else{
        scndNum = span1.textContent;
        displayScreen.textContent = scndNum;
    }
}

function handleEvent(button){
    let memNum = "";
    let equation = "";

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
            [memNum,equation] = performCalculation();
            calcHistory.push({equation,memNum});
            updateMemory();
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
            [memNum,equation] = performCalculation();
            calcHistory.push({equation,memNum});
            updateMemory();
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

console.log(memoryPalace.querySelectorAll("button"));

keypadBox.addEventListener("click",(event)=> {
    if(event.target.tagName === "BUTTON"){
        handleEvent(event.target);
    }
});

memoryPalace.addEventListener('click', (event) => {
    console.log("Clicked element:", event.target); // Debug log
    const button = event.target.closest("button");
    console.log("Closest button:", button); // Should show the button or null
    if (button) {
        recallmemory(button);
    }
});