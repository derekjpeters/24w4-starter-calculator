let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = displayValue;
}

function appendNumber(number) {
  if (displayValue === '0') {
    displayValue = number.toString();
  } else {
    displayValue += number.toString();
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (currentOperator !== null) {
    calculate();
  }
  firstOperand = parseFloat(displayValue);
  currentOperator = operator;
  displayValue = '0';
}

function calculate() {
  secondOperand = parseFloat(displayValue);
  if (currentOperator === '+') {
    displayValue = (firstOperand + secondOperand).toString();
  } else if (currentOperator === '-') {
    displayValue = (firstOperand - secondOperand).toString();
  } else if (currentOperator === '*') {
    displayValue = (firstOperand * secondOperand).toString();
  } else if (currentOperator === '/') {
    if (secondOperand === 0) {
      displayValue = 'Error';
    } else {
      displayValue = (firstOperand / secondOperand).toString();
    }
  }
  updateDisplay();
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
}

function clearDisplay() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  updateDisplay();
}

// New: Append decimal function
function appendDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

// New: Backspace function
function backspace() {
  displayValue = displayValue.slice(0, -1) || '0';
  updateDisplay();
}

// New: Scientific functions
function squareRoot() {
  displayValue = Math.sqrt(parseFloat(displayValue)).toString();
  updateDisplay();
}

function square() {
  displayValue = Math.pow(parseFloat(displayValue), 2).toString();
  updateDisplay();
}

function power() {
  firstOperand = parseFloat(displayValue);
  currentOperator = '**';
  displayValue = '0';
}

function calculateSin() {
  displayValue = Math.sin(parseFloat(displayValue) * (Math.PI / 180)).toString();
  updateDisplay();
}

function calculateCos() {
  displayValue = Math.cos(parseFloat(displayValue) * (Math.PI / 180)).toString();
  updateDisplay();
}

function calculateTan() {
  displayValue = Math.tan(parseFloat(displayValue) * (Math.PI / 180)).toString();
  updateDisplay();
}

function calculateLog() {
  displayValue = Math.log10(parseFloat(displayValue)).toString();
  updateDisplay();
}

function calculateExp() {
  displayValue = Math.exp(parseFloat(displayValue)).toString();
  updateDisplay();
}

// Handle power function (xʸ)
function calculatePower() {
  if (currentOperator === '**') {
    secondOperand = parseFloat(displayValue);
    displayValue = Math.pow(firstOperand, secondOperand).toString();
    updateDisplay();
    currentOperator = null;
  }
}

// Event listener to handle "Enter" for power calculation
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && currentOperator === '**') {
    calculatePower();
  }
});

// Keyboard input handling for basic functions
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key)) appendNumber(key); // Number keys
  if (['+', '-', '*', '/'].includes(key)) appendOperator(key); // Operator keys
  if (key === 'Enter' && currentOperator !== '**') calculate(); // Enter for "="
  if (key === 'Backspace') backspace(); // Backspace key
  if (key === '.') appendDecimal(); // Decimal point key
});

updateDisplay();
