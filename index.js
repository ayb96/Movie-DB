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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})