import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trabajo } from '../common/trabajo';

@Injectable({
	providedIn: 'root'
})
export class TrabajoService {

	private baseUrl = 'http://localhost:8181/api';
	private searchUrl = '';

	public minimumTagCoincidenceRelatedJobs: number;


	constructor(private httpClient: HttpClient) { }

	// Devuelve un observable tras mapear el JSON devuelto por Spring Data Rest a un array de productos
	getTrabajosListbyKeyword(tags: String, jobWord: string): Observable<Trabajo[]> {
		tags = tags.replace('#', '%23');
		this.searchUrl = `${this.baseUrl}/${jobWord}/search/findByTagsContaining?tags=%20${tags}%20`;
		return this.getResponse(jobWord);
	}

	getTrabajosListbyCategory(categoryWord: string, categoria: number): Observable<Trabajo[]> {
		this.searchUrl = `${this.baseUrl}/${categoryWord}/${categoria}/trabajos`
		return this.getResponseUsingCategory(categoryWord);
	}

	getAllTrabajos(jobWord: string): Observable<Trabajo[]> {
		this.searchUrl = `${this.baseUrl}/${jobWord}`;
		return this.getResponse(jobWord);
	}

	getTrabajo(jobWord: string, contentId: number) {
		this.searchUrl = `${this.baseUrl}/${jobWord}/${contentId}`
		return this.httpClient.get<Trabajo>(this.searchUrl);
	}

	getResponse(jobWord: string) {
		if (jobWord == "trabajos") {
			return this.getResponseSpanish()
		} else {
			return this.getResponseEnglish();
		}
	}

	getResponseUsingCategory(categoryWord: string) {
		if (categoryWord == "categorias") {
			return this.getResponseSpanish()
		} else {
			return this.getResponseEnglish();
		}
	}

	getResponseSpanish(): Observable<Trabajo[]> {
		return this.httpClient.get<GetResponse>(this.searchUrl).
			pipe(map(response => response._embedded.trabajo));
	}

	getResponseEnglish(): Observable<Trabajo[]> {
		return this.httpClient.get<GetResponseJob>(this.searchUrl).
			pipe(map(response => response._embedded.job));
	}

	setMinimumTagCoincidenceRelatedJobs(length : number) {
		this.minimumTagCoincidenceRelatedJobs = length;
	}

	getMinimumTagCoincidenceRelatedJobs() {
		return this.minimumTagCoincidenceRelatedJobs;
	}
}

// Desempaqueta el JSON de la entrada "_embedded" de Spring Data Rest
interface GetResponse {
	_embedded: {
		trabajo: Trabajo[];
	}
}

interface GetResponseJob {
	_embedded: {
		job: Trabajo[];
	},
}




