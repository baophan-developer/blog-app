import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import "./App.css";
import router from "./Routes";
import ChangedMode from "./components/ChangedMode";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from "notistack";

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider theme={theme} defaultMode='system'>
			<SnackbarProvider maxSnack={5}>
				<QueryClientProvider client={queryClient}>
					<CssBaseline />
					<RouterProvider router={router} />
					<ChangedMode />
				</QueryClientProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
