import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { emailValidator } from '../email-material.validator';

@Component({
    selector: 'email-material',
    templateUrl: './email-material.component.html',
    styleUrls: ['./email-material.component.css']
})
export class EmailMaterialComponent implements OnInit {

    @Input() formParent: FormGroup;

    @Input() label: string = 'Ingrese su correo electrónico';
    @Input() name: string = 'email';
    @Input() value: string = '';
    @Input() placeholder?: string | undefined = 'email@domain.com';
    @Input() disabled?: boolean | undefined = false;
    @Input() readonly?: boolean = false;
    @Input() required?: boolean = false;
    @Input() appearance?: MatFormFieldAppearance = 'outline';
    @Input() floatLabel?: FloatLabelType = 'auto';
    @Input() hint?: string | boolean = false;
    @Input() classField?: string = '';
    @Input() classHint?: string = '';
    @Input() paste?: boolean = true;
    @Input() autocomplete?: 'on' | 'off' = 'on';
    @Input() errorRequired?: string = 'El correo electrónico es requerido';
    @Input() errorInvalid?: string = 'El correo electrónico es inválido';
    @Input() errorCustom?: string | boolean = false;

    constructor(private fb: FormBuilder) {
        this.formParent = this.fb.group({});
    }

    ngOnInit(): void {
        let control = this.formParent.controls[this.name];
        this.formParent.addControl(this.name, control);

        this.formParent.controls[this.name].setValue(this.value);

        if(this.value.length > 0){
            this.formParent.controls[this.name].markAsTouched();
        }

        this.initValidators();
    }

    ngDoCheck() {
        if (this.errorCustom) {
            this.errorCustom = this.errorCustom;
            this.formParent.controls[this.name].setErrors({ errorCustom: true });
            this.formParent.controls[this.name].markAsTouched();
        }
    }

    initValidators() {
        if (this.required) {
            this.formParent.controls[this.name].setValidators([Validators.required, emailValidator.valid]);
        } else {
            this.formParent.controls[this.name].setValidators([emailValidator.valid]);
        }

        this.formParent.controls[this.name].updateValueAndValidity();
    }

}
