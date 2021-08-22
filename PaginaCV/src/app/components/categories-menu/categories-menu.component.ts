import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/common/categoria';
import { CategoriasService } from 'src/app/service/categorias.service';
import { faGraduationCap, faBriefcase, faMicroscope, faLanguage, faQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LanguageService } from 'src/app/service/language.service';

@Component({
	selector: 'app-categories-menu',
	templateUrl: './categories-menu.component.html',
	styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {
	categorias: Categoria[];
	language: string = "es";

	faGraduationCap = faGraduationCap;
	faBriefcase = faBriefcase;
	faMicroscope = faMicroscope;
	faLanguage = faLanguage;
	faQuestion = faQuestion;

	map = new Map<string, IconDefinition>();

	constructor(private categoriesService: CategoriasService/*,
		private languageService: LanguageService*/) {

		LanguageService.language$.subscribe(data => {
			this.language = data;
			this.listCategoriesAndDefineIcons();
		});
	}

	ngOnInit(): void {
		this.listCategoriesAndDefineIcons();
	}

	getIcon(iconName: string): IconProp {
		//let iconNameiconWithoutAccents = iconName.normalize("NFD").replace(/\p{Diacritic}/gu, "");
		let iconProp = this.map.get(iconName) as IconProp;
		if (iconProp != null) {
			return iconProp;
		}
		return this.faQuestion;
	}

	listCategoriesAndDefineIcons() {
		let categoryWord = this.language == "es" ? "categorias" : "categories";
		this.categoriesService.getCategories(categoryWord).subscribe(
			data => {
				this.categorias = data;
				this.defineIconNamesMap();
			}
		)
	}

	defineIconNamesMap() {
		this.map.set(this.categorias[0].nombre, this.faBriefcase);
		this.map.set(this.categorias[1].nombre, this.faGraduationCap);
		this.map.set(this.categorias[2].nombre, this.faMicroscope);
		this.map.set(this.categorias[3].nombre, this.faLanguage);
	}


}
