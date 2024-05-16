// import express
const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config()
const app = express();
const taskRoute = require("./routes/taskRoute");
const cors = require('cors');

// get api 2 types -all -single Task

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

//  for json

app.use(express.json());

app.use(cors());


//  Db connection

mongoose.connect(process.env.MONGO_URI)
    .then (() => {
        app.listen(process.env.PORT, () => {
            console.log("DB connected successfully listening to " + process.env.PORT)
          });

    }).catch((error) => console.log(error));



//  middle ware


app.use((req, res, next) => {
  console.log("path " + req.path + "method" + req.method);
  next();
});

// post api
app.use('/api/tasks',taskRoute);


