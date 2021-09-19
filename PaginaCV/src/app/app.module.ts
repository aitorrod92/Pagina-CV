import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaTrabajosComponent } from './lista-trabajos/lista-trabajos.component';
import { TrabajoService } from './service/trabajo.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { Router, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from "./components/search/search.component";
import { ContentPageComponent } from './components/content-page/content-page.component';
import { CategoriesMenuComponent } from './components/categories-menu/categories-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgApexchartsModule } from 'ng-apexcharts';
import { APP_INITIALIZER } from '@angular/core';
import { LanguageService } from './service/language.service';
import config from '../assets/generalconfig.json';
import { KeywordsService } from './service/keywords.service';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ReactiveFormsModule } from '@angular/forms';
import { ContactRedirectComponent } from './components/contact-redirect/contact-redirect.component';
import { ContactFormComponent } from "./components/contact-form/contact-form.component";



registerLocaleData(localeEn, 'en')
registerLocaleData(localeEs, 'es');


const routes: Routes =
	[{ path: 'contact', component: ContactFormComponent },
	{ path: 'contact/:success', component: ContactRedirectComponent },
	{ path: 'category/:categoryid', component: ListaTrabajosComponent },
	{ path: 'search/:keyword', component: ListaTrabajosComponent },
	{ path: 'content/:table/:id', component: ContentPageComponent },
	{ path: 'index', component: MainPageComponent },
	{ path: '', component: ListaTrabajosComponent },
	{ path: '**', component: PageNotFoundComponent }];


@NgModule({
	declarations: [
		AppComponent,
		ListaTrabajosComponent,
		PageNotFoundComponent,
		SearchComponent,
		ContentPageComponent,
		CategoriesMenuComponent,
		MainPageComponent,
		ContactFormComponent,
		ContactRedirectComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		FontAwesomeModule,
		AutocompleteLibModule,
		NgApexchartsModule,
		NgxQRCodeModule,
		ReactiveFormsModule

	],
	providers:
		[TrabajoService,
			{ provide: LOCALE_ID, useValue: 'es' },
			{
				provide: APP_INITIALIZER,
				useFactory: languageProviderFactory,
				deps: [LanguageService],
				multi: true
			},
			{
				provide: APP_INITIALIZER,
				useFactory: searchProviderFactory,
				deps: [KeywordsService],
				multi: true
			}
		],
	bootstrap: [AppComponent],

})
export class AppModule { }

export function languageProviderFactory(provider: LanguageService) {
	let json = config;
	return () => provider.setInitialLanguage(json['initialLanguage']);
}

export function searchProviderFactory(provider: KeywordsService) {
	let json = config;
	return () => provider.setMaximumSearchTolerance(json['maximumSearchTolerance']);
}
