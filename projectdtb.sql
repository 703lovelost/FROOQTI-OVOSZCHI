-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 06 2021 г., 20:06
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `projectdtb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bin_account`
--

CREATE TABLE `bin_account` (
  `id` int(11) NOT NULL,
  `cookie` varchar(50) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `price` varchar(20) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `finalprice` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `photo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`item_id`, `category`, `photo`, `name`, `price`) VALUES
(1, 1, '/images/category1/grannysmith.jpg', 'Бабущка Смитх', '115'),
(2, 1, '/images/category1/redprince.jpg', 'Красний Принпц', '125'),
(3, 1, '/images/category1/gala.jpg', 'Гала', '110'),
(4, 1, '/images/category1/semerenko.jpg', 'СЕМЕРЕНКО', '105'),
(5, 2, '/images/category2/orange.jpg', 'Апельсинпс', '80'),
(6, 2, '/images/category2/tangerine.jpg', 'манда рин', '130'),
(7, 2, '/images/category2/grapefruit.jpg', 'гейпфрукт (не знаю как правильно)', '100'),
(8, 2, '/images/category2/lime.jpg', 'Лайм', '95'),
(9, 2, '/images/category2/lemon.jpg', 'леман', '80'),
(10, 3, '/images/category3/greenlook.jpg', 'зильоний лук', '85'),
(11, 3, '/images/category3/raplook.jpg', 'реп чатий лук', '40'),
(12, 3, '/images/category3/sevoklook.jpg', 'мини лук)', '35'),
(13, 3, '/images/category3/poreylook.jpeg', 'лук порея', '140'),
(14, 4, '/images/categorysekerin/rich.jpg', 'богатий', '500000'),
(15, 4, '/images/categorysekerin/drunk.jpg', 'торчок', '270000'),
(16, 4, '/images/categorysekerin/bodyguard.jpg', 'охраняет', '300000'),
(17, 4, '/images/categorysekerin/diver.jpg', 'купаца', '450000');

-- --------------------------------------------------------

--
-- Структура таблицы `pass`
--

CREATE TABLE `pass` (
  `login` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `pass`
--

INSERT INTO `pass` (`login`, `pass`) VALUES
('werwer', 'werwer'),
('bruh', 'bruh'),
('cookie', 'pookie'),
('retard', 'stoopid'),
('boolka', 'kekeshka'),
('zdarova', 'zdarova'),
('onyokponyok', 'tyulen');

-- --------------------------------------------------------

--
-- Структура таблицы `sessionlog`
--

CREATE TABLE `sessionlog` (
  `session_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sessionlog`
--

INSERT INTO `sessionlog` (`session_name`, `login`) VALUES
('onyokponyoktyulen', 'onyokponyok');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bin_account`
--
ALTER TABLE `bin_account`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bin_account`
--
ALTER TABLE `bin_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
