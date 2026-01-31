import { ChevronLeft, ChevronRight, Search, Bell, Play, Info, Zap, Heart, Users, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: { en: "Oppenheimer", hi: "ओपेनहाइमर" },
    year: "",
    rating: "R",
    type: { en: "Movie", hi: "फ़िल्म" },
    genres: { en: "Biography • Drama", hi: "जीवनी • ड्रामा" },
    description: {
      en: "The story of J. Robert Oppenheimer and the atomic bomb.",
      hi: "परमाणु बम के जनक जे. रॉबर्ट ओपेनहाइमर की कहानी।"
    },
    img: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    trailer: "https://www.youtube.com/embed/uYPbbksJxIg"
  },
  {
    id: 2,
    title: { en: "Dune: Part Two", hi: "ड्यून पार्ट टू" },
    year: "",
    rating: "PG-13",
    type: { en: "Movie", hi: "फ़िल्म" },
    genres: { en: "Sci-Fi • Adventure", hi: "साई-फाई • एडवेंचर" },
    description: {
      en: "Paul Atreides unites with the Fremen to seek revenge.",
      hi: "पॉल एट्रीड्स फ्रेमेन के साथ बदला लेने निकलता है।"
    },
    img: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    trailer: "https://www.youtube.com/embed/Way9Dexny3w"
  },
  {
    id: 3,
    title: { en: "John Wick: Chapter 4", hi: "जॉन विक चैप्टर 4" },
    year: "",
    rating: "R",
    type: { en: "Movie", hi: "फ़िल्म" },
    genres: { en: "Action • Thriller", hi: "एक्शन • थ्रिलर" },
    description: {
      en: "John Wick uncovers a path to defeating the High Table.",
      hi: "जॉन विक हाई टेबल को हराने का रास्ता ढूंढता है।"
    },
    img: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    trailer: "https://www.youtube.com/embed/qEVUtrk8_B4"
  },
  {
    id: 4,
    title: { en: "Avatar: The Way of Water", hi: "अवतार: द वे ऑफ वॉटर" },
    year: "",
    rating: "PG-13",
    type: { en: "Movie", hi: "फ़िल्म" },
    genres: { en: "Fantasy • Sci-Fi", hi: "फैंटेसी • साई-फाई" },
    description: {
      en: "Jake Sully lives with his new family on Pandora.",
      hi: "जेक सुली अपने परिवार के साथ पैंडोरा पर रहता है।"
    },
    img: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    trailer: "https://www.youtube.com/embed/d9MyW72ELq0"
  },
  {
    id: 7,
    title: { en: "Pathaan", hi: "पठान" },
    year: "",
    rating: "U/A 16+",
    type: { en: "Movie", hi: "फ़िल्म" },
    genres: { en: "Action • Spy", hi: "एक्शन • जासूसी" },
    description: {
      en: "An Indian spy takes on a dangerous enemy.",
      hi: "एक भारतीय जासूस खतरनाक दुश्मन से भिड़ता है।"
    },
    img: "https://image.tmdb.org/t/p/w500/arf00BkwvXo0CFKbaD9OpqdE4Nu.jpg",
    trailer: "https://www.youtube.com/embed/vqu4z34wENw"
  },
  {
    id: 8,
    title: { en: "The Batman", hi: "द बैटमैन" },
    year: "",
    rating: "PG-13",
    type: { en: "Movie", hi: "फ़िल्म" },
    genres: { en: "Action • Crime", hi: "एक्शन • क्राइम" },
    description: {
      en: "Batman uncovers corruption in Gotham City.",
      hi: "बैटमैन गोथम सिटी में भ्रष्टाचार उजागर करता है।"
    },
    img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    trailer: "https://www.youtube.com/embed/mqqft2x_Aa4"
  },
  {
    id: 10,
    title: { en: "Mission: Impossible – Dead Reckoning", hi: "मिशन इम्पॉसिबल" },
    year: "",
    rating: "PG-13",
    type: { en: "Movie", hi: "फ़िल्म" },
    genres: { en: "Action • Adventure", hi: "एक्शन • एडवेंचर" },
    description: {
      en: "Ethan Hunt faces his most dangerous mission.",
      hi: "एथन हंट अब तक के सबसे खतरनाक मिशन पर है।"
    },
    img: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    trailer: "https://www.youtube.com/embed/avz06PDqDbM"
  }
];

