import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MediaItem from './../MediaItem/MediaItem';

export default function Tv() {
  const [Tv, setTv] = useState([]);

  async function getTv() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=2576faa3513d5900bf44685f3728ea05`
    );
    setTv(data.results);
  }
  useEffect(() => {
    getTv();
  }, []);
  return (
    <>
      {Tv.length > 0 ? (
        <div className="row py-5 g-4">
          {Tv.map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}
    </>
  );
}
