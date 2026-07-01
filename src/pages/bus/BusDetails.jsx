import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, MapPin, Clock, Users, DollarSign, Shield, CheckCircle, AlertCircle, Bus } from "lucide-react";
import { motion } from "framer-motion";

const BusDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state?.bus;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [passenger, setPassenger] = useState({
    name: "",
    phone: "",
  });

  if (!bus) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bus Selected</h2>
          <p className="text-gray-600 mb-6">Please go back and select a bus to proceed</p>
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

  const price = bus.price;
  const taxes = Math.round(price * 0.15);
  const total = price + taxes;

  const handleChange = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!passenger.name || !passenger.phone) {
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
      alert("Booking Confirmed! 🎉");
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Bus Booking Details</h1>
            <p className="text-gray-600 text-sm">Complete your booking</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Bus Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-8 rounded-2xl shadow-lg border-2 border-blue-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-center">
            
            {/* Bus Name */}
            <div className="flex items-center gap-3 col-span-1 md:col-span-2">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <Bus size={24} />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">{bus.name}</h2>
                <p className="text-sm text-gray-600">Premium Bus Service</p>
              </div>
            </div>

            {/* Route Info */}
            <div className="flex items-center justify-between col-span-1 md:col-span-3">
              <div className="text-center flex-1">
                <p className="text-xs text-gray-600 mb-1">FROM</p>
                <p className="font-bold text-gray-900">{bus.from}</p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="h-1 w-8 bg-gray-300"></div>
                  <MapPin size={20} className="text-blue-600" />
                  <div className="h-1 w-8 bg-gray-300"></div>
                </div>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs text-gray-600 mb-1">TO</p>
                <p className="font-bold text-gray-900">{bus.to}</p>
              </div>
            </div>
          </div>

          {/* Bus Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t-2 border-blue-200">
            <div className="text-center">
              <Clock size={20} className="text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Departure</p>
              <p className="font-bold text-gray-900">{bus.time}</p>
            </div>
            <div className="text-center">
              <Clock size={20} className="text-purple-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Duration</p>
              <p className="font-bold text-gray-900">{bus.duration || "18h"}</p>
            </div>
            <div className="text-center">
              <Users size={20} className="text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Seats Available</p>
              <p className="font-bold text-gray-900">{bus.seats || "15"}</p>
            </div>
            <div className="text-center">
              <Shield size={20} className="text-red-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Safety Rating</p>
              <p className="font-bold text-gray-900">4.8/5</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Passenger Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handlePayment} className="space-y-6">

              {/* Passenger Details Section */}
              <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users size={24} className="text-blue-600" />
                  Passenger Details
                </h2>

                <div className="space-y-5">
                  {/* Name Input */}
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
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter 10-digit mobile number"
                        value={passenger.phone}
                        onChange={handleChange}
                        maxLength="10"
                        className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <DollarSign size={24} className="text-green-600" />
                  Payment Method
                </h3>

                <div className="space-y-3">
                  {["card", "upi", "wallet"].map((method) => (
                    <label key={method} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition duration-300 group">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 accent-blue-600"
                      />
                      <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition duration-300">
                        {method === "card" && "💳 Credit/Debit Card"}
                        {method === "upi" && "📱 UPI/Google Pay"}
                        {method === "wallet" && "💰 Digital Wallet"}
                      </span>
                    </label>
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
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Cancellation Policy</a>
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
                    Processing Payment...
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
                  <span className="font-bold text-green-600">✓ Secure Payment:</span> Your booking will be confirmed after successful payment. You'll receive a confirmation email with your ticket details.
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
                
                {/* Base Price */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Base Fare</span>
                  <span className="font-bold text-gray-900">₹{price}</span>
                </div>

                {/* Taxes */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Taxes & Fees</span>
                  <span className="font-bold text-gray-900">₹{taxes}</span>
                </div>

                {/* Discount Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 p-3 rounded-lg flex justify-between items-center"
                >
                  <span className="text-green-700 font-semibold">🎉 New User Discount</span>
                  <span className="text-green-600 font-bold">-₹0</span>
                </motion.div>
              </div>

              {/* Total Price */}
              <div className="pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹{total}</span>
                </div>
                <p className="text-xs text-gray-500">All taxes and charges included</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Free Cancellation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Live Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">24/7 Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">GST Invoice</span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-xs text-gray-700">
                  <span className="font-bold text-blue-600">ℹ️</span> Your seat will be reserved after payment confirmation.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default BusDetails;