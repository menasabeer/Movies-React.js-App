import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ItemDetails() {
  let { id, media_type } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [genres, setGenres] = useState([]);
  async function getItemDetails(id, mediaType) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=2576faa3513d5900bf44685f3728ea05&language=en-US`
    );
    setItemDetails(data);
    setGenres(data.genres);
  }
  useEffect(() => {
    getItemDetails(id, media_type);
  }, [id, media_type]);

  return (
    <>
      {itemDetails.poster_path || itemDetails.profile_path ? (
        <div className="row g-5">
          <div className="col-md-4">
            <div className="itemImg">
              {itemDetails.poster_path ? (
                <img
                  className="w-100 rounded-2"
                  src={
                    'https://image.tmdb.org/t/p/w500/' + itemDetails.poster_path
                  }
                  alt=""
                />
              ) : (
                <img
                  className="w-100"
                  src={
                    'https://image.tmdb.org/t/p/w500/' +
                    itemDetails.profile_path
                  }
                  alt=""
                />
              )}
            </div>
          </div>

          <div className="col-md-8">
            <div className="caption">
              <h1 className="my-3">
                {itemDetails.title} {itemDetails.name}
              </h1>

              <h4 className="text-muted mb-4">{itemDetails.tagline}</h4>

              {genres
                ? genres.map((type, index) => (
                    <span className="genres mx-2" key={index}>
                      {type.name}
                    </span>
                  ))
                : ' '}

              {itemDetails.vote_average ? (
                <p className="mt-4 py-2 ">
                  {' '}
                  Vote : {itemDetails.vote_average?.toFixed(1)}
                </p>
              ) : (
                ''
              )}
              {itemDetails.vote_count ? (
                <p className="my-4 py-2">
                  {' '}
                  Vote Count : {itemDetails.vote_count}
                </p>
              ) : (
                ''
              )}
              {itemDetails.popularity ? (
                <p className="my-4 py-2">
                  {' '}
                  Popularity : {itemDetails.popularity}
                </p>
              ) : (
                ''
              )}
              {itemDetails.release_date ? (
                <p className="my-4 py-2">
                  {' '}
                  Release Date : {itemDetails.release_date}
                </p>
              ) : (
                ''
              )}

              <p className="my-4 py-2 text-muted h4">{itemDetails.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}
    </>
  );
}
