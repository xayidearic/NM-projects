import { getCurrencyFormat } from './formatSalaryAmount.js';

const fieldsToFormatInt = [
  'soc_sec_ben_62',
  'soc_sec_ben_65',
  'fap_sngl_life_c10_60',
  'fap_sngl_life_c10_62',
  'fap_sngl_life_c10_65',
  'fap_jnt_full_c10_60',
  'fap_jnt_full_c10_62',
  'fap_jnt_full_c10_65',
  'balances401k60',
  'balances401k62',
  'balances401k65',
  'cashBalances60',
  'cashBalances62',
  'cashBalances65',
];

const totalAmountsToFormat = [
  'CompensationTotal',
  'FinancialSecurityTotal',
  'HealthcareTotal',
  'Total',
]

const fieldsToFormat = [
  ...fieldsToFormatInt,
  ...totalAmountsToFormat,
  'Salary',
  'Salary_1_Year_Ago',
  'Salary_2_Year_Ago',
  'Salary_3_Year_Ago',
  'Latest_AI_Amt',
  'AI_Amt_1_Year_Ago',
  'AI_Amt_2_Year_Ago',
  'AI_Amt_3_Year_Ago',
  'Target_AI_Amt',
  'LTI_Amt_Target_Amt',
  'Future_LTI_Grant_Amt',
  'Future_LTI_Amt_1_Year',
  'Future_LTI_Amt_2_Years',
  'Future_LTI_Amt_3_Years',
  'Past_LTI_Amt_1_Year',
  'Past_LTI_Amt_2_Year',
  'Past_LTI_Amt_3_Year',
  'Past_LTI_Grant_Amt',
  'fap_accrued_ben',
  'bal_tot',
  'ytdEmployeeContributions',
  'ytdEmpContribMinusCatchup',
  'ytdEmployerContributions',
  'pay_credit_ytd',
  'loanBalanceRemaining',
];

/**
 * Formats a number to a currency format.
 * @param {string} key
 * @param {number} value
 */
const formatAmount = (key, value) => {
  if (fieldsToFormatInt.includes(key)) {
    return getCurrencyFormat(value, false);
  }

  if (totalAmountsToFormat.includes(key)) {
    return getCurrencyFormat(value, false);
  }

  return getCurrencyFormat(value, true);
};

/**
 * Formats numerical data and adds it to the store
 * @param {Record<string, unknown>} data - The data object to be formatted
 * @returns {Record<string, unknown>} - The combined data object with formatted amounts
 */
export const formatDataAmounts = (data) => {
  const formattedAmount = {};

  // Format Investments balance data which is nested
  if (data && typeof data === 'object' && 'balance' in data) {
    for (const [balanceKey, balanceValue] of Object.entries(data['balance']).filter(([, value]) => typeof value === 'number')) {
      formattedAmount[balanceKey] = getCurrencyFormat(balanceValue, true);
    }
  }

  // format the rest of the data
  for (const [key, value] of Object.entries(data).filter(([key]) => fieldsToFormat.includes(key))) {
    formattedAmount[key] = formatAmount(key, value);
  }

  return {
    ...data,
    formattedAmount,
  };
};
