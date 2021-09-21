import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/service/language.service';
import { TranslatedBitsService } from 'src/app/service/translated-bits.service';

@Component({
	selector: 'app-contact-redirect',
	templateUrl: './contact-redirect.component.html',
	styleUrls: ['./contact-redirect.component.css']
})
export class ContactRedirectComponent implements OnInit {
	response: any;
	currentLanguage: string;
	
	resultString: string;
	returningString : string;
	indexString : string;

	constructor(private route: ActivatedRoute,
	private languageService: LanguageService,
	private translatedBitService: TranslatedBitsService) {
		languageService.language$.subscribe(data => {
			this.currentLanguage = data;
			this.translateStaticBits();
		});
	 }

	translateStaticBits() {
		this.resultString = this.response == 'true' ? 
			this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-emailSuccess")! :
			this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-emailFailure")!;
		this.returningString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-return")!;
		this.indexString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-index")!;
	}

	ngOnInit(): void {
		this.response = this.route.snapshot.paramMap.get('success');
		this.translateStaticBits();
	}
}
