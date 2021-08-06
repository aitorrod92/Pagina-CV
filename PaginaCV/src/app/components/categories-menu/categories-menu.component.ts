import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/common/categoria';
import { CategoriasService } from 'src/app/service/categorias.service';
import { faGraduationCap, faBriefcase, faMicroscope, faLanguage, faQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
	selector: 'app-categories-menu',
	templateUrl: './categories-menu.component.html',
	styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {
	categorias: Categoria[];

	faGraduationCap = faGraduationCap;
	faBriefcase = faBriefcase;
	faMicroscope = faMicroscope;
	faLanguage = faLanguage;
	faQuestion = faQuestion;

	map = new Map<string, IconDefinition>();

	constructor(private categoriesService: CategoriasService) { }

	ngOnInit(): void {
		this.listCategories();
		this.defineIconNamesMap();
	}

	getIcon(iconName: string): IconProp {
		let iconNameiconWithoutAccents = iconName.normalize("NFD").replace(/\p{Diacritic}/gu, "");
		let iconProp = this.map.get(iconNameiconWithoutAccents) as IconProp;
		if (iconProp != null) {
			return iconProp;
		}
		return this.faQuestion;
	}

	listCategories() {
		this.categoriesService.getCategories().subscribe(
			data => {
				this.categorias = data;
			}
		)
	}

	defineIconNamesMap() {
		this.map.set("Trabajos", this.faBriefcase);
		this.map.set("Formacion", this.faGraduationCap);
		this.map.set("Practicas", this.faMicroscope);
		this.map.set("Idiomas", this.faLanguage);
	}
}
