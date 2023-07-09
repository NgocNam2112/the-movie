import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import "./MovieDetail.scss";
import { getMovieDetail } from "../../infrastructure/Movies/MovieClient";
import { Movie } from "../../domain/Movies/Movies";
import Loading from "../../components/Loading/Loading";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [playing, setPlaying] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<any>(null);
  const [movie, setMovie] = useState<Movie | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchMovie = async (movieId: number) => {
    try {
      setLoading(true);
      const data = await getMovieDetail(movieId);

      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : data.videos.results[0]);
      }

      setMovie(data);
    } catch (error) {
      navigate("/errorPage");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    if (!movieId) return;
    handleFetchMovie(movieId as unknown as number);
  }, []);

  if (loading) {
    return (
      <div className="center-max-size-loading center-loading">
        <Loading />
      </div>
    );
  }

  return (
    <main>
      <div
        className="poster__detail"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${process.env.REACT_APP_BACKDROP_PATH}/w1280${movie?.backdrop_path})`,
        }}
      >
        {playing ? (
          <>
            <YouTube
              videoId={trailer.key}
              className={"youtube amru youtube-container"}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
            <button
              onClick={() => setPlaying(false)}
              className={"button close-video"}
            >
              Close
            </button>
          </>
        ) : (
          <div className="center-max-size">
            <div className="poster-content">
              {trailer ? (
                <button
                  className={"button play-video"}
                  onClick={() => setPlaying(true)}
                  type="button"
                >
                  Play Trailer
                </button>
              ) : (
                "Sorry, no trailer available"
              )}
              <h1>{movie?.title}</h1>
              <p>{movie?.overview}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MovieDetail;
