import { User } from './user';

export type Review = {
	id: number;
	text: string;
	userId: number;
	movieId: number;
	user: User;
};

export type ReviewInsert = {
	text: string;
	movieId: number;
};
