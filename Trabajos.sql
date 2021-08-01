 CREATE TABLE `datoscurriculo`.`categorias`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
  );

INSERT INTO datoscurriculo.categorias VALUES (1, "Trabajos"), (2, "Prácticas"), (3, "Formación"), (4, "Idiomas");

CREATE TABLE `datoscurriculo`.`trabajos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) NOT NULL,
  `Imagen` VARCHAR(60) NULL,
  `Fecha_inicio` VARCHAR(20) NOT NULL,
  `Fecha_fin` VARCHAR(20) NULL,
  `Duracion_en_meses` INT NULL,
  `Empresa` VARCHAR(60) NOT NULL,
  `Ciudad` VARCHAR(40) NOT NULL,
  `País` VARCHAR(30) NOT NULL,
  `Descripcion` VARCHAR(800) NULL,
  `Rama` VARCHAR(30) NOT NULL,
  `Tipo_de_jornada` VARCHAR(40) NULL,
  `Tags` VARCHAR(100) NOT NULL,
  `Categoria` INT NOT NULL,
    PRIMARY KEY (`id`),
	KEY `fk_category` (`Categoria`),
  CONSTRAINT `fk_category` FOREIGN KEY (`Categoria`) REFERENCES `categorias` (`id`)
);

INSERT INTO datoscurriculo.trabajos 
VALUES 
(1, 'Grado en Biología', 'assets/images/education/UCM.png', DATE_FORMAT('2010-01-01', '%Y'), date_format('2014-01-01', '%Y'), '48', 'Universidad Complutense de Madrid', 'Madrid', 'España',
'', 'Biología', null, 'Biología Ciencia Grado Universidad', '2010-01-01', 3),
(2, 'Ayudante de investigación', 'assets/images/jobs/UniversidadAlcala.png', DATE_FORMAT('2014-11-1', '%b %Y'), DATE_FORMAT('2015-3-31', '%b %Y') , DATEDIFF('2015/03/31', '2014/11/01')/30, 'Universidad de Alcalá', 'Alcalá de Henares', 'España', 
'Realización de un estudio sobre la influencia alelopática de restos de hojarasca de especies invasoras sobre la germinación de especies nativas. Esto incluyó la toma de muestras, la preparación de extractos, el seguimiento de la evolución de las muestras, su análisis estadístico y la redacción de un informe.' ,
'Biología', null, 'Biología Investigación Prácticas Grado Universidad Ciencia', '2014-11-1', 2), 
(3, 'Profesor de Biología', 'assets/images/jobs/ComunidadMadrid.jpg', DATE_FORMAT('2016-2-1', '%b %Y'), DATE_FORMAT('2016-5-31', '%b %Y'), DATEDIFF('2016/05/31', '2016/02/01')/30, 'IES "Villa de Vallecas"', 'Madrid', 'España',
'- Preparación e impartición de clases, actividades y exámenes.
- Evaluación de conocimientos del alumnado.
- Realización de actividades y excursiones.',
'Biología', null, 'Biología Docencia Prácticas Enseñanza Máster Universidad Ciencia', '2016-2-1', 2),
(4, 'Máster en Formación del Profesorado en Educación Secundaria (Biología)', 'assets/images/education/UCM.png', 
DATE_FORMAT('2015-01-01', '%Y'),DATE_FORMAT('2016-01-01', '%Y'), '12', 'Universidad Complutense de Madrid', 'Madrid', 'España',
'', 'Biología', null, 'Biología Docencia Máster Universidad', '2016-01-01', 3),
(5, 'Taquillero', 'assets/images/jobs/BrunchPark.jpg', DATE_FORMAT('2016-9-1','%b %Y'), DATE_FORMAT('2016-12-31', '%b %Y'), DATEDIFF('2016/12/31', '2016/09/01')/30, 'Brunch In The Park', 'Madrid', 'España',
'- Venta de entradas usando TPV.
- Balance de caja.',
'Otro', 'Parcial', 'Venta Cara al público Trabajo', '2016-9-1', 1),
(6, 'Mozo multitarea', 'assets/images/jobs/ParqueAtracciones.png', DATE_FORMAT('2016-10-01','%b %Y'), DATE_FORMAT('2017-5-31','%b %Y'), DATEDIFF('2017-5-31', '2016-10-01')/30, 'Parque de Atracciones de Madrid', 'Madrid', 'España',
'- Servicio en restaurante y kiosco usando TPV.
- Cocina básica.
- Balance de caja y realización de inventario.
- Tareas de limpieza, mantenimiento y porteo.',
'Otro', 'Parcial', 'Venta Cara al público Trabajo Cocina Hostelería Limpieza Porteo', '2016-10-01', 1),
(7, 'Crew Trainer', 'assets/images/jobs/McDonalds.png', DATE_FORMAT('2017-7-01','%b %Y'), DATE_FORMAT('2020-6-30','%b %Y'), DATEDIFF('2020-6-30', '2017-7-01')/30, 'McDonald\'s', 'Brighton and Hove', 'Reino Unido',
'- Preparación de comida.
- Trato con el cliente en calidad de dependiente, encargado y camarero.
- Trabajo en equipo en situaciones que demandan ser rápido durante largos periodos de tiempo.
- Formación y evaluación de empleados noveles.
- Tareas de limpieza (incluida maquinaria de cocina), stock y porteo.',
'Otro', 'Completa y parcial', 'Venta Cara al público Cocina Hostelería Limpieza Porteo Formación Trabajo', '2017-7-01', 1),
(8, 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma', 'assets/images/education/FOC.png'
,DATE_FORMAT('2018-01-01', '%Y'),DATE_FORMAT('2020-01-01', '%Y'), '24', 'Instituto Fomento Ocupacional', 'Brighton and Hove', 'Reino Unido',
'', 'IT', null, 'Informática IT FP Grado superior Software Programación Bases de Datos',  '2018-01-01', 3),
(9, 'Desarrollador web', 'assets/images/jobs/Nubemedia.png',  DATE_FORMAT('2020-9-01','%b %Y'),  DATE_FORMAT('2020-12-31','%b %Y'), DATEDIFF('2020-12-31', '2020-9-01')/30, 'Nubemedia', 'Madrid','España',
'- Creación, evaluación y migración de páginas web.
- Utilización de WordPress y CSS.
- Creación de programas auxiliares para tareas de la empresa.',
'IT', null, 'Informática IT Prácticas Desarrollo Wordpress CSS Java', '2018-01-01', 2),
(10, 'Consultor SAP SuccessFactors', 'assets/images/jobs/Deloitte.jpg',  DATE_FORMAT('2021-4-01','%b %Y'),  DATE_FORMAT('2021-7-31','%b %Y'), DATEDIFF('2021-5-31', '2021-4-01')/30, 'Deloitte', 'Madrid', 'España',
'', 'IT', "Completa", 'Informática IT Trabajo Consultoría SAP SuccessFactors', '2021-4-01', 1),
(11, 'Desarrollador .NET', 'assets/images/jobs/Sanne.jpg',  DATE_FORMAT('2021-8-01','%b %Y'),  DATE_FORMAT('2021-8-31','%b %Y'), DATEDIFF('2021-8-31', '2021-8-01')/30, 'Sanne', 'Madrid', 'España',
'', 'IT', "Completa", 'Informática IT Trabajo .NET C# Programación', '2021-8-01', 1);

CREATE TABLE `datoscurriculo`.`keywords`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
  );
  
  INSERT INTO datoscurriculo.keywords
  VALUES (1,'Informatica' ), (2,'Biologia' ), (3,'Docencia' ),
	(4,'Ciencia' ), (5,'Grado' ), (6,'Universad' ),
	(7,'Investigación' ), (8,'Prácticas' ), (9,'Enseñanza' ),
	(10,'Máster' ), (11,'Venta' ), (12,'Cara al público' ),
	(13,'Trabajo' ), (14,'Cocina' ), (15,'Hostelería' ),
	(16,'Limpieza' ), (17,'Porteo' ), (18,'Formación' ),
	(19,'IT' ), (20,'FP' ), (21,'Grado superior' ),
	(22,'Software' ), (23,'Programación' ), (24,'Bases de datos' ),
	(25,'Desarrollo' ), (26,'Wordpress' ), (27,'Java' ),
	(28,'CSS' ), (29,'Consultoría' ), (30,'SAP' ),
	(31,'Inglés' ), (32,'IELTS' ), (33,'British Council' ),
	(34,'C1' ), (35,'Chino' ), (36,'Confucio' ),
	(37,'HSK' ), (38,'A2' ), (39,'Castellano' ),
	(40,'Español' ), (41,'Nativo' ), (42, '.NET'), (43, 'C#');