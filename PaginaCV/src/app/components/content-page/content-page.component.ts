import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from 'src/app/common/idioma';
import { Trabajo } from 'src/app/common/trabajo';
import { IdiomasService } from 'src/app/service/idiomas.service';
import { TrabajoService } from 'src/app/service/trabajo.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Categoria } from 'src/app/common/categoria';
import { CategoriasService } from 'src/app/service/categorias.service';
import { LanguageService } from 'src/app/service/language.service';

@Component({
	selector: 'app-content-page',
	templateUrl: './content-page.component.html',
	styleUrls: ['./content-page.component.css']
})

export class ContentPageComponent implements OnInit {
	contentId: number;
	trabajo: Trabajo;
	categoria: Categoria;
	idioma: Idioma;
	language: string = "es";
	isLanguagePage: boolean;
	mapUrl: string = "https://www.google.com/maps/embed/v1/place?q=place_id:*placeId*&key=*apiKey*";
	apiKey: string = "AIzaSyDInTUjvpRLCgYonyLMyEacjQr0pnuPCdA";

	constructor(private route: ActivatedRoute,
		private trabajoService: TrabajoService,
		private idiomaService: IdiomasService,
		private categoryService: CategoriasService,
		public domSanitizer: DomSanitizer,
		private languageService : LanguageService) {
			this.languageService.language$.subscribe(data => {
			this.language = data;
			this.showJobPage();
		});
			
		 }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.getContent() });
	}

	getContent() {
		// @ts-ignore: Object is possibly 'null'.
		this.contentId = this.route.snapshot.paramMap.get('id');
		if (this.route.snapshot.paramMap.get('table') === 'languages') {
			this.showLanguagePage();
		} else {
			this.showJobPage();
		}

	}

	showLanguagePage() {
		this.isLanguagePage = true;
		this.idiomaService.getIdioma(this.contentId).subscribe(data => {
			this.idioma = data;
			//this.assignAndFormatCategory();
		})
	}

	showJobPage() {
		this.isLanguagePage = false;
		let jobWord = this.language == "es" ? "trabajos" : "jobs";
		this.trabajoService.getTrabajo(jobWord, this.contentId).subscribe(data => {
			this.trabajo = data;
			this.categoryService.getCategoryByCategoryId(this.trabajo.categoria, jobWord).subscribe(data => {
				this.categoria = data;
			})
			//this.assignAndFormatCategory();
			this.buildDescription();
		})
	}

	buildDescription() {
		let arrayDescripcion = this.trabajo.descripcion.split(/(?=[\n])|(?<=[\n])/g);
		arrayDescripcion.forEach(element => {
			if (element.includes('-')) {
				let listElement = document.createElement("li");
				let textNode = document.createTextNode(element.replace("-", ""));
				listElement.appendChild(textNode);
				document.getElementsByClassName("trabajoDesc")[0].appendChild(listElement);
			} else {
				let spanElement = document.createElement("span");
				let textNode = document.createTextNode(element);
				spanElement.appendChild(textNode);
				document.getElementsByClassName("trabajoDesc")[0].appendChild(spanElement);
			}
		});
	}
	
/*
	assignAndFormatCategory() {
		
		
		if (this.isLanguagePage) {
			this.categoria = new Categoria();
			this.categoria.id = 4;
			this.categoria.nombre = 'idiomas';
		} else {
			this.categoryService.getCategoryOfJobByJobId(this.trabajo.id).subscribe(
				data => {
					this.categoria = data;
					this.categoria.nombre = this.categoria.nombre.toLowerCase();
				})
		}
	}*/

	public methodToGetMapURL(): SafeResourceUrl {
		this.createUrl();
		return this.domSanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
	}

	createUrl() {
		this.mapUrl = this.mapUrl.replace('*placeId*', this.trabajo.codigoLocalizacion);
		this.mapUrl = this.mapUrl.replace('*apiKey*', this.apiKey);
	}



}