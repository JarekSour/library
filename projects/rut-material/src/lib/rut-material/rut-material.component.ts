import { ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { RutMaterialService } from '../rut-material.service';
import { rutValidator } from '../rut-material.validator';

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

    constructor(private fb: FormBuilder, private rutService: RutMaterialService, private changeDetectorRef: ChangeDetectorRef) {
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
    }

    ngDoCheck() {
        // if (this.errorCustom) {
        //     this.errorCustom = this.errorCustom;
        //     this.formParent.controls[this.name].setErrors({ errorCustom: true });
        //     this.formParent.controls[this.name].markAsTouched();
        // }
    }

    ngOnChanges(changes: any): void {

        console.log(changes)

        if (changes.value) {
            this.formParent.controls[this.name].setValue(changes.value.currentValue)
            this.formParent.controls[this.name].markAsTouched();
        }

        if (changes.disabled) {
            if (this.disabled)
                this.formParent.controls[this.name].disable()
            else
                this.formParent.controls[this.name].enable()
        }

        if (changes.required) {
            let errors = [rutValidator.valid]

            if (changes.required.currentValue) {
                errors.push(Validators.required)
            }

            this.required = changes.required.currentValue
            this.formParent.controls[this.name].setValidators([...errors]);
        }

        if (changes.errorCustom) {
            if (changes.errorCustom.currentValue == false) {
                let errors = this.formParent.controls[this.name].errors

                if (errors && Object.keys(errors!).length > 0)
                    delete errors!.errorCustom

                if (errors && Object.keys(errors!).length > 0) {
                    this.formParent.controls[this.name].setErrors(errors);
                } else {
                    this.formParent.controls[this.name].setErrors(null);
                }
            } else {
                let errors = this.formParent.controls[this.name].errors
                if (errors == null) {
                    this.formParent.controls[this.name].setErrors({ errorCustom: true })
                }else{
                    errors!['errorCustom'] = true
                    this.formParent.controls[this.name].setErrors(errors);
                }
            }
            this.errorCustom = changes.errorCustom.currentValue
            this.formParent.controls[this.name].markAsTouched();
        }
    }

}
