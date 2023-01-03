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

const port = process.env.PORT || 3000;

app.post("/upload-picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({ status: false, message: "No file uploaded" });
    } else {
      let picture = req.files.picture;
      avatar.mv("./uploads/" + picture.name);
      res.send({
        status: true,
        message: "File uploaded",
        data: {
          name: picture.name,
          mimetype: picture.mimetype,
          size: avatar.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
