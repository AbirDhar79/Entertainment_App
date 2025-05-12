import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import Recommended from "../components/Recommended";
import SearchResultsOrTrending from "../components/SearchResultsOrTrending";
import { setLoadingSearchResults, setSearchResults, setSearchTerm } from "../store/slices/searchResultsSlice";
import { setLoadingRecommended, setRecommended } from "../store/slices/recommendedSlice";


const Home = () => {


  const dispatch = useDispatch()
  const [toolTip, setToolTip] = useState(false);
  const { searchTerm } = useSelector(state => state.searchResultsSlice)

  const handleSearch = (term) => dispatch(setSearchTerm(term))

  useEffect(() => {
    document.title = 'Home | Entertainment WebApp'
  });

  // GET SEARCH RESULTS AND RECOMMENDED MOVIES/TV SERIES BASED ON PREVIOUS SEARCH
  const language = "en-US";
  const page = 1;
  const includeAdult = false;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    dispatch(setLoadingSearchResults(true))
    dispatch(setLoadingRecommended(true));
    const searchEndpoint = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${language}&query=${searchTerm}&page=${page}&include_adult=${includeAdult}`;
    fetch(searchEndpoint)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setSearchResults(data.results));
        dispatch(setLoadingSearchResults(false));

        const recommendationEndpoint = `${API_URL}/additional/recommended?limit=16&page=1`;
        fetch(recommendationEndpoint)
          .then((response) => response.json())
          .then((data) => {
            dispatch(setRecommended(data.recommended));

            dispatch(setLoadingRecommended(false));
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));
  }, [searchTerm]);



  return (
    <main className="px-4 lg:pl-32">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={handleSearch}
        placeholder="Search for movies or TV series"
      />
      <Title />
      <SearchResultsOrTrending />
      <section className="mt-6 w-full">
        <h1 className=" mb-4 font-light text-xl flex gap-x-2 items-center relative">
          Recommended for you
          <p
            onMouseEnter={() => setToolTip(true)}
            onMouseLeave={() => setToolTip(false)}
            className="border font-medium mt-1 text-xs px-2 rounded-md cursor-pointer hidden lg:block "
          >
            ὶ
          </p>
          {toolTip && (
            <p className="text-xs font-thin ">
              Based on your most recent search
            </p>
          )}
        </h1>
        <Recommended />
      </section>
    </main>
  );
};

export default Home;
