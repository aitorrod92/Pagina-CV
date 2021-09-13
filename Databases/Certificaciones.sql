  CREATE TABLE `datoscurriculo`.`certificaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(60) NOT NULL,
  `Imagen` VARCHAR(60) NULL,
  `Expedicion` VARCHAR(20) NOT NULL,
  `Institucion` VARCHAR(60) NOT NULL,
  `Descripcion` VARCHAR(800) NULL,
  `id_credencial` VARCHAR(100) NOT NULL,
  `Rama` VARCHAR(30) NOT NULL,
  `Tags` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`));