import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Editor } from "@tinymce/tinymce-react";
import { Helmet } from "react-helmet-async";

export default function TrendBook() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const canEdit = user && (user.role === "admin" || user.role === "editor");

  const [trendId, setTrendId] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // cover image
  const [content, setContent] = useState("");

  const [backupContent, setBackupContent] = useState("");
  const [backupImage, setBackupImage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isHtml, setIsHtml] = useState(false);
  const [htmlText, setHtmlText] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const fileInputRef = useRef(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // LOAD trend book by slug
  useEffect(() => {
    fetch(`http://localhost:5000/api/trend-books/slug/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          navigate("/", { replace: true });
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setTrendId(data.id);
        setTitle(data.name || "");
        setImage(data.image || "");
        setContent(data.content || "");
      })
      .catch(() => navigate("/", { replace: true }));
  }, [slug, navigate]);

  const saveHtml = () => {
    setContent(htmlText);
    setIsHtml(false);
  };

  const saveToDatabase = async () => {
    if (!trendId) return alert("Missing trend_book id!");

    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/trend-books/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: trendId,
        name: title,
        image,
        content,
      }),
    });

    setIsEditing(false);
  };

  const uploadCover = async (file) => {
    if (!file || !trendId) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("trend_book_id", trendId);

    const res = await fetch("http://localhost:5000/api/trend-books/upload-image", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!data.url) throw new Error("Upload failed");
    setImage(data.url);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 4,
        maxWidth: 1400,
        mx: "auto",
        mt: { xs: 6, md: 10 },
      }}
    >
      <Helmet>
        <title>{title} | Trending Book</title>
      </Helmet>

      <Paper elevation={3} sx={{ p: 3, position: "relative" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          {title}
        </Typography>

        {/* MENU EDIT */}
        {!isEditing && canEdit && (
          <IconButton
            onClick={handleMenuOpen}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <MoreVertIcon />
          </IconButton>
        )}

        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              setBackupContent(content);
              setBackupImage(image);
              setIsEditing(true);
            }}
          >
            Edit
          </MenuItem>
        </Menu>

        {isEditing ? (
          <>
            {/* Cover + Title edit */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
                gap: 3,
                mb: 2,
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    height: 340,
                    borderRadius: 0,
                    overflow: "hidden",
                    border: "1px solid #eee",
                    bgcolor: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    objectFit: "contain",
                  }}
                >
                  {image ? (
                    <Box
                      component="img"
                      src={image}
                      alt=""
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No cover
                    </Typography>
                  )}
                </Box>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadCover(f);
                  }}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Cover
                </Button>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ mb: 2 }}
                />

                {isHtml ? (
                  <>
                    <TextField
                      multiline
                      fullWidth
                      minRows={12}
                      value={htmlText}
                      onChange={(e) => setHtmlText(e.target.value)}
                    />

                    <Button variant="contained" sx={{ mt: 2, mr: 1 }} onClick={saveHtml}>
                      Save HTML
                    </Button>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setIsHtml(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Editor
                      value={content}
                      onEditorChange={(newValue) => setContent(newValue)}
                      apiKey="lnx4b7wzoac3yanvgdy73rbpz9ayrsuawwmm87xk7l6t6h3h"
                      init={{
                        height: 500,
                        menubar: true,
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",

                        valid_elements: "*[*]",
                        extended_valid_elements:
                          "iframe[src|width|height|name|align|class|allowfullscreen|frameborder]",

                        media_live_embeds: true,
                        sandbox_iframes: false,
                      }}
                    />

                    <Button
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        setHtmlText(content);
                        setIsHtml(true);
                      }}
                    >
                      Edit HTML
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={saveToDatabase}>
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setContent(backupContent);
                  setImage(backupImage);
                  setIsEditing(false);
                  setIsHtml(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              px: 5,
              py: 3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: image ? "260px 1fr" : "1fr" },
              gap: 3,
              alignItems: "start",
            }}
          >
            {image && (
              <Box
                component="img"
                src={image}
                alt=""
                sx={{
                  width: "100%",
                  borderRadius: 0,
                  boxShadow: 1,
                  objectFit: "cover",
                }}
              />
            )}

            <Box sx={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: content }} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
