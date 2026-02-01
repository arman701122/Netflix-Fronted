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
  // 🎬 MOVIES
  {
    id: 1,
    title: "Murder Mystery",
    type: "movie",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-v2p19IpAXJ1sa1bTNlW8UhP7cP258MtfA&s",
    trailer: "https://www.youtube.com/embed/5YEVQDr2f3Q",
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    type: "movie",
    img: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_UF1000,1000_QL80_.jpg",
    trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
  },
  {
    id: 3,
    title: "Inception",
    type: "movie",
    img: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_UF1000,1000_QL80_.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    id: 4,
    title: "Interstellar",
    type: "movie",
    img: "https://www.tallengestore.com/cdn/shop/products/Interstellar_-_Tallenge_Hollywood_Sci-Fi_Art_Movie_Poster_Collection_6400e127-641e-4478-8a06-f699ae526fad.jpg?v=1577693302",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 5,
    title: "Joker",
    type: "movie",
    img: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_UF1000,1000_QL80_.jpg",
    trailer: "https://www.youtube.com/embed/zAGVQLHvwOY",
  },

  // 📺 TV SHOWS
  {
    id: 6,
    title: "Stranger Things",
    type: "tv",
    img: "https://deadline.com/wp-content/uploads/2025/11/Stranger-Things-5_33a02d.jpg?w=1024",
    trailer: "https://www.youtube.com/embed/PssKpzB0Ah0",
  },
  {
    id: 7,
    title: "The Irishman",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfXS9T5q4DIce28B2Nx8QJpP7sR7bfblF-g&s",
    trailer: "https://www.youtube.com/embed/WHXxVmeGQUc",
  },
  {
    id: 8,
    title: "Dark",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6N9WKvhdxIL1V2WyhMNfEcrM51o04o9T7fg&s",
    trailer: "https://www.youtube.com/embed/ESEUoa-mz2c",
  },
  {
    id: 9,
    title: "Money Heist",
    type: "tv",
    img: "https://m.media-amazon.com/images/I/81D+KJkO4SL._AC_UF1000,1000_QL80_.jpg",
    trailer: "https://www.youtube.com/embed/_InqQJRqGW4",
  },
  {
    id: 10,
    title: "Breaking Bad",
    type: "tv",
    img: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/breaking_bad_4.png",
    trailer: "https://www.youtube.com/embed/HhesaQXLuRY",
  },
],

Bollywood: [
  // 🎬 MOVIES
  {
    id: 5,
    title: "Marjaavaan",
    type: "movie",
    img: "https://www.koimoi.com/wp-content/new-galleries/2019/11/box-office-marjaavaan-to-take-a-decent-opening-single-screens-are-the-key-on-the-first-day-001.jpg",
    trailer: "https://www.youtube.com/embed/L7TbPUOn1hc",
  },
  {
    id: 6,
    title: "12th Fail",
    type: "movie",
    img: "https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/HOTSTAR_DTH/MOVIE/690de3e84d854e0e7600479d/images/LANDSCAPE_169/1640216-h-6b1d26b33811?o=production",
    trailer: "https://www.youtube.com/embed/avD8D0q7gIw",
  },
  {
    id: 7,
    title: "Border 2",
    type: "movie",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZY0ipr9LcZzsM802YqCRL9Ie3vCj9e8Lrqw&s",
    trailer: "https://www.youtube.com/embed/BgfL0zJnPug",
  },
  {
    id: 8,
    title: "Sikandar",
    type: "movie",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-YDVd4PxrdgK1r7Y_i2MT5U9ZCiOncSTyBA&s",
    trailer: "https://www.youtube.com/embed/4_FGQP9g02k",
  },
  {
    id: 9,
    title: "Ek Deewane Ki Deewaniyat",
    type: "movie",
    img: "https://c.saavncdn.com/532/Deewaniyat-From-Ek-Deewane-Ki-Deewaniyat-Original-Motion-Picture-Soundtrack-Hindi-2025-20250827010315-500x500.jpg",
    trailer: "https://www.youtube.com/embed/y9jtbWNAvXc",
  },

  // 📺 TV SHOWS
  {
    id: 10,
    title: "Sacred Games",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWF7qS2ghqTn_40gkmt3YBtpPV4FoTlWcYiw&s",
    trailer: "https://www.youtube.com/embed/w-Xe8gLBkYQ",
  },
  {
    id: 11,
    title: "Mirzapur",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROSDmDv8xJ-9Wl2q3a3XHzyHpOwIIgnQWHIg&s",
    trailer: "https://www.youtube.com/embed/ZNeGF-PvRHY",
  },
  {
    id: 12,
    title: "The Family Man",
    type: "tv",
    img: "https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcIQS3323bjVMUmlJyasEsryVoCTMiI_etHtIpaeGxXg00J6Zv-pHGrP2BjPBLdXPete--JpQJQCbU3f1-C7wQIqtO4H6LTVbpK5.jpg?r=dc9",
    trailer: "https://www.youtube.com/embed/XatRGut65VI",
  },
  {
    id: 13,
    title: "Asur",
    type: "tv",
    img: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/5412/1735212575412-i",
    trailer: "https://www.youtube.com/embed/6tO8p0Wn3qE",
  },
  {
    id: 14,
    title: "Paatal Lok",
    type: "tv",
    img: "https://sm.mashable.com/mashable_in/seo/default/paatal-lok-review-an-analysis-of-indias-rotting-heart-led-by_j939.jpg",
    trailer: "https://www.youtube.com/embed/cx2y3f2xZgA",
  },
],

