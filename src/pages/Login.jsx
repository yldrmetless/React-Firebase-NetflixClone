import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, logIn} = UserAuth()
  const navigate = useNavigate()

  const handleFormubmit = async(e) => {
    e.preventDefault()
    // console.log(email);
    // console.log(password);

    try{
      await logIn(email, password)
      navigate("/")
    }
    catch(error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen relative">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/4032699c-d25c-4b03-b111-f29859cb1f4b/TR-tr-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="///"
        className="absolute w-full h-full hidden sm:block object-cover"
      />
      <div className="fixed top-0 left-0 w-full h-screen bg-black/60"></div>

      <div className="w-full px-3 py-36 absolute">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="w-full font-nsans-bold text-3xl">Login</h1>

            <form
              onSubmit={handleFormubmit}
              className="w-full flex flex-col py-4"
            >
              <input
                className="p-3 my-2 bg-gray-700 rounded"
                type="email"
                placeholder="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 my-2 bg-gray-700 rounded"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold">
                Login
              </button>

              <div className="flex justify-between items-center text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked
                    onChange={(e) => setRememberLogin(!rememberLogin)}
                  />
                  Remember me
                </p>
                <p className="cursor-pointer">Need Help?</p>
              </div>
              <p className="my-4">
                <span className="text-gray-600 mr-2">
                  Don't you have a Netflix account?
                </span>
                <Link to={"/signup"}>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
