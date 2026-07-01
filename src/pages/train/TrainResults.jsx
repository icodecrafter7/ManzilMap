import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Train as TrainIcon,
  Star,
  Filter,
  SortAsc,
  TrendingDown,
  Search,
  ChevronRight,
  AlertCircle,
  Zap,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const TrainResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [sortBy, setSortBy] = useState("price");
  const [filterType, setFilterType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(3000);

  const from = location.state?.from || "Delhi";
  const to = location.state?.to || "Lucknow";
  const classType = location.state?.classType || "Sleeper";
  const travelDate =
    location.state?.date || new Date().toISOString().split("T")[0];

  // Enhanced train data
  const trains = [
    {
      id: 1,
      name: "Rajdhani Express",
      from,
      to,
      time: "06:00 PM - 06:00 AM",
      duration: "12h",
      price: 1500,
      seats: "Available",
      rating: 4.8,
      reviews: 2340,
      type: "premium",
      stops: 0,
      amenities: ["AC", "WiFi", "Meals"],
      discount: 10,
    },
    {
      id: 2,
      name: "Shatabdi Express",
      from,
      to,
      time: "07:00 AM - 01:00 PM",
      duration: "6h",
      price: 1200,
      seats: "Few Left",
      rating: 4.6,
      reviews: 1890,
      type: "express",
      stops: 2,
      amenities: ["AC", "Meals"],
      discount: 15,
    },
    {
      id: 3,
      name: "Intercity Express",
      from,
      to,
      time: "03:00 PM - 10:00 PM",
      duration: "7h",
      price: 900,
      seats: "Waitlist",
      rating: 4.2,
      reviews: 1560,
      type: "local",
      stops: 5,
      amenities: ["AC", "Water"],
      discount: 20,
    },
    {
      id: 4,
      name: "AC Express",
      from,
      to,
      time: "11:30 PM - 11:30 AM",
      duration: "12h",
      price: 1100,
      seats: "Available",
      rating: 4.4,
      reviews: 2100,
      type: "express",
      stops: 3,
      amenities: ["AC", "WiFi", "Charging"],
      discount: 5,
    },
    {
      id: 5,
      name: "Superfast Express",
      from,
      to,
      time: "08:00 PM - 07:00 AM",
      duration: "11h",
      price: 1050,
      seats: "Available",
      rating: 4.5,
      reviews: 1720,
      type: "local",
      stops: 4,
      amenities: ["AC", "Meals"],
      discount: 0,
    },
  ];

  // Filter & Sort Logic
  let filteredTrains = trains.filter(
    (train) =>
      train.price <= maxPrice &&
      (filterType === "all" || train.type === filterType),
  );

  if (sortBy === "price") {
    filteredTrains.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filteredTrains.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "duration") {
    filteredTrains.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
  }

  const getSeatStatus = (seats) => {
    if (seats === "Available")
      return { color: "bg-green-100 text-green-700", icon: "✓" };
    if (seats === "Few Left")
      return { color: "bg-yellow-100 text-yellow-700", icon: "⚠️" };
    return { color: "bg-red-100 text-red-700", icon: "✗" };
  };

  const getDiscountedPrice = (train) =>
    train.price - Math.round((train.price * train.discount) / 100);

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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Train Results
              </h1>
              <p className="text-gray-600 text-sm">
                {filteredTrains.length} trains found
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/train")}
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
                <p className="font-bold text-gray-900">
                  {from} → {to}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-purple-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Date</p>
                <p className="font-bold text-gray-900">{travelDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrainIcon className="text-green-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Class</p>
                <p className="font-bold text-gray-900">{classType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-orange-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Trains</p>
                <p className="font-bold text-gray-900">
                  {filteredTrains.length} available
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border-2 border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                >
                  <option value="price">💰 Price: Low to High</option>
                  <option value="duration">⏱️ Shortest Duration</option>
                  <option value="rating">⭐ Highest Rated</option>
                </select>
              </div>

              {/* Train Type Filter */}
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Train Type
                </label>
                <div className="space-y-2">
                  {[
                    { label: "All Trains", value: "all" },
                    { label: "Premium", value: "premium" },
                    { label: "Express", value: "express" },
                    { label: "Local", value: "local" },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="trainType"
                        value={type.value}
                        checked={filterType === type.value}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 transition duration-300">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Max Price: <span className="text-blue-600">₹{maxPrice}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹500</span>
                  <span>₹3000</span>
                </div>
              </div>

              {/* Reset Filters */}
              {(filterType !== "all" || maxPrice < 3000) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setFilterType("all");
                    setMaxPrice(3000);
                  }}
                  className="w-full mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition duration-300"
                >
                  Reset Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Trains List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3 space-y-4"
          >
            {filteredTrains.length > 0 ? (
              filteredTrains.map((train, idx) => {
                const seatStatus = getSeatStatus(train.seats);
                return (
                  <motion.div
                    key={train.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedTrain(train.id)}
                    className={`bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-2 overflow-hidden cursor-pointer group relative ${
                      selectedTrain === train.id
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    {/* Discount Badge */}
                    {train.discount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                      >
                        {train.discount}% OFF 🎉
                      </motion.span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      {/* Train Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-lg group-hover:scale-110 transition duration-300">
                            <TrainIcon size={24} />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                              {train.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                              {train.from} → {train.to}
                            </p>

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2">
                              {train.amenities.map((amenity, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Time & Duration */}
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">
                          Departure & Arrival
                        </p>
                        <p className="font-bold text-gray-900">{train.time}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                          <Clock size={14} />
                          {train.duration}
                        </p>
                      </div>

                      {/* Rating & Seats */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star
                            size={18}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="font-bold text-gray-900">
                            {train.rating}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {train.reviews} reviews
                        </p>
                        <motion.span
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${seatStatus.color}`}
                        >
                          {seatStatus.icon} {train.seats}
                        </motion.span>
                      </div>

                      {/* Price & Booking */}
                      <div className="text-center md:text-right">
                        {train.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through mb-1">
                            ₹{train.price}
                          </p>
                        )}
                        <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">
                          ₹{getDiscountedPrice(train)}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            navigate("/train/details", {
                              state: { train, classType },
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
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/80 backdrop-blur-md p-8 rounded-2xl border-2 border-gray-200"
              >
                <AlertCircle size={64} className="text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No Trains Found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setFilterType("all");
                    setMaxPrice(3000);
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}

            {/* Info Box */}
            {filteredTrains.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mt-8"
              >
                <div className="flex items-start gap-3">
                  <Zap
                    size={20}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-bold text-blue-600 mb-1">
                      💡 Booking Tips
                    </p>
                    <p className="text-gray-700 text-sm">
                      Prices shown are per ticket. Book early for better seats.
                      Check seat availability before confirming. Cancel up to 24
                      hours before departure for full refund.
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

export default TrainResults;
