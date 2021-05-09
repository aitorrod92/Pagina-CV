import { Component, OnInit } from '@angular/core';
import { Trabajo } from '../common/trabajo';
import { TrabajoService } from '../service/trabajo.service';

@Component({
  selector: 'app-lista-trabajos',
  templateUrl: './lista-trabajos.component.html',
  styleUrls: ['./lista-trabajos.component.css']
})
export class ListaTrabajosComponent implements OnInit {

trabajo: Trabajo[];
  constructor(private trabajoService: TrabajoService) { }

  ngOnInit(): void {
	this.listTrabajos();
  }

	listTrabajos(){
		this.trabajoService.getTrabajosList().subscribe(
			data => {
				this.trabajo = data;
			})
		}
	}



