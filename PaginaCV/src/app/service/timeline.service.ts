import { Injectable } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { Trabajo } from '../common/trabajo';
import { ChartOptions } from '../lista-trabajos/lista-trabajos.component';

@Injectable({
	providedIn: 'root'
})
export class TimelineService {

	fillColors: string[] = ["#008FFB", "#00E396", "#FEB019", "#FF4560"];
	
	trabajos: Trabajo[];
	chart: ChartComponent
	chartOptions: Partial<ChartOptions> | any;

	constructor() { }

	generateTimeline(trabajos: Trabajo[], chart: ChartComponent) : ChartComponent{
		this.trabajos = trabajos;
		this.chart = chart;
		
		console.log(trabajos);
		
		this.defineChartAttributes();

		this.update();

		return chart;
	}

	getChartOptions() : Partial<ChartOptions> | any{
		return this.chartOptions;
	}

	update() {
		var arrayNombres: string[] = [];
		var objetoFechas: { x: number; y: number };
		var arrayObjetosFechas: typeof objetoFechas[] = [];
		var arrayData = [];

		this.trabajos.forEach(element => {
			arrayNombres.push(element.nombre);
			const nuevoObjeto =
				({
					x: new Date(element.fechaInicio).getTime(),
					y: new Date(element.fechaFin).getTime()
				})
			if (Number.isNaN(nuevoObjeto.y)) {
				nuevoObjeto.y = new Date().getTime();
			}
			arrayObjetosFechas.push(nuevoObjeto);
		})

		for (let i = 0; i < arrayNombres.length; i++) {
			arrayData.push
				({
					x: arrayNombres[i],
					y: [arrayObjetosFechas[i].x, arrayObjetosFechas[i].y],
					fillColor: this.fillColors[i]
				})
		}

		this.chartOptions.series = [{
			data: arrayData
		}];

	}


	defineChartAttributes() {
		this.chartOptions = {
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
