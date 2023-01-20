export const formatNumberToCurrency = (value: number) => new Intl.NumberFormat('en', { currency: 'IRR' }).format(value)
