import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FlightDetailsCard = ({
  Duration,
  AvailableSeats,
  departureiata,
  arrivaliata,
  departureterminal,
  arrivalterminal,
  departuretime,
  arrivaltime,
  Price,
  AirlineOperator,
  People,
  index
}: {
  Duration: string;
  AvailableSeats: string;
  departureiata: string;
  arrivaliata: string;
  departureterminal: string;
  arrivalterminal: string;
  departuretime: string;
  arrivaltime: string;
  Price: string;
  AirlineOperator: string;
  People: Number;
  index:Number
}) => {
  const [departingtime, setdeparttime] = useState("");
  const [arrivingtime, setarrivaltime] = useState("");
  const departuredetails = departuretime.split("T");
  const arrivaldetails = arrivaltime.split("T");
  const duration = Duration.split("T");
  const departtime = departuredetails[1].split(":");
  const arrivetime = departuredetails[1].split(":");

  useEffect(() => {
    if (Number(departtime[0][0]) >= 1 && Number(departtime[0]) > 11) {
      setdeparttime("pm");
    } else {
      setdeparttime("am");
    }
    if (Number(arrivaltime[0][0]) >= 1 && Number(arrivetime[0]) > 11) {
      setarrivaltime("pm");
    } else {
      setarrivaltime("am");
    }
  }, [departingtime, arrivingtime]);
  return (
    <div className="w-11/12  border border-gray-100 font-inter text-gray-100 rounded-xl p-8">
      <div className="text-red-500 text-sm font-normal">
        Only {AvailableSeats} seats are left
      </div>
      <div className="w-full flex items-center gap-8 ">
        <div>{AirlineOperator}</div>
        <div className="flex justify-around flex-grow items-center">
          <div className="flex flex-col items-center text-sm">
            <div>
              <b className="text-lg">{departuredetails[1]}</b> {departingtime}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div>{departureiata} ·</div>
              <div>{departuredetails[0]}</div>
            </div>
            <div className="text-xs text-gray-200 font-thin">
              Terminal {departureterminal}
            </div>
          </div>
          <div className="flex flex-col  items-center">
            <div>{duration[1]}</div>
            __________________________________
          </div>
          <div className="flex flex-col items-center gap-1 text-sm">
            <div>
              <b className="text-lg">{arrivaldetails[1]}</b> {arrivingtime}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div>{arrivaliata} ·</div>
              <div>{arrivaldetails[0]}</div>
            </div>
            <div className="text-xs text-gray-200 font-thin">
              Terminal {arrivalterminal}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 border-l border-gray-200 p-7">
          <b>€ {Price}</b>
          <div className="text-xs font-thin text-gray-200">
            Price for {People.toString()} people.
          </div>
          <button
          //@ts-ignore
           onClick={()=>document.getElementById(`modal${index}`)!.showModal()}
            className="px-5 border border-blue-400 text-xs rounded-md p-1"
          >
            View Details
          </button>
<dialog id={`modal${index}`} className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center">Book Flight Ticket</h3>
    <p className="py-4 text-xl font-semibold">Details of the flight</p>
    <div className="flex flex-col gap-1 items-center justify-center">
      from : {departureiata} 
     <div>
     to : {arrivaliata}
      </div> 
     <div>
     Duration : {duration[1]}
      </div> 
      <div>
     Number of Person travelling : {People.toString()}
      </div> 
     <div>
     Departure Date : {departuredetails[0]}
      </div> 
     <div>
     Arrival Date : {arrivaldetails[0]}
      </div> 
     <div className="text-lg text-red-200">
      More Information on (Baggages etc)
     </div>
    </div>
    <div className="w-full flex gap-2 justify-end mt-10">

          <b className="text-xl font-semibold ">Book & Pay </b> <Link to={"/checkout"} className="bg-transparent px-4 border border-cyan-200 rounded-lg p-1 hover:bg-black/80">€ {Price}</Link>
    </div>
  </div>
</dialog>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsCard;
