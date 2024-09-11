const express=require('express');
const cors=require('cors');

const mainRouter=require('./routes/index');
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/v1",mainRouter);



const PORT=3000;
app.listen(PORT,function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});