const features = [
  {
    icon: Zap,
    title: { en: "Ultra HD Streaming", hi: "अल्ट्रा एचडी स्ट्रीमिंग" },
    desc: { en: "Experience cinema-quality 4K streaming with zero buffering", hi: "बिना किसी रुकावट के सिनेमा-गुणवत्ता का 4K अनुभव लें" }
  },
  {
    icon: Heart,
    title: { en: "Personalized Picks", hi: "व्यक्तिगत सिफारिशें" },
    desc: { en: "AI-powered recommendations tailored to your taste", hi: "आपकी पसंद के अनुसार एआई-संचालित सुझाव" }
  },
  {
    icon: Users,
    title: { en: "Family Profiles", hi: "परिवार प्रोफाइल" },
    desc: { en: "Create unlimited profiles for your entire family", hi: "अपने पूरे परिवार के लिए असीमित प्रोफाइल बनाएं" }
  },
  {
    icon: Sparkles,
    title: { en: "Exclusive Content", hi: "एक्सक्लूसिव सामग्री" },
    desc: { en: "Access originals you won't find anywhere else", hi: "एक्सक्लूसिव सामग्री जो कहीं और नहीं मिलेगी" }
  }
];



const faqs = [
  {
    question: { en: "What is Netflix?", hi: "Netflix क्या है?" },
    answer: { en: "Netflix is a premium streaming platform offering thousands of movies, series, and exclusive content from around the world.", hi: "Netflix एक प्रीमियम स्ट्रीमिंग प्लेटफॉर्म है जो दुनिया भर से हजारों फिल्में और सिरीज देता है।" }
  },
  {
    question: { en: "How much does it cost?", hi: "इसकी कीमत कितनी है?" },
    answer: { en: "Plans start at ₹199/month with flexible options. Cancel anytime, no hidden fees.", hi: "योजनाएं ₹199/माह से शुरू होती हैं। कभी भी रद्द करें, कोई छिपी फीस नहीं।" }
  },
  {
    question: { en: "Can I download content?", hi: "क्या मैं सामग्री डाउनलोड कर सकता हूं?" },
    answer: { en: "Yes! Download unlimited movies and shows to watch offline on any device.", hi: "हाँ! असीमित फिल्में डाउनलोड करें और ऑफलाइन देखें।" }
  },
  {
    question: { en: "Is there a free trial?", hi: "क्या कोई मुफ्त परीक्षण है?" },
    answer: { en: "Yes, enjoy 7 days of free access to explore our entire library.", hi: "हाँ, 7 दिन की मुफ्त एक्सेस का आनंद लें।" }
  },
  {
    question: { en: "How many screens can I watch on?", hi: "मैं कितने स्क्रीन पर देख सकता हूं?" },
    answer: { en: "Premium plans allow simultaneous streaming on up to 4 devices.", hi: "प्रीमियम योजनाओं में 4 डिवाइस पर एक साथ देखें।" }
  }
];

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
      setStartIndex(0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


const [showHeader, setShowHeader] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // scrolling down → hide
      setShowHeader(false);
    } else {
      // scrolling up → show
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);

  const visibleMovies = movies.slice(startIndex, startIndex + itemsPerView);

  const next = () => {
    if (startIndex + itemsPerView < movies.length) {
      setStartIndex(startIndex + itemsPerView);
    }
  };

  const prev = () => {
    if (startIndex - itemsPerView >= 0) {
      setStartIndex(startIndex - itemsPerView);
    }
  };

  const handleStart = () => {
    if (!email) return alert("Email required");
    localStorage.setItem("preLoginEmail", email);
    navigate("/login");
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden font-sans" style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}>
      {/* HEADER */}
<header
 
  className={`fixed top-0 left-0 w-full z-50
  px-4 sm:px-8 py-4
  flex justify-between items-center
  transition-all duration-500 ease-in-out
  ${
    showHeader
      ? "translate-y-0 opacity-100"
      : "-translate-y-full opacity-0"
  }
  ${
    scrollY > 50
      ? "bg-slate-900/10 "
      : "bg-transparent"
  }`}
>


  {/* LOGO */}
 <div className="flex items-center select-none">
  <img
    src="Logonetflix.png"
    alt="Netflix"
    className="h-10 sm:h-12 object-contain"
  />
</div>


  {/* RIGHT CONTROLS */}
  <div className="flex items-center gap-3 sm:gap-6">
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-slate-800/60 text-white
      border border-slate-600
      px-3 sm:px-4 py-2
      text-xs sm:text-sm
      rounded-lg
      outline-none
      focus:border-red-400
      transition"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>

    <a
      href="/login"
      className="bg-red-600/90 hover:bg-red-500
      text-white text-xs sm:text-sm font-bold
      px-4 sm:px-6 py-2
      rounded-lg
      transition-transform duration-300
      hover:scale-105
      shadow-md shadow-red-600/30"
    >
      {language === "en" ? "Sign In" : "साइन इन"}
    </a>
  </div>
</header>



      {/* HERO SECTION */}
     <section className="relative w-full h-screen flex items-center justify-start px-4 sm:px-8 pt-20 overflow-hidden">
  {/* BACKGROUND IMAGE */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-105"
    style={{
      backgroundImage:
        "url('bg-netflix.jpg')",
    }}
  />

  {/* OVERLAYS */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-transparent z-10" />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

  {/* GLOW EFFECTS */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse z-10" />
  <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl z-10" />

  {/* CONTENT */}
  <div className="relative z-20 max-w-3xl">
  

    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
      <span className="bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent">
        {language === "en"
          ? "Unlimited movies, TV shows and more"
          : "असीमित फिल्में, टीवी शो और बहुत कुछ"}
      </span>
    </h1>

    <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-8 max-w-2xl leading-relaxed">
      {language === "en"
        ? "Watch anywhere. Cancel anytime. Ready to watch? Enter your email to create or restart your membership."
        : "कहीं भी देखें। कभी भी रद्द करें। देखने के लिए तैयार हैं? अपनी सदस्यता बनाने या फिर से शुरू करने के लिए अपना ईमेल दर्ज करें।"}
    </p>

    {/* EMAIL + BUTTON */}
  {/* EMAIL + BUTTON */}
<div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-xl">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder={language === "en" ? "Email address" : "ईमेल पता"}
    className="
      w-full sm:flex-1
      px-5 py-3 sm:py-4
      text-sm sm:text-base
      rounded-lg
      bg-slate-800/60
      border border-slate-700
      text-white placeholder-gray-500
      focus:outline-none focus:border-red-400
      focus:ring-2 focus:ring-red-400/20
      transition
    "
  />

  <button
    onClick={handleStart}
    className="
      w-full sm:w-auto
      bg-gradient-to-r from-red-600 to-red-700
      hover:from-red-500 hover:to-red-600
      text-white font-bold
      px-6 sm:px-8
      py-3 sm:py-4
      rounded-lg
      transition
      transform hover:scale-105
      shadow-lg shadow-red-600/40
      text-sm sm:text-base
      whitespace-nowrap
    "
  >
    {language === "en" ? "Get Started" : "शुरु करें"} →
  </button>
</div>


    <p className="text-xs sm:text-sm text-gray-400 mt-4">
      {language === "en"
        ? "7 days free. No credit card required."
        : "7 दिन मुफ्त। क्रेडिट कार्ड की जरूरत नहीं।"}
    </p>
  </div>
</section>


      {/* TRENDING SECTION */}
    {/* TRENDING SECTION */}
<section className="px-4 sm:px-8 py-12 sm:py-20 relative z-20">
  <h3 className="text-2xl sm:text-4xl font-black mb-8 sm:mb-10">
    {language === "en" ? "Trending Now" : "अभी ट्रेंडिंग"}
  </h3>

  <div className="relative group">
    {/* MOVIES */}
    <div className="flex gap-3 overflow-hidden pb-4">
      {visibleMovies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => setSelectedMovie(movie)}
          className={`flex-shrink-0 cursor-pointer transition-transform duration-300 
          ${itemsPerView === 2 ? "w-1/2" : "w-1/4"} hover:scale-105`}
        >
          <div className="relative overflow-hidden rounded-xl group/card">
            <img
              src={movie.img}
              alt={movie.title[language]}
              className="w-full aspect-[2/3] object-cover transition-transform duration-500 
              group-hover/card:scale-110 group-hover/card:brightness-125"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent 
              opacity-0 group-hover/card:opacity-100 transition 
              flex items-center justify-center"
            >
              <button className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-full transition transform hover:scale-110 shadow-lg">
                <Play size={24} fill="currentColor" />
              </button>
            </div>
          </div>

          <h4 className="mt-3 text-sm sm:text-base font-bold truncate">
            {movie.title[language]}
          </h4>
          <p className="text-xs text-gray-400">{movie.year}</p>
        </div>
      ))}
    </div>

    {/* LEFT ARROW */}
    {startIndex > 0 && (
      <button
        onClick={prev}
        className="
          absolute left-0 top-1/2 sm:top-1/3 -translate-y-1/2 z-10
          bg-gradient-to-r from-red-600 to-red-700
          hover:from-red-500 hover:to-red-600
          p-2 sm:p-3 rounded-full transition
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100
          shadow-lg
        "
      >
        <ChevronLeft size={22} />
      </button>
    )}

    {/* RIGHT ARROW */}
    {startIndex + itemsPerView < movies.length && (
      <button
        onClick={next}
        className="
          absolute right-0 top-1/2 sm:top-1/3 -translate-y-1/2 z-10
          bg-gradient-to-r from-red-600 to-red-700
          hover:from-red-500 hover:to-red-600
          p-2 sm:p-3 rounded-full transition
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100
          shadow-lg
        "
      >
        <ChevronRight size={22} />
      </button>
    )}
  </div>
</section>


      {/* FEATURES SECTION */}
      <section className="relative px-4 sm:px-8 py-14 sm:py-20
  bg-gradient-to-b from-slate-900/60 via-slate-950 to-black overflow-hidden"
>
  {/* Soft background glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-32 left-1/2 -translate-x-1/2
      w-[600px] h-[600px] bg-red-500/10 blur-3xl rounded-full" />
  </div>

  <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl
    font-black text-center mb-10 sm:mb-14 tracking-tight"
  >
    {language === "en" ? "Why Choose Netflix?" : "Netflix को क्यों चुनें"}
  </h2>

  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
    gap-6 sm:gap-8 max-w-7xl mx-auto"
  >
    {features.map((feature, idx) => {
      const Icon = feature.icon;
      return (
        <div
          key={idx}
          className="group relative rounded-2xl p-6 sm:p-8
            bg-gradient-to-br from-slate-800/60 to-slate-900/40
            border border-slate-700/40
            transition-all duration-300
            hover:-translate-y-2
            hover:border-red-500/50
            hover:shadow-2xl hover:shadow-red-500/20"
        >
          {/* hover glow */}
          <div className="absolute inset-0 rounded-2xl
            bg-gradient-to-br from-red-500/0 to-red-600/0
            group-hover:from-red-500/10 group-hover:to-red-600/10
            transition-all duration-300"
          />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center justify-center
              w-12 h-12 rounded-xl
              bg-gradient-to-br from-red-500/20 to-red-600/20
              border border-red-500/30
              group-hover:scale-110 transition"
            >
              <Icon size={22} className="text-red-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold mb-2">
              {feature.title[language]}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              {feature.desc[language]}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>


      {/* FAQ SECTION */}
      <section className="px-4 sm:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 sm:mb-14">
            {language === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले सवाल"}
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-700 rounded-xl overflow-hidden hover:border-red-500/30 transition">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center px-6 sm:px-8 py-5 text-left bg-gradient-to-r from-slate-800/30 to-transparent hover:from-slate-800/50 transition"
                >
                  <span className="font-semibold text-base sm:text-lg">{faq.question[language]}</span>
                  <span className={`text-2xl text-red-400 transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 sm:px-8 py-5 bg-slate-900/50 border-t border-slate-700/50 text-sm sm:text-base text-gray-300 leading-relaxed">
                    {faq.answer[language]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-700 bg-slate-950 px-4 sm:px-8 py-12 sm:py-16 text-gray-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto">
         

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {["Help Centre", "Account", "Media", "Jobs", "Terms", "Privacy", "Contact", "Legal", "Cookies", "Only Netflix"].map((item) => (
              <a key={item} href="#" className="hover:text-red-400 transition">
                {item}
              </a>
            ))}
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800/70 border border-slate-600 text-white text-xs px-3 py-2 rounded-lg hover:border-red-400/50 transition mb-6"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>

          <p className="text-xs text-gray-600">
            Questions? Contact us at <a href="tel:1-800-NETFLIX" className="text-red-400 hover:text-red-300">1-800-NETFLIX</a>
          </p>
        </div>
      </footer>

      {/* MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 max-w-4xl w-full rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-500/20">
            <div className="relative">
              <iframe
                src={selectedMovie.trailer}
                className="w-full h-48 sm:h-72 md:h-96"
                allowFullScreen
              />
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 bg-slate-950/70 hover:bg-slate-950 p-2 rounded-full transition shadow-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">{selectedMovie.title[language]}</h2>
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="border border-red-400/50 px-3 py-1 rounded-lg text-sm text-red-300">{selectedMovie.rating}</span>
                <span className="text-gray-400">{selectedMovie.year}</span>
              </div>
              <p className="text-red-300 text-sm font-semibold mb-4">{selectedMovie.genres[language]}</p>
              <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">{selectedMovie.description[language]}</p>
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-lg font-bold transition transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-600/30">
                  <Play size={18} fill="currentColor" />
                  Play
                </button>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-bold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}