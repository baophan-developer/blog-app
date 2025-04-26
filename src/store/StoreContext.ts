import {createContext} from "react";
import {IStore} from "../interfaces";

export enum STORE_ACTION {
	UPDATE_PROFILE = "UPDATE_PROFILE",
}

export function storeReducer(
	state: IStore,
	payload: {action: `${STORE_ACTION}`; data: IStore},
): IStore {
	const {action, data} = payload;
	switch (action) {
		case STORE_ACTION.UPDATE_PROFILE:
			return {
				...state,
				profile: {
					...state.profile,
					...data.profile,
				},
			};
		default:
			return state;
	}
}
export const defaultStore: IStore = {
	profile: {
		username: "",
	},
};
const StoreContext = createContext<
	[
		IStore,
		React.ActionDispatch<
			[
				payload: {
					action: `${STORE_ACTION}`;
					data: IStore;
				},
			]
		>,
	]
>([defaultStore, () => null]);
export default StoreContext;
