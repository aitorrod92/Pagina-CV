import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaTrabajosComponent } from './lista-trabajos/lista-trabajos.component';
import { TrabajoService } from './service/trabajo.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from "./components/search/search.component";
import { ContentPageComponent } from './components/content-page/content-page.component';
import { CategoriesMenuComponent } from './components/categories-menu/categories-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

registerLocaleData(localeEn, 'en')
registerLocaleData(localeEs, 'es');

const routes: Routes =
	[{ path: 'category/:categoryid', component: ListaTrabajosComponent },
	{ path: 'search/:keyword', component: ListaTrabajosComponent },
	{ path: 'content/:table/:id', component: ContentPageComponent },
	{ path: '', component: ListaTrabajosComponent },
	{ path: '**', component: PageNotFoundComponent}];


@NgModule({
	declarations: [
		AppComponent,
		ListaTrabajosComponent,
		PageNotFoundComponent,
		SearchComponent,
		ContentPageComponent,
		CategoriesMenuComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		FontAwesomeModule
	],
	providers: [TrabajoService, { provide: LOCALE_ID, useValue: 'es' }],
	bootstrap: [AppComponent]
})
export class AppModule { }
