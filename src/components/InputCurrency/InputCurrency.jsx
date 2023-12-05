import React from "react";
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptions = {
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    allowNegative: false,
}

const defaultMaskOptionsWithNegative = {
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    allowNegative: true,
}


export const CurrencyInput = ({ ...inputProps }) => {
    const currencyMask = createNumberMask(defaultMaskOptions)
    return <MaskedInput mask={currencyMask} {...inputProps} />
}


export const CurrencyInputAllowNegative = ({ ...inputProps }) => {
    const currencyMask = createNumberMask( defaultMaskOptionsWithNegative)
    return <MaskedInput mask={currencyMask} {...inputProps} />
}



