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
	constructor(private trabajoService: TrabajoService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.listTrabajos() });
	}

	listTrabajos() {
		const hasSearchingKeyWords: boolean = this.route.snapshot.paramMap.has('keyword');
		if (hasSearchingKeyWords) {
			// @ts-ignore: Object is possibly 'null'.
			this.currentSearchingKeywords = this.route.snapshot.paramMap.get('keyword');
		} else {
			this.currentSearchingKeywords = "";
		}

		this.trabajoService.getTrabajosList(this.currentSearchingKeywords).subscribe(
			data => {
				this.trabajo = data;
			})
	}
}



