import React from "react";

const Poster = ({ poster_path, className, size }) => {
  var poster = `https://image.tmdb.org/t/p/w${size}${poster_path}`;
  if (poster_path == null) {
    poster = 'https://via.placeholder.com/154x231';
  }

  return (
    <div className={className}>
        <img src={poster} alt="poster" className="poster" />
    </div>
  );
};


export default Poster;