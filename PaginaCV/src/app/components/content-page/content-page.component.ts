import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from 'src/app/common/idioma';
import { Trabajo } from 'src/app/common/trabajo';
import { IdiomasService } from 'src/app/service/idiomas.service';
import { TrabajoService } from 'src/app/service/trabajo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Categoria } from 'src/app/common/categoria';
import { CategoriasService } from 'src/app/service/categorias.service';
import { LanguageService } from 'src/app/service/language.service';
import { DatePipe } from '@angular/common';
import { TranslatedBitsService } from 'src/app/service/translated-bits.service';

@Component({
	selector: 'app-content-page',
	templateUrl: './content-page.component.html',
	styleUrls: ['./content-page.component.css']
})

export class ContentPageComponent {
	contentId: number;
	trabajo: Trabajo;
	categoria: Categoria;
	idioma: Idioma;
	language: string;
	isLanguagePage: boolean;
	mapUrl: string = "https://www.google.com/maps/embed/v1/place?q=place_id:*placeId*&key=*apiKey*";
	firstLoad: boolean = true;
	staticMapCode: string = "";
	staticMapURL: SafeResourceUrl;
	datepipe: DatePipe = new DatePipe('es-MX');
	apiKey: string = "AIzaSyDInTUjvpRLCgYonyLMyEacjQr0pnuPCdA";

	returningString?: string = "";
	descriptionString?: string = "";

	constructor(private route: ActivatedRoute,
		private trabajoService: TrabajoService,
		private idiomaService: IdiomasService,
		private categoryService: CategoriasService,
		public domSanitizer: DomSanitizer,
		private languageService: LanguageService,
		private translatedBitsService: TranslatedBitsService) {
		this.isLanguagePage = 
			this.route.snapshot.paramMap.get('table') == ('languages' || 'idiomas') ?  true : false;
		languageService.language$.subscribe(data => {
			this.language = data;
			this.getContent();
		});


	}


	getContent() {
		console.log("get content");
		// @ts-ignore: Object is possibly 'null'.
		this.contentId = this.route.snapshot.paramMap.get('id');
		this.isLanguagePage ? this.showLanguagePage() : this.showJobPage();
		this.translateStaticBits();
	}

	showLanguagePage() {
		this.isLanguagePage = true;
		let languageWord = this.language == "es" ? "idiomas" : "languages";
		this.idiomaService.getIdioma(languageWord, this.contentId).subscribe(data => {
			this.idioma = data;
			this.assignAndFormatCategory();
		})
	}

	showJobPage() {
		this.isLanguagePage = false;
		let jobWord = this.language == "es" ? "trabajos" : "jobs";

		this.trabajoService.getTrabajo(jobWord, this.contentId).subscribe(data => {
			this.trabajo = new Trabajo();
			this.trabajo = data;
			if (this.firstLoad) {
				this.staticMapCode = this.trabajo.codigoLocalizacion;
				this.methodToGetMapURL();
				this.firstLoad = false
			}
			this.assignAndFormatCategory();
			this.buildDescription();
		})
	}

	assignAndFormatCategory() {
		let categoryWord = this.language == "es" ? "categorias" : "categories";
		if (this.isLanguagePage) {
			this.categoria = new Categoria();
			this.categoria.id = 4;
			this.categoria.nombre = this.language == "es" ? "idiomas" : "languages";
		} else {
			this.categoryService.getCategoryByCategoryId(this.trabajo.categoria, categoryWord).subscribe(data => {
				this.categoria = data;
				this.categoria.nombre = this.categoria.nombre.toLowerCase();
			})
		}
	}


	buildDescription() {
		let descriptionNode = document.getElementsByClassName("trabajoDesc")[0];
		this.removePreviousDescriptionIfExists(descriptionNode);
		let arrayDescripcion = this.trabajo.descripcion.split(/(?=[\n])|(?<=[\n])/g);
		arrayDescripcion.forEach(element => {
			if (element.includes('-')) {
				let listElement = document.createElement("li");
				let textNode = document.createTextNode(element.replace("-", ""));
				listElement.appendChild(textNode);
				descriptionNode.appendChild(listElement);
			} else {
				let spanElement = document.createElement("span");
				let textNode = document.createTextNode(element);
				spanElement.appendChild(textNode);
				descriptionNode.appendChild(spanElement);
			}
		});
	}


	public methodToGetMapURL() {
		this.createUrl();
		this.staticMapURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
	}

	createUrl() {
		this.mapUrl = this.mapUrl.replace('*placeId*', this.staticMapCode);
		this.mapUrl = this.mapUrl.replace('*apiKey*', this.apiKey);
	}


	removePreviousDescriptionIfExists(descriptionNode: Element) {
		if (descriptionNode.hasChildNodes()) {
			descriptionNode.childNodes.forEach(childNode => {
				childNode.remove();
			});
		}
	}

	public adaptDate(date: string): string | null {
		let formattedDate;
		this.datepipe = this.language == "es" ? new DatePipe('es-MX') : new DatePipe('en-US');
		formattedDate = this.datepipe.transform(new Date(date), 'MMM YYYY');
		return formattedDate;
	}

	translateStaticBits() {
		this.returningString = this.translatedBitsService.translatedBitsMap.get(this.language + '-return');
		this.descriptionString = this.translatedBitsService.translatedBitsMap.get(this.language + '-description');
	}
}
