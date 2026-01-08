// components/home/NewsEventSection.jsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://library-backend-xhvu.onrender.com/api";

export default function NewsEventSection() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventRes] = await Promise.all([
          axios.get(`${API_BASE}/posts/list/tin-tuc-su-kien`),
          axios.get(`${API_BASE}/posts/list/thong-bao`)
        ]);

        setNews(newsRes.data.data || []);
        setEvents(eventRes.data.data || []);
      } catch (err) {
        console.error("Fetch news/events error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 3, mb: { xs: 2, md: 4 }, flexWrap: "wrap" }}>
      
      {/* NEWS */}
      <Box
        sx={{
          flex: "1 1 33%",
          minWidth: 250,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Tin Tức & Sự Kiện
        </Typography>

        {news.map((n) => (
          <Box
            key={n.slug}
            component={Link}
            to={`/${n.page_slug}/${n.slug}`}
            sx={{
              mb: 2,
              display: "block",
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              "&:hover .title": { color: "primary.main" },
            }}
          >
            <Typography
              variant="subtitle1"
              className="title"
              sx={{ fontWeight: 700 }}
            >
              {n.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
              {n.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* EVENTS */}
      <Box
        sx={{
          flex: "1 1 33%",
          minWidth: 250,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Thông Báo
        </Typography>

        {events.map((e) => (
          <motion.div
            key={e.slug}
            whileHover={{ x: 6, opacity: 0.85 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Box
              component={Link}
              to={`/${e.page_slug}/${e.slug}`}
              sx={{
                mb: 2,
                display: "block",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
              >
                <PlayArrowIcon fontSize="small" />
                {e.name}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
