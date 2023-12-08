const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
});

app.post('/signup', (req, res) => {
  const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("failed");
    }
  });
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});
