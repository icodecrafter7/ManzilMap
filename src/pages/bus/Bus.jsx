import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Bus, ArrowRight, Star, Users, Clock, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const BusPage = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.date) {
      alert("Please fill all fields");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate("/bus/results", {
        state: formData,
      });
    }, 800);
  };

  // Popular routes
  const popularRoutes = [
    { from: "Mumbai", to: "Bangalore", price: "₹800", duration: "18h", rating: 4.5 },
    { from: "Delhi", to: "Agra", price: "₹400", duration: "4h", rating: 4.7 },
    { from: "Bangalore", to: "Hyderabad", price: "₹600", duration: "8h", rating: 4.6 },
    { from: "Pune", to: "Goa", price: "₹500", duration: "12h", rating: 4.8 },
    { from: "Chennai", to: "Bangalore", price: "₹700", duration: "6h", rating: 4.4 },
    { from: "Jaipur", to: "Delhi", price: "₹350", duration: "5h", rating: 4.9 },
  ];

  // Bus operators
  const busOperators = [
    { name: "RedBus Premier", rating: 4.8, trips: "2.5M+", badge: "Trusted" },
    { name: "GoIbibo Express", rating: 4.6, trips: "1.8M+", badge: "Popular" },
    { name: "Shrinath Travels", rating: 4.7, trips: "1.2M+", badge: "Premium" },
    { name: "VRL Logistics", rating: 4.5, trips: "980K+", badge: "Reliable" },
  ];

  // Features
  const features = [
    { icon: "🔒", title: "Secure Booking", desc: "Safe & secure payment gateway" },
    { icon: "📱", title: "Real-time Updates", desc: "Live tracking & notifications" },
    { icon: "💰", title: "Best Prices", desc: "Compare & save money" },
    { icon: "✈️", title: "Easy Cancellation", desc: "Flexible cancellation policy" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="text-blue-600" size={28} />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Manzilmap</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => navigate("/")} className="text-gray-700 hover:text-blue-600 font-medium transition">Home</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Book Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <div 
        className="relative h-80 md:h-96 bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(37, 99, 235, 0.7) 0%, rgba(139, 92, 246, 0.7) 100%), url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&h=600&fit=crop')",
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
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            Search Buses 🚌
          </h1>
          <p className="text-white text-lg drop-shadow-md">Find the best bus routes at unbeatable prices</p>
        </motion.div>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 md:px-6 -mt-16 relative z-20 mb-12"
      >
        <div className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50">

          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Route</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {/* From Input */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="from"
                  placeholder="Mumbai"
                  value={formData.from}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* To Input */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="to"
                  placeholder="Bangalore"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Date Input */}
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

          </div>

          {/* Search Button */}
          <div className="flex justify-center md:justify-end">
            <motion.button
              onClick={handleSearch}
              disabled={isSearching}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2 text-base md:text-lg"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Search Buses
                </>
              )}
            </motion.button>
          </div>

        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Book With Us?</h2>
        
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
              <p className="text-4xl mb-3 group-hover:scale-110 transition duration-300">{feature.icon}</p>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Popular Routes</h2>
        <p className="text-gray-600 mb-8">Most booked bus routes with best prices</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setFormData({ from: route.from, to: route.to, date: "" });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-xl transition duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-center">
                    <p className="font-bold text-gray-900 text-sm">{route.from}</p>
                  </div>
                  <ArrowRight className="text-blue-600 flex-shrink-0 group-hover:translate-x-2 transition duration-300" size={20} />
                  <div className="text-center">
                    <p className="font-bold text-gray-900 text-sm">{route.to}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm flex items-center gap-1">
                    <Clock size={16} /> Duration
                  </span>
                  <span className="font-bold text-gray-900">{route.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Price</span>
                  <span className="font-bold text-blue-600 text-lg">{route.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-900">{route.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bus Operators Section */}
      <div 
        className="py-12 px-4 md:px-6 my-12 relative"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=600&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-white/60"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trusted Bus Operators</h2>
          <p className="text-gray-700 mb-8">Book with India's most reliable bus operators</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {busOperators.map((operator, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-white/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{operator.name}</h3>
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{operator.badge}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-900">{operator.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <Users size={16} className="inline mr-1" />
                    {operator.trips} trips
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-white/90 mb-8 text-lg">Search, compare & book the best buses instantly</p>

            <motion.button
              onClick={() => window.scrollTo({ top: 200, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-600 font-bold px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2 mx-auto text-lg"
            >
              Start Searching
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
                <Bus size={24} />
                Manzilmap
              </h3>
              <p className="text-gray-400 text-sm">Your trusted platform for bus bookings across India</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
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

export default BusPage;