import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailDirective } from './email-material.directive';
import { EmailMaterialComponent } from './email-material/email-material.component';

@NgModule({
    declarations: [
        EmailMaterialComponent,
        EmailDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
    ],
    exports: [
        EmailMaterialComponent
    ]
})
export class EmailMaterialModule { }
