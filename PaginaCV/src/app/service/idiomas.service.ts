import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idioma } from '../common/idioma';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class IdiomasService {
	private baseUrl = 'http://localhost:8181/api';
	idioma: Idioma[] = [];

	constructor(private httpClient: HttpClient) { }

	getIdiomas(): Observable<Idioma[]> {
		const searchUrl = `${this.baseUrl}/idiomas`;
		return this.httpClient.get<GetResponse>(searchUrl).
			pipe(map(response => response._embedded.idioma));
	}

	getIdioma(languageWord: string, contentId: number) {
		const searchUrl = `${this.baseUrl}/${languageWord}/${contentId}`
		return this.httpClient.get<Idioma>(searchUrl);
	}
}

// Desempaqueta el JSON de la entrada "_embedded" de Spring Data Rest
interface GetResponse {
	_embedded: {
		idioma: Idioma[];
	}
}