Chinese: [
  // 🎬 MOVIES
  {
    id: 9,
    title: "Crouching Tiger, Hidden Dragon",
    type: "movie",
    img: "https://images.justwatch.com/backdrop/336164598/s640/crouching-tiger-hidden-dragon-sword-of-destiny",
    trailer: "https://www.youtube.com/embed/a3sQIjbrMQw",
  },
  {
    id: 10,
    title: "Ip Man 2",
    type: "movie",
    img: "https://m.media-amazon.com/images/M/MV5BOGVjMDEzNjMtMWJmMy00NDdjLWFkMzItOTBhZTE3OWU0YmM4XkEyXkFqcGc@._V1_.jpg",
    trailer: "https://www.youtube.com/embed/LSXdo4TTJ9A",
  },
  {
    id: 11,
    title: "The Wandering Earth",
    type: "movie",
    img: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/3353/1736871863353-i",
    trailer: "https://www.youtube.com/embed/0TDII5IkI3Y",
  },
  {
    id: 12,
    title: "The Monkey King",
    type: "movie",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAOzi-WR4azypn5jkmgMhSSS_QtIBKoYDzjg&s",
    trailer: "https://www.youtube.com/embed/8InLhRjFJVU",
  },
  {
    id: 13,
    title: "Journey to the West",
    type: "movie",
    img: "https://pic5.iqiyipic.com/image/20250325/21/0c/v_180118265_m_601_en_m1_1013_569.jpg",
    trailer: "https://www.youtube.com/embed/FJmAlL3AYHI",
  },

  // 📺 TV SHOWS
  {
    id: 14,
    title: "The Untamed",
    type: "tv",
    img: "https://m.media-amazon.com/images/S/pv-target-images/d14d8b877114758a1ffea320f34ae6abb28273449cdd13f0c24bd15bd9bf9651.jpg",
    trailer: "https://www.youtube.com/embed/3P7yJtZp1pA",
  },
  {
    id: 15,
    title: "Ashes of Love",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6xnzC5URtUBwhpUKMHye62E9RBSPBuSXPJg&s",
    trailer: "https://www.youtube.com/embed/JY9Jw4q7T0U",
  },
  {
    id: 16,
    title: "Love Between Fairy and Devil",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQER3khX4-ti4RDflkzr8wncZLBirUM29KwIQ&s",
    trailer: "https://www.youtube.com/embed/btYf5tY6RkM",
  },
  {
    id: 17,
    title: "The Longest Day in Chang'an",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYjvxddRo0ktDazRYcGISOyFGjpDrK_K1UBw&s",
    trailer: "https://www.youtube.com/embed/rJzJ4yM0G5E",
  },
  {
    id: 18,
    title: "Day and Night",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBMEUrfKMWXy-co9fRjXMdWPUOLtXIScMvA&s",
    trailer: "https://www.youtube.com/embed/4l1Kz2yYy5U",
  },
],

