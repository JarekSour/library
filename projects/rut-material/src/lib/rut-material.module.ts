import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RutMaterialComponent } from './rut-material/rut-material.component';
import { RutDirective } from './rut.directive';

@NgModule({
    declarations: [
        RutMaterialComponent,
        RutDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        RutMaterialComponent
    ]
})
export class RutMaterialModule { }
