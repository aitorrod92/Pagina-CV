import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	constructor(private router: Router) { }
	
	keyword = 'value'; // Nombre de la variable de data a utilizar para el filtrado. Va en relación con el ng-template
	
	// OBTENER DE UNA NUEVA BASE DE DATOS Y SOLUCIONAR ACENTOS
	data = [{ id: 1, value: 'Informatica' }, { id: 2, value: 'Biologia' }, { id: 3, value: 'Docencia' },
	{ id: 4, value: 'Ciencia' }, { id: 5, value: 'Grado' }, { id: 6, value: 'Universidad' },
	{ id: 7, value: 'Investigación' }, { id: 8, value: 'Prácticas' }, { id: 9, value: 'Enseñanza' },
	{ id: 10, value: 'Máster' }, { id: 11, value: 'Venta' }, { id: 12, value: 'Cara al público' },
	{ id: 13, value: 'Trabajo' }, { id: 14, value: 'Cocina' }, { id: 15, value: 'Hostelería' },
	{ id: 16, value: 'Limpieza' }, { id: 17, value: 'Porteo' }, { id: 18, value: 'Formación' },
	{ id: 19, value: 'IT' }, { id: 20, value: 'FP' }, { id: 21, value: 'Grado superior' },
	{ id: 22, value: 'Software' }, { id: 23, value: 'Programación' }, { id: 24, value: 'Bases de datos'},
	{ id: 25, value: 'Desarrollo' }, { id: 26, value: 'Wordpress' }, { id: 27, value: 'Java' },
	{ id: 28, value: 'CSS' }, { id: 29, value: 'Consultoría' }, { id: 30, value: 'SAP' },
	{ id: 31, value: 'Inglés' }, { id: 32, value: 'IELTS' }, { id: 33, value: 'British Council' },
	{ id: 34, value: 'C1' }, { id: 35, value: 'Chino' }, { id: 36, value: 'Confucio' },
	{ id: 37, value: 'HSK' }, { id: 38, value: 'A2' }, { id: 39, value: 'Castellano' },
	{ id: 40, value: 'Español' }, { id: 41, value: 'Nativo' }];
	
	searchTerm = '';

	ngOnInit(): void { }

	onFocused(e: any) { // PUEDE SER ÚTIL POSTERIORMENTE
		console.log("seleccionado");
	}

	onChangeSearch(val: string) {
		this.searchTerm = val;
	}

	doSearch() {
		console.log("buscando " + this.searchTerm)
		this.router.navigateByUrl(`/search/${this.searchTerm}`);
	}

	selectEvent(item: any) {
		this.searchTerm = item.value;
	}

}
