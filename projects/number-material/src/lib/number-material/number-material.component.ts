import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'number-material',
    templateUrl: './number-material.component.html',
    styleUrls: ['./number-material.component.css']
})
export class NumberMaterialComponent implements OnInit {

    @Input() formParent: FormGroup;

    @Input() label: string = 'Ingrese su edad';
    @Input() name: string = 'edad';
    @Input() value: string = '';
    @Input() placeholder?: string | undefined = '30';
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

    @Input() allowDecimals?: boolean = false
    @Input() decimalSeparator?: '.' | ',' = '.'
    @Input() allowSign?: boolean = false

    @Input() minValue?: any = false
    @Input() maxValue?: any = false

    @Input() errorRequired?: string = 'El número es requerido';
    @Input() errorMin?: string = 'El número es menor al minimo ';
    @Input() errorMax?: string = 'El número supera el máximo';
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

    initValidators() {
        let errors = []

        if(this.required)
            errors.push(Validators.required)

        if(this.minValue !== false)
            errors.push(Validators.min(this.minValue))

        if(this.maxValue !== false)
            errors.push(Validators.max(this.maxValue))


        this.formParent.controls[this.name].setValidators([...errors]);
    }

}
