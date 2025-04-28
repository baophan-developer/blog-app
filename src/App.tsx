import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes";
import ChangedMode from "./components/ChangedMode";

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme} defaultMode="system">
            <RouterProvider router={router} />
            <ChangedMode />
        </ThemeProvider>
    );
}

export default App;
