const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8000
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
 
let db;
console.log(process.env.DB_STRING)

MongoClient.connect(process.env.DB_STRING, { useUnifiedTopology: true} )
  .then(client => {
    console.log('Connected to Database')
    db = client.db('book-manager')
  })

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.set('view engine', 'ejs')
    app.listen(process.env.PORT || PORT, ()=>{
      console.log(`Server running on port ${PORT}`)
    })

    app.get('/', (req, res) => {
        db.collection('books').find().toArray()
          .then(results => {
            res.render('index.ejs', {books: results})
            console.log(results)
          })
          .catch(err => {
            console.error(err)
          })
      })   
      
      app.get('/bookList', (req, res) => {
        db.collection('books').find().toArray()
          .then(results => {
            res.render('bookList.ejs', {books: results})
            console.log(results)
          })
          .catch(err => {
            console.error(err)
          })
      })   

      app.get('/addNewBook', (req, res) => {
        db.collection('books').find().toArray()
          .then(results => {
            res.render('addBook.ejs')
            console.log(results)
          })
          .catch(err => {
            console.error(err)
          })
      })   
      
      app.get('/editBook', (req, res) => {
        db.collection('books').find().toArray()
          .then(results => {
            res.render('bookList.ejs', {books: results})
            console.log('it got here!')
          })
          .catch(err => {
            console.error(err)
          })
      })   

    app.post('/books', (req, res) => {
        db.collection('books').insertOne(req.body)
          .then(result => {
            res.redirect('/bookList')
          })
          .catch(error => console.error(error))
      })

    app.put('/editBook', (request, response) => {
      db.collection('books').updateOne(
        {
            title: request.body.oldTitleS, 
            author: request.body.oldAuthorS, 
            bookRating: request.body.oldRatingNumS, 
            bookNotes: request.body.oldNoteS,
            quoteOne: request.body.oldQuoteOneS, 
            quoteTwo: request.body.oldQuoteTwoS, 
            quoteThree: request.body.oldQuoteThreeS, 
            startDate: request.body.oldStartDateS, 
            finishDate: request.body.oldFinishDateS
      }, 
        {
          $set: {
            title: request.body.titleS,
            author: request.body.authorS,
            bookRating: request.body.ratingNumS,
            bookNotes: request.body.noteS,
            quoteOne: request.body.quoteOneS,
            quoteTwo: request.body.quoteTwoS,
            quoteThree: request.body.quoteThreeS,
            startDate:request.body.startDateS,
            finishDate: request.body.finishDateS
            },
      })
      .then(result => {
        console.log('It got to here')
      })
      .catch(error => {
        console.error(error)
      })
    })

    app.delete('/deleteBook', (request, response) => {
      db.collection('books').deleteOne({title: request.body.titleS})
      .then(result => {
          console.log('Book Deleted')
          response.json('Book Deleted')
      })
      .catch(err => {
          console.error(err)
      })
  })


