import React, { useState, useMemo, useRef, useEffect } from "react";
import { Play, Search, Bell, User, X, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const movies = [
  {
    id: 1,
    title: "Stranger Things",
    description: "A science fiction horror series",
    image: "https://deadline.com/wp-content/uploads/2025/11/Stranger-Things-5_33a02d.jpg", // HD poster
  },
  {
    id: 2,
    title: "Avatar",
    description: "Epic sci-fi adventure",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg", // HD movie poster
  },
  {
    id: 3,
    title: "Border 2",
    description: "Thrilling action drama",
    image: "https://m.media-amazon.com/images/M/MV5BMTUxZjgwNTItMjQ5Yy00NGU4LTlhMGYtY2ZiN2Y2ZmQ1MTRiXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 4,
    title: "Toxic",
    description: "Dark fairy tale",
    image: "https://m.media-amazon.com/images/M/MV5BMDZiNzAwZTQtYWIwMC00ODA0LWJiOGMtZTgzZGYzYzMxMDNiXkEyXkFqcGc@._V1_.jpg",
  },
];


const categories = {
  Hollywood: [
    { id: 1, title: "Murder Mystery", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-v2p19IpAXJ1sa1bTNlW8UhP7cP258MtfA&s", trailer: "https://www.youtube.com/embed/ELeMaP8EPAA" },
    { id: 2, title: "The Irishman", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfXS9T5q4DIce28B2Nx8QJpP7sR7bfblF-g&s", trailer: "https://www.youtube.com/embed/WHXxVmeKQKE" },
    { id: 3, title: "Dark", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6N9WKvhdxIL1V2WyhMNfEcrM51o04o9T7fg&s", trailer: "https://www.youtube.com/embed/ky8HHR3AQLU" },
    { id: 4, title: "Growing Deon", img: "https://images.justwatch.com/backdrop/262865297/s640/raising-dion", trailer: "https://www.youtube.com/embed/9L1B0VZVj9g" },
    { id: 13, title: "Avengers", img: "https://cdn.britannica.com/60/182360-050-CD8878D6/Avengers-Age-of-Ultron-Joss-Whedon.jpg", trailer: "https://www.youtube.com/embed/tmeOjFno6Do" },
    { id: 14, title: "Stranger Things", img: "https://deadline.com/wp-content/uploads/2025/11/Stranger-Things-5_33a02d.jpg?w=1024", trailer: "https://www.youtube.com/embed/b9ncQlWcBcY" },
  ],
  Bollywood: [
    { id: 5, title: "Marjawa", img: "https://www.koimoi.com/wp-content/new-galleries/2019/11/box-office-marjaavaan-to-take-a-decent-opening-single-screens-are-the-key-on-the-first-day-001.jpg", trailer: "https://www.youtube.com/embed/LfqLRxiXqQw" },
    { id: 6, title: "Ek Deewane Ki Deewaniyat", img: "https://c.saavncdn.com/532/Deewaniyat-From-Ek-Deewane-Ki-Deewaniyat-Original-Motion-Picture-Soundtrack-Hindi-2025-20250827010315-500x500.jpg", trailer: "https://www.youtube.com/embed/WLVNhz5rWcw" },
    { id: 7, title: "Saiyara", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkrtRPzlwbYqEmj3P3siCZeEPYNy25rIVkw&s", trailer: "https://www.youtube.com/embed/6JnN1DmbqoE" },
    { id: 8, title: "Sikandar", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-YDVd4PxrdgK1r7Y_i2MT5U9ZCiOncSTyBA&s", trailer: "https://www.youtube.com/embed/dKCL_d6ZCUA" },
    { id: 15, title: "Border 2", img: "https://m.media-amazon.com/images/M/MV5BMTUxZjgwNTItMjQ5Yy00NGU4LTlhMGYtY2ZiN2Y2ZmQ1MTRiXkEyXkFqcGc@._V1_.jpg", trailer: "https://www.youtube.com/embed/qLCfKEDEPOA" },
    { id: 16, title: "12 Fail", img: "https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/HOTSTAR_DTH/MOVIE/690de3e84d854e0e7600479d/images/LANDSCAPE_169/1640216-h-6b1d26b33811?o=production", trailer: "https://www.youtube.com/embed/FkT9sR2B11k" },
  ],
  Chinese: [
    { id: 9, title: "Crouching Tiger", img: "https://images.justwatch.com/backdrop/336164598/s640/crouching-tiger-hidden-dragon-sword-of-destiny", trailer: "https://www.youtube.com/embed/d0aIqx1MCgA" },
    { id: 10, title: "The Lord of Dragon", img: "https://m.media-amazon.com/images/I/91n7D2tvgML._AC_UF894,1000_QL80_.jpg", trailer: "https://www.youtube.com/embed/9qDdYVRIDT4" },
    { id: 11, title: "Ip Man", img: "https://m.media-amazon.com/images/M/MV5BOGVjMDEzNjMtMWJmMy00NDdjLWFkMzItOTBhZTE3OWU0YmM4XkEyXkFqcGc@._V1_.jpg", trailer: "https://www.youtube.com/embed/EYVEh_TnbNg" },
    { id: 12, title: "The Wandering Earth", img: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/3353/1736871863353-i", trailer: "https://www.youtube.com/embed/mJnKmE5rddE" },
    { id: 17, title: "The Monkey King", img: "https://images.justwatch.com/poster/35414272/s718/the-monkey-king.jpg", trailer: "https://www.youtube.com/embed/pOF5aEwKF9I" },
    { id: 18, title: "Journey to the West", img: "https://m.media-amazon.com/images/M/MV5BYTM2ZDliMjEtZmUyYy00Zjk0LWJhZWQtYTYwMzBlZjA3ZTNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", trailer: "https://www.youtube.com/embed/0MXYjAYH8NU" },
  ],
  Horror: [
    { id: 25, title: "The Conjuring", img: "https://m.media-amazon.com/images/M/MV5BM2U2NGE1OWQtN2FjNi00YmQ2LTliMDAtNzMyYzQ5YTJiNDFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", trailer: "https://www.youtube.com/embed/k10ETZ41T5U" },
    { id: 26, title: "Annabelle", img: "https://upload.wikimedia.org/wikipedia/en/9/90/Annabelle_film_poster.jpg", trailer: "https://www.youtube.com/embed/Ot8pWtIXIek" },
    { id: 27, title: "IT", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfapkG2cy_IORECaazv_H8ameBppdWB4c_oA&s", trailer: "https://www.youtube.com/embed/9Cg0_PbSmJI" },
    { id: 28, title: "1920", img: "https://m.media-amazon.com/images/I/816YpgC5GoL._AC_UF1000,1000_QL80_.jpg", trailer: "https://www.youtube.com/embed/QJVhIwzXpJA" },
    { id: 29, title: "1920 Evils Returns", img: "https://m.media-amazon.com/images/M/MV5BZjRjNDJhMWEtNmJkMi00ZDViLWE1YmEtYzFhZWRjZTI4ZjQ2XkEyXkFqcGc@._V1_.jpg", trailer: "https://www.youtube.com/embed/Vm28V3w5uM4" },
    { id: 30, title: "Evil Dead Rise", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsn77DDb-bL2sJKUDWLluNyRnEH1KW92eEA&s", trailer: "https://www.youtube.com/embed/GY4BgdUSpbE" },
  ],
};


export default function NetflixPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRefs = useRef({});

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const filtered = {};
    const lower = search.toLowerCase();
    Object.entries(categories).forEach(([cat, items]) => {
      const matched = items.filter(item => item.title.toLowerCase().includes(lower));
      if (matched.length) filtered[cat] = matched;
    });
    return filtered;
  }, [search]);

  // Auto slide for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollCategory = (category, dir) => {
    const ref = scrollRefs.current[category];
    if (ref) {
      const scrollAmount = ref.clientWidth / 1.25;
      ref.scrollLeft += dir === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const MovieCard = ({ movie }) => (
    <div
      onClick={() => movie.trailer && setPlayingTrailer(movie.trailer)}
      className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer flex-shrink-0"
    >
      <img
        src={movie.img || movie.image}
        alt={movie.title}
        className="w-full h-full object-contain sm:object-cover object-center group-hover:scale-105 transition duration-300"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <button className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition">
          <Play size={24} fill="white" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
        <p className="text-xs sm:text-sm font-semibold line-clamp-2">{movie.title}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-red-600 text-2xl sm:text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>NETFLIX</h1>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Bell size={22} className="hover:text-red-600 cursor-pointer" />
            <User size={22} className="hover:text-red-600 cursor-pointer" />
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded font-semibold"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>

          {/* Mobile */}
          <div className="sm:hidden flex items-center gap-3">
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search size={20} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="sm:hidden px-4 py-2 border-t border-gray-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden px-4 py-2 border-t border-gray-800 space-y-2">
            <button className="w-full flex items-center gap-2 hover:text-red-600 text-sm">
              <Bell size={18} /> Notifications
            </button>
            <button className="w-full flex items-center gap-2 hover:text-red-600 text-sm">
              <User size={18} /> Profile
            </button>
            <button
              className="w-full bg-red-600 hover:bg-red-700 py-1 rounded font-semibold"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* HERO SLIDER */}
      <div className="relative h-96 sm:h-[500px] overflow-hidden">
        {movies.map((movie, i) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-red-600" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-4 sm:px-8 py-6 space-y-6 pb-20">
        {Object.keys(filteredCategories).length === 0 ? (
          <div className="text-center py-20 text-gray-400">No results for "{search}"</div>
        ) : (
          Object.entries(filteredCategories).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-red-500">{category}</h2>
              <div className="relative group">
                <button
                  onClick={() => scrollCategory(category, "left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-full opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>

                <div
                  ref={el => scrollRefs.current[category] = el}
                  className="flex gap-2 sm:gap-4 overflow-x-auto scroll-smooth hide-scrollbar"
                >
                  {items.map(movie => (
                    <div key={movie.id} className="w-36 sm:w-48 flex-shrink-0">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollCategory(category, "right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-full opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* TRAILER MODAL */}
      {playingTrailer && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setPlayingTrailer(null)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-10"
            >
              <X size={24} />
            </button>
            <iframe src={playingTrailer} className="w-full h-full" allowFullScreen title="Trailer" />
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}