$(document).ready(function() {
    function convertFractionalBase(number, baseFrom, baseTo) {
        const [intPart, fracPart] = number.split('.');

        let intResult = parseInt(intPart, baseFrom).toString(baseTo).toUpperCase(); // Ensure integer part is uppercase

        if (!fracPart) {
            return intResult; // If no fractional part, just return the integer result
        }

        let fractionResult = 0.0;
        for (let i = 0; i < fracPart.length; i++) {
            fractionResult += parseInt(fracPart[i], baseFrom) / Math.pow(baseFrom, i + 1);
        }

        let fracResultString = '';
        let maxIterations = 10; // Limit decimal places for fractions
        while (fractionResult > 0 && maxIterations > 0) {
            fractionResult *= baseTo;
            let digit = Math.floor(fractionResult);
            fractionResult -= digit;
            fracResultString += digit.toString(baseTo).toUpperCase(); // Ensure fractional part is uppercase
            maxIterations--;
        }

        return `${intResult}.${fracResultString}`; // Combine integer and fractional parts
    }

    $('#convertBtn').click(function() {
        let number = $('#number').val();
        let base = parseInt($('#base').val());

        if (number === '') {
            alert('Please enter a number!');
            return;
        }

        try {
            // Get decimal value first
            let [intPart, fracPart] = number.split('.');

            let decimalValue = parseInt(intPart, base);
            if (fracPart) {
                let fractionalValue = 0;
                for (let i = 0; i < fracPart.length; i++) {
                    fractionalValue += parseInt(fracPart[i], base) / Math.pow(base, i + 1);
                }
                decimalValue += fractionalValue;
            }

            $('#binaryOutput').text(convertFractionalBase(number, base, 2));
            $('#decimalOutput').text(decimalValue.toFixed(6)); // Show 6 decimal places
            $('#octalOutput').text(convertFractionalBase(number, base, 8));
            $('#hexOutput').text(convertFractionalBase(number, base, 16)); // Ensure capitalized hexadecimal
        } catch (e) {
            alert('Invalid number for the selected base!');
        }
    });
});
