import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Email } from '../common/email';

@Injectable({
	providedIn: 'root'
})
export class EmailService {
	private baseUrl = 'http://localhost:8181/email/send';
	constructor(private httpClient: HttpClient) { }

	sendEmail(email: Email) : Observable<any> {

		return this.httpClient.post<Email>(this.baseUrl, email);
	}


}


