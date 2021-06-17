
const express = require("express");
let router = express.Router();
const mongoose = require('mongoose');

const moviesModel = require("../connection");




const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];



router
.route('/by-title')
.get( async (request, response) => {
  const byTitle = await moviesModel.find({}).sort({"title":1});

  try {
    response.send(byTitle);
  } catch (error) {
    response.status(500).send(error);
  }
});






router
.route('/add')
.post( async (req, res) => {
  
  let newMovie = new moviesModel({
    title: req.query.title,
    year: req.query.year,
    rating: req.query.rating,
  });
  newMovie.save((err, newMovie) => {
    if (err) res.send(err);
    else res.send({ status: 200, data: newMovie });
  });
});









router
.route('/delete/:text?')
.delete( async (request, response) => {
  try {
    const del = await moviesModel.findByIdAndDelete(request.params.text);

    if (!del) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});





  router
  .route('/update/:id')
  .put( async (req, res) => {
    try {
      await moviesModel.findByIdAndUpdate(req.params.id, {title:req.query.title}, 
        {year:req.query.year}, {rating:req.query.rating});
      await moviesModel.save();
      res.send(up);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  










module.exports = router;
