-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: userdb
-- ------------------------------------------------------
-- Server version	8.0.37

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
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'User1',NULL,'user1@gmail.com','$2b$05$gmSd4NIpUn1yNFrBWBEIrOME4MaUvZ4jc9NsthgvIQE0NbhllHpfu',NULL,NULL,'2024-06-04 22:38:37.085791'),(2,'User2','User2Surname','user2@gmail.com','$2b$05$r6voCoy6b9CtNuBr1YM66ukBo6RrkwDp7y3RUeyMYsET1mZTVt05y',NULL,NULL,'2024-06-04 22:38:44.674960'),(3,'User3',NULL,'user3@gmail.com','$2b$05$TbR6Lbn3OfihRISkSh5sZeZEyQYPGp91j1fEsy/7p1yEqNUTJu562',NULL,NULL,'2024-06-04 22:38:49.185062'),(4,'User4',NULL,'user4@gmail.com','$2b$05$VPaM4I7ysDrW72j7bzN/xebrYowrgLVuSN9JIrzA./glYhiC9aDLy',NULL,NULL,'2024-06-04 22:38:54.437778'),(5,'User5',NULL,'user5@gmail.com','$2b$05$p5wZsZj69Y89Z1n8D2zNpO3Ztaf3sjk0ySLRF0cloiO6ejkbRk2Ta',NULL,NULL,'2024-06-04 22:38:57.590259'),(6,'User6',NULL,'user6@gmail.com','$2b$05$GwQ.Nfhhui.EgBULVHgT6OmJjsHR9CBqZAEHOK/0W58a5Tyw4VZRG',NULL,NULL,'2024-06-04 22:39:01.746224'),(7,'User7',NULL,'user7@gmail.com','$2b$05$XclsOn73XveqUt9Kms.5ke5AX3y9uK0XMrm/RJnrQwVHR9bFh8Azi',NULL,NULL,'2024-06-04 22:39:06.845430'),(8,'User8','User2Surname','user8@gmail.com','$2b$05$gBy4FU/AAklmQdpG3tg0Ke2I0KJXJpBreEOeF1gCcZamvRToVKqjm','male',NULL,'2024-06-04 22:40:48.012727');
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

-- Dump completed on 2024-06-04 23:04:17
