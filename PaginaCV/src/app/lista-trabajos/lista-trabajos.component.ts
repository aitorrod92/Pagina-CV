import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from '../common/idioma';
import { Trabajo } from '../common/trabajo';
import { IdiomasService } from '../service/idiomas.service';
import { TrabajoService } from '../service/trabajo.service';
import { DatePipe } from '@angular/common';


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

	constructor(private trabajoService: TrabajoService,
		private idiomasService: IdiomasService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.listTrabajos() });

	}

	public adaptDate(date: string, categoria: number): string | null {
		let formattedDate;
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
		if (yearsString!="" && months != 0) {
			finalString = finalString.concat(" y ");
		}
		finalString = finalString.concat(monthsString + ")");
		return finalString;
	}

	defineYearsString(duration: number): string {
		let years;
		years = +(duration / 12).toPrecision(1);
		let yearsString = years + " a\xf1o";
		if (years > 1) { yearsString = yearsString.concat("s"); }
		return yearsString;
	}

	defineMonthsString(numberOfMonths: number): string {
		let monthsString = numberOfMonths + " mes";
		if (numberOfMonths > 1) { monthsString = monthsString.concat("es"); }
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
		if (this.currentSearchingKeywords === "" && this.currentCategory == 0) {
			this.trabajoService.getAllTrabajos().subscribe(data => {
				this.ObtenerYOrdenar(data);

			})
		} else if (this.currentCategory != 0) {
			if (this.currentCategory === 4) {
				this.idiomasService.getIdiomas().subscribe(data => this.idioma = data);
			} else {
				this.trabajoService.getTrabajosListbyCategory(this.currentCategory).subscribe(
					data => {
						this.ObtenerYOrdenar(data);

					})
			}
		} else {
			this.trabajoService.getTrabajosListbyKeyword(this.currentSearchingKeywords).subscribe(
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




