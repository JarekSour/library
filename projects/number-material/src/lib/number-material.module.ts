import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberDirective } from './number-material.directive';
import { NumberMaterialComponent } from './number-material/number-material.component';



@NgModule({
    declarations: [
        NumberMaterialComponent,
        NumberDirective
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
    ],
    exports: [
        NumberMaterialComponent
    ]
})
export class NumberMaterialModule { }
