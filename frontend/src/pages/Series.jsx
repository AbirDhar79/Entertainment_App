import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SkeletonLoaderMovies from "../components/SkeletonLoaderMovies";
import TV from "../components/TV";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingSeries, setSearchTermSeries, setSeries } from "../store/slices/seriesSlice";
import InfiniteScroll from 'react-infinite-scroll-component';

const Series = () => {
  const { series, searchTermSeries, loadingSeries } = useSelector(state => state.seriesSlice);
  const dispatch = useDispatch();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResults] = useState()

  const handleSearch = (term) => dispatch(setSearchTermSeries(term));

  useEffect(() => {
    document.title = 'Popular TVs'; // Modify Func Later
    dispatch(setLoadingSeries(true))
    setPage(1);
    fetchTVSeries(1)
  }, [searchTermSeries]);

  const API_URL = import.meta.env.VITE_API_URL
  const fetchTVSeries = (pageNumber) => {
    let apiUrl = `${API_URL}/tvseries?page=${pageNumber}&limit=8`;

    if (searchTermSeries !== "") {
      apiUrl = `${API_URL}/tvseries?page=${pageNumber}&limit=8&search=${searchTermSeries}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (pageNumber === 1) {
          dispatch(setSeries(data.results || data.tvSeries));
          setTotalResults(data.totalDocuments);
        } else {
          dispatch(setSeries([...series, ...(data.results || data.tvSeries)]));
        }
        setPage(pageNumber + 1); // Increment page for the next fetch
        dispatch(setLoadingSeries(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMoreData = () => {
    fetchTVSeries(page);
  };

  return (
    <section className="px-4 pb-12 lg:pl-32">
      <SearchBar
        searchTerm={searchTermSeries}
        setSearchTerm={handleSearch}
        placeholder="Search for TV"
      />
      <div className="my-6 font-light text-xl tracking-[-0.3125px] flex gap-x-2 items-center ">
        <h1 className="text-xl">Popular</h1>
        <p className="border font-medium py-[1px] text-xs px-2 rounded-md">
          TV
        </p>
      </div>
      <InfiniteScroll
        dataLength={series.length}
        next={fetchMoreData}
        hasMore={series.length !== totalResult}
        loader={[...Array(3)].map((_, i) => <SkeletonLoaderMovies key={i} />)}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more Series</b>
          </p>
        }
      >
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Map through TV series and show Skeleton Loader when loading  */}
          {series.map((tv) => (
            <Link key={tv.id} to={`/series/tv/${tv.id}`}>
              <TV movie={tv} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Series;
