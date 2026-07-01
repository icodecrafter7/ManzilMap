import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Plane } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    // 👉 Backend later
    console.log("Login Data:", formData);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Blur Background */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/40 -z-10"></div>

      {/* Animated Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -mr-48 -mt-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 -ml-48 -mb-48 animate-pulse" style={{ animationDelay: "1s" }}></div>

      {/* Main Container */}
      <div className="w-full px-4 md:px-0">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
          
          {/* Left Side - Brand Info (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 flex items-center gap-3">
                  <Plane className="text-blue-600" size={40} />
                  Manzilmap
                </h1>
                <p className="text-xl text-gray-700 font-semibold">Your Gateway to Amazing Journeys</p>
              </div>

              <div className="space-y-6">
                <motion.div 
                  whileHover={{ translateX: 10 }}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Book Instantly</h3>
                    <p className="text-sm text-gray-600">Book flights, hotels, buses & more in seconds</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ translateX: 10 }}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">100% Secure</h3>
                    <p className="text-sm text-gray-600">Bank-level encryption for all transactions</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ translateX: 10 }}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 rounded-lg">
                    <ArrowRight size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Best Deals</h3>
                    <p className="text-sm text-gray-600">Exclusive offers & discounts just for you</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Welcome Back 👋
                </h2>
                <p className="text-gray-600 text-sm md:text-base">Sign in to your account and start exploring</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 pl-12 pr-12 py-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200">
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>

              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white/95 text-gray-600 font-medium">OR</span>
                </div>
              </div>

              {/* Social Login (Optional) */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition duration-300 flex items-center justify-center gap-2"
                >
                  <span>🔵</span> Google
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition duration-300 flex items-center justify-center gap-2"
                >
                  <span>📱</span> Apple
                </motion.button>
              </div>

              {/* Register Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-sm md:text-base">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold transition duration-200">
                    Create one now
                  </Link>
                </p>
              </div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg"
              >
                <p className="text-xs md:text-sm text-gray-700">
                  <span className="font-bold text-blue-600">Demo Tip:</span> Use any email and password to test the login functionality.
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default Login;