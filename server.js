
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.all('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(8080, 'localhost', function() {
  console.log("######################################################");
  console.log("----------------- SERVER IS RUNNING! -----------------");
  console.log("----------------- BLOG-APP-FRONTEND! -----------------");
  console.log(Date());
  console.log("######################################################");
});