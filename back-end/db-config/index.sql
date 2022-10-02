-- 1 / Créez votre base de données Groupomania en tapant la commande suivante dans votre terminal MySQL : 
CREATE DATABASE groupomania --
--
--
-- 2 / Puis créez les tables user, post et likes suivant les modèles ci-dessous: 
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(10) DEFAULT 'USER',
  `lastname` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profileImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 227 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci --
--
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `description` varchar(255) NOT NULL,
  `creationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `postLikes` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 324 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci -- 
--
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1334 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci --
--
--
-- 3 / Créez un ADMIN, avec la commande : 
UPDATE `user`
SET `status` = 'ADMIN'
WHERE id = 1;
--
--
-- 4 / Enfin, renommez le fichier .env.example en .env. Et renseignez-y vos identifiants DB_USER et DB_PASSWORD :
DB_USER = "votre nom d'utilisateur pour votre base de données" -- 
DB_PASSWORD = "votre mot de passe pour votre base de données"