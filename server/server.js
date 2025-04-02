import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';
import fs from 'node:fs';

const postsPerPage = 7;

const app = express();
const port = 4444;

const frontURL = 'http://localhost:5173';
const serverURL = `http://localhost:${port}`;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(cors(
    {
        origin: frontURL,
        credentials: true
    }
));

app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'go_fund'
});

con.connect(err => {
    if (err) {
        console.log('Klaida prisijungiant prie DB');
        return;
    }
    console.log('Prisijungimas prie DB buvo sėkmingas');
});

const error500 = (res, err) => res.status(500).json(err);
const error400 = (res, customCode = 0) => res.status(400).json({
    msg: { type: 'error', text: 'Invalid request. Code: ' + customCode }
});
const error401 = (res, message) => res.status(401).json({
    msg: { type: 'error', text: message }
});
// Identifikacija - pagal numatytą ID identifikuojam vartotoją pvz Ragana-su-šluota
// Autorizacija - pagal vartotojo identifikuotą ID, vartuotojui suteikiamos teisės pvz gali balsuoti, pirkti cigatertes
// Autentifikacija - pagal numatytą ID autentifikuojam vartotoją, pvz Arvydas Kijakauskas a/k 555555555

const saveImageAsFile = imageBase64String => {

    if (!imageBase64String) {
        return null;
    }

    let type, image;

    if (imageBase64String.indexOf('data:image/png;base64,') === 0) {
        type = 'png';
        image = Buffer.from(imageBase64String.replace(/^data:image\/png;base64,/, ''), 'base64');
    } else if (imageBase64String.indexOf('data:image/jpeg;base64,') === 0) {
        type = 'jpg';
        image = Buffer.from(imageBase64String.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
    } else {
        error400(res, 'Bad image format 1255');
        return;
    }

    const fileName = md5(v4()) + '.' + type;

    fs.writeFileSync('public/upload/' + fileName, image);

    return fileName;

}

// auth middleware
app.use((req, res, next) => {
    const token = req.cookies['go-fund-token'] || 'no-token';
    const sql = `
        SELECT u.id, u.role, u.username
        FROM sessions AS s
        INNER JOIN users AS u
        ON s.user_id = u.id
        WHERE token = ?
    `;
    con.query(sql, [token], (err, result) => {
        if (err) return error500(res, err);
        if (err) {
            res.status(500).send('Klaida bandant prisijungti');
            return;
        }
        if (result.length === 0) {
            req.user = {
                role: 'guest',
                username: 'Guest',
                id: 0
            }
        } else {
            req.user = {
                role: result[0].role,
                username: result[0].name,
                id: result[0].id
            }
        }
        next();
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    con.query(sql, [username, md5(password)], (err, result) => {
        if (err) return error500(res, err);
        if (result.length === 0) {
            res.status(401).send({
                msg: { type: 'error', text: 'Invalid user name or password' }
            });
            return;
        }
        const token = md5(v4());
        const userId = result[0].id;
        let time = new Date();
        time = time.setMinutes(time.getMinutes() + (60 * 24));
        time = new Date(time);

        const insertSql = `
            INSERT INTO sessions
            (user_id, token, valid_until)
            VALUES (?, ?, ?)
        `;
        con.query(insertSql, [userId, token, time], (err) => {
            if (err) return error500(res, err);
            res.cookie('go-fund-token', token, { httpOnly: true, SameSite: 'none' });
            res.status(200).json({
                msg: { type: 'success', text: `Hello, ${result[0].username}! How are you?` },
                user: {
                    role: result[0].role,
                    username: result[0].username,
                    id: result[0].id
                }
            });
        });
    });

});

app.get('/auth-user', (req, res) => {
    setTimeout(_ => {
        res.json(req.user)
    }, 1000);
});

app.post('/logout', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['go-fund-token'] || 'no-token';

        const sql = `
            DELETE FROM sessions
            WHERE token = ?
        `
        con.query(sql, [token], (err) => {
            if (err) return error500(res, err);
            res.clearCookie('sock-net-token');
            res.status(200).json({
                msg: { type: 'success', text: `Bye bye!` },
                user: {
                    role: 'guest',
                    name: 'Guest',
                    id: 0
                }
            });
        });
    }, 2000);
});



// Start server
//DONATIONS
app.get('/donators', (req, res) => {
    const sql = `
        SELECT name, SUM(donation_amount) AS total_donated
        FROM donations
        GROUP BY name
        ORDER BY total_donated DESC
       LIMIT 10
    `;

    con.query(sql, (err, result) => {
        if (err) return error500(res, err)

        res.json({
            success: true,
            db: result
        });
    })
})

