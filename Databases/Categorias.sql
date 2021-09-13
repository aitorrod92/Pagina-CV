 CREATE TABLE `datoscurriculo`.`categorias`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
  );

INSERT INTO datoscurriculo.categorias VALUES (1, "Trabajos"), (2, "Prácticas"), (3, "Formación"), (4, "Idiomas");