//----Variables for updating the display-----
let display1 = "0";
let display2 = "0";
let num1 = 0;
let num2 = 0;
let operator = "";
let total = "";

//----Buttons----
const functions = document.querySelectorAll(".function");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//----Event Listeners for buttons----
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    display1 === "0"
      ? (display1 = button.textContent)
      : (display1 = display1.toString() + button.textContent);
    updateDisplay();
  });
});

functions.forEach((button) => {
  switch (button.id) {
    case "clear":
      button.addEventListener("click", clear);
      break;
    case "delete":
      button.addEventListener("click", deleteBack);
      break;
    case "equal":
      button.addEventListener("click", operate);
      break;
  }
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    const operatorSymbols = {
      divide: "/",
      multiply: "x",
      add: "+",
      subtract: "-",
    };
    const selectedOperator = operatorSymbols[button.id];
    const lastChar = display1.slice(-1);

    if (display1 === "0") return;

    if (["+", "-", "x", "/"].includes(lastChar)) {
      display1 = display1.slice(0, -1) + button.textContent;
    } else {
      display1 = display1 + button.textContent;
    }

    num1 = Number(display1.slice(0, -1));
    operator = selectedOperator;
    updateDisplay();
  });
});

//-------Functions-----------
function clear() {
  display1 = "";
  display2 = "";
  num1 = 0;
  num2 = 0;
  operator;
  total = "";
  updateDisplay();
}

function deleteBack() {
  display1 = display1.toString().slice(0, -1);
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
    case "x":
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

//implement the percent function
