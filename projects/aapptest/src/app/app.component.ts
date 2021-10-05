import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    formExample: FormGroup
    value: string = "10"
    label: string = 'Ingrese su RUT'
    placeholder: string = "100"
    disabled: boolean = false
    readonly: boolean = false
    required: boolean = false



    errorCustom: string | boolean = false;

    constructor(private fb: FormBuilder) {
        this.formExample = this.fb.group({
            rut_empresa: ['', []],
            email_empresa: ['', []],
            edad: ['', []],
        })
    }

    onSubmint() {
        this.value = '173426593'
        this.label = 'Ingrese su email'
        this.placeholder = '200'
        //this.disabled = true
        //this.readonly = true
        this.required = true
        this.errorCustom = 'puta la wea'

        console.log(this.formExample)

        setTimeout(() => {
            this.errorCustom = false
            console.log(this.formExample)
        }, 2000);
    }
}
