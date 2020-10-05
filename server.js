const express = require('express');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = process.env.PORT || 5000;

var database,collection;

app.use(cors());
app.use(express.json());

//const db = require("../db");
const dbName = "TEK2020";
const collectionName = "paymentsHistory";

const uri ='mongodb+srv://navdeep:2020tek12345@hackademy.usqxf.mongodb.net?retryWrites=true&w=majority'
//const uri = process.env.ATLAS_URI;

app.get('/', (req, res) => {
	console.log("here");
    res.json({"message": "Welcome to Hackademy2020"});
	
});

app.get("/data", (request, response) => {
		
	MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if(error) throw error;
	
		
	database = client.db(dbName);
	collection = database.collection(collectionName);
	
	collection.find({InvoiceNo:"536365"}).toArray((error, result) => {
			if(error) {
				return response.status(500).send(error);
			}
			response.send(result);
		});
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
