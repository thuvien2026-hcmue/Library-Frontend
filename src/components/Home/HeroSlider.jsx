// components/home/HeroSlider.jsx
import { Grid, Paper, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

export default function HeroSlider({ images }) {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        width: "100%",
        mb: { xs: 2, md: 3 },
        mt: { xs: 6, md: 10 },
      }}
    >
      <Grid item xs={12} md={6}>
        <Paper elevation={10} sx={{ overflow: "hidden", borderRadius: 0 }}>
          <Swiper
            modules={[Autoplay, Pagination, EffectCube]}
            effect="cube"
            grabCursor
            cubeEffect={{
              shadow: true,
              shadowOffset: 40,
              shadowScale: 0.94,
            }}
            slidesPerView={1}
            loop
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className} custom-bullet"></span>`,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <Box
                  component="img"
                  src={src}
                  sx={{
                    width: "100%",
                    height: { xs: 250, sm: 300, md: 500 },
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Paper>
      </Grid>
    </Grid>
  );
}
