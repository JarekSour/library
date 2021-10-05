import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumberMaterialService {

    integerUnsigned: string = '^[0-9]*$';
    integerSigned: string = '^-?[0-9]+$';
    decimalUnsigned: string = '^[0-9]+(.[0-9]+)?$';
    decimalSigned: string = '^-?[0-9]+(.[0-9]+)?$';
    decimalSeparator: string = '.';
    readonly minusSign: string = '-';

    constructor() { }

    number(value: any, isDecimal: boolean = false, allowSign: boolean = false) {
        if (value != null) {
            let regex: string = this.integerUnsigned;
            if (!isDecimal && !allowSign) regex = this.integerUnsigned;
            if (!isDecimal && allowSign) regex = this.integerSigned;
            if (isDecimal && !allowSign) regex = this.decimalUnsigned;
            if (isDecimal && allowSign) regex = this.decimalSigned;

            let firstCharacter = value.charAt(0);
            if (firstCharacter == this.decimalSeparator)
                value = 0 + value;

            let lastCharacter = value.charAt(value.length - 1);
            if (lastCharacter == this.decimalSeparator)
                value = value + 0;

            let signedValue = false;
            if (firstCharacter == this.minusSign) {
                signedValue = true;
                value = value.substring(1);
                firstCharacter = value.charAt(0);
            }
            let secondChar = value.charAt(1);
            while (firstCharacter == '0' && (secondChar != '' && secondChar != this.decimalSeparator)) {
                value = value.substring(1);
                firstCharacter = value.charAt(0);
                secondChar = value.charAt(1);
            }
            if (signedValue == true) {
                value = this.minusSign + value;
            }

            let valueParts = value.split(this.decimalSeparator);
            let naturalPart = valueParts?.[0];
            let decimalPart = valueParts?.[1];

            if (decimalPart != null && /^0+$/.test(decimalPart)) {
                decimalPart = '0';
                value = naturalPart + '.' + decimalPart;
            }

            if (value == '-0') {
                value = '0';
            }
            if (value == '-0.0') {
                value = '0.0';
            }

            let valid: boolean = (new RegExp(regex)).test(value);

            return valid ? value : '';
        } else {
            return value
        }
    }
}
