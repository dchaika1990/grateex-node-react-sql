-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Сен 02 2021 г., 13:40
-- Версия сервера: 5.7.35-0ubuntu0.18.04.1
-- Версия PHP: 7.2.34-24+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `grateex`
--

-- --------------------------------------------------------

--
-- Структура таблицы `adminsEmails`
--

CREATE TABLE `adminsEmails` (
  `id` int(11) NOT NULL,
  `emailAbusive` varchar(255) COLLATE utf8_bin DEFAULT '',
  `emailRegistered` varchar(255) COLLATE utf8_bin DEFAULT '',
  `roles` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `adminsEmails`
--

INSERT INTO `adminsEmails` (`id`, `emailAbusive`, `emailRegistered`, `roles`) VALUES
(1, 'dchaika1990@gmail.com', 'dchaika1990@gmail.com', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `label` varchar(255) COLLATE utf8_bin DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `label`, `created_at`, `updated_at`, `status`, `parent_id`) VALUES
(1, 'Agriculture', '2021-08-07 08:05:53', '2021-08-07 08:05:53', 1, NULL),
(2, 'Anthropology', '2021-08-07 08:05:53', '2021-08-07 08:05:53', 1, NULL),
(3, 'Agroecology', '2021-08-07 08:06:11', '2021-08-19 14:21:18', 1, 1),
(4, 'Animal husbandry (Animal science)', '2021-08-07 08:06:11', '2021-08-07 08:06:11', 1, 1),
(5, 'Agrology', '2021-08-07 08:06:26', '2021-08-07 08:06:26', 1, 1),
(6, 'Beekeeping (Apiculture)', '2021-08-07 08:06:26', '2021-08-07 08:06:26', 1, 4),
(7, 'Anthropological criminology', '2021-08-07 08:06:40', '2021-08-25 09:24:43', 1, 2),
(8, 'Anthropological linguistics', '2021-08-07 08:06:40', '2021-08-07 08:06:40', 1, 2),
(9, 'Synchronic linguistics (or Descriptive linguistics)', '2021-08-07 08:06:52', '2021-08-07 08:06:52', 1, 8),
(10, 'Diachronic linguistics (or Historical linguistics)', '2021-08-07 08:06:52', '2021-08-07 08:06:52', 1, 8),
(11, '1111111', '2021-08-25 14:40:38', '2021-08-25 14:40:38', 1, 6),
(12, '222222222233333', '2021-08-25 14:40:43', '2021-08-26 09:35:58', 1, 11),
(13, '3333333333', '2021-08-25 14:40:47', '2021-08-25 14:40:47', 1, 12),
(14, 'test', '2021-08-26 05:39:36', '2021-08-26 05:39:36', 1, 10),
(15, 'test2', '2021-08-26 05:39:57', '2021-08-26 05:39:57', 1, 10),
(16, 'test3', '2021-08-26 05:40:01', '2021-08-26 05:40:01', 1, 10),
(17, 'test4', '2021-08-26 05:40:06', '2021-08-26 05:40:06', 1, 10),
(18, 'test1', '2021-08-26 05:40:14', '2021-08-26 05:40:14', 1, 14),
(19, 'test5', '2021-08-26 05:40:30', '2021-08-26 05:40:30', 1, 14),
(20, 'test6', '2021-08-26 07:01:55', '2021-08-26 07:01:55', 1, 19),
(21, 'test7', '2021-08-26 07:02:16', '2021-08-26 07:02:16', 1, 17),
(23, 'ag 2', '2021-08-26 07:04:56', '2021-08-26 10:53:04', 1, 35),
(24, 'ag 3', '2021-08-26 07:05:01', '2021-08-26 07:05:01', 1, 3),
(26, 'ag 5', '2021-08-26 07:06:09', '2021-08-26 07:06:09', 1, 3),
(27, 'ag 6', '2021-08-26 07:06:14', '2021-08-26 07:06:14', 1, 3),
(28, 'ag 7', '2021-08-26 07:10:40', '2021-08-26 07:10:40', 1, 3),
(29, 'ag 8', '2021-08-26 07:10:52', '2021-08-26 07:10:52', 1, 3),
(34, 'gjghjgh', '2021-08-26 07:13:33', '2021-08-26 07:13:33', 1, NULL),
(35, 'ad', '2021-08-26 07:13:45', '2021-08-26 07:13:45', 1, NULL),
(36, 'ab1', '2021-08-26 07:15:14', '2021-08-26 10:49:24', 1, NULL),
(37, 'bg 1', '2021-08-26 07:15:39', '2021-08-26 07:15:39', 1, 3),
(38, 'cd 1', '2021-08-26 07:15:45', '2021-08-26 07:15:45', 1, 3),
(39, 'bg 2', '2021-08-26 07:15:49', '2021-08-26 07:15:49', 1, 3),
(40, 'cd 2', '2021-08-26 07:45:51', '2021-08-26 07:45:51', 1, 3),
(41, 'cd 3', '2021-08-26 07:45:54', '2021-08-26 07:45:54', 1, 3),
(42, 'cd 4', '2021-08-26 07:45:58', '2021-08-26 07:45:58', 1, 3),
(44, '111111111', '2021-08-27 05:47:08', '2021-08-27 05:47:08', 1, 21);

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8_bin DEFAULT '',
  `approved` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `content`, `approved`, `createdAt`, `updatedAt`, `userId`, `productId`, `parent_id`) VALUES
