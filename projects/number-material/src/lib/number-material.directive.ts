import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NumberMaterialService } from './number-material.service';

@Directive({
    selector: '[matInput][numberDirective]'
})
export class NumberDirective {

    @Input() allowDecimals: boolean = false;
    @Input() allowSign: boolean = false;
    @Input() decimalSeparator: string = '.';
    @Input() canPaste: boolean = true;

    readonly minusSign: string = '-';

    previousValue: string = '';

    integerUnsigned: string = '^[0-9]*$';
    integerSigned: string = '^-?[0-9]+$';
    decimalUnsigned: string = '^[0-9]+(.[0-9]+)?$';
    decimalSigned: string = '^-?[0-9]+(.[0-9]+)?$';

    constructor(private hostElement: ElementRef, public ctrl: NgControl, public numberService: NumberMaterialService) { }

    @HostListener('change', ['$event']) onChange(e: any) {
        this.validateValue(this.hostElement.nativeElement.value);
    }

    @HostListener('blur', ['$event'])
    focused(event: any) {
        this.validateValue(this.hostElement.nativeElement.value);
    }

    @HostListener('paste', ['$event']) onPaste(e: any) {
        if (!this.canPaste) {
            e.preventDefault();
        } else {
            let value = e.clipboardData.getData('text/plain');
            this.validateValue(value);
            e.preventDefault();
        }
    }

    @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {

        let cursorPosition: number = (e.target as HTMLInputElement)['selectionStart'] ?? 0;
        let originalValue: string = (e.target as HTMLInputElement)['value'];
        let key: string = this.getName(e);
        let controlOrCommand = (e.ctrlKey === true || e.metaKey === true);
        let signExists = originalValue.includes('-');
        let separatorExists = originalValue.includes(this.decimalSeparator);

        let allowedKeys = [
            'Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'
        ];

        let separatorIsCloseToSign = (signExists && cursorPosition <= 1);
        if (this.allowDecimals && !separatorIsCloseToSign && !separatorExists) {

            if (this.decimalSeparator == '.')
                allowedKeys.push('.');
            else
                allowedKeys.push(',');
        }

        let firstCharacterIsSeparator = (originalValue.charAt(0) != this.decimalSeparator);
        if (this.allowSign && !signExists &&
            firstCharacterIsSeparator && cursorPosition == 0) {

            allowedKeys.push('-');
        }

        if (allowedKeys.indexOf(key) != -1 ||
            (key == 'a' && controlOrCommand) ||
            (key == 'c' && controlOrCommand) ||
            (key == 'v' && controlOrCommand) ||
            (key == 'x' && controlOrCommand)) {
            return;
        }

        this.previousValue = originalValue;

        let isNumber = (new RegExp(this.integerUnsigned)).test(key);
        if (isNumber) return; else e.preventDefault();
    }

    validateValue(value: string): void {
        this.hostElement.nativeElement['value'] = this.numberService.number(value, this.allowDecimals, this.allowSign)
    }

    getName(e: any): string {

        if (e.key) {
            return e.key;
        } else {

            if (e.keyCode && String.fromCharCode) {
                switch (e.keyCode) {
                    case 8: return 'Backspace';
                    case 9: return 'Tab';
                    case 27: return 'Escape';
                    case 37: return 'ArrowLeft';
                    case 39: return 'ArrowRight';
                    case 188: return ',';
                    case 190: return '.';
                    case 109: return '-';
                    case 173: return '-';
                    case 189: return '-';
                    default: return String.fromCharCode(e.keyCode);
                }
            }
            return String.fromCharCode(e.keyCode);
        }
    }
}
