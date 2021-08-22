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
	private categoryUrl = '';

	constructor(private httpClient: HttpClient) { }

	getCategories(categoryWord: string): Observable<Categoria[]> {
		this.categoryUrl = `${this.baseUrl}/${categoryWord}`;
		return this.getResponse(categoryWord);
	}

	getCategoryByCategoryId(CategoryId: number, categoryWord: string): Observable<Categoria> {
		this.categoryUrl = `${this.baseUrl}/${categoryWord}/${CategoryId}`;
		return this.httpClient.get<Categoria>(this.categoryUrl);
	}

	getResponse(categoryWord: string) {
		if (categoryWord == "categorias") {
			return this.getResponseSpanish();
		} else {
			return this.getResponseEnglish();
		}
	}

	getResponseSpanish(): Observable<Categoria[]> {
		return this.httpClient.get<GetResponseCategoria>(this.categoryUrl).
			pipe(map(response => response._embedded.categoria));
	}

	getResponseEnglish(): Observable<Categoria[]> {
		return this.httpClient.get<GetResponseCategory>(this.categoryUrl).
			pipe(map(response => response._embedded.category));
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


