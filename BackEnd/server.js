const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.use("/images", express.static("./public/images/"));

app.post("/addProduct", upload.array("productImg", 4), (req, res) => {
  const { productName, price, description } = req.body;
  const productImg = req.files
    ? req.files
        .map((file) => file.filename)
        .join(",")
        .replace(/"/g, "")
    : "";

  const sql =
    "INSERT INTO products (Product_Name, Product_Image, Price, Description) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [productName, JSON.stringify(productImg), price, description],
    (err) => {
      if (err) {
        console.error("Database query error: " + err.message);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json({ message: "Product added successfully" });
      }
    }
  );
});

app.get("/getProducts", (_req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database query error: " + err.message);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/signUp", (req, res) => {
  const { name, address, contact, email, password } = req.body;

  const checkEmailSql = "SELECT * FROM signup WHERE Email =?";
  const checkEmailValues = [email];

  db.query(checkEmailSql, checkEmailValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking Email in record:", checkErr);
      return res.status(500).json({ message: "Error checking Email" });
    }
    if (checkResult.length > 0) {
      console.log("Please use unique email");
      return res.status(400).json({ message: "Please use a unique email" });
    }
    const sql =
      "INSERT INTO signup(`Name`, `Address`, `Contact`, `Email`, `Password`) VALUES (?, ?, ?, ?, ?)";
    const values = [name, address, contact, email, password];

    db.query(sql, values, (err) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Error inserting user" });
      }
      console.log("User registered successfully");
      res.status({ message: "User registered successfully" });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation to check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM signup WHERE Email = ? AND Password = ?";
  const values = [email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      return res.status(200).json({ message: "Login successfull" });
    } else {
      return res.status(401).json("Invalid credentials");
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
