import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Star, Car, Zap, Navigation, Search, TrendingDown, Shield, ChevronRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const CabResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCab, setSelectedCab] = useState(null);
  const [sortBy, setSortBy] = useState("price");
  const [filterType, setFilterType] = useState("all");

  const pickup = location.state?.pickup || "Delhi";
  const drop = location.state?.drop || "Noida";
  const distance = 15; // dummy km

  const cabs = [
    {
      id: 1,
      type: "Mini",
      car: "WagonR / Alto",
      pricePerKm: 10,
      eta: "5 mins",
      rating: 4.7,
      reviews: 2840,
      seats: 4,
      features: ["AC", "Music System"],
      discount: 10,
      available: 8,
      category: "budget",
    },
    {
      id: 2,
      type: "Sedan",
      car: "Dzire / Etios",
      pricePerKm: 14,
      eta: "7 mins",
      rating: 4.8,
      reviews: 3120,
      seats: 4,
      features: ["AC", "WiFi", "Phone Charger"],
      discount: 15,
      available: 5,
      category: "comfort",
    },
    {
      id: 3,
      type: "SUV",
      car: "Ertiga / Innova",
      pricePerKm: 18,
      eta: "10 mins",
      rating: 4.9,
      reviews: 2640,
      seats: 6,
      features: ["AC", "WiFi", "Phone Charger", "Premium Interior"],
      discount: 20,
      available: 3,
      category: "premium",
    },
    {
      id: 4,
      type: "XL (7-Seater)",
      car: "Innova / Fortuner",
      pricePerKm: 22,
      eta: "12 mins",
      rating: 4.6,
      reviews: 1890,
      seats: 7,
      features: ["AC", "WiFi", "Charger", "Spacious"],
      discount: 0,
      available: 2,
      category: "xl",
    },
  ];

  const getSortedCabs = () => {
    let sorted = [...cabs];
    if (sortBy === "price") {
      sorted.sort((a, b) => a.pricePerKm - b.pricePerKm);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "eta") {
      sorted.sort((a, b) => parseInt(a.eta) - parseInt(b.eta));
    }
    return sorted;
  };

  const getFilteredCabs = () => {
    let filtered = getSortedCabs();
    if (filterType !== "all") {
      filtered = filtered.filter((cab) => cab.category === filterType);
    }
    return filtered;
  };

  const filteredCabs = getFilteredCabs();
  const calculateTotal = (cab) => cab.pricePerKm * distance;
  const getDiscountedPrice = (cab) => {
    const total = calculateTotal(cab);
    return total - Math.round((total * cab.discount) / 100);
  };

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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Available Cabs</h1>
              <p className="text-gray-600 text-sm">{filteredCabs.length} cabs found</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/cabs")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <Search size={18} />
            <span className="hidden md:inline">New Search</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Route & Distance Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none">
                <p className="text-xs text-gray-600 mb-1">FROM</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{pickup}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="h-1 w-6 md:w-8 bg-gray-300"></div>
                <Navigation className="text-blue-600 flex-shrink-0" size={24} />
                <div className="h-1 w-6 md:w-8 bg-gray-300"></div>
              </div>
              <div className="flex-1 md:flex-none">
                <p className="text-xs text-gray-600 mb-1">TO</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{drop}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50">
                <p className="text-xs text-gray-600 mb-1">Distance</p>
                <p className="text-xl font-bold text-blue-600">{distance} km</p>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50">
                <p className="text-xs text-gray-600 mb-1">Est. Time</p>
                <p className="text-xl font-bold text-purple-600">18 min</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Filter by Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/50"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Car size={18} />
              Cab Type
            </h3>
            <div className="space-y-3">
              {[
                { label: "All Types", value: "all" },
                { label: "Budget", value: "budget" },
                { label: "Comfort", value: "comfort" },
                { label: "Premium", value: "premium" },
                { label: "XL (7-Seater)", value: "xl" },
              ].map((type) => (
                <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="cabType"
                    value={type.value}
                    checked={filterType === type.value}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 transition duration-300">{type.label}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Sort Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/50"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap size={18} />
              Sort By
            </h3>
            <div className="space-y-3">
              {[
                { label: "💰 Price: Low to High", value: "price" },
                { label: "⭐ Highest Rated", value: "rating" },
                { label: "⏱️ Fastest Arrival", value: "eta" },
              ].map((sort) => (
                <label key={sort.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="sort"
                    value={sort.value}
                    checked={sortBy === sort.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 transition duration-300">{sort.label}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-2xl shadow-md border-2 border-yellow-200"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown size={18} className="text-orange-600" />
              Money Savers
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold flex-shrink-0">✓</span> Share rides and save 40%
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold flex-shrink-0">✓</span> Sedan offers best value
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold flex-shrink-0">✓</span> Early morning = lower fares
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Cab Results */}
        <div className="space-y-4 mb-12">
          {filteredCabs.length > 0 ? (
            filteredCabs.map((cab, idx) => (
              <motion.div
                key={cab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCab(cab.id)}
                className={`bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-2 cursor-pointer relative overflow-hidden group ${
                  selectedCab === cab.id ? "border-blue-600" : "border-gray-200 hover:border-blue-400"
                }`}
              >
                {/* Discount Badge */}
                {cab.discount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                  >
                    {cab.discount}% OFF 🎉
                  </motion.span>
                )}

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

                  {/* Cab Type & Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-4 rounded-lg group-hover:scale-110 transition duration-300">
                        <Car size={28} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{cab.type}</h2>
                        <p className="text-sm text-gray-600 mb-2">{cab.car}</p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {cab.features.slice(0, 2).map((feature, i) => (
                            <span key={i} className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ETA */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Arrival</p>
                    <p className="font-bold text-gray-900 text-lg flex items-center justify-center gap-1">
                      <Clock size={18} className="text-blue-600" />
                      {cab.eta}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{cab.available} cars nearby</p>
                  </div>

                  {/* Rating */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star size={18} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">{cab.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{cab.reviews} reviews</p>
                  </div>

                  {/* Seats */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Seats</p>
                    <p className="font-bold text-gray-900 text-lg flex items-center justify-center gap-1">
                      <Users size={18} className="text-green-600" />
                      {cab.seats}
                    </p>
                  </div>

                </div>

                {/* Price & Booking - Mobile */}
                <div className="md:hidden mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">₹{getDiscountedPrice(cab)}</p>
                    {cab.discount > 0 && (
                      <p className="text-xs text-gray-500 line-through">₹{calculateTotal(cab)}</p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      navigate("/cabs/details", {
                        state: { cab, pickup, drop },
                      })
                    }
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2"
                  >
                    Book
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Price & Booking - Desktop */}
                <div className="hidden md:flex md:absolute md:right-6 md:top-6 md:flex-col md:items-end md:gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Fare (est.)</p>
                    {cab.discount > 0 && (
                      <p className="text-sm text-gray-500 line-through">₹{calculateTotal(cab)}</p>
                    )}
                    <p className="text-3xl font-bold text-blue-600">₹{getDiscountedPrice(cab)}</p>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/cabs/details", {
                        state: { cab, pickup, drop },
                      })
                    }
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2"
                  >
                    Book Now
                    <ChevronRight size={20} />
                  </button>
                </div>

              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <AlertCircle size={64} className="text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No cabs found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search again</p>
              <button
                onClick={() => navigate("/cabs")}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300"
              >
                New Search
              </button>
            </motion.div>
          )}
        </div>

        {/* Info Section */}
        {filteredCabs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6"
          >
            <div className="flex items-start gap-3">
              <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-blue-600 mb-1">Why book with us?</p>
                <p className="text-gray-700 text-sm">
                  All drivers are verified & insured. You're protected with our Ride Safety Guarantee. Real-time GPS tracking and 24/7 customer support.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
};

export default CabResults;