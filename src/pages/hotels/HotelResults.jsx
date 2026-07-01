import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Users, Wifi, AirVent, Utensils, Dumbbell, Waves, Search, Filter, SortAsc, ChevronRight, AlertCircle, TrendingDown, Heart } from "lucide-react";
import { motion } from "framer-motion";

const HotelResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [filterType, setFilterType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);

  const [defaultDates] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: tomorrow.toISOString().split('T')[0],
    };
  });

  const city = location.state?.city || "Delhi";
  const checkIn = location.state?.checkIn || defaultDates.checkIn;
  const checkOut = location.state?.checkOut || defaultDates.checkOut;
  const guests = location.state?.guests || "1 Guest";

  // Enhanced hotel data
  const hotels = [
    {
      id: 1,
      name: "Taj Hotel",
      city,
      price: 5000,
      rating: 4.5,
      reviews: 2340,
      type: "luxury",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      amenities: ["WiFi", "AC", "Restaurant", "Gym"],
      rooms: 8,
      discount: 10,
      description: "5-star luxury hotel with world-class amenities",
    },
    {
      id: 2,
      name: "Radisson Blu",
      city,
      price: 4200,
      rating: 4.2,
      reviews: 1890,
      type: "premium",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      amenities: ["WiFi", "AC", "Pool", "Spa"],
      rooms: 15,
      discount: 15,
      description: "Premium 4-star hotel with modern facilities",
    },
    {
      id: 3,
      name: "OYO Premium",
      city,
      price: 1800,
      rating: 3.8,
      reviews: 1560,
      type: "budget",
      image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=600&h=400&fit=crop",
      amenities: ["WiFi", "AC", "TV"],
      rooms: 25,
      discount: 20,
      description: "Budget-friendly hotel with comfortable rooms",
    },
    {
      id: 4,
      name: "The Oberoi",
      city,
      price: 6500,
      rating: 4.8,
      reviews: 3120,
      type: "luxury",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=400&fit=crop",
      amenities: ["WiFi", "AC", "Restaurant", "Gym", "Pool", "Spa"],
      rooms: 5,
      discount: 0,
      description: "Ultra-luxury hotel with premium services",
    },
    {
      id: 5,
      name: "Marriott Courtyard",
      city,
      price: 3500,
      rating: 4.3,
      reviews: 2100,
      type: "mid-range",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=600&h=400&fit=crop",
      amenities: ["WiFi", "AC", "Restaurant", "Gym"],
      rooms: 18,
      discount: 12,
      description: "Mid-range hotel with excellent service",
    },
  ];

  // Filter & Sort Logic
  let filteredHotels = hotels.filter(
    (hotel) =>
      hotel.price <= maxPrice &&
      (filterType === "all" || hotel.type === filterType)
  );

  if (sortBy === "price") {
    filteredHotels.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filteredHotels.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "discount") {
    filteredHotels.sort((a, b) => b.discount - a.discount);
  }

  const toggleWishlist = (hotelId) => {
    if (wishlist.includes(hotelId)) {
      setWishlist(wishlist.filter(id => id !== hotelId));
    } else {
      setWishlist([...wishlist, hotelId]);
    }
  };

  const getDiscountedPrice = (hotel) => hotel.price - Math.round((hotel.price * hotel.discount) / 100);

  const amenityIcon = (amenity) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi size={16} />;
      case "AC":
        return <AirVent size={16} />;
      case "Restaurant":
        return <Utensils size={16} />;
      case "Gym":
        return <Dumbbell size={16} />;
      case "Pool":
        return <Waves size={16} />;
      case "Spa":
        return <Utensils size={16} />;
      default:
        return <Star size={16} />;
    }
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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hotel Results</h1>
              <p className="text-gray-600 text-sm">{filteredHotels.length} hotels found</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/hotels")}
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
                <p className="text-xs text-gray-600">Location</p>
                <p className="font-bold text-gray-900">{city}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-600" size={22}>📅</div>
              <div>
                <p className="text-xs text-gray-600">Check-in</p>
                <p className="font-bold text-gray-900">{checkIn}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-purple-600" size={22}>📅</div>
              <div>
                <p className="text-xs text-gray-600">Check-out</p>
                <p className="font-bold text-gray-900">{checkOut}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-green-600" size={22} />
              <div>
                <p className="text-xs text-gray-600">Guests</p>
                <p className="font-bold text-gray-900">{guests}</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border-2 border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                >
                  <option value="price">💰 Price: Low to High</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="discount">🎉 Best Discount</option>
                </select>
              </div>

              {/* Hotel Type Filter */}
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Hotel Type</label>
                <div className="space-y-2">
                  {[
                    { label: "All Hotels", value: "all" },
                    { label: "Luxury", value: "luxury" },
                    { label: "Premium", value: "premium" },
                    { label: "Mid-Range", value: "mid-range" },
                    { label: "Budget", value: "budget" },
                  ].map((type) => (
                    <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="hotelType"
                        value={type.value}
                        checked={filterType === type.value}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 transition duration-300">{type.label}</span>
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
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹500</span>
                  <span>₹10000</span>
                </div>
              </div>

              {/* Reset Filters */}
              {(filterType !== "all" || maxPrice < 10000) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setFilterType("all");
                    setMaxPrice(10000);
                  }}
                  className="w-full mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition duration-300"
                >
                  Reset Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Hotels Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3 space-y-4"
          >
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel, idx) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedHotel(hotel.id)}
                  className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-2 overflow-hidden cursor-pointer group ${
                    selectedHotel === hotel.id ? "border-blue-600" : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0">

                    {/* Hotel Image */}
                    <div className="relative h-48 md:h-auto overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      {hotel.discount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                        >
                          {hotel.discount}% OFF
                        </motion.span>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(hotel.id);
                        }}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition duration-300"
                      >
                        <Heart
                          size={20}
                          className={wishlist.includes(hotel.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                        />
                      </motion.button>
                    </div>

                    {/* Hotel Info */}
                    <div className="md:col-span-2 p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h2>
                        <p className="text-gray-600 text-sm mb-3">{hotel.description}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(hotel.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-gray-900">{hotel.rating}</span>
                          <span className="text-xs text-gray-500">({hotel.reviews} reviews)</span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.map((amenity, i) => (
                            <div key={i} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                              {amenityIcon(amenity)}
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rooms Available */}
                      <p className="text-xs text-gray-500 mt-3">
                        <span className="font-bold text-green-600">{hotel.rooms}</span> rooms available
                      </p>
                    </div>

                    {/* Price & Booking */}
                    <div className="p-6 flex flex-col justify-between items-end text-right">
                      <div>
                        {hotel.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through mb-1">₹{hotel.price}</p>
                        )}
                        <p className="text-3xl font-bold text-blue-600 mb-3">₹{getDiscountedPrice(hotel)}</p>
                        <p className="text-xs text-gray-500 mb-6">per night</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          navigate("/hotels/details", {
                            state: { hotel },
                          })
                        }
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Hotels Found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setFilterType("all");
                    setMaxPrice(10000);
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}

            {/* Info Box */}
            {filteredHotels.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mt-8"
              >
                <div className="flex items-start gap-3">
                  <TrendingDown size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-blue-600 mb-1">💡 Smart Booking Tips</p>
                    <p className="text-gray-700 text-sm">
                      Prices shown are per night. Book early for better rates. Free cancellation available on most rooms. Add to wishlist to track price changes!
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

export default HotelResults;