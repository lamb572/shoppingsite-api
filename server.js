const express = require('express');
const cors = require('cors');
const knex = require('knex');
const port = 3001;
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const image  = require('./controllers/image');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');

const db = knex({
    client: 'pg',
    connection:{
      host :'127.0.0.1',
      user: 'lukebeach' ,
      password: '',
      database: 'foodsite'
    }  
});



app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World2!')
})
// signin request
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})

// image
app.put('/image',(req,res) => {image.handleImage(req, res, db)})

//api
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})

// register request
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})