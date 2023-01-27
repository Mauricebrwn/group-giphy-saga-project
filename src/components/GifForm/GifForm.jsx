import React from 'react'



  const GifItem = ({ gif }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavorite = () => {
      setIsFavorited(!isFavorited);
      // Dispatch an action to add/remove the gif from the favorites list
   
    }



  return (
    <div>
    <img src={gif.url} alt={gif.title} />
    <button onClick={handleFavorite}>
      {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  </div>
  )
}

export default GifItem;

