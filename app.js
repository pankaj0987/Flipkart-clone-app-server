const dotenv=require('dotenv')
const express=require('express');
// const fileupload=require('express-fileupload');
const path=require('path')
const cors=require('cors');

const app = express();

dotenv.config({path:'./config.env'});
const port=process.env.PORT;
require('./DB/conn')

app.use(cors());
// app.use(fileupload({
//     useTempFiles:true
// }));

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use('/public',express.static(path.join(__dirname,'Uploads')));




app.use(require('./router/auth'))
app.use(require('./router/adminRoutes/adminAuth'))
app.use(require('./router/adminRoutes/initialData'))
app.use(require('./router/category'))
app.use(require('./router/product'))
app.use(require('./router/brands'))
app.use(require('./router/pageRoute'))
app.use(require('./router/cart'))
app.use(require('./router/address'))
app.use(require('./router/order'))
app.use(require('./router/searchQuery'))

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})