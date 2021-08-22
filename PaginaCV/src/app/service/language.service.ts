import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {
   // Create a subject - The thing that will be watched by the observable. 
   // Being a BehaviorSubject, last value will be sent in the moment someone subscribe to it
   public static language = new BehaviorSubject<string>("es");

   // Create an observable to watch the subject and send out a stream of updates 
   // (You will subscribe to this to get the update stream)
   public static language$ = LanguageService.language.asObservable() //Has a $ 

	//Change the value of the subject, sending it to all the suscribers
	public static setLanguage(newLanguage : string){
		LanguageService.language.next(newLanguage);
		console.log(LanguageService.language.getValue() + " <-- supuestamente cambiado");
	}
	
	constructor() {	 }
}
