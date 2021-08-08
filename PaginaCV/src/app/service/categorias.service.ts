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

	getCategories(categoryWord: string): Observable<Categoria[]> {
		let categoryUrl = `${this.baseUrl}/${categoryWord}`;
		if (categoryWord == "categorias") {
			return this.httpClient.get<GetResponseCategoria>(categoryUrl).
			pipe(map(response => response._embedded.categoria));
		} else {
			return this.httpClient.get<GetResponseCategory>(categoryUrl).
			pipe(map(response => response._embedded.category));
		}

	}

	getCategoryByCategoryId(CategoryId: number): Observable<Categoria> {
		let categoryUrl = `${this.baseUrl}/categorias/${CategoryId}`;
		return this.httpClient.get<Categoria>(categoryUrl);
	}
}

interface GetResponseCategoria {
	_embedded: {
		categoria: Categoria[];
	},
}

interface GetResponseCategory {
	_embedded: {
		category: Categoria[];
	},
}


