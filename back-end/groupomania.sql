-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 31 jan. 2023 à 19:01
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `post_id`) VALUES
(1275, 195, 279),
(1423, 195, 315),
(1425, 194, 138),
(1427, 194, 331),
(1433, 178, 331),
(1436, 178, 291),
(1446, 196, 138),
(1464, 196, 456),
(1473, 196, 292),
(1518, 265, 292),
(1556, 265, 291),
(1562, 265, 331),
(1565, 266, 456);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` varchar(255) NOT NULL,
  `creationDate` datetime DEFAULT current_timestamp(),
  `image` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `postLikes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `title`, `description`, `creationDate`, `image`, `user_id`, `postLikes`) VALUES
(138, 'On a (encore) le droit de rêver...', 'Alors profitons-en ! Toutefois, je trouve les habitations un peu trop sages et alignées. Chacune mériterait de se différencier des autres... comme les êtres humains. Cette photo m\'inspire, tout est relié. Il fallait bien écrire 255 caractères. C\'est fait.', '2022-10-01 14:35:43', 'http://localhost:3000/images/Ile_paradisiaque1664627743032.jpg', 178, 2),
(279, 'Titre avec 40 caractères. Voilà voilà...', 'Description avec 255 caractères. Pour l\'instant, je n\'ai rien de spécial à dire. Alors je ne parle pas pour ne rien dire. Quand j\'aurai quelque chose à dire, je vous le dirai. Wouaaah ! Les répétitions ! Mais c\'était juste pour avoir quelque chose à dire.', '2022-10-13 11:42:24', NULL, 178, 1),
(291, 'Quelle beauté...', 'On a l\'impression qu\'il nous sourit ;-)', '2022-09-27 13:25:51', 'http://localhost:3000/images/dauphin1664276986631.jpg', 194, 2),
(292, 'Nos amis les animaux', 'Aimons-les comme ils nous aiment. Ils sont incroyables...', '2022-09-29 13:41:07', 'http://localhost:3000/images/animaux1664451667893.jpg', 195, 2),
(315, 'Qui me suit ?', 'Je pars profiter un peu de la vie, et prendre soin de moi...', '2022-10-07 22:15:37', 'http://localhost:3000/images/bora-bora21665173737796.jpg', 196, 1),
(331, 'Plongée dans un autre univers', 'J\'ai goûté à une sérénité indescriptible lors de l\'immersion dans cet autre monde... \r\nEt ces couleurs ! C\'est incroyable...', '2022-10-13 11:42:59', 'http://localhost:3000/images/poissons1665174205372.jpg', 230, 3),
(456, 'Incroyable beauté', 'La nature est magnifique !', '2022-10-13 11:42:14', 'http://localhost:3000/images/arbre-a-fleurs1665136546776.webp', 265, 2),
(457, 'Bonjour à tous', 'Nouvelle sur Groupomania, je suis ravie de vous rejoindre ! A bientôt !', '2023-01-29 20:44:19', 'http://localhost:3000/images/georgia-de-lotz-juQWcOiuuPE-unsplash1675021459629.jpg', 266, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `status` varchar(10) DEFAULT 'USER',
  `active` tinyint(1) DEFAULT 1,
  `lastname` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `profileImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `status`, `active`, `lastname`, `firstname`, `email`, `password`, `creationDate`, `profileImage`) VALUES
(178, 'USER', 1, 'Redancourt', 'Jean-Christophe', 'jean@gmail.com', '$2b$10$RBLGmF2n2mdoQC1oDk4itOxjONr3uYefSsu5iyxvpw3FqsTPBkwxy', '2022-09-17 18:28:56', 'http://localhost:3000/images/jean-christophe1664548458548.webp'),
(194, 'USER', 1, 'Duchemin', 'Sophie', 'soso@hello.com', '$2b$10$WCeaG7z4/W2mrWQDZRzzW.DxzhpgxQf4h2DxQG10JCRnUsL0IM3Kq', '2022-09-25 20:27:06', 'http://localhost:3000/images/sophie1664548311449.webp'),
(195, 'USER', 1, 'Durand', 'Lola', 'lola@yahoo.fr', '$2b$10$nOvqVkRCUrVQyd7oEkcOsOpvW0cUnON.bMKTZC4Uq8GRdRleUjBNG', '2022-09-26 12:26:00', 'http://localhost:3000/images/lola1664548356413.webp'),
(196, 'USER', 1, 'Lefort', 'Guy', 'guy@orange.fr', '$2b$10$Z.I6dajgWBySeDY8ns1BL.UGVZLUDnSI79kB7LUw4zRgMi7ko0VsK', '2022-09-26 18:07:32', 'http://localhost:3000/images/guy1664704133834.webp'),
(230, 'USER', 1, 'Lun', 'Gérard ', 'gege@gmail.com', '$2b$10$IikzWhqHOwle2B8kdTE4deIBjLPp5VYqgvQ5/wgpjEhR/tYbDnaJq', '2022-10-02 21:57:40', 'http://localhost:3000/images/gerard1664788655829.jpg'),
(265, 'ADMIN', 1, 'Real', 'Louise', 'louise@gmail.com', '$2b$10$8UzevRPmS0fcQQ.uZu18nuPd1iyiSmSIylXHGP1B8f2pO8rDCeYG2', '2022-10-07 11:49:27', 'http://localhost:3000/images/louise1665426464083.webp'),
(266, 'USER', 1, 'Latine', 'Mireille', 'mimi@gmail.com', '$2b$10$QZUdr9FC4y9BociQ0D8/Y.upLqgBmWXHMtw4qr7SIv75ub8fiSK4m', '2023-01-29 20:40:11', 'http://localhost:3000/images/photo_de_profil_femme_21675021670811.webp');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_ibfk_1` (`user_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1566;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=458;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=267;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
