import {PropsWithChildren, useReducer} from "react";
import StoreContext, {defaultStore, storeReducer} from "./StoreContext";

export default function StoreProvider(props: PropsWithChildren) {
	const {children} = props;
	const [store, dispatch] = useReducer(storeReducer, defaultStore);
	return (
		<StoreContext.Provider value={[store, dispatch]}>
			{children}
		</StoreContext.Provider>
	);
}
