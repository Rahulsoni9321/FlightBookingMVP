import axios from "axios";
import { Router } from "express";
import { AmadeusToken } from ".";


const router = Router();
export const FlightRoute = router;


router.post("/flightdetails", async (req, res) => {
  const payload = req.body;
  // const draftdayId = req.query.dayid;
 


 try {
   const response = await axios.get(
    `${process.env.AMADEUS_BASE_URL}/shopping/flight-offers`,
    {
      params: {
        originLocationCode: payload.Origin,
        destinationLocationCode: payload.Destination,
        departureDate: payload.StartDate,
        adults: payload.Adults,
        max: 5,
        nonStop:true
      },
      headers: {
        Authorization: `Bearer ${AmadeusToken}`,
      },
    }
  );
  
  return res.json({
    flightdetails: response.data.data,
  });
}
catch(error) {
  console.log(error);
  return res.status(500).json({
    message:"Something went wrong while getting flight details."
  })
}
});


