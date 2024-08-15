import "dotenv/config"; 
import express from "express";
import cors from "cors";
import { AccessToken } from "./AmadeusToken";
import { PlacesAPIrouter } from "./PlaceDetails";
import { FlightRoute } from "./flights";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
export let AmadeusToken: any = "";


(async function () {
  await new Promise((resolve) =>
    setTimeout(() => {
      //@ts-ignore
      resolve();
    }, 2000)
  );

  AmadeusToken = await AccessToken();
  console.log(AmadeusToken);
  setInterval(async () => {
    AmadeusToken = await AccessToken();
    console.log(AmadeusToken);
  }, 1740000);
})();


app.use("/api/v1",PlacesAPIrouter);
app.use("/api/v1/flights",FlightRoute);
app.listen(port, () => {
    console.log(`App is listening is at ${port}`);
  });