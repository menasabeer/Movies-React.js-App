import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MediaItem from './../MediaItem/MediaItem';

export default function Movies() {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=2576faa3513d5900bf44685f3728ea05`
    );
    setMovies(data.results);
  }
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
     {movies.length>0? <div className="row py-5 g-4">
        {movies.map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>: <i className=" fa-spin fa-solid fa-spinner  loading"></i> }
    </>
  );
}
