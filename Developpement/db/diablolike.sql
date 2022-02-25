-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 25 fév. 2022 à 18:34
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `diablolike`
--

-- --------------------------------------------------------

--
-- Structure de la table `capacity`
--

CREATE TABLE `capacity` (
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `lvl` tinyint(4) NOT NULL,
  `puissance` float NOT NULL DEFAULT 0,
  `description` varchar(500) COLLATE utf8_bin NOT NULL DEFAULT 'This is a capacity',
  `urlImage` varchar(500) COLLATE utf8_bin NOT NULL DEFAULT '../assets/img/capacity/null.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `character`
--

CREATE TABLE `character` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `lvl` tinyint(4) NOT NULL DEFAULT 1,
  `hp` float DEFAULT NULL,
  `maxHP` float NOT NULL,
  `mp` float DEFAULT NULL,
  `MaxMP` float NOT NULL,
  `classID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `character`
--

INSERT INTO `character` (`id`, `name`, `lvl`, `hp`, `maxHP`, `mp`, `MaxMP`, `classID`) VALUES
(1, 'xxX', 1, 10, 100, 1, 100, 1),
(2, 'test', 1, 10, 100, 1, 1, 2),
(3, 'ok', 1, 10, 100, 1, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(500) COLLATE utf8_bin NOT NULL DEFAULT 'Lore of the class',
  `baseHp` float NOT NULL,
  `baseMp` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `class`
--

INSERT INTO `class` (`id`, `name`, `description`, `baseHp`, `baseMp`) VALUES
(1, 'Archer', 'test', 10, 1),
(2, 'Wizard', '', 10, 1),
(3, 'Warrior', '', 10, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'Jm',
  `firstname` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'Jean',
  `lastname` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'Michel',
  `password` varchar(500) COLLATE utf8_bin NOT NULL,
  `email` varchar(254) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `capacity`
--
ALTER TABLE `capacity`
  ADD PRIMARY KEY (`name`,`lvl`);

--
-- Index pour la table `character`
--
ALTER TABLE `character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chracterClass` (`classID`);

--
-- Index pour la table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mailUnique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `character`
--
ALTER TABLE `character`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `character`
--
ALTER TABLE `character`
  ADD CONSTRAINT `chracterClass` FOREIGN KEY (`classID`) REFERENCES `class` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
