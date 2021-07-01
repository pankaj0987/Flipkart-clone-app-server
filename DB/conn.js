const Mongoose=require('mongoose')

const DB=process.env.DATABASE;

Mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("mongoDB connection successful")
}).catch((err)=>{
    console.log("mongoDB connection failed",err)
})