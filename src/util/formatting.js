/**componente para converter o número em moeda com o $ na frente, podendo
 * ser de diferentes formas
 */
export const currencyFormatter = new Intl.NumberFormat ("en-US",
{
    style: 'currency',
    currency: 'USD',
});