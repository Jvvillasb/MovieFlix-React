import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from '../../types/genre';
import { requestBackend } from '../../util/requests';
import './styles.css';

export type MovieFilterData = {
	genre: Genre | null;
};

type Props = {
	onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
	const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

	const { handleSubmit, setValue, getValues } =
		useForm<MovieFilterData>();

	const onSubmit = (formData: MovieFilterData) => {
		onSubmitFilter(formData);
	};

	const handleChangeGenre = (value: Genre) => {
		setValue('genre', value);
		const obj: MovieFilterData = {
			genre: getValues('genre'),
		};

		onSubmitFilter(obj);
	};


  const getGenres = useCallback(() => {
		const config: AxiosRequestConfig = {
			method: 'GET',
			url: `/genres`,
		};

		requestBackend(config).then((response) => {
			setSelectGenres(response.data);
			console.log(response.data);
		});
	}, []);

	useEffect(() => {
		getGenres();
	}, [getGenres]);


	return (
		<form onSubmit={handleSubmit(onSubmit)} className="movie-filter-form">
			<div className="movie-filter-genre-container">
				
						<Select
							options={selectGenres}
							classNamePrefix="movie-filter-select"
							isClearable
							placeholder="Gênero"
							onChange={(value) =>
								handleChangeGenre(value as Genre)
							}
							getOptionLabel={(genre: Genre) => genre.name}
							getOptionValue={(genre: Genre) => String(genre.id)}
						/>

			
			</div>
		</form>
	);
};

export default MovieFilter;
