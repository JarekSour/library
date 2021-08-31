import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'aapptest';

    formExample: FormGroup

    constructor(private fb: FormBuilder) {
        this.formExample = this.fb.group({
            rut_empresa: ['', []],
        })
    }

    onSubmint() {
        console.log(this.formExample)
    }
}
