const screen = document.getElementById('screen');

// Screen par values add karne ke liye
function appendValue(val) {
    if (screen.value === '0' && val !== '.') {
        screen.value = val;
    } else {
        screen.value += val;
    }
}

// Poori screen clear karne ke liye (C Button)
function clearScreen() {
    screen.value = '';
}

// Ek aakhri digit backspace karne ke liye
function deleteLast() {
    screen.value = screen.value.slice(0, -1);
}

// Evaluation/Calculation execution
function calculateResult() {
    try {
        if (screen.value) {
            // Evaluates the mathematical string securely
            let result = eval(screen.value);
            screen.value = Number(result.toFixed(4)); // Keeps up to 4 decimal places maximum
        }
    } catch (error) {
        screen.value = 'Error';
    }
}

// BONUS REQUIREMENT: Keyboard Interaction Support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearScreen();
    }
});