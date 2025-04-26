import {useContext} from "react";
import StoreContext from "../store/StoreContext";

export default function useStore() {
	return useContext(StoreContext);
}
