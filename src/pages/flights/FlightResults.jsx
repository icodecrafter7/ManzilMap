import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plane, MapPin, Calendar, Users, Filter, SortAsc, Star, Clock, DollarSign, TrendingDown, Search, ChevronRight, AlertCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState(null);

  // ✅ Handle both Home & Flights page data
  const from = location.state?.from || "Delhi";
  const to = location.state?.to || location.state?.place || "Mumbai";
  const departureDate = location.state?.departureDate || location.state?.date || new Date().toISOString().split('T')[0];
  const travellers = location.state?.travellers || "1 Traveller";

  // ✅ Dummy Flight Data with Enhanced Properties
  const flightsData = [
    {
      id: 1,
      airline: "IndiGo",
      from,
      to,
      time: "10:00 AM - 12:00 PM",
      duration: "2h",
      price: 4999,
      rating: 4.7,
      reviews: 2340,
      stops: 0,
      class: "Economy",
      seats: 15,
      discount: 10,
    },
    {
      id: 2,
      airline: "Air India",
      from,
      to,
      time: "2:00 PM - 4:30 PM",
      duration: "2h 30m",
      price: 5499,
      rating: 4.6,
      reviews: 1890,
      stops: 1,
      class: "Economy",
      seats: 8,
      discount: 0,
    },
    {
      id: 3,
      airline: "Vistara",
      from,
      to,
      time: "6:00 PM - 8:00 PM",
      duration: "2h",
      price: 6200,
      rating: 4.9,
      reviews: 3120,
      stops: 0,
      class: "Premium Economy",
      seats: 12,
      discount: 15,
    },
    {
      id: 4,
      airline: "SpiceJet",
      from,
      to,
      time: "7:30 AM - 9:30 AM",
      duration: "2h",
      price: 3999,
      rating: 4.3,
      reviews: 1560,
      stops: 0,
      class: "Economy",
      seats: 20,
      discount: 20,
    },
  ];

  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [sortOption, setSortOption] = useState("price");
  const [stops, setStops] = useState("all");

  // ✅ Airline Filter
  const handleAirlineChange = (airline) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  // ✅ Filter + Sort Logic
  let filteredFlights = flightsData.filter(
    (flight) =>
      flight.price <= maxPrice &&
      (selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline)) &&
      (stops === "all" || (stops === "direct" && flight.stops === 0) || (stops === "onestop" && flight.stops === 1))
  );

  if (sortOption === "price") {
    filteredFlights.sort((a, b) => a.price - b.price);
  } else if (sortOption === "duration") {
    filteredFlights.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
  } else if (sortOption === "rating") {
    filteredFlights.sort((a, b) => b.rating - a.rating);
  }

  const airlines = ["IndiGo", "Air India", "Vistara", "SpiceJet"];
  const getDiscountedPrice = (flight) => flight.price - Math.round((flight.price * flight.discount) / 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-gray-100 p-2 rounded-lg transition duration-300"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Flight Results</h1>
              <p className="text-gray-600 text-sm">{filteredFlights.length} flights found</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/flights")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <Search size={18} />
            <span className="hidden md:inline">New Search</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Search Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Route</p>
                <p className="font-bold text-gray-900">{from} → {to}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-purple-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Date</p>
                <p className="font-bold text-gray-900">{departureDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-green-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Travellers</p>
                <p className="font-bold text-gray-900">{travellers}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Plane className="text-orange-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Flights</p>
                <p className="font-bold text-gray-900">{filteredFlights.length} available</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* 🟣 Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 sticky top-24">
              <h2 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                <Filter size={20} className="text-blue-600" />
                Filters
              </h2>

              {/* Sort Option */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full border-2 border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                >
                  <option value="price">💰 Price: Low to High</option>
                  <option value="duration">⏱️ Duration</option>
                  <option value="rating">⭐ Highest Rated</option>
                </select>
              </div>

              {/* Stops Filter */}
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Stops</label>
                <div className="space-y-2">
                  {[
                    { label: "All Flights", value: "all" },
                    { label: "Direct Flights", value: "direct" },
                    { label: "One Stop", value: "onestop" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="stops"
                        value={option.value}
                        checked={stops === option.value}
                        onChange={(e) => setStops(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 transition duration-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Max Price: <span className="text-blue-600">₹{maxPrice}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹1000</span>
                  <span>₹10000</span>
                </div>
              </div>

              {/* Airlines */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Airlines</h3>
                <div className="space-y-2">
                  {airlines.map((airline) => (
                    <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => handleAirlineChange(airline)}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 transition duration-300">{airline}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {(selectedAirlines.length > 0 || maxPrice < 10000 || stops !== "all") && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedAirlines([]);
                    setMaxPrice(10000);
                    setStops("all");
                  }}
                  className="w-full mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition duration-300"
                >
                  Reset Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* 🟢 Flight List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3 space-y-4"
          >
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight, idx) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedFlight(flight.id)}
                  className={`bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-2 cursor-pointer relative overflow-hidden group ${
                    selectedFlight === flight.id ? "border-blue-600" : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {/* Discount Badge */}
                  {flight.discount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                    >
                      {flight.discount}% OFF 🎉
                    </motion.span>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">

                    {/* Airline Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-lg group-hover:scale-110 transition duration-300">
                          <Plane size={24} />
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{flight.airline}</h2>
                          <p className="text-sm text-gray-600 mb-2">{flight.from} → {flight.to}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">{flight.class}</span>
                            {flight.stops === 0 ? (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">Direct</span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">{flight.stops} Stop</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time & Duration */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Departure & Arrival</p>
                      <p className="font-bold text-gray-900">{flight.time}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                        <Clock size={14} />
                        {flight.duration}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star size={18} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-gray-900">{flight.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{flight.reviews} reviews</p>
                    </div>

                    {/* Price & Booking */}
                    <div className="text-center md:text-right">
                      {flight.discount > 0 && (
                        <p className="text-sm text-gray-500 line-through mb-1">₹{flight.price}</p>
                      )}
                      <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">₹{getDiscountedPrice(flight)}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          navigate("/flights/details", {
                            state: { flight },
                          })
                        }
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2"
                      >
                        Book Now
                        <ChevronRight size={18} />
                      </motion.button>
                    </div>

                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/80 backdrop-blur-md p-8 rounded-2xl border-2 border-gray-200"
              >
                <AlertCircle size={64} className="text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Flights Found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedAirlines([]);
                    setMaxPrice(10000);
                    setStops("all");
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}

            {/* Info Box */}
            {filteredFlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mt-8"
              >
                <div className="flex items-start gap-3">
                  <Zap size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-blue-600 mb-1">💡 Booking Tips</p>
                    <p className="text-gray-700 text-sm">
                      Prices shown are per person. Taxes included. Book early for better prices! Book now to confirm your seat before they run out.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default FlightResults;