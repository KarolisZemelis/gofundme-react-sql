/*
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL
  `name` varchar(100) NOT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` char(32) NOT NULL,
  `role` enum('user','admin','gold','bot') NOT NULL DEFAULT 'user',
  `avatar` text DEFAULT NULL,
  `created_at` date NOT NULL,
  `status` enum('banned','verified','registered') NOT NULL DEFAULT 'registered',
  `online` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

// CREATE TABLE `users` (
//   `id` int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
//   `username` varchar(100) NOT NULL,
//   `email` varchar(100) NOT NULL UNIQUE,
//   `password` char(32) NOT NULL,
//   `role` enum('guest','admin','user','') NOT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

import { faker } from '@faker-js/faker';
import md5 from 'md5';


export function createUser() {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: md5('123'),
    role: faker.helpers.arrayElement(['guest', 'admin', 'r_user']),
  };
}