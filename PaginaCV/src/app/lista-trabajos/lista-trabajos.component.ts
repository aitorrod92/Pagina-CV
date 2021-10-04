import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	fill: ApexFill;
	dataLabels: ApexDataLabels;
	grid: ApexGrid;
	yaxis: ApexYAxis;
	xaxis: ApexXAxis;
	plotOptions: ApexPlotOptions;
};

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
	maximumSearchTolerance: number;

	keywords: Keyword[];
	coincidence: boolean = false;

	// Para esperar a que el resultado de la subscripción se obtenga antes de ir al siguiente paso
	// es necesario que esté en esta misma clase, porque se ejecuta de manera asíncrona
	language$: Observable<string>;

	fillColors: string[] = ["#00E396", "#008FFB", "#FEB019", "#FF4560", "#FF4560"];

	@ViewChild("chart") chart: ChartComponent;
	public chartOptions: Partial<ChartOptions> | any;

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
			this.keywordsService.getKeywords(this.currentLanguage).subscribe(
				data => {
					this.keywords = data;
				});
			this.listTrabajos();
			this.translateStaticBits();
		});
	}

	public adaptDate(date: string, categoria: number): string | null {
		this.datepipe = this.currentLanguage == "es" ? new DatePipe('es-MX') : new DatePipe('en-US');
		let formattedDate;
		if (date == 'Actual') {
			formattedDate = this.currentLanguage == "es" ? 'actualidad' : 'present';
		} else {
			if (categoria != 3) {
				formattedDate = this.datepipe.transform(new Date(date), 'MMMM YYYY');
			} else {
				formattedDate = this.datepipe.transform(new Date(date), 'YYYY');
			}
		}
		return formattedDate;
	}

	/*EN UN FUTURO LA DURACIÓN NO SE INCLUIRÁ Y SE CALCULARÁ PARA TODOS */
	public adaptDuration(duration: number, date: string): string | null {
		return duration == -1 ? this.adaptUndefinedDuration(date) : this.adaptDefinedDuration(duration);
	}

	adaptUndefinedDuration(date: string): string | null {
		var difference = new Date().getMonth() - new Date(date).getMonth();
		return this.adaptDefinedDuration(difference);
	}

	adaptDefinedDuration(duration: number): string | null {
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

					this.idiomasService.getLanguagesListbyKeyword(languageWord, this.currentSearchingKeywords).subscribe(
						data => {
							this.idioma = data;
							noLanguageResults = this.idioma.length == 0 ? true : false;
							this.noSearchResults = noJobResults && noLanguageResults ? true : false;
							if (this.noSearchResults) {
								this.generateNoResultsElements();
							}
						});
				})
		}
	}

	ObtenerYOrdenar(data: Trabajo[]) {
		this.trabajo = data;

		this.trabajo.sort((a, b) => {
			return <any>new Date(a.fechaInicioDate) - <any>new Date(b.fechaInicioDate);
		});

		this.defineChartAttributes();
		this.update();

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
			buttonLink.setAttribute("class", "routerlink primary-btn");
			buttonLink.setAttribute("href", "/search/" + element); // Consulta app.component para más info
			buttonLink.setAttribute("style", "margin-right: " + this.buttonsMargin);
			buttonLink.innerHTML = element;
			element = element.replace("#", "%23");
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

	update() {
		var arrayNombres: string[] = [];
		var objetoFechas: { x: number; y: number };
		var arrayObjetosFechas: typeof objetoFechas[] = [];
		var arrayData = [];

		//@ts-ignore
		this.trabajo.forEach(element => {

			arrayNombres.push(element.nombre);
			const nuevoObjeto =
				({
					x: new Date(element.fechaInicio).getTime(),
					y: new Date(element.fechaFin).getTime()
				})
			if (Number.isNaN(nuevoObjeto.y)) {
				nuevoObjeto.y = new Date().getTime();
			}
			arrayObjetosFechas.push(nuevoObjeto);
		})

		for (let i = 0; i < arrayNombres.length; i++) {
			console.log("BLABLABA " + arrayNombres[i] + " " + arrayObjetosFechas[i].x + " " + arrayObjetosFechas[i].y);
			arrayData.push
				({
					x: arrayNombres[i],
					y: [arrayObjetosFechas[i].x, arrayObjetosFechas[i].y],
					fillColor: this.fillColors[i]
				})
		}

		this.chartOptions.series = [{
			data: arrayData
		}];

		console.log(this.chartOptions.series);

		this.chart.render();
	}

	defineChartAttributes() {
		this.chartOptions = {
			chart: {
				height: 350,
				width: 700,
				type: "rangeBar",
				background: "black"
			},
			plotOptions: {
				bar: {
					horizontal: true,
					distributed: true,
					dataLabels: {
						hideOverflowingLabels: true
					}
				}
			},
			dataLabels: {
				enabled: true,
				//@ts-ignore
				formatter: function(val, opts) {
					var label = opts.w.globals.labels[opts.dataPointIndex];
					//@ts-ignore
					var a = moment(val[0]);
					//@ts-ignore
					var b = moment(val[1]);
					var diff = b.diff(a, "days");
					return label + ": " + diff + (diff > 1 ? " days" : " day");
				},
				style: {
					colors: ["#f3f4f5", "#fff"]
				}
			},
			xaxis: {
				type: "datetime"
			},
			yaxis: {
				show: false
			},
			grid: {
				row: {
					colors: ["#f3f4f5", "#fff"],
					opacity: 1
				}
			}
		};

	}



}




