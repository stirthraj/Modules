Frontend Application:

  const [selectedFile, setSelectedFile] = useState(null);
  
  
    const handleSubmitImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(config.API_URL + "/Services/Saveimage", formData, {})
      .then((response) => {
        setstate({ ...state, Photo: response.data.s3Url });
      })
      .catch(() => {
        console.log("Error to Upload");
      });
  };
  


{state.Photo === "" ? null : (
              <img src={state.Photo} alt="No File" height={200} width={200} />
            )}
            {/* <form style={{ display: 'grid' }} onSubmit={handleSubmitImage}> */}
            <TextField
              required
              type="file"
              id="outlined-required"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />

            <Button
              onClick={handleSubmitImage}
              variant="outlined"
              size="small"
              type="submit"
            >
              Upload Image
            </Button>
            
  Backend Application:
  
  const router = require("express").Router();
const multer = require("multer");
const aws = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadParams = {
  Bucket: "kj-peoplefunction",
  Key: "",
  Body: null,
  ContentType: "application/octet-stream",
  ACL: "public-read",
  ContentEncoding: "base64",
};
aws.config.update({
  secretAccessKey: "rIw2hkgvygt7KFaHEh2eVp4ABaPte/s6Zv0/+k1O",
  accessKeyId: "AKIASRU2EPESNHHJBVH5",
  region: "ap-south-1",
});

const s3 = new aws.S3();
function getContentTypeByFile(fileName) {
  var rc = "image/jpg";
  var fn = fileName.toLowerCase();

  if (fn.indexOf(".html") >= 0) rc = "text/html";
  else if (fn.indexOf(".css") >= 0) rc = "text/css";
  else if (fn.indexOf(".json") >= 0) rc = "application/json";
  else if (fn.indexOf(".js") >= 0) rc = "application/x-javascript";
  else if (fn.indexOf(".png") >= 0) rc = "image/png";
  else if (fn.indexOf(".jpg") >= 0) rc = "image/jpg";
  else if (fn.indexOf(".jpeg") >= 0) rc = "image/jpeg";

  return rc;
}

router.post("/", upload.single("file"), (req, res) => {
  // console.log(req.file);
  let time = Math.floor(new Date().getTime() / 1000);
  const params = uploadParams;
  uploadParams.Key = time + req.file.originalname;
  uploadParams.Body = req.file.buffer;
  // uploadParams.Body = Buffer.from(req.file.buffer.toString("utf8"), "ascii");
  // uploadParams.ContentType = "application/octet-stream";
  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error->" + err });
    }
    // let t = Buffer.from(req.file.buffer.toString(), "binary");
    // console.log("bc" + data.Location);
    return res.send({
      s3Url: data.Location,
      // file: uploadParams.Body,
      // check: req.file,
    });
  });
});

module.exports = router;
