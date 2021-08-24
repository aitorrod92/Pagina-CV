import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {
   // Create a subject - The thing that will be watched by the observable. 
   // Being a BehaviorSubject, last value will be sent in the moment someone subscribe to it
   public language : BehaviorSubject<string>;

   // Create an observable to watch the subject and send out a stream of updates 
   // (You will subscribe to this to get the update stream)
   public language$: Observable<string>;//Has a $ 

	//Change the value of the subject, sending it to all the suscribers
	public setLanguage(newLanguage : string){
		this.language.next(newLanguage);
		console.log(this.language.getValue() + " <-- supuestamente cambiado");
	}
	
	public setInitialLanguage(language : string){
		this.language = new BehaviorSubject<string>(language);
		this.language$ = this.language.asObservable();
	}
	
	constructor() {	 }
}
