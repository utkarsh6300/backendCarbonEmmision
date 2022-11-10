const express=require('express');

const app=express();

app.use(express.json());
const cors=require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/',(req,res)=>{
    res.send('API RUNNING');
   })
   
// app.use('/api/analyse',require('./routes/api/analyse')); 
app.use('/api/calcCarbon',require('./routes/api/calcCarbon')); 
app.use('/api/compare',require('./routes/api/compare')); 

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
}); 
