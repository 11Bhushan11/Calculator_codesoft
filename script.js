const resultElement = document.getElementById('result');
const clearbutton = document.getElementById('clear-button');
const deletebutton = document.getElementById('delete-button');
const dividebutton = document.getElementById('divide-button');
const multiplybutton = document.getElementById('multiply-button');
const subtractbutton = document.getElementById('subtract-button');
const addbutton = document.getElementById('add-button');
const decimalbutton = document.getElementById('decimal-button');
const equalbutton = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number'); 

// Initialize the variables 
let result ='';
// all operator come inside this 
let operation ='';
let previousOperand = 0;

//Example 24+5 
// operation = +
// previousOperand = 24
// result = 29 



// function to append number 
const appendNumber= (number) =>{
    //   number ko result me append kar rahe 
    // if number me decimal include hai result me bhi to igore it 
    if(number ==='.' && result.includes('.')){
        return ;
    }
    result += number;
    // resultElement.innerText= result;
    updateDisplay();
}



// function to update display 
const updateDisplay =() => {
    // if operation value null nahi hai 
    if (operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
    resultElement.innerText = result;
    }

}

// function to select operator 
const selectOperator = (operatorValue) => {
    if (result === '') return ;

    if (operation !== '' && previousOperand !== ''){
        calculateResult();
    }

    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

// function to calculateResult 
const calculateResult= () => {
    // operator , parameter 
    // humare sare variable global variable hai to yaha kuch bhi paas nhi karwe ge 

    // to store result
    let evalutedResult ;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result) ;

    // NaN not a number 
    if (isNaN(prev) || isNaN(current)) return ;

    switch (operation) {
        case '+':
            evalutedResult = prev + current;
            break;
        case '-':
            evalutedResult = prev - current;
            break;
        case '*':
            evalutedResult = prev * current; 
            break;
        case '/':
            evalutedResult = prev / current; 
            break;
    
        default:
            return;
    }
    result = evalutedResult.toString();
    operation='';
    previousOperand= '';

}
// ____________________________________________start____________________________________
// now display letter on click 
// add event lister to number button 
numberBtns.forEach(button => {
    button.addEventListener('click',()=> {
        // last me add kar dega 
        appendNumber(button.innerText)
    });
});

decimalbutton.addEventListener('click',()=> appendNumber('.'));

addbutton.addEventListener('click',()=> selectOperator('+'));
subtractbutton.addEventListener('click',()=> selectOperator('-'));
multiplybutton.addEventListener('click',()=> selectOperator('*'));
dividebutton.addEventListener('click',()=> selectOperator('/'));

equalbutton.addEventListener('click',() => {
    if (result === '') return ;
    calculateResult();
    updateDisplay();
});

//function to clear display 
const clearDisplay=() => {
    result= '';
    previousOperand = '';
    operation='';
    updateDisplay();
}
clearbutton.addEventListener('click', clearDisplay);

// function to delete last character 
const deletLastDigit = () => {
    if (operation !== "" && result === '' ) {
        operation ="";
        result = previousOperand;
        previousOperand="";
        updateDisplay();
    }else{
    // slice fuction is string function which will give cutting string 
    result= result.slice(0,-1);
    updateDisplay();
    }
};

deletebutton.addEventListener('click',deletLastDigit);