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
    if(data[0]===data[1]) res.send({ratio:1});
    const res1 = await axios.post('https://api.jdoodle.com/v1/execute',program, config);
    const res2 = await axios.post('https://api.jdoodle.com/v1/execute',program1, config);
var data1=res1.data;
var data2=res2.data;
    const energy1 = (data1.cpuTime * (4 * 12 + 8 * 0.3725) * 1.67 * 708.2) / 1000;
    const energy2 = (data2.cpuTime * (4 * 12 + 8 * 0.3725) * 1.67 * 708.2) / 1000;
 var ratio=energy1/energy2;

    //  var ratio=res1.data.cpuTime*res1.data.memory/(res2.data.cpuTime*res2.data.memory);
    // var ans=475*energy;  //in grams
      res.status(200).send({energy1:energy1,
        energy2:energy2,ratio:ratio});
    
    // console.log(res1.data,res2.data);
    //   res.status(200).send(res1.data);
} catch (error) {
    console.error(error);
    res.status(500).send('server error');
}



});

module.exports=router;