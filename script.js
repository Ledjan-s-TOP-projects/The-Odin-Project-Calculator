//----Variables for updating the display-----
let num1;
let operator;
let num2;

//-------Functions-----------
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
