const currencyFormatter = new Intl.NumberFormat( undefined , {
    currency : "USD",
    style : "currency"
});

export default function formatCurrency( amount : number ){
    return currencyFormatter.format(amount);
}