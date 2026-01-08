function convertTemperature() {
    const inputVal = document.getElementById('degreeInput').value;
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const displayValue = document.getElementById('resultValue');
    const displayUnit = document.getElementById('resultUnit');
    const errorMsg = document.getElementById('errorMsg');
    const inputGroup = document.querySelector('.input-group');

    // Validation
    if (inputVal === '') {
        inputGroup.classList.add('error');
        errorMsg.style.display = 'block';
        displayValue.innerText = '--';
        displayUnit.innerText = '';
        return;
    } else {
        inputGroup.classList.remove('error');
        errorMsg.style.display = 'none';
    }

    let temp = parseFloat(inputVal);
    let convertedTemp;

    // Same Unit check
    if (inputUnit === outputUnit) {
        convertedTemp = temp;
    } else {
        // Convert to Kelvin first as a base, then to output
        // actually easier to just do direct if/else for 3 units
        
        // Setup base in Celsius for calculation (intermediate step)
        let tempInCelsius;

        if (inputUnit === 'celsius') {
            tempInCelsius = temp;
        } else if (inputUnit === 'fahrenheit') {
            tempInCelsius = (temp - 32) * (5/9);
        } else if (inputUnit === 'kelvin') {
            tempInCelsius = temp - 273.15;
        }

        // Convert Celsius to Output
        if (outputUnit === 'celsius') {
            convertedTemp = tempInCelsius;
        } else if (outputUnit === 'fahrenheit') {
            convertedTemp = (tempInCelsius * 9/5) + 32;
        } else if (outputUnit === 'kelvin') {
            convertedTemp = tempInCelsius + 273.15;
        }
    }

    // Formatting: 2 decimal places if necessary
    // Avoid .00 if it's an integer
    let finalString = Number.isInteger(convertedTemp) ? convertedTemp : convertedTemp.toFixed(2);

    displayValue.innerText = finalString;
    
    // Set Unit Text
    let unitText = '';
    if (outputUnit === 'celsius') unitText = 'Degrees Celsius (°C)';
    if (outputUnit === 'fahrenheit') unitText = 'Degrees Fahrenheit (°F)';
    if (outputUnit === 'kelvin') unitText = 'Kelvin (K)';
    
    displayUnit.innerText = unitText;
}

function validateInput() {
    const inputGroup = document.querySelector('.input-group');
    const errorMsg = document.getElementById('errorMsg');
    
    if (document.getElementById('degreeInput').value !== '') {
        inputGroup.classList.remove('error');
        errorMsg.style.display = 'none';
    }
}

function swapUnits() {
    const inputSelect = document.getElementById('inputUnit');
    const outputSelect = document.getElementById('outputUnit');
    
    const temp = inputSelect.value;
    inputSelect.value = outputSelect.value;
    outputSelect.value = temp;
    
    // Trigger conversion if value exists
    if (document.getElementById('degreeInput').value !== '') {
        convertTemperature();
    }
}
