import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints, { createImageUrl } from "../services/movies";

const Hero = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get(endpoints.popular).then((response) => {
      // console.log(response.data.results);
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      // console.log(randomMovie.title);
      setMovie(randomMovie);
    });
  }, []);

  const truncate = (str, length) => {
    if(!str) return ""

    return str.length > length ? str.slice(0, length) + "..." : str
  }

  if (!movie) {
    return (
      <div>
        <p>Fetching movies...</p>
      </div>
    );
  }

  const { title, backdrop_path, release_date, overview } = movie;

  return (
    <div className="w-full h-[550px] lg:h-[850px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[750px] lg:h-[850px] bg-gradient-to-r from-black">
          <div>
            <img
              src={createImageUrl(backdrop_path, "original")}
              alt={title}
              className="w-full lg:h-screen h-[750px] object-cover object-top relative"
            />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/35"></div>
          </div>

          <div className="absolute w-full top-[25%] lg:top-[35%] p-4 md:p-8">
            <h1 className="text-3xl md:text-6xl font-nsans-bold lg:max-w-[950px]">{title}</h1>

            <div className="mt-8 mb-4">
              <button className="border bg-gray-300 text-black py-2 px-5">
                Play
              </button>
              <button className="border border-gray-300 py-2 px-5 ml-4">
                Watch Later
              </button>
            </div>

            <p className="text-gray-400 text-sm">{release_date}</p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[900px] text-gray-200">{truncate(overview, 165)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
