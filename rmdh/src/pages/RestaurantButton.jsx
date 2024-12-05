import placeholderImage from '../assets/placeholder.png';
import '../components/Page.css'; 

function RestaurantButton({ restaurant }) {
    return (
        
        <div className="restaurant-button">
            <img src={placeholderImage} alt="Site Logo" />
            <div>
                <p><strong>{restaurant.res_name}</strong></p>
                <p>{restaurant.res_cuisine} • {restaurant.res_price_range}</p>
            </div>
        </div>
    );
}
  
export default RestaurantButton;
  