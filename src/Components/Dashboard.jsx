import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Play,
  Search,
  Bell,
  User,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Home, Tv, Film, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import {  Plus, Check } from "lucide-react";

const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "Hollywood sci‑fi epic",
    image:
      "https://bigpicturefilmclub.com/wp-content/uploads/2024/03/dune2.jpg",
  },
  {
    id: 2,
    title: "Avatar: Fire And Ash",
    description: "Epic Hollywood sci‑fi adventure",
    image:
      "https://knightedgemedia.com/wp-content/uploads/2025/07/avatar-fire-and-ash-teaser-trailer-banner.jpg",
  },
  {
    id: 3,
    title: "Games Of Thrones",
    description: "Hollywood action war",
    image:
      "https://wallpapers.com/images/hd/throne-jon-snow-game-of-thrones-qyptpol8ztg2ihkb.jpg",
  },
  {
    id: 4,
    title: "Munkar",
    description: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BMmJmNmM1ZWUtNWI0ZC00YzRiLWE0YzItYzZhMGMwYjZjYmQ0XkEyXkFqcGc@._V1_.jpg",
  },
];

const categories = {
  Hollywood: [
    {
      id: 1,
      title: "Murder Mystery",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-v2p19IpAXJ1sa1bTNlW8UhP7cP258MtfA&s",
      trailer: "https://www.youtube.com/embed/5YEVQDr2f3Q",
    },
    {
      id: 2,
      title: "The Irishman",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfXS9T5q4DIce28B2Nx8QJpP7sR7bfblF-g&s",
      trailer: "https://www.youtube.com/embed/WHXxVmeGQUc",
    },
    {
      id: 3,
      title: "Dark",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6N9WKvhdxIL1V2WyhMNfEcrM51o04o9T7fg&s",
      trailer: "https://www.youtube.com/embed/ESEUoa-mz2c",
    },
    {
      id: 4,
      title: "ANACONDA",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIm0bRXWXp0mV6ruez85dhyHzYxiqDs7ALSQ&s",
      trailer: "https://www.youtube.com/embed/q0UxtQfgz0A",
    },
    {
      id: 13,
      title: "Avengers",
      img: "https://cdn.britannica.com/60/182360-050-CD8878D6/Avengers-Age-of-Ultron-Joss-Whedon.jpg",
      trailer: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    },
    {
      id: 14,
      title: "Stranger Things",
      img: "https://deadline.com/wp-content/uploads/2025/11/Stranger-Things-5_33a02d.jpg?w=1024",
      trailer: "https://www.youtube.com/embed/PssKpzB0Ah0",
    },
  ],
  Bollywood: [
    {
      id: 5,
      title: "Marjawa",
      img: "https://www.koimoi.com/wp-content/new-galleries/2019/11/box-office-marjaavaan-to-take-a-decent-opening-single-screens-are-the-key-on-the-first-day-001.jpg",
      trailer: "https://www.youtube.com/embed/L7TbPUOn1hc",
    },
    {
      id: 6,
      title: "Ek Deewane Ki Deewaniyat",
      img: "https://c.saavncdn.com/532/Deewaniyat-From-Ek-Deewane-Ki-Deewaniyat-Original-Motion-Picture-Soundtrack-Hindi-2025-20250827010315-500x500.jpg",
      trailer: "https://www.youtube.com/embed/y9jtbWNAvXc",
    },
    {
      id: 7,
      title: "Saiyara",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkrtRPzlwbYqEmj3P3siCZeEPYNy25rIVkw&s",
      trailer: "https://www.youtube.com/embed/gOOO7eZv0mI"
    },
    {
      id: 8,
      title: "Sikandar",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-YDVd4PxrdgK1r7Y_i2MT5U9ZCiOncSTyBA&s",
      trailer: "https://www.youtube.com/embed/4_FGQP9g02k",
    },
    {
      id: 15,
      title: "Border 2",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZY0ipr9LcZzsM802YqCRL9Ie3vCj9e8Lrqw&s",
      trailer: "https://www.youtube.com/embed/BgfL0zJnPug",
    },
    {
      id: 16,
      title: "12 Fail",
      img: "https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/HOTSTAR_DTH/MOVIE/690de3e84d854e0e7600479d/images/LANDSCAPE_169/1640216-h-6b1d26b33811?o=production",
      trailer: "https://www.youtube.com/embed/avD8D0q7gIw",
    },
  ],
  Chinese: [
    {
      id: 9,
      title: "Crouching Tiger",
      img: "https://images.justwatch.com/backdrop/336164598/s640/crouching-tiger-hidden-dragon-sword-of-destiny",
      trailer: "https://www.youtube.com/embed/a3sQIjbrMQw",
    },
    {
      id: 10,
      title: "Lord of the Monster",
      img: "https://m.media-amazon.com/images/I/91n7D2tvgML._AC_UF894,1000_QL80_.jpg",
      trailer: "https://www.youtube.com/embed/QNFQo2575pI",
    },
    {
      id: 11,
      title: "Ip Man 2",
      img: "https://m.media-amazon.com/images/M/MV5BOGVjMDEzNjMtMWJmMy00NDdjLWFkMzItOTBhZTE3OWU0YmM4XkEyXkFqcGc@._V1_.jpg",
      trailer: "https://www.youtube.com/embed/LSXdo4TTJ9A",
    },
    {
      id: 12,
      title: "The Wandering Earth",
      img: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/3353/1736871863353-i",
      trailer: "https://www.youtube.com/embed/0TDII5IkI3Y",
    },
    {
      id: 17,
      title: "The Monkey King",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAOzi-WR4azypn5jkmgMhSSS_QtIBKoYDzjg&s",
      trailer: "https://www.youtube.com/embed/8InLhRjFJVU",
    },
    {
      id: 18,
      title: "Journey to the West",
      img: "https://pic5.iqiyipic.com/image/20250325/21/0c/v_180118265_m_601_en_m1_1013_569.jpg",
      trailer: "https://www.youtube.com/embed/FJmAlL3AYHI",
    },
  ],
  Horror: [
    {
      id: 25,
      title: "The Conjuring",
      img: "https://m.media-amazon.com/images/M/MV5BM2U2NGE1OWQtN2FjNi00YmQ2LTliMDAtNzMyYzQ5YTJiNDFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://www.youtube.com/embed/FSAz556s0fM",
    },
    {
      id: 26,
      title: "Annabelle",
      img: "https://upload.wikimedia.org/wikipedia/en/9/90/Annabelle_film_poster.jpg",
      trailer: "https://www.youtube.com/embed/paFgQNPGlsg",
    },
    {
      id: 27,
      title: "IT",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfapkG2cy_IORECaazv_H8ameBppdWB4c_oA&s",
      trailer: "https://www.youtube.com/embed/xKJmEC5ieOk",
    },
    {
      id: 28,
      title: "1920",
      img: "https://m.media-amazon.com/images/I/816YpgC5GoL._AC_UF1000,1000_QL80_.jpg",
      trailer: "https://www.youtube.com/embed/GZrsEBQuhO0",
    },
    {
      id: 29,
      title: "1920 Evils Returns",
      img: "https://m.media-amazon.com/images/M/MV5BZjRjNDJhMWEtNmJkMi00ZDViLWE1YmEtYzFhZWRjZTI4ZjQ2XkEyXkFqcGc@._V1_.jpg",
      trailer: "https://www.youtube.com/embed/dxK0Z_VaLtk",
    },
    {
      id: 30,
      title: "Evil Dead Rise",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsn77DDb-bL2sJKUDWLluNyRnEH1KW92eEA&s",
      trailer: "https://www.youtube.com/embed/4weFxATBEiY",
    },
  ],
};

