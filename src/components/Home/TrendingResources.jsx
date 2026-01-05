// components/home/TrendingResources.jsx
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TrendingResources({ books = [] }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: { xs: 8, md: 12 }, mt: { xs: 8, md: 12 } }}>
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
        spaceBetween={18}
        breakpoints={{ 600: { slidesPerView: 3 }, 960: { slidesPerView: 4 } }}
        autoplay={{ delay: 2600, disableOnInteraction: false }}
      >
        {books.map((b) => {
          const cover = b.image || "";
          return (
            <SwiperSlide key={b.id}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card
                  onClick={() => navigate(`/trend-books/${b.slug}`)}
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: 1,
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: 0,
                    transition: "0.2s",
                    "&:hover": { boxShadow: 3 },
                  }}
                >
                  {/* COVER */}
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={
                        cover ||
                        "https://via.placeholder.com/600x900?text=No+Cover"
                      }
                      alt={b.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/600x900?text=No+Cover";
                      }}
                      sx={{
                        width: "100%",
                        height: 220,
                        objectFit: "contain",
                        display: "block",
                        filter: cover ? "none" : "grayscale(1)",
                      }}
                    />

                    {/* gradient overlay for better text/readability */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 60%)",
                      }}
                    />

                    {/* small chip-like label */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        px: 1,
                        py: 0.4,
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                        color: "common.white",
                        bgcolor: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      New
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 2 }}>
                    {/* TITLE clamp */}
                    <Tooltip title={b.name || ""} arrow disableInteractive>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 900,
                          lineHeight: 1.25,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: 40, // keeps cards same height even if 1 line
                        }}
                      >
                        {b.name}
                      </Typography>
                    </Tooltip>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      Click to view details
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
