const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/Register');
const signin = require('./Controllers/SignIn');
const profile =  require('./Controllers/Profile');
const image =  require('./Controllers/Image');

const db = knex({
	  client: 'mysql',
	  connection: {
	    host : '127.0.0.1',
	    user : 'Nivedha',
	    password : 'yogesh2527#',
	    database : 'smartbrain'
	  }
})

app.use(cors());
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// app.get('/', (req,res)=>{
// 	res.send(db.users)
// })

app.get('/', (req,res)=>  res.json('it is working'))

app.post('/signin', (req,res)=> signin.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res ) => register.handleRegister(req, res, db,bcrypt))

app.get('/profile/:id', (req,res) => profile.handleProfile(req, res, db))

app.put('/image', (req, res) => image.handleImage(req, res, db))

app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3001, () => {
	console.log(`app running at port ${process.env.PORT}`);
});