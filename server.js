const express = require('express');
const cors = require('cors');
const knex = require('knex');
const port = 3001;
const app = express();

const image  = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection:{
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }  
});



app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World2!')
})

// image
app.put('/image',(req,res) => {image.handleImage(req, res, db)})

//api
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})