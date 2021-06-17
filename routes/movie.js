
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
.route('/by-title')
.get( function(req,res){
   
  movies.find({}).sort({title: 1}).exec(function(err, moviess) {
    res.send({
    status:200,
    message: moviess
    })
})
})











// router
// .route('/delete/:text?')
// .delete( (req, res) => {
//   let test = []
//   let text = req.params.text;
//   if(text>0 && text<=4){
//     test.push(movies.splice(text-1,1))
//     console.log(movies)
//     res.send(test)
  
//   }else{
//     res.send({status:404, error:true, message:'the movie <ID> does not exist'})
//    }
// })






router
.route('/update/:text?')
.put( (req, res) => {
  let text = req.params.text;
  let title = req.query.title;
  let rating = req.query.rating;
  let year = req.query.year;

  if(title != "" && rating == "" && year == ""){
    movies[text-1].title = title
    res.send({message:movies})
  }else if(rating != "" && title == "" && year == ""){
    movies[text-1].rating = rating
    res.send({message:movies})
  }else if(year !="" && rating == "" && title == ""){
    movies[text-1].year = year
    res.send({message:movies})
  }


  else if(title != "" && rating != "" && year == ""){
    movies[text-1].title = title
    movies[text-1].rating = rating
    res.send({message:movies})
  }else if(rating != "" && title == "" && year != ""){
    movies[text-1].rating = rating
    movies[text-1].year = year
    res.send({message:movies})
  }else if(year !="" && rating == "" && title != ""){
    movies[text-1].year = year
    movies[text-1].title = title
    res.send({message:movies})
  }
  
  
  
  
  
  else if(title !="" && rating !="" && year !=""){
    movies[text-1].title = title
    movies[text-1].rating = rating
    movies[text-1].year = year
    res.send({message:movies})
  }
  
  

})






module.exports = router;
