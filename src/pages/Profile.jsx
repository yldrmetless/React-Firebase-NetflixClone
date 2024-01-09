import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movies";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  console.log(movies);

  const slide = (offset) => {
    const slider = document.getElementById("slider" );
    slider.scrollLeft = slider.scrollLeft + offset;
  };


  const handleUnlikeShow = async(movie) => {
    const userDoc = doc(db, "users", user.email)

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie)
    })
  }

  if (!user) {
    return (
      <div>
        <p>Fetching shows...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-[600px] relative">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/4032699c-d25c-4b03-b111-f29859cb1f4b/TR-tr-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="//"
          className="absolute w-full h-[600px] sm:block object-cover"
        />
        <div className="fixed top-0 left-0 w-full h-[600px] bg-black/60"></div>

        <div className="absolute lg:top-[20%] top-[45%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
            My Favourites
          </h1>
          <p className="font-nsans-light text-gray-400 text-lg">{user.email}</p>
        </div>
      </div>

      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">
        Favourite Shows
      </h2>

      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden  group-hover:block cursor-pointer"
          onClick={() => slide(-500)}
        />
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map(movie => (
            <div key={movie.id} className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
              <img
                className="w-full h-40 block object-cover object-top"
                src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                alt={movie.title}
              />
              <></>

              <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                  {movie.title}
                </p>


                <p>
                  <AiOutlineClose
                    size={30}
                    onClick={() => handleUnlikeShow(movie)}
                    className="absolute top-2 right-2"
                  />
                </p>
              </div>
            </div>
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

export default Profile;
