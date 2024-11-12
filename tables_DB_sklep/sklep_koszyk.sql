-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2024 at 07:38 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sklep`
--

-- --------------------------------------------------------

--
-- Table structure for table `sklep_koszyk`
--

CREATE TABLE `sklep_koszyk` (
  `id` int(11) NOT NULL,
  `produkt_id` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `ilosc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sklep_koszyk`
--

INSERT INTO `sklep_koszyk` (`id`, `produkt_id`, `nazwa`, `cena`, `ilosc`) VALUES
(8, 1, 'Okno drewniane <br/> 1000 x 600 mm', '1042.00', 3),
(9, 2, 'Okno drewniane <br/> 700 x 2250 mm', '1314.00', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sklep_koszyk`
--
ALTER TABLE `sklep_koszyk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produkt_id` (`produkt_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sklep_koszyk`
--
ALTER TABLE `sklep_koszyk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sklep_koszyk`
--
ALTER TABLE `sklep_koszyk`
  ADD CONSTRAINT `sklep_koszyk_ibfk_1` FOREIGN KEY (`produkt_id`) REFERENCES `sklep_produkty` (`produkt_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
