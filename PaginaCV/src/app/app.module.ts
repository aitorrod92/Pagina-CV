import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaTrabajosComponent } from './lista-trabajos/lista-trabajos.component';
import { TrabajoService } from './service/trabajo.service';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEn, 'en')
registerLocaleData(localeEs, 'es');

@NgModule({
	declarations: [
		AppComponent,
		ListaTrabajosComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [TrabajoService, { provide: LOCALE_ID, useValue: 'es' }],
	bootstrap: [AppComponent]
})
export class AppModule { }
