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
	idioma: Idioma;
	spanishJob: Trabajo;
	englishJob: Trabajo;
	spanishLanguage: Idioma;
	englishLanguage: Idioma;

	jobWord: string;
	allJobs: Trabajo[];
	relatedJobsSortedArray: any[];

	categoria: Categoria;

	isLanguagePage: boolean;
	firstLoad: boolean = true;

	currentLanguage: string;
	datepipe: DatePipe = new DatePipe('es-MX');

	staticMapCode: string = "";
	staticMapURL: SafeResourceUrl;
	apiKey: string = "AIzaSyDInTUjvpRLCgYonyLMyEacjQr0pnuPCdA";
	mapUrl: string = "https://www.google.com/maps/embed/v1/place?q=place_id:*placeId*&key=*apiKey*";

	descriptionString?: string;
	descriptionStringHTML: string;
	returningString?: string;
	relatedJobsString?: string;

	constructor(private route: ActivatedRoute,
		private trabajoService: TrabajoService,
		private idiomaService: IdiomasService,
		private categoryService: CategoriasService,
		public domSanitizer: DomSanitizer,
		private languageService: LanguageService,
		private translatedBitsService: TranslatedBitsService) {
		this.trabajo = new Trabajo();
		this.isLanguagePage =
			this.route.snapshot.paramMap.get('table') == ('languages' || 'idiomas') ? true : false;
		languageService.language$.subscribe(data => {
			this.currentLanguage = data;
			this.getContent();
		});
	}


	getContent() {
		// @ts-ignore: Object is possibly 'null'.
		this.contentId = this.route.snapshot.paramMap.get('id');
		this.isLanguagePage ? this.showLanguagePage() : this.showJobPage();
		this.translateStaticBits();
	}

	getRelatedContent() {
		let currentJobTags = this.trabajo.tags.trim().split(" ");
		let relatedJobsMap = new Map<Trabajo, number>();
		this.trabajoService.getAllTrabajos(this.jobWord).subscribe(data => {
			this.allJobs = data;
			currentJobTags.forEach(tag =>
				this.allJobs.forEach(job => {
					if (job.tags.includes(tag)) {
						let numberOfCoincidentTags;
						if (relatedJobsMap.get(job) == null) {
							relatedJobsMap.set(job, 1);
							numberOfCoincidentTags = 1;
						} else {
							numberOfCoincidentTags = relatedJobsMap.get(job)!;
							relatedJobsMap.set(job, numberOfCoincidentTags + 1);
						}
						if (tag == 'Bases') {
							relatedJobsMap.set(job, numberOfCoincidentTags - 1);
						};
					}
				})
			)
			let relatedJobsSortedMap = new Map([...relatedJobsMap.entries()].sort((a, b) => b[1] - a[1]));
			this.relatedJobsSortedArray = Array.from(relatedJobsSortedMap).map(([Trabajo, number]) => ({ Trabajo, number }));
			this.relatedJobsSortedArray.forEach(relatedJob => {
				if (relatedJob.number < 3) {
					this.relatedJobsSortedArray.splice(this.relatedJobsSortedArray.indexOf(relatedJob));
				}
			})
			console.log(this.relatedJobsSortedArray);
		})
	}


	showLanguagePage() {
		this.isLanguagePage = true;
		let languageWord = this.currentLanguage == "es" ? "idiomas" : "languages";
		if (this.languageInMemory() == undefined) {
			this.idiomaService.getIdioma(languageWord, this.contentId).subscribe(data => {
				this.idioma = data;
				this.saveLanguageInMemory();
				this.assignAndFormatCategory();
			})
		} else {
			this.idioma = this.currentLanguage == 'es' ? this.spanishLanguage : this.englishLanguage;
			this.assignAndFormatCategory();
		}
	}

	showJobPage() {
		this.isLanguagePage = false;
		this.jobWord = this.currentLanguage == "es" ? "trabajos" : "jobs";

		if (this.jobInMemory() == undefined) {
			this.trabajoService.getTrabajo(this.jobWord, this.contentId).subscribe(data => {
				this.trabajo = data;
				if (this.firstLoad) {
					this.methodToGetMapURL();
					this.saveJobInMemory();
					this.firstLoad = false
				}
				this.assignAndFormatCategory();
				this.buildDescription();
				this.getRelatedContent();
			})
		} else {
			this.trabajo = this.currentLanguage == 'es' ? this.spanishJob : this.englishJob;
			this.assignAndFormatCategory();
			this.buildDescription();
			this.getRelatedContent();
		}
	}

	assignAndFormatCategory() {
		let categoryWord = this.currentLanguage == "es" ? "categorias" : "categories";
		if (this.isLanguagePage) {
			this.categoria = new Categoria();
			this.categoria.id = 4;
			this.categoria.nombre = this.currentLanguage == "es" ? "idiomas" : "languages";
		} else {
			this.categoryService.getCategoryByCategoryId(this.trabajo.categoria, categoryWord).subscribe(data => {
				this.categoria = data;
				this.categoria.nombre = this.categoria.nombre.toLowerCase();
			})
		}
	}


	buildDescription() {
		this.descriptionStringHTML = '';
		let descriptionNode = document.getElementsByClassName("trabajoDesc")[0];
		let arrayDescripcion = this.trabajo.descripcion.split(/(?=[\n])|(?<=[\n])/g);
		arrayDescripcion.forEach(element => {
			if (element.includes('-')) {
				this.descriptionStringHTML =
					this.descriptionStringHTML + '<li>' + element.replace("-", "") + "</li>";
			} else {
				this.descriptionStringHTML = "<span>" + element + "</span>" + this.descriptionStringHTML;
			}
		});
	}

	public methodToGetMapURL() {
		this.staticMapCode = this.trabajo.codigoLocalizacion;
		this.createUrl();
		this.staticMapURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
	}

	createUrl() {
		this.mapUrl = this.mapUrl.replace('*placeId*', this.staticMapCode);
		this.mapUrl = this.mapUrl.replace('*apiKey*', this.apiKey);
	}

	// POSIBLEMENTE UNIFICARLO EN UN SERVICIO JUNTO AL DE LA LISTA DE TRABAJOS
	public adaptDate(date: string): string | null {
		this.datepipe = this.currentLanguage == "es" ? new DatePipe('es-MX') : new DatePipe('en-US');
		if (date == 'Actual') { date = new Date().toISOString().slice(0, 10) }
		let formattedDate = this.datepipe.transform(new Date(date), 'MMM YYYY');
		return formattedDate;
	}

	translateStaticBits() {
		this.returningString = this.translatedBitsService.translatedBitsMap.get(this.currentLanguage + '-return');
		this.descriptionString = this.translatedBitsService.translatedBitsMap.get(this.currentLanguage + '-description');
		this.relatedJobsString = this.translatedBitsService.translatedBitsMap.get(this.currentLanguage + '-relatedJobs');
	}

	jobInMemory(): Trabajo | undefined {
		return this.currentLanguage == 'es' ? this.spanishJob : this.englishJob;

	}

	saveJobInMemory() {
		if (this.currentLanguage == 'es') { this.spanishJob = this.trabajo; }
		else { this.englishJob = this.trabajo; }
	}

	languageInMemory(): Idioma | undefined {
		return this.currentLanguage == 'es' ? this.spanishLanguage : this.englishLanguage;
	}

	saveLanguageInMemory() {
		if (this.currentLanguage == 'es') { this.spanishLanguage = this.idioma; }
		else { this.englishLanguage = this.idioma; }
	}



	// VERSI�N ALTERNATIVA MONTANDO EL PROPIO HTML. NO FUNCIONABA BIEN. REQUIERE USAR LA CLASE QUE SE ESPECIFICA EN EL DIV
	/*	buildDescription() {
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
	}*/


}
