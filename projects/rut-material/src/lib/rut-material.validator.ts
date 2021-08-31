import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[rutValidatorDirective]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: rutValidatorDirective,
        multi: true
    }]
})
export class rutValidatorDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        return rutValidator.valid(control);
    }
}

export class rutValidator {
    static valid(control: AbstractControl): any | null {
        let val = rut(control.value);
        if (val.length > 0) {
            if (!verifyRut(val))
                return { invalid: true };
        }
        return null;
    }
}

function verifyRut(rut: string) {
    var digitVerification1 = rut.toUpperCase().split('-')[1];
    var digitVerification2 = calculateDigit(rut);
    return digitVerification1 == digitVerification2;
}
function calculateDigit(rut: string) {
    var factor = 2, add = 0;
    var int = rut.split('-')[0].replace(/\./g, "");
    for (var i = 0; i < int.length; i++) {
        var divider = int.split('').reverse();
        add += parseInt(divider[i]) * factor;
        factor = factor == 7 ? 2 : factor + 1;
    }
    var wholeSum = Math.floor(add / 11);
    var rest = add - (11 * wholeSum);
    var finalDigit = 11 - rest;
    if (finalDigit == 11)
        return 0;
    else if (finalDigit == 10)
        return 'K';
    else
        return finalDigit;
}

function rut(value: string) {
    let newVal = value;
    if (newVal !== null) {
        if (newVal.length <= 8) {
            newVal = newVal.replace(/\D/g, '');
        }
        else {
            newVal = newVal.replace(/[^a-zA-Z0-9]/g, '');
            if (newVal.toUpperCase().indexOf('K') >= 0) {
                newVal = newVal.substring(0, newVal.toUpperCase().indexOf('K') + 1);
            }
        }
        if (newVal.length === 0) {
            newVal = '';
        }
        else if (newVal.length <= 3) {
            newVal = newVal.replace(/^(\d{0,3})/, '$1');
        }
        else if (newVal.length === 4) {
            newVal = newVal.replace(/^(\d{0,1})(\d{0,3})/, '$1.$2');
        }
        else if (newVal.length === 5) {
            newVal = newVal.replace(/^(\d{0,2})(\d{0,3})/, '$1.$2');
        }
        else if (newVal.length === 6) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1.$2');
        }
        else if (newVal.length === 7) {
            newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
        }
        else if (newVal.length === 8) {
            newVal = newVal
                .replace(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,1})/, '$1.$2.$3-$4')
                .toUpperCase();
        }
        else if (newVal.length === 9) {
            newVal = newVal
                .replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,1})/, '$1.$2.$3-$4')
                .toUpperCase();
        }
        else {
            newVal = newVal.substring(0, 10);
            newVal = newVal
                .replace(/^(\d{0,3})(\d{0,3})(\d{0,3})([a-zA-Z0-9]{1})/, '$1.$2.$3-$4')
                .toUpperCase();
        }
    }
    return newVal;
}
