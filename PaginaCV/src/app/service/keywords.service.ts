import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Keyword } from '../common/keyword';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class KeywordsService {
	maximumSearchTolerance: number;

	private baseUrl = 'http://localhost:8181/api/';
	constructor(private httpClient: HttpClient) { }

	private spanishKeywords: Observable<Keyword[]>;
	private englishKeywords: Observable<Keyword[]>;


	getKeywords(language: string): Observable<Keyword[]> {
		return language == "es" ? this.getSpanishKeywords() : this.getEnglishKeywords();
	}

	getSpanishKeywords() {
		return this.spanishKeywords == undefined ? this.getResponseSpanish() : this.spanishKeywords;
	}

	getResponseSpanish() {
		let url = this.baseUrl + "palabrasclave";
		this.spanishKeywords = this.httpClient.get<GetResponsePalabrasClave>(url).pipe(map(response => response._embedded.palabraclave));
		return this.spanishKeywords;
	}

	getEnglishKeywords() {
		return this.englishKeywords == undefined ? this.getResponseEnglish() : this.englishKeywords;
	}


	getResponseEnglish(): Observable<Keyword[]> {
		let url = this.baseUrl + "keywords";
		this.englishKeywords = this.httpClient.get<GetResponseKeywords>(url).pipe(map(response => response._embedded.keyword));
		return this.englishKeywords;
	}

	setMaximumSearchTolerance(maximumSearchTolerance: number) {
		this.maximumSearchTolerance = maximumSearchTolerance;
	}

	getMaximumSearchTolerance(): number {
		return this.maximumSearchTolerance;
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

