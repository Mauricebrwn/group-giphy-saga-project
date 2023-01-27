import { useHistory } from "react-router-dom";

function FavoritesPage() {
    const history = useHistory();

    return (
    <div>
        <h1>Welcome to your favorites</h1>
        <p>To see favorites please press the favorites button</p>
        <button className="start" onClick={()=> history.push('/')}>favorites</button>
    </div>
    );
}
export default FavoritesPage;