

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FlightDetailsCard from "./FlightCards";
import { REACT_BACKEND_URL } from "../config";

const FlightBooking = () => {
    const [status,setdetailsStatus] = useState("Search Flights.")
  const [PlaceList, setPlaceList] = useState({
    OriginList: [],
    DestinationList: [],
  });
  const [FlightInfo, setFlightInfo] = useState({
    Origin: "",
    Destination: "",
    StartDate: "",
    Adults: "",
    Children: "",
  });

  const [FlightDetails, setFlightDetails] = useState([]);

  useEffect(() => {
    async function PlaceName() {
      try {
        const response = await axios.get(
          `${REACT_BACKEND_URL}/place?name=${FlightInfo.Origin}`
        );
       
        setPlaceList({ ...PlaceList, OriginList: response.data.Placedetails });
      } catch (error) {
        toast.error(
          "Something went wrong while fetching the filtered places name please check console"
        );
        console.error(error);
      }
    }
    if (FlightInfo.Origin.length >= 3) {
      PlaceName();
    }
  }, [FlightInfo.Origin]);

  useEffect(() => {
    async function PlaceName() {
      try {
        const response = await axios.get(
          `${REACT_BACKEND_URL}/place?name=${FlightInfo.Destination}`
        );
        
        setPlaceList({
          ...PlaceList,
          DestinationList: response.data.Placedetails,
        });
      } catch (error) {
        toast.error(
          "Something went wrong while fetching the filtered places name please check console"
        );
        console.error(error);
      }
    }
    if (FlightInfo.Destination.length >= 3) {
      PlaceName();
    }
  }, [FlightInfo.Destination]);

  const SearchFlights = async () => {
    const yesterday = new Date();
    const SelectedDate = new Date(FlightInfo.StartDate);
    yesterday.setDate(yesterday.getDate() - 1);
    if (SelectedDate > yesterday) {
      try {
        setdetailsStatus("Finding Flights....")
        const response = await axios.post(
          `${REACT_BACKEND_URL}/flights/flightdetails`,
          FlightInfo
        );
        console.log(response.data);
        setFlightDetails(response.data.flightdetails);
        
      } catch (error) {
        console.error(error);
        toast.error(
          "Something went wrong while fetching the flight details check console."
        );
      }
      if (FlightDetails.length == 0 ){
        setdetailsStatus("No Flights Available for the desired destination.")
      }
     } else {
      toast.error("Please select valid Date.");
      return false;
    }
  };
  return (
    <div className="min-h-screen bg-[#161819] text-white py-20">
      
        <div className="  flex w-10/12 mx-auto  gap-2 items-center  pl-8 h-20 border border-gray-300 bg-black/40 rounded-full font-normal text-white ">
          <div className="w-52 flex dropdown flex-col gap-2 border-r border-gray-200">
            <div className="text-xs font-normal">Origin</div>
            <input
              onChange={(e) => {
                setFlightInfo({ ...FlightInfo, Origin: e.target.value });
              }}
              tabIndex={0}
              className="w-52 bg-transparent text-white font-normal text-sm outline-none"
              placeholder="Origin"
              value={FlightInfo.Origin}
            ></input>
            {PlaceList.OriginList ? PlaceList.OriginList.length == 0 ? (
              <div
                tabIndex={0}
                className="dropdown-content dropdown-open text-white/40 font-normal text-xs text-center w-full bg-black/80 p-4 mt-16"
              >
                Please Enter Origin Name
              </div>
            ) : (
              <div
                tabIndex={0}
                className="Location dropdown-content flex flex-col gap-2 dropdown-open p-0  shadow bg-black/80 mt-16 overflow-y-scroll max-h-44 rounded-md w-full"
              >
                {PlaceList.OriginList.map((place: any) => {
                  return (
                    <div
                      onClick={() =>
                        setFlightInfo({ ...FlightInfo, Origin: place.iataCode })
                      }
                      className="text-white/70 text-sm  last:border-none   font-normal  cursor-pointer hover:bg-gray-500 "
                    >
                      <p className="p-3">
                        {place.name}, {place.iataCode}
                      </p>
                    </div>
                  );
                })}
              </div>
            ):<></>}
          </div>
          <div className="w-52 dropdown flex flex-col gap-2 border-r border-gray-200">
            <div className="text-xs font-normal">Destination</div>
            <input
              onChange={(e) => {
                setFlightInfo({ ...FlightInfo, Destination: e.target.value });
              }}
              tabIndex={1}
              className="w-52 bg-transparent text-white font-normal text-sm outline-none"
              placeholder="Where?"
              value={FlightInfo.Destination}
            ></input>
            {PlaceList.DestinationList ?  PlaceList.DestinationList.length == 0 ? (
              <div
                tabIndex={1}
                className="dropdown-content dropdown-open text-white/40 font-normal text-xs text-center w-full bg-black/80 p-4 mt-16"
              >
                Please Enter Destination Name
              </div>
            ) : (
              <div
                tabIndex={1}
                className="Location mt-16 dropdown-content flex flex-col gap-2 dropdown-open p-0  shadow bg-black/80  overflow-y-scroll max-h-44 rounded-md w-full"
              >
                {PlaceList.DestinationList.map((place: any) => {
                  return (
                    <div
                      onClick={() =>
                        setFlightInfo({
                          ...FlightInfo,
                          Destination: place.iataCode,
                        })
                      }
                      className="text-white/70 text-sm  last:border-none   font-normal  cursor-pointer hover:bg-gray-500 "
                    >
                      <p className="p-3">
                        {place.name}, {place.iataCode}
                      </p>
                    </div>
                  );
                })}
              </div>
            ):<></>}
          </div>
          <div className="w-52 px-4 flex flex-col gap-2 border-r border-gray-200">
            <div className="text-xs font-normal">Start Date</div>
            <input
              onChange={(e) => {
                setFlightInfo({
                  ...FlightInfo,
                  StartDate: e.target.value,
                });
              }}
              className="bg-transparent text-white font-normal text-sm outline-none"
              placeholder="Start Date?"
              type="date"
              //@ts-ignore
              value={FlightInfo.StartDate}
            ></input>
          </div>

          <div className="w-52 px-4 flex flex-col gap-2 border-r border-gray-200">
            <div className="text-xs font-normal">Who</div>
            <input
              onChange={(e) => {
                setFlightInfo({ ...FlightInfo, Adults: e.target.value });
              }}
              type="Number"
              className=" bg-transparent text-white font-normal text-sm outline-none"
              placeholder="Add guest"
            ></input>
          </div>
          <button
            onClick={SearchFlights}
            className="rounded-full p-6 bg-transparent"
          >
            Search
          </button>
        </div>
        <div className="w-full  flex flex-col items-center gap-8 justify-center py-12 md:mx-auto 2xl:max-w-7xl">
         { FlightDetails.length == 0 ? <div>{status}</div>: 
          FlightDetails.map((details,index)=>{
            //@ts-ignore
            return         <FlightDetailsCard index={index} Duration={details.itineraries[0].duration} AvailableSeats={details.numberOfBookableSeats} departureiata={details.itineraries[0].segments[0].departure.iataCode} arrivaliata={details.itineraries[0].segments[0].arrival.iataCode} departureterminal={details.itineraries[0].segments[0].departure.terminal} arrivalterminal={details.itineraries[0].segments[0].arrival.terminal} departuretime={details.itineraries[0].segments[0].departure.at} arrivaltime={details.itineraries[0].segments[0].arrival.at} Price={details.price.grandTotal} AirlineOperator={details.itineraries[0].segments[0].operating.carrierCode} People={FlightInfo.Adults}></FlightDetailsCard>

          })
         }
        </div>
    </div>
  );
};
// Duration,AvailableSeats,departureiata,arrivaliata,departureterminal,arrivalterminal,departuretime,arrivaltime,Price,AirlineOperator
export default FlightBooking;
