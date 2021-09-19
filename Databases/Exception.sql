 CREATE TABLE `datoscurriculo`.`exceptions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Timestamp` VARCHAR(200) NOT NULL,
  `Message` VARCHAR(400) NULL,
  `Stacktrace` VARCHAR(900) NOT NULL,
	PRIMARY KEY (`id`)
);
