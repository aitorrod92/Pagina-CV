import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/common/categoria';
import { CategoriasService } from 'src/app/service/categorias.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {
	categorias: Categoria[];
	
	constructor(private categoriesService: CategoriasService) { }

	ngOnInit(): void {
		this.listCategories();
	}

	listCategories() {
		this.categoriesService.getCategories().subscribe(
			data => {
				this.categorias = data;
			}
		)
		console.log('categorias ' + this.categorias);
	}
}
