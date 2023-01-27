import React, {useState}from 'react';
import { useDispatch } from 'react-redux';



  const GifForm = ({ gif }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const newSearch = (event) => {
      event.preventDefault();
      let newGifSearch = {
          search: search
      }
      dispatch({
        type:'SAGA/POST_SEARCH',
        payload: newGifSearch
      })
    }


// build post here to server
  return (
    <div>
      <form onSubmit={newSearch}>
      <input
      type='text'
      placeholder="Name"
      value={search}
      onChange={(evt) => setSearch(evt.target.value)}/>
      <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default GifForm;

