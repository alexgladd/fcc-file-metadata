// server.js
// where your node app starts

// init project
var filesize = require('filesize');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1000000 } });
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// file upload api
app.post('/api/file', upload.single('file'), function(req, res) {
  console.log(req.file);
  
  if (req.file) {
    res.json({
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileSizeStr: filesize(req.file.size),
      fileType: req.file.mimetype
    });
  } else {
    res.status(400).json({ error: 'No file uploaded!'});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
