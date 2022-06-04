import axios from "axios";
import { ICharacter, IMovie, IShow } from "../interface/Movie";

const getMovieSchedule = () : Promise<IMovie[]> => {
  return axios
    .get("https://api.tvmaze.com/schedule")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Promise.reject(err);
    });
};

const getSingleShow = (showId: string) : Promise<IShow> => {
  return axios
    .get(`https://api.tvmaze.com/shows/${showId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Promise.reject(err);
    });
};

const getMovieCast = (showId: string) : Promise <ICharacter[]> => {
  return axios
    .get(`https://api.tvmaze.com/shows/${showId}/cast`)
    .then((res) => {
      setTimeout(() => {
        
      }, 2000) 
      return res.data;
    })
    .catch((err) => {
      Promise.reject(err);
    });
};

export const movieService = {
  getMovieSchedule,
  getSingleShow,
  getMovieCast,
};
