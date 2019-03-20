const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const pug = require("pug");

const port = 3000;

const app = express();

// templating
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  res.render("index", { title: "Welcome" });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
// post
app.post("/contact/send", (req, res) => {
  const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: "",
      pass: ""
    }
  });
  const mailOptions = {
    from: "",
    to: "",
    subject: "Website Submission",
    text: `You have a submission with the following details:\nName: ${
      req.body.name
    }\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
    html: `<p>You have a submission with the following details:</p><ul><li>Name: ${
      req.body.name
    }</li><li>Email: ${req.body.email}</li><li>Message: ${
      req.body.message
    }</li></ul>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log(`Message Sent: ${info.response}`);
      res.redirect("/");
    }
  });
});

app.listen(port);

console.log(`Server is running on port ${port}.`);
