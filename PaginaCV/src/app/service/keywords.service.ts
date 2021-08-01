import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Keyword } from '../common/keyword';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class KeywordsService {

	private url = 'http://localhost:8181/api/keywords';
	constructor(private httpClient: HttpClient) { }

	/*getNumberOfKeywords() : number {
		
		return this.httpClient.get<GetResponseKeywords>(this.url).pipe(map(response => response._embedded.keyword));

	}*/

	getKeywords(): Observable<Keyword[]> {
		return this.httpClient.get<GetResponseKeywords>(this.url).pipe(map(response => response._embedded.keyword));
	}
}

interface GetResponseKeywords {
	_embedded: {
		keyword: Keyword[];
	},
}


interface GetPageResponse { 
	// HABRÍA QUE CREAR EL DTO, INCLUIRLO AQUÍ, RECUPERAR el valor de total elements, ponerlo como size
	page: {
		keyword: Keyword[];
	},
}