app.get('/donations', (req, res) => {
    const sql = `
        SELECT *
        FROM donations
        ORDER BY donation_amount DESC
    `;

    con.query(sql, (err, result) => {
        if (err) return error500(res, err)

        res.json({
            success: true,
            db: result
        });
    })
})

app.post('/newDonation', (req, res) => {
    const newDonation = req.body;

    // SQL query to insert a new donation
    const sql1 = `
    INSERT INTO donations (story_id, name, donation_amount, created_at)
    VALUES (?, ?, ?, ?);
  `;

    con.query(sql1, [newDonation.story_id, newDonation.name, newDonation.donation_amount, newDonation.created_at], (err, results) => {
        if (err) {
            console.error('Error inserting donation:', err);
            return res.status(500).send('Error inserting donation');
        } else {
            console.log('Donation inserted successfully');

            // SQL query to get the story based on the story_id
            const sql2 = `
            SELECT * FROM stories WHERE id = ?;
            `;

            con.query(sql2, [newDonation.story_id], (err, storyResults) => {
                if (err) {
                    console.error('Error retrieving story:', err);
                    return res.status(500).send('Error retrieving story');
                } else {
                    console.log('Story retrieved successfully');
                    const remainingAmount = storyResults.request_amount - (storyResults.collected_amount + newDonation.donation_amount)
                    // SQL query to update the collected_amount in the stories table
                    if (remainingAmount > 0) {
                        const sql3 = `
                        UPDATE stories
                        SET collected_amount = collected_amount + ?
                        WHERE id = ?;
                        `;

                        con.query(sql3, [newDonation.donation_amount, newDonation.story_id], (err, updateResults) => {
                            if (err) {
                                console.error('Error updating story:', err);
                                return res.status(500).send('Error updating story');
                            } else {
                                console.log('Story updated successfully');
                                // Send both the success message for the donation and the retrieved story
                                res.status(201).send({
                                    message: 'Donation inserted and story updated successfully',
                                    story: storyResults[0],  // Assuming storyResults contains only one result
                                });
                            }
                        });
                    } else {
                        const sql3 = `
                        UPDATE stories
                        SET collected_amount = collected_amount + ?,finished = 1
                        WHERE id = ?;
                        `;

                        con.query(sql3, [newDonation.donation_amount, newDonation.story_id], (err, updateResults) => {
                            if (err) {
                                console.error('Error updating story:', err);
                                return res.status(500).send('Error updating story');
                            } else {
                                console.log('Story updated successfully');
                                // Send both the success message for the donation and the retrieved story
                                res.status(201).send({
                                    message: 'Donation inserted and story updated successfully',
                                    story: storyResults[0],  // Assuming storyResults contains only one result
                                });
                            }
                        });
                    }

                }
            });
        }
    });
});

//STORIES
app.get('/stories/:page', (req, res) => {
    const postsPerPage = 7
    const page = parseInt(req.params.page);
    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({ success: false, error: 'Invalid page number' });
    }
    const offset = (page - 1) * postsPerPage;
    const sql = `
   SELECT
    s.id,
    s.status,
    s.name,
    s.text,
    s.image,
    s.request_amount,
    s.collected_amount,
    (s.request_amount - s.collected_amount) AS remaining_amount,
    s.finished,
    u.username
FROM
    stories s
JOIN
    users u ON s.user_id = u.id
ORDER BY
    remaining_amount DESC

    `
    con.query(sql, [postsPerPage, offset], (err, result) => {
        if (err) return error500(res, err)
        console.log(result)
        result = result.map(r => (
            {
                ...r,
                image: r.image.indexOf('http') === 0 ? r.image : frontURL + '/upload/' + r.image
            }
        ));
        res.json({
            success: true,
            db: result
        });
    })

})

app.post('/stories/new', (req, res) => {
    const name = req.body.name;
    const text = req.body.text;
    const image = saveImageAsFile(req.body.image.src)
    const request_amount = Number(req.body.requestAmount);
    const created_at = new Date();
    const user_id = req.user.id;


    const sql1 = `
        INSERT INTO stories
        (name, text, image, request_amount, collected_amount, user_id, status, created_at, finished )
        VALUES (?, ?, ?, ?, 0, ?, 0, ?, 0)
    `;
    con.query(sql1, [name, text, image, request_amount, user_id, created_at], (err, result) => {
        if (err) return error500(res, err);
        res.json({
            success: true,

        });
    });
});

app.post('/updateStoryStatus/:id', (req, res) => {
    const postID = req.params.id;
    const status = req.body.status === true ? 1 : 0
    const sql1 = `
    UPDATE stories
    SET status = ?
    WHERE id = ?
    `;
    con.query(sql1, [status, postID], (err) => {
        if (err) return error500(res, err);
        res.status(200).json({
            msg: { type: 'success', text: `Story status has been updated` },
        });
        return;
    });
})



app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});