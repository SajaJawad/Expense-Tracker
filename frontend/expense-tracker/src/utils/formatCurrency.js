export const formatCurrency = (amount, currencyCode = "USD") => {
    const num = Number(amount) || 0;
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
            maximumFractionDigits: 2
        }).format(num);
    } catch {
        return `$${num.toLocaleString()}`;
    }
};

export const formatNumber = (amount) => {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2
    }).format(num);
};
