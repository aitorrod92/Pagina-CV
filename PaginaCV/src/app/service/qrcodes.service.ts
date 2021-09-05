import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QRCode } from '../common/qrcode';

@Injectable({
  providedIn: 'root'
})
export class QRCodesService {

	private baseUrl = 'http://localhost:8181/api/QRCodesPDF/search/findByLanguage?language=';
	private searchUrl = '';

  constructor(private httpClient: HttpClient) { }

	getQRCode(language : string) {
		this.searchUrl = `${this.baseUrl}${language}`
		return this.httpClient.get<GetResponse>(this.searchUrl).
			pipe(map(response => response._embedded.QRCodesPDF));
	}
}

interface GetResponse {
	_embedded: {
		QRCodesPDF: QRCode[];
	}
}

