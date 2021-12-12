import { Injectable } from '@angular/core';
import { EmailService } from './email.service';


@Injectable({
	providedIn: 'root'
})


export class TranslatedBitsService {

	public translatedBitsMap = new Map<string, string>();
	minEmailMessageLength : number;

	constructor(emailService: EmailService) {
		this.minEmailMessageLength  = emailService.getMinEmailMessageLength();
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
		this.translatedBitsMap.set("es-mail", "Contacto");
		this.translatedBitsMap.set("en-mail", "Contact");
		this.translatedBitsMap.set("es-noResults", "No hay resultados que coincidan con la palabra clave");
		this.translatedBitsMap.set("en-noResults", "There are no results that match the keyword");
		this.translatedBitsMap.set("es-suggestion", "Se ha encontrado un t\xe9rmino parecido:");
		this.translatedBitsMap.set("en-suggestion", "A similar search term has been found:");
		this.translatedBitsMap.set("en-introText", '<a href="/content/jobs/1" class="mt-5 routerlink">Biology grad </a> with a<a href="/content/jobs/4" class="mt-5 routerlink"> master\'s degree in Teacher Training </a> who decided to change his path. I lived in Brighton (United Kingdom) from 2017 to 2020, combining a <a href="/content/jobs/7" class="mt-5 routerlink"> job at hospitality</a> with the completion of the HNC \"<a href ="/content/jobs/8" class="mt-5 routerlink">Cross-platform Application Development</a>\" and coding self-training. After finishing the course and its <a href="/content/jobs/9" class="mt-5 routerlink"> internship</a>, I worked  briefly in <a href = "/content/jobs/10 "class ="mt-5 routerlink"> Deloitte</a>. Currently I am employed as a developer at <a href="/content/jobs/11" class="mt-5 routerlink"> Sanne</a>. I consider myself hard-working, organized and full of motivation. <br> <br>');
		this.translatedBitsMap.set("es-introText", 'Graduado en <a href="/content/trabajos/1" class="mt-5 routerlink">Biolog\xeda</a> con <a href="/content/trabajos/4" class="mt-5 routerlink">m\xe1ster en Formaci\xf3n del Profesorado</a> que decidi\xf3 cambiar su rumbo. Estuve desde 2017 a 2020 viviendo en Brighton (Reino Unido), compaginando un <a href="/content/trabajos/7" class="mt-5 routerlink">empleo en hosteler\xeda</a> con la realizaci\xf3n del grado \"<a href="/content/trabajos/8" class="mt-5 routerlink">Desarrollo de Aplicaciones Multiplataforma</a>\" y la autoformaci\xf3n. Tras terminar el grado y sus <a href="/content/trabajos/9" class="mt-5 routerlink">pr\xe1cticas</a>, trabaj\xe9 brevemente en <a href="/content/trabajos/10" class="mt-5 routerlink">Deloitte</a>. Actualmente ejerzo de desarrollador en <a href="/content/trabajos/11" class="mt-5 routerlink">Sanne</a>. Me considero trabajador, organizado y lleno de motivaci\xf3n. <br> <br>');
		this.translatedBitsMap.set("en-contactTitle", 'Contact form');
		this.translatedBitsMap.set("es-contactTitle", 'Formulario de contacto');
		this.translatedBitsMap.set("en-contactButton", 'Submit');
		this.translatedBitsMap.set("es-contactButton", 'Enviar');
		this.translatedBitsMap.set("en-contactMessage", 'Message');
		this.translatedBitsMap.set("es-contactMessage", 'Mensaje');
		this.translatedBitsMap.set("en-contactFullName", 'Full Name');
		this.translatedBitsMap.set("es-contactFullName", 'Nombre completo');
		this.translatedBitsMap.set("en-placeholder", 'Enter your ');
		this.translatedBitsMap.set("es-placeholder", 'Introduce tu ');
		this.translatedBitsMap.set("es-emailSuccess", '<h2>Mensaje enviado con \xe9xito</h2><h5>Nos pondremos en contacto contigo en el menor tiempo posible</h5>');
		this.translatedBitsMap.set("en-emailSuccess", '<h2>Email delivered successfully</h2><h5>We will contact with you shortly.</h5>');
		this.translatedBitsMap.set("es-emailFailure", '<h2>Error al enviar el mensaje</h2><h5>Int\xe9ntalo de nuevo. Se ha guardado un informe de error con prop\xf3sito de mejora.</h5>');
		this.translatedBitsMap.set("en-emailFailure", '<h2>Failure in email delivery</h2><h5>Try it again. An error log has been saved for improvement purposes.</h5>');
		this.translatedBitsMap.set("es-index", 'inicio');
		this.translatedBitsMap.set("en-index", 'index');
		this.translatedBitsMap.set("es-email", "direcci\xf3n de correo electr\xf3nico");
		this.translatedBitsMap.set("en-email", "email address");
		this.translatedBitsMap.set("es-invalidEmail", "Direcci\xf3n de correo electr\xf3nico inv\xe1lida");
		this.translatedBitsMap.set("en-invalidEmail", "Invalid email address");
		this.translatedBitsMap.set("es-pleaseInputYour", "Por favor, introduce tu ");
		this.translatedBitsMap.set("en-pleaseInputYour", "Please input your ");
		this.translatedBitsMap.set("es-minLengthMessage", "El mensaje ha de tener un m\xednimo de " + this.minEmailMessageLength + " caracteres");
		this.translatedBitsMap.set("en-minLengthMessage", "Message must be at least " + this.minEmailMessageLength + " characters long");
		this.translatedBitsMap.set("en-current", "current");
		this.translatedBitsMap.set("es-current", "actuales");
		this.translatedBitsMap.set("en-updated", "Updated");
		this.translatedBitsMap.set("es-updated", "Actualizado");
		this.translatedBitsMap.set("es-relatedJobs", "Empleos relacionados");
		this.translatedBitsMap.set("en-relatedEducation", "Related education");
		this.translatedBitsMap.set("es-relatedEducation", "Formaci\xf3n relacionada");



	}
}
