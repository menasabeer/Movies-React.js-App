import React from 'react';
import { Link } from 'react-router-dom';

export default function MediaItem({ item }) {
  return (
    <>
      {item.poster_path || item.profile_path ? (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
          <Link
            to={`/itemdetails/${item.id}/${item.media_type}`}
            className="text-white text-decoration-none"
          >
            <div className="item position-relative ">
              {item.poster_path ? (
                <img
                  className="w-100"
                  src={'https://image.tmdb.org/t/p/w500/' + item.poster_path}
                  alt=""
                />
              ) : (
                <img
                  className="w-100"
                  src={'https://image.tmdb.org/t/p/w500/' + item.profile_path}
                  alt=""
                />
              )}

              <h3 className="h5 pt-2">
                {item.title} {item.name}
              </h3>
              {item.vote_average && (
                <div className="vote p-1 position-absolute top-0 end-0 ">
                  {item.vote_average?.toFixed(1)}
                </div>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}
    </>
  );
}
