import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Email } from 'src/app/common/email';
import { EmailService } from 'src/app/service/email.service';
import { LanguageService } from 'src/app/service/language.service';
import { TranslatedBitsService } from 'src/app/service/translated-bits.service';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
	api: string = "";
	currentLanguage: string = "es";

	titleString: string;
	emailString: string;
	fullNameString: string;
	messageString: string;
	buttonString: string;
	emailHelpString: string;
	emailplaceholderString: string;
	nameplaceholderString: string;


	FormData: FormGroup;
	constructor(private route: ActivatedRoute,
		private builder: FormBuilder,
		private languageService: LanguageService,
		private translatedBitService: TranslatedBitsService,
		private http: HttpClient,
		private emailService: EmailService) {
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
		let placeholderString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-placeholder")!;
		this.emailplaceholderString = placeholderString + "email";
		this.nameplaceholderString = placeholderString + this.fullNameString.toLowerCase();
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { });
		this.FormData = this.builder.group({
			Fullname: new FormControl('', [Validators.required]),
			Email: new FormControl('', [Validators.email]),
			Comment: new FormControl('', [Validators.required])
		})
	}

	async onSubmit(FormData: any) {
		let email: Email = new Email();
		email.email = FormData.Email;
		email.subject = "Nuevo mensaje de " + FormData.Fullname + " desde la web de CV";
		email.content = FormData.Comment;
		this.emailService.sendEmail(email).subscribe(data => console.log(data));
	}
}
