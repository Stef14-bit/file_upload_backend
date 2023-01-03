const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const app = express();

app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const port = process.env.PORT || 3001;

app.post("/upload-picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({ status: false, message: "No file uploaded" });
    } else {
      let file = req.files.file;
      file.mv("./uploads/" + file.name);
      res.send({
        status: true,
        message: "File uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
