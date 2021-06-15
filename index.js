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




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})