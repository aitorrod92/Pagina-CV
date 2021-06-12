import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../common/categoria';

@Injectable({
	providedIn: 'root'
})
export class CategoriasService {
	private categoryUrl = 'http://localhost:8181/api/categorias';

	constructor(private httpClient: HttpClient) { }

	getCategories() : Observable<Categoria[]>  {
		return this.httpClient.get<GetResponseCategory>(this.categoryUrl).
			pipe(map(response => response._embedded.categoria));
	}
}
	interface GetResponseCategory {
	_embedded: {
		categoria: Categoria[];
	},

}
