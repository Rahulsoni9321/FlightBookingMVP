import axios from "axios";
import qs from "qs";

export async function AccessToken() {
  try {
    let data = qs.stringify({
      grant_type: "client_credentials",
      client_id: `${process.env.AMADEUS_API_KEY}`,
      client_secret: `${process.env.AMADEUS_API_SECRET}`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.api.amadeus.com/v1/security/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    const response = await axios.request(config);

    return response.data.access_token;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong while fetching Acess Token ." };
  }
}
