import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Plane,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Password strength calculator
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { fullName, username, email, password } = formData;

    if (!fullName || !username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!agreedTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (passwordStrength < 2) {
      alert("Please use a stronger password");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          fullName,
          username,
          email,
          password,
        },
      );

      console.log("Success:", response.data);

      alert("Registration successful! Check your email.");

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-300";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "No password";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Blur Background */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/40 -z-10"></div>

      {/* Animated Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 -mr-48 -mt-48 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -ml-48 -mb-48 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Main Container */}
      <div className="w-full px-4 md:px-0">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
          {/* Left Side - Benefits (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center gap-3">
                  <Plane className="text-purple-600" size={40} />
                  Manzilmap
                </h1>
                <p className="text-xl text-gray-700 font-semibold">
                  Join 10M+ Happy Travelers
                </p>
              </div>

              {/* Benefits Cards */}
              <div className="space-y-5">
                <motion.div
                  whileHover={{ translateX: 10 }}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition duration-300 group"
                >
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg group-hover:scale-110 transition duration-300">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Instant Access
                    </h3>
                    <p className="text-sm text-gray-600">
                      Book flights & hotels instantly after signup
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ translateX: 10 }}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition duration-300 group"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg group-hover:scale-110 transition duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Exclusive Deals
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get member-only discounts & special offers
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ translateX: 10 }}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition duration-300 group"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 rounded-lg group-hover:scale-110 transition duration-300">
                    <ArrowRight size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Easy Cancellation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Flexible booking with free cancellation
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl text-center border border-white/50">
                  <p className="text-2xl font-bold text-purple-600">10M+</p>
                  <p className="text-xs text-gray-600">Users</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl text-center border border-white/50">
                  <p className="text-2xl font-bold text-blue-600">50K+</p>
                  <p className="text-xs text-gray-600">Hotels</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl text-center border border-white/50">
                  <p className="text-2xl font-bold text-green-600">99.9%</p>
                  <p className="text-xs text-gray-600">Uptime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
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
                  Create Account 🚀
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Join millions of travelers exploring the world
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleRegister} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      placeholder="Enter Your Full Name"
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Username Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="username"
                      placeholder="username123"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 pl-12 pr-12 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 bg-gray-50 hover:bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          Password Strength
                        </span>
                        <span
                          className={`text-xs font-bold ${passwordStrength === 4 ? "text-green-600" : passwordStrength === 3 ? "text-blue-600" : passwordStrength === 2 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(passwordStrength / 4) * 100}%`,
                          }}
                          className={`h-full ${getPasswordStrengthColor()} transition duration-300`}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        💡 Use uppercase, lowercase, numbers & symbols for a
                        strong password
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <motion.label
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-purple-600 cursor-pointer mt-0.5 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition duration-200">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </motion.label>

                {/* Register Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || !agreedTerms}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 text-base md:text-lg mt-6"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
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
                  <span className="px-3 bg-white/95 text-gray-600 font-medium">
                    OR
                  </span>
                </div>
              </div>

              {/* Social Register */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition duration-300 flex items-center justify-center gap-2"
                >
                  <span>🔵</span> Google
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition duration-300 flex items-center justify-center gap-2"
                >
                  <span>📱</span> Apple
                </motion.button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-sm md:text-base">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-700 font-bold transition duration-200"
                  >
                    Login here
                  </Link>
                </p>
              </div>

              {/* Security Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg flex items-start gap-3"
              >
                <Lock
                  size={18}
                  className="text-purple-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs md:text-sm text-gray-700">
                  <span className="font-bold text-purple-600">🔒 Secure:</span>{" "}
                  Your data is encrypted & never shared with third parties.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;
