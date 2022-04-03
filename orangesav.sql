-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 03 avr. 2022 à 03:54
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `orangesav`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `cin_passport` varchar(15) NOT NULL,
  `Nom` varchar(25) NOT NULL,
  `Prenom` varchar(25) NOT NULL,
  `num_tel1` varchar(12) NOT NULL,
  `num_tel2` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`cin_passport`, `Nom`, `Prenom`, `num_tel1`, `num_tel2`, `email`) VALUES
('12345678', 'amin', 'bo', '55555555', '', 'amin@mail.com');

-- --------------------------------------------------------

--
-- Structure de la table `device`
--

CREATE TABLE `device` (
  `imei` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `purchase_date` date NOT NULL,
  `guarantee` varchar(20) NOT NULL,
  `nb_return_sav` int(11) NOT NULL,
  `insured` tinyint(1) NOT NULL,
  `client_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `device`
--

INSERT INTO `device` (`imei`, `status`, `purchase_date`, `guarantee`, `nb_return_sav`, `insured`, `client_id`) VALUES
('001122', 'vendy', '2022-01-01', '1', 7, 2, '12345678'),
('0011223344', 'vendu', '2022-04-05', '1', 5, 1, '12345678');

-- --------------------------------------------------------

--
-- Structure de la table `intervention`
--

CREATE TABLE `intervention` (
  `id` int(11) NOT NULL,
  `accessoires` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type_panne` varchar(50) NOT NULL,
  `terminal_pret` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `workflow` varchar(50) NOT NULL,
  `imei` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `intervention`
--

INSERT INTO `intervention` (`id`, `accessoires`, `type_panne`, `terminal_pret`, `description`, `workflow`, `imei`) VALUES
(2, 'chargeur,cable usb', 'ecran', 'terminal_pret', 'test ', 'externe', '001122'),
(3, 'chargeur,cable usb', 'ecran', 'terminal_pret', 'test ', 'externe', '001122'),
(4, 'chargeur,cable usb', 'ecran', 'terminal_pret', 'test ', 'externe', '001122');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `email`, `password`) VALUES
(0, 'amin', 'bo', 'amin@mail.com', '$2b$10$ygBv5rd4DTo85lt.qUd9/ey2qDlUo7MmRDJtqa/.G7ujvNOuuimzS');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`cin_passport`);

--
-- Index pour la table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`imei`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imei` (`imei`);

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
-- AUTO_INCREMENT pour la table `intervention`
--
ALTER TABLE `intervention`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `device_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`cin_passport`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD CONSTRAINT `intervention_ibfk_1` FOREIGN KEY (`imei`) REFERENCES `device` (`imei`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
