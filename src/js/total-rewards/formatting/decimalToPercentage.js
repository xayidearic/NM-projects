/**
 * Convert a decimal to a percentage
 * @param {number} decimal - the decimal to convert
 * @param {number} [decimalPlaces=2] - the number of decimal places to round to
 * @returns {string} - the percentage
 * parseFloat is used to remove trailing zeros from the percentage if it is a whole number
 */
const decimalToPercentage = (decimal, decimalPlaces = 2) => {
    const percentage = (decimal * 100).toFixed(decimalPlaces); 
    return parseFloat(percentage) + '%';
}

export default decimalToPercentage;