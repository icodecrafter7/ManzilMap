import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plane, Hotel, Bus, Train, Car, MapPin, Star, Users, Calendar, Award, Heart, TrendingUp, ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const [tripType, setTripType] = useState("oneway");
  const navigate = useNavigate();
  const [hoveredDestination, setHoveredDestination] = useState(null);

  // Indian destinations with high-quality images
  const destinations = [
    { 
      name: "Goa", 
      rating: 4.8, 
      reviews: 2450, 
      tag: "Beaches & Parties",
      image: "https://images.unsplash.com/photo-1512207736139-3b9fa4669e6d?w=600&h=400&fit=crop"
    },
    { 
      name: "Manali", 
      rating: 4.9, 
      reviews: 1890, 
      tag: "Adventure & Mountains",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    { 
      name: "Kerala", 
      rating: 4.7, 
      reviews: 3120, 
      tag: "Backwaters & Nature",
      image: "https://images.unsplash.com/photo-1537325387374-cc28cda3ec60?w=600&h=400&fit=crop"
    },
    { 
      name: "Jaipur", 
      rating: 4.6, 
      reviews: 2100, 
      tag: "History & Culture",
      image: "https://images.unsplash.com/photo-1564680509837-11f80a01a517?w=600&h=400&fit=crop"
    },
    { 
      name: "Indore", 
      rating: 4.5, 
      reviews: 1560, 
      tag: "Food & Shopping",
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop"
    },
    { 
      name: "Rishikesh", 
      rating: 4.8, 
      reviews: 1970, 
      tag: "Yoga & Spirituality",
      image: "https://images.unsplash.com/photo-1599522217325-ab6628b03de1?w=600&h=400&fit=crop"
    },
  ];

  const trendingPlaces = [
    { 
      name: "Kasol", 
      rating: 4.9, 
      price: "₹3,500/night",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    { 
      name: "Mussoorie", 
      rating: 4.7, 
      price: "₹4,200/night",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    { 
      name: "Lonavala", 
      rating: 4.6, 
      price: "₹2,800/night",
      image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=400&fit=crop"
    },
    { 
      name: "Ooty", 
      rating: 4.8, 
      price: "₹3,900/night",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
  ];

  const testimonials = [
    { name: "Priya Singh", text: "Best travel platform ever! Booked my honeymoon in seconds 💕", avatar: "PS", rating: 5 },
    { name: "Rajesh Kumar", text: "Amazing deals and excellent customer support. Highly recommended! ⭐", avatar: "RK", rating: 5 },
    { name: "Ananya Verma", text: "Love the udgetplanner feature. Saved so much money on my Goa trip! 🎉", avatar: "AV", rating: 5 },
  ];

  const features = [
    { icon: "🔥", title: "Best Deals", desc: "Exclusive prices you won't find anywhere else" },
    { icon: "⚡", title: "Instant Booking", desc: "Book in seconds without complicated steps" },
    { icon: "🛡️", title: "Safe & Secure", desc: "100% secure transactions & buyer protection" },
    { icon: "💬", title: "24/7 Support", desc: "Always here to help with any questions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-purple-100">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wide">
          Manzilmap
        </h1>

        <div className="hidden md:flex gap-8 font-medium items-center">
          <NavLink
            to="/flights"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-300 ${
                isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            <Plane size={18} /> Flights
          </NavLink>

          <NavLink
            to="/hotels"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-300 ${
                isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            <Hotel size={18} /> Hotels
          </NavLink>

          <NavLink
            to="/bus"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-300 ${
                isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            <Bus size={18} /> Bus
          </NavLink>

          <NavLink
            to="/train"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-300 ${
                isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            <Train size={18} /> Train
          </NavLink>

          <NavLink
            to="/cabs"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-300 ${
                isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            <Car size={18} /> Cabs
          </NavLink>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 hover:shadow-lg text-white px-6 py-2 rounded-xl shadow-lg transition duration-300 font-medium"
        >
          Login / Register
        </button>
      </nav>

      {/* Hero Section with Real Image Background */}
      <div 
        className="relative overflow-hidden h-96 md:h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Blur Overlay using Tailwind */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

        {/* Animated background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>

        <div className="text-center px-4 relative z-10 h-full flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Safar se <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Manzil</span> tak ✈️
            </h2>

            <p className="text-white mt-6 text-lg md:text-xl max-w-2xl mx-auto font-medium drop-shadow-lg">
              Book flights, hotels, buses, trains & cabs — all in one place with the best deals guaranteed
            </p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center gap-4 md:gap-8 mt-10 flex-wrap px-4"
            >
              <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/50 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <p className="text-2xl md:text-3xl font-bold text-purple-600">10M+</p>
                <p className="text-gray-700 text-xs md:text-sm font-medium">Happy Travelers</p>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/50 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <p className="text-2xl md:text-3xl font-bold text-blue-600">50K+</p>
                <p className="text-gray-700 text-xs md:text-sm font-medium">Hotels Listed</p>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/50 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <p className="text-2xl md:text-3xl font-bold text-green-600">99.9%</p>
                <p className="text-gray-700 text-xs md:text-sm font-medium">Uptime</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center items-center -mt-16 md:-mt-20 px-4 relative z-20 mb-12"
      >
        <div className="bg-white/95 shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-6xl border border-gray-200 backdrop-blur-md">

          {/* Trip Type */}
          <div className="flex justify-center gap-4 md:gap-6 mb-8 flex-wrap">
            {["oneway", "round", "multi"].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition duration-300 transform hover:scale-105 ${
                  tripType === type
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105 shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {type === "oneway"
                  ? "One Way"
                  : type === "round"
                  ? "Round Trip"
                  : "Multi City"}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 mb-6">
            <input 
              type="text" 
              placeholder="From" 
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white" 
            />
            <input 
              type="text" 
              placeholder="To" 
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white" 
            />
            <input 
              type="date" 
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white" 
            />

            {tripType === "round" && (
              <input 
                type="date" 
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white" 
              />
            )}

            <input 
              type="text" 
              placeholder="Travellers & Class" 
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white" 
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
            <button
              onClick={() => navigate("/flights/results")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-xl text-white px-6 md:px-8 py-2 md:py-3 rounded-xl text-base md:text-lg shadow-lg transition duration-300 transform hover:scale-105 font-semibold"
            >
              <Search size={18} /> Search Flights
            </button>

            {/* <button
              onClick={() => navigate("/ai-planner")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:shadow-xl text-white px-6 md:px-8 py-2 md:py-3 rounded-xl text-base md:text-lg shadow-lg transition duration-300 transform hover:scale-105 font-semibold"
            >
              💡 AI Budget Planner
            </button> */}
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us with Background */}
      <div 
        className="mt-12 md:mt-24 px-4 md:px-6 relative py-12 md:py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%), url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop')",
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/40 -z-10"></div>

        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2 md:mb-4">
            Why Choose Manzilmap?
          </h3>
          <p className="text-center text-gray-800 mb-8 md:mb-12 font-medium text-sm md:text-base">Experience the best travel booking platform</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ translateY: -10 }}
                className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center border border-white/50 transform hover:scale-105"
              >
                <p className="text-4xl md:text-5xl mb-3 md:mb-4">{feature.icon}</p>
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-1 md:mb-2">{feature.title}</h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Destinations with Real Images */}
      <div className="mt-12 md:mt-24 px-4 md:px-6 relative py-8 md:py-12">
        {/* Background blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 100%), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 backdrop-blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2 md:mb-3">
            Popular Indian Destinations
          </h3>
          <p className="text-center text-gray-800 mb-8 md:mb-12 font-medium text-sm md:text-base">Explore the best places to visit in India</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {destinations.map((place) => (
              <motion.div
                key={place.name}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredDestination(place.name)}
                onMouseLeave={() => setHoveredDestination(null)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition duration-300 cursor-pointer group border border-gray-100 transform hover:scale-105"
              >
                {/* Real Image with Blur */}
                <div className="relative h-40 md:h-48 overflow-hidden bg-gray-300">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110 filter"
                    loading="lazy"
                  />

                  {/* Blur Overlay using Tailwind */}
                  <div className="absolute inset-0 backdrop-blur-xs bg-black/20"></div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 transition duration-300"></div>

                  {/* Tag */}
                  <div className={`absolute inset-0 flex items-end justify-start p-3 md:p-4 transition-all duration-300 ${hoveredDestination === place.name ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-white text-xs md:text-sm font-bold bg-black/80 backdrop-blur-md px-2 md:px-3 py-1 md:py-2 rounded-full">
                      {place.tag}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg md:text-xl text-gray-900">{place.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-800">{place.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-2 md:mb-3">({place.reviews} reviews)</p>

                  <button
                    onClick={() =>
                      navigate("/flights/results", { state: { place: place.name } })
                    }
                    className="mt-2 md:mt-3 text-purple-600 font-semibold flex items-center gap-1 group/btn hover:gap-2 transition duration-300 text-sm md:text-base"
                  >
                    View Deals <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending This Week with Real Images */}
      <div className="mt-12 md:mt-24 px-4 md:px-6 relative py-8 md:py-12">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 100%), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 backdrop-blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <TrendingUp className="text-red-500" size={24} />
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Trending This Week</h3>
          </div>
          <p className="text-center text-gray-800 mb-8 md:mb-12 font-medium text-sm md:text-base">Most booked destinations right now</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {trendingPlaces.map((place, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition duration-300 group h-44 md:h-52 cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={place.image}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-110 filter"
                  loading="lazy"
                />

                {/* Blur Overlay */}
                <div className="absolute inset-0 backdrop-blur-lg bg-white/70"></div>

                {/* Content */}
                <div className="relative p-4 md:p-6 h-full flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-base md:text-lg text-gray-900">{place.name}</h4>
                    <span className="text-red-500 font-bold text-xs md:text-sm">#{idx + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <p className="text-xs md:text-sm text-gray-700 font-semibold">{place.rating}</p>
                    </div>
                    <p className="text-purple-600 font-bold text-base md:text-lg">{place.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials with Background */}
      <div className="mt-12 md:mt-24 px-4 md:px-6 relative py-8 md:py-12">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20 rounded-3xl"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 100%), url('https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 backdrop-blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2 md:mb-3">
            What Our Travelers Say
          </h3>
          <p className="text-center text-gray-800 mb-8 md:mb-12 font-medium text-sm md:text-base">Join millions of happy customers</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                whileHover={{ translateY: -10 }}
                className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 border border-white/50 transform hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xs md:text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm md:text-base truncate">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm md:text-base">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner with Real Image */}
      <div className="mt-12 md:mt-24 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl max-w-7xl mx-auto h-56 md:h-64"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-r from-orange-500/80 via-pink-500/80 to-red-500/80"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-10 z-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-white">
              🎉 Limited Time Offer
            </h3>
            <p className="text-base md:text-lg mb-4 md:mb-6 opacity-95 text-white max-w-lg">
              Get <span className="font-bold">30% OFF</span> on your first booking with code <span className="font-bold uppercase tracking-widest">WELCOME30</span>
            </p>

            <button
              onClick={() => navigate("/flights/results")}
              className="bg-white text-red-500 px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              Grab the Deal
            </button>
          </div>
        </motion.div>
      </div>

      {/* CTA Section with Real Image */}
      <div className="mt-12 md:mt-24 text-center px-4 mb-12 md:mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl max-w-5xl mx-auto h-80 md:h-96"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4">
            <h3 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 text-white">
              Ready to Explore the World?
            </h3>
            <p className="text-base md:text-lg mb-6 md:mb-8 opacity-95 text-white max-w-2xl">
              Start your journey with Manzilmap today and discover incredible destinations 🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-purple-600 px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate("/flights")}
                className="border-2 border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold hover:bg-white/10 transition duration-300 text-sm md:text-base"
              >
                Explore Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Newsletter Section with Background */}
      <div className="mt-12 md:mt-24 px-4 md:px-6 relative py-8 md:py-12">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20 rounded-3xl"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 backdrop-blur-2xl bg-blue-100/60 rounded-3xl"></div>
        </div>

        <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 p-6 md:p-10 rounded-3xl max-w-4xl mx-auto border-2 border-purple-200 backdrop-blur-md relative">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            ✉️ Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-700 mb-4 md:mb-6 font-medium text-sm md:text-base">Get exclusive deals, travel tips & inspiration delivered to your inbox</p>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 md:py-3 rounded-xl border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white/80 backdrop-blur-sm text-sm md:text-base"
            />
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold hover:shadow-lg transition duration-300 text-sm md:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer with Real Image Background */}
<footer className="relative mt-16 md:mt-24 py-16 px-4 md:px-6 overflow-hidden bg-slate-200">

  {/* 🌈 Premium Gradient Mesh Background */}
  <div className="absolute inset-0 -z-20">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

    {/* Floating gradient blobs */}
    <div className="absolute top-[-120px] left-[10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[140px]"></div>
    <div className="absolute bottom-[-120px] right-[10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[140px]"></div>
    <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-[120px]"></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">

    {/* 💎 Glass Card Container */}
    <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-12">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

        {/* About */}
        <div className="transition duration-300 hover:-translate-y-2 hover:shadow-lg rounded-xl p-2">
          <h4 className="text-xl font-bold mb-4 text-gray-900">Manzilmap</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your trusted travel companion for discovering, booking, and exploring the world's best destinations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="transition duration-300 hover:-translate-y-2 hover:shadow-lg rounded-xl p-2">
          <h4 className="text-lg font-bold mb-4 text-gray-900">Quick Links</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">Careers</a></li>
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="transition duration-300 hover:-translate-y-2 hover:shadow-lg rounded-xl p-2">
          <h4 className="text-lg font-bold mb-4 text-gray-900">Support</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-600 hover:pl-1 transition-all duration-300">Refund Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="transition duration-300 hover:-translate-y-2 hover:shadow-lg rounded-xl p-2">
          <h4 className="text-lg font-bold mb-4 text-gray-900">Get In Touch</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" /> India
            </li>
            <li>📞 +91 1234-5678-90</li>
            <li>✉️ support@manzilmap.com</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 Manzilmap. All rights reserved. 🌍
          </p>

          {/* 💠 Social Icons with glass buttons */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md border border-gray-200 hover:bg-blue-100 hover:scale-110 transition duration-300 shadow-sm">f</a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md border border-gray-200 hover:bg-blue-100 hover:scale-110 transition duration-300 shadow-sm">𝕏</a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md border border-gray-200 hover:bg-blue-100 hover:scale-110 transition duration-300 shadow-sm">📷</a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md border border-gray-200 hover:bg-blue-100 hover:scale-110 transition duration-300 shadow-sm">▶️</a>
          </div>

        </div>
      </div>

    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;