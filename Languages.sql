CREATE TABLE `datoscurriculo`.`languages`(
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
(1, 'English - C1 level (IELTS test)', 'British Council', 'assets/images/languages/Inglés.png', DATE_FORMAT('2018-8-1','%M %Y'),'English IELTS British Council C1 Language'),
(2, 'Chinese - A2 level (HSK-2 test)', 'Instituto Confucio', 'assets/images/languages/Chino.png', DATE_FORMAT('2016-8-1','%M %Y'), 'Chinese Confucio HSK A2 Language'),
(3, 'Spanish - Native', '', 'assets/images/languages/Castellano.png', DATE_FORMAT('1992-07-27','%M %Y'), 'Spanish Castilian Native Language');
