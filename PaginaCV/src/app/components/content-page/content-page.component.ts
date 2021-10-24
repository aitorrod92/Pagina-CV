import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
import { AbbreviationsService } from 'src/app/service/abbreviations.service';

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
	public relatedJobsSortedArray: any[];
	public baseUrl: string = '/content/jobs/';

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
	relatedJobsOrEducationString?: string;
	multiWordTags : string [] = ["Bases"];

	constructor(private route: ActivatedRoute,
		private trabajoService: TrabajoService,
		private idiomaService: IdiomasService,
		private categoryService: CategoriasService,
		public domSanitizer: DomSanitizer,
		private languageService: LanguageService,
		private translatedBitsService: TranslatedBitsService,
		private abbreviationsService: AbbreviationsService,
		private router: Router) {
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
	}

	getRelatedContent() {
		let currentJobTags = this.trabajo.tags.trim().split(" ");
		let relatedJobsMap = new Map<Trabajo, number>();
		this.trabajoService.getAllTrabajos(this.jobWord).subscribe(data => {
			this.allJobs = data;
			currentJobTags.forEach(tag =>
				this.allJobs.forEach(job => {
					if (job.tags.toLowerCase().includes(tag.toLowerCase())) {
						let numberOfCoincidentTags;
						if (relatedJobsMap.get(job) == null) {
							job = this.abbreviateName(job);
							relatedJobsMap.set(job, 1);
							numberOfCoincidentTags = 1;
						} else {
							job = this.abbreviateName(job);
							numberOfCoincidentTags = relatedJobsMap.get(job)!;
							//@ts-ignore
							relatedJobsMap.set(job, numberOfCoincidentTags + 1);
						}
						/* "Grado" en inglés se dice "Master Degree" y puede que se asigne coincidencia
						entre másters y grados normales si no se realiza esta corrección */
						if (this.isMasterDegree(tag, job.tags)) { 
							job = this.abbreviateName(job);
							relatedJobsMap.set(job, numberOfCoincidentTags);
						};

						if (this.multiWordTags.includes(tag)) {
							relatedJobsMap = this.FixMultiWordTag(tag, job, relatedJobsMap, numberOfCoincidentTags);
						}
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

	abbreviateName(job: Trabajo): Trabajo {
		if (this.abbreviationsService.abbreviationsMap.has(job.nombre)) {
			job.nombre = this.abbreviationsService.abbreviationsMap.get(job.nombre)!;
		}
		return job;
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
				this.translateStaticBits();
			})
		} else {
			this.trabajo = this.currentLanguage == 'es' ? this.spanishJob : this.englishJob;
			this.assignAndFormatCategory();
			this.translateStaticBits();
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
		this.relatedJobsOrEducationString = this.trabajo.imagen.includes("jobs") ?
			this.translatedBitsService.translatedBitsMap.get(this.currentLanguage + '-relatedJobs') :
			this.translatedBitsService.translatedBitsMap.get(this.currentLanguage + '-relatedEducation');
		this.buildDescription();
		this.getRelatedContent();
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

	// Puesto que los enlaces a la misma página no funcionan, hace que se redireccione de forma falsa y luego vamos a la que queremos realmente
	redirectTo(uri: string) {
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
			this.router.navigate([uri]));
	}

	private isMasterDegree(tag: string, jobTags: string): boolean {
		if (tag == 'Degree') {
			var master = "master";
			var degreeIndex = jobTags.indexOf(tag);
			return jobTags.substring(degreeIndex - master.length - 1, degreeIndex - 1).trim() == "Master";
		}
		return false;
	}

	FixMultiWordTag
		(tag: string, job: Trabajo, relatedJobsMap: Map<Trabajo, number>, numberOfCoincidentTags: number)
		: Map<Trabajo, number> {
		job = this.abbreviateName(job);
		relatedJobsMap.set(job, numberOfCoincidentTags - 1);
		return relatedJobsMap;
	}
	// VERSIÓN ALTERNATIVA MONTANDO EL PROPIO HTML. NO FUNCIONABA BIEN. REQUIERE USAR LA CLASE QUE SE ESPECIFICA EN EL DIV
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
