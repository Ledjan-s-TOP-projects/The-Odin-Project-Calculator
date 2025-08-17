//----Variables for updating the display-----
let display1 = 0;
let num1 = 0;
let num2 = 0;
let operator;
let display2 = 0;

//----Buttons----
const functions = document.querySelectorAll(".function");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//----Event Listeners for buttons----
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    display1 = display1.toString() + button.textContent;
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
  switch (button.id) {
    case "divide":
      button.addEventListener("click", () => {
        operator = "/";
        display1 = display1 + button.textContent;
        updateDisplay();
      });
      break;

    case "multiply":
      button.addEventListener("click", () => {
        operator = "*";
        display1 = display1 + button.textContent;
        updateDisplay();
      });
      break;

    case "add":
      button.addEventListener("click", () => {
        operator = "+";
        display1 = display1 + button.textContent;
        updateDisplay();
      });
      break;

    case "subtract":
      button.addEventListener("click", () => {
        operator = "-";
        display1 = display1 + button.textContent;
        updateDisplay();
      });
      break;

    //------Implement the percentage case
  }
});

//-------Functions-----------
function clear() {
  display1 = 0;
  display2 = 0;
  operator = "";
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

//implement the percent function
