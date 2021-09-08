import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonPrimary from '../../components/ButtonPrimary';
import { Movie } from '../../types/movie';
import { ReviewInsert } from '../../types/review';
import { hasAnyRoles } from '../../util/auth';
import { requestBackend } from '../../util/requests';
import ReviewList from './components/ReviewList';
import MovieDetailsLoader from './MovieDetailsLoader';

import './styles.css';

type ParamsType = {
	movieId: string;
};

const MovieDetails = () => {
	const { movieId } = useParams<ParamsType>();
	const [movie, setMovie] = useState<Movie>();
	const [movieReview, setMovieReview] = useState<Movie>();
	const [isLoading, setIsLoading] = useState(false);

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ReviewInsert>();

	const handleFormClear = () => {
		setValue('text', '');
	};

	const onSubmit = (formData: ReviewInsert) => {
		const data = {
			text: formData.text,
			movieId: movieId,
		};

		const configReview: AxiosRequestConfig = {
			method: 'POST',
			url: '/reviews',
			data,
			withCredentials: true,
		};

		requestBackend(configReview)
			.then(() => {
				getMovieReview();
				handleFormClear();
				toast.success('Avaliação cadastrada com sucesso');
			})
			.catch((error) => {
				if (error.response.status === 422) {
					toast.error('Não é permitido gravar apenas espaços');
				} else {
					toast.error('Erro ao cadastrar avaliação');
				}
			});
	};

	const getMovie = useCallback(() => {
		const config: AxiosRequestConfig = {
			method: 'GET',
			url: `/movies/${movieId}`,
			withCredentials: true,
		};

		setIsLoading(true);
		requestBackend(config)
			.then((response) => {
				setMovie(response.data);
			})
			.finally(() => setIsLoading(false));
	}, [movieId]);

	const getMovieReview = useCallback(() => {
		const config: AxiosRequestConfig = {
			method: 'GET',
			url: `/movies/${movieId}/reviews`,
			withCredentials: true,
		};

		requestBackend(config).then((response) => {
			setMovieReview(response.data);
		});
	}, [movieId]);

	useEffect(() => {
		getMovie();
	}, [getMovie]);

	useEffect(() => {
		getMovieReview();
	}, [getMovieReview]);

	return (
		<>
			{isLoading ? (
				<MovieDetailsLoader />
			) : (
				<div className="movie-details-container">
					<div className="base-card movie-details">
						<div className="movie-details-image">
							<img src={movie?.imgUrl} alt={movie?.title} />
						</div>
						<div className="movie-details-description-container">
							<div className="movie-details-description">
								<h3>{movie?.title}</h3>
								<h4>{movie?.year}</h4>
								<p>{movie?.subTitle}</p>
							</div>
							<div className="movie-details-synopse">
								<p>{movie?.synopsis}</p>
							</div>
						</div>
					</div>
					{hasAnyRoles(['ROLE_MEMBER']) && (
						<div className="movie-details-card-new-review base-card">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-4">
									<input
										{...register('text', {
											required: 'Campo obrigatório',
										})}
										type="text"
										className={`form-control base-input ${
											errors.text ? 'is-invalid' : ''
										}`}
										placeholder="Deixe sua avaliação aqui"
										name="text"
									/>
								</div>
								<div className="is-invalid-default d-block">
									{errors.text?.message}
								</div>
								<div className="movie-details-card-submit">
									<ButtonPrimary text="SALVAR AVALIAÇÃO" />
								</div>
							</form>
						</div>
					)}
					{movieReview?.reviews.length === 0 ? (
						<></>
					) : (
						<div className="movie-details-card-reviews base-card">
							{movieReview?.reviews.map((review) => (
								<ReviewList key={review.id} review={review} />
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default MovieDetails;
