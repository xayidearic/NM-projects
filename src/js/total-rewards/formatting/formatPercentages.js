import decimalToPercentage from "./decimalToPercentage";

const formatPercentages = (data) => {
  const formattedPercentage = {};
  const fieldsToFormat = ['Target_AI_Percent', 'LTI_Amt_Target_Pct'];

  Object.keys(data).forEach((key) => {
    if (fieldsToFormat.includes(key)) {
      formattedPercentage[key] = decimalToPercentage(data[key]);
    }
  });

  return {
    ...data,
    formattedPercentage,
  };
};

export default formatPercentages;
