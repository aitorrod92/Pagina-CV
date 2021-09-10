import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/service/language.service';
import { TranslatedBitsService } from 'src/app/service/translated-bits.service';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

	currentLanguage: string = "es";

	titleString: string;
	emailString: string;
	fullNameString: string;
	messageString: string;
	buttonString: string;
	emailHelpString : string;
	emailPromptString : string;
	namePromptString : string;


	FormData: FormGroup;
	constructor(private route: ActivatedRoute,
		private builder: FormBuilder,
		private languageService: LanguageService,
		private translatedBitService: TranslatedBitsService) {
		languageService.language$.subscribe(data => {
			this.currentLanguage = data;
			this.translateStaticBits();
		});
	}

	translateStaticBits() {
		this.titleString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactTitle")!;
		this.buttonString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactButton")!;
		this.messageString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactMessage")!;
		this.fullNameString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactFullName")!;
		this.emailHelpString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-emailHelp")!;
		let promptString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-prompt")!;
		this.emailPromptString = promptString + "email";
		this.namePromptString = promptString + this.fullNameString.toLowerCase();
		
		
		/*emailString: string;
		fullNameString: string;
		messageString: string;
		buttonString: string;*/
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { });
		this.FormData = this.builder.group({
			Fullname: new FormControl('', [Validators.required]),
			Email: new FormControl('', [Validators.email]),
			Comment: new FormControl('', [Validators.required])
		})
	}

	onSubmit(FormData: any) {
		console.log(FormData)
		/*this.contact.PostMessage(FormData)
			.subscribe(response => {
				location.href = 'https://mailthis.to/confirm'
				console.log(response)
			}, error => {
				console.warn(error.responseText)
				console.log({ error })
			})*/
	}
}