Horror: [
  // 🎬 MOVIES
  {
    id: 25,
    title: "The Conjuring",
    type: "movie",
    img: "https://m.media-amazon.com/images/M/MV5BM2U2NGE1OWQtN2FjNi00YmQ2LTliMDAtNzMyYzQ5YTJiNDFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://www.youtube.com/embed/FSAz556s0fM",
  },
  {
    id: 26,
    title: "Annabelle",
    type: "movie",
    img: "https://upload.wikimedia.org/wikipedia/en/9/90/Annabelle_film_poster.jpg",
    trailer: "https://www.youtube.com/embed/paFgQNPGlsg",
  },
  {
    id: 27,
    title: "IT",
    type: "movie",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfapkG2cy_IORECaazv_H8ameBppdWB4c_oA&s",
    trailer: "https://www.youtube.com/embed/xKJmEC5ieOk",
  },
  {
    id: 28,
    title: "1920",
    type: "movie",
    img: "https://m.media-amazon.com/images/I/816YpgC5GoL._AC_UF1000,1000_QL80_.jpg",
    trailer: "https://www.youtube.com/embed/GZrsEBQuhO0",
  },
  {
    id: 29,
    title: "Evil Dead Rise",
    type: "movie",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsn77DDb-bL2sJKUDWLluNyRnEH1KW92eEA&s",
    trailer: "https://www.youtube.com/embed/4weFxATBEiY",
  },

  // 📺 TV SHOWS
  {
    id: 30,
    title: "The Haunting of Hill House",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_A_dqlx2LMW2oS6HEHlbTusNBBIYj-0ERQ&s",
    trailer: "https://www.youtube.com/embed/G9OzG53VwIk",
  },
  {
    id: 31,
    title: "The Haunting of Bly Manor",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlWwvANEoPnGaux-5e9BQIO2IfBrSv1vcA-g&s",
    trailer: "https://www.youtube.com/embed/tykS7QfTWMQ",
  },
  {
    id: 32,
    title: "Marianne",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQss3e6e4mNMkJSDNWgQPCjMeCMquKhReo39g&s",
    trailer: "https://www.youtube.com/embed/q99HbUjvN1M",
  },
  {
    id: 33,
    title: "The Exorcist (TV Series)",
    type: "tv",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNHwFzUggZ_Cu3vIPZWaXP5adk7rIHSZUu1w&s",
    trailer: "https://www.youtube.com/embed/2P9UuYb9QbA",
  },
  {
    id: 34,
    title: "From",
    type: "tv",
    img: "https://m.media-amazon.com/images/S/pv-target-images/5d71845d45c14339aef5e7ccaa2602c2d8dfc9866c654a0187339775a601e321.jpg",
    trailer: "https://www.youtube.com/embed/pDHqAj4eJcM",
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
  const [activeTab, setActiveTab] = useState("home");
  
// home | tv | movies

  const scrollRefs = useRef({});

const filteredCategories = useMemo(() => {
  let base = categories;

  // SEARCH FILTER
  if (search.trim()) {
    const filtered = {};
    const lower = search.toLowerCase();

    Object.entries(categories).forEach(([cat, items]) => {
      const matched = items.filter((item) =>
        item.title.toLowerCase().includes(lower)
      );
      if (matched.length) filtered[cat] = matched;
    });

    base = filtered;
  }

  // TAB FILTER
  if (activeTab === "home") return base;

  const tabFiltered = {};
  Object.entries(base).forEach(([cat, items]) => {
    const matched = items.filter((item) =>
      activeTab === "movies"
        ? item.type === "movie"
        : item.type === "tv"
    );
    if (matched.length) tabFiltered[cat] = matched;
  });

  return tabFiltered;
}, [search, activeTab]);


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
      ? "bg-slate-900/10 "
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
   <button
  onClick={() => setActiveTab("home")}
  className={`font-medium transition ${
    activeTab === "home" ? "text-red-400" : "hover:text-red-400"
  }`}
>
  Home
</button>

<button
  onClick={() => setActiveTab("tv")}
  className={`font-medium transition ${
    activeTab === "tv" ? "text-red-400" : "hover:text-red-400"
  }`}
>
  TV Shows
</button>

<button
  onClick={() => setActiveTab("movies")}
  className={`font-medium transition ${
    activeTab === "movies" ? "text-red-400" : "hover:text-red-400"
  }`}
>
  Movies
</button>

  </div>

  {/* Right Section */}
  <div className="flex items-center gap-3 sm:gap-6">
    {/* Desktop Search */}
    <div className="hidden sm:flex items-center bg-slate-800/60 hover:bg-slate-800 rounded-full px-4 py-2 transition w-44 md:w-64">
      <Search size={18} className="text-white" />
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent ml-2 outline-none text-sm w-full placeholder-white text-white"
      />
    </div>
    {/* Profile Dropdown */}
    <div className="relative hidden sm:block">
      <button
        onClick={() => setProfileDropdown(!profileDropdown)}
        className="text-white hover:text-red-400 transition rounded-full p-1 hover:bg-slate-700/40"
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
            <Search size={18} className="text-white" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="bg-transparent ml-2 outline-none text-sm w-full placeholder-white"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
    {menuOpen && (
  <div className="fixed top-16 inset-x-0 z-40 sm:hidden">
    <div className="bg-slate-900/60 backdrop-blur-lg border-b border-slate-700/50">
      <div className="flex flex-col gap-4 p-4">

        {[
          { key: "home", label: "Home" },
          { key: "tv", label: "TV Shows" },
          { key: "movies", label: "Movies" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveTab(item.key)
              setMenuOpen(false)
            }}
            className={`text-left font-medium transition ${
              activeTab === item.key
                ? "text-red-400"
                : "text-white hover:text-red-400"
            }`}
          >
            {item.label}
          </button>
        ))}

        <hr className="border-slate-700/50" />

        <button
          onClick={() => setMenuOpen(false)}
          className="text-left text-white hover:text-red-400 transition py-2"
        >
          Notifications
        </button>

        <button
          onClick={() => setMenuOpen(false)}
          className="text-left text-white hover:text-red-400 transition py-2"
        >
          Profile
        </button>

        <button
          onClick={() => {
            handleLogout()
            setMenuOpen(false)
          }}
          className="w-full bg-gradient-to-r from-red-600/80 to-red-700/80
                     hover:from-red-600 hover:to-red-700
                     text-white py-2 rounded-lg font-semibold transition mt-2"
        >
          Logout
        </button>

      </div>
    </div>
  </div>
)}

      {/* Add padding for header */}
      <div className="pt-1 sm:pt-2">
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
         <button
  onClick={() => setActiveTab("home")}
  className={`flex flex-col items-center gap-1 transition ${
    activeTab === "home" ? "text-red-400" : "text-gray-400 hover:text-red-400"
  }`}
>
  <Home size={22} />
  <span className="text-xs font-semibold">Home</span>
</button>
          <button
  onClick={() => setActiveTab("tv")}
  className={`flex flex-col items-center gap-1 transition ${
    activeTab === "tv" ? "text-red-400" : "text-gray-400 hover:text-red-400"
  }`}
>
  <Tv size={22} />
  <span className="text-xs font-semibold">TV Shows</span>
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

<button
  onClick={() => setActiveTab("movies")}
  className={`flex flex-col items-center gap-1 transition ${
    activeTab === "movies" ? "text-red-400" : "text-gray-400 hover:text-red-400"
  }`}
>
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