(1, 'Hello', 1, '2021-08-30 08:27:22', '2021-08-30 08:27:22', 19, 8, NULL),
(2, 'Hi', 1, '2021-08-30 08:27:43', '2021-08-30 08:27:43', 18, 8, 1),
(3, 'Hihihi', 1, '2021-08-30 08:37:15', '2021-08-30 08:37:15', 18, 8, 1),
(4, 'sdsds', 1, '2021-08-30 09:35:03', '2021-08-30 09:35:03', 18, 8, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `degreeLevels`
--

CREATE TABLE `degreeLevels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `degreeLevels`
--

INSERT INTO `degreeLevels` (`id`, `name`) VALUES
(1, 'Bachelor'),
(2, 'Master'),
(3, 'Doctoral'),
(4, 'Associate'),
(5, 'Other');

-- --------------------------------------------------------

--
-- Структура таблицы `filters`
--

CREATE TABLE `filters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `formats`
--

CREATE TABLE `formats` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `formats`
--

INSERT INTO `formats` (`id`, `name`) VALUES
(1, 'PDF'),
(2, 'MS Office'),
(3, 'Latex/Lyx'),
(4, 'Other');

-- --------------------------------------------------------

--
-- Структура таблицы `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `languages`
--

INSERT INTO `languages` (`id`, `name`) VALUES
(1, 'English'),
(2, 'Spanish'),
(3, 'German'),
(4, 'Other');

-- --------------------------------------------------------

--
-- Структура таблицы `populations`
--

CREATE TABLE `populations` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `populations`
--

INSERT INTO `populations` (`id`, `title`) VALUES
(1, 'Learning difficulties'),
(2, 'Mild to severe disabilities'),
(3, 'Autism spectrum'),
(4, 'Emerging bilinguals/ELs/ESOLs/ENLs');

-- --------------------------------------------------------

--
-- Структура таблицы `productCategories`
--

CREATE TABLE `productCategories` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productCategories`
--

INSERT INTO `productCategories` (`id`, `productId`, `categoryId`) VALUES
(22, 1, 2),
(21, 1, 8),
(20, 1, 10),
(19, 8, 2),
(18, 8, 8),
(17, 8, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `productDegreeLevels`
--

CREATE TABLE `productDegreeLevels` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `degreeLevelId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productDegreeLevels`
--

INSERT INTO `productDegreeLevels` (`id`, `productId`, `degreeLevelId`) VALUES
(6, 1, 2),
(7, 1, 3),
(8, 1, 4),
(3, 8, 1),
(4, 8, 3),
(5, 8, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `productFiles`
--

CREATE TABLE `productFiles` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) COLLATE utf8_bin DEFAULT '',
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productFiles`
--

INSERT INTO `productFiles` (`id`, `file_name`, `productId`) VALUES
(3, 'b597981a-d922-4e82-941b-4abab53169ef/fc2f258b-72b8-4f89-bca2-1d96aab8b237/bg-before-footer.jpg', 8),
(4, 'b597981a-d922-4e82-941b-4abab53169ef/fc2f258b-72b8-4f89-bca2-1d96aab8b237/categories (1) (3) (1).sql', 8),
(5, 'b597981a-d922-4e82-941b-4abab53169ef/88fd1935-b496-4ddf-9bf2-798c0b59e593/tinified.zip', 1),
(6, 'b597981a-d922-4e82-941b-4abab53169ef/88fd1935-b496-4ddf-9bf2-798c0b59e593/generatedBy_react-csv (3).csv', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `productFilters`
--

CREATE TABLE `productFilters` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `FilterId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `productFormats`
--

CREATE TABLE `productFormats` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `formatId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productFormats`
--

INSERT INTO `productFormats` (`id`, `productId`, `formatId`) VALUES
(6, 1, 2),
(4, 8, 1),
(5, 8, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `productImgs`
--

CREATE TABLE `productImgs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT 'placeholder-bg.png',
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `productLanguages`
--

CREATE TABLE `productLanguages` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `languageId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productLanguages`
--

INSERT INTO `productLanguages` (`id`, `productId`, `languageId`) VALUES
(5, 1, 1),
(4, 1, 3),
(3, 8, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `productPreviewFiles`
--

CREATE TABLE `productPreviewFiles` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) COLLATE utf8_bin DEFAULT '',
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productPreviewFiles`
--

INSERT INTO `productPreviewFiles` (`id`, `file_name`, `productId`) VALUES
(2, 'b597981a-d922-4e82-941b-4abab53169ef/fc2f258b-72b8-4f89-bca2-1d96aab8b237/generatedBy_react-csv (2).csv', 8),
(3, 'b597981a-d922-4e82-941b-4abab53169ef/fc2f258b-72b8-4f89-bca2-1d96aab8b237/generatedBy_react-csv (1).csv', 8),
(4, 'b597981a-d922-4e82-941b-4abab53169ef/fc2f258b-72b8-4f89-bca2-1d96aab8b237/generatedBy_react-csv.csv', 8),
(5, 'b597981a-d922-4e82-941b-4abab53169ef/88fd1935-b496-4ddf-9bf2-798c0b59e593/generatedBy_react-csv.csv', 1),
(6, 'b597981a-d922-4e82-941b-4abab53169ef/88fd1935-b496-4ddf-9bf2-798c0b59e593/generatedBy_react-csv (2).csv', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `productResourceTypes`
--

CREATE TABLE `productResourceTypes` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `resourceTypeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productResourceTypes`
--

INSERT INTO `productResourceTypes` (`id`, `productId`, `resourceTypeId`) VALUES
(7, 1, 1),
(6, 1, 4),
(3, 8, 1),
(4, 8, 3),
(5, 8, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_bin DEFAULT '',
  `description` varchar(3000) COLLATE utf8_bin DEFAULT '',
  `excerpt` varchar(200) COLLATE utf8_bin DEFAULT '',
  `price` varchar(255) COLLATE utf8_bin DEFAULT '',
  `productLink` varchar(255) COLLATE utf8_bin DEFAULT '',
  `ratingLevel` float DEFAULT '0',
  `countReviews` int(11) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int(11) DEFAULT NULL,
  `productTypePriceId` int(11) DEFAULT NULL,
  `productStatusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `excerpt`, `price`, `productLink`, `ratingLevel`, `countReviews`, `createdAt`, `updatedAt`, `userId`, `productTypePriceId`, `productStatusId`) VALUES
(1, 'Product', '<p><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans\", Arial, sans-serif;\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span></p>\n', 'FREE Updates for LIFE! This #1 Selling Teacher Binder is Editable and Customizable!', '0', '88fd1935-b496-4ddf-9bf2-798c0b59e593', 5, 1, '2021-08-30 09:45:18', '2021-08-30 09:56:00', 18, 1, 3),
(2, 'Post 2', '<p></p>\n', 'FREE Updates for LIFE! This #1 Selling Teacher Binder is Editable and Customizable!', '0', '8b838e6d-3495-479e-ae22-689265d0b92a', 0, 0, '2021-08-30 09:47:10', '2021-08-30 09:47:10', 18, 1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `productStatuses`
--

CREATE TABLE `productStatuses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productStatuses`
--

INSERT INTO `productStatuses` (`id`, `name`) VALUES
(1, 'Draft'),
(2, 'Pending approval'),
(3, 'Approved'),
(4, 'Rejected');

-- --------------------------------------------------------

--
-- Структура таблицы `productTypePrices`
--

CREATE TABLE `productTypePrices` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productTypePrices`
--

INSERT INTO `productTypePrices` (`id`, `name`) VALUES
(1, 'Free'),
(2, 'Paid');

-- --------------------------------------------------------

--
-- Структура таблицы `productTypeSellings`
--

CREATE TABLE `productTypeSellings` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `typeSellingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `productTypeSellings`
--

INSERT INTO `productTypeSellings` (`id`, `productId`, `typeSellingId`) VALUES
(4, 1, 1),
(3, 8, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `resourceTypes`
--

CREATE TABLE `resourceTypes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `resourceTypes`
--

INSERT INTO `resourceTypes` (`id`, `name`) VALUES
(1, 'Entire course'),
(2, 'Syllabus'),
(3, 'Lecture notes & slides'),
(4, 'Problem sets & quizzes'),
(5, 'Examples and illustrations'),
(6, 'Exams'),
(7, 'Other');

-- --------------------------------------------------------

--
-- Структура таблицы `reviewPopulations`
--

CREATE TABLE `reviewPopulations` (
  `id` int(11) NOT NULL,
  `reviewId` int(11) DEFAULT NULL,
  `populationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `reviewPopulations`
--

INSERT INTO `reviewPopulations` (`id`, `reviewId`, `populationId`) VALUES
(38, 62, 4),
(39, 65, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `content` varchar(3000) COLLATE utf8_bin DEFAULT '',
  `ratingLevel` float DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `content`, `ratingLevel`, `approved`, `createdAt`, `updatedAt`, `userId`, `productId`, `parent_id`) VALUES
(62, 'test', 4, 1, '2021-08-30 08:09:03', '2021-08-30 08:09:03', 19, 8, NULL),
(63, 'test replay', NULL, 1, '2021-08-30 08:09:29', '2021-08-30 08:09:29', 18, 8, 62),
(64, 'fsdfs', NULL, 1, '2021-08-30 08:35:44', '2021-08-30 08:35:44', 18, 8, 62),
(65, 'fdsdf sdf sdf sdf', 5, 1, '2021-08-30 09:56:00', '2021-08-30 09:56:00', 19, 1, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- --------------------------------------------------------

--
-- Структура таблицы `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `label` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `schools`
--

INSERT INTO `schools` (`id`, `label`) VALUES
(10, 'University 1'),
(11, 'University 2'),
(12, 'University 3'),
(13, 'University 4'),
(14, 'University 5'),
(16, 'University 6');

-- --------------------------------------------------------

--
-- Структура таблицы `typeSellings`
--

CREATE TABLE `typeSellings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `typeSellings`
--

INSERT INTO `typeSellings` (`id`, `name`) VALUES
(1, 'Face-to-face'),
(2, 'Hybrid'),
(3, 'Online');

-- --------------------------------------------------------

--
-- Структура таблицы `userCategories`
--

CREATE TABLE `userCategories` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `userInfos`
--

CREATE TABLE `userInfos` (
  `id` int(11) NOT NULL,
  `avatarImg` varchar(255) COLLATE utf8_bin DEFAULT 'placeholder.png',
  `education` varchar(500) COLLATE utf8_bin DEFAULT '',
  `publications` varchar(500) COLLATE utf8_bin DEFAULT '',
  `personal_email` varchar(500) COLLATE utf8_bin DEFAULT '',
  `personal_web_site` varchar(500) COLLATE utf8_bin DEFAULT '',
  `linkedin` varchar(500) COLLATE utf8_bin DEFAULT '',
  `git_hub` varchar(500) COLLATE utf8_bin DEFAULT '',
  `twitter` varchar(500) COLLATE utf8_bin DEFAULT '',
  `work_experience` varchar(500) COLLATE utf8_bin DEFAULT '',
  `awards` varchar(500) COLLATE utf8_bin DEFAULT '',
  `bio` varchar(3000) COLLATE utf8_bin DEFAULT '',
  `featuredImg` varchar(255) COLLATE utf8_bin DEFAULT 'placeholder-bg.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `userInfos`
--

INSERT INTO `userInfos` (`id`, `avatarImg`, `education`, `publications`, `personal_email`, `personal_web_site`, `linkedin`, `git_hub`, `twitter`, `work_experience`, `awards`, `bio`, `featuredImg`) VALUES
(15, 'placeholder.png', '', '', '', '', '', '', '', '', '', '', 'placeholder-bg.png'),
(18, 'placeholder.png', '', '', '', '', '', '', '', '', '', '<p></p>\n', 'placeholder-bg.png'),
(19, 'placeholder.png', '', '', '', '', '', '', '', '', '', '<p></p>\n', 'placeholder-bg.png');

-- --------------------------------------------------------

--
-- Структура таблицы `userNotifications`
--

CREATE TABLE `userNotifications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin DEFAULT '',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `userNotifications`
--

INSERT INTO `userNotifications` (`id`, `title`, `isActive`, `createdAt`, `updatedAt`, `userId`) VALUES
(1009, 'User vendor is waiting for approve', 0, '2021-08-30 04:52:22', '2021-08-30 04:52:22', 15),
(1010, 'User vendor2 is waiting for approve', 0, '2021-08-30 04:52:49', '2021-08-30 04:52:49', 15),
(1011, 'User vendor added or edited the product - Product', 0, '2021-08-30 07:49:47', '2021-08-30 07:49:47', 15),
(1012, 'You received a review on product \"Product\"', 0, '2021-08-30 08:09:02', '2021-08-30 08:09:02', 18),
(1013, 'You received an answer on your review on product \"Product\"', 0, '2021-08-30 08:09:28', '2021-08-30 08:09:28', 19),
(1014, 'You received a question on product \"Product\"', 0, '2021-08-30 08:27:21', '2021-08-30 08:27:21', 18),
(1015, 'You received an answer on product \"Product\"', 0, '2021-08-30 08:27:43', '2021-08-30 08:27:43', 19),
(1016, 'You received an answer on your review on product \"Product\"', 0, '2021-08-30 08:35:43', '2021-08-30 08:35:43', 19),
(1017, 'You received an answer on product \"Product\"', 0, '2021-08-30 08:37:14', '2021-08-30 08:37:14', 19),
(1018, 'You received an answer on product \"Product\"', 0, '2021-08-30 09:35:03', '2021-08-30 09:35:03', 19),
(1019, 'User vendor added or edited the product - Product', 0, '2021-08-30 09:45:17', '2021-08-30 09:45:17', 15),
(1020, 'User vendor added or edited the product - Post 2', 0, '2021-08-30 09:47:10', '2021-08-30 09:47:10', 15),
(1021, 'You received a review on product \"Product\"', 0, '2021-08-30 09:56:00', '2021-08-30 09:56:00', 18);

-- --------------------------------------------------------

--
-- Структура таблицы `userProductsPurchases`
--

CREATE TABLE `userProductsPurchases` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_bin DEFAULT '',
  `description` varchar(3000) COLLATE utf8_bin DEFAULT '',
  `excerpt` varchar(200) COLLATE utf8_bin DEFAULT '',
  `price` varchar(255) COLLATE utf8_bin DEFAULT '',
  `productLink` varchar(255) COLLATE utf8_bin DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `userProductsPurchases`
--

INSERT INTO `userProductsPurchases` (`id`, `title`, `description`, `excerpt`, `price`, `productLink`, `createdAt`, `updatedAt`, `userId`) VALUES
(15, 'Product', '<p><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans\", Arial, sans-serif;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>\n<p><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans\", Arial, sans-serif;\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span></p>\n<p></p>\n', 'FREE Updates for LIFE! This #1 Selling Teacher Binder is Editable and Customizable!', '10', 'fc2f258b-72b8-4f89-bca2-1d96aab8b237', '2021-08-30 08:02:03', '2021-08-30 08:02:03', 19),
(16, 'Product', '<p><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans\", Arial, sans-serif;\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span></p>\n', 'FREE Updates for LIFE! This #1 Selling Teacher Binder is Editable and Customizable!', '0', '88fd1935-b496-4ddf-9bf2-798c0b59e593', '2021-08-30 09:55:01', '2021-08-30 09:55:01', 18),
(17, 'Product', '<p><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans\", Arial, sans-serif;\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span></p>\n', 'FREE Updates for LIFE! This #1 Selling Teacher Binder is Editable and Customizable!', '0', '88fd1935-b496-4ddf-9bf2-798c0b59e593', '2021-08-30 09:55:45', '2021-08-30 09:55:45', 19);

-- --------------------------------------------------------

--
-- Структура таблицы `userProductsUploads`
--

CREATE TABLE `userProductsUploads` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `userProductsWithLists`
--

CREATE TABLE `userProductsWithLists` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT '',
  `password` varchar(255) COLLATE utf8_bin DEFAULT '',
  `nickName` varchar(255) COLLATE utf8_bin DEFAULT '',
  `firstName` varchar(255) COLLATE utf8_bin DEFAULT '',
  `lastName` varchar(255) COLLATE utf8_bin DEFAULT '',
  `activationLink` varchar(255) COLLATE utf8_bin DEFAULT '',
  `isActivated` tinyint(1) NOT NULL DEFAULT '0',
  `isPublic` tinyint(1) NOT NULL DEFAULT '0',
  `isNotification` tinyint(1) NOT NULL DEFAULT '1',
  `isTrusted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `roleId` int(11) DEFAULT NULL,
  `schoolId` int(11) DEFAULT NULL,
  `userInfoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `nickName`, `firstName`, `lastName`, `activationLink`, `isActivated`, `isPublic`, `isNotification`, `isTrusted`, `createdAt`, `updatedAt`, `roleId`, `schoolId`, `userInfoId`) VALUES
(15, 'admin@admin.com', '$2b$05$PbHoLhSoN735b6m9ppDo1ObYZQb3PdkdTYQJ8Xny3vpoOeiEDC8Dm', 'admin', 'admin', 'admin', '40e30cf6-3208-4201-aa51-ebfa758e64e4', 1, 0, 1, 0, '2021-08-27 14:05:51', '2021-08-27 14:06:18', 1, 12, 15),
(18, 'vendor@vendor.com', '$2b$05$UWRBp5cfnaWacdCq1Ewa/Ov4ECXZGEEeLyPmt47bkjfRX4s7i1jLi', 'vendor', 'vendor', 'vendor', 'b597981a-d922-4e82-941b-4abab53169ef', 1, 0, 1, 1, '2021-08-30 04:52:23', '2021-08-30 04:52:32', 2, 14, 18),
(19, 'vendor2@vendor2.com', '$2b$05$9jwgZfMxItFB.us6oSoO3ecK97NuS0LJy6QZwtPa8JB0Po8ppjEKq', 'vendor2', 'vendor2', 'vendor2', '3ed5b210-efdb-4c42-91aa-b361ee3a27ad', 1, 0, 1, 1, '2021-08-30 04:52:49', '2021-08-30 04:56:43', 2, 13, 19);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `adminsEmails`
--
ALTER TABLE `adminsEmails`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Индексы таблицы `degreeLevels`
--
ALTER TABLE `degreeLevels`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Индексы таблицы `formats`
--
ALTER TABLE `formats`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `populations`
--
ALTER TABLE `populations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `productCategories`
--
ALTER TABLE `productCategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productCategories_categoryId_productId_unique` (`productId`,`categoryId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Индексы таблицы `productDegreeLevels`
--
ALTER TABLE `productDegreeLevels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productDegreeLevels_degreeLevelId_productId_unique` (`productId`,`degreeLevelId`),
  ADD KEY `degreeLevelId` (`degreeLevelId`);

--
-- Индексы таблицы `productFiles`
--
ALTER TABLE `productFiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Индексы таблицы `productFilters`
--
ALTER TABLE `productFilters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `FilterId` (`FilterId`);

--
-- Индексы таблицы `productFormats`
--
ALTER TABLE `productFormats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productFormats_formatId_productId_unique` (`productId`,`formatId`),
  ADD KEY `formatId` (`formatId`);

--
-- Индексы таблицы `productImgs`
--
ALTER TABLE `productImgs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Индексы таблицы `productLanguages`
--
ALTER TABLE `productLanguages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productLanguages_languageId_productId_unique` (`productId`,`languageId`),
  ADD KEY `languageId` (`languageId`);

--
-- Индексы таблицы `productPreviewFiles`
--
ALTER TABLE `productPreviewFiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Индексы таблицы `productResourceTypes`
--
ALTER TABLE `productResourceTypes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productResourceTypes_resourceTypeId_productId_unique` (`productId`,`resourceTypeId`),
  ADD KEY `resourceTypeId` (`resourceTypeId`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productTypePriceId` (`productTypePriceId`),
  ADD KEY `productStatusId` (`productStatusId`);

--
-- Индексы таблицы `productStatuses`
--
ALTER TABLE `productStatuses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `productTypePrices`
--
ALTER TABLE `productTypePrices`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `productTypeSellings`
--
ALTER TABLE `productTypeSellings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productTypeSellings_typeSellingId_productId_unique` (`productId`,`typeSellingId`),
  ADD KEY `typeSellingId` (`typeSellingId`);

--
-- Индексы таблицы `resourceTypes`
--
ALTER TABLE `resourceTypes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviewPopulations`
--
ALTER TABLE `reviewPopulations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reviewPopulations_populationId_reviewId_unique` (`reviewId`,`populationId`),
  ADD KEY `populationId` (`populationId`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Индексы таблицы `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `typeSellings`
--
ALTER TABLE `typeSellings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `userCategories`
--
ALTER TABLE `userCategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userCategories_categoryId_userId_unique` (`userId`,`categoryId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Индексы таблицы `userInfos`
--
ALTER TABLE `userInfos`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `userNotifications`
--
ALTER TABLE `userNotifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `userProductsPurchases`
--
ALTER TABLE `userProductsPurchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `userProductsUploads`
--
ALTER TABLE `userProductsUploads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `userProductsWithLists`
--
ALTER TABLE `userProductsWithLists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `schoolId` (`schoolId`),
  ADD KEY `userInfoId` (`userInfoId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `adminsEmails`
--
ALTER TABLE `adminsEmails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `degreeLevels`
--
ALTER TABLE `degreeLevels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `filters`
--
ALTER TABLE `filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `formats`
--
ALTER TABLE `formats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `populations`
--
ALTER TABLE `populations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `productCategories`
--
ALTER TABLE `productCategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT для таблицы `productDegreeLevels`
--
ALTER TABLE `productDegreeLevels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT для таблицы `productFiles`
--
ALTER TABLE `productFiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `productFilters`
--
ALTER TABLE `productFilters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `productFormats`
--
ALTER TABLE `productFormats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `productImgs`
--
ALTER TABLE `productImgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `productLanguages`
--
ALTER TABLE `productLanguages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `productPreviewFiles`
--
ALTER TABLE `productPreviewFiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `productResourceTypes`
--
ALTER TABLE `productResourceTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `productStatuses`
--
ALTER TABLE `productStatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `productTypePrices`
--
ALTER TABLE `productTypePrices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `productTypeSellings`
--
ALTER TABLE `productTypeSellings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `resourceTypes`
--
ALTER TABLE `resourceTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `reviewPopulations`
--
ALTER TABLE `reviewPopulations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблицы `typeSellings`
--
ALTER TABLE `typeSellings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `userCategories`
--
ALTER TABLE `userCategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT для таблицы `userInfos`
--
ALTER TABLE `userInfos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT для таблицы `userNotifications`
--
ALTER TABLE `userNotifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1022;
--
-- AUTO_INCREMENT для таблицы `userProductsPurchases`
--
ALTER TABLE `userProductsPurchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT для таблицы `userProductsUploads`
--
ALTER TABLE `userProductsUploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `userProductsWithLists`
--
ALTER TABLE `userProductsWithLists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `filters`
--
ALTER TABLE `filters`
  ADD CONSTRAINT `filters_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `filters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productCategories`
--
ALTER TABLE `productCategories`
  ADD CONSTRAINT `productCategories_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productCategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productDegreeLevels`
--
ALTER TABLE `productDegreeLevels`
  ADD CONSTRAINT `productDegreeLevels_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productDegreeLevels_ibfk_2` FOREIGN KEY (`degreeLevelId`) REFERENCES `degreeLevels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productFiles`
--
ALTER TABLE `productFiles`
  ADD CONSTRAINT `productFiles_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productFilters`
--
ALTER TABLE `productFilters`
  ADD CONSTRAINT `productFilters_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productFilters_ibfk_2` FOREIGN KEY (`FilterId`) REFERENCES `filters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productFormats`
--
ALTER TABLE `productFormats`
  ADD CONSTRAINT `productFormats_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productFormats_ibfk_2` FOREIGN KEY (`formatId`) REFERENCES `formats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productImgs`
--
ALTER TABLE `productImgs`
  ADD CONSTRAINT `productImgs_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productLanguages`
--
ALTER TABLE `productLanguages`
  ADD CONSTRAINT `productLanguages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productLanguages_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productPreviewFiles`
--
ALTER TABLE `productPreviewFiles`
  ADD CONSTRAINT `productPreviewFiles_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productResourceTypes`
--
ALTER TABLE `productResourceTypes`
  ADD CONSTRAINT `productResourceTypes_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productResourceTypes_ibfk_2` FOREIGN KEY (`resourceTypeId`) REFERENCES `resourceTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`productTypePriceId`) REFERENCES `productTypePrices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`productStatusId`) REFERENCES `productStatuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `productTypeSellings`
--
ALTER TABLE `productTypeSellings`
  ADD CONSTRAINT `productTypeSellings_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productTypeSellings_ibfk_2` FOREIGN KEY (`typeSellingId`) REFERENCES `typeSellings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviewPopulations`
--
ALTER TABLE `reviewPopulations`
  ADD CONSTRAINT `reviewPopulations_ibfk_1` FOREIGN KEY (`reviewId`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviewPopulations_ibfk_2` FOREIGN KEY (`populationId`) REFERENCES `populations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `reviews` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `userCategories`
--
ALTER TABLE `userCategories`
  ADD CONSTRAINT `userCategories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userCategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `userNotifications`
--
ALTER TABLE `userNotifications`
  ADD CONSTRAINT `userNotifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `userProductsPurchases`
--
ALTER TABLE `userProductsPurchases`
  ADD CONSTRAINT `userProductsPurchases_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `userProductsUploads`
--
ALTER TABLE `userProductsUploads`
  ADD CONSTRAINT `userProductsUploads_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userProductsUploads_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `userProductsWithLists`
--
ALTER TABLE `userProductsWithLists`
  ADD CONSTRAINT `userProductsWithLists_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userProductsWithLists_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`userInfoId`) REFERENCES `userInfos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
