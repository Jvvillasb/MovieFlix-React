

import ContentLoader from 'react-content-loader';
import './styles.css';

const MovieDetailsLoader = () => (
	<div className="card-loader-container">
		<ContentLoader
			speed={2}
			width={320}
			height={460}
			viewBox="0 0 320 460"
			backgroundColor="#6c6c6c"
			foregroundColor="#525252"
		>
			<rect x="0" y="0" rx="2" ry="2" width="300" height="300" />
		</ContentLoader>
	</div>
);

export default MovieDetailsLoader;