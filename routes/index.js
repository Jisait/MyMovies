var express = require('express');
var mongoose = require('mongoose');
const movieModel = require('../models/movies');
const wishlistModel = require('../models/wishlist');
var router = express.Router();
var request = require('sync-request');
const { route } = require('../app');
var moviesAPI = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=api_key=a39d60c730ad93e33c984cf4e261888e&language=fr-FR")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req, res, next) {

  var movies = request("GET", "https://api.themoviedb.org/3/movie/upcoming?api_key=a39d60c730ad93e33c984cf4e261888e&language=fr-FR")
    var moviesAPI = JSON.parse(movies.body)

 

    res.json({moviesAPI})
});

router.post('/wishlist-movie', async function(req, res, next) {

      var newMovie = new movieModel({
          Nom : req.body.name,
          img : req.body.img,
      })

    var movieSave = await newMovie.save()

      var result = false 
      if(movieSave.Nom) {
          result = true }

      res.json(result)
});

router.delete('/wishlist-movie/:name', async function(req,res, next) {

    var returnDB = await movieModel.deleteOne({Nom : req.params.name})

    var result = false
      if(returnDB.deletedCount == 1) {
      result = true
    }
    res.json(result)

});

router.get('/wishlist-movie', async function(req,res, next) {

  var movies = await movieModel.find()

  res.json({movies})

});

module.exports = router;
