// one imoprtant thing code order is important in node js
const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config({ path: './config.env' });
const app = require("./app")

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.pm3jkky.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");

// });
const uri=process.env.uri
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

const port=2022
const server=app.listen( port,()=>console.log(`server started succesfully at port ${port}`))

