package com.AitorRodriguez.SpringCVWeb.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="jobs")
@Data
public class Job {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="id")
		private Long id;
			
		@Column(name="Nombre")	
		private String nombre;
			
		@Column(name="Imagen")
		private String imagen;
		
	    @Column(name="Fecha_inicio")
	    private String fechaInicio;
	    
	    @Column(name="Fecha_fin")
	    private String fechaFin;   
		
		@Column(name="Duracion_en_meses")
		private int duracion;
		
		@Column(name="Empresa")
		private String empresa;
		
		@Column(name="Ciudad")
		private String ciudad;
		
		@Column(name="País")
		private String pais;
		
		@Column(name="Descripcion")
		private String descripcion;
		
		@Column(name="Rama")
		private String rama;
		
		@Column(name="Tipo_de_jornada")
		private String jornada;
		
		@Column(name="Tags")
		private String tags;
		
		@Column(name="Fecha_inicio_date")
		private Date fechaInicioDate;
		
		@Column(name="Codigo_de_localizacion")
		private String codigoLocalizacion;
		
		@Column(name="Categoria", nullable=false)
		private int categoria;
		
}
