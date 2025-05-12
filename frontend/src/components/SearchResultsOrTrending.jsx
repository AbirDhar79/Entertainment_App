import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./Movie";
import SkeletonLoaderTrending from "./SkeletonLoaderTrending";
import Trending from "./Trending";
import { setLoadingTrending, setTrending } from "../store/slices/trendingSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SearchResultsOrTrending = () => {

  const { searchTerm, searchResults } = useSelector(state => state.searchResultsSlice);

  const { trending, loadingTrending } = useSelector(state => state.trendingSlice)
  const dispatch = useDispatch();

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // arrows: false,
    autoplaySpeed: 3000,
    dots: false,
    autoplay: true,
    variableWidth: true,
    adaptiveHeight: true,
  };

  const API_URL = import.meta.env.VITE_API_URL

  // GET TRENDING MOVIES AND TV SERIES
  useEffect(() => {
    dispatch(setLoadingTrending(true));
    fetch(`${API_URL}/additional/trending?limit=8&page=1`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTrending(data.trending));
        dispatch(setLoadingTrending(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
      {searchResults.length > 0 && searchTerm !== "" ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.map((result) => {
            // console.log(result)
            return (
              <Link key={result.id} to={`/movies/movie/${result.id}`}>
                <Movie movie={result} />
              </Link>
            );
          })}
        </div>
      ) :
        (
          <Slider {...settings}>
            {loadingTrending
              ? [...Array(20)].map((_, i) => <SkeletonLoaderTrending key={i} />)
              : trending.map((item) => (
                <Link key={item.id} to={`/trending/${item.id}`}>
                  <Trending trending={item} />
                </Link>
              ))}
          </Slider>
        )

        // (
        //   <ScrollContainer vertical={false} className="w-full flex gap-x-4">
        //     {loadingTrending
        //       ? [...Array(20)].map((_, i) => <SkeletonLoaderTrending key={i} />)
        //       : trending.map((item) => (
        //         <Link key={item.id} to={`/trending/${item.id}`}>
        //           <Trending trending={item} />
        //         </Link>
        //       ))}
        //   </ScrollContainer>
        // )
      }
    </>
  );
};

export default SearchResultsOrTrending;
