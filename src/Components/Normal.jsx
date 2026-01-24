import React, { useState } from "react";
import { Play, Bell, User } from "lucide-react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ---------------- HERO MOVIES ---------------- */
const movies = [
  {
    id: 1,
    title: "Stranger Things",
    description: "...",
    image: "https://bilder.fernsehserien.de/sendung/hr2/stranger-things_566295.jpg",
  },
  {
    id: 2,
    title: "Avtar",
    description: "...",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00407893-hjdsmvweyl-landscape.jpg",
  },
  {
    id: 3,
    title: "Border 2",
    description: "...",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00401449-kcbvfvfkjn-landscape.jpg",
  },
  {
    id: 4,
    title: "Toxic",
    description: "...",
    image:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/medium/toxic-a-fairy-tale-for-grown-ups-et00378770-1767955073.jpg",
  },
];

/* ---------------- CATEGORIES ---------------- */
const popularCategories = {
  Horror: [
    {
      id: 1,
      title: "Evil Dead Rise",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsn77DDb-bL2sJKUDWLluNyRnEH1KW92eEA&s",
      trailer: "https://www.youtube.com/embed/GY4BgdUSpbE",
    },
  ],
};

export default function NetflixPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const navigate = useNavigate();

  /* ---------------- SLIDER SETTINGS ---------------- */
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const rowSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ---------------- NAVBAR ---------------- */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-red-600 text-2xl font-bold">NETFLIX</h1>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 px-2 py-1 rounded text-sm w-28 sm:w-40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Bell size={18} className="hidden sm:block" />
            <User size={18} className="hidden sm:block" />
            <button
              onClick={handleLogout}
              className="bg-red-600 text-xs px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- HERO SLIDER ---------------- */}
      <div className="px-3 sm:px-8 py-4">
        <Slider {...heroSettings}>
          {movies.map((movie) => (
            <div key={movie.id} className="relative">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-[220px] sm:h-[350px] lg:h-[450px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                <h2 className="text-xl sm:text-3xl font-bold">
                  {movie.title}
                </h2>
                <p className="hidden sm:block text-gray-300">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ---------------- TRAILER MODAL ---------------- */}
      {playingTrailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-3">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setPlayingTrailer(null)}
              className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded"
            >
              ✕
            </button>
            <iframe
              src={playingTrailer}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ---------------- CATEGORIES ---------------- */}
      <div className="px-4 sm:px-8 py-8 space-y-10">
        {Object.entries(popularCategories).map(([category, list]) => (
          <div key={category}>
            <h2 className="text-lg sm:text-2xl font-bold mb-4">
              {category}
            </h2>

            <Slider {...rowSettings}>
              {list.map((movie) => (
                <div key={movie.id} className="px-1">
                  <div
                    onClick={() => movie.trailer && setPlayingTrailer(movie.trailer)}
                    className="relative cursor-pointer group"
                  >
                    <img
                      src={movie.img}
                      alt={movie.title}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <Play size={28} />
                    </div>
                    <p className="absolute bottom-2 left-2 text-xs sm:text-sm font-bold">
                      {movie.title}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </div>
  );
}
