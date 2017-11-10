const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const assert = require('assert');
const morgan  = require('morgan')
const session = require( 'express-session');

const app = express();

const url = "mongodb://localhost/arash";
mongoose.connect(url,{
	useMongoClient: true,
})
mongoose.Promise = global.Promise;

const db = mongoose.connection;

const userSchema =new mongoose.Schema({
	userName:String,
	tell:String,
	email:String,
	password:String
});

const userModel = mongoose.model('user', userSchema);

// const newUser = new userModel({
// 	userName:'arash',
// 	tell:'4545545',
// 	email:'545555',
// 	password:'45455454'
// });
// newUser.save();

db.on('error',()=>{
	console.log("MongoDB not Connected")
});
db.once('connected', ()=>{
	console.log("MongoDB Connected")
});

app.use(morgan('common'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
	secret : "secret",
	resave : false,
	saveUninitialized : true
})) ;
// app.use((req, res, next) =>{
//     res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		 "Origin, X-Requested-With, Content-Type, Accept"
// 	);
//     next();
// });

app.get('/',(req, res)=>{
	res.send(req.session)
});

app.post('/login',(requ, resp, next)=>{
	if(requ.session.auth != undefined){
		resp.send({status:false, msg:'login body dadash'})
	}
	else{
		userModel.findOne({userName: requ.body.userName},(err, user)=>{
			if(err){throw err}
			if(user){
				if(user.password == requ.body.password){
					requ.session.auth = { username: requ.body.userName };
					requ.session.save();
					resp.json({
						status:true,
						msg:`login shodid`,
						userData:user
					});
					console.log("------------")
					console.log(requ.session)
					console.log("------------")
				}
				else{
					resp.json({
						status:false, 
						msg:`password ghalat ast!`
					})
				}
			}
			else{
				resp.json({
					status: false, 
					msg:`user sabt nashode ast!`
				})
			}
		})
	}
});
app.post('/signup',(requ, resp, next) => {
	const formData = requ.body;
	if(formData.userName && formData.password){
		userModel.find({userName:formData.userName}, (err, users) =>{
			if(err) {throw err}
			else if(users.length){
				resp.json({status:false, msg:`usere tekrari ast`})
				console.log(`usere [> ${formData.userName} <] tekrari ast`)
			}
			else{
				const newUser = new userModel({
					userName:formData.userName,
					tell:formData.tell,
					email:formData.email,
					password:formData.password
				});
				console.log(`usere jadidi be name -->'${formData.userName}'<--sakhte shod`);
				newUser.save();
				console.log(newUser)
				resp.json({status:true,userData:newUser, msg:'user jadid ba movafaghiyat sabt shod ^_^'})
			}
		});
	}
	else{
		resp.json({status: false, msg:'feild marbote be username ya password khali ast!'})
		console.log(formData)
	}
});

app.post('/getinfo',(req, res)=>{
	res.send(req.session)
	console.log(req.session)
});


app.get('/posts',(requ, resp, next)=>{
	const posts = [
		{
			authorPost:"Ahmad",
			avatar:'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
			imgPost:'http://img.asemooni.com/cats-4.jpg',
			description:'Lorem Ipsum is placeholder text commonly used in the graphic.',
			dataCreate:'1993/11/20',
			likes:[
				{userip:'29',userName:'Arash'},
				{userip:'30',userName:'Ali'},
				{userip:'31',userName:'ahmad'}
			],
			views:[
				{userip:'29',userName:'Arash'}
			],
			follow:false,
			unfollow:true,
		},
		{
			authorPost:"Ali",
			avatar:'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
			imgPost:'http://img.asemooni.com/cats-2.jpg',			
			description:'Lorem Ipsum is placeholder text commonly used in the graphic.',
			dataCreate:'1993/11/20',
			likes:[
				{userip:'29',userName:'Arash'},
				{userip:'30',userName:'Ali'},
				{userip:'31',userName:'ahmad'}
			],
			views:[
				{userip:'29',userName:'Arash'}
			],
			follow:false,
			unfollow:true,
		},
		{
			authorPost:"Arash",
			avatar:'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
			imgPost:'http://img.asemooni.com/cats.jpg',
			description:'Lorem Ipsum is placeholder text commonly used in the graphic.',
			dataCreate:'1993/11/20',
			likes:[
				{userip:'29',userName:'Arash'},
				{userip:'30',userName:'Ali'},
				{userip:'31',userName:'ahmad'}
			],
			views:[
				{userip:'29',userName:'Arash'}
			],
			follow:false,
			unfollow:true,
		}
	]
	setTimeout( (function() {resp.send(posts)}), 2000);	
	console.log('send get from posts')
});

app.listen(3000,()=>{
    console.log("Example app listening on port 3000!")
});
