# GoFundMe Clone

## Project Description

This project is a basic **GoFundMe**-style crowdfunding platform built with **React** and **Vite**.  
It features full **CRUD** functionality and communicates with a dummy **MariaDB** database through a simple back-end service.

The goal of this project was to practice front-end development skills and simulate a real-world full-stack workflow.

---

## Features

- Browse a list of fundraising campaigns
- Create, edit, and delete campaigns
- View individual campaign details
- Donate to campaigns
- Custom hooks and context for state and API management
- Responsive design for desktop and mobile

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KarolisZemelis/gofundme-react-sql.git
   cd gofundme-react-sql
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   Navigate to the `server` folder and install backend packages:

   ```bash
   cd server
   npm install
   ```

4. **Set up the database**

   - Install **MariaDB** locally if you don't already have it.
   - Create a new database named `go_fund`.
   - No manual import needed: the seed script will generate all tables and data.

5. **Configure database connection**

   Make sure `/server/db/connection.js` has the correct settings for your local MariaDB:

   ```javascript
   const pool = mysql.createPool({
     host: "localhost",
     user: "root",
     password: "", // your password if any
     database: "go_fund",
   });
   ```

6. **Run the database seeder**

   From inside the `/server` folder, run the seed script:

   ```bash
   node seeder/seed.js
   ```

   This will automatically:

   - Drop old tables if they exist
   - Create new tables (`users`, `stories`, `donations`, `sessions`)
   - Insert fake and admin data into the tables

7. **Start the backend server**

   Still inside the `/server` folder, start your backend API:

   ```bash
   node server.js
   ```

   This will start the backend at [http://localhost:4444](http://localhost:4444).

8. **Start the frontend development server**

   Open a new terminal window, go back to the project root, and start the frontend:

   ```bash
   npm run dev
   ```

   The React app will be available at [http://localhost:5173](http://localhost:5173).

---

## Important Notes

- Ensure **MariaDB service** is running before starting the backend or frontend.
- The backend server must be running before interacting with the frontend.
- Default admin credentials after seeding:
  - **Username:** admin
  - **Password:** 123
- Faker.js is used to generate random fake users, stories, and donations.
- Ports used: **4444** (backend), **5173** (frontend)

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- MariaDB (dummy database)
- CSS / SCSS
- Express.js (for simple back-end server)

---

## Folder Structure

```
gofundme/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```
