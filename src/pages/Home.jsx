import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import endpoints from "../services/movies";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="lg:pt-24 pt-56">
        <Categories title="upcoming" url={endpoints.upcoming} />
        <Categories title="trending" url={endpoints.trending} />
        <Categories title="top rated" url={endpoints.topRated} />
        <Categories title="comedy" url={endpoints.comedy} />
        <Categories title="popular" url={endpoints.popular} />
      </div>
    </div>
  );
};

export default Home;
