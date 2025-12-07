const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

function generateUploadURL(fileType = "image/jpeg") {
  const extension = fileType.split("/")[1];   // jpg, png, webp, etc
  const key = `uploads/${uuid()}.${extension}`;

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Expires: 60,
    ContentType: fileType,
  };

  const uploadURL = s3.getSignedUrl("putObject", params);

  return { uploadURL, key };
}

module.exports = generateUploadURL;
