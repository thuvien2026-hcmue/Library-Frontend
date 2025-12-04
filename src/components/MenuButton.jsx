import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function MenuButton({ title, items }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "action.hover" },
                }}
            >
                {title}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        minWidth: 210,
                    },
                }}
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        component={RouterLink}
                        to={item.to}
                        onClick={() => setAnchorEl(null)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
