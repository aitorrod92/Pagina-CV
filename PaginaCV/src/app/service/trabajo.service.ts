import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trabajo } from '../common/trabajo';

@Injectable({
	providedIn: 'root'
})
export class TrabajoService {


	private baseUrl = 'http://localhost:8181/api';
	
	constructor(private httpClient: HttpClient) { }

	// Devuelve un observable tras mapear el JSON devuelto por Spring Data Rest a un array de productos
	getTrabajosListbyKeyword(tags: String): Observable<Trabajo[]> {
		if (tags == 'C#') tags = 'C%23';
		const searchUrl = `${this.baseUrl}/trabajos/search/findByTagsContaining?tags=${tags}`;
		return this.httpClient.get<GetResponse>(searchUrl).
			pipe(map(response => response._embedded.trabajo));
	}

	getTrabajosListbyCategory(categoria: number): Observable<Trabajo[]> {
		const searchUrl = `${this.baseUrl}/categorias/${categoria}/trabajos`;
		return this.httpClient.get<GetResponse>(searchUrl).
			pipe(map(response => response._embedded.trabajo));
	}
	
	getAllTrabajos(): Observable<Trabajo[]> {
		const searchUrl = `${this.baseUrl}/trabajos`;
		return this.httpClient.get<GetResponse>(searchUrl).
			pipe(map(response => response._embedded.trabajo));
	}

	getTrabajo(contentId: number) {
		const searchUrl = `${this.baseUrl}/trabajos/${contentId}`	
		return this.httpClient.get<Trabajo>(searchUrl);
	}
}


// Desempaqueta el JSON de la entrada "_embedded" de Spring Data Rest
interface GetResponse {
	_embedded: {
		trabajo: Trabajo[];
	}
}




