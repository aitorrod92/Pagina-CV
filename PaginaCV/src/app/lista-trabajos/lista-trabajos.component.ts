import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from '../common/idioma';
import { Trabajo } from '../common/trabajo';
import { IdiomasService } from '../service/idiomas.service';
import { TrabajoService } from '../service/trabajo.service';


@Component({
	selector: 'app-lista-trabajos',
	templateUrl: './lista-trabajos.component.html',
	styleUrls: ['./lista-trabajos.component.css']
})
export class ListaTrabajosComponent implements OnInit {
	trabajo: Trabajo[];
	idioma: Idioma [];
	currentSearchingKeywords: String;
	currentCategory: number;

	constructor(private trabajoService: TrabajoService, 
				private idiomasService : IdiomasService,
				private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.listTrabajos() });
		
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
		if (this.currentSearchingKeywords === "" && this.currentCategory==0) {
			this.trabajoService.getAllTrabajos().subscribe(data => {
				this.ObtenerYOrdenar(data);

			})
		} else if (this.currentCategory!=0) {
			if (this.currentCategory === 4) {
				this.idiomasService.getIdiomas().subscribe(data => this.idioma = data);
			} else {
				this.trabajoService.getTrabajosListbyCategory(this.currentCategory).subscribe(
					data => {
						this.ObtenerYOrdenar(data);

					})
			}
		} else {
			console.log("palabra busqueda " + this.currentSearchingKeywords);
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




