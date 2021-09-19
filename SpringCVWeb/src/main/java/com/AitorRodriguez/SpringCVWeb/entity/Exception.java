package com.AitorRodriguez.SpringCVWeb.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Categorias")
@Getter
@Setter
public class Exception {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
	private Long id;
    
    @Column(name="timestamp")
	private String timestamp;
    
    @Column(name="message")
	private String message;
    
    @Column(name="stacktrace")
	private String stacktrace;    

}
