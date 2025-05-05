import {OptionsObject, SnackbarMessage, useSnackbar} from "notistack";
import {useCallback} from "react";

function useNotistack() {
	const {enqueueSnackbar} = useSnackbar();

	const open = useCallback(
		(
			message: SnackbarMessage,
			options?: OptionsObject<"default" | "error" | "success" | "warning" | "info">,
		) => {
			enqueueSnackbar(message, {
				...options,
				anchorOrigin: {
					vertical: "top",
					horizontal: "center",
					...options?.anchorOrigin,
				},
			});
		},
		[enqueueSnackbar],
	);

	return {
		open,
	};
}

export default useNotistack;
