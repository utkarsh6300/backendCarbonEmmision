const express=require('express')
const router=express.Router();
const axios=require('axios')

router.post('/',[],
async(req,res)=>{

var data=req.body.data;
console.log(req.body);
try {
    

var program = {
               "script" : data[0],
              "language": "java",
              "versionIndex": "1",
              "clientId": process.env.clientId,
              "clientSecret":process.env.clientSecret
};
var program1 = {
               "script" : data[1],
              "language": "java",
              "versionIndex": "1",
              "clientId": process.env.clientId,
              "clientSecret":process.env.clientSecret
};


   
    const config = {
        headers: {
              'Content-Type': 'application/json'
        }
      };
    if(data[0]===data[1]) return res.send({energy1:0,
      energy2:0,ratio:1});
    const res1 = await axios.post('https://api.jdoodle.com/v1/execute',program, config);
    const res2 = await axios.post('https://api.jdoodle.com/v1/execute',program1, config);
var data1=res1.data;
var data2=res2.data;
console.log(data1,data2)
if(data1.statusCode!=200) return res.status(data1.statusCode).send({message:data1.output,code:"leftside"});
if(data2.statusCode!=200) return res.status(data2.statusCode).send({message:data2.output,code:"rightside"});
    const energy1 = (data1.cpuTime * (4 * 12 + 8 * 0.3725) * 1.67 * 708.2)/1000 ; // divide by thousand
    const energy2 = (data2.cpuTime * (4 * 12 + 8 * 0.3725) * 1.67 * 708.2)/1000 ;// divide by thousand
 var ratio=energy1/energy2;

      res.status(200).send({energy1:energy1,
        energy2:energy2,ratio:ratio});
   
} catch (error) {
    console.error(error);
    res.status(500).send({message:"server error",code:"don't know"});
}



});

module.exports=router;
