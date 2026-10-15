const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');
const buttons = document.querySelectorAll('.btn');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// Button Click Event Listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.number) {
            appendNumber(button.dataset.number);
            updateDisplay();
        }
        if (button.dataset.operator) {
            chooseOperation(button.dataset.operator);
            updateDisplay();
        }
        if (button.dataset.action === 'clear') {
            clear();
            updateDisplay();
        }
        if (button.dataset.action === 'delete') {
            deleteNumber();
            updateDisplay();
        }
        if (button.dataset.action === 'calculate') {
            compute();
            updateDisplay();
        }
    });
});

// Bonus: Keyboard Support
window.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
        updateDisplay();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperation(e.key);
        updateDisplay();
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        compute();
        updateDisplay();
    }
    if (e.key === 'Backspace') {
        deleteNumber();
        updateDisplay();
    }
    if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        clear();
        updateDisplay();
    }
});

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clear();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = (prev * current) / 100;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}

function deleteNumber() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.toString().slice(0, -1);
    }
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

function updateDisplay() {
    currentOperandElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandElement.innerText = `${getDisplayNumber(previousOperand)} ${operation === '*' ? '×' : operation === '/' ? '÷' : operation}`;
    } else {
        previousOperandElement.innerText = '';
    }
}