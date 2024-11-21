const keypadBox = document.getElementById("keypadBox")
const resultText = document.getElementById("displayText")
const upperScreenText = document.getElementById("equationText")
const displayScreen = document.getElementById("calculatorDisplay")
let backgroundColor = window.getComputedStyle(displayScreen).backgroundColor;
let boxShade =  window.getComputedStyle(displayScreen).boxShadow;

let frstNum = "";
let traySize = "";
let running = 0;  //running total
let traytotal = 0
let equation = "";
const calcHistory = [];
let testSpaceLeft = 0
let testModeVar = false;
let testChangeAmount = 0;
let boxesNeeded = 0;
let halftrays = 0;
let toTruck = 30;
let truckflag = false;



function flashscreen(resultText,text){
    resultText.textContent = "";

    setTimeout(()=>{
        resultText.textContent = text;
    },100);
}

function createButtons(){
    const buttons = ["1","2","3","82","<",
                     "4","5","6","63","C",
                     "7","8","9","50","=",
                     "T","0","+","32"];

    const pussycatDolls = [];
        //creates buttons and assigns classes.
    buttons.forEach((label) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.setAttribute("id",label);
        if(parseInt(label)<=10){
            button.classList.add("number");
        }
        else if (parseInt(label)>10){
            button.classList.add("traySize");
        }
        else if (label == "="){
            button.classList.add("equals");
        }
        else if (label == "C"){
            button.classList.add("clear");
        }
        else if (label == "+"){
            button.classList.add("fake")
        }
        else if (label == "<"){
            button.classList.add("bksp");
        }
        else if (label == "T"){
            button.classList.add("test")
        }
        else {
            button.classList.add("functionKey");
            button.disabled = true;
        }
        button.classList.add("calculatorButton");
        keypadBox.appendChild(button);
        pussycatDolls.push(button);
        resultText.textContent = 0
    })
    return pussycatDolls
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


function mathyStuff(){
    const num = parseInt(frstNum);
    switch(traySize){
        case "63":
            result= num/2;
			halftrays = halftrays+result;
            break;
        case "82":
            result=num;
            break;
        case "50":
            result = Math.round((num * (8 / 6)) / 0.5) * 0.5;
            break;
        case "32":
            result=num*3;
            break;
    }
    calcHistory.push(result);

    if (testModeVar ===false){
        if (running == 0){
            equation = frstNum + "x" + traySize + "'s ("+ result +" slots):";
        }
        else{
            equation = "+ " + frstNum + "x" + traySize + "'s ("+ result +" slots):";
        }
        traytotal = traytotal + num;
        running = running + result;
        
    }
    else if (testModeVar === true){
        testSpaceLeft = testSpaceLeft-result;
        testChangeAmount = frstNum;
    }
    return result;
}


function flush(){
    frstNum = "";
    traySize = "";
}

function clearCalc(){
    frstNum = "";
    traySize = "";
    running = 0;
    equation = "";
    traytotal = 0;
    halftrays = 0;
    truckflag = false;
    testModeVar = false;
}

function resetNumbersForNextCalculations(memNum){
    frstNum = memNum;
    scndNum = "";
    funcPerformed ="";
}

