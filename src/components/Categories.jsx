import React, { useEffect, useState } from "react";
import Movies from "./Movies";
import axios from "axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Categories = ({ title, url }) => {
  // console.log(url);
  // console.log(title);
  const [movies, setMovies] = useState([]);
  const rowID = Math.floor(Math.random() * 1000)

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  //   console.log(movies);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowID)
    slider.scrollLeft = slider.scrollLeft + offset
  }
  return (
    <div className="">
      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>

      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden  group-hover:block cursor-pointer"
          onClick={() => slide(-500)}
        />
        <div
          id={`slider` + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <Movies key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          size={40}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden  group-hover:block cursor-pointer"
          onClick={() => slide(500)}
        />
      </div>
    </div>
  );
};

export default Categories;
