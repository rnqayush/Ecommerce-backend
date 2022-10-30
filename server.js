// one imoprtant thing code order is important in node js
const mongoose=require("mongoose")  
const dotenv=require("dotenv")

dotenv.config({ path: './config.env' });
const app = require("./app")


// below is the step to connect to mongoDB
const uri=process.env.uri
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

const port=2022
const server=app.listen( port,()=>console.log(`server started succesfully at port ${port}`))

