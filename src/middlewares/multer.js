const multer = require("multer");
const path = require("node:path");
const fs = require("node:fs");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadFolder = path.join("uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: (_req, file, cb) => {
    const extensions = file.originalname.toString().split(".");
    const extension = extensions[extensions.length - 1];
    const fileName = `${Date.now()}.${extension}`;
    cb(null, fileName);
  },
});
module.exports = multer({ storage });
