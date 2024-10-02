import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MediaItem from './../MediaItem/MediaItem';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=2576faa3513d5900bf44685f3728ea05`
    );
    callback(data.results);
  }
  useEffect(() => {
    getTrending('movie', setTrendingMovies);
    getTrending('tv', setTrendingTv);
    getTrending('person', setTrendingPeople);
  }, []);
  return (
    <>
      {trendingMovies.length > 0 ? (
        <div className="row py-5 gy-5">
          <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6  d-flex align-items-center">
            <div className="w-100">
              <div className="brdr w-25 mb-3"></div>
              <h2 className="h3">
                Trending <br /> Movies <br /> to watch now
              </h2>
              <p className="text-muted ">most watched movies by days</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {trendingMovies.slice(0, 10).map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}

      {trendingTv.length > 0 ? (
        <div className="row py-5 g-4">
          <div className="col-lg-4  d-flex align-items-center">
            <div className="w-100">
              <div className="brdr w-25 mb-3"></div>
              <h2 className="h3">
                Trending <br /> Tv <br /> to watch right now
              </h2>
              <p className="text-muted ">Watched Tv To Watch Right Now </p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {trendingTv.slice(0, 10).map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}

      {trendingPeople.length > 0 ? (
        <div className="row py-5 g-4">
          <div className="col-lg-4 d-flex align-items-center">
            <div className="w-100">
              <div className="brdr w-25 mb-3"></div>
              <h2 className="h3">
                Trending <br /> People <br /> to watch right now
              </h2>
              <p className="text-muted ">most watched people by days </p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {trendingPeople
            .filter((person) => person.profile_path !== null)
            .slice(0, 10)
            .map((item, index) => (
              <MediaItem key={index} item={item} />
            ))}
        </div>
      ) : (
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}
    </>
  );
}
