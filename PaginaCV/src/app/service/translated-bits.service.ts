import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})


export class TranslatedBitsService {

	public translatedBitsMap = new Map<string, string>();

	constructor() {
		this.defineTranslatedBitsMap();
	}

	defineTranslatedBitsMap() {
		this.translatedBitsMap.set("es-return", "Volver a la p\xe1gina de ");
		this.translatedBitsMap.set("es-description", "Descripci\xf3n");
		this.translatedBitsMap.set("en-return", "Return to ");
		this.translatedBitsMap.set("en-description", "Description");
		this.translatedBitsMap.set("es-search", "Buscar");
		this.translatedBitsMap.set("en-search", "Search");
		this.translatedBitsMap.set("es-mail", "Correo");
		this.translatedBitsMap.set("en-mail", "Mail");
	}
}
