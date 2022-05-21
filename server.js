require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require("path");
const User = require('./src/models/User')
const bcrypt = require('bcrypt')
const app = express();
const bodyParser = require('body-parser')


mongoose.connect('mongodb+srv://User1:a123user456@cluster1vinyl.wpzhu.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
}).then(() => console.log('Rise...omurice'))
  .catch(e => console.log(e))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/styles", express.static(__dirname + '/styles'));

app.set('views engine', "ejs");
app.use(express.static("src"));
app.use(express.static('public'))
app.use("/", require("./src/vinyl"));
app.use("/contact", require("./src/contact"));
app.use("/about", require("./src/about"));
app.use("/buy", require("./src/buy"));
app.use("/register", require("./src/register"));
app.use("/signin", require("./src/signin"));
app.use("/adminPanel", require("./src/adminPanel"));

app.post('/updateNewData', async function (req, res) {
  const {name, city, email, id} = req.body
  const user = await User.findById(id)
  user.email = email
  user.city = city
  user.name = name
  await user.save()
  const allUsers = await User.find()
  res.render(path.resolve("src/views/adminPanel.ejs"), {allUsers})
})
app.post('/deleteUser', async function (req, res) {
  const {id} = req.body
  await User.deleteOne({_id: id})
  const allUsers = await User.find()
  res.render(path.resolve("src/views/adminPanel.ejs"), {allUsers})
})

app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/post-feedback', function (req, res) {
  dbConn.then(function (db) {
    delete req.body._id; // for safety reasons
    db.collection('feedbacks').insertOne(req.body);
  });
  res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view-feedbacks', function (req, res) {
  dbConn.then(function (db) {
    db.collection('feedbacks').find({}).toArray().then(function (feedbacks) {
      res.status(200).json(feedbacks);
    });
  });
});


app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

