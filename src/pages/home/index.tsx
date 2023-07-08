import MovieList from "../../components/MovieList";
import "./index.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  return (
    <>
      <div className="poster">
        <MovieList />
      </div>
    </>
  );
};

export default Home;
