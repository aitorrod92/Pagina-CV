CREATE TABLE `datoscurriculo`.`jobs` (
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
  `Fecha_inicio_date` DATE NOT NULL,
  `Codigo_de_localizacion` VARCHAR(50) NULL,
  `Categoria` INT NOT NULL,
    PRIMARY KEY (`id`),
	KEY `fkk_category` (`Categoria`),
  CONSTRAINT `fkk_category` FOREIGN KEY (`Categoria`) REFERENCES `categories` (`id`)
);

INSERT INTO datoscurriculo.jobs 
VALUES 
(1, 'Biology Degree', 'assets/images/education/UCM.png', DATE_FORMAT('2010-01-01', '%Y'), date_format('2014-01-01', '%Y'), '48', 'Complutense University of Madrid', 'Madrid', 'Spain',
'', 'Biology', null, 'Biology Science Degree University', '2010-01-01', 'ChIJDWOoPzQoQg0RDM7UeHIMYrE', 3),
(2, 'Research helper', 'assets/images/jobs/UniversidadAlcala.png', DATE_FORMAT('2014-11-1', '%b %Y'), DATE_FORMAT('2015-3-31', '%b %Y') , DATEDIFF('2015/03/31', '2014/11/01')/30, 'Universidad of Alcalá', 'Alcalá de Henares', 'Spain', 
'Carrying out a research about the allelopathic influence of litter remains of invasive species on the germination of native species. This included the taking of samples, the preparation of extracts, the monitoring of the evolution of the samples, their statistical analysis and the writing of a report.' ,
'Biology', null, 'Biology Researching Internship Degree University Science', '2014-11-1', 'ChIJpwk_dfxLQg0Rlqi6MYmI2M8', 2), 
(3, 'Biology teacher', 'assets/images/jobs/ComunidadMadrid.jpg', DATE_FORMAT('2016-2-1', '%b %Y'), DATE_FORMAT('2016-5-31', '%b %Y'), DATEDIFF('2016/05/31', '2016/02/01')/30, 'Secondary School "Villa de Vallecas"', 'Madrid', 'Spain',
'- Preparation and delivery of classes, activities and exams.
- Assessment of students\' knowledge.
- Carrying out activities and excursions.',
'Biology', null, 'Biology Teaching Internship Education Master Degree University Science', '2016-2-1', 'ChIJz_AL16olQg0RGe6bE9sK7aI', 2),
(4, 'Master\'s Degree in Teacher Training in Secondary Education (Biology)', 'assets/images/education/UCM.png', 
DATE_FORMAT('2015-01-01', '%Y'),DATE_FORMAT('2016-01-01', '%Y'), '12', 'Complutense University of Madrid', 'Madrid', 'Spain',
'', 'Biology', null, 'Biology Teaching Master Degree University', '2016-01-01', 'ChIJ2xfFgEwoQg0Rf4hBIq4WVuY', 3),
(5, 'Ticket clerck', 'assets/images/jobs/BrunchPark.jpg', DATE_FORMAT('2016-9-1','%b %Y'), DATE_FORMAT('2016-12-31', '%b %Y'), DATEDIFF('2016/12/31', '2016/09/01')/30, 'Brunch In The Park', 'Madrid', 'Spain',
'- Ticket sales using POS.
- Cash balance.',
'Other', 'Partial', 'Sales Deal with customers Job', '2016-9-1', 'ChIJ60xZJbweQg0R5oxFW2SUW8M', 1),
(6, 'Multitask clerk', 'assets/images/jobs/ParqueAtracciones.png', DATE_FORMAT('2016-10-01','%b %Y'), DATE_FORMAT('2017-5-31','%b %Y'), DATEDIFF('2017-5-31', '2016-10-01')/30, 'Parque de Atracciones de Madrid', 'Madrid', 'Spain',
'- Restaurant and kiosk service using POS.
- Basic cooking.
- Cash balance and inventory.
- Cleaning, maintenance and carriage tasks.',
'Other', 'Partial', 'Sales Deal with customers Job Cooking Hospitality Cleaning Carriage', '2016-10-01', 'ChIJO-zP-QeIQQ0RypPybBogF2I', 1),
(7, 'Crew Trainer', 'assets/images/jobs/McDonalds.png', DATE_FORMAT('2017-7-01','%b %Y'), DATE_FORMAT('2020-6-30','%b %Y'), DATEDIFF('2020-6-30', '2017-7-01')/30, 'McDonald\'s', 'Brighton and Hove', 'United Kingdom',
'- Food preparation.
- Dealing with customers as a shop assistant assistant and a waiter.
- Teamwork in situations that demand to be quick during long periods of time.
- Training and evaluation of new employees.
- Cleaning (including kitchen machinery), stock and carriage tasks.',
'Other', 'Full and partial', 'Sales Deal with customers Job Cooking Cocina  Hospitality Cleaning Carriage Training', '2017-7-01', 'ChIJU9ix_gyFdUgR65uaqyyyeRg', 1),
(8, 'Development of Multiplatform Applications (HNC)', 'assets/images/education/FOC.png'
,DATE_FORMAT('2018-01-01', '%Y'),DATE_FORMAT('2020-01-01', '%Y'), '24', 'Fomento Ocupacional Institute', 'Brighton and Hove', 'United Kingdom',
'', 'IT', null, 'Informatics IT HNC Software development Java C# Databases CSS SQL .NET',  '2018-01-01', 'ChIJeef454OFdUgRE8_it_x171c', 3),
(9, 'UI Developer', 'assets/images/jobs/Nubemedia.png',  DATE_FORMAT('2020-9-01','%b %Y'),  DATE_FORMAT('2020-12-31','%b %Y'), DATEDIFF('2020-12-31', '2020-9-01')/30, 'Nubemedia', 'Madrid','Spain',
'- Site creation, evaluation and migration.
- Use of WordPress and CSS.
- Creation of auxiliary programs for company tasks.',
'IT', null, 'Informatics IT Internship Software development Wordpress CSS Java', '2018-01-01', 'ChIJ5ftsegovQg0Ro8rRTArZ0Ew', 2),
(10, '.NET Developer', 'assets/images/jobs/Deloitte.jpg',  DATE_FORMAT('2021-4-01','%b %Y'),  DATE_FORMAT('2021-7-31','%b %Y'), DATEDIFF('2021-5-31', '2021-4-01')/30, 'Deloitte', 'Madrid', 'Spain',
'', 'IT', "Full", 'Informatics IT Job Consultancy CSS SQL C# .NET Software Development', '2021-4-01', 'ChIJ947Eq2gsQg0RX8Sf25ay0nY', 1),
(11, '.NET Developer', 'assets/images/jobs/Sanne.jpg',  DATE_FORMAT('2021-8-01','%b %Y'),  DATE_FORMAT('2021-8-31','%b %Y'), DATEDIFF('2021-8-31', '2021-8-01')/30, 'Sanne', 'Madrid', 'Spain',
'', 'IT', "Full", 'Informatics IT Job .NET C# CSS Databases SQL Software development', '2021-8-01', NULL, 1);