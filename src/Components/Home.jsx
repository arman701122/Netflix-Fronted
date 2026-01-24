import { ChevronLeft, ChevronRight, Search, Bell, Play, Info, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

const movies = [
  {
    id: 1,
    title: { en: "Oppenheimer", hi: "ओपेनहाइमर" },
    year: "2023",
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
    year: "2024",
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
    year: "2023",
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
    year: "2022",
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
    year: "2023",
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
    year: "2022",
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
    year: "2023",
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


const faqs = [
  {
    question: { en: "What is Netflix?", hi: "Netflix क्या है?" },
    answer: { en: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.", hi: "Netflix एक स्ट्रीमिंग सेवा है जो हजारों इंटरनेट-कनेक्टेड डिवाइस पर विभिन्न प्रकार के टीवी शो, फिल्में, एनिमे, वृत्तचित्र और बहुत कुछ प्रदान करती है।" }
  },
  {
    question: { en: "How much does Netflix cost?", hi: "Netflix की कीमत कितनी है?" },
    answer: { en: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly price. Plans start at ₹149 per month.", hi: "आपके स्मार्टफोन, टैबलेट, स्मार्ट टीवी, लैपटॉप या स्ट्रीमिंग डिवाइस पर Netflix देखें, सभी एक निश्चित मासिक मूल्य पर। योजनाएं ₹149 प्रति माह से शुरू होती हैं।" }
  },
  {
    question: { en: "Where can I watch?", hi: "मैं कहां देख सकता हूं?" },
    answer: { en: "Watch anywhere, anytime. Sign in with your Netflix account to watch on any internet-connected device. You can stream on your TV, computer, phone, tablet, and more.", hi: "कहीं भी, कभी भी देखें। किसी भी इंटरनेट-कनेक्टेड डिवाइस पर देखने के लिए अपने Netflix खाते से साइन इन करें।" }
  },
  {
    question: { en: "How do I cancel?", hi: "मैं कैसे रद्द करूं?" },
    answer: { en: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.", hi: "Netflix लचकदार है। कोई परेशानी वाले अनुबंध नहीं हैं। आप आसानी से अपने खाते को ऑनलाइन रद्द कर सकते हैं।" }
  },
  {
    question: { en: "What can I watch on Netflix?", hi: "मैं Netflix पर क्या देख सकता हूं?" },
    answer: { en: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals, and more. Watch all you want, anytime you want.", hi: "Netflix में विशेषताएं, वृत्तचित्र, टीवी शो, एनिमे, पुरस्कार विजेता मूल और बहुत कुछ शामिल हैं।" }
  },
  {
    question: { en: "Is Netflix good for kids?", hi: "क्या Netflix बच्चों के लिए अच्छा है?" },
    answer: { en: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films.", hi: "Netflix बच्चों के अनुभव में माता-पिता को नियंत्रण देने के लिए परिवार के अनुकूल शो और फिल्मों को शामिल किया गया है।" }
  }
];

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [openIndex, setOpenIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);

 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setItemsPerView(2); // Mobile
    } else {
      setItemsPerView(4); // Laptop & Desktop
    }
    setStartIndex(0); // reset on resize
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


const visibleMovies = movies.slice(
  startIndex,
  startIndex + itemsPerView
);


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


  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* HEADER */}
     <header
  className={`fixed top-0 w-full z-40 px-4 sm:px-6 py-4 flex justify-between items-center transition-all ${
    scrollY > 10
      ? "bg-black/90 backdrop-blur"
      : "bg-gradient-to-b from-black/70 to-transparent"
  }`}
>
  {/* LOGO */}
  <h1 className="text-xl sm:text-2xl font-bold text-red-600">
    NETFLIX
  </h1>

  {/* RIGHT CONTROLS */}
  <div className="flex items-center gap-3 sm:gap-5">

    {/* SEARCH */}
    <button className="hover:text-red-600 transition">
      <Search size={20} />
    </button>

    {/* NOTIFICATION */}
    <button className="hover:text-red-600 transition">
      <Bell size={20} />
    </button>

    {/* LANGUAGE SELECT */}
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-black text-white border border-gray-600 px-2 py-1 text-xs sm:text-sm rounded
                 focus:outline-none hover:border-gray-400 transition"
    >
      <option value="en" className="bg-black text-white">
        English
      </option>
      <option value="hi" className="bg-black text-white">
        हिंदी
      </option>
    </select>

    {/* SIGN IN / SIGN UP */}
    <a
      href="/login"
      className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold
                 px-4 py-1.5 rounded transition"
    >
      {language === "en" ? "Sign In" : "साइन इन"}
    </a>

  </div>
</header>


      {/* HERO */}
      <section className="relative w-full h-screen flex items-center justify-start px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300"
          style={{
            backgroundImage: "url('bg-netflix.jpg')",
            transform: `scale(${1 + scrollY * 0.0005})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            {language === "en"
              ? "Unlimited movies, TV shows and more"
              : "असीमित फ़िल्में और टीवी शो"}
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-gray-200">
            {language === "en"
              ? "Watch anywhere. Cancel anytime."
              : "कहीं भी देखें। कभी भी रद्द करें।"}
          </p>
          <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row">
            <a
  href="https://www.netflix.com"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded font-bold hover:bg-gray-300 transition flex items-center justify-center gap-2"
>
  <Play size={20} />
  <span>{language === "en" ? "Play" : "चलाएं"}</span>
</a>

           <a
  href="https://www.netflix.com/browse"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gray-600/50 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-bold hover:bg-gray-600 transition flex items-center justify-center gap-2"
>
  <Info size={20} />
  <span>{language === "en" ? "More Info" : "और जानें"}</span>
</a>

          </div>
        </div>
      </section>

      {/* TRENDING ROW */}
     <section className="px-4 sm:px-6 lg:px-10 py-6 sm:py-12 -mt-24 relative z-20">
  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
    {language === "en" ? "Trending Now" : "अब ट्रेंडिंग"}
  </h3>

  <div className="relative group">

    {/* MOVIE ROW */}
    <div className="flex gap-3 overflow-hidden">
      {visibleMovies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => setSelectedMovie(movie)}
          className={`flex-shrink-0 cursor-pointer
            ${itemsPerView === 2 ? "w-1/2" : "w-1/4"}`}
        >
          <div className="relative overflow-hidden rounded-md">
            <img
              src={movie.img}
              className="w-full aspect-[2/3] object-cover transition-transform duration-300 hover:scale-110"
            />
           <div className="absolute inset-0 bg-black/0 hover:bg-black/40 
                transition flex items-center justify-center
                pointer-events-none">
  <Play
    size={48}
    className="opacity-0 hover:opacity-100 transition"
  />
</div>

          </div>

          <h4 className="mt-2 text-xs sm:text-sm font-semibold truncate">
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
      absolute left-1 top-1/2 -translate-y-1/2 z-10
      bg-black/70 hover:bg-black/90
      p-2 sm:p-3 rounded-full
      transition
      opacity-100 sm:opacity-0 sm:group-hover:opacity-100
    "
  >
    <ChevronLeft size={22} className="sm:size-[26]" />
  </button>
)}


    {/* RIGHT ARROW */}
   {startIndex + itemsPerView < movies.length && (
  <button
    onClick={next}
    className="
      absolute right-1 top-1/2 -translate-y-1/2 z-10
      bg-black/70 hover:bg-black/90
      p-2 sm:p-3 rounded-full
      transition
      opacity-100 sm:opacity-0 sm:group-hover:opacity-100
    "
  >
    <ChevronRight size={22} className="sm:size-[26]" />
  </button>
)}


  </div>
</section>


      {/* FAQ SECTION */}
      <section className="bg-black px-4 sm:px-6 lg:px-16 py-12 sm:py-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10">
            {language === "en"
              ? "Frequently Asked Questions"
              : "अक्सर पूछे जाने वाले प्रश्न"}
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 text-left text-base sm:text-lg md:text-xl font-medium hover:bg-gray-700 transition"
                >
                  <span>{faq.question[language]}</span>
                  <span className={`text-3xl transition-transform ${openIndex === index ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base md:text-lg text-gray-200 bg-gray-900 border-t border-gray-700 leading-relaxed">
                    {faq.answer[language]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10 sm:mt-12">
            <p className="text-base sm:text-lg mb-4 sm:mb-6">
              {language === "en"
                ? "Ready to watch? Enter your email to create or restart your membership."
                : "देखने के लिए तैयार हैं? अपनी सदस्यता बनाने या फिर से शुरू करने के लिए ईमेल दर्ज करें।"}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center max-w-2xl mx-auto">
              <input
                type="email"
                placeholder={language === "en" ? "Email address" : "ईमेल पता"}
                className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded bg-gray-800 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className="bg-red-600 hover:bg-red-700 px-4 sm:px-8 py-3 sm:py-4 rounded font-semibold text-sm sm:text-base transition whitespace-nowrap">
                {language === "en" ? "Get Started →" : "शुरू करें →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-800 px-4 sm:px-6 lg:px-16 py-10 sm:py-12 text-gray-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto">
          <p className="mb-6">
            {language === "en" ? "Questions? Call" : "सवाल? कॉल करें"}{" "}
            <a href="tel:000-800-040-1843" className="hover:text-white transition">
              000-800-040-1843
            </a>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3 sm:gap-y-4 mb-6 sm:mb-8">
            {[
              "FAQ",
              "Help Centre",
              "Account",
              "Media Centre",
              "Investor Relations",
              "Jobs",
              "Ways to Watch",
              "Terms of Use",
              "Privacy",
              "Cookie Preferences",
              "Corporate Information",
              "Contact Us",
              "Speed Test",
              "Legal Notices",
              "Only on Netflix"
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="mb-4 sm:mb-6">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black border border-gray-600 text-white text-xs sm:text-sm px-3 py-2 rounded hover:border-gray-400 transition"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          <p className="text-xs text-gray-500">
            Netflix India © 2024
          </p>
        </div>
      </footer>

      {/* MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 max-w-4xl w-full rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <iframe
                src={selectedMovie.trailer}
                className="w-full h-48 sm:h-72 md:h-96"
                allowFullScreen
              />
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black p-2 rounded-full transition"
              >
                ✕
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                    {selectedMovie.title[language]}
                  </h2>
                  <div className="flex gap-2 flex-wrap text-xs sm:text-sm text-gray-300">
                    <span className="border border-gray-500 px-2 py-1">{selectedMovie.rating}</span>
                    <span>{selectedMovie.year}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                {selectedMovie.genres[language]}
              </p>
              <p className="text-sm sm:text-base text-gray-200 mb-6 leading-relaxed">
                {selectedMovie.description[language]}
              </p>
              <div className="flex gap-2 sm:gap-4">
                <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded font-bold hover:bg-gray-300 transition flex items-center gap-2">
                  <Play size={18} />
                  <span className="text-sm sm:text-base">Play</span>
                </button>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="bg-gray-600/50 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-bold hover:bg-gray-600 transition text-sm sm:text-base"
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