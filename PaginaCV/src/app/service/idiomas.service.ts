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
	private searchUrl = '';
	idioma: Idioma[] = [];

	constructor(private httpClient: HttpClient) { }

	getLanguages(languageWord: string): Observable<Idioma[]> {
		this.searchUrl = `${this.baseUrl}/${languageWord}`;
		return languageWord == "idiomas" ? 
			this.getResponseSpanish() : 
			this.getResponseEnglish();
	}

	getIdioma(languageWord: string, contentId: number) {
		this.searchUrl = `${this.baseUrl}/${languageWord}/${contentId}`
		return this.httpClient.get<Idioma>(this.searchUrl);
	}

	getResponseSpanish(): Observable<Idioma[]> {
		return this.httpClient.get<GetResponse>(this.searchUrl).
			pipe(map(response => response._embedded.idioma));
	}

	getResponseEnglish(): Observable<Idioma[]> {
		return this.httpClient.get<GetResponseLanguage>(this.searchUrl).
			pipe(map(response => response._embedded.language));
	}
}

// Desempaqueta el JSON de la entrada "_embedded" de Spring Data Rest
interface GetResponse {
	_embedded: {
		idioma: Idioma[];
	}
}

interface GetResponseLanguage {
	_embedded: {
		language: Idioma[];
	}
}


