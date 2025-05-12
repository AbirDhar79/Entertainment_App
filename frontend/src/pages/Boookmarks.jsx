import { useDispatch, useSelector } from "react-redux";
import { setBookmark, setLoadingBookmark, setSearchTermBookmark } from "../store/slices/bookmarkSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import SearchBar from "../components/SearchBar";

const Boookmarks = () => {

  const { bookmark, searchTermBookmark, loadingBookmark } = useSelector(state => state.bookmarkSlice)
  const dispatch = useDispatch()

  return (
    <section className="px-4 pb-12 lg:pl-32">
      <SearchBar

        placeholder="Search for movies"
      />
      <div className="pt-10 mb-6 font-light text-xl tracking-[-0.3125px] flex gap-x-2 items-center ">
        <h1 className="text-xl">Bookmarks</h1>
        <p className="border font-medium py-[1px] text-xs px-2 rounded-md">
          ALL
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {/* Map through movies and show Skeleton Loader when loading  */}
        {loadingBookmark
          ? [...Array(3)].map((_, i) => <SkeletonLoaderMovies key={i} />)
          : bookmark.map((movie) => (
            <Link key={movie.id} to={`/bookmark/${movie.id}`}>

              <Movie movie={movie} />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Boookmarks;
