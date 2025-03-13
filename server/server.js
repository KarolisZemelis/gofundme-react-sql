import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid'

const app = express();
const port = 3333;

const frontURL = 'http://localhost:5173';
const serverURL = `http://localhost:${port}`;

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

const error500 = (res, err) => res.status(500).json(err)
//auth middleware
// app.use((req, res, next) => {
//     const token = req.cookies['r2-token'] || 'no-token';
//     const sql = 'SELECT * FROM users WHERE session_id = ?';
//     con.query(sql, [token], (err, result) => {
//         if (err) {
//             res.status(500).send('Klaida bandant prisijungti');
//             return;
//         }
//         if (result.length === 0) {
//             req.user = {
//                 role: 'guest',
//                 name: 'Guest',
//                 id: 0
//             }
//         } else {
//             req.user = {
//                 role: result[0].role,
//                 name: result[0].name,
//                 id: result[0].id
//             }
//         }
//         next();
//     });
// });

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
    con.query(sql, [name, md5(password)], (err, result) => {
        if (err) {
            res.status(500).send('Klaida bandant prisijungti');
            return;
        }
        if (result.length === 0) {
            res.status(401).send('Neteisingi prisijungimo duomenys');
            return;
        }
        const token = uuid.v4();
        const updateSql = 'UPDATE users SET session_id = ? WHERE name = ?';
        con.query(updateSql, [token, name], (err) => {
            if (err) {
                res.status(500).send('Klaida bandant prisijungti');
                return;
            }
            res.cookie('r3-token', token, { httpOnly: true, SameSite: 'none' });
            res.status(200).json({
                success: true,
                message: 'Prisijungimas sėkmingas',
                user: {
                    role: result[0].role,
                    name: result[0].name,
                    id: result[0].id
                }
            });
        });
    });
});

app.get('/get-user', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['r3-token'] || 'no-token';
        const sql = 'SELECT * FROM users WHERE session_id = ?';
        con.query(sql, [token], (err, result) => {
            if (err) {
                res.status(500).send('Klaida bandant prisijungti');
                return;
            }
            if (result.length === 0) {
                res.status(200).json({
                    role: 'guest',
                    name: 'Guest',
                    id: 0
                });
                return;
            }
            res.status(200).json({
                role: result[0].role,
                name: result[0].name,
                id: result[0].id
            });
        });
    }, 1000);
});

app.post('/logout', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['r2-token'] || 'no-token';
        console.log('logout', token);
        const sql = 'UPDATE users SET session_id = ? WHERE session_id = ?';
        con.query(sql, [null, token], (err) => {
            if (err) {
                res.status(500).send('Klaida bandant atsijungti');
                return;
            }
            res.clearCookie('r2-token');
            res.status(200).json({
                success: true,
                message: 'Atsijungimas sėkmingas',
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
//USERS
app.get('/donators', (req, res) => {
    const sql = `
        SELECT id, name, donation_amount
        FROM donations
    `
    con.query(sql, (err, result) => {
        if (err) return error500(res, err)
        res.json({
            success: true,
            db: result
        });
    })

})

//Stories
app.get('/stories', (req, res) => {
    const sql = `
        SELECT
    s.id,
    s.name,
    s.text,
    s.image,
    s.request_amount,
    s.collected_amount,
    u.username
FROM
    stories s
JOIN
    users u ON s.user_id = u.id
WHERE
    s.status = 1;
    `
    con.query(sql, (err, result) => {
        if (err) return error500(res, err)
        res.json({
            success: true,
            db: result
        });
    })

})

app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});