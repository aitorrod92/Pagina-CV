import { Component, ViewChild } from "@angular/core";
import * as ApexCharts from "apexcharts";
import * as moment from "moment";

import {
	ChartComponent,
	ApexAxisChartSeries,
	ApexChart,
	ApexPlotOptions,
	ApexXAxis,
	ApexFill,
	ApexDataLabels,
	ApexYAxis,
	ApexGrid
} from "ng-apexcharts";

import { Trabajo } from "src/app/common/trabajo";
import { LanguageService } from "src/app/service/language.service";
import { TrabajoService } from "src/app/service/trabajo.service";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	fill: ApexFill;
	dataLabels: ApexDataLabels;
	grid: ApexGrid;
	yaxis: ApexYAxis;
	xaxis: ApexXAxis;
	plotOptions: ApexPlotOptions;
};

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

	trabajos: Trabajo[];
	language: string = "es";
	jobWord: string;
	spanishIntroText= 'Graduado en <a href="/content/trabajos/1" class="mt-5">Biolog\xeda</a> con <a href="/content/trabajos/4" class="mt-5">m\xe1ster en Formaci\xf3n del Profesorado</a> que decidi\xf3 cambiar su rumbo. Estuve desde 2017 a 2020 viviendo en Brighton (Reino Unido), compaginando un <a href="/content/trabajos/7" class="mt-5">empleo en hosteler\xeda</a> con la realizaci\xf3n del grado \"<a href="/content/trabajos/8" class="mt-5">Desarrollo de Aplicaciones Multiplataforma</a>\" y la autoformaci\xf3n. Tras terminar el grado y sus <a href="/content/trabajos/9" class="mt-5">pr\xe1cticas</a>, trabaj\xe9 brevemente en <a href="/content/trabajos/10" class="mt-5">Deloitte</a>. Actualmente ejerzo de desarrollador en <a href="/content/trabajos/11" class="mt-5">Sanne</a>. Me considero trabajador, organizado y lleno de motivaci\xf3n. <br> <br>';
	englishIntroText= '<a href="/content/jobs/1" class="mt-5">Biology grad </a> with a<a href="/content/jobs/4" class="mt-5"> master\'s degree in Teacher Training </a> who decided to change his path. I lived in Brighton (United Kingdom) from 2017 to 2020, combining a <a href="/content/jobs/7" class="mt-5"> job at hospitality</a> with the completion of the HNC \"<a href ="/content/jobs/8" class="mt-5">Cross-platform Application Development </a>\" and coding self-training. After finishing the course and its <a href="/content/jobs/9" class="mt-5"> internship </a>, I worked  briefly in <a href = "/content/jobs/10 "class =" mt-5 "> Deloitte </a>. Nowadays, I am employes as a developer at <a href="/content/jobs/11" class="mt-5"> Sanne </a>. I consider myself hard-working, organized and full of motivation. <br> <br>';
	
	// Esto asume que las rutas no van a cambiar
	htmlText = this.spanishIntroText;

	@ViewChild("chart") chart: ChartComponent;
	public chartOptions: Partial<ChartOptions> | any;

	constructor(private trabajoService: TrabajoService,
		private languageService: LanguageService) {
		languageService.language$.subscribe(data => {
			this.language = data;
			//this.update(); 
			this.translateStaticBits();
			this.jobWord = this.language ? "trabajos" : "jobs";
		}
		)

		/*trabajoService.getTrabajosListbyKeyword("informatica", this.jobWord).subscribe(data => {
			this.trabajos = data;
			//this.defineChartAttributes();
			this.update();
		})*/
	}

	translateStaticBits() {
		this.htmlText = this.language == "es" ? this.spanishIntroText: this.englishIntroText;
	}


	update() {
		var arrayNombres: string[] = [];
		var objetoFechas: { x: number; y: number };
		var arrayObjetosFechas: typeof objetoFechas[] = [];

		this.trabajos.forEach(element => {
			arrayNombres.push(element.nombre);
			const nuevoObjeto = <typeof objetoFechas>
				({
					x: new Date(element.fechaInicio).getTime(),
					y: new Date(element.fechaFin).getTime()
				})
			arrayObjetosFechas.push(nuevoObjeto);
		}
		)

		this.chartOptions = {
			series: [{
				data: [{
					x: arrayNombres[0],
					y: [arrayObjetosFechas[0].x, arrayObjetosFechas[0].y],
					fillColor: "#008FFB"
				},
				{
					x: arrayNombres[1],
					y: [arrayObjetosFechas[1].x, arrayObjetosFechas[1].y],
					fillColor: "#775DD0"
				},
				{
					x: arrayNombres[2],
					y: [arrayObjetosFechas[2].x, arrayObjetosFechas[2].y],
					fillColor: "#00E396"
				},
				{
					x: arrayNombres[3],
					y: [arrayObjetosFechas[3].x, arrayObjetosFechas[3].y],
					fillColor: "#FEB019"
				},
				]
			}],
			chart: {
				height: 350,
				width: 700,
				type: "rangeBar"
			},
			plotOptions: {
				bar: {
					horizontal: true,
					distributed: true,
					dataLabels: {
						hideOverflowingLabels: true
					}
				}
			},
			dataLabels: {
				enabled: true,
				//@ts-ignore
				formatter: function(val, opts) {
					var label = opts.w.globals.labels[opts.dataPointIndex];
					//@ts-ignore
					var a = moment(val[0]);
					//@ts-ignore
					var b = moment(val[1]);
					var diff = b.diff(a, "days");
					return label + ": " + diff + (diff > 1 ? " days" : " day");
				},
				style: {
					colors: ["#f3f4f5", "#fff"]
				}
			},
			xaxis: {
				type: "datetime"
			},
			yaxis: {
				show: false
			},
			grid: {
				row: {
					colors: ["#f3f4f5", "#fff"],
					opacity: 1
				}
			}
		};
		console.log(arrayNombres.length);
		for (let i = 0; i < arrayNombres.length; i++) {
			console.log("Nombre: " + arrayNombres[0] + " Fechas " + arrayObjetosFechas[0].x + " " + arrayObjetosFechas[0].y);
			this.chart.updateSeries([{
				data: [{
					x: arrayNombres[i],
					y: [arrayObjetosFechas[i].x, arrayObjetosFechas[i].y],
					fillColor: "#008FFB"
				}]
			}], true)
		};


		this.chart.render();
	}


	defineChartAttributes() {
		this.chartOptions = {
			series: [{
				data: [{
					x: this.trabajos[0].nombre,
					y: [new Date("2019-02-27").getTime(),
					new Date("2019-03-27").getTime()],
					fillColor: "#008FFB"
				}, {
					x: this.trabajos[1].nombre,
					y: [new Date("2019-02-27").getTime(),
					new Date("2019-03-27").getTime()],
					fillColor: "#008FFB"
				}]
			}],
			chart: {
				height: 350,
				width: 700,
				type: "rangeBar"
			},
			plotOptions: {
				bar: {
					horizontal: true,
					distributed: true,
					dataLabels: {
						hideOverflowingLabels: true
					}
				}
			},
			dataLabels: {
				enabled: true,
				//@ts-ignore
				formatter: function(val, opts) {
					var label = opts.w.globals.labels[opts.dataPointIndex];
					//@ts-ignore
					var a = moment(val[0]);
					//@ts-ignore
					var b = moment(val[1]);
					var diff = b.diff(a, "days");
					return label + ": " + diff + (diff > 1 ? " days" : " day");
				},
				style: {
					colors: ["#f3f4f5", "#fff"]
				}
			},
			xaxis: {
				type: "datetime"
			},
			yaxis: {
				show: false
			},
			grid: {
				row: {
					colors: ["#f3f4f5", "#fff"],
					opacity: 1
				}
			}
		};

	}
}


/*

{
							data:   [
								{
									x: element.nombre,
									y: [
										new Date(element.fechaInicio).getTime(),
										new Date(element.fechaFin).getTime()
									],
									fillColor: "#008FFB"
								}
							]
						}


							fillColor: "#008FFB"

							fillColor: "#775DD0"

							fillColor: "#00E396"

							fillColor: "#FEB019"

							fillColor: "#FF4560"

							fillColor: "#FF4560"

							fillColor: "#FF4560"

		*/
