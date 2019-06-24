-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2019 at 07:35 AM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--

-- --------------------------------------------------------

--
-- Table structure for table `todolist`
--

CREATE TABLE `todolist` (
  `todo_id` int(10) NOT NULL,
  `todo_item` varchar(100) NOT NULL,
  `todo_user` varchar(50) NOT NULL,
  `todo_status` varchar(20) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `todolist`
--

INSERT INTO `todolist` (`todo_id`, `todo_item`, `todo_user`, `todo_status`) VALUES
(1, 'Wake up', 'test', 'completed'),
(3, 'Make Breakfast', 'test', 'completed'),
(10, 'adding todolist in database', 'testuser', 'active'),
(14, 'Adding an active todo', 'testuser', 'active'),
(15, 'Add todo on saturday', 'testuser', 'completed'),
(18, 'Adding todo to be marked as completed', 'testuser', 'completed'),
(19, 'Testing complete functionality', 'test', 'completed'),
(24, 'Hellooooooo', '', 'active'),
(29, 'ASDasdal;ksdmasd', 'testinguser', 'active'),
(30, 'klasndlkasjoiasjoakmsc', 'testinguser', 'active'),
(31, 'alkjsdloihsc;oknhsc;kajcsasc', 'testinguser', 'completed'),
(32, 'klasjdlaksjdaisjlaksnc', 'testinguser', 'completed'),
(33, 'asdjkasbkcjas', 'react.node', 'active'),
(34, 'jasnhdkjasnckja sc', 'react.node', 'active'),
(35, 'akjskajsnkajs kams c', 'react.node', 'completed'),
(36, 'kasbckajsbckajsbckajscb asc', 'react.node', 'completed'),
(40, 'head to office', 'test', 'active'),
(41, 'configure email functionality', 'test', 'active'),
(42, 'set logout button', 'test', 'completed'),
(43, 'style remove and mark complete button', 'test', 'completed'),
(54, 'kjasndkjanskda', 'taher.husain', 'completed'),
(55, 'kasn dkajsndkjadsn', 'taher.husain', 'completed'),
(56, 'akjsndakjsndkajdsn', 'taher.husain', 'completed'),
(57, 'akjsdnkajsdnkasndk', 'taher.husain', 'completed'),
(58, 'akjsdnkajsndkamnsd', 'taher.husain', 'active'),
(59, 'a;lps,d;alsm,d;la,smdlas', 'taher.husain', 'active'),
(60, 'as,d a.s,dm.as,md.a,smd.a,sd', 'taher.husain', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `todousers`
--

CREATE TABLE `todousers` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `Token` int(100) DEFAULT NULL,
  `user_created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `todousers`
--

INSERT INTO `todousers` (`user_id`, `user_name`, `email`, `password`, `Token`, `user_created`) VALUES
(101, 'test', 'test@test.com', '123456', NULL, '2019-06-20 22:05:44'),
(102, 'usertesting', 'taher@test.com', '123456789', NULL, '2019-06-22 18:39:19'),
(103, 'testinguser', 'taher', '123456789', NULL, '2019-06-22 18:46:36'),
(106, 'todotest', 'todotest@test.com', '111111', NULL, '2019-06-22 19:52:46'),
(108, 'react.node', 'react@node.com', '123456789', NULL, '2019-06-23 19:36:04'),
(118, 'taher.husain', 'taherhusain7@gmail.com', '123456789', NULL, '2019-06-23 21:45:21'),
(120, '', '', '', NULL, '2019-06-24 00:35:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todolist`
--
ALTER TABLE `todolist`
  ADD PRIMARY KEY (`todo_id`);

--
-- Indexes for table `todousers`
--
ALTER TABLE `todousers`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todolist`
--
ALTER TABLE `todolist`
  MODIFY `todo_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `todousers`
--
ALTER TABLE `todousers`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
