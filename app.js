const express=require("express")
const app=express() 
const bodyParser = require('body-parser')
const baseURL="/api/v1"
app.use(bodyParser.json()); // compulsary to use to get requests
app.use(bodyParser.urlencoded({ extended: true }));// compulsary to use to get requests
const productRouter=require("./Routers/ProductRouter")
const categoryRouter=require("./Routers/CategoryRouter")
const userRouter=require("./Routers/UserRouter")




//middlewares //
app.use("/api",(req,res,next)=>{
    req.CreatorName="ayush mishra"
   next()
})



// producttRouter
app.use(`${baseURL}/product`,productRouter)
//categoryRouter
app.use(`${baseURL}/category`,categoryRouter)

//userRouter
app.use(`${baseURL}/user`,userRouter)







module.exports=app

