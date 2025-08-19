//----Variables for updating the display-----
let display1 = "0";
let display2 = "0";
let num1 = 0;
let num2 = 0;
let operator = "";
let total = "";

//---------Utility variables-------------
let error = false;
const maxDisplay = 15;

// Used for checking/replacing operators in display strings
const operatorSymbols = ["+", "-", "*", "/"];

//----Buttons' queries----
const actions = document.querySelectorAll(".action");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");

//================== Event Listeners ==================
//--------Event Listener for Actions----------------------------
actions.forEach((button) => {
  button.addEventListener("click", () => handleActionsInput(button));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Delete") {
    handleActionsInput("clear");
  } else if (e.key === "Backspace") {
    handleActionsInput("delete");
  } else if (e.key === "Enter") {
    handleActionsInput("equal");
  }
});

//------Event Listeners for Numbers---------------------------
numbers.forEach((button) => {
  button.addEventListener("click", () => handleNumberInput(button));
});
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    handleNumberInput(e.key);
  }
});

//------Event Listeners for Decimal---------------------------
decimal.addEventListener("click", (e) => handleDecimalInput(e.target.value));
document.addEventListener("keydown", (e) => {
  if (e.key === ".") {
    handleDecimalInput(e.key);
  }
});

//------Event Listeners for Operators----------------------
operators.forEach((button) => {
  button.addEventListener("click", () => operatorInputHandler(button));
});
document.addEventListener("keydown", (e) => {
  if (operatorSymbols.includes(e.key)) {
    operatorInputHandler(e.key);
  }
});

//-----Handeling functions--------------------------
const handleActionsInput = (input) => {
  const action = typeof input === "string" ? input : input.id;
  if (error) {
    clear();
    error = false;
  }
  switch (action) {
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
};

const handleNumberInput = (input) => {
  //Check the typeof input and assign it to value
  const value = typeof input === "string" ? input : input.value;
  if (error) {
    clear();
    error = false;
  }
  if (display1.length < maxDisplay) {
    //replacing the initial 0 on display1
    display1 === "0"
      ? (display1 = value)
      : (display1 = display1.toString() + value);
    updateDisplay();
  }
};

// operator input handler
const operatorInputHandler = (input) => {
  const value = typeof input === "string" ? input : input.value;

  if (error) {
    clear();
    error = false;
  }
  if (total === "") {
    //Chain of calculations
    if (num1 && operator && !display1.endsWith(operator)) {
      equal();

      display1 = total.toString();
      num1 = total;
      num2 = 0;
      operator = value;
      total = "";
      //Appends the operator to display1
      appendOperator();
    } else {
      //First calculation
      num1 = Number(display1);
      operator = value;
      //Appends the operator to display1
      appendOperator();
    }
  } else if (total !== "") {
    //next calculation after pressing =
    display1 = total.toString();
    display2 = "0";
    num1 = Number(total);
    operator = value;
    //Appends the operator to display1
    appendOperator();
  }
  updateDisplay();
};

const handleDecimalInput = (value) => {
  if (error) {
    clear();
    error = false;
  }

  // Find last operator to isolate current number
  const lastOperatorIndex = Math.max(
    display1.lastIndexOf("+"),
    display1.lastIndexOf("-"),
    display1.lastIndexOf("*"),
    display1.lastIndexOf("/")
  );

  const currentNumber = display1.slice(lastOperatorIndex + 1);

  // If the current number does not contain a decimal point, append the decimal
  // to the current number and update display1
  if (!currentNumber.includes(".")) {
    display1 += value;
    updateDisplay();
  }
};

//-------Functions-----------
function clear() {
  display1 = "0";
  display2 = "0";
  num1 = 0;
  num2 = 0;
  operator = "";
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
  for (let num of numbers) {
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
  for (let num of numbers) {
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
  // Loop through possible operators and extract num2
  for (let i = 0; i < operatorSymbols.length; i++) {
    //find the index of the operator
    const indexOfsymbol = display1.indexOf(operatorSymbols[i]);
    if (indexOfsymbol !== -1) {
      num2 = Number(display1.slice(indexOfsymbol + 1));
      if (num2 === 0 && operatorSymbols[i] === "/") {
        display2 = "Can't / by 0!";
        error = true;
        return;
      } else {
        total = Math.round(operate(operator, num1, num2) * 100000) / 100000;
      }
      display2 = total.toString();
      updateDisplay();
      return;
    }
  }
}

// Utility: returns the last character of display1
const lastChar = () => display1.slice(-1);

//Utility: appends the operator to display1
const appendOperator = () => {
  operatorSymbols.includes(lastChar())
    ? (display1 = display1.slice(0, -1) + operator)
    : (display1 = display1 + operator);
};
