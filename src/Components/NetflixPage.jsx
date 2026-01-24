import React, { useState } from "react";
import { Play, Bell, User, ChevronLeft, ChevronRight } from "lucide-react";
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
  Hollywood: [
    { id: 1, title: "Murder Mystery", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-v2p19IpAXJ1sa1bTNlW8UhP7cP258MtfA&s" },
    { id: 2, title: "The Irishman", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfXS9T5q4DIce28B2Nx8QJpP7sR7bfblF-g&s" },
    { id: 3, title: "Dark", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6N9WKvhdxIL1V2WyhMNfEcrM51o04o9T7fg&s" },
    { id: 4, title: "Growing Deon", img: "https://images.justwatch.com/backdrop/262865297/s640/raising-dion" },
    { id: 13, title: "Avengers", img: "https://cdn.britannica.com/60/182360-050-CD8878D6/Avengers-Age-of-Ultron-Joss-Whedon.jpg" },
    { id: 14, title: "Stranger Things", img: "https://deadline.com/wp-content/uploads/2025/11/Stranger-Things-5_33a02d.jpg?w=1024" },
  ],

  Bollywood: [
    { id: 5, title: "Marjawa", img: "https://www.koimoi.com/wp-content/new-galleries/2019/11/box-office-marjaavaan-to-take-a-decent-opening-single-screens-are-the-key-on-the-first-day-001.jpg" },
    { id: 6, title: "Ek Deewane Ki Deewaniyat", img: "https://c.saavncdn.com/532/Deewaniyat-From-Ek-Deewane-Ki-Deewaniyat-Original-Motion-Picture-Soundtrack-Hindi-2025-20250827010315-500x500.jpg" },
    { id: 7, title: "Saiyara", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkrtRPzlwbYqEmj3P3siCZeEPYNy25rIVkw&s" },
    { id: 8, title: "Sikandar", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-YDVd4PxrdgK1r7Y_i2MT5U9ZCiOncSTyBA&s" },
    { id: 15, title: "Border 2", img: "https://m.media-amazon.com/images/M/MV5BMTUxZjgwNTItMjQ5Yy00NGU4LTlhMGYtY2ZiN2Y2ZmQ1MTRiXkEyXkFqcGc@._V1_.jpg" },
    { id: 16, title: "12 Fail", img: "https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/HOTSTAR_DTH/MOVIE/690de3e84d854e0e7600479d/images/LANDSCAPE_169/1640216-h-6b1d26b33811?o=production" },
  ],

  Chinese: [
    { id: 9, title: "Crouching Tiger", img: "https://images.justwatch.com/backdrop/336164598/s640/crouching-tiger-hidden-dragon-sword-of-destiny" },
    { id: 10, title: "The Lord of Dragon", img: "https://m.media-amazon.com/images/I/91n7D2tvgML._AC_UF894,1000_QL80_.jpg" },
    { id: 11, title: "Ip Man", img: "https://m.media-amazon.com/images/M/MV5BOGVjMDEzNjMtMWJmMy00NDdjLWFkMzItOTBhZTE3OWU0YmM4XkEyXkFqcGc@._V1_.jpg" },
    { id: 12, title: "The Wandering Earth", img: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/3353/1736871863353-i" },
    { id: 17, title: "The Monkey King", img: "https://images.justwatch.com/poster/35414272/s718/the-monkey-king.jpg" },
    { id: 18, title: "Journey to the West", img: "https://m.media-amazon.com/images/M/MV5BYTM2ZDliMjEtZmUyYy00Zjk0LWJhZWQtYTYwMzBlZjA3ZTNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  ],

  South: [
    { id: 19, title: "RRR", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6j7Ljof_xzTZFEWtvZ9XHIYlGp8VrNRIRTQ&s" },
    { id: 20, title: "KGF Chapter 2", img: "https://images.plex.tv/photo?size=large-1280&url=https%3A%2F%2Fmetadata-static.plex.tv%2F2%2Fgracenote%2F276e6169ab31083dfa702d2410ce1ac1.jpg" },
    { id: 21, title: "Pushpa2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKXpz5WjOvSrDM2lT3S_A8aE09XysAmFnb3Q&s" },
    { id: 22, title: "Vikram", img: "https://i.pinimg.com/736x/83/72/da/8372da30db0bf65e0623d48694ff0b20.jpg" },
    { id: 23, title: "Kantara", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4sBaD3K-dyBBfsHWirfIruNQhcFyk32zSIA&s" },
    { id: 24, title: "Leo", img: "https://im.jdmagicbox.com/comp/jd_social/news/2023dec08/image-1255310-6ixyysxkky.jpg?clr=" },
  ],

  Horror: [
    { id: 25, title: "The Conjuring", img: "https://m.media-amazon.com/images/M/MV5BM2U2NGE1OWQtN2FjNi00YmQ2LTliMDAtNzMyYzQ5YTJiNDFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 26, title: "Annabelle", img: "https://upload.wikimedia.org/wikipedia/en/9/90/Annabelle_film_poster.jpg" },
    { id: 27, title: "IT", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfapkG2cy_IORECaazv_H8ameBppdWB4c_oA&s" },
    { id: 28, title: "1920", img: "https://m.media-amazon.com/images/I/816YpgC5GoL._AC_UF1000,1000_QL80_.jpg" },
    { id: 29, title: "1920 Evils Returns", img: "https://m.media-amazon.com/images/M/MV5BZjRjNDJhMWEtNmJkMi00ZDViLWE1YmEtYzFhZWRjZTI4ZjQ2XkEyXkFqcGc@._V1_.jpg" },
    {
      id: 30,
      title: "Evil Dead Rise",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsn77DDb-bL2sJKUDWLluNyRnEH1KW92eEA&s",
      trailer: "https://www.youtube.com/embed/GY4BgdUSpbE",
    },
  ],
};

// Custom arrow components for better mobile visibility
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition"
    >
      <ChevronLeft size={20} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition"
    >
      <ChevronRight size={20} />
    </button>
  );
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
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
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
          <h1 className="text-red-600 text-xl sm:text-2xl font-bold">NETFLIX</h1>

          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 px-2 py-1 rounded text-sm w-24 sm:w-32 md:w-40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Bell size={18} className="hidden sm:block" />
            <User size={18} className="hidden sm:block" />
            <button
              onClick={handleLogout}
              className="bg-red-600 text-xs px-2 py-1 sm:px-3 rounded"
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
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {movie.title}
                </h2>
                <p className="hidden sm:block text-gray-300 text-sm md:text-base">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ---------------- TRAILER MODAL ---------------- */}
      {playingTrailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-3">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setPlayingTrailer(null)}
              className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded hover:bg-black/90 transition"
            >
              ✕
            </button>
            <iframe
              src={playingTrailer}
              className="w-full h-full"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </div>
      )}

      {/* ---------------- CATEGORIES ---------------- */}
      <div className="px-4 sm:px-8 py-8 space-y-8">
        {Object.entries(popularCategories).map(([category, list]) => (
          <div key={category}>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
              {category}
            </h2>

            <div className="relative">
              <Slider {...rowSettings}>
                {list.map((movie) => (
                  <div key={movie.id} className="px-1">
                    <div
                      onClick={() => movie.trailer && setPlayingTrailer(movie.trailer)}
                      className={`relative cursor-pointer group ${movie.trailer ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <img
                        src={movie.img}
                        alt={movie.title}
                        className="w-full h-28 sm:h-36 md:h-40 lg:h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        {movie.trailer && <Play size={24} className="sm:size-28" />}
                      </div>
                      <p className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-xs sm:text-sm font-bold">
                        {movie.title}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}