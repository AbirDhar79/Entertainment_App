import React from "react";
import img from "../assets/trending-assets/trendingImg.svg";
import seriesIcon from "../assets/trending-assets/series.svg";
import playIcon from "../assets/playIcon.svg";
import BookmarkBtn from "./bookmarkBtn/BookmarkBtn";

const TV = ({ movie }) => {
  const first_air_date = movie.first_air_date;
  const handleBookmark = (e) => {
    e.preventDefault()
    addBookmark(movie.id, "tvseries")
    removeBookmark(movie.id, "tvseries")
  }

  return (
    <div className="movieContainer relative w-full ">
      <img
        src={
          movie.poster_path || movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
            }`
            : img
        }
        alt={movie.title || movie.original_title || movie.original_name}
        className="mb-2 w-full rounded-lg h-[160px] "
      />
      <BookmarkBtn movie={movie} mediaType={"tvseries"} />
      <img
        src={playIcon}
        alt="Play Icon"
        className="playIcon absolute  w-24 h-24 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%]   cursor-pointer"
      />
      <div className="flex flex-col   bottom-4 left-4 z-10">
        <div className="flex gap-x-4 font-thin text-xs">
          <p>{movie.first_air_date ? first_air_date?.slice(0, 4) : "N/A"}</p>
          <div className="flex gap-x-1">
            <div className="flex gap-x-2 items-center">
              <p className="opacity-50">•</p>
              <img src={seriesIcon} alt="Movie Icon" />
            </div>
            <p>TV</p>
          </div>
        </div>
        <h2 className="text-[14px] font-medium mt-1">
          {movie.title ? movie.title : movie.original_name}
        </h2>
      </div>
    </div>
  );
};

export default TV;
