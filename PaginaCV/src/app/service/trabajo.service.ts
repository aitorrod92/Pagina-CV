import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trabajo } from '../common/trabajo';

@Injectable({
	providedIn: 'root'
})
export class TrabajoService {

	private baseUrl = 'http://localhost:8181/api/trabajos';
	trabajo: Trabajo[] = [];
	constructor(private httpClient: HttpClient) { }

	// Devuelve un observable tras mapear el JSON devuelto por Spring Data Rest a un array de productos
	getTrabajosListbyKeyword(tags: String): Observable<Trabajo[]> {
		const searchUrl = `${this.baseUrl}/search/findByTagsContaining?tags=${tags}`;
		return this.httpClient.get<GetResponse>(searchUrl).
			pipe(map(response => response._embedded.trabajo));
	}

	getTrabajosListbyCategory(categoria: String): Observable<Trabajo[]> {
		const searchUrl = `http://localhost:8181/api/categorias/2/trabajos`;
		return this.httpClient.get<GetResponse>(searchUrl).
			pipe(map(response => response._embedded.trabajo));
	}

	getAllTrabajos(): Observable<Trabajo[]> {
		const searchUrl = `${this.baseUrl}`;
		return this.httpClient.get<GetResponse>(searchUrl).
			pipe(map(response => response._embedded.trabajo));
	}
}


// Desempaqueta el JSON de la entrada "_embedded" de Spring Data Rest
interface GetResponse {
	_embedded: {
		trabajo: Trabajo[];
	}
}



