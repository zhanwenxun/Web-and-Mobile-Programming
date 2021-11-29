var express = require('express');
var router = express.Router();

// var loki = require('lokijs');

// var db = new loki('data.json', {
//   autoload: true,
//   autoloadCallback: databaseInitialize,
//   autosave: true,
//   autosaveInterval: 4000
// });

// // implement the autoloadback referenced in loki constructor
// function databaseInitialize() {
//   var bookings = db.getCollection("bookings");
//   if (bookings === null) {
//     bookings = db.addCollection("bookings");
//   }
// }

// MongDB Database
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://zhanwenxun:AnZaROcsG4wg8RWz5MwVLcrhQsQBjBEl4CwHzHkW0WCDRGCFv7gkLZW751f1SUZDmUCpPCHriWXuuoQ5YTuW2Q%3D%3D@zhanwenxun.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@zhanwenxun@';

var db;

MongoClient.connect(url, function (err, client) {
  db = client.db('bookingsDB');
  console.log("DB connected");
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Handle the Form submission with Restful Api */
router.post('/bookings', async function (req, res) {

  req.body.numTickets = parseInt(req.body.numTickets);

  // let result = db.getCollection("bookings").insert(req.body);
  // res.status(201).json({ id: result.$loki });

  req.body.analysis = await sentimentAnalysis(textAnalyticsClient, req.body.message);

  let result = await db.collection("bookings").insertOne(req.body);

  res.status(201).json({id: result.insertedId });
});

/* Display all Bookings */
router.get('/bookings', async function (req, res) {

  // let result = db.getCollection("bookings").find();

  let result = await db.collection("bookings").find().toArray();

  res.render('bookings', { bookings: result });
});

/* Display a single Booking */
router.get('/bookings/read/:id', async function (req, res) {

  console.log(req.params.id)

  // let result = db.getCollection("bookings").findOne({ $loki: parseInt(req.params.id) });
  let result = db.collection("bookings").findOne({ _id: ObjectId(req.params.id) });

  if (result)
    res.render('booking', { booking: result });
  else
    res.status(404).send('Unable to find the requested resource!');

});

// Delete a single Booking 
router.delete('/bookings/:id', async function (req, res) {

  // let result = db.getCollection("bookings").findOne({ $loki: parseInt(req.params.id) });
  let result = db.collection("bookings").findOne({ _id: ObjectId(req.params.id) });

  if (!result) return res.status(404).send('Unable to find the requested resource!');

  await db.collection("bookings").remove(result);

  if (req.get('Accept').indexOf('html') === -1) {
    return res.status(204).send();	    // for ajax request
  } else {
    return res.redirect('/bookings');	// for normal HTML request
  }
});

// Form for updating a single Booking 
router.get('/bookings/update/:id', async function (req, res) {

  // let result = db.getCollection("bookings").findOne({ $loki: parseInt(req.params.id) });
  let result = db.collection("bookings").findOne({ _id: ObjectId(req.params.id) });

  if (!result) return res.status(404).send('Unable to find the requested resource!');

  res.render("update", { booking: result })

});

// Updating a single Booking 
router.post('/bookings/update/:id', async function (req, res) {

  let result = db.collection("bookings").findOne({ $loki: parseInt(req.params.id) });

  if (!result) return res.status(404).send('Unable to find the requested resource!');

  // db.getCollection("bookings").findAndUpdate({ $loki: parseInt(req.params.id) },
  //   function (item) {
  //     // Replace all properties of item with req.body properties
  //     Object.assign(item, req.body)
  //   });

  req.body.numTickets = parseInt(req.body.numTickets);

  await db.collection("bookings").findOneAndReplace({ _id: ObjectId(req.params.id) },
    req.body
  );

  res.send("Booking updated.");

});

/* Searching with where condition */
router.get('/bookings/search', async function (req, res) {

  var whereClause = {};

  if (req.query.name) whereClause.name = { $regex: req.query.name };

  var parsedNumTickets = parseInt(req.query.numTickets);
  if (!isNaN(parsedNumTickets)) whereClause.numTickets = parsedNumTickets;

  // let results = db.getCollection("bookings").find(whereClause);
  let results = db.collection("bookings").find(whereClause).toArray();

  return res.render('bookings', { bookings: results });

});

// /* Pagination */
// router.get('/bookings/paginate', function (req, res) {

//   var count = Math.max(req.query.limit, 2) || 2;
//   var start = Math.max(req.query.offset, 0) || 0;

//   var results = db.getCollection("bookings").chain().find({}).offset(start).limit(count).data();

//   var totalNumRecords = db.getCollection("bookings").count();

//   return res.render('paginate', { bookings: results, numOfRecords: totalNumRecords });

// });

// /* Ajax Pagination */
// router.get('/bookings/aginate', function (req, res) {
//   if (req.get('Accept').indexOf('html') === -1) {

//     var count = Math.max(req.query.limit, 2) || 2;
//     var start = Math.max(req.query.offset, 0) || 0;

//     var results = db.getCollection("bookings").chain().find({}).offset(start).limit(count).data();

//     return res.json(results);

//   } else {

//     var totalNumRecords = db.getCollection("bookings").count();

//     return res.render('aginate', { numOfRecords: totalNumRecords });
//   }
// });

/* Vue.js Pagination */
router.get("/bookings/vaginate", async function (req, res) {

  if (req.get('Accept').indexOf('html') === -1) {

    var count = Math.max(req.query.limit, 2) || 2;
    var start = Math.max(req.query.offset, 0) || 0;

    // var results = db.getCollection("bookings").chain().find({}).offset(start).limit(count).data();
    var results = db.collection("bookings").find({}, {
      skip: start,
      limit: count
    }).toArray();

    return res.json(results);

  } else {

    // var totalNumRecords = db.getCollection("bookings").count();
    var totalNumRecords = await db.collection("bookings").count();

    return res.render('vaginate', { numOfRecords: totalNumRecords });
  }
})

module.exports = router;

"use strict";

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const key = 'c71e86c71fe04e23b684accfb491853c';
const endpoint = 'https://comeon.cognitiveservices.azure.com/';
// Authenticate the client with your key and endpoint
const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

// Example method for detecting sentiment in text
async function sentimentAnalysis(client, message){

  const sentimentInput = [
      // "I had the best day of my life. I wish you were there with me."
      message
  ];
  const sentimentResult = await client.analyzeSentiment(sentimentInput);

  sentimentResult.forEach(document => {
      console.log(`ID: ${document.id}`);
      console.log(`\tDocument: ` + sentimentInput);
      console.log(`\tDocument Sentiment: ${document.sentiment}`);
      console.log(`\tDocument Scores:`);
      console.log(`\t\tPositive: ${document.confidenceScores.positive.toFixed(2)} \tNegative: ${document.confidenceScores.negative.toFixed(2)} \tNeutral: ${document.confidenceScores.neutral.toFixed(2)}`);
      console.log(`\tSentences Sentiment(${document.sentences.length}):`);
      document.sentences.forEach(sentence => {
          console.log(`\t\tSentence sentiment: ${sentence.sentiment}`)
          console.log(`\t\tSentences Scores:`);
          console.log(`\t\tPositive: ${sentence.confidenceScores.positive.toFixed(2)} \tNegative: ${sentence.confidenceScores.negative.toFixed(2)} \tNeutral: ${sentence.confidenceScores.neutral.toFixed(2)}`);
      });
  });

  return sentimentResult;
}