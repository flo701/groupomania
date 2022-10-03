CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `description` varchar(255) NOT NULL,
  `creationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `postLikes` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_ibfk_1` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=336 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (138,'On a (encore) le droit de rêver...','Alors profitons-en ! Toutefois, je trouve les habitations un peu trop sages et alignées. Chacune mériterait de se différencier des autres... comme les êtres humains. Cette photo m\'inspire, tout est relié. Il fallait bien écrire 255 caractères. C\'est fait.','2022-10-01 14:35:43','http://localhost:3000/images/Ile_paradisiaque1664627743032.jpg',178,3),(279,'Titre avec 40 caractères. Voilà voilà...','Description avec 255 caractères. Pour l\'instant, je n\'ai rien de spécial à dire. Alors je ne parle pas pour ne rien dire. Quand j\'aurai quelque chose à dire, je vous le dirai. Wouaaah ! Les répétitions ! Mais c\'était juste pour avoir quelque chose à dire.','2022-09-25 10:10:58',NULL,178,1),(291,'Quelle beauté...','On a l\'impression qu\'il nous sourit ;-)','2022-09-27 13:25:51','http://localhost:3000/images/dauphin1664276986631.jpg',194,1),(292,'Nos amis les animaux','Aimons-les comme ils nous aiment. Ils sont incroyables...','2022-09-29 13:41:07','http://localhost:3000/images/animaux1664451667893.jpg',195,1),(307,'Incroyable beauté...','La nature est magnifique','2022-10-03 21:22:02','http://localhost:3000/images/arbre-a-fleurs1664824922533.webp',197,1),(315,'Qui me suit ?','Je pars profiter un peu de la vie, et prendre soin de moi...','2022-10-01 21:37:46','http://localhost:3000/images/Ile_de_Nosy_Be_a_Madagascar1664653046186.jpg',196,1),(331,'Trop bien !','Allez plouf !','2022-10-02 22:30:12','http://localhost:3000/images/nager_dans_ocean1664742612703.jpg',230,0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-03 22:33:46
