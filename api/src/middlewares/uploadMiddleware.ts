import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const nameFormat = file.originalname.replace( " ", "_");
    cb(null, Date.now() + "-" + nameFormat);
  },
});

const upload = multer({ storage: storage });

export default upload;
