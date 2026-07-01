import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, MapPin, Car, Clock, AlertCircle, CheckCircle, DollarSign, Shield, Star, Zap, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const CabDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cab = location.state?.cab;
  const pickup = location.state?.pickup;
  const drop = location.state?.drop;

  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  if (!cab) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Cab Selected</h2>
          <p className="text-gray-600 mb-6">Please go back and select a cab to proceed</p>
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

  const distance = 10; // dummy km
  const baseFare = cab.pricePerKm * distance;
  const discount = promoApplied ? Math.round(baseFare * 0.1) : 0;
  const taxes = Math.round((baseFare - discount) * 0.08);
  const total = baseFare - discount + taxes;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const handleConfirmRide = (e) => {
    e.preventDefault();

    if (!user.name || !user.phone) {
      alert("Please fill all rider details");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept terms and conditions");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Ride Confirmed! 🎉");
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Cab Booking Details</h1>
            <p className="text-gray-600 text-sm">Complete your ride booking</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Cab Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-8 rounded-2xl shadow-lg border-2 border-blue-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {/* Cab Type & Details */}
            <div className="md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-4 rounded-lg">
                  <Car size={32} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{cab.type}</h2>
                  <p className="text-gray-700 mb-3 flex items-center gap-2">
                    <span className="font-semibold">Model:</span> {cab.car}
                  </p>
                  
                  {/* Route */}
                  <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md p-3 rounded-lg">
                    <div className="text-center">
                      <MapPin size={20} className="text-blue-600 mb-1" />
                      <p className="text-xs text-gray-600">PICKUP</p>
                      <p className="font-semibold text-gray-900 text-sm">{pickup}</p>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex items-center gap-1 text-gray-400">
                        <div className="h-1 w-6 bg-gray-300"></div>
                        <Navigation size={18} className="text-blue-600" />
                        <div className="h-1 w-6 bg-gray-300"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <MapPin size={20} className="text-purple-600 mb-1" />
                      <p className="text-xs text-gray-600">DROP</p>
                      <p className="font-semibold text-gray-900 text-sm">{drop}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cab Stats */}
            <div className="space-y-4">
              <div className="bg-white/70 backdrop-blur-md p-4 rounded-lg text-center border border-white/50">
                <Star size={20} className="text-yellow-500 mx-auto mb-2 fill-yellow-500" />
                <p className="text-xs text-gray-600 mb-1">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{cab.rating || "4.8"}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md p-4 rounded-lg text-center border border-white/50">
                <Clock size={20} className="text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">ETA</p>
                <p className="text-2xl font-bold text-gray-900">5 min</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md p-4 rounded-lg text-center border border-white/50">
                <Shield size={20} className="text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Safety</p>
                <p className="text-sm font-bold text-green-600">Verified</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Rider Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleConfirmRide} className="space-y-6">

              {/* Rider Details Section */}
              <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User size={24} className="text-blue-600" />
                  Rider Details
                </h3>

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
                        value={user.name}
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
                        value={user.phone}
                        onChange={handleChange}
                        maxLength="10"
                        className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-green-600" />
                  Apply Promo Code
                </h3>

                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="flex-1 border-2 border-green-300 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 font-medium"
                  />
                  <button
                    type="button"
                    onClick={handlePromoCode}
                    disabled={promoApplied}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-bold transition duration-300"
                  >
                    Apply
                  </button>
                </div>

                {promoApplied && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm text-green-700 font-semibold flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Code applied! 10% discount added
                  </motion.p>
                )}
                <p className="text-xs text-gray-600 mt-2">💡 Try "SAVE10" for 10% discount</p>
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
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Safety Policy</a>
                </span>
              </motion.label>

              {/* Confirm Button */}
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
                    Confirming Ride...
                  </>
                ) : (
                  <>
                    <CheckCircle size={22} />
                    Confirm Ride
                  </>
                )}
              </motion.button>

              {/* Info Box */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-green-600">✓ Secure Booking:</span> Your ride will be confirmed after verification. Driver details will be shared on your registered mobile number.
                </p>
              </div>

            </form>
          </motion.div>

          {/* Fare Details Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border-2 border-blue-200 sticky top-24">

              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign size={24} className="text-blue-600" />
                Fare Details
              </h3>

              <div className="space-y-4 pb-6 border-b-2 border-gray-200">

                {/* Distance */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" />
                    Distance
                  </span>
                  <span className="font-bold text-gray-900">{distance} km</span>
                </div>

                {/* Base Fare */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Base Fare</span>
                  <span className="font-bold text-gray-900">₹{cab.pricePerKm} × {distance} km</span>
                </div>

                {/* Base Total */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-semibold">Subtotal</span>
                  <span className="font-bold text-gray-900">₹{baseFare}</span>
                </div>

                {/* Discount */}
                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 p-3 rounded-lg flex justify-between items-center border border-green-200"
                  >
                    <span className="text-green-700 font-semibold">🎉 Promo Discount</span>
                    <span className="text-green-600 font-bold">-₹{discount}</span>
                  </motion.div>
                )}

                {/* Taxes */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Taxes & Charges</span>
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

              {/* Features */}
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">GPS Tracked</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Verified Driver</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Ride Protection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">24/7 Support</span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-xs text-gray-700">
                  <span className="font-bold text-blue-600">ℹ️</span> Ride will start once driver accepts and arrives at pickup location.
                </p>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default CabDetails;