import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaTrabajosComponent } from './lista-trabajos/lista-trabajos.component';
import {TrabajoService} from './service/trabajo.service';

@NgModule({
	declarations: [
		AppComponent,
		ListaTrabajosComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [TrabajoService],
	bootstrap: [AppComponent]
})
export class AppModule { }
