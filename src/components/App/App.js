import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GifItem from '../GifItem/GifItem';
import { useDispatch} from 'react-redux';
function App(props) {
  const [theGifs, setTheGifs] = useState([]);

  useEffect(() => {
    // 
    fetchGifs();
    // getFavoriteList()
  }, []);

  const dispatch = useDispatch()

  const getFavoriteList = () => {
    dispatch({
        type: 'SAGA/FETCH_FAVORITES'
    })
}

  const fetchGifs = () => {
    axios({
      method: 'GET',
        url: '/gifs'
    }).then((response) => {
      const apiResponse = response.data;
      setTheGifs(apiResponse.data);
    }).catch((error) => {
      console.log('fetchGifs fail:', error);
    })
  }

  

  return (
    <div>
      <h1>Giphy Search!</h1>
      <h4><i>APIS</i></h4>
        {theGifs.map((gif) => {
          return <GifItem key={gif.id} gif={gif} />
          // return <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title}/> 
         })}
    </div>
  );
}

export default App;
