import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from '../common/idioma';
import { Trabajo } from '../common/trabajo';
import { IdiomasService } from '../service/idiomas.service';
import { TrabajoService } from '../service/trabajo.service';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../service/language.service';
import { TranslatedBitsService } from '../service/translated-bits.service';
import { Observable } from 'rxjs';
import { KeywordsService } from '../service/keywords.service';
import { Keyword } from '../common/keyword';


@Component({
	selector: 'app-lista-trabajos',
	templateUrl: './lista-trabajos.component.html',
	styleUrls: ['./lista-trabajos.component.css']
})

export class ListaTrabajosComponent implements OnInit {

	datepipe: DatePipe = new DatePipe('es-MX');
	trabajo: Trabajo[];
	idioma: Idioma[];
	currentSearchingKeywords: string;
	currentCategory: number;
	currentLanguage: string;
	noSearchResults: boolean;
	noResultsString?: string = "";
	searchSuggestionString?: string = "";
	suggestionString: string = "";
	buttonsMargin: string = "20px";
	maximumSearchTolerance : number;

	keywords: Keyword[];
	coincidence: boolean = false;

	// Para esperar a que el resultado de la subscripción se obtenga antes de ir al siguiente paso
	// es necesario que esté en esta misma clase, porque se ejecuta de manera asíncrona
	language$: Observable<string>;

	constructor(private trabajoService: TrabajoService,
		private idiomasService: IdiomasService,
		private languageService: LanguageService,
		private translatedBitService: TranslatedBitsService,
		private keywordsService: KeywordsService,
		private route: ActivatedRoute) {
		this.language$ = this.languageService.getLanguage();
		this.maximumSearchTolerance = this.keywordsService.getMaximumSearchTolerance();
	}

	ngOnInit(): void {
		this.language$.subscribe(data => {
			this.currentLanguage = data;
			this.listTrabajos();
			this.translateStaticBits();
		});

		this.keywordsService.getKeywords(this.currentLanguage).subscribe( // ADAPTARLO PARA INGLÉS
			data => {
				this.keywords = data;
			});

		this.route.paramMap.subscribe(() => { this.listTrabajos() });
	}

	public adaptDate(date: string, categoria: number): string | null {
		let formattedDate;
		this.datepipe = this.currentLanguage == "es" ? new DatePipe('es-MX') : new DatePipe('en-US');
		if (categoria != 3) {
			formattedDate = this.datepipe.transform(new Date(date), 'MMMM YYYY');
		} else {
			formattedDate = this.datepipe.transform(new Date(date), 'YYYY');
		}
		return formattedDate;
	}

	public adaptDuration(duration: number): string | null {
		let yearsString = "";
		let months = 0;
		let monthsString = "";
		if (duration >= 12) {
			yearsString = this.defineYearsString(duration);
			months = duration % 12;
			if (months > 0) { monthsString = this.defineMonthsString(months); }
		} else {
			months = duration;
			monthsString = this.defineMonthsString(months);
		}
		let finalString = "(" + yearsString;
		if (yearsString != "" && months != 0) {
			let connectionString = this.currentLanguage == "es" ? " y " : " and ";
			finalString = finalString.concat(connectionString);
		}
		finalString = finalString.concat(monthsString + ")");
		return finalString;
	}

	defineYearsString(duration: number): string {
		let years;
		years = +(duration / 12).toPrecision(1);
		let yearsString = "";
		if (this.currentLanguage == "es") {
			yearsString = years + " a\xf1o"; //https://en.wikipedia.org/wiki/List_of_Unicode_characters#Latin_Extended-A
		} else {
			yearsString = years + " year";
		}
		if (years > 1) { yearsString = yearsString.concat("s"); }
		return yearsString;
	}

	defineMonthsString(numberOfMonths: number): string {
		let monthsString = "";
		let monthsStringPlural = "";
		if (this.currentLanguage == "es") {
			monthsString = numberOfMonths + " mes";
			monthsStringPlural = "es";
		} else {
			monthsString = numberOfMonths + " month";
			monthsStringPlural = "s";
		}
		if (numberOfMonths > 1) { monthsString = monthsString.concat(monthsStringPlural); }
		return monthsString;
	}

	getKeyword() {
		const hasSearchingKeyWords: boolean = this.route.snapshot.paramMap.has('keyword');
		if (hasSearchingKeyWords) {
			// @ts-ignore: Object is possibly 'null'.
			this.currentSearchingKeywords = this.route.snapshot.paramMap.get('keyword');
		} else {
			this.currentSearchingKeywords = "";
		}
	}

	getCategory() {
		const hasCategory: boolean = this.route.snapshot.paramMap.has('categoryid');
		if (hasCategory) {
			// @ts-ignore: Object is possibly 'null'.
			this.currentCategory = +this.route.snapshot.paramMap.get('categoryid');
		} else {
			this.currentCategory = +'';
		}
	}

