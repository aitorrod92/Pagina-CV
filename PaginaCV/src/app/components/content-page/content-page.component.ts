import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trabajo } from 'src/app/common/trabajo';
import { TrabajoService } from 'src/app/service/trabajo.service';

@Component({
	selector: 'app-content-page',
	templateUrl: './content-page.component.html',
	styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {
	contentId: number;
	trabajo: Trabajo;

	constructor(private route: ActivatedRoute, private trabajoService: TrabajoService) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => { this.getContent() });
	}

	getContent() {
		// @ts-ignore: Object is possibly 'null'.
		this.contentId = this.route.snapshot.paramMap.get('content');
		this.trabajoService.getTrabajo(this.contentId).subscribe(data => {
			this.trabajo = data;
		})
		}
		
	


	


	

}
