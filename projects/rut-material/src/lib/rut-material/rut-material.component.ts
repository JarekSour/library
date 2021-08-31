import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { rutValidator } from 'dist/rut-material/lib/validation/rut.validator';
import { RutMaterialService } from '../rut-material.service';

@Component({
    selector: 'rut-material',
    templateUrl: './rut-material.component.html',
    styleUrls: ['./rut-material.component.css']
})
export class RutMaterialComponent implements OnInit {

    @Input() formParent: FormGroup;

    @Input() label: string = 'Ingrese su RUT';
    @Input() name: string = 'rut';
    @Input() value: string = '';
    @Input() placeholder?: string | undefined = '12.345.678-9';
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
    @Input() errorRequired?: string = 'El RUT es requerido';
    @Input() errorInvalid?: string = 'El Rut es inválido';
    @Input() errorCustom?: string | boolean = false;

    constructor(private fb: FormBuilder, private rutService: RutMaterialService) {
        this.formParent = this.fb.group({});
    }

    ngOnInit(): void {
        let control = this.formParent.controls[this.name];
        this.formParent.addControl(this.name, control);

        let rut = this.rutService.rut(this.value);
        this.value = rut;

        this.formParent.controls[this.name].setValue(rut);

        this.formParent.controls[this.name].valueChanges.subscribe(e => {
            this.formParent.controls[this.name].setValue(this.rutService.rut(e), { emitEvent: false });
        });
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
            this.formParent.controls[this.name].setValidators([Validators.required, rutValidator.valid]);
        }
        else {
            this.formParent.controls[this.name].setValidators([rutValidator.valid]);
        }
        this.formParent.controls[this.name].updateValueAndValidity();
    }

}
