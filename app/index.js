import http from 'http';
import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
const app = express();

const url = "mongodb://localhost:27017/arash";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		 "Origin, X-Requested-With, Content-Type, Accept"
	);
    next();
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	//Create a collection name "customers":
	db.createCollection("arash", function(err, res) {
		if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
MongoClient.connect(url,(err, db)=>{
	if(err) throw err;
	const data = {name:'AliReza',tell:'09364936692'};
	db.collection('arash').insertOne(data, (err, res)=>{
		if(err) throw err;
		console.log('data in update');
		db.close();
	});
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

// app.get('/user',(req, resp, next)=>{
// 	MongoClient.connect(url, (err, db)=>{
// 		db.collection('arash').findOne({},(err, res)=>{
// 			if(err) throw err;
// 			resp.send([{test:'1'},{test:'1'},{test:'1'},{test:'1'}])
// 			console.log(res.name);
// 			db.close();
// 		})
// 	})
// });
app.post('/userLogin',(requ, resp) => {
	const users = [
		{name:'Arash', age:'24', skill:[
			{skill:'react'},{skill:'es6'},{skill:'js'}
		]},
		{name:'Ali', age:'23', skill:[
			{skill:'react'},{skill:'es6'},{skill:'js'},{skill:'webpack'},{skill:'node'}
		]},
		{name:'ahmad', age:'24', skill:[
			{skill:'react'},{skill:'es6'},{skill:'js'},{skill:'node'},{skill:'php'},{skill:'babel'}
		]},
	];
	setTimeout(
		 () =>{
			 resp.send(requ.body.userName)
			}, 
	2000);

	console.log('post from userLogin')
	console.log(requ.body)
})


app.get('/',(req, res)=>{
	const ip = req.connection.remoteAddress
	setTimeout( (function() {res.send('Arash')}), 2000);
    console.log(ip)
});


app.listen(3000,()=>{
    console.log("Example app listening on port 3000!")
});
