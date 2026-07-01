import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Train as TrainIcon, ArrowRight, Zap, Shield, Star, TrendingUp, Search, ChevronRight, Wifi } from "lucide-react";
import { motion } from "framer-motion";


const Train = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    classType: "Sleeper",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate("/train/results", {
        state: formData,
      });
    }, 800);
  };

  // Swap from and to
  const handleSwap = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from,
    });
  };

  // Popular routes for quick booking
  const popularRoutes = [
    { from: "Delhi", to: "Mumbai", price: "₹899", duration: "24h" },
    { from: "Mumbai", to: "Bangalore", price: "₹1,299", duration: "32h" },
    { from: "Delhi", to: "Kolkata", price: "₹1,099", duration: "28h" },
    { from: "Bangalore", to: "Chennai", price: "₹599", duration: "12h" },
  ];

  // Features
  const features = [
    { icon: "💰", title: "Lowest Fares", desc: "Best prices guaranteed" },
    { icon: "⚡", title: "Instant Booking", desc: "Book in seconds" },
    { icon: "🛡️", title: "100% Safe", desc: "Secure & reliable" },
    { icon: "🚆", title: "All Trains", desc: "500+ routes covered" },
  ];

  // Train classes
  const trainClasses = [
    { value: "Sleeper", icon: "🛏️", desc: "Most affordable" },
    { value: "AC 3 Tier", icon: "❄️", desc: "Budget AC" },
    { value: "AC 2 Tier", icon: "⭐", desc: "Premium AC" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrainIcon className="text-blue-600" size={28} />
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
          backgroundImage: "linear-gradient(135deg, rgba(37, 99, 235, 0.7) 0%, rgba(139, 92, 246, 0.7) 100%), url('https://images.unsplash.com/photo-1582708323590-d24dbb6b0267?w=1920&h=600&fit=crop')",
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
            Search Trains 🚆
          </h2>
          <p className="text-white text-lg drop-shadow-md">Book train tickets at the best prices</p>
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

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Book Your Train Ticket</h3>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6">

            {/* From */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="from"
                  placeholder="Departure station"
                  value={formData.from}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center mb-1 lg:col-span-1">
              <motion.button
                whileHover={{ rotate: 180, scale: 1.1 }}
                onClick={handleSwap}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg transition duration-300"
              >
                <ArrowRight size={20} className="rotate-90" />
              </motion.button>
            </div>

            {/* To */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="to"
                  placeholder="Arrival station"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                />
              </div>
            </div>

            {/* Date */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Journey Date</label>
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

            {/* Class Type */}
            <div className="relative lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
              <select
                name="classType"
                value={formData.classType}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium appearance-none"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="Sleeper">Sleeper</option>
                <option value="AC 3 Tier">AC 3 Tier</option>
                <option value="AC 2 Tier">AC 2 Tier</option>
              </select>
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
                Searching Trains...
              </>
            ) : (
              <>
                <Search size={22} />
                Search Trains
              </>
            )}
          </motion.button>

        </div>
      </motion.div>

      {/* Train Classes Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Choose Your Class</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainClasses.map((trainClass, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setFormData({ ...formData, classType: trainClass.value });
                window.scrollTo({ top: 200, behavior: "smooth" });
              }}
              className={`bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border-2 group ${
                formData.classType === trainClass.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              <p className="text-5xl mb-3 group-hover:scale-110 transition duration-300">{trainClass.icon}</p>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{trainClass.value}</h3>
              <p className="text-gray-600 text-sm">{trainClass.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Book With Manzilmap?</h2>
        
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
        <p className="text-gray-600 mb-8">Click to instantly fill your search</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularRoutes.map((route, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setFormData({ ...formData, from: route.from, to: route.to });
                window.scrollTo({ top: 200, behavior: "smooth" });
              }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-xl transition duration-300 text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">From</p>
                  <p className="font-bold text-gray-900">{route.from}</p>
                </div>
                <ArrowRight className="text-blue-600 group-hover:translate-x-2 transition duration-300 flex-shrink-0" size={20} />
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">To</p>
                <p className="font-bold text-gray-900">{route.to}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t-2 border-blue-200">
                <p className="text-sm font-bold text-blue-600">{route.price}</p>
                <p className="text-xs text-gray-500">{route.duration}</p>
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
            { num: "1", title: "Search", desc: "Enter route & date" },
            { num: "2", title: "Compare", desc: "View all trains" },
            { num: "3", title: "Select", desc: "Choose your train" },
            { num: "4", title: "Book", desc: "Confirm booking" },
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

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Limited Time Offer!</h2>
            <p className="text-white/90 mb-8 text-lg">Get 30% off on train bookings with code TRAINRIDE30</p>

            <motion.button
              onClick={() => window.scrollTo({ top: 200, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-600 font-bold px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2 mx-auto text-lg"
            >
              Book Tickets
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
                <TrainIcon size={24} />
                Manzilmap
              </h3>
              <p className="text-gray-400 text-sm">Your trusted train booking platform for safe & comfortable journeys</p>
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

export default Train;