import { ReactComponent as StarIcon } from '../../../../assets/images/star.svg';
import { Review } from '../../../../types/review';

type Props = {
	review: Review;
}

const ReviewList = ({ review }: Props) => {
	return (
		<div className="movie-details-card-reviews__list">
			<div className="movie-details-card-reviews__top">
				<div className="movie-details-card-review__star">
					<StarIcon />
				</div>
				<div className="movie-details-card-review__person">
					<span>{review.user.name}</span>
				</div>
			</div>
			<div className="movie-details-card-review__text">
				<p className="movie-details-card-review__comment">
          {review.text}
				</p>
			</div>
		</div>
	);
};

export default ReviewList;
