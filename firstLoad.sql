-- db_mercadinho.tbl_cupons definition

CREATE TABLE `tbl_cupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_create` date NOT NULL,
  `value` int(11) NOT NULL,
  `cashier` varchar(255) NOT NULL,
  `ind_cance` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`fk_user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `tbl_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- db_mercadinho.tbl_products definition

CREATE TABLE `tbl_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `value` int(11) NOT NULL,
  `quantity` int(60) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ind_cance` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- db_mercadinho.tbl_seles definition

CREATE TABLE `tbl_seles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_create` date NOT NULL,
  `quantity` int(60) NOT NULL,
  `value` int(11) NOT NULL,
  `ind_cance` int(11) NOT NULL,
  `fk_cupon_id` int(11) NOT NULL,
  `fk_product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cupon_id` (`fk_cupon_id`),
  KEY `fk_product_id` (`fk_product_id`),
  CONSTRAINT `fk_cupon_id` FOREIGN KEY (`fk_cupon_id`) REFERENCES `tbl_cupons` (`id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`fk_product_id`) REFERENCES `tbl_products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- db_mercadinho.tbl_type_users definition

CREATE TABLE `tbl_type_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_user` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;



-- db_mercadinho.tbl_users definition

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `ind_cance` int(11) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp(),
  `fk_user_name` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_name` (`fk_user_name`),
  CONSTRAINT `fk_user_name` FOREIGN KEY (`fk_user_name`) REFERENCES `tbl_type_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- ADD New coluns
ALTER TABLE tbl_users ADD 
email varchar(255) NOT NULL;


ALTER TABLE tbl_users ADD 
cpf varchar(14) NOT NULL;

ALTER TABLE tbl_users ADD 
endereco varchar(255) NOT NULL;

ALTER TABLE tbl_users ADD 
cidade varchar(255) NOT NULL;

ALTER TABLE tbl_users ADD 
cep varchar(15) NOT NULL;

ALTER TABLE tbl_users ADD 
numero varchar(20) NOT NULL;

ALTER TABLE tbl_users ADD 
uf char(2) NOT NULL;

ALTER TABLE tbl_users ADD 
bairro varchar(255) NOT NULL;

ALTER TABLE tbl_users ADD 
url_foto_perfil text;




