import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";

// ✅ ADD THIS LINE
import Test from "./Test";

// Flights
import Flights from "./pages/flights/Flights";
import FlightResults from "./pages/flights/FlightResults";
import FlightDetails from "./pages/flights/FlightDetails";

// Hotels
import Hotels from "./pages/hotels/Hotels";
import HotelResults from "./pages/hotels/HotelResults";
import HotelDetails from "./pages/hotels/HotelDetails";

// Bus
import Bus from "./pages/bus/Bus";
import BusResults from "./pages/bus/BusResults";

// Train
import Train from "./pages/train/Train";
import TrainResults from "./pages/train/TrainResults";

// Cabs
import Cabs from "./pages/cabs/Cabs";
import CabResults from "./pages/cabs/CabResults";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* ✅ ADD THIS ROUTE */}
        <Route path="/test" element={<Test />} />

        {/* Flights */}
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/results" element={<FlightResults />} />
        <Route path="/flights/details" element={<FlightDetails />} />

        {/* Hotels */}
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/results" element={<HotelResults />} />
<Route path="/hotels/details" element={<HotelDetails />} />

        {/* Bus */}
        <Route path="/bus" element={<Bus />} />
        <Route path="/bus/results" element={<BusResults />} />

        {/* Train */}
        <Route path="/train" element={<Train />} />
        <Route path="/train/results" element={<TrainResults />} />

        {/* Cabs */}
        <Route path="/cabs" element={<Cabs />} />
        <Route path="/cabs/results" element={<CabResults />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;