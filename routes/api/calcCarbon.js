const express=require('express')
const router=express.Router();
const axios=require('axios')
const  dataCarbonIntensity =require( "../../data/CI_aggregated[1]");
router.post('/',[],
async(req,res)=>{

var data=req.body.data;

try {
    
    var PUE=1.67;
    var runtime=data.runtime;
    var NoOfCores=data.cores;
    var sizeOfMemory=data.memory;
    var tdpc=data.tdpc;
    var country1=data.country;
    var countryCarbonIntensity=1;
    dataCarbonIntensity.forEach((country)=>{
       
if(country.Region==country1) countryCarbonIntensity=country.carbonIntensity;
    });
       

    const energy = (runtime * (NoOfCores * tdpc + sizeOfMemory * 0.3725) * 1.67 * countryCarbonIntensity) / 1000;
    const treeMonth=energy/0.9134;
    const distance=energy/175;
    var ans=energy;  //in grams
      res.status(200).send({carbon:ans,distance:distance,treeMonth:treeMonth});
} catch (error) {
    console.error(error);
    res.status(500).send('server error');
}



});

module.exports=router;
