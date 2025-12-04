import React, { useState, useRef } from "react";
import { Button, Menu, MenuItem, alpha } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HoverMenuButton({ title, items }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const buttonRef = useRef(null);

    const handleOpen = (e) => {
        setAnchorEl(buttonRef.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            style={{ display: "inline-block" }}
        >
            <Button
                ref={buttonRef}
                color="inherit"
                sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    px: 1.5,
                    py: 1.2,
                    transition: "all 0.15s ease",
                    "&:hover": {
                        bgcolor: (theme) => alpha(theme.palette.text.primary, 0.06),
                    },
                }}
            >
                {title}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                transitionDuration={140}
                onClose={handleClose}
                MenuListProps={{
                    onMouseEnter: handleOpen,  // Keep menu open when hovering inside
                    onMouseLeave: handleClose, // Close when leaving menu
                }}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        borderRadius: 0,
                        mt: 1,
                        minWidth: 200,
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
                        sx={{
                            fontSize: "15px",
                            py: 1.2,
                            px: 2,
                            transition: "all 0.15s ease",
                            "&:hover": {
                                bgcolor: (theme) =>
                                    alpha(theme.palette.primary.main, 0.1),
                                pl: 2.4, // Slight slide effect
                            },
                        }}
                        onClick={handleClose}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
