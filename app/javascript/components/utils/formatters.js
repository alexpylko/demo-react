import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from "../config";

// The currency formatter

export const currencyFormatter = (value, currency = DEFAULT_CURRENCY) => {
    return new Intl.NumberFormat(DEFAULT_LOCALE,
        { style: "currency", currency }
    ).format(value);
};
