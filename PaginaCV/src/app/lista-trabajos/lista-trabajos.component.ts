import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from '../common/idioma';
import { Trabajo } from '../common/trabajo';
import { IdiomasService } from '../service/idiomas.service';
import { TrabajoService } from '../service/trabajo.service';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../service/language.service';


@Component({
	selector: 'app-lista-trabajos',
	templateUrl: './lista-trabajos.component.html',
	styleUrls: ['./lista-trabajos.component.css']
})
export class ListaTrabajosComponent implements OnInit {
	datepipe: DatePipe = new DatePipe('es-MX');
	trabajo: Trabajo[];
	idioma: Idioma[];
	currentSearchingKeywords: String;
	currentCategory: number;
	language: string = "es";

	constructor(private trabajoService: TrabajoService,
		private idiomasService: IdiomasService,
		private languageService: LanguageService,
		private route: ActivatedRoute) {
		this.languageService.language$.subscribe(data => {
			this.language = data;
			this.listTrabajos();
		});
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.listTrabajos() });

	}

	public adaptDate(date: string, categoria: number): string | null {
		let formattedDate;
		this.datepipe = this.language == "es" ? new DatePipe('es-MX') : new DatePipe('en-US');
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
			let connectionString = this.language == "es" ? " y " : " and ";
			finalString = finalString.concat(connectionString);
		}
		finalString = finalString.concat(monthsString + ")");
		return finalString;
	}

	defineYearsString(duration: number): string {
		let years;
		years = +(duration / 12).toPrecision(1);
		let yearsString = "";
		if (this.language == "es") {
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
		if (this.language == "es") {
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
		let jobWord = this.language == "es" ? "trabajos" : "jobs";
		if (this.currentSearchingKeywords === "" && this.currentCategory == 0) {
			this.trabajoService.getAllTrabajos(jobWord).subscribe(data => {
				this.ObtenerYOrdenar(data);

			})
		} else if (this.currentCategory != 0) {
			if (this.currentCategory === 4) {
				this.idiomasService.getIdiomas().subscribe(data => this.idioma = data);
			} else {
				let categoryWord = this.language == "es" ? "categorias" : "categories";
				this.trabajoService.getTrabajosListbyCategory(categoryWord, this.currentCategory).subscribe(
					data => {
						this.ObtenerYOrdenar(data);

					})
			}
		} else {
			this.trabajoService.getTrabajosListbyKeyword(this.currentSearchingKeywords, jobWord).subscribe(
				data => {
					this.ObtenerYOrdenar(data);
				})
		}
	}

	ObtenerYOrdenar(data: Trabajo[]) {
		this.trabajo = data;
		this.trabajo.sort((a, b) => {
			return <any>new Date(a.fechaInicioDate) - <any>new Date(b.fechaInicioDate);
		});

	}
}




