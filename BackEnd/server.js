const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import the cors middleware

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.post("/signUp", (req, res) => {
  const { name, address, contact, email, password } = req.body;
  const sql =
    "INSERT INTO signup(`Name`, `Address`, `Contact`, `Email`, `Password`) VALUES (?, ?, ?, ?, ?)";
  const values = [name, address, contact, email, password];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Error inserting user" });
    }
    console.log("User registered successfully");
    res.json({ message: "User registered successfully" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation to check if email and password are provided
  if (!email || !password) {
    return res.status(400).json("Email and password are required");
  }

  const sql = "SELECT * FROM signup WHERE Email = ? AND Password = ?";
  const values = [email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Internal Server Error");
    }

    if (result.length > 0) {
      return res.json("Login successfull");
    } else {
      return res.status(401).json("Invalid credentials");
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
