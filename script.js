//-------Functions-----------
function add(...numbers) {
  let total = 0;
  for (num of numbers) {
    total += num;
  }
  return total;
}

function subtract(...numbers) {
  let total = 0;
  for (num of numbers) {
    total -= num;
  }
  return total;
}

function multiply(...numbers) {
  let total = 0;
  for (num of numbers) {
    total *= num;
  }
  return total;
}

function divide(...numbers) {
  let total = 0;
  for (num of numbers) {
    total /= num;
  }
  return total;
}
