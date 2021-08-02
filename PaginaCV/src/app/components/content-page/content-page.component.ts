import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idioma } from 'src/app/common/idioma';
import { Trabajo } from 'src/app/common/trabajo';
import { IdiomasService } from 'src/app/service/idiomas.service';
import { TrabajoService } from 'src/app/service/trabajo.service';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
	selector: 'app-content-page',
	templateUrl: './content-page.component.html',
	styleUrls: ['./content-page.component.css']
})

export class ContentPageComponent implements OnInit {
	contentId: number;
	trabajo: Trabajo;
	idioma: Idioma;
	isLanguagePage: boolean;//"https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
	mapUrl: string = "https://www.google.com/maps/embed/v1/place?q=place_id:*placeId*&key=*apiKey*";
	apiKey : string = "AIzaSyDInTUjvpRLCgYonyLMyEacjQr0pnuPCdA";
	
	constructor(private route: ActivatedRoute,
		private trabajoService: TrabajoService,
		private idiomaService: IdiomasService,
		public domSanitizer : DomSanitizer) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.getContent() });
	}
	
		public methodToGetMapURL() : SafeResourceUrl {
		this.createUrl();
		return this.domSanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
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
	
	createUrl(){
		this.mapUrl = this.mapUrl.replace('*placeId*', this.trabajo.codigoLocalizacion);
		this.mapUrl = this.mapUrl.replace('*apiKey*', this.apiKey);
	}
}