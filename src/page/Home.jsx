// Home.jsx
import React, { useMemo, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
  Tooltip,
  Badge,
  TextField,
  InputAdornment,
  Divider,
  IconButton,
} from "@mui/material";

import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import BookCard from "../components/Bookcard";
import sampleBooks from "../sample-data/sampleBooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Home() {

  // Static data (you already had these — kept same shape)
  const categories = [
    { name: "Computer Science", icon: <LibraryBooksIcon /> },
    { name: "Engineering", icon: <LibraryBooksIcon /> },
    { name: "Literature", icon: <LibraryBooksIcon /> },
    { name: "Medicine", icon: <LibraryBooksIcon /> },
    { name: "Business", icon: <LibraryBooksIcon /> },
    { name: "History", icon: <LibraryBooksIcon /> },
    { name: "Psychology", icon: <LibraryBooksIcon /> },
    { name: "Mathematics", icon: <LibraryBooksIcon /> },
  ];

  const stats = [
    { num: "120,000+", label: "Books Available" },
    { num: "8,500+", label: "Online Journals" },
    { num: "20,000+", label: "Active Students" },
    { num: "1,200+", label: "Daily Visitors" },
  ];

  const news = [
    {
      title: "Library Renovation Completed",
      text: "New study rooms, digital labs, and reading halls now open.",
    },
    {
      title: "E-Resource Access Updated",
      text: "Over 300 new digital research databases added this month.",
    },
    {
      title: "Upcoming Workshop: Research Skills",
      text: "Learn how to use citation tools and academic search engines.",
    },
  ];

  const testimonials = [
    {
      name: "Student 1",
      role: "University Member",
      avatar: "S",
      text: "An amazing digital library experience. Fast search system, helpful staff, and perfect study rooms.",
    },
    {
      name: "Student 2",
      role: "University Member",
      avatar: "S",
      text: "E-resources are very easy to access and download. Highly recommend to other students.",
    },
    {
      name: "Student 3",
      role: "University Member",
      avatar: "S",
      text: "The library platform is intuitive and modern. I can find journals and books quickly.",
    },
  ];

  // motion variants (reusable)
  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const hoverGrow = { whileHover: { scale: 1.03 }, transition: { type: "spring", stiffness: 300 } };

  return (
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          pb: { xs: 8, md: 12 },
        }}
      >

        <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 10 } }}>
          {/* HERO */}
          <Grid container spacing={6} alignItems="center" sx={{ width: "100%", mb: { xs: 10, md: 14 } }}>
            <Grid item xs={12} md={6}>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.12,
                    mb: 3,
                    fontSize: { xs: "1.9rem", md: "3rem" },
                  }}
                >
                  Your Digital Library Hub
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 560, lineHeight: 1.7 }}>
                  Explore thousands of books, journals, e-resources, and research materials with ease. Built for students,
                  educators, and researchers — fast, modern, and accessible.
                </Typography>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <TextField
                    fullWidth
                    placeholder="Search books, journals, authors..."
                    variant="outlined"
                    size="large"
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 3,
                      mb: 3,
                      ".MuiOutlinedInput-root": { py: 1.1 },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <motion.div {...hoverGrow}>
                    <Button variant="contained" size="large" sx={{ px: 4, borderRadius: 3 }}>
                      Explore Collections
                    </Button>
                  </motion.div>
                  <motion.div {...hoverGrow}>
                    <Button variant="outlined" size="large" sx={{ px: 4, borderRadius: 3 }}>
                      Library Services
                    </Button>
                  </motion.div>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={10} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Swiper
                  modules={[Autoplay, Pagination]}
                  slidesPerView={1}
                  loop
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                >
                  {[
                    "https://picsum.photos/seed/library1/1200/750",
                    "https://picsum.photos/seed/library2/1200/750",
                    "https://picsum.photos/seed/library3/1200/750",
                  ].map((src, i) => (
                    <SwiperSlide key={i}>
                      <motion.img
                        src={src}
                        alt={`slide-${i}`}
                        style={{ width: "100%", height: 500, objectFit: "cover", display: "block" }}
                        initial={{ scale: 1.06 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.6 }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Paper>
            </Grid>
          </Grid>

          {/* STAT CARDS */}
          <Grid container spacing={3} justifyContent="space-around" sx={{ mb: { xs: 8, md: 12 } }}>
            {stats.map((s, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Paper
                    elevation={3}
                    sx={{
                      width: "200px",
                      py: 4,
                      px: 2,
                      textAlign: "center",
                      borderRadius: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LibraryBooksIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
                      {s.num}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* TRENDING RESOURCES */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Trending Resources
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Popular this week — curated picks.
                </Typography>
              </Grid>
            </Grid>

            <Swiper
              modules={[Autoplay]}
              slidesPerView={2}
              spaceBetween={30} 

              breakpoints={{
                600: { slidesPerView: 3 },
                960: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 2600, disableOnInteraction: false }}
            >
              {sampleBooks.slice(0, 8).map((b) => (
                <SwiperSlide key={b.id}>
                  <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <Box sx={{ p: 1 }}>
                      <Card
                        sx={{
                          overflow: "hidden",
                          height: "100%",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Badge */}
                        <Badge
                          badgeContent="New"
                          color="primary"
                          sx={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}
                        />

                        {/* Image */}
                        <Box
                          component="img"
                          src={b.cover || b.image || b.img}
                          alt={b.title}
                          sx={{
                            width: "100%",
                            height: 180,
                            objectFit: "cover",
                            mb: 1,
                          }}
                        />

                        {/* Card Content */}
                        <CardContent
                          sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {b.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {b.author}
                          </Typography>

                          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                            <Rating value={b.rating || 5} size="small" readOnly />
                            <Typography variant="body2" color="text.secondary">
                              ({b.reviews || 120})
                            </Typography>
                          </Stack>

                          <Box sx={{ mt: "auto" }}>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<FavoriteIcon />}
                              sx={{ mt: 2, borderRadius: 2, width: "100%" }}
                            >
                              Borrow
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

          </Box>

          {/* CATEGORIES */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Browse by Category
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover by subject area.
                </Typography>
              </Grid>
            </Grid>

            <Swiper
              slidesPerView={3}
              spaceBetween={14}
              slidesOffsetBefore={20} // padding left
              slidesOffsetAfter={20}  // padding right
              breakpoints={{
                600: { slidesPerView: 4 },
                960: { slidesPerView: 6 },
              }}
            >
              {categories.map((c, i) => (
                <SwiperSlide key={i}>
                  <Box sx={{ px: 2, py: 1, bgcolor: "#f5f5f5", borderRadius: 2 }}> {/* internal padding inside slide */}
                    <Tooltip title={`Explore ${c.name}`}>
                      <Chip
                        label={c.name}
                        icon={c.icon}
                        clickable
                        sx={{
                          px: 3,
                          py: 1.6,
                          fontWeight: 700,
                          borderRadius: 3,
                          bgcolor: "background.paper",
                          boxShadow: 1,
                          "&:hover": { bgcolor: "primary.main", color: "#fff", transform: "scale(1.04)" },
                          transition: "all 0.25s",
                        }}
                      />
                    </Tooltip>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          {/* FEATURED BOOKS GRID */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            {/* Header */}
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Featured Books
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hand-picked & recommended reads
                </Typography>
              </Grid>

              <Grid item>
                <Button size="small" variant="outlined">
                  View All
                </Button>
              </Grid>
            </Grid>

            {/* Book Grid */}
            <Grid container justifyContent="space-around" spacing={{ xs: 2, sm: 3, md: 4 }}>
              {sampleBooks.map((b) => (
                <Grid
                  item
                  xs={12}  // 1 per row on mobile
                  sm={6}   // 2 per row on small screens
                  md={4}   // 3 per row on medium screens
                  lg={3}   // 4 per row on large screens
                  xl={2}   // 6 per row on extra large screens
                  key={b.id}
                >
                  <motion.div
                    whileHover={{ scale: 1.03, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                        height: "100%",
                        "&:hover": { boxShadow: 6 },
                      }}
                    >
                      {/* Book Image */}
                      <Box
                        component="img"
                        src={b.cover || b.image || b.img}
                        alt={b.title}
                        sx={{
                          width: "100%",
                          height: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280 },
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />

                      {/* Card Content */}
                      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {b.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {b.author}
                        </Typography>

                        <Stack direction="row" spacing={1} mt={1} alignItems="center">
                          <Rating value={b.rating || 5} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            ({b.reviews || 120})
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} mt="auto">
                          <Button size="small" variant="outlined" startIcon={<InfoIcon />} sx={{ flex: 1 }}>
                            Details
                          </Button>
                          <Button size="small" variant="contained" startIcon={<FavoriteIcon />} sx={{ flex: 1 }}>
                            Borrow
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* NEWS */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              Tin Tức | Sự Kiện
            </Typography>

            <Grid container spacing={4}>
              {news.map((n, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                      <Box sx={{ width: "100%", height: 4, bgcolor: "primary.main", borderRadius: 2, mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                        {n.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {n.text}
                      </Typography>

                      <Button size="small" sx={{ mt: 2 }}>
                        Read More
                      </Button>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

        </Container>
      </Box>
  );
}
