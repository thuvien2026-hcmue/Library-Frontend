// components/home/VideoSection.jsx
import { Box, Typography, Dialog } from "@mui/material";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function VideoSection({ open, setOpen, BGImage2 }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: 650,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${BGImage2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          px: 3,
          py: { xs: 6, md: 10 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          onClick={() => setOpen(true)}
          animate={{
            scale: [1, 1.15, 1],
            boxShadow: [
              "0 0 0px rgba(255,255,255,0.3)",
              "0 0 25px rgba(255,255,255,0.6)",
              "0 0 0px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 40, color: "white" }} />
        </motion.div>

        <Typography
          sx={{
            mt: 4,
            fontSize: { xs: "32px", md: "54px" },
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            fontFamily: "Satisfy",
          }}
        >
          Khám phá Thư viện
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: { xs: "22px", md: "34px" },
            fontWeight: 600,
            color: "white",
            textAlign: "center",
          }}
        >
          Hành trình tri thức bắt đầu từ đây
        </Typography>
      </Box>

      {/* DIALOG VIDEO */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%", // 16:9 ratio
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/euT9loeZNUw"
            title="Video Intro"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Box>
      </Dialog>
    </>
  );
}
