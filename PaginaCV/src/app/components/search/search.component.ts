import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeywordsService } from 'src/app/service/keywords.service';
import { Keyword } from 'src/app/common/keyword';
import { LanguageService } from 'src/app/service/language.service';
import { TranslatedBitsService } from 'src/app/service/translated-bits.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	keyword = 'nombre'; // Nombre de la variable de data a utilizar para el filtrado. Va en relación con el ng-template
	busquedaMinima: number = 2;
	data: Keyword[];
	searchTerm = '';
	languagesSection: HTMLElement;
	language : string;
	searchString? : string = "";


	constructor(private router: Router,
		private keywordsService: KeywordsService,
		//private languageService: LanguageService,
		private translatedBitsService: TranslatedBitsService) {
			this.language = LanguageService.language.getValue();
			console.log("Lenguaje inicial de Search " + this.language);
			this.translateStaticBits();
			LanguageService.language$.subscribe(data => {
				this.language = data;
				this.translateStaticBits();
			});
	}

	ngOnInit(): void {
		this.listKeywords();
		this.languagesSection = document.getElementById("languages-section") as HTMLElement;
	}

	listKeywords() {
		this.keywordsService.getKeywords().subscribe(
			data => {
				this.data = data;
			}
		)
	}

	onFocused(e: any) { }

	onChangeSearch(val: string) {
		//this.selectKeyword(val);
		this.searchTerm = val;
	}

	selectEvent(item: any) {
		this.searchTerm = item.nombre;
	}

	// NO USADO DE MOMENTO
	selectKeyword(val: string) {
		if (val.length < this.busquedaMinima) {
			this.keyword = 'id';
			console.log('menor que ' + this.busquedaMinima);
		} else {
			this.keyword = 'nombre';
			console.log('mayor que ' + this.busquedaMinima);
		}
	}

	onKeydown(event: any) {
		if (event.key === "Enter") {
			this.doSearch();
		}
	}

	doSearch() {
		if (this.searchTerm.toUpperCase() != 'C#') {
			this.router.navigateByUrl(`/search/${this.searchTerm}`);
		} else {
			this.router.navigateByUrl(`/search/${'C%23'}`);
		}
	}

	changeLanguage(language: string) {
		LanguageService.setLanguage(language);
		let childrenNodes = this.languagesSection.children;
		let arrayChildrenNodes = Array.from(childrenNodes);
		arrayChildrenNodes.forEach(element => {
			element.id == "btn-" + language ?
				element.setAttribute("class", "language-button") :
				element.setAttribute("class", "language-button img-hoverable");
		}

		);


	}
	
	translateStaticBits(){
		this.searchString = this.translatedBitsService.translatedBitsMap.get(this.language + "-search");
	}




}
