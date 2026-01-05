import React, { useState, useRef, useEffect } from "react";
import { Button, Menu, MenuItem, alpha } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HoverMenuButton({ title, items }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const closeTimer = useRef(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleOpen = () => {
    clearTimer();
    setOpen(true);
  };

  const handleClose = (delay = 220) => {
    clearTimer();
    closeTimer.current = setTimeout(() => setOpen(false), delay);
  };

  // ✅ close menu on scroll (prevents “stuck”)
  useEffect(() => {
    if (!open) return;

    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [open]);

  return (
    <div
      style={{ display: "inline-block" }}
      onMouseEnter={handleOpen}
      onMouseLeave={() => handleClose(220)}
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
          "&:hover": { bgcolor: (theme) => alpha(theme.palette.text.primary, 0) },
        }}
      >
        {title}
      </Button>

      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)} // ✅ close immediately when click outside
        disableAutoFocus
        disableAutoFocusItem
        disableRestoreFocus
        MenuListProps={{
          onMouseEnter: handleOpen,
          onMouseLeave: () => handleClose(220),
          sx: { py: 0.5 },
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            zIndex: 2000,
            borderRadius: 0,
            mt: 0, // ✅ IMPORTANT: remove gap so it doesn't flicker/close
            minWidth: 220,
            animation: "fadeIn 0.15s ease-out",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(-5px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {items.map((item, index) => {
          const isExternal = /^https?:\/\//i.test(item.to);

          return (
            <MenuItem
              key={index}
              component={isExternal ? "a" : RouterLink}
              href={isExternal ? item.to : undefined}
              to={!isExternal ? item.to : undefined}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              sx={{
                fontSize: "15px",
                py: 1.2,
                px: 2,
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