	listTrabajos() {
		this.getKeyword();
		this.getCategory();
		console.log("keyword: " + this.currentSearchingKeywords + " category: " + this.currentCategory);
		let jobWord = this.currentLanguage == "es" ? "trabajos" : "jobs";
		let languageWord = this.currentLanguage == "es" ? "idiomas" : "languages";
		if (this.currentSearchingKeywords === "" && this.currentCategory == 0) {
			this.trabajoService.getAllTrabajos(jobWord).subscribe(data => {
				this.ObtenerYOrdenar(data);

			})
		} else if (this.currentCategory != 0) {
			if (this.currentCategory === 4) {
				this.idiomasService.getLanguages(languageWord).subscribe(data => this.idioma = data);
			} else {
				let categoryWord = this.currentLanguage == "es" ? "categorias" : "categories";
				this.trabajoService.getTrabajosListbyCategory(categoryWord, this.currentCategory).subscribe(
					data => {
						this.ObtenerYOrdenar(data);
					})
			}
		} else {
			let noJobResults = false;
			let noLanguageResults = false;
			this.trabajoService.getTrabajosListbyKeyword(this.currentSearchingKeywords, jobWord).subscribe(
				data => {
					this.ObtenerYOrdenar(data);
					noJobResults = this.trabajo.length == 0 ? true : false;
				})
			this.idiomasService.getLanguagesListbyKeyword(languageWord, this.currentSearchingKeywords).subscribe(
				data => {
					this.idioma = data;
					noLanguageResults = this.idioma.length == 0 ? true : false;
					this.noSearchResults = noJobResults && noLanguageResults ? true : false;
					if (this.noSearchResults) {
						this.generateNoResultsElements();
					}
				});

		}
	}

	ObtenerYOrdenar(data: Trabajo[]) {
		this.trabajo = data;
		this.trabajo.sort((a, b) => {
			return <any>new Date(a.fechaInicioDate) - <any>new Date(b.fechaInicioDate);
		});

	}

	translateStaticBits() {
		this.noResultsString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-noResults")!;
		this.suggestionString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-suggestion")!;
	}

	generateNoResultsElements() {
		this.coincidence = false;
		this.generateNoResultsSuggestionButtonsIfNecessary();
		this.generateNoResultsSuggestionsStringsIfNecessary();
	}

	generateNoResultsSuggestionButtonsIfNecessary() {
		let coincidentTerms: string[] = [];
		this.keywords.forEach(keyword => {
			let coincidentTerm = this.determineIfCoincidence(keyword);
			if (coincidentTerm) {
				coincidentTerms.push(coincidentTerm);
			}
		})
		let divSuggestedTerms = document.getElementById("suggestedTerms")!;
		this.removeChildrenIfExist(divSuggestedTerms);
		if (coincidentTerms.length > 0) {
			console.log(coincidentTerms);
			this.generateNoResultsHTMLButtons(coincidentTerms, divSuggestedTerms);
		}
	}

	determineIfCoincidence(keyword: Keyword): string | null {
		let mismatches = 0;
		let coincidentTerm: string = "";
		if (Math.abs(keyword.nombre.length - this.currentSearchingKeywords.length) == 0) {
			for (let i = 0; i < keyword.nombre.length; i++) {
				if (keyword.nombre[i].toLowerCase() == this.currentSearchingKeywords[i].toLowerCase()) {
				} else {
					mismatches++;
					if (mismatches > this.maximumSearchTolerance) {
						break;
					}
				}
				if (i == keyword.nombre.length - 1) {
					console.log(keyword.nombre + " es coincidencia");
					coincidentTerm = keyword.nombre;
					this.coincidence = true;
				}
			}
		}
		if (coincidentTerm != "") { return coincidentTerm; } else { return null; }
	}

	removeChildrenIfExist(divSuggestedTerms: HTMLElement) {
		if (divSuggestedTerms.hasChildNodes()) {
			while (divSuggestedTerms.firstChild) {
				divSuggestedTerms.removeChild(divSuggestedTerms.firstChild);
			}
		}
	}

	generateNoResultsHTMLButtons(coincidentTerms: string[], divSuggestedTerms: HTMLElement) {
		coincidentTerms.forEach(element => {
			let buttonLink = document.createElement("a");
			buttonLink.innerHTML = element;
			element = element.replace("#", "%23");
			buttonLink.setAttribute("href", "http://localhost:4200/search/" + element);
			buttonLink.setAttribute("class", "primary-btn");
			buttonLink.setAttribute("style", "margin-right: " + this.buttonsMargin);
			let bold = document.createElement("b");
			bold.appendChild(buttonLink);
			divSuggestedTerms.appendChild(bold);
		})
	}

	generateNoResultsSuggestionsStringsIfNecessary() {
		if (!this.coincidence) {
			this.suggestionString = "";
			this.searchSuggestionString = "";
		} else {
			this.suggestionString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-suggestion")!;
		}
	}



}




