
import { Movie } from "../../../types/movie";
import './styles.css';

type Props = {
	movie: Movie;
}

const CardMovie = ({movie} : Props) => {
	return (
		<div className="base-card movie-card">
			<div className="movie-image">
				<img src={movie.imgUrl} alt={movie.title} />
			</div>
			<div className="movie-description">
				<h3>{movie.title}</h3>
				<h4>{movie.year}</h4>
				<p>{movie.subTitle}</p>
			</div>
		</div>
	);
};

export default CardMovie;
