const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/test', (req, res) => {
    res.send({status:200,  message:"ok"})
  })


  app.get('/time', (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    res.send({status:200, message:hours+":"+minutes})
   
  })

  app.get('/hello/:tagid', (req, res) => {

    parameter="Hello, " + req.params.tagid;
    res.send({status:200, 
          message: parameter})

})


app.get('/search', (req, res) => {
  let search = req.query.q;
  console.log(search)
  if(search == ""){
      res.send({status:500, error:true, message:"you have to provide a search"});
  }
  res.send({status:200, message:"ok", data:search});
})

//step 5




app.get('/movies/create', (req, res) => {
  res.send({status:200,  message:"ok"})
})

app.get('/movies/read', (req, res) => {
  res.send({status:200, data: movies})
})

app.get('/movies/update', (req, res) => {
  res.send({status:200,  message:"ok"})
})

app.get('/movies/delete', (req, res) => {
  res.send({status:200,  message:"ok"})
})


//step 6

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];


app.get('/movies/read/by-date', (req, res) => {
  
  var sortable = [];
  for (var vehicle in movies) {
    console.log(movies[vehicle].title)
      sortable.push([movies[vehicle].title, movies[vehicle].year]);
  }

sortable.sort(function(a, b) {
  return a[1] - b[1];
});
  res.send({status:200, data:sortable});
})

app.get('/movies/read/by-rating', (req, res) => {
  
  var sortable = [];
  for (var vehicle in movies) {
    console.log(movies[vehicle].title)
      sortable.push([movies[vehicle].title, movies[vehicle].rating]);
  }

sortable.sort(function(a, b) {
  return a[1] - b[1];
});
  res.send({status:200, data:sortable});
})

app.get('/movies/read/by-title', (req, res) => {
  
  var sortable = [];
  for (var vehicle in movies) {
    console.log(movies[vehicle].title)
      sortable.push([movies[vehicle].title]);
  }

sortable.sort(function(a, b) {
  return a[1] - b[1];
});
  res.send({status:200, data:sortable});
})

//step7

app.get('/movies/read/id/:text?', (req, res) => {
  let text = req.params.text;
  console.log(text)
  if(text<=movies.length){
    res.send({status:200, data:movies[text-1].title})

  }else{
    res.send({status:404, error:true, message:'the movie <ID> does not exist'})
  }
})

//step 8


app.put('/movies/add', (req, res) => {
  let text = req.query.title
  let text1 = req.query.year
  let text2 = req.query.rating
  if(text == "" || text1 == "" || text1.length != 4){
    res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
  }else if(text2 == ""){
    movies.push({status:200, title:text , year: text1, rating: 4})
    res.send(movies)
  }
  else{
    movies.push({status:200, title:text , year: text1, rating: text2})
    res.send(movies)
  }
})


//step 9

app.delete('/movies/delete/:text?', (req, res) => {
  let test = []
  let text = req.params.text;
  if(text>0 && text<=4){
    test.push(movies.splice(text-1,1))
    console.log(movies)
    res.send(test)
  
  }else{
    res.send({status:404, error:true, message:'the movie <ID> does not exist'})
   }
})


//step 10



app.patch('/movies/update/:text?', (req, res) => {
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




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



//step 11