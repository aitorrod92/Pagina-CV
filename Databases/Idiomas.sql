CREATE TABLE `datoscurriculo`.`idiomas`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Institucion` VARCHAR(50),
  `Imagen` VARCHAR(60) NULL,
  `Fecha` VARCHAR(20) NOT NULL,
  `Tags` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`)
  );
  
INSERT INTO datoscurriculo.idiomas
VALUES 
(1, 'Inglés - Nivel C1 (Examen IELTS)', 'British Council', 'assets/images/languages/Inglés.png', DATE_FORMAT('2018-8-1','%M %Y'),' Inglés IELTS British Council C1 '),
(2, 'Chino - Nivel A2 (Examen HSK-2)', 'Instituto Confucio', 'assets/images/languages/Chino.png', DATE_FORMAT('2016-8-1','%M %Y'), ' Chino Confucio HSK A2 '),
(3, 'Castellano - Lengua materna', '', 'assets/images/languages/Castellano.png', DATE_FORMAT('1992-07-27','%M %Y'), ' Castellano Español nativo ');
