import React, { useState, useRef } from "react";
import { Button, Menu, MenuItem, alpha } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HoverMenuButton({ title, items }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const closeTimer = useRef(null);

    const handleOpen = () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const delayedClose = () => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpen(false), 120);
    };

    return (
        <div
            onMouseEnter={handleOpen}
            onMouseLeave={delayedClose}
            style={{ display: "inline-block" }}
        >
            <Button
                ref={anchorRef}
                color="inherit"
                sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    px: 1.5,
                    py: 1.2,
                    "&:hover": {
                        bgcolor: (theme) => alpha(theme.palette.text.primary, 0),
                    },
                }}
            >
                {title}
            </Button>

            <Menu
                anchorEl={anchorRef.current}
                open={open}
                onClose={delayedClose}

                // 🔥 REQUIRED so the menu doesn't reopen or get stuck
                disableAutoFocus
                disableAutoFocusItem
                disableRestoreFocus

                MenuListProps={{
                    onMouseEnter: handleOpen,
                    onMouseLeave: delayedClose,
                    sx: { py: 0.5 }
                }}

                PaperProps={{
                    onMouseLeave: delayedClose,   // 🔥 Key fix: close when mouse leaves the submenu
                    elevation: 4,
                    sx: {
                        zIndex: 2000,
                        borderRadius: 0,
                        mt: 1,
                        minWidth: 220,
                        animation: "fadeIn 0.15s ease-out",
                        "@keyframes fadeIn": {
                            from: { opacity: 0, transform: "translateY(-5px)" },
                            to: { opacity: 1, transform: "translateY(0)" },
                        },
                    },
                }}

                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        component={RouterLink}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        sx={{
                            fontSize: "15px",
                            py: 1.2,
                            px: 2,
                            "&:hover": {
                                bgcolor: (theme) =>
                                    alpha(theme.palette.primary.main, 0.1),
                            },
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
