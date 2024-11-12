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
-- Table structure for table `sklep_produkty`
--

CREATE TABLE `sklep_produkty` (
  `produkt_id` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `zdjecie` varchar(50) DEFAULT NULL,
  `cena` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sklep_produkty`
--

INSERT INTO `sklep_produkty` (`produkt_id`, `nazwa`, `zdjecie`, `cena`) VALUES
(1, 'Okno drewniane <br/> 1000 x 600 mm', 'okno-drewniane-1000-x-600-mm', '1042.00'),
(2, 'Okno drewniane <br/> 700 x 2250 mm', 'okno-drewniane-700-x-2250-mm', '1314.00'),
(3, 'Okno drewniane <br/> 800 x 1450 mm', 'okno-drewniane-800-x-1450-mm', '1316.00'),
(4, 'Okno drewniane <br/> 700 x 2350 mm', 'okno-drewniane-700-x-2350-mm', '1367.00'),
(5, 'Okno drewniane <br/> 900 x 1500 mm', 'okno-drewniane-900-x-1500-mm', '1603.00'),
(6, 'Okno drewniane <br/> 1000 x 1000 mm', 'okno-drewniane-1000-x-1000-mm', '1617.00'),
(7, 'Okno drewniane <br/> 1500 x 1500 mm', 'okno-drewniane-1500-x-1500-mm', '2000.00'),
(8, 'Okno drewniane <br/> 900 x 2150 mm', 'okno-drewniane-900-x-2150-mm', '2048.00'),
(9, 'Okno drewniane <br/> 1000 x 2000 mm', 'okno-drewniane-1000-x-2000-mm', '2065.00'),
(10, 'Okno drewniane <br/> 900 x 2250 mm', 'okno-drewniane-900-x-2250-mm', '2111.00'),
(11, 'Okno drewniane <br/> 1200 x 1450 mm', 'okno-drewniane-1200-x-1450-mm', '2151.00'),
(12, 'Okno drewniane <br/> 900 x 2350 mm', 'okno-drewniane-900-x-2350-mm', '2172.00'),
(13, 'Okno drewniane <br/> 1340 x 1360 mm', 'okno-drewniane-1340-x-1360-mm', '2237.00'),
(14, 'Okno drewniane <br/> 700 x 1400 mm', 'okno-drewniane-700-x-1400-mm', '3153.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sklep_produkty`
--
ALTER TABLE `sklep_produkty`
  ADD PRIMARY KEY (`produkt_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sklep_produkty`
--
ALTER TABLE `sklep_produkty`
  MODIFY `produkt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
