import React from "react";
import { Link } from 'react-router-dom';
import ListPreview from '../../ListPreview';
import "./styles.css";

const Sidebar = ({watchlist}) => {

  return (
    <div>
        <h3>Watchlist</h3>
        {watchlist.length > 0 ? <ListPreview movies={watchlist} />
                     : 
                      <h1>Empty</h1>
                    }
    </div>
  );
};


export default Sidebar;