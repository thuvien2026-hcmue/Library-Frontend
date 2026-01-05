// components/home/GallerySection.jsx
import { Box, Typography, Grid, useMediaQuery } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function GallerySection({ images, BGImage }) {
  const theme = useTheme();

  // breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const isMasonry = isMobile || isTablet;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 650,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${BGImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: { xs: "scroll", md: "fixed" },
        px: 3,
        py: { xs: 6, md: 10 },
        position: "relative",
        mb: 10,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Khoảnh khắc thư viện
      </Typography>

      {/* ===== MOBILE / TABLET: MASONRY ===== */}
      {isMasonry ? (
        <Masonry
          columns={isMobile ? 1 : 2}
          spacing={1}
          sx={{ maxWidth: 1200, mx: "auto" }}
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Box
                component="img"
                src={src}
                alt={`gallery-${i}`}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  display: "block",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                }}
              />
            </motion.div>
          ))}
        </Masonry>
      ) : (
        /* ===== DESKTOP: GRID (GIỮ NGUYÊN) ===== */
        <Grid container spacing={1} justifyContent="center">
          {images.map((src, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`gallery-${i}`}
                  sx={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                  }}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
