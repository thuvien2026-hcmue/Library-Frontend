import React, { useEffect, useState } from "react";
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
    Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../context/ThemeContext";


import { Link as RouterLink } from "react-router-dom";
import NavButton from "./NavButton";
import HoverMenuButton from "./HoverMenuButton";

export default function Header() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { darkMode, setDarkMode } = useThemeMode();
    const [openIntro, setOpenIntro] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [openSupport, setOpenSupport] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    return (
        <>
            {/* TOP NAVBAR */}
            <AppBar
                position="fixed"
                color="default"
                elevation={scrolled ? 6 : 0}
                sx={{
                    backdropFilter: "blur(10px)",
                    bgcolor: theme.palette.background.paper,
                    transition: "all 0.25s ease",
                    py: scrolled ? 0.2 : 1,
                }}
            >
                <Toolbar
                    sx={{
                        gap: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* LEFT SIDE — MOBILE MENU */}
                    <IconButton
                        edge="start"
                        onClick={toggleDrawer(true)}
                        sx={{
                            display: { xs: "flex", md: "none" }, // SHOW ONLY ON MOBILE
                        }}
                    >
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
                            minWidth: 0,
                        }}
                    >
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <LocalLibraryIcon />
                        </Avatar>

                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 700,
                                display: { xs: "none", sm: "block" }, // hide logo text on very small screen
                            }}
                        >
                            University Library
                        </Typography>
                    </Box>

                    {/* --- NAVIGATION LINKS (HIDE ON MOBILE) --- */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <NavButton to="/">Trang chủ</NavButton>

                        <HoverMenuButton
                            title="Giới thiệu"
                            items={[
                                { label: "Tầm nhìn & Sứ mệnh", to: "/gioi-thieu/tam-nhin" },
                                { label: "Cơ cấu tổ chức", to: "/gioi-thieu/co-cau" },
                                { label: "Lịch sử hình thành", to: "/gioi-thieu/lich-su" },
                            ]}
                        />

                        <HoverMenuButton
                            title="Tra cứu"
                            items={[
                                { label: "Tra cứu tài liệu", to: "/tra-cuu/tai-lieu" },
                                { label: "Mục lục sách", to: "/tra-cuu/muc-luc" },
                                { label: "Tra cứu nâng cao", to: "/tra-cuu/nang-cao" },
                            ]}
                        />

                        <NavButton to="/san-pham">Sản phẩm</NavButton>

                        <HoverMenuButton
                            title="Dịch vụ"
                            items={[
                                { label: "Dịch vụ mượn sách", to: "/dich-vu/muon-sach" },
                                { label: "Phòng đọc", to: "/dich-vu/phong-doc" },
                                { label: "Hỗ trợ học tập", to: "/dich-vu/ho-tro" },
                            ]}
                        />

                        <HoverMenuButton
                            title="Hỗ trợ"
                            items={[
                                { label: "Hỏi đáp", to: "/ho-tro/faq" },
                                { label: "Hướng dẫn sử dụng", to: "/ho-tro/huong-dan" },
                                { label: "Tài nguyên khác", to: "/ho-tro/tai-nguyen" },
                            ]}
                        />

                        <NavButton to="/lien-he">Liên hệ</NavButton>
                    </Box>

                    {/* SPACER */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* --- SEARCH BAR --- */}
                    <Paper
                        component="form"
                        elevation={2}
                        sx={{
                            display: { xs: "none", sm: "flex" }, // show on sm and above
                            alignItems: "center",
                            width: { sm: 200, md: 280, lg: 380 }, // responsive width
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "50px",
                            transition: "0.25s ease",
                        }}
                    >
                        <SearchIcon color="action" />
                        <InputBase
                            placeholder="Search books..."
                            sx={{
                                ml: 1,
                                flex: 1,
                            }}
                        />
                        <Button variant="contained" size="small" sx={{ borderRadius: "20px" }}>
                            Search
                        </Button>
                    </Paper>

                    {/* DARK MODE BUTTON */}
                    <IconButton
                        onClick={() => setDarkMode(!darkMode)}
                        sx={{
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            width: 42,
                            height: 42,
                            borderRadius: "12px",
                            ml: 1,
                            "&:hover": {
                                transform: "scale(1.07)",
                            },
                            transition: "0.2s",
                        }}
                    >
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* --- MOBILE DRAWER --- */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 260, p: 2 }}>
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

                        {/* HOME */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Trang chủ" />
                            </ListItemButton>
                        </ListItem>

                        {/* GIỚI THIỆU */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenIntro(!openIntro)}>
                                <ListItemText primary="Giới thiệu" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openIntro} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/tam-nhin" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tầm nhìn & Sứ mệnh" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/co-cau" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cơ cấu tổ chức" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/lich-su" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Lịch sử hình thành" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* TRA CỨU */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenSearch(!openSearch)}>
                                <ListItemText primary="Tra cứu" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openSearch} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/tra-cuu/tai-lieu" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tra cứu tài liệu" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/tra-cuu/muc-luc" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Mục lục sách" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/tra-cuu/nang-cao" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tra cứu nâng cao" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* SẢN PHẨM */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/san-pham"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Sản phẩm" />
                            </ListItemButton>
                        </ListItem>

                        {/* DỊCH VỤ */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenService(!openService)}>
                                <ListItemText primary="Dịch vụ" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openService} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/dich-vu/muon-sach" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Dịch vụ mượn sách" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/phong-doc" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Phòng đọc" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/ho-tro" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Hỗ trợ học tập" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* HỖ TRỢ */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenSupport(!openSupport)}>
                                <ListItemText primary="Hỗ trợ" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openSupport} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/ho-tro/faq" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Hỏi đáp" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/huong-dan" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Hướng dẫn sử dụng" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/tai-nguyen" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tài nguyên khác" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* LIÊN HỆ */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/lien-he"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Liên hệ" />
                            </ListItemButton>
                        </ListItem>

                    </List>

                    <Divider sx={{ my: 1 }} />

                    {/* LOGIN */}
                    <Box sx={{ mt: 2 }}>
                        <Paper
                            component="form"
                            elevation={1}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                px: 1.5,
                                py: 0.8,
                                borderRadius: "30px",
                            }}
                        >
                            <SearchIcon color="action" />
                            <InputBase
                                placeholder="Search books..."
                                sx={{
                                    ml: 1,
                                    flex: 1,
                                    fontSize: "0.9rem",
                                }}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    borderRadius: "20px",
                                    px: 2,
                                }}
                            >
                                Search
                            </Button>
                        </Paper>
                    </Box>

                </Box>
            </Drawer>
        </>
    );

}
