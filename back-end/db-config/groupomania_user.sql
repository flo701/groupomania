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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (178,'USER','Redancourt','Jean-Christophe','jean@gmail.com','$2b$10$RBLGmF2n2mdoQC1oDk4itOxjONr3uYefSsu5iyxvpw3FqsTPBkwxy','2022-09-17 18:28:56','http://localhost:3000/images/jean-christophe1664548458548.webp'),(194,'USER','Duchemin','Sophie','soso@hello.com','$2b$10$WCeaG7z4/W2mrWQDZRzzW.DxzhpgxQf4h2DxQG10JCRnUsL0IM3Kq','2022-09-25 20:27:06','http://localhost:3000/images/sophie1664548311449.webp'),(195,'USER','Durand','Lola','lola@yahoo.fr','$2b$10$nOvqVkRCUrVQyd7oEkcOsOpvW0cUnON.bMKTZC4Uq8GRdRleUjBNG','2022-09-26 12:26:00','http://localhost:3000/images/lola1664548356413.webp'),(196,'USER','Lefort','Guy','guy@orange.fr','$2b$10$Z.I6dajgWBySeDY8ns1BL.UGVZLUDnSI79kB7LUw4zRgMi7ko0VsK','2022-09-26 18:07:32','http://localhost:3000/images/guy1664704133834.webp'),(230,'USER','Lun','Gérard ','gege@gmail.com','$2b$10$jASVJLABSc/0nKH0F2m2e.UipWTwfJ84/iCzKDSwC.9RQSXS5WRfe','2022-10-02 21:57:40','http://localhost:3000/images/gerard1664788655829.jpg'),(265,'ADMIN','Real','Louise','louise@gmail.com','$2b$10$DzdCTuUgIu0hVBWcymqkQec0BrMJslD4r.mIJyrOHyCP9J3eOL.SK','2022-10-07 11:49:27','http://localhost:3000/images/louise1665136441367.webp');
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

-- Dump completed on 2022-10-07 12:10:37
