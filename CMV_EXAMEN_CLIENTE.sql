/***** Script para crear todo lo necesario para la Base de Datos *******/

/*Creando y dando permisos al usuario para la conexion*/

CREATE USER IF NOT EXISTS 'CMV_ACCESO'@'localhost' IDENTIFIED BY '1q2w3e4r5t';
GRANT ALL PRIVILEGES ON * . * TO 'CMV_ACCESO'@'localhost';
FLUSH PRIVILEGES;

/* Creando la base de datos*/
CREATE DATABASE  IF NOT EXISTS `cmv_examen_cliente`
USE `cmv_examen_cliente`;

/* Creando la tabla de  tipos de clientes */
DROP TABLE IF EXISTS `cat_cmv_tipo_cliente`;

CREATE TABLE `cat_cmv_tipo_cliente` (
  `id_cuenta` int NOT NULL AUTO_INCREMENT,
  `nombre_cuenta` varchar(15) CHARACTER SET utf8mb3 NOT NULL,
  PRIMARY KEY (`id_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Catalogo de los tipos de clientes';

/* Insertando los tipso de clientes*/
LOCK TABLES `cat_cmv_tipo_cliente` WRITE;
INSERT INTO `cat_cmv_tipo_cliente` VALUES (1,'Abicuenta'),(2,'Ahorro'),(3,'Inverdinamica');
UNLOCK TABLES;

/* Creando la tabla de clientes */
DROP TABLE IF EXISTS `tbl_cmv_cliente`;

CREATE TABLE `tbl_cmv_cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido_paterno` varchar(45) NOT NULL,
  `apellido_materno` varchar(45) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `fecha_alta` datetime NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `rfc_UNIQUE` (`rfc`),
  UNIQUE KEY `curp_UNIQUE` (`curp`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabla de clientes (datos generales)';

/* Insertando los clientes */
LOCK TABLES `tbl_cmv_cliente` WRITE;
INSERT INTO `tbl_cmv_cliente` VALUES (3,'Angel','Mendoza','Ramirez','MERM000424339','MERM000424HMNNMGA9','2022-11-10 09:45:15'),(5,'Cesar','Mendoza','Ramirez','MERM000424337','MERM000424HMNNMGA7','2022-12-19 16:40:10');
UNLOCK TABLES;

/* Creando la tabla para las cuentas de los clientes */
DROP TABLE IF EXISTS `tbl_cmv_cliente_cuenta`;

CREATE TABLE `tbl_cmv_cliente_cuenta` (
  `id_cliente_cuenta` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_cuenta` int NOT NULL,
  `saldo_actual` decimal(14,2) NOT NULL,
  `fecha_contratacion` datetime NOT NULL,
  `fecha_ultimo_movimiento` datetime DEFAULT NULL,
  PRIMARY KEY (`id_cliente_cuenta`),
  KEY `FK_CUENTA_CLIENTE_idx` (`id_cliente`),
  KEY `FK_CUENTA_TIPO_CLIENTE_idx` (`id_cuenta`),
  CONSTRAINT `FK_CUENTA_CLIENTE` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cmv_cliente` (`id_cliente`),
  CONSTRAINT `FK_CUENTA_TIPO_CLIENTE` FOREIGN KEY (`id_cuenta`) REFERENCES `cat_cmv_tipo_cliente` (`id_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Datos de la cuenta del cliente';

/* Insertando las cuentas de las clientes */
LOCK TABLES `tbl_cmv_cliente_cuenta` WRITE;
INSERT INTO `tbl_cmv_cliente_cuenta` VALUES (1,3,1,500.50,'2022-11-15 08:20:10','2022-12-19 17:40:10'),(2,3,2,1500.75,'2022-12-20 10:53:15','2022-12-21 18:12:02'),(5,5,3,50000.00,'2022-12-19 16:45:15','2022-12-19 16:48:07'),(6,5,2,1500.00,'2022-12-19 16:50:47','2022-12-21 15:35:05');
UNLOCK TABLES;

/****** Creando los Stored Produceres *******/

/* SP para editar los clientes */
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_CLIENTE`(
	_id_cliente int,
	_nombre varchar(45),
	_apellido_paterno varchar(45),
	_apellido_materno varchar(45),
	_rfc varchar(13),
	_curp varchar(18)
    )
BEGIN
	update tbl_cmv_cliente set nombre = _nombre, apellido_paterno = _apellido_paterno, apellido_materno = _apellido_materno, rfc = _rfc, curp = _curp where id_cliente = _id_cliente;
END ;;
DELIMITER ;

/* SP para eliminar el cliente */
DELIMITER ;;
CREATE DEFINER=`CMV_ACCESO`@`localhost` PROCEDURE `SP_ELIMINAR_CLIENTE`(_id_cliente int)
BEGIN
	delete from tbl_cmv_cliente_cuenta where id_cliente = _id_cliente;
	delete from tbl_cmv_cliente where id_cliente = _id_cliente;
END ;;
DELIMITER ;

/* SP para obtener los clientes */
DELIMITER ;;
CREATE DEFINER=`CMV_ACCESO`@`localhost` PROCEDURE `SP_OBTENER_CLIENTES`()
BEGIN
	select * from tbl_cmv_cliente as clientes;
END ;;
DELIMITER ;

/* SP para obtener las cuentas de los clientes */
DELIMITER ;;
CREATE DEFINER=`CMV_ACCESO`@`localhost` PROCEDURE `SP_OBTENER_CLIENTE_CUENTA`(_id_cliente int)
BEGIN
	SELECT tbl_cmv_cliente_cuenta.id_cliente_cuenta,tbl_cmv_cliente.nombre, cat_cmv_tipo_cliente.nombre_cuenta, tbl_cmv_cliente_cuenta.saldo_actual, tbl_cmv_cliente_cuenta.fecha_contratacion, tbl_cmv_cliente_cuenta.fecha_ultimo_movimiento 
	from tbl_cmv_cliente_cuenta 
	INNER JOIN tbl_cmv_cliente on tbl_cmv_cliente.id_cliente = _id_cliente 
	INNER JOIN cat_cmv_tipo_cliente on cat_cmv_tipo_cliente.id_cuenta = tbl_cmv_cliente_cuenta.id_cuenta
    where tbl_cmv_cliente_cuenta.id_cliente = _id_cliente;
END ;;
DELIMITER ;

/* SP para obtener los tipos de clientes */
DELIMITER ;;
CREATE DEFINER=`CMV_ACCESO`@`localhost` PROCEDURE `SP_OBTENER_TIPO_CLIENTES`()
BEGIN
	select * from cat_cmv_tipo_cliente as catTipoCliente;
END ;;
DELIMITER ;