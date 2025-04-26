export interface IUser {
	username: string;
	password: string;
	age: number;
}

export interface IComment {
	id: number;
	username: string;
	createdDate: string;
	content: string;
	edit: boolean;
}

export interface IPost {
	id: number;
	title: string;
	content: string;
	createdDate: string;
	updatedDate: string;
	comments: Array<IComment>;
	edit: boolean;
}

export interface IStore {
	profile: Pick<IUser, "username">;
}
