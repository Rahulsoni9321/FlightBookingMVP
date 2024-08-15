import axios from "axios";
import { Router } from "express";
import { AmadeusToken } from ".";

const router = Router();
export const PlacesAPIrouter = router;

router.get("/place",async (req,res)=>{
  const placename= req.query.name || "";
 try { const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${placename}&max=10&include=AIRPORTS`,{
    headers:{
      Authorization:`Bearer ${AmadeusToken}`
    }
  })
   return res.json({
    Placedetails: response.data.data
   })}
   catch(error) {
    console.log(error);
    return res.status(400).json({
      message:"No such Place Exist"
    })
   }
})

