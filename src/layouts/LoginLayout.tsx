import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function LoginLayout() {
    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
            }}
        >
            <Outlet />
        </Box>
    );
}

export default LoginLayout;
