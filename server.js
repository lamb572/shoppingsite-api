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
const myAccount = require('./controllers/myaccount');
const updateUserInfo = require('./controllers/updateUserInfo');
const updateAddress = require('./controllers/updateAddress');
const updatePassword = require('./controllers/updatePassword');


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
// signin request
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})

// image
app.put('/image',(req,res) => {image.handleImage(req, res, db)})

//api
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})

// register request
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})

// My account request
app.post('/myaccount', (req, res) => {myAccount.requestinfo(req, res, db, bcrypt, saltRounds)})

// update user info
app.post('/updateuserinfo', (req, res) => {updateUserInfo.updateUserInfo(req, res, db)})

// update user address
app.post('/updateaddress', (req, res) => {updateAddress.updateAddress(req, res, db)})

//update password
app.post('/updatepassword', (req, res) => {updatePassword.updatePassword(req, res, db, bcrypt, saltRounds)})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})