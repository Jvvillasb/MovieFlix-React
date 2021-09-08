import './styles.css';

type Props = {
	text: string;
};

const ButtonPrimary = ({ text }: Props) => {
	return (
		<div className="btn-container">
			<button className="btn btn-primary btn-content">
				<h6>{text}</h6>
			</button>
		</div>
	);
};

export default ButtonPrimary;
