import {IPost} from "../interfaces";
import {getDataLocalStore, setDataLocalStore} from "../utils";

export async function login(username: string, password: string) {
	try {
		const result = getDataLocalStore(username);
		if (!result) throw new Error("Account not exist!");
		if (result.password !== password) throw new Error("Incorrect password!");
		return "Login success!";
	} catch (error: any) {
		return error?.message || "Error";
	}
}

export async function register(username: string, password: string) {
	try {
		const result = getDataLocalStore(username);
		if (result) throw new Error("Account exist!");
		setDataLocalStore(username, {username, password});
	} catch (error: any) {
		return error?.message || "Error";
	}
}

export async function createPost(post: IPost) {
	try {
		setDataLocalStore("posts", post);
		return "Create post success!";
	} catch (error: any) {
		return error?.message || "Error";
	}
}
