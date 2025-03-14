if (!Number.prototype.toINRCurrency) {
    Number.prototype.toINRCurrency = function (): string {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(this as number);
    };
}