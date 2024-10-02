import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MediaItem from './../MediaItem/MediaItem';

export default function People() {
  const [people, setPeople] = useState([]);

  async function getPeople() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/person/week?api_key=2576faa3513d5900bf44685f3728ea05`
    );
    setPeople(data.results);
  }
  useEffect(() => {
    getPeople();
  }, []);
  return (
    <>
      {people.length > 0 ? (
        <div className="row py-5 g-4">
          {people
            .filter((person) => person.profile_path !== null)
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
