import { Component } from '@angular/core';
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
	footerString? = "";

	constructor(private translatedBitsService : TranslatedBitsService) {
		LanguageService.language$.subscribe(data => {
			this.language = data;
			this.translateStaticBits();
		});
	}

	translateStaticBits() {
		this.footerString = this.translatedBitsService.translatedBitsMap.get(this.language + "-mail");
	}
}
