
// CREATE TABLE `posts` (
//     `id` int(10) UNSIGNED NOT NULL,
//     `content` text NOT NULL,
//     `created_at` date NOT NULL,
//     `updated_at` date NOT NULL,
//     `votes` text NOT NULL,
//     `user_id` int(10) UNSIGNED DEFAULT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

// CREATE TABLE `stories` (
//     `id` int(10) UNSIGNED NOT NULL,
//     `name` varchar(100) NOT NULL,
//     `text` text NOT NULL,
//     `image` varchar(100) NOT NULL,
//     `request_amount` int(11) NOT NULL,
//     `collected_amount` int(11) NOT NULL,
//     `user_id` int(10) UNSIGNED NOT NULL,
//     `status` tinyint(1) NOT NULL DEFAULT 0,
//     `created_at` date NOT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
import { faker } from '@faker-js/faker';
export function createStory() {

    return {
        name: faker.word.words({ count: { min: 1, max: 10 } }),
        text: faker.word.words({ count: { min: 10, max: 111 } }),
        // image: faker.image.url(),
        image: `https://picsum.photos/seed/${faker.string.uuid()}/300/300`,
        status: faker.number.int({ min: 0, max: 1 }),
        created_at: faker.date.past({ years: 5 }),
    }
}