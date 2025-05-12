import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Movie from "./Movie";
import SkeletonLoaderMovies from "./SkeletonLoaderMovies";

const Recommended = () => {
  const { recommended, loadingRecommended } = useSelector(state => state.recommendedSlice);

  if (loadingRecommended) {
    return (
      <div>
        {[...Array(3)].map((_, i) => (
          <SkeletonLoaderMovies key={i} />
        ))}
      </div>
    );
  }

  return (
    <>

      {recommended.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommended.map((result) => {
            return (
              <Link key={result.id} to={`/movies/movie/${result.id}`}>
                <Movie movie={result} />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="font-light text-lg text-center py-6">
          No recommendations yet
        </p>
      )}
    </>
  );
};

export default Recommended;
