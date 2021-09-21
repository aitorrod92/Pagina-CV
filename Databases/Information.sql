CREATE TABLE `datoscurriculo`.`information` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(15) NOT NULL,
  `Timestamp` VARCHAR(200) NOT NULL,
  `Message` VARCHAR(900) NOT NULL,
  `Stacktrace` text(16777215) NULL,
	PRIMARY KEY (`id`)
);
