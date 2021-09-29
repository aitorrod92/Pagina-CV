import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from './service/language.service';
import { TranslatedBitsService } from './service/translated-bits.service';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {
	title = 'PaginaCV';
	faMailBulk = faMailBulk;
	faFacebook = faGithub;
	faLinkedin = faLinkedin;

	language = "";
	footerString?= "";

	constructor(private translatedBitsService: TranslatedBitsService,
		private languageService: LanguageService,
		private router: Router) {
		languageService.language$.subscribe(data => {
			this.language = data;
			this.translateStaticBits();
		});
	}

	/* Hace que los href actúen como routers (los href se pueden generar dinámicamente mediante typescript, 
	pero reinstancian los componentes y esto hace que el componente de búsqueda se reinicie y, con ello, el idioma) */
	@HostListener('document:click', ['$event'])
	public handleClick(event: Event): void {
		if (event.target instanceof HTMLAnchorElement) {
			const element = event.target as HTMLAnchorElement;
			if (element.className.includes('routerlink')) {
				event.preventDefault();
				const route = element?.getAttribute('href');
				if (route) {
					this.router.navigate([`/${route}`]);
				}
			}
		}
	}

	translateStaticBits() {
		this.footerString = this.translatedBitsService.translatedBitsMap.get(this.language + "-mail");
	}
}
