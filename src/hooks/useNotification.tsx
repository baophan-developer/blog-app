import {IconButton, Snackbar, SnackbarCloseReason, styled} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";

type UseNotificationParams = {
	open?: boolean;
	message?: string;
	duration?: number;
};

const IconButtonDarkMode = styled(IconButton)(({theme}) => [
	{
		color: "white",
	},
	theme.applyStyles("dark", {
		color: "black",
	}),
]);

export default function useNotification() {
	const [state, setState] = useState<UseNotificationParams>({
		open: false,
		duration: 2000,
		message: "",
	});

	const handleClick = useCallback((params: Omit<UseNotificationParams, "open">) => {
		setState({...params, open: true});
	}, []);

	const handleClose = useCallback(
		(_e: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
			if (reason === "clickaway") {
				return;
			}
			setState({duration: 2000, message: "", open: false});
		},
		[],
	);

	const render = useMemo(() => {
		return (
			<Snackbar
				open={state.open}
				autoHideDuration={state.duration}
				message={state.message}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				action={
					<IconButtonDarkMode onClick={handleClose}>
						<CloseIcon fontSize='small' />
					</IconButtonDarkMode>
				}
			/>
		);
	}, [handleClose, state.duration, state.message, state.open]);

	return {
		showNotification: handleClick,
		content: render,
	};
}
