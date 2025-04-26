export interface IUser {
	username: string;
	password: string;
	age: number;
}

export interface IComment {
	username: string;
	createdDate: string;
	content: string;
}

export interface IPost {
	title: string;
	content: string;
	createdDate: string;
	updatedDate: string;
	comments: Array<IComment>;
}

export interface IStore {
	profile: Pick<IUser, "username">;
}
