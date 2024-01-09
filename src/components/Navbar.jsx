import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
        await logOut()
        navigate("/")
    }
    catch(error) {
        console.log(error);
    }
  }

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link to={"/"}>
        <h1 className="text-red-600 font-nsans-medium cursor-pointer text-5xl">
          NETFLIX
        </h1>
      </Link>

      {user?.email ? (
        <div>
          <Link to={"/profile"}>
            <button className="pr-4">Profile</button>
          </Link>

            <button onClick={handleLogout} className="bg-red-600 px-6 py-1 rounded cursor-pointer">
              Logout
            </button>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <button className="pr-4">Login</button>
          </Link>

          <Link to={"/signup"}>
            <button className="bg-red-600 px-6 py-1 rounded cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
