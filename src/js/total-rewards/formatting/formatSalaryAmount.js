/**
 * Formats a number to a currency format.
 * @param {number} number
 * @param {boolean} hasCents
 */
export const getCurrencyFormat = (number, hasCents = true) => {
  const digits = hasCents ? 2 : 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(number);
};

/**
 * Constants for the bar chart labels.
 */
export const barChartLabels = {
  aip: 'Actual Annual Incentive Plan (AIP) Payment',
  ltip: 'Actual Long-Term Incentive Plan (LTIP) Payment',
  salary: 'Base Pay',
};

/**
 * Formats a number to a currency format.
 * @param {number|string} number - The number to be formatted. Can be a number or a string representation of a number.
 * @returns {string} - The formatted currency string, or the original input if it's a string containing a letter.
 */
export const formatSalaryAmounts = (number) => {
  if (typeof number === 'string' && isNaN(Number(number))) {
    return number;
  }

  // convert the number to a float
  const parsedNumber = parseFloat(number);
  // Check if the number has two decimal places that are '00', and remove them if true
  const isWholeDollarAmount = Number.isInteger(number) || parsedNumber.toFixed(2).endsWith('00');

  return getCurrencyFormat(number, !isWholeDollarAmount);
};
