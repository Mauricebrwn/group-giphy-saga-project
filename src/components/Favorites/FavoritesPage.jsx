import { useHistory } from "react-router-dom";

function FavoritesPage() {
    const history = useHistory();

    return (
    <div>
        <h1>Welcome to your favorites</h1>
        <button className="start" onClick={()=> history.push('/')}>favorites</button>
    </div>
    );
}
export default FavoritesPage;