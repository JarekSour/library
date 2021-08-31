import { Directive, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[matInput][emailDirective]'
})
export class EmailDirective {

    @Input() canPaste: boolean = true;

    constructor() { }

    @HostListener('paste', ['$event']) onPaste(e: any) {
        if (!this.canPaste) {
            e.preventDefault();
        }
    }

}