const MovieCard = ({ movie, onPlayTrailer }) => (
  <div
    onClick={() => onPlayTrailer(movie.trailer)}
    className="group relative overflow-hidden rounded-xl aspect-video
               cursor-pointer flex-shrink-0
               shadow-lg hover:shadow-2xl hover:shadow-red-500/20
               transition-all duration-300
               w-[160px] sm:w-64"
  >
    <img
      src={movie.img}
      alt={movie.title}
      className="w-full h-full object-cover
                 transition-transform duration-500
                 sm:group-hover:scale-110"
    />

    {/* Overlay (always visible on mobile, hover on desktop) */}
    <div
      className="absolute inset-0
                 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                 opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                 transition-opacity duration-300
                 flex items-end p-3"
    >
      <div className="flex items-center gap-2">
        <div className="bg-red-600 p-2 rounded-full">
          <Play size={16} className="text-white fill-white" />
        </div>
        
        <span className="text-white font-semibold text-xs sm:text-sm truncate">
          {movie.title}
        </span>
      </div>
    </div>
  </div>
);


export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const scrollRefs = useRef({});

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const filtered = {};
    const lower = search.toLowerCase();
    Object.entries(categories).forEach(([cat, items]) => {
      const matched = items.filter((item) =>
        item.title.toLowerCase().includes(lower)
      );
      if (matched.length) filtered[cat] = matched;
    });
    return filtered;
  }, [search]);

  // Auto-rotate hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollCategory = (category, dir) => {
    const ref = scrollRefs.current[category];
    if (ref) {
      const scrollAmount = ref.clientWidth / 1.25;
      ref.scrollLeft += dir === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-x-hidden">
      {/* NAVBAR */}
 <nav
  className={`fixed top-0 left-0 w-full z-50
    px-4 sm:px-8 py-4
    flex justify-between items-center
    transition-all duration-500 ease-in-out
    ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
    ${lastScrollY > 50
      ? "bg-slate-900/80 backdrop-blur-xl"
      : "bg-transparent"}
  `}
>
  {/* Logo */}
 <div className="flex items-center select-none">
  <Link
    to="/"
    className="flex items-center hover:opacity-90 transition"
  >
    <img
      src="/Logonetflix.png"
      alt="Netflix"
      className="h-10 sm:h-12 object-contain"
      draggable="false"
    />
  </Link>
</div>

  {/* Desktop Links */}
  <div className="hidden md:flex gap-8">
    <button className="hover:text-red-400 transition font-medium">
      Home
    </button>
    <button className="hover:text-red-400 transition font-medium">
      TV Shows
    </button>
    <button className="hover:text-red-400 transition font-medium">
      Movies
    </button>
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-3 sm:gap-6">
    {/* Desktop Search */}
    <div className="hidden sm:flex items-center bg-slate-800/60 hover:bg-slate-800 rounded-full px-4 py-2 transition w-44 md:w-64">
      <Search size={18} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent ml-2 outline-none text-sm w-full placeholder-gray-500 text-white"
      />
    </div>

    {/* Notification */}
    <button className="hidden sm:block text-gray-400 hover:text-red-400 transition">
      <Bell size={20} />
    </button>

    {/* Profile Dropdown */}
    <div className="relative hidden sm:block">
      <button
        onClick={() => setProfileDropdown(!profileDropdown)}
        className="text-gray-400 hover:text-red-400 transition rounded-full p-1 hover:bg-slate-700/40"
      >
        <User size={20} />
      </button>

      {profileDropdown && (
        <div className="absolute right-0 mt-3 w-48 bg-slate-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-slate-700/50 overflow-hidden">
          <button className="w-full px-4 py-3 text-sm text-left hover:bg-slate-700/50 transition border-b border-slate-700/50">
            Profile
          </button>
          <button className="w-full px-4 py-3 text-sm text-left hover:bg-slate-700/50 transition border-b border-slate-700/50">
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-sm text-left text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>

    {/* Mobile Icons */}
    <button
      onClick={() => setShowSearch(!showSearch)}
      className="sm:hidden text-gray-400 hover:text-red-400 transition p-2 rounded-full hover:bg-slate-700/30"
    >
      <Search size={20} />
    </button>

    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="sm:hidden text-gray-400 hover:text-red-400 transition p-2 rounded-full hover:bg-slate-700/30"
    >
      {menuOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  </div>
</nav>


      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg px-4 py-3 sm:hidden">
          <div className="flex items-center bg-slate-800 rounded-full px-4 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="bg-transparent ml-2 outline-none text-sm w-full placeholder-gray-500"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg sm:hidden">
          <div className="flex flex-col gap-4 p-4">
            <button className="text-left hover:text-red-400 transition font-medium py-2">
              Home
            </button>
            <button className="text-left hover:text-red-400 transition font-medium py-2">
              TV Shows
            </button>
            <button className="text-left hover:text-red-400 transition font-medium py-2">
              Movies
            </button>
            <hr className="border-slate-700/50" />
            <button className="text-left hover:text-red-400 transition py-2">
              Notifications
            </button>
            <button className="text-left hover:text-red-400 transition py-2">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 text-white py-2 rounded-lg font-semibold transition mt-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Add padding for header */}
      <div className="pt-14 sm:pt-16">
        {/* HERO SLIDER */}
        <div className="relative w-full h-96 sm:h-[500px] overflow-hidden rounded-b-2xl">
          {movies.map((movie, i) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
              <div className="absolute bottom-10 left-6 sm:left-10">
                <h1 className="text-3xl sm:text-5xl font-bold mb-3">
                  {movie.title}
                </h1>
                <p className="text-gray-300 mb-6 text-sm sm:text-base">
                  {movie.description}
                </p>
  <div className="flex items-center gap-4">
  {/* PLAY BUTTON */}
  <button
    className="flex items-center gap-2 bg-white text-black
               px-6 py-2 rounded-md font-semibold
               hover:bg-gray-200 transition"
  >
    <Play size={20} className="fill-black" />
    Play
  </button>

  {/* MY LIST BUTTON */}
  <button
    className="flex items-center gap-2 bg-slate-700/70 text-white
               px-6 py-2 rounded-md font-semibold
               hover:bg-slate-600 transition"
  >
    <Plus size={20} />
    My List
  </button>
</div>



              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-red-600 w-8 h-3 rounded-full"
                    : "bg-white/50 hover:bg-white/70 w-3 h-3 rounded-full"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="px-4 sm:px-8 py-12">
        {Object.keys(filteredCategories).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              No results for "<span className="text-red-400">{search}</span>"
            </p>
          </div>
        ) : (
          Object.entries(filteredCategories).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-red-700 rounded" />
                {category}
              </h2>

              <div className="group relative">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollCategory(category, "left")}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 p-2 sm:p-3 rounded-full opacity-0 sm:group-hover:opacity-100 hover:opacity-100 transition shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Scroll Container */}
                <div
                  ref={(el) => (scrollRefs.current[category] = el)}
                  className="flex gap-2 sm:gap-4 overflow-x-auto scroll-smooth hide-scrollbar pb-2"
                >
                  {items.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onPlayTrailer={setPlayingTrailer}
                    />
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollCategory(category, "right")}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 p-2 sm:p-3 rounded-full opacity-0 sm:group-hover:opacity-100 hover:opacity-100 transition shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      

      {/* TRAILER MODAL */}
      {playingTrailer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setPlayingTrailer(null)}
              className="absolute top-4 right-4 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full z-10 transition shadow-lg"
            >
              <X size={24} />
            </button>
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={playingTrailer}
                title="Movie Trailer"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* FIXED BOTTOM NAVBAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-slate-950/95 to-slate-950/80 backdrop-blur-lg border-t border-slate-700/50">

        <div className="flex justify-around items-center py-3 px-2">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 transition">
            <Home size={22} />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 transition">
            <Tv size={22} />
            <span className="text-xs font-semibold">Series</span>
          </button>

          {/* CENTER LOGO BUTTON */}
    <button
  className="w-16 h-16 -mt-10 rounded-full
             bg-red-600 hover:bg-red-500
             flex items-center justify-center
             shadow-2xl shadow-red-600/50
             transition transform hover:scale-110 active:scale-95"
>
  <Play size={26} className="text-white ml-1" />
</button>


          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 transition">
            <Film size={22} />
            <span className="text-xs font-semibold">Movies</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 transition">
            <Settings size={22} />
            <span className="text-xs font-semibold">Settings</span>
          </button>
        </div>
      </div>

      {/* Add padding for bottom nav */}
      <div  />

      {/* FOOTER */}
<footer className="bg-slate-950/50 border-t border-slate-700/50 text-gray-400 text-sm mt-8">

        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="mb-6">
            Questions? Call{" "}
            <span className="text-red-400 hover:text-red-300 cursor-pointer transition">
              70-11-22-7136
            </span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
              "Only on Netflix",
            ].map((item) => (
              <span
                key={item}
                className="hover:text-red-400 cursor-pointer transition"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-600">
            © 2024 Netflix. All rights reserved.
          </p>
        </div>
      </footer>

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