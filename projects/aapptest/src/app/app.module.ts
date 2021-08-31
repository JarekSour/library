import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RutMaterialModule } from 'projects/rut-material/src/public-api';
import { EmailMaterialModule } from 'projects/email-material/src/public-api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,

        // LIBS
        RutMaterialModule,
        EmailMaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
