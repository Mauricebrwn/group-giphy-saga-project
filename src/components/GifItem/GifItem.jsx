import React from "react";
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';



const GifItem = ({ gif }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [theGifs, setTheGifs] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // If we want GIFs when this page loads, we
    // need to send a request to our server, so
    // our server can ask the Giphy API for them:
    fetchGifs();
  }, []);

  const handleFavorite = (data) => {
    setIsFavorited(!isFavorited);
    console.log(data.url);
    let newFavorite = {
      url : data.url
    }
    //  Dispatch an action to add/remove the gif from the favorites list
    dispatch({
      type: "SAGA/ADD_FAVORITES",
      payload: newFavorite
    });
  };

  const fetchGifs = () => {
    dispatch({
      type: "SAGA/GET_GIFS",
    });
  };

  return (
    <div>

      {/* {theGifs.map((gif) => {
        return ( */}
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        {/* );
      })} */}
      <button onClick={() => handleFavorite(gif)}>
        {isFavorited ? "Remove from Favorites" : "Add to Favorites"}Favorite
      </button>{" "}

    </div>
  );
};

export default GifItem;

