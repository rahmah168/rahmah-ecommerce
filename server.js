const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
// const port = 3002;

// Enable CORS
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Serve static files from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('https://rahmahsaif-react-8a5b146dcade.herokuapp.com/public/images', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ message: 'File uploaded successfully.' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
