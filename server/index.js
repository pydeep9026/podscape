

const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const bodyParser = require('body-parser');
const Userroutes=require("./routes/userroutes")
const Speakerroutes=require("./routes/speakerroutes")
const Podcastroutes=require("./routes/podcastroutes")
 

const app=express()  
require("dotenv").config()

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
app.use(cors())  
app.use(express.json()); 

 
app.use("/api/userauth",Userroutes)      
app.use("/api/speakerauth",Speakerroutes) 
app.use("/api/podcasts",Podcastroutes)      

    
  



  


const PORT=process.env.PORT || 5000

/*const dburl='mongodb://0.0.0.0:27017/podcastify'*/
const dburl='mongodb+srv://PRADEEP123:'+encodeURIComponent('Knight@9026')+'@cluster0.x5jbf4w.mongodb.net/podcastify?retryWrites=true&w=majority'
/*const dburl=process.env.db_url*/

 

mongoose.connect(dburl, {      
    useNewUrlParser: true,
    useUnifiedTopology: true           
  });
  
  mongoose.connection.on('connected', () => {    
    console.log('Successfully connected to MongoDB');   
  }); 

 

  


 

const server=app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`) 
})  

    


