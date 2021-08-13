 CREATE TABLE `datoscurriculo`.`categories`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
  );

INSERT INTO datoscurriculo.categories VALUES (1, "Jobs"), (2, "Internships"), (3, "Education"), (4, "Languages");