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
		this.translatedBitsMap.set("es-searchPlaceholder", "Busca por palabras clave...");
		this.translatedBitsMap.set("en-searchPlaceholder", "Search by keywords...");
		this.translatedBitsMap.set("es-mail", "Correo");
		this.translatedBitsMap.set("en-mail", "Mail");
		this.translatedBitsMap.set("es-noResults", "No hay resultados que coincidan con la palabra clave");
		this.translatedBitsMap.set("en-noResults", "There are no results that match the keyword");
		this.translatedBitsMap.set("es-suggestion", "Se ha encontrado un t\xe9rmino parecido:");
		this.translatedBitsMap.set("en-suggestion", "A similar search term has been found:");


	}
}