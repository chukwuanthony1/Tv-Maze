import React, { useEffect, useState } from "react";
import "./style.scss";
import MovieCard from "../../components/movie-card/MoviesCard";
import { IMovie } from "../../interface/Movie";
import { movieService } from "../../services/movieService";
import LoadingComponent from "../../components/loading-component/LoadingComponent";
import { useQuery } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const showsQuery = useQuery("shows", () => movieService.getMovieSchedule());
  const [bgImage, setBgImage] = useState("");
  useEffect(() => {
    if (showsQuery.data) {
      setBgImage(showsQuery.data[0].show?.image?.original);
      const top10 = showsQuery.data!?.slice(0, 10);
      let i = 0;
      setInterval(() => {
        setBgImage(top10[i].show.image.original);
        if (i < 9) {
          i++;
        } else {
          i = 0;
        }
      }, 5000);
    }
  }, [showsQuery.data]);
  return (
    <>
      <motion.section
        className="landing-page"
        exit={{
          opacity: '0',
          transition: {
            ease : "easeInOut",
            duration : 2
          },
        }}
      >
        {showsQuery.isLoading ? (
          <LoadingComponent height="100vh" />
        ) : showsQuery.isError ? (
          <div className="">{(showsQuery.error as Error).message}</div>
        ) : (
          <>
            <div
              className="jumbotron"
              style={{
                background: `linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, rgba(10, 10, 13, 0.8) 75%, rgb(10, 10, 13) 100%),url(${bgImage}) top/cover no-repeat`,
              }}
            >
              <Link to={"/"} className="brand ">
                {" "}
                TV Bland
              </Link>
              <p className="jumbotron-text">
                TV Show and web series database. <br />
                Create personalised schedules. Episode guide, cast, crew and character information.
              </p>
            </div>
            <div className="movies-list-section">
              <h2 className="header-2">Last Added Shows</h2>
              <div className="movies-list">
                <AnimatePresence>
                  {showsQuery.data!.map((movie, idx) => (
                    <motion.div
                      className="single-movie-item"
                      key={movie.id}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      transition={{ delay: idx * 0.5, duration: 1 }}
                    >
                      <MovieCard
                        alt=""
                        height="240px"
                        rating={parseInt(movie?.show?.rating?.average)}
                        text={movie?.show?.name}
                        image={movie.show?.image?.medium}
                        url={`/movie/${movie.show.id}`}
                        width="165px"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </motion.section>
    </>
  );
};

export default LandingPage;
