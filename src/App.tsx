import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes";
import ChangedMode from "./components/ChangedMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider theme={theme} defaultMode="system">
            <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <RouterProvider router={router} />
                <ChangedMode />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
