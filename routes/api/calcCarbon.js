const express=require('express')
const router=express.Router();
const axios=require('axios')
const  dataCarbonIntensity =require( "../../data/CI_aggregated[1]");
router.post('/',[],
async(req,res)=>{

var data=req.body.data;
// console.log(req.body);
// console.log(dataCarbonIntensity);
try {
    // var PUE=data.PUE;
    var PUE=1.67;
    var runtime=data.runtime;
    var NoOfCores=data.cores;
    var sizeOfMemory=data.memory;
    var tdpc=data.tdpc;
    var country1=data.country;
    var countryCarbonIntensity=1;
    dataCarbonIntensity.forEach((country)=>{
        // console.log(country.carbonIntensity);
if(country.Region==country1) countryCarbonIntensity=country.carbonIntensity;
    });
        // console.log(countryCarbonIntensity);

    const energy = (runtime * (NoOfCores * tdpc + sizeOfMemory * 0.3725) * 1.67 * countryCarbonIntensity) / 1000;
    // var coreUsageFactor=data.coreUsageFactor;
    // var PowerDrawComputingCore=data.PowerDrawComputingCore;
    // var PowerDrawMemory=data.PowerDrawMemory;
// change variables to code file size,running time,runtime memory used;
    // var energy=0.001*PUE*running_time*((NoOfCores*PowerDrawComputingCore*coreUsageFactor)+(sizeOfMemory*PowerDrawMemory));
    var ans=475*energy;  //in grams
      res.status(200).send({carbon:ans});
} catch (error) {
    console.error(error);
    res.status(500).send('server error');
}



});

module.exports=router;