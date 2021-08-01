import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeywordsService } from 'src/app/service/keywords.service';
import { Keyword } from 'src/app/common/keyword';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	keyword = 'nombre'; // Nombre de la variable de data a utilizar para el filtrado. Va en relaci�n con el ng-template
	busquedaMinima: number = 2;
	data: Keyword[];
	searchTerm = '';

	constructor(private router: Router,
		private keywordsService: KeywordsService) { }

	ngOnInit(): void {
		this.listKeywords();
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
		console.log(val);
		console.log(val.length);
		//this.selectKeyword(val);
		this.searchTerm = val;
	}

	selectEvent(item: any) {
		this.searchTerm = item.nombre;
	}


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



}
