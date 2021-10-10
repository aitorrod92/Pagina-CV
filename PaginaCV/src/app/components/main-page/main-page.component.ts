import { Component, ViewChild } from "@angular/core";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from "@techiediaries/ngx-qrcode";
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
import { QRCode } from "src/app/common/qrcode";

import { Trabajo } from "src/app/common/trabajo";
import { LanguageService } from "src/app/service/language.service";
import { QRCodesService } from "src/app/service/qrcodes.service";
import { TrabajoService } from "src/app/service/trabajo.service";
import { TranslatedBitsService } from "src/app/service/translated-bits.service";

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
	language: string;
	jobWord: string;
	updatedString: string;

	htmlText?: string;
	CVupdateDateString: string;
	fillColors: string[] = ["#008FFB", "#00E396", "#FEB019", "#FF4560"];

	// QR and some properties
	QRCode: QRCode;
	elementType = NgxQrcodeElementTypes.URL;
	correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
	public qrScale = 2.7;

	@ViewChild("chart") chart: ChartComponent;
	public chartOptions: Partial<ChartOptions> | any;

	constructor(private trabajoService: TrabajoService,
		private languageService: LanguageService,
		private qrCodesService: QRCodesService,
		private translatedBitsService: TranslatedBitsService) {
		languageService.language$.subscribe(data => {
			this.language = data;
			//this.update(); 
			this.translateStaticBits();
			this.adaptQR();
			this.jobWord = this.language ? "trabajos" : "jobs";
		})

		trabajoService.getTrabajosListbyKeyword("hosteleria", this.jobWord).subscribe(data => {
			this.trabajos = data;
			this.defineChartAttributes();
			this.update();
		})
	}

	adaptQR() {
		this.qrCodesService.getQRCode(this.language).subscribe(data => {
			this.QRCode = data[0];
			this.CVupdateDateString =
				this.QRCode.buttonLink.substring(this.QRCode.buttonLink.lastIndexOf("/") + 7, this.QRCode.buttonLink.length).replace('.pdf', '');
		});
	}

	translateStaticBits() {
		this.htmlText = this.translatedBitsService.translatedBitsMap.get(this.language + "-introText");
		this.updatedString = this.translatedBitsService.translatedBitsMap.get(this.language + "-updated")!;
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
		
		this.chart.render();
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