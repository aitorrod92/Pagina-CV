create table `datoscurriculo`.`QRCodesPDF` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`Language` VARCHAR(2) NOT NULL,
	`Link` VARCHAR(70),
	`Button_string` VARCHAR (40),
	`Button_link` VARCHAR (40),
	PRIMARY KEY (`id`)
);

INSERT INTO `datoscurriculo`.`QRCodesPDF`
  VALUES  (1, 'es', 'https://www.patreon.com/file?h=55788541&i=8815603', 'CV versión pdf', 'assets/CV-es-06-2020.pdf'),
  (2, 'en', 'https://www.patreon.com/file?h=55788541&i=8815602', 'CV pdf version', 'assets/CV-en-07-2020.pdf');;