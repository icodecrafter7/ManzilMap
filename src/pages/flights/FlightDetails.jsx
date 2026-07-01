import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plane, MapPin, Clock, User, Mail, AlertCircle, CheckCircle, DollarSign, Shield, Zap, Calendar, Briefcase, Heart, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const FlightDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;

  const [isProcessing, setIsProcessing] = useState(false);
  const [addOns, setAddOns] = useState({
    meals: false,
    baggage: false,
    insurance: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    email: "",
  });

  if (!flight) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Flight Selected</h2>
          <p className="text-gray-600 mb-6">Please go back and select a flight to proceed</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const basePrice = flight.price;
  const mealCost = addOns.meals ? 500 : 0;
  const baggageCost = addOns.baggage ? 1200 : 0;
  const insuranceCost = addOns.insurance ? 800 : 0;
  const taxes = Math.round((basePrice + mealCost + baggageCost + insuranceCost) * 0.12);
  const total = basePrice + mealCost + baggageCost + insuranceCost + taxes;

  const handleChange = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOn = (type) => {
    setAddOns({
      ...addOns,
      [type]: !addOns[type],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passenger.name || !passenger.age || !passenger.email) {
      alert("Please fill all passenger details");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept terms and conditions");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Proceeding to Payment! 🎉");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100 p-2 rounded-lg transition duration-300"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Flight Booking Details</h1>
            <p className="text-gray-600 text-sm">Complete your booking and proceed to payment</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Flight Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-8 rounded-2xl shadow-lg border-2 border-blue-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-center">

            {/* Airline & Route */}
            <div className="md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-4 rounded-lg">
                  <Plane size={32} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{flight.airline}</h2>
                  <p className="text-gray-700 mb-3 font-semibold flex items-center gap-2">
                    <MapPin size={18} className="text-blue-600" />
                    {flight.from} → {flight.to}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    {flight.date || new Date().toISOString().split('T')[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Time & Duration */}
            <div className="text-center bg-white/70 backdrop-blur-md p-4 rounded-lg border border-white/50">
              <Clock size={20} className="text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Departure</p>
              <p className="font-bold text-gray-900 text-lg">{flight.time}</p>
              <p className="text-xs text-gray-500 mt-2">Duration: {flight.duration}</p>
            </div>

            {/* Seats */}
            <div className="text-center bg-white/70 backdrop-blur-md p-4 rounded-lg border border-white/50">
              <Briefcase size={20} className="text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Class</p>
              <p className="font-bold text-gray-900 text-lg">{flight.class || "Economy"}</p>
            </div>

            {/* Rating */}
            <div className="text-center bg-white/70 backdrop-blur-md p-4 rounded-lg border border-white/50">
              <p className="text-xs text-gray-600 mb-1">Rating</p>
              <p className="font-bold text-gray-900 text-lg">{flight.rating || "4.7"}/5</p>
              <p className="text-xs text-gray-500 mt-1">⭐ {flight.reviews || "2.3K"} reviews</p>
            </div>

          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Passenger Form & Add-ons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Passenger Details Section */}
              <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User size={24} className="text-blue-600" />
                  Passenger Details
                </h3>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={passenger.name}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                        required
                      />
                    </div>
                  </div>

                  {/* Age & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        name="age"
                        placeholder="Enter your age"
                        value={passenger.age}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          value={passenger.email}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add-ons Section */}
              <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap size={22} className="text-yellow-600" />
                  Add Extras (Optional)
                </h3>

                <div className="space-y-3">
                  {[
                    { id: "meals", label: "Meal Plan", icon: "🍽️", price: 500 },
                    { id: "baggage", label: "Extra Baggage (20kg)", icon: "🛄", price: 1200 },
                    { id: "insurance", label: "Travel Insurance", icon: "🛡️", price: 800 },
                  ].map((addon) => (
                    <motion.label
                      key={addon.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 cursor-pointer transition duration-300 group"
                    >
                      <input
                        type="checkbox"
                        checked={addOns[addon.id]}
                        onChange={() => handleAddOn(addon.id)}
                        className="w-5 h-5 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-2xl">{addon.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition duration-300">{addon.label}</p>
                        <p className="text-xs text-gray-600">₹{addon.price}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold transition duration-300 ${
                        addOns[addon.id]
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {addOns[addon.id] ? "✓ Added" : "Add"}
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Terms & Conditions */}
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl cursor-pointer group hover:bg-blue-100 transition duration-300"
              >
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Terms & Conditions</a>
                  {" "}and{" "}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>
                </span>
              </motion.label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 text-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={22} />
                    Proceed to Payment
                  </>
                )}
              </motion.button>

              {/* Info Box */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-green-600">✓ Secure Booking:</span> Your booking will be confirmed after payment. A confirmation email with your e-ticket will be sent immediately.
                </p>
              </div>

            </form>
          </motion.div>

          {/* Price Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border-2 border-blue-200 sticky top-24">

              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign size={24} className="text-blue-600" />
                Price Summary
              </h3>

              <div className="space-y-4 pb-6 border-b-2 border-gray-200">

                {/* Base Fare */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Base Fare</span>
                  <span className="font-bold text-gray-900">₹{basePrice}</span>
                </div>

                {/* Add-ons */}
                {addOns.meals && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">+ Meal Plan</span>
                    <span className="font-bold text-gray-900">₹{mealCost}</span>
                  </div>
                )}

                {addOns.baggage && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">+ Extra Baggage</span>
                    <span className="font-bold text-gray-900">₹{baggageCost}</span>
                  </div>
                )}

                {addOns.insurance && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">+ Travel Insurance</span>
                    <span className="font-bold text-gray-900">₹{insuranceCost}</span>
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-semibold">Subtotal</span>
                  <span className="font-bold text-gray-900">₹{basePrice + mealCost + baggageCost + insuranceCost}</span>
                </div>

                {/* Taxes */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Taxes & Charges (12%)</span>
                  <span className="font-bold text-gray-900">₹{taxes}</span>
                </div>

              </div>

              {/* Total Fare */}
              <div className="pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹{total}</span>
                </div>
                <p className="text-xs text-gray-500">All taxes and charges included</p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Free Cancellation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Seat Selection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">E-Ticket Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">24/7 Support</span>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                Pay ₹{total}
              </motion.button>

              {/* Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mt-4">
                <p className="text-xs text-gray-700">
                  <span className="font-bold text-blue-600">ℹ️</span> You'll get a confirmation within 5 minutes
                </p>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default FlightDetails;