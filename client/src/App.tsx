import "./App.css";
import { Route, Routes } from "react-router-dom";
import FlightBooking from "./components/FlightBooking";
import Checkout from "./components/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/checkout" element={<Checkout></Checkout>}/>
      <Route path="/" element={<FlightBooking></FlightBooking>}></Route>
    </Routes>
  );
}
