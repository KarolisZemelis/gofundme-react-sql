import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';

const postsPerPage = 7;

const app = express();
const port = 4444;

const frontURL = 'http://localhost:5174';
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
// Identifikacija - pagal numatytą ID identifikuojam vartotoją pvz Ragana-su-šluota
// Autorizacija - pagal vartotojo identifikuotą ID, vartuotojui suteikiamos teisės pvz gali balsuoti, pirkti cigatertes
// Autentifikacija - pagal numatytą ID autentifikuojam vartotoją, pvz Arvydas Kijakauskas a/k 555555555

// auth middleware
app.use((req, res, next) => {
    const token = req.cookies['sock-net-token'] || 'no-token';
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
                name: 'Guest',
                id: 0
            }
        } else {
            req.user = {
                role: result[0].role,
                name: result[0].name,
                id: result[0].id
            }
        }
        next();
    });
});

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    con.query(sql, [name, md5(password)], (err, result) => {
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
            res.cookie('sock-net-token', token, { httpOnly: true, SameSite: 'none' });
            res.status(200).json({
                msg: { type: 'success', text: `Hello, ${result[0].name}! How are you?` },
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
app.get('/stories/:page', (req, res) => {

    const page = parseInt(req.params.page);
    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({ success: false, error: 'Invalid page number' });
    }
    const offset = (page - 1) * postsPerPage;
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
    s.status = 1
    LIMIT ? OFFSET ?
    `
    con.query(sql, [postsPerPage, offset], (err, result) => {
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