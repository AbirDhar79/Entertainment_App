import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchDetails } from '../services/api';

const MovieDetails = () => {
  const [fullMovieDetail, setFullMovieDetail] = useState({});
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://entertainment-app-zopp.vercel.app';
  const navigate = useNavigate();

  const { searchResults } = useSelector(state => state.searchResultsSlice);
  const { recommended } = useSelector(state => state.recommendedSlice);
  const { movies } = useSelector(state => state.moviesSlice);
  const { series } = useSelector(state => state.seriesSlice);
  const { trending } = useSelector(state => state.trendingSlice);
  const { bookmark } = useSelector(state => state.bookmarkSlice);
  const getAllMoviesDetails = [
    ...new Map(
      [...searchResults, ...recommended, ...movies, ...series, ...trending, ...bookmark]
        .filter(item => item && item.id) // Remove invalid items
        .map(item => [item.id, item])
    ).values()
  ];

  const { id } = useParams();
  const findMovieDetails = getAllMoviesDetails.find(
    (result) => result?.id === parseInt(id)
  );

  const movieOrTv = findMovieDetails
    ? findMovieDetails.release_date
      ? "movies"
      : findMovieDetails.first_air_date
        ? "tvseries"
        : "person"
    : "movies";
  const media_type_id = findMovieDetails?.id || id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!media_type_id || media_type_id === 'undefined') {
          throw new Error('Invalid media ID');
        }
        const data = await fetchDetails(movieOrTv, media_type_id);
        setFullMovieDetail(data.details || {});
        setCast(data.cast || []);
      } catch (err) {
        console.error('Error fetching details:', err.message);
        setError(err.message);
        navigate('/error', { state: { message: err.message } });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchDetails, media_type_id, navigate]);

  useEffect(() => {
    if (fullMovieDetail.title || fullMovieDetail.name) {
      document.title = fullMovieDetail.title || fullMovieDetail.name;
    }
  }, [fullMovieDetail]);

  const releaseYear =
    fullMovieDetail.release_date?.slice(0, 4) ||
    fullMovieDetail.first_air_date?.slice(0, 4) ||
    'N/A';
  const spokenLanguage =
    fullMovieDetail.spoken_languages?.[0]?.english_name ||
    fullMovieDetail.spoken_languages?.[0]?.name ||
    'N/A';
  const runtime = fullMovieDetail.episode_run_time || fullMovieDetail.runtime || 'N/A';
  const rating = fullMovieDetail.vote_average || 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating / 2) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primaryColor fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1.667l2.598 5.295 5.802.842-4.19 4.084.988 5.748L10 14.176l-5.198 2.46.988-5.748-4.19-4.084 5.802-.842L10 1.667zm0 2.5l-3.333 6.667h6.666L10 4.167z"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400 fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1.667l2.598 5.295 5.802.842-4.19 4.084.988 5.748L10 14.176l-5.198 2.46.988-5.748-4.19-4.084 5.802-.842L10 1.667zm0 2.5l-3.333 6.667h6.666L10 4.167z"
          />
        </svg>
      );
    }
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <section className="px-4 pt-20 w-full lg:pl-32 lg:pr-8 lg:flex">
      <div className="w-full flex justify-center lg:justify-start">
        {loading ? (
          <div className="w-4/5 h-[500px] object-cover rounded-xl bg-gray-400 animate-pulse"></div>
        ) : (
          <div className="w-[80%] overflow-hidden h-[100%]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${fullMovieDetail.poster_path || fullMovieDetail.backdrop_path || ''}`}
              alt={fullMovieDetail.title || fullMovieDetail.name || 'Poster'}
              className="block m-auto max-w-full max-h-full rounded-xl lg:min-w-full lg:object-contain"
              style={{ width: '300px' }}
            />
          </div>
        )}
      </div>
      <div>
        <div className="w-full flex flex-col justify-center items-center text-center pb-4 lg:items-start lg:justify-start">
          <h1 className="text-2xl font-light mt-4 lg:text-4xl lg:font-medium lg:mt-0">
            {fullMovieDetail.title || fullMovieDetail.name || 'N/A'}
          </h1>
          <p className="font-light text-sm text-[#86888d] lg:text-base">
            {fullMovieDetail.tagline || ''}
          </p>
        </div>
        <div className="w-full flex flex-col justify-center gap-y-2 items-center pb-4 lg:gap-x-3 lg:justify-start lg:flex-row">
          <p className="text-3xl font-bold">
            {(rating / 2).toFixed(1) || "N/A"}
          </p>
          <div className="flex gap-x-1">{stars}</div>
        </div>
        <div className="w-full flex justify-between gap-x-2 py-4 lg:justify-start lg:gap-x-8">
          <div>
            <p className="text-[#86888d]">Language</p>
            <p className="text-sm">{spokenLanguage}</p>
          </div>
          <div>
            <p className="text-[#86888d]">
              {movieOrTv === "tvseries" ? "First Air" : "Length"}
            </p>
            <p className="text-sm">
              {movieOrTv === "tvseries"
                ? fullMovieDetail.first_air_date || 'N/A'
                : runtime + (runtime !== 'N/A' ? ' mins.' : '')}
            </p>
          </div>
          <div>
            <p className="text-[#86888d]">
              {movieOrTv === "tvseries" ? "Last Air" : "Year"}
            </p>
            <p className="text-sm">
              {movieOrTv === "tvseries" ? fullMovieDetail.last_air_date || 'N/A' : releaseYear}
            </p>
          </div>
          <div>
            <p className="text-[#86888d]">Status</p>
            <p className="text-sm">{fullMovieDetail.status || 'N/A'}</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="mb-2">Genres</h2>
          <div className="flex gap-x-2">
            {fullMovieDetail?.genres?.map((genre, id) => (
              <p
                key={id}
                className="text-xs text-darkBlue bg-primaryColor px-2 rounded lg:text-sm lg:px-3 lg:py-1"
              >
                {genre.name}
              </p>
            )) || <p>No genres available</p>}
          </div>
        </div>
        <div>
          <h2 className="mb-3">Synopsis</h2>
          <p className="font-light">{fullMovieDetail.overview || 'No synopsis available'}</p>
        </div>
        <div className="mt-8 w-full">
          <h2 className="mb-3">Cast</h2>
          <div className="flex gap-2 flex-wrap w-full">
            {cast?.map((actor) => (
              <p key={actor.name} className="text-sm border px-2 rounded">
                {actor.name}
              </p>
            )) || <p>No cast available</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;