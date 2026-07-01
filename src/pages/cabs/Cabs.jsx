import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Calendar, Car, ArrowRight, Zap, Shield, Star, Users, TrendingUp, Search } from "lucide-react";
import { motion } from "framer-motion";

const Cabs = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if (!formData.pickup || !formData.drop || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate("/cabs/results", {
        state: formData,
      });
    }, 800);
  };

  // Popular routes for quick booking
  const popularRoutes = [
    { from: "Delhi", to: "Airport", time: "30 min" },
    { from: "Mumbai", to: "Airport", time: "45 min" },
    { from: "Bangalore", to: "IT Park", time: "25 min" },
    { from: "Pune", to: "Station", time: "20 min" },
  ];

  // Features
  const features = [
    { icon: "🚕", title: "Multiple Cab Types", desc: "Mini, Sedan, SUV & more" },
    { icon: "💰", title: "Best Prices", desc: "Transparent fare estimates" },
    { icon: "⚡", title: "Quick Booking", desc: "Book in just 30 seconds" },
    { icon: "🛡️", title: "Safe & Secure", desc: "Verified drivers & GPS tracking" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="text-blue-600" size={28} />
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
          backgroundImage: "linear-gradient(135deg, rgba(37, 99, 235, 0.7) 0%, rgba(139, 92, 246, 0.7) 100%), url('https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1920&h=600&fit=crop')",
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
            Book a Cab 🚕
          </h2>
          <p className="text-white text-lg drop-shadow-md">Fast, reliable & affordable cab services</p>
        </motion.div>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 md:px-6 -mt-16 relative z-20 mb-16"
      >
        <div className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50">

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Find Your Ride</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            {/* Pickup Location */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="pickup"
                  placeholder="Enter pickup location"
                  value={formData.pickup}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Drop Location */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Drop Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="drop"
                  placeholder="Enter drop location"
                  value={formData.drop}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Time */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Time</label>
              <div className="relative">
                <Clock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
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
                Searching Cabs...
              </>
            ) : (
              <>
                <Search size={22} />
                Search Cabs
              </>
            )}
          </motion.button>

          {/* Info Text */}
          <p className="text-center text-gray-600 text-sm mt-4">
            ✓ Enter at least pickup, drop location & date to search
          </p>

        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Manzilmap Cabs?</h2>
        
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

      {/* Popular Routes Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Popular Routes</h2>
        <p className="text-gray-600 mb-8">Click to quickly fill in your journey</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularRoutes.map((route, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setFormData({ ...formData, pickup: route.from, drop: route.to });
                window.scrollTo({ top: 200, behavior: "smooth" });
              }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-xl transition duration-300 text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">From</p>
                  <p className="font-bold text-gray-900">{route.from}</p>
                </div>
                <ArrowRight className="text-blue-600 group-hover:translate-x-2 transition duration-300" size={20} />
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">To</p>
                <p className="font-bold text-gray-900">{route.to}</p>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} />
                {route.time}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: "1", title: "Enter Details", desc: "Fill in pickup & drop location" },
            { num: "2", title: "View Options", desc: "See available cabs & prices" },
            { num: "3", title: "Choose Cab", desc: "Pick your preferred cab type" },
            { num: "4", title: "Enjoy Ride", desc: "Relax & reach your destination" },
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
                  <ArrowRight className="text-blue-400" size={24} />
                </div>
              )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Special Discounts!</h2>
            <p className="text-white/90 mb-8 text-lg">Use code WELCOME15 for 15% off on your first ride</p>

            <motion.button
              onClick={() => window.scrollTo({ top: 200, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-600 font-bold px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2 mx-auto text-lg"
            >
              Book Now
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
                <Car size={24} />
                Manzilmap
              </h3>
              <p className="text-gray-400 text-sm">Your trusted cab booking platform for safe & comfortable rides</p>
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

export default Cabs;