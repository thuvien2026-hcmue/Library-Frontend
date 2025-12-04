import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Box,
    Typography,
    Avatar,
    Button,
    Paper,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../context/ThemeContext";


import { Link as RouterLink } from "react-router-dom";
import MenuButton from "./Menubutton";

export default function Header() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { darkMode, setDarkMode } = useThemeMode();

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    return (
        <>
            {/* TOP HEADER */}
            <AppBar
                position="sticky"
                color="default"
                elevation={4}
                sx={{
                    backdropFilter: "blur(10px)",
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <Toolbar sx={{ gap: 2, py: 1 }}>
                    {/* MENU BUTTON */}
                    <IconButton edge="start" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    {/* LOGO */}
                    <Box
                        component={RouterLink}
                        to="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            textDecoration: "none",
                        }}
                    >
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <LocalLibraryIcon />
                        </Avatar>

                        <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{ fontWeight: 700 }}
                        >
                            University Library
                        </Typography>
                    </Box>

                    {/* SPACER */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* SEARCH BAR - hide on small screens */}
                    <Paper
                        component="form"
                        elevation={2}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            width: 420,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "50px",
                        }}
                    >
                        <SearchIcon color="action" />
                        <InputBase
                            placeholder="Search books, authors, ISBN..."
                            sx={{ ml: 1, flex: 1 }}
                        />
                        <Button variant="contained" size="small" sx={{ borderRadius: "20px" }}>
                            Search
                        </Button>
                    </Paper>

                    {/* NAV BUTTONS */}
                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
                        <Button component={RouterLink} to="/catalogue">
                            Catalogue
                        </Button>
                        <Button component={RouterLink} to="/login" variant="outlined">
                            Sign In
                        </Button>
                    </Box>

                    {/* NAVIGATION WITH DROPDOWNS */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
                        {/* Trang Chủ */}
                        <Button component={RouterLink} to="/" color="inherit">
                            Trang chủ
                        </Button>

                        {/* Giới thiệu dropdown */}
                        <MenuButton
                            title="Giới thiệu"
                            items={[
                                { label: "Tầm nhìn & Sứ mệnh", to: "/gioi-thieu/tam-nhin" },
                                { label: "Cơ cấu tổ chức", to: "/gioi-thieu/co-cau" },
                                { label: "Lịch sử hình thành", to: "/gioi-thieu/lich-su" },
                            ]}
                        />

                        {/* Tra cứu dropdown */}
                        <MenuButton
                            title="Tra cứu"
                            items={[
                                { label: "Tra cứu tài liệu", to: "/tra-cuu/tai-lieu" },
                                { label: "Mục lục sách", to: "/tra-cuu/muc-luc" },
                                { label: "Tra cứu nâng cao", to: "/tra-cuu/nang-cao" },
                            ]}
                        />

                        {/* Sản phẩm */}
                        <Button component={RouterLink} to="/san-pham" color="inherit">
                            Sản phẩm
                        </Button>

                        {/* Dịch vụ dropdown */}
                        <MenuButton
                            title="Dịch vụ"
                            items={[
                                { label: "Dịch vụ mượn sách", to: "/dich-vu/muon-sach" },
                                { label: "Phòng đọc", to: "/dich-vu/phong-doc" },
                                { label: "Hỗ trợ học tập", to: "/dich-vu/ho-tro" },
                            ]}
                        />

                        {/* Hỗ trợ dropdown */}
                        <MenuButton
                            title="Hỗ trợ"
                            items={[
                                { label: "Hỏi đáp", to: "/ho-tro/faq" },
                                { label: "Hướng dẫn sử dụng", to: "/ho-tro/huong-dan" },
                                { label: "Tài nguyên khác", to: "/ho-tro/tai-nguyen" },
                            ]}
                        />

                        {/* Liên hệ */}
                        <Button component={RouterLink} to="/lien-he" color="inherit">
                            Liên hệ
                        </Button>
                    </Box>


                    <IconButton
                        onClick={() => setDarkMode(!darkMode)}
                        sx={{
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            width: 48,
                            height: 48,
                            borderRadius: "12px",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                    >
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* SIDE DRAWER MENU */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                        width: 260,
                        p: 2,
                    }}
                    role="presentation"
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <LocalLibraryIcon />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Library Menu
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 1 }} />

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={RouterLink} to="/" onClick={toggleDrawer(false)}>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/catalogue"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Catalogue" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/services"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Library Services" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/about"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="About Us" />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <Divider sx={{ my: 1 }} />

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/login"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Sign In" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
