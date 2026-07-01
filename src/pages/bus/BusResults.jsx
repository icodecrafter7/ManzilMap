import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Star, Filter, SortAsc, TrendingDown, Zap, Shield, Wifi, Coffee, ChevronRight, Search, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const BusResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("price");
  const [filterType, setFilterType] = useState("all");
  const [selectedBus, setSelectedBus] = useState(null);

  const from = location.state?.from || "Delhi";
  const to = location.state?.to || "Lucknow";
  const travelDate = location.state?.date || new Date().toISOString().split('T')[0];

  const buses = [
    {
      id: 1,
      name: "Volvo AC Sleeper",
      from,
      to,
      time: "10:00 PM - 6:00 AM",
      price: 1200,
      duration: "8h",
      seats: 12,
      rating: 4.8,
      reviews: 2340,
      type: "sleeper",
      amenities: ["WiFi", "AC", "Blanket"],
      discount: 15,
    },
    {
      id: 2,
      name: "Deluxe Non-AC",
      from,
      to,
      time: "8:00 PM - 5:00 AM",
      price: 800,
      duration: "9h",
      seats: 25,
      rating: 4.2,
      reviews: 1240,
      type: "non-ac",
      amenities: ["Fan", "Charging"],
      discount: 0,
    },
    {
      id: 3,
      name: "AC Seater",
      from,
      to,
      time: "6:00 PM - 2:00 AM",
      price: 1000,
      duration: "8h 30m",
      seats: 18,
      rating: 4.6,
      reviews: 1890,
      type: "seater",
      amenities: ["WiFi", "AC", "Pillow", "Water"],
      discount: 10,
    },
    {
      id: 4,
      name: "Premium Sleeper",
      from,
      to,
      time: "11:30 PM - 7:30 AM",
      price: 1500,
      duration: "8h",
      seats: 8,
      rating: 4.9,
      reviews: 3120,
      type: "sleeper",
      amenities: ["WiFi", "AC", "Blanket", "Pillow", "USB Charging"],
      discount: 20,
    },
    {
      id: 5,
      name: "Economy AC",
      from,
      to,
      time: "7:00 PM - 3:00 AM",
      price: 900,
      duration: "8h 45m",
      seats: 30,
      rating: 4.3,
      reviews: 1560,
      type: "seater",
      amenities: ["AC", "Water"],
      discount: 5,
    },
  ];

  const getSortedBuses = () => {
    let sorted = [...buses];
    if (sortBy === "price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      sorted.sort((a, b) => b.discount - a.discount);
    }
    return sorted;
  };

  const getFilteredBuses = () => {
    let filtered = getSortedBuses();
    if (filterType !== "all") {
      filtered = filtered.filter((bus) => bus.type === filterType);
    }
    return filtered;
  };

  const filteredBuses = getFilteredBuses();
  const discountedPrice = (bus) => bus.price - Math.round((bus.price * bus.discount) / 100);

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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Bus Results</h1>
              <p className="text-gray-600 text-sm">{filteredBuses.length} buses found</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/bus")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <Search size={18} />
            <span className="hidden md:inline">New Search</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Route & Date Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">From</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{from}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-gray-300"></div>
                <MapPin className="text-blue-600" size={24} />
                <div className="h-1 w-8 bg-gray-300"></div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">To</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{to}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50">
              <Calendar size={18} className="text-blue-600" />
              <span className="font-semibold text-gray-900">{travelDate}</span>
            </div>
          </div>
        </motion.div>

        {/* Filters & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Filter by Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/50"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Filter size={18} />
              Bus Type
            </h3>
            <div className="space-y-3">
              {[
                { label: "All Types", value: "all" },
                { label: "Sleeper", value: "sleeper" },
                { label: "Seater", value: "seater" },
                { label: "Non-AC", value: "non-ac" },
              ].map((type) => (
                <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="busType"
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
              <SortAsc size={18} />
              Sort By
            </h3>
            <div className="space-y-3">
              {[
                { label: "💰 Price: Low to High", value: "price" },
                { label: "⭐ Highest Rated", value: "rating" },
                { label: "🎉 Best Discount", value: "discount" },
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

          {/* Popular Routes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl shadow-md border-2 border-green-200"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown size={18} className="text-green-600" />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span> Book 30 days in advance for best prices
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span> Sleeper buses recommended for long journeys
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span> Compare amenities before booking
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bus Results */}
        <div className="space-y-4">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus, idx) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedBus(bus.id)}
                className={`bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-2 cursor-pointer ${
                  selectedBus === bus.id ? "border-blue-600" : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

                  {/* Bus Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-lg">
                        <Zap size={24} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-900 mb-1">{bus.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">{bus.from} → {bus.to}</p>
                        
                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {bus.amenities.slice(0, 3).map((amenity, i) => (
                            <span key={i} className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time & Duration */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Departure</p>
                    <p className="font-bold text-gray-900 text-lg">{bus.time.split(" - ")[0]}</p>
                    <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                      <Clock size={14} />
                      {bus.duration}
                    </p>
                  </div>

                  {/* Availability */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Seats</p>
                    <p className="font-bold text-green-600 text-lg">{bus.seats}</p>
                    <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                      <Users size={14} />
                      Available
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star size={18} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">{bus.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{bus.reviews} reviews</p>
                  </div>

                </div>

                {/* Price & Booking - Mobile View */}
                <div className="md:hidden mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    {bus.discount > 0 && (
                      <p className="text-sm text-red-600 font-bold mb-1">{bus.discount}% OFF</p>
                    )}
                    <p className="text-2xl font-bold text-blue-600">₹{discountedPrice(bus)}</p>
                    {bus.discount > 0 && (
                      <p className="text-xs text-gray-500 line-through">₹{bus.price}</p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      navigate("/bus/details", {
                        state: { bus },
                      })
                    }
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2"
                  >
                    Book Now
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Price & Booking - Desktop View */}
                <div className="hidden md:flex md:absolute md:right-6 md:top-6 md:flex-col md:items-end md:gap-2">
                  {bus.discount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full"
                    >
                      {bus.discount}% OFF 🎉
                    </motion.span>
                  )}
                  <div className="text-right">
                    {bus.discount > 0 && (
                      <p className="text-sm text-gray-500 line-through">₹{bus.price}</p>
                    )}
                    <p className="text-3xl font-bold text-blue-600">₹{discountedPrice(bus)}</p>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/bus/details", {
                        state: { bus },
                      })
                    }
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2 mt-2"
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
              <Zap size={64} className="text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No buses found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your search filters</p>
              <button
                onClick={() => navigate("/bus")}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300"
              >
                Search Again
              </button>
            </motion.div>
          )}
        </div>

        {/* Info Box */}
        {filteredBuses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg"
          >
            <p className="text-gray-700">
              <span className="font-bold text-blue-600">💡 Pro Tip:</span> Prices may vary based on availability. Book early to get the best deals. All prices include GST.
            </p>
          </motion.div>
        )}

      </div>

    </div>
  );
};

export default BusResults;