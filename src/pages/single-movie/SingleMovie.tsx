import { OljebraStar } from "oljebra-rating";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ICharacter, IShow } from "../../interface/Movie";
import { movieService } from "../../services/movieService";
import parse from "html-react-parser";
import "./style.scss";
import UserAvatar from "../../components/user-avatar/UserAvatar";
import { removeHTMLFormatting } from "../../utils/formatters";
import { useQuery } from "react-query";
import LoadingComponent from "../../components/loading-component/LoadingComponent";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SingleMovie = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [showCasts, setShowCasts] = useState<ICharacter[]>([]);

  const singleShowQuery = useQuery("singleShow", () => movieService.getSingleShow(params.showId!));
  const singleShowCharactersQuery = useQuery("singleShowCharacters", () => movieService.getMovieCast(params.showId!));

  return (
    <>
      <motion.section
        className=" single-show"
        exit={{
          opacity: "0",
          transition: {
            ease: "easeInOut",
            duration : 2
          },
        }}
      >
        {singleShowQuery.isLoading ? (
          <LoadingComponent height="100vh" />
        ) : singleShowQuery.isError ? (
          <div className="">{(singleShowQuery.error as Error).message}</div>
        ) : (
          <>
            <div
              className="show-jumbotron"
              style={{
                background: `linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, rgba(10, 10, 13, 0.8) 75%, rgb(10, 10, 13) 100%),url(${singleShowQuery.data?.image.original}) top/cover no-repeat`,
              }}
            >
              <Link to={"/"} className=" brand site-brand">
                TV Bland
              </Link>
              <div className="show-info">
                <img src={singleShowQuery.data?.image?.medium} alt="" className="" />
                <div className="">
                  <OljebraStar
                    gap="2px"
                    max={5}
                    size={12}
                    rating={parseFloat(singleShowQuery.data?.rating.average!)}
                    color="gold"
                    backgroundColor="#CBCBCB"
                  />
                  <h2 className="show-title">{singleShowQuery.data?.name}</h2>
                  <p className="show-summary" title={removeHTMLFormatting(singleShowQuery.data?.summary!)}>
                    {parse(`${singleShowQuery.data?.summary!}`)}
                  </p>
                </div>
              </div>
            </div>
            <div className="show-section">
              <div className="show-info-section">
                <h4 className="">Show Info</h4>
                <div className="show-info-section-div">
                  <p className="">
                    <span className="label">Streamed On</span>
                    <span className="value">{singleShowQuery.data?.network?.name}</span>
                  </p>
                  <p className="">
                    <span className="label">Schedule</span>
                    <span className="value">
                      {singleShowQuery.data?.schedule.days.map((day, idx) =>
                        idx < singleShowQuery.data?.schedule?.days.length - 1 ? `${day}, ` : day
                      )}
                    </span>
                  </p>
                  <p className="">
                    <span className="label">Status</span>
                    <span className="value">{singleShowQuery.data?.status}</span>
                  </p>
                  <p className="">
                    <span className="label">Genres</span>
                    <span className="value">
                      {singleShowQuery.data?.genres.map((genre, idx) => (idx < singleShowQuery.data?.genres?.length - 1 ? `${genre}, ` : genre))}
                    </span>
                  </p>
                </div>
              </div>
              <div className="show-starring-section">
                <h4 className="">Starring</h4>
                <div className="show-starring-section-div">
                  {singleShowCharactersQuery.data!?.map((cast) => (
                    <p key={cast.character.id} className="">
                      <span className="label">
                        <UserAvatar image_url={cast?.person?.image?.medium} />
                        <span>{cast?.person?.name}</span>
                      </span>
                      <span className="value">{cast?.character?.name}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </motion.section>
    </>
  );
};

export default SingleMovie;
