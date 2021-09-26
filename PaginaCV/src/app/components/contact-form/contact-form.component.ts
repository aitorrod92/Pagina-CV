import { HttpClient } from '@angular/common/http';
import { Component, Injectable, ModuleWithProviders, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

@Injectable({
	providedIn: 'root'
})


export class ContactFormComponent implements OnInit {

	api: string = "";
	currentLanguage: string = "es";

	titleString: string;
	emailString: string;
	fullNameString: string;
	messageString: string;
	buttonString: string;

	emailplaceholderString: string;
	nameplaceholderString: string;

	emailRequiredString: string;
	invalidEmailString: string;
	fullNameRequiredString: string;
	commentRequiredString: string;
	commentMinLengthString: string;
	//minEmailMessageLength: number;

	emailRegexPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

	contactForm: FormGroup;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private builder: FormBuilder,
		private languageService: LanguageService,
		private translatedBitService: TranslatedBitsService,
		private http: HttpClient,
		private emailService: EmailService) {
		languageService.language$.subscribe(data => {
			this.currentLanguage = data;
			this.translateStaticBits();
		});
		/*this.minEmailMessageLength = this.emailService.getMinEmailMessageLength();
		console.log("minimo " + this.minEmailMessageLength);*/
	}



	translateStaticBits() {
		this.translateTitlesAndButton();
		this.translatePlaceholders();
		this.translateValidationErrorMessages();
	}

	translateTitlesAndButton() {
		this.titleString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactTitle")!;
		this.buttonString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactButton")!;
		this.messageString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactMessage")!;
		this.fullNameString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactFullName")!;
	}

	translatePlaceholders() {
		let placeholderString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-placeholder")!;
		this.emailplaceholderString = placeholderString + "email";
		this.nameplaceholderString = placeholderString + this.fullNameString.toLowerCase();
	}

	translateValidationErrorMessages() {
		let inputYourString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-pleaseInputYour")!;
		this.emailRequiredString = inputYourString + this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-email")!;
		this.fullNameRequiredString = inputYourString + this.fullNameString.toLowerCase();
		this.commentRequiredString = inputYourString + this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-contactMessage")!.toLowerCase();
		this.invalidEmailString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-invalidEmail")!;
		this.commentMinLengthString = this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-minLengthMessage")! + " ("
			+ this.translatedBitService.translatedBitsMap.get(this.currentLanguage + "-current")! + ": ";
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { });
		this.contactForm = this.builder.group({
			contactForm: this.builder.group({
				'Fullname': new FormControl('',
					{ validators: [Validators.required], updateOn: 'blur' }),
				'Email': new FormControl('',
					{ validators: [Validators.pattern(this.emailRegexPattern), Validators.required], updateOn: 'blur' }),
				'Comment': new FormControl('',
					{ validators: [Validators.required, Validators.minLength(30)], updateOn: 'blur' })
			})

		})

	}

	get fullname() { return this.contactForm.get('contactForm.Fullname'); }
	get email() { return this.contactForm.get('contactForm.Email'); }
	get comment() { return this.contactForm.get('contactForm.Comment'); }



	async onSubmit(FormData: any) {
		let email: Email = new Email();
		email.email = FormData.Email;
		email.subject = "Nuevo mensaje de " + FormData.Fullname + " desde la web de CV";
		email.content = FormData.Comment;
		this.emailService.sendEmail(email).subscribe(data => {
			this.router.navigate([data], { relativeTo: this.route });
		})
	}
}

