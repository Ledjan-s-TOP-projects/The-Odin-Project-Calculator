//----Variables for updating the display-----
let display1 = "0";
let display2 = "0";
let num1 = 0;
let num2 = 0;
let operator = "";
let total = "";

const operatorSymbols = ["+", "-", "*", "/"];
const displayArray = Array(display1);

//----Buttons' queries----
const actions = document.querySelectorAll(".action");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//----Event Listeners for buttons----
actions.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "clear":
        clear();
        break;
      case "delete":
        deleteBack();
        break;
      case "equal":
        if (display1 === "0" || display1 === "") return;
        if (operator === "") return;
        equal();
        break;
    }
  });
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    //replacing the initial 0 on display1
    display1 === "0"
      ? (display1 = button.textContent)
      : (display1 = display1.toString() + button.textContent);
    updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    //first calculation
    if (total === "") {
      if (num1 && operator && !display1.endsWith(operator)) {
        equal();
        display1 = total;
        display2 = "0";
        num1 = Number(total);
        operator = button.value;
        //Appends the operator to display1
        const lastChar = display1.toString().slice(-1);
        operatorSymbols.includes(lastChar)
          ? (display1 = display1.slice(0, -1) + operator)
          : (display1 = display1 + operator);
      } else {
        num1 = Number(display1);
        operator = button.value;
        //Appends the operator to display1
        const lastChar = display1.slice(-1);
        operatorSymbols.includes(lastChar)
          ? (display1 = display1.slice(0, -1) + operator)
          : (display1 = display1 + operator);
      }
    } else if (total !== "") {
      //second calculation if you have a total already
      display1 = total;
      display2 = "0";
      num1 = Number(total);
      operator = button.value;
      //Appends the operator to display1
      const lastChar = display1.toString().slice(-1);
      operatorSymbols.includes(lastChar)
        ? (display1 = display1.slice(0, -1) + operator)
        : (display1 = display1 + operator);
    }

    updateDisplay();
  });
});

//-------Functions-----------
function clear() {
  display1 = "0";
  display2 = "0";
  num1 = 0;
  num2 = 0;
  operator;
  total = "";
  updateDisplay();
}

function deleteBack() {
  if (display1.toString() === "0") return;
  //implement the fix to replace the last number remaining on display1, with 0
  if (display1.length === 1) {
    display1 = "0";
  } else {
    display1 = display1.toString().slice(0, -1);
  }
  updateDisplay();
}

function updateDisplay() {
  const display1Element = document.getElementById("display-1");
  const display2Element = document.getElementById("display-2");

  display1Element.textContent = display1;
  display2Element.textContent = display2;
}

updateDisplay(); // Update the display initially

function operate(operator, ...numbers) {
  switch (operator) {
    case "+":
      return add(...numbers);
    case "-":
      return subtract(...numbers);
    case "*":
      return multiply(...numbers);
    case "/":
      return divide(...numbers);
    default:
      return "Invalid operator";
  }
}

function add(...numbers) {
  let total = 0;
  for (num of numbers) {
    total += num;
  }
  return total;
}

function subtract(...numbers) {
  let total = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    total -= numbers[i];
  }
  return total;
}

function multiply(...numbers) {
  let total = 1;
  for (num of numbers) {
    total *= num;
  }
  return total;
}

function divide(...numbers) {
  let total = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    total /= numbers[i];
  }
  return total;
}

function equal() {
  for (let i = 0; i < operatorSymbols.length; i++) {
    const indexOfsymbol = display1.indexOf(operatorSymbols[i]);
    if (indexOfsymbol !== -1) {
      num2 = Number(display1.slice(indexOfsymbol + 1));
      total = operate(operator, num1, num2);
      display2 = total.toString();
      //fix how you handle total on display2 for the other processes
      updateDisplay();
      return;
    }
  }
}

//implement the percent function
