import React from "react";
import { Link } from "react-router-dom";
import Poster from "../Poster";
import "./styles.css";

const ListPreview = ({ movies }) => (
  <div className="list-preview">
    <Link className="list-link" to="/">
      <ul className="cover-list overlapped">
        {movies.slice(0, 5).map(g => {
          return (
            <li key={g.tmdb_id} className="cover-list-item">
              <div className="list-cover-wrapper">
              <Poster className="cover"
            size="92"
            poster_path={g.poster_path}
            />
              </div>
            </li>
          );
        })}
      </ul>
    </Link>
  </div>
);

export default ListPreview;
