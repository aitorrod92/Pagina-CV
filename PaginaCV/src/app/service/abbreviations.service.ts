import { Injectable } from '@angular/core';
import { Trabajo } from '../common/trabajo';

@Injectable({
	providedIn: 'root'
})
export class AbbreviationsService {
	public abbreviationsMap = new Map<string, string>();

	constructor() {
		this.defineAbbreviationsMap();
	}

	defineAbbreviationsMap() {
		this.abbreviationsMap.set("Development of Multiplatform Applications (HNC)", "Development of Multiplatform Applications");
		this.abbreviationsMap.set("Grado Superior en Desarrollo de Aplicaciones Multiplataforma", "Desarrollo de Aplicaciones Multiplataforma");
		this.abbreviationsMap.set("Master's Degree in Teacher Training in Secondary Education (Biology)", "Teacher Training in Secondary Education (Biology)")
		this.abbreviationsMap.set("M\xe1ster en Formaci\xf3n del Profesorado en Educaci\xf3n Secundaria (Biolog\xeda)", "Formaci\xf3n del Profesorado en ESO (Biolog\xeda))")
	}

	public abbreviateName(job: Trabajo): Trabajo {
		if (this.abbreviationsMap.has(job.nombre)) {
			job.nombre = this.abbreviationsMap.get(job.nombre)!;
		}
		return job;
	}
}