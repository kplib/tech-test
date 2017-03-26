CREATE DATABASE IF NOT EXISTS `frog_ms`;
USE `frog_ms`;

/*Table structure for table `frog` */

DROP TABLE IF EXISTS `frog`;

CREATE TABLE `frog` (
  `frog_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `gender` enum('F','M') COLLATE utf8_bin DEFAULT NULL COMMENT 'F - female; M - Male',
  `birth_date` datetime NOT NULL,
  `death_date` datetime DEFAULT NULL,
  `pond_id` int(11) DEFAULT NULL COMMENT 'Referencing Pond table',
  PRIMARY KEY (`frog_id`)
);

/*Table structure for table `pond` */

DROP TABLE IF EXISTS `pond`;

CREATE TABLE `pond` (
  `pond_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`pond_id`)
);