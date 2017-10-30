import http from 'http';
import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();

const url = "mongodb://localhost:27017/arash";

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
app.get('/user',(req, resp, next)=>{
	MongoClient.connect(url, (err, db)=>{
		db.collection('arash').findOne({},(err, res)=>{
			if(err) throw err;
			resp.send(res.name)
			console.log(res.name);
			db.close();
		})
	})
});
app.get('/',(req, res)=>{
    setTimeout( (function() {res.send('Arash')}), 2000);
    console.log(1)
});

app.listen(3000,()=>{
    console.log("Example app listening on port 3000!")
});
