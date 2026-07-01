import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Building2, ArrowRight, Zap, Shield, Star, TrendingUp, Search, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Hotels = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  const [formData, setFormData] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if (!formData.city || !formData.checkIn || !formData.checkOut) {
      alert("Please fill all required fields");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate("/hotels/results", {
        state: formData,
      });
    }, 800);
  };

  // Popular cities for quick booking
  const popularCities = [
    { name: "Delhi", price: "₹2,999", rating: "4.5/5" },
    { name: "Mumbai", price: "₹3,499", rating: "4.6/5" },
    { name: "Bangalore", price: "₹2,599", rating: "4.4/5" },
    { name: "Goa", price: "₹3,199", rating: "4.7/5" },
  ];

  // Features
  const features = [
    { icon: "🏨", title: "50K+ Hotels", desc: "Across India & worldwide" },
    { icon: "💰", title: "Best Prices", desc: "Price match guarantee" },
    { icon: "⭐", title: "Verified Reviews", desc: "Real guest feedback" },
    { icon: "🔒", title: "Secure Payment", desc: "100% safe booking" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-blue-600" size={28} />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Manzilmap</h1>
          </div>
          <button onClick={() => navigate("/")} className="text-gray-700 hover:text-blue-600 font-medium transition">
            Home
          </button>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <div 
        className="relative h-80 md:h-96 bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(37, 99, 235, 0.7) 0%, rgba(139, 92, 246, 0.7) 100%), url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&h=600&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            Search Hotels 🏨
          </h2>
          <p className="text-white text-lg drop-shadow-md">Find your perfect stay at the best prices</p>
        </motion.div>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 md:px-6 -mt-16 relative z-20 mb-16"
      >
        <div className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50">

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Book Your Stay</h3>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">

            {/* City */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city name"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Check-in Date */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Guests & Rooms</label>
              <div className="relative">
                <Users className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="guests"
                  placeholder="e.g., 2 Adults, 1 Room"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

          </div>

          {/* Search Button */}
          <motion.button
            onClick={handleSearch}
            disabled={isSearching}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 text-lg"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Searching Hotels...
              </>
            ) : (
              <>
                <Search size={22} />
                Search Hotels
              </>
            )}
          </motion.button>

        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Manzilmap Hotels?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ translateY: -10 }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-white/50 group"
            >
              <p className="text-5xl mb-4 group-hover:scale-110 transition duration-300">{feature.icon}</p>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Cities Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Popular Cities</h2>
        <p className="text-gray-600 mb-8">Click to instantly fill your search</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCities.map((city, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setFormData({ ...formData, city: city.name });
                window.scrollTo({ top: 200, behavior: "smooth" });
              }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-xl transition duration-300 text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900 text-lg">{city.name}</p>
                </div>
                <Building2 className="text-blue-600 group-hover:scale-110 transition duration-300" size={24} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-blue-600">{city.price}/night</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  ⭐ {city.rating}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: "1", title: "Search", desc: "Enter city, dates & guests" },
            { num: "2", title: "Compare", desc: "View all available hotels" },
            { num: "3", title: "Select", desc: "Choose your preferred hotel" },
            { num: "4", title: "Book", desc: "Confirm your reservation" },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/50 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ChevronRight className="text-blue-400" size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hotel Categories Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Browse by Hotel Type</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "👑", name: "Luxury Hotels", count: "5K+" },
            { icon: "⭐", name: "Premium Hotels", count: "12K+" },
            { icon: "🏢", name: "Mid-Range Hotels", count: "18K+" },
            { icon: "💰", name: "Budget Hotels", count: "15K+" },
          ].map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-400 shadow-md hover:shadow-xl transition duration-300 text-center cursor-pointer group"
            >
              <p className="text-5xl mb-3 group-hover:scale-110 transition duration-300">{type.icon}</p>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{type.name}</h3>
              <p className="text-sm text-gray-600">{type.count} hotels</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Offer!</h2>
            <p className="text-white/90 mb-8 text-lg">Get 25% off on all hotel bookings with code STAYCATION25</p>

            <motion.button
              onClick={() => window.scrollTo({ top: 200, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-600 font-bold px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2 mx-auto text-lg"
            >
              Find Hotels
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-700">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Building2 size={24} />
                Manzilmap
              </h3>
              <p className="text-gray-400 text-sm">Your trusted hotel booking platform for best deals & convenience</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📞 +91 1234-567-890</li>
                <li>✉️ support@manzilmap.com</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>© 2026 Manzilmap. All rights reserved. 🌍</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Hotels;