import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from 'src/app/common/idioma';
import { Trabajo } from 'src/app/common/trabajo';
import { IdiomasService } from 'src/app/service/idiomas.service';
import { TrabajoService } from 'src/app/service/trabajo.service';

@Component({
	selector: 'app-content-page',
	templateUrl: './content-page.component.html',
	styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {
	contentId: number;
	trabajo: Trabajo;
	idioma: Idioma;
	isLanguagePage: boolean;

	constructor(private route: ActivatedRoute,
		private trabajoService: TrabajoService,
		private idiomaService: IdiomasService) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.getContent() });
	}

	getContent() {
		// @ts-ignore: Object is possibly 'null'.
		this.contentId = this.route.snapshot.paramMap.get('id');
		console.log(this.route.snapshot.paramMap.get('table'));
		if (this.route.snapshot.paramMap.get('table') === 'languages') {
			this.isLanguagePage = true;
			this.idiomaService.getIdioma(this.contentId).subscribe(data => {
				this.idioma = data;
			})
		} else {
			this.isLanguagePage = false;
			this.trabajoService.getTrabajo(this.contentId).subscribe(data => {
				this.trabajo = data;
			})
		}
	}
}