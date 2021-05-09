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
	trabajo: Trabajo [] = [];
	
	constructor(private httpClient: HttpClient) { }

	// Devuelve un observable tras mapear el JSON devuelto por Spring Data Rest a un array de productos
	getTrabajosList(): Observable<Trabajo[]> {
		return this.httpClient.get<GetResponse>(this.baseUrl).
			pipe(map(response => response._embedded.trabajo));
	}
}

// Desempaqueta el JSON de la entrada "_embedded" de Spring Data Rest
interface GetResponse {
	_embedded: {
		trabajo: Trabajo[];
	}
}



