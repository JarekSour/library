import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RutMaterialService {

    constructor() { }

    rut(value: string): string {
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
}
