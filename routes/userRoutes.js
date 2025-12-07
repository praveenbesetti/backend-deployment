const express = require("express");
const router = express.Router();
const { getUploadURL, registerUser,serveFromS3 } = require("../controllers/userController");

router.get("/s3-url", getUploadURL);
router.post("/register", registerUser);
router.get("/image/:filename", serveFromS3);

module.exports = router;
