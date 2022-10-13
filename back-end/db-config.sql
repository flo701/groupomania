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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1564 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1275,195,279),(1423,195,315),(1425,194,138),(1427,194,331),(1433,178,331),(1436,178,291),(1446,196,138),(1464,196,456),(1473,196,292),(1518,265,292),(1556,265,291),(1562,265,331);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=622 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (138,'On a (encore) le droit de rêver...','Alors profitons-en ! Toutefois, je trouve les habitations un peu trop sages et alignées. Chacune mériterait de se différencier des autres... comme les êtres humains. Cette photo m\'inspire, tout est relié. Il fallait bien écrire 255 caractères. C\'est fait.','2022-10-01 14:35:43','http://localhost:3000/images/Ile_paradisiaque1664627743032.jpg',178,2),(279,'Titre avec 40 caractères. Voilà voilà...','Description avec 255 caractères. Pour l\'instant, je n\'ai rien de spécial à dire. Alors je ne parle pas pour ne rien dire. Quand j\'aurai quelque chose à dire, je vous le dirai. Wouaaah ! Les répétitions ! Mais c\'était juste pour avoir quelque chose à dire.','2022-10-13 11:42:24',NULL,178,1),(291,'Quelle beauté...','On a l\'impression qu\'il nous sourit ;-)','2022-09-27 13:25:51','http://localhost:3000/images/dauphin1664276986631.jpg',194,2),(292,'Nos amis les animaux','Aimons-les comme ils nous aiment. Ils sont incroyables...','2022-09-29 13:41:07','http://localhost:3000/images/animaux1664451667893.jpg',195,2),(315,'Qui me suit ?','Je pars profiter un peu de la vie, et prendre soin de moi...','2022-10-07 22:15:37','http://localhost:3000/images/bora-bora21665173737796.jpg',196,1),(331,'Plongée dans un autre univers','J\'ai goûté à une sérénité indescriptible lors de l\'immersion dans cet autre monde... \r\nEt ces couleurs ! C\'est incroyable...','2022-10-13 11:42:59','http://localhost:3000/images/poissons1665174205372.jpg',230,3),(456,'Incroyable beauté','La nature est magnifique !','2022-10-13 11:42:14','http://localhost:3000/images/arbre-a-fleurs1665136546776.webp',265,1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(10) DEFAULT 'USER',
  `active` tinyint(1) DEFAULT '1',
  `lastname` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profileImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (178,'USER',1,'Redancourt','Jean-Christophe','jean@gmail.com','$2b$10$RBLGmF2n2mdoQC1oDk4itOxjONr3uYefSsu5iyxvpw3FqsTPBkwxy','2022-09-17 18:28:56','http://localhost:3000/images/jean-christophe1664548458548.webp'),(194,'USER',1,'Duchemin','Sophie','soso@hello.com','$2b$10$WCeaG7z4/W2mrWQDZRzzW.DxzhpgxQf4h2DxQG10JCRnUsL0IM3Kq','2022-09-25 20:27:06','http://localhost:3000/images/sophie1664548311449.webp'),(195,'USER',1,'Durand','Lola','lola@yahoo.fr','$2b$10$nOvqVkRCUrVQyd7oEkcOsOpvW0cUnON.bMKTZC4Uq8GRdRleUjBNG','2022-09-26 12:26:00','http://localhost:3000/images/lola1664548356413.webp'),(196,'USER',1,'Lefort','Guy','guy@orange.fr','$2b$10$Z.I6dajgWBySeDY8ns1BL.UGVZLUDnSI79kB7LUw4zRgMi7ko0VsK','2022-09-26 18:07:32','http://localhost:3000/images/guy1664704133834.webp'),(230,'USER',1,'Lun','Gérard ','gege@gmail.com','$2b$10$IikzWhqHOwle2B8kdTE4deIBjLPp5VYqgvQ5/wgpjEhR/tYbDnaJq','2022-10-02 21:57:40','http://localhost:3000/images/gerard1664788655829.jpg'),(265,'ADMIN',1,'Real','Louise','louise@gmail.com','$2b$10$8UzevRPmS0fcQQ.uZu18nuPd1iyiSmSIylXHGP1B8f2pO8rDCeYG2','2022-10-07 11:49:27','http://localhost:3000/images/louise1665426464083.webp');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-13 12:57:31
