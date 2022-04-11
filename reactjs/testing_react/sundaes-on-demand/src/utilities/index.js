/**
 * @function formatCurrency
 * @param {number} amount
 * @returns {string} number formatted as currency
 * @example
 *   formatCurrency(12345.6789); // $12,345.68
 * @example
 *   formatCurrency(0); // $0.00
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};
