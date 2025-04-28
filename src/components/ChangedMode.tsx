import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Menu, MenuItem, useColorScheme } from "@mui/material";
import { memo, useMemo, useState } from "react";

function ChangedMode() {
    const { mode, setMode } = useColorScheme();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const renderIcons = useMemo(() => {
        switch (mode) {
            case "system":
                return <SettingsIcon />;
            case "dark":
                return <DarkModeIcon />;
            case "light":
                return <LightModeIcon />;
            default:
                return <SettingsIcon />;
        }
    }, [mode]);

    return (
        <>
            <IconButton
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                }}
                style={{
                    position: "fixed",
                    right: "20px",
                    bottom: "20px",
                }}
            >
                {renderIcons}
            </IconButton>
            <Menu
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            >
                <MenuItem
                    selected={mode === "system"}
                    onClick={() => setMode("system")}
                >
                    <SettingsIcon />
                </MenuItem>
                <MenuItem
                    selected={mode === "dark"}
                    onClick={() => setMode("dark")}
                >
                    <DarkModeIcon />
                </MenuItem>
                <MenuItem
                    selected={mode === "light"}
                    onClick={() => setMode("light")}
                >
                    <LightModeIcon />
                </MenuItem>
            </Menu>
        </>
    );
}

export default memo(ChangedMode);
