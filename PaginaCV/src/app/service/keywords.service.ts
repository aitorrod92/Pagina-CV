import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Keyword } from '../common/keyword';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class KeywordsService {

	private baseUrl = 'http://localhost:8181/api/';
	constructor(private httpClient: HttpClient) { }

	/*getNumberOfKeywords() : number {
		
		return this.httpClient.get<GetResponseKeywords>(this.url).pipe(map(response => response._embedded.keyword));

	}*/

	getKeywords(language: string): Observable<Keyword[]> {
		return language == "es" ? this.getResponseSpanish() : this.getResponseEnglish();
	}

	getResponseSpanish() {
		let url = this.baseUrl + "palabrasclave";
		return this.httpClient.get<GetResponsePalabrasClave>(url).pipe(map(response => response._embedded.palabraclave));
	}

	getResponseEnglish(): Observable<Keyword[]> {
		let url = this.baseUrl + "keywords";
		return this.httpClient.get<GetResponseKeywords>(url).pipe(map(response => response._embedded.keyword));
	}
}

interface GetResponseKeywords {
	_embedded: {
		keyword: Keyword[];
	},
}

interface GetResponsePalabrasClave {
	_embedded: {
		palabraclave: Keyword[];
	},
}



interface GetPageResponse {
	// HABRÍA QUE CREAR EL DTO, INCLUIRLO AQUÍ, RECUPERAR el valor de total elements, ponerlo como size
	page: {
		keyword: Keyword[];
	},
}

