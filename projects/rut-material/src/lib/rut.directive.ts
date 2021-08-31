import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { RutMaterialService } from './rut-material.service';

@Directive({
    selector: '[matInput][rutDirective]',
})
export class RutDirective {

    private inputElem: HTMLInputElement;
    @Input() canPaste: boolean = true;

    constructor(
        private el: ElementRef,
        public ctrl: NgControl,
        public rutService: RutMaterialService
    ) {
        this.inputElem = this.el.nativeElement;
    }

    @HostListener('paste', ['$event']) onPaste(e: any) {
        if (!this.canPaste) {
            e.preventDefault();
        }
    }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event: any) {
        this.onInputChange(event);
    }

    @HostListener('keydown.k', ['$event'])
    keydownBackspace(event: any) {
        this.onInputChange(event.target.value);
    }

    @HostListener('blur', ['$event'])
    focused(event: any) {
        this.onInputChange(event.target.value);
    }

    onInputChange(event: any) {
        let newVal = this.rutService.rut(event);
        this.inputElem.value = newVal;
    }
}
