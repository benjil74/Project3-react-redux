-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2023 at 03:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `holidays`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userID` int(11) NOT NULL,
  `holidayID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `holidayID`) VALUES
(38, 112),
(38, 109),
(38, 106),
(38, 103),
(40, 101),
(40, 111),
(40, 112),
(42, 111),
(42, 109),
(42, 102),
(42, 105),
(41, 109),
(41, 107),
(41, 111),
(43, 109),
(43, 105),
(43, 111),
(44, 110),
(44, 103),
(44, 109),
(45, 103),
(45, 101),
(45, 111),
(41, 101),
(41, 171),
(41, 112),
(41, 103),
(46, 103),
(46, 171),
(46, 109),
(46, 112),
(47, 101),
(47, 104),
(47, 107),
(47, 109),
(48, 101),
(48, 171),
(48, 109),
(48, 112),
(49, 103),
(49, 106),
(49, 107),
(50, 110),
(50, 106),
(50, 109),
(50, 105),
(41, 110);

-- --------------------------------------------------------

--
-- Table structure for table `holidays_list`
--

CREATE TABLE `holidays_list` (
  `holidayID` int(50) NOT NULL,
  `place` varchar(50) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(10) NOT NULL,
  `imageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays_list`
--

INSERT INTO `holidays_list` (`holidayID`, `place`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(101, 'Paris', 'Paris is the capital and most populous city of France. With an official estimated population of 2,102,650 residents in an area of more than 105 km2, Paris is the fifth-most populated city in the European Union.', '2023-12-03', '2023-12-10', 6700, 'd1bd9136-fb40-4c1a-95ec-f3a2beb0d0ee_Paris.png'),
(102, 'Madrid', 'Capital of Spain and the greatest city of the country, Madrid is in the middle of the Iberic Peninsula.', '2023-12-29', '2024-01-08', 6000, '79bbfc2a-322d-496a-9bf8-f6ae8820624f_Madrid.png'),
(103, 'London', 'London is the capital and largest city of England and the United Kingdom, with a population of around 8.8 million. It stands on the River Thames in south-east England.', '2023-12-07', '2024-01-18', 9900, 'f57172bb-58bd-40c6-9dd7-48b86c791628_Londres.png'),
(104, 'Cancún', 'Cancún is a city in southeast Mexico on the northeast coast of the Yucatán Peninsula in the Mexican state of Quintana Roo.  It is a significant tourist destination in Mexico.', '2023-12-07', '2023-12-14', 8100, '1b12e2ca-fdec-473d-8e74-ab877014ab92_Cancun.png'),
(105, 'Barcelona', 'Barcelona is Great, really ! It has a nice weather.', '2024-09-28', '2024-10-06', 5500, '34778d5c-21b2-4e53-b5e9-0fa21af03cbe_Barcelonna.png'),
(106, 'Berlin', 'Berlin is the capital of Germany and was formerly divided between Western and Eastern Germany. It is by far the largest city of the country by area and population.', '2023-12-18', '2023-12-26', 6300, '53f0706e-3564-435f-b149-d628885c5505_Berlin.png'),
(107, 'Prague', 'Prague is the capital and largest city of the Czech Republic, and the historical capital of Bohemia. On the Vltava river, Prague is home to about 1.3 million people. ', '2023-12-26', '2024-01-04', 7200, '6c9d6bb2-2442-4633-a724-e80814a68cbc_Prague.png'),
(109, 'Venice', 'Venice is a city in northeastern Italy and the capital of the Veneto region. It is built on a group of 126 islands that are separated by expanses of open water and by canals; portions of the city are linked by 472 bridges.', '2024-01-05', '2024-01-12', 4500, 'a3aa7d95-24e4-40c2-b54a-fe701eb90fbe_Venise.png'),
(110, 'Rome', 'Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale.', '2023-12-01', '2023-12-08', 7000, '5237eae7-ff04-4b98-b4e9-1553315e1372_Rome.png'),
(111, 'New York', 'The most fascinating city on Earth, the Big Apple is where everything happens !', '2024-01-15', '2024-01-29', 9000, '1f9c1af2-a18c-43b5-8157-986b68c80bda_New_York.png'),
(112, 'Santorini', 'Santorini, officially Thira and Classical Greek Thera, is an island in the southern Aegean Sea, about 200 km southeast from the Greek mainland. It is the largest island of a small circular archipelago.', '2024-02-05', '2024-02-12', 3800, 'da57bd79-0e0c-4471-856c-d21373433f4d_Santorini.png'),
(171, 'Dead Sea', 'The lowest place on Earth, one of the miracle of the planet, is a salt lake bordered by Israel and Jordan.  It lies in the Jordan Rift Valley, and its main tributary is the Jordan River.', '2023-12-15', '2023-12-22', 4599, 'fd67a2b8-9984-46b9-8412-fbf4d7df5a6e_Dead Sea.png');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `filename` varchar(60) NOT NULL,
  `name` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `filename`, `name`) VALUES
(1, 'dd8a2350-2f15-438b-bc7a-59cb589f5d29_batumi.png', 'bat');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `uuid` varchar(48) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `email`, `password`, `uuid`, `role`) VALUES
(37, 'Binyamin', 'Lachkar', 'benjilachkar@gmail.com', '205d7d1cce0cbb0df564d06ba2fc8b988eafb48357895638fe4ca70dd2b2f7e6792cce93bd82ab9fb06309ed5cd24162336632972e6163d7f0f40c2a0dc60022', '8255b557-a3f8-4124-ba32-7777279efebf', 'admin'),
(38, 'Henry', 'Cavill', 'henrycav@gmail.com', '84f44f69a7256b53ccde7220f8de9ae698adaec1cec074e77516ec6103875e83c911c41c610d2734236ed370af4de8ee87d2a9364ef8aa606590ebffe4719272', 'c95d28d4-b772-4d1a-93ad-09beefcf8e96', ''),
(39, 'Dalia', 'Albertstein', 'daliam@hotmail.com', 'd10ddc2d4e825f92694f30e69513ff2249af21d15f28c6c6de7a5d95f16030d96d705ee6e80e17a46715e6d784564bf1933e6d79bb050dccc37c153f1d1373ef', 'fb07c21e-3a37-4ded-ba4c-6762686e61bf', ''),
(40, 'Avi', 'Cohen', 'avic@gmail.com', '620a15229e0741590caa95299c63b6a1d672349c7a64c628592bb737b3092e428c72d8f81c0eb4739981b839b129adef288f2877de495f3a7c172a8fc107018a', 'e73764d3-4681-464c-ac9e-c4ba35aba2de', ''),
(41, 'Myriam', 'Colona', 'mimicoco@gmail.com', 'f4c46184957955852ad2c037954a62762da203645069471b7a76baa91d551bc87007b00fafd26163a6ac4b586622604c15eec6410e3338708808bc911c115117', '2a56a212-0c85-41a2-bf5c-a3a67814d328', ''),
(42, 'Albert', 'Einstein', 'alberte@gmail.com', 'a89b4937205b508c24a2be27361ab66255f996f9d5d69831829e5294c565687236632a4643444d7e2a7528345840e6df6585d94282e06466b68fa581464839d8', '43e4d824-ed25-494b-933e-0454f9abc7ec', ''),
(43, 'Ariel', 'Vaknin', 'arielv@gmail.com', 'a89b4937205b508c24a2be27361ab66255f996f9d5d69831829e5294c565687236632a4643444d7e2a7528345840e6df6585d94282e06466b68fa581464839d8', '62f66f88-9705-4faf-b29f-2d9a16262348', ''),
(44, 'Tami', 'Carmeli', 'tamic@gmail.com', '620a15229e0741590caa95299c63b6a1d672349c7a64c628592bb737b3092e428c72d8f81c0eb4739981b839b129adef288f2877de495f3a7c172a8fc107018a', '4e24eab6-1ccb-4b17-bb0c-c83a675b37ce', ''),
(45, 'Naomi', 'Talia', 'naomit@gmail.com', 'df97c258736257ac1f27aca4fe947bfb984d932a816a7c02a87e1845c69cc5283e06f8405a0b3afb745a5f11b9327efbc66031beec3934b5af18ebcd72b63b64', '5d069c6c-2151-41b2-afca-7e97e9dc2f98', ''),
(46, 'Kfir', 'Levi', 'kfirl@gmail.com', '8078c9be91ea40955328b140e62267e33c451e2e64b5c4aeb600b2eeb88be0fbeec2aadab22c2889232c29e33a3bda14ba9fa8c33170035368f3ebae7b36be33', 'fa1781ba-8023-494b-b3a6-d311ae8b37e7', ''),
(47, 'Dov', 'Arieli', 'dova@gmail.com', 'b2de4f05065bc8234c34f071c7c3aac653cba046e56bd6ffd41db3f4872a1de71fee9aae7eae2119c891453ee9b68307d2ce2aebff19eff4eb50506da3066edf', '2b5463c7-4354-434f-9864-770ad9391b5a', ''),
(48, 'Michael', 'Lev', 'michaell@gmail.com', '0d593433ce4092ea83454e13d600195a62b0ed2d67f93d72315fd0ec2b562e175c5effe64d7444a0dd7bd7f38a79e5446be9c29f95d836f3bd783c94eed6ae55', '9af424c3-30bf-4a6b-bd30-e5a187a6b0a2', ''),
(49, 'Hanna', 'Stein', 'hannas@gmail.com', '84f44f69a7256b53ccde7220f8de9ae698adaec1cec074e77516ec6103875e83c911c41c610d2734236ed370af4de8ee87d2a9364ef8aa606590ebffe4719272', '89b75dd6-685d-42d8-9e89-b057afac7ef2', ''),
(50, 'Eva', 'Layani', 'eval@gmail.com', 'f4c46184957955852ad2c037954a62762da203645069471b7a76baa91d551bc87007b00fafd26163a6ac4b586622604c15eec6410e3338708808bc911c115117', '5a5eb22f-9d2e-418a-83be-d0603e3e7b82', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userID` (`userID`),
  ADD KEY `holydayID` (`holidayID`);

--
-- Indexes for table `holidays_list`
--
ALTER TABLE `holidays_list`
  ADD PRIMARY KEY (`holidayID`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `holidays_list`
--
ALTER TABLE `holidays_list`
  MODIFY `holidayID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`holidayID`) REFERENCES `holidays_list` (`holidayID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
