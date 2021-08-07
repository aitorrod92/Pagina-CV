import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../common/categoria';

@Injectable({
	providedIn: 'root'
})
export class CategoriasService {
	private baseUrl = 'http://localhost:8181/api';

	constructor(private httpClient: HttpClient) { }

	getCategories(): Observable<Categoria[]> {
		let categoryUrl = this.baseUrl + "/categorias";
		return this.httpClient.get<GetResponseCategory>(categoryUrl).
			pipe(map(response => response._embedded.categoria));
	}

	getCategoryByCategoryId(CategoryId:number): Observable<Categoria> {
		let categoryUrl = `${this.baseUrl}/categorias/${CategoryId}`;
		return this.httpClient.get<Categoria>(categoryUrl);
	}
}

interface GetResponseCategory {
	_embedded: {
		categoria: Categoria[];
	},
}
