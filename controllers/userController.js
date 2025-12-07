const User = require("../models/User");
const generateUploadURL = require("../utils/s3");
const AWS=require("aws-sdk")
exports.getUploadURL = async (req, res) => {
  try {
    const { uploadURL, key } = generateUploadURL();
    const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    res.json({ uploadURL, imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "S3 URL error" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, number, email, imageUrl } = req.body;
    const user = await User.create({ name, number, email, imageUrl });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration Failed" });
  }
};



const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// 🎈 A fun little function to grab files from S3
exports.serveFromS3 =async(req, res)=> {
const key = `uploads/${req.params.filename}`;

  const params = { Bucket: process.env.S3_BUCKET, Key: key };
  const s3Stream = s3.getObject(params).createReadStream();

  res.setHeader("Content-Type", "image/jpeg");
  s3Stream.on("error", err => {
    console.error("💥 Oops, S3 error:", err);
    res.status(500).send("Could not fetch your file 😢");
  });

  s3Stream.pipe(res);
}

