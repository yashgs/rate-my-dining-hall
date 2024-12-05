import '../components/Page.css'; 
import StarReview from './StarReview';

function ReviewButton({ review }) {
    return (
        <div className="restaurant-button">
            <a href={"/review/" + review.rev_reviewid}>
                <div>
                    <p><strong>{review.rev_title}</strong></p>
                    <StarReview rating={review.rev_star_rating}/>
                    <p><i>"{review.rev_content}"</i></p>
                </div>
            </a>
        </div>
    );
}
  
export default ReviewButton;
  