import {IComment, IPost} from "../interfaces";
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

export async function createPost(post: Omit<IPost, "id">) {
	try {
		const result = getDataLocalStore("posts");
		const currentIdPost = [...result][result.length - 1].id;
		setDataLocalStore("posts", [...result, {id: currentIdPost + 1, ...post}]);
		return "Create post success!";
	} catch (error: any) {
		return error?.message || "Error";
	}
}

export async function createComment(postId: number, comment: Omit<IComment, "id">) {
	try {
		const result = getDataLocalStore("posts");
		if (!result) throw new Error("Cannot comment!");
		const posts = [...result].filter((p) => p.id !== postId);
		const post = [...result].find((p) => p.id === postId);
		const currentIdComment = [...result][result.length - 1].id || 0;
		setDataLocalStore("posts", [
			...posts,
			{
				...post,
				comments: [...post.comments, {id: currentIdComment + 1, ...comment}],
			},
		]);
		return "Add comment success";
	} catch (error: any) {
		return error?.message || "Error";
	}
}

export async function updateComment(
	postId: number,
	commentId: number,
	comment: Omit<IComment, "id">,
) {
	try {
		const result = getDataLocalStore("posts");
		if (!result) throw new Error("Cannot update comment!");
		const post = [...result].find((p) => p.id === postId);
		if (!post) throw new Error("Cannot find post!");
	} catch (error: any) {
		return error?.message || "Error";
	}
}
