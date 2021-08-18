package com.AitorRodriguez.SpringCVWeb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="languages")
@Data
public class Language {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="id")
		private Long id;
			
		@Column(name="Nombre")	
		private String nombre;
			
		@Column(name="Institucion")
		private String institucion;
		
	    @Column(name="Imagen")
	    private String imagen;
	    
	    @Column(name="Fecha")
	    private String fecha;   
		
		@Column(name="Tags")
		private String tags;	
}
