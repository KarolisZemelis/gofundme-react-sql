console.log('start seeding');
import { faker } from '@faker-js/faker';
import { createUser } from './user.js';
import { createStory } from './story.js';
import mysql from 'mysql';


const usersCount = 5;
const storyCount = 10;


const users = faker.helpers.multiple(createUser, {
    count: usersCount,
});

const stories = faker.helpers.multiple(createStory, {
    count: storyCount,
});

const donations = [];

stories.forEach((s) => {
    const request_amount = faker.number.int({ min: 10, max: 100000 })
    s.user_id = faker.number.int({ min: 1, max: usersCount });
    s.request_amount = request_amount;
});


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'go_fund'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

let sql;

sql = 'DROP TABLE IF EXISTS sessions;'
con.query(sql, (err) => {
    if (err) {
        console.log('Sessions table drop error', err);
    } else {
        console.log('Sessions table was dropped');
    }
});

sql = 'DROP TABLE IF EXISTS donations;'
con.query(sql, (err) => {
    if (err) {
        console.log('Donations table drop error', err);
    } else {
        console.log('Donations table was dropped');
    }
});

sql = 'DROP TABLE IF EXISTS stories;'
con.query(sql, (err) => {
    if (err) {
        console.log('Stories table drop error', err);
    } else {
        console.log('Stories table was dropped');
    }
});

sql = 'DROP TABLE IF EXISTS users;'
con.query(sql, (err) => {
    if (err) {
        console.log('User table drop error', err);
    } else {
        console.log('User table was dropped');
    }
});


sql = `
    CREATE TABLE users (
      id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
      username varchar(100) NOT NULL,
      email varchar(100) NOT NULL UNIQUE,
      password char(32) NOT NULL,
      role enum('guest','admin','user','') NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
     `

con.query(sql, (err) => {
    if (err) {
        console.log('Users table create error', err);
    } else {
        console.log('Users table was created');
    }
});


sql = `
CREATE TABLE stories (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    text text NOT NULL,
    image varchar(100) NOT NULL,
    request_amount int(11) NOT NULL,
    collected_amount int(11) NOT NULL,
    user_id int(10) UNSIGNED NULL,
    status tinyint(1) NOT NULL DEFAULT 0,
    created_at date NOT NULL,
    finished tinyint(1) NOT NULL DEFAULT 0,
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`
con.query(sql, (err) => {
    if (err) {
        console.log('Stories table create error', err);
    } else {
        console.log('Stories table was created');
    }
});

sql = `
CREATE TABLE donations (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  story_id int(10) UNSIGNED NOT NULL,
  name varchar(100) NOT NULL,
  donation_amount int(10) NOT NULL,
  created_at date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`
con.query(sql, (err) => {
    if (err) {
        console.log('Donations table create error', err);
    } else {
        console.log('ComDonationsments table was created');
    }
});

sql = `
    CREATE TABLE sessions (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id int(10) UNSIGNED NOT NULL,
    token char(32) NOT NULL,
    valid_until date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('Sessions table create error', err);
    } else {
        console.log('Sessions table was created');
    }
});

sql = `
    ALTER TABLE donations
    ADD CONSTRAINT donations_ibfk_1 FOREIGN KEY (story_id) REFERENCES stories (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('Donations table alter error', err);
    } else {
        console.log('Donations table was altered');
    }
});


sql = `
ALTER TABLE stories
  ADD CONSTRAINT stories_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('Stories table alter error', err);
    } else {
        console.log('Stories table was altered');
    }
});

sql = `
ALTER TABLE sessions
  ADD CONSTRAINT sessions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('Sessions table alter error', err);
    } else {
        console.log('Sessions table was altered');
    }
});


sql = `
    INSERT INTO users
    (username, email, password, role)
    VALUES ?
`;
con.query(sql, [users.map(user => [user.username, user.email, user.password, user.role])], (err) => {
    if (err) {
        console.log('Users table seed error', err);
    } else {
        console.log('Users table was seeded');
    }
});


sql = `
  INSERT INTO stories
  (name, text, image, request_amount, collected_amount, user_id, status, created_at)
  VALUES ?
`;
con.query(sql, [stories.map(story => [story.name, story.text, story.image, story.request_amount, story.collected_amount, story.user_id, story.status, story.created_at])], (err) => {
    if (err) {
        console.log('Stories table seed error', err);
    } else {
        console.log('Stories table was seeded');

    }
});

const selectSql = `SELECT * FROM stories`;
con.query(selectSql, (selectErr, results) => {
    if (selectErr) {
        console.log('Error retrieving stories:', selectErr);
    } else {
        results.forEach(story => {
            if (story.status === 0) {
                return
            }
            let donationPercentage = faker.number.int({ min: 0, max: 100 }) / 100;
            const targetDonationAmount = story.request_amount * donationPercentage;
            let totalDonations = 0;

            do {
                const donationAmount = faker.number.int({ min: 0, max: targetDonationAmount });
                totalDonations += donationAmount;
                if (totalDonations > story.request_amount) {
                    break
                }
                donations.push({
                    story_id: story.id,
                    name: faker.word.words({ count: { min: 1, max: 2 } }),
                    donation_amount: donationAmount,
                    created_at: faker.date.past({ years: 4.9 })
                });
            } while (totalDonations <= targetDonationAmount)
            const updateSql = `
                UPDATE stories 
                SET collected_amount = ? 
                WHERE id = ?
              `;
            con.query(updateSql, [totalDonations, story.id], (updateErr) => {
                if (updateErr) {
                    console.log('Error updating story:', updateErr);
                } else {
                    console.log(`Story ${story.id} updated with collected amount ${totalDonations}`);
                }
            });

        })
        sql = `
        INSERT INTO donations
        (story_id, name, donation_amount, created_at)
        VALUES ?
    `;
        con.query(sql, [donations.map(donation => [donation.story_id, donation.name, donation.donation_amount, donation.created_at])], (err) => {
            if (err) {
                console.log('Donations table seed error', err);
            } else {
                console.log('Donations table was seeded');
                con.end();
            }
        });
    }
});



