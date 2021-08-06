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

	@ViewChild("chart") chart: ChartComponent;
	public chartOptions: Partial<ChartOptions> | any;

	constructor(private trabajoService: TrabajoService) {
		trabajoService.getTrabajosListbyKeyword("biologia").subscribe(data => {
			this.trabajos = data;
			//this.defineChartAttributes();
			this.update();
		})
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

		console.log("Nombres: " + arrayNombres);
		console.log(arrayObjetosFechas.length);


		this.chartOptions = {
			series: [{
				data: [{
					x: arrayNombres[0],
					y: [arrayObjetosFechas[0].x,arrayObjetosFechas[0].y],
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
