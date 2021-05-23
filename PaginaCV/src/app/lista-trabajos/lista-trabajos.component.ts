import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trabajo } from '../common/trabajo';
import { TrabajoService } from '../service/trabajo.service';

@Component({
	selector: 'app-lista-trabajos',
	templateUrl: './lista-trabajos.component.html',
	styleUrls: ['./lista-trabajos.component.css']
})
export class ListaTrabajosComponent implements OnInit {
	trabajo: Trabajo[];
	currentSearchingKeywords: String;
	currentCategory: String;

	constructor(private trabajoService: TrabajoService,
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
			this.currentCategory = this.route.snapshot.paramMap.get('categoryid');
		} else {
			this.currentCategory = '';
		}
	}

	listTrabajos() {
		this.getKeyword();
		this.getCategory();
		if (this.currentSearchingKeywords === "" && this.currentCategory === '') {
			this.trabajoService.getAllTrabajos().subscribe(data => {
				this.trabajo = data;
			})
		} else if (this.currentCategory != '') {
			this.trabajoService.getTrabajosListbyCategory(this.currentCategory).subscribe(
				data => {
					this.trabajo = data;
				})
		} else {
			this.trabajoService.getTrabajosListbyKeyword(this.currentSearchingKeywords).subscribe(
				data => {
					this.trabajo = data;
				})

		}
	}
}