function standardMode(button){
        //if first number is blank - assign to frstNum
        if (button.classList.contains("number")){
            frstNum += button.textContent;
            resultText.textContent = frstNum;
            }
        
        //once tray size is selected, multiply by tray size and add to running total
        else if(button.classList.contains("traySize")){
            if (frstNum != ""){
            traySize = button.textContent;
            mathyStuff();
            console.log(running);
            if (running-halftrays < 30){
                flashscreen(resultText,running);
                upperScreenText.textContent = equation;
            }
            else{
                resultText.textContent = "TRUCK: (" + traytotal + " trays.)"
                
                upperScreenText.textContent = equation;
            }
            flush();}
            else{
                flashscreen(resultText,0)
            }
        }
        
        //combines the running total and then calculates how many trays are needed.
        else if(button.classList.contains("equals")){
            spaceLeft = 8 - (running%8);
            boxesNeeded = Math.ceil(running / 8);
			
			if (traytotal-halftrays>=30){
                resultText.textContent = "TRUCK: ("+ traytotal +" trays.)"
            }
			
            else if(spaceLeft === 0 || spaceLeft === 8){
                resultText.textContent = "Full Boxes";
                upperScreenText.textContent = "You will use " + boxesNeeded + " box(es)";
				testSpaceLeft = spaceLeft;
            } 
            else if((traytotal-halftrays) + spaceLeft <30){
                testSpaceLeft = spaceLeft;
                upperScreenText.textContent = traytotal + " trays = " + boxesNeeded + " box(es)";
                resultText.textContent = "Trays Needed = " + spaceLeft;
            }

			else{
				toTruck = 30 - (traytotal-halftrays);
				upperScreenText.textContent = "To get to TRUCK shipping:";
				resultText.textContent = toTruck + " more trays";
				testSpaceLeft = toTruck;
				truckflag = true;
			}
			
        
        }
        
        else if (button.classList.contains("clear")){
            clearCalc();
            resultText.textContent = 0;
            upperScreenText.textContent = "";

        }
        
        else if (button.classList.contains("bksp")){
            frstNum = frstNum.slice(0,-1);
            resultText.textContent = frstNum;
            }

        else if (button.classList.contains("fake")){
            flashscreen(resultText,running);
        }

        else if (button.classList.contains("test")){
            if(testSpaceLeft >0 && testSpaceLeft <8){
				testModeVar = true;
                upperScreenText.textContent = "TEST MODE";
				backgroundColor = "hotpink";
				boxShade = "inset 5px 5px deeppink";
				displayScreen.style.backgroundColor = backgroundColor;
				displayScreen.style.boxShadow = boxShade
			}
        }
}

function testMode(button){
    if (button.classList.contains("number")){
        frstNum += button.textContent;
        resultText.textContent = frstNum;
        }

    else if(button.classList.contains("traySize")){
        traySize = button.textContent
        result = mathyStuff();
        if (testSpaceLeft <0){
            upperScreenText.textContent = "Box Overfilled by:"
            resultText.textContent = Math.abs(testSpaceLeft) + " trays"
            testSpaceLeft = testSpaceLeft + result;
        }
        else if(testSpaceLeft === 0){
            resultText.textContent = "Box Filled"
        }
        else{
            upperScreenText.textContent = "Adding" + testChangeAmount + "x " + traySize + "'s:"
            resultText.textContent = "Trays Needed = " + testSpaceLeft;
        }
        flush();
    }

    else if (button.classList.contains("clear")){
        clearCalc();
        testModeVar = false;
        resultText.textContent = 0
    }
    else if (button.classList.contains("bksp")){
        frstNum = frstNum.slice(0,-1);
        resultText.textContent = frstNum;
        }
        
    else if (button.classList.contains("test")){
		if (truckflag == false){
        upperScreenText.textContent = traytotal + " trays = " + boxesNeeded + " box(es)";
        resultText.textContent = "Trays Needed = " + spaceLeft;
		}
		else{
			upperScreenText.textContent = "To get to TRUCK shipping:";
			resultText.textContent = toTruck + " more trays";
			testSpaceLeft = toTruck;
		}
        testModeVar = false;
        backgroundColor = "lightgrey";
		boxShade = "inset 5px 5px darkgrey";
        displayScreen.style.backgroundColor = backgroundColor;
		displayScreen.style.boxShadow = boxShade;
    }
}




function handleEvent(button){
    if (testModeVar == false){
        standardMode(button);
    }

    else{
        testMode(button);
    }
}

const buttons = createButtons();

console.log(memoryPalace.querySelectorAll("button"));

keypadBox.addEventListener("click",(event)=> {
    if(event.target.tagName === "BUTTON"){
        handleEvent(event.target);
    }
});
