
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error: Can't divide by 0";
  return a / b;
}


function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '×':
    case '*':
      return multiply(a, b);
    case '÷':
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}


const display = document.querySelector('.container-screen');
const buttons = document.querySelectorAll('button');

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;


function updateDisplay(content) {
  display.textContent = content;
}

function clearDisplay() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
  shouldResetScreen = false;
}


function appendNumber(num) {
  if (display.textContent === '0' || shouldResetScreen) {
    display.textContent = '';
    shouldResetScreen = false;
  }
  if (display.textContent.length < 15) {
    display.textContent += num;
  }
}

function setOperator(operator) {
  if (currentOperator !== null) {
    evaluate();
  }
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator && secondNumber === '' && display.textContent === '') return;
  secondNumber = display.textContent;
  const result = operate(currentOperator, firstNumber, secondNumber);
  updateDisplay(roundResult(result));
  currentOperator = null;
}


function roundResult(num) {
  if (typeof num === 'string') return num; 
  return Math.round(num * 1000) / 1000;
}

function deleteLast() {
  display.textContent = display.textContent.slice(0, -1) || '0';
}

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (!display.textContent.includes('.')) display.textContent += '.';
}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('number')) {
      appendNumber(button.textContent);
    } else if (button.classList.contains('operator')) {
      setOperator(button.textContent);
    } else if (button.classList.contains('equal')) {
      evaluate();
    } else if (button.classList.contains('clear')) {
      clearDisplay();
    } else if (button.classList.contains('decimal')) {
      appendDecimal();
    } else if (button.classList.contains('backspace')) {
      deleteLast();
    }
  });
});

window.addEventListener('keydown', handleKeyboard);

function handleKeyboard(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendDecimal();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearDisplay();
  if (['+', '-', '*', '/'].includes(e.key)) setOperator(e.key);
}
