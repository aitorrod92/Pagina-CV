package com.AitorRodriguez.SpringCVWeb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="QRCodesPDF")
@Getter
@Setter
public class QRCodesPDF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
	private Long id;
    
    @Column(name="Language")
	private String language;
    
    @Column(name="Link")
	private String link;
    
    @Column(name="Button_string")
	private String buttonString;
    
    @Column(name="Button_link")
	private String buttonLink;
}