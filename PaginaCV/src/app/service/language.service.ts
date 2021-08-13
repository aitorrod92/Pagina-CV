import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {
   // Create a subject - The thing that will be watched by the observable
   public language = new Subject<string>();

   // Create an observable to watch the subject and send out a stream of updates (You will subscribe to this to get the update stream)
   public language$ = this.language.asObservable() //Has a $ 

	
	public setLanguage(newLanguage : string){
		this.language.next(newLanguage);
	}
	
	constructor() { }
}
