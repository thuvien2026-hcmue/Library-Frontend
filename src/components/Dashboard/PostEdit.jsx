import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { Editor } from "@tinymce/tinymce-react";

import PostChildList from "./PostChildList";
import { apiFetch } from "../../services/api";

export default function PostEdit() {
  const location = useLocation();
  const parentId = new URLSearchParams(location.search).get("parent_id")
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [post, setPost] = useState({
    id: null,
    parent_id: parentId ? Number(parentId) : null,
    page_id: "",
    name: "",
    description: "",
    content: "",
  });


  const [pages, setPages] = useState([]);

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/pages").then((r) => r.json()),
      fetch(`http://localhost:5000/api/posts/${id}`).then((r) => r.json()),
    ])
      .then(([pagesData, postData]) => {
        setPages(pagesData);
        setPost({
          id: postData.id,
          page_id: postData.page_id || "",
          name: postData.name || "",
          description: postData.description || "",
          content: postData.content || "",
        });
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ===== SAVE ===== */
  const handleUpdate = async () => {
    setSaving(true);
    setError("");

    try {
      const data = await apiFetch("/posts/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post.id,
          page_id: post.page_id,
          name: post.name,
          description: post.description,
          content: post.content,
        }),
      });

      // 👇 tới đây là update OK
      navigate("/dashboard/posts");

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      {/* ===== HEADER ===== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Edit Post
        </Typography>

        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>

      {/* ===== FORM ===== */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Stack spacing={3}>
          {error && (
            <Typography color="error" fontSize={14}>
              {error}
            </Typography>
          )}

          {/* PAGE */}
          <TextField
            select
            fullWidth
            label={parentId ? "Post" : "Page"}
            disabled={!!parentId}
            value={post.page_id}
            onChange={(e) =>
              setPost({ ...post, page_id: e.target.value })
            }
            required
          >
            {pages.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>

          {/* NAME */}
          <TextField
            fullWidth
            label={parentId ? "Post child name" : "Post name"}
            value={post.name}
            onChange={(e) =>
              setPost({ ...post, name: e.target.value })
            }
            required
          />

          {/* DESCRIPTION */}
          <TextField
            fullWidth
            label="Description"
            multiline
            minRows={3}
            value={post.description}
            onChange={(e) =>
              setPost({ ...post, description: e.target.value })
            }
          />

          {/* CONTENT */}
          <Box>
            <Typography
              fontWeight={600}
              mb={1}
              fontSize={14}
              color="text.secondary"
            >
              Content
            </Typography>

            <Box
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Editor
                value={post.content}
                onEditorChange={(newValue) =>
                  setPost({ ...post, content: newValue })
                }
                apiKey="lnx4b7wzoac3yanvgdy73rbpz9ayrsuawwmm87xk7l6t6h3h"
                init={{
                  height: 400,
                  menubar: true,

                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',

                  /* ===== CHO PHÉP HTML TỰ DO ===== */
                  valid_elements: "*[*]",
                  extended_valid_elements:
                    "iframe[src|width|height|class|allowfullscreen|frameborder|loading|referrerpolicy]," +
                    "form[action|method|class|id|data-form]," +
                    "input[type|name|value|class|id|placeholder]," +
                    "textarea[name|class|id]," +
                    "button[type|class|id]",

                  /* ===== UPLOAD ẢNH ===== */
                  images_upload_handler: async (blobInfo) => {
                    const formData = new FormData();
                    formData.append("upload", blobInfo.blob());
                    formData.append("post_id", post.id);

                    const token = localStorage.getItem("token");

                    const res = await fetch(
                      "http://localhost:5000/api/media/upload",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                      }
                    );

                    const data = await res.json();

                    if (!data.url) {
                      throw new Error("Upload failed");
                    }

                    return data.url;
                  },

                  media_live_embeds: true,
                }}
              />

            </Box>
          </Box>

          {/* ACTIONS */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleUpdate}
              disabled={saving}
            >
              {saving ? "Saving..." : "Update Post"}
            </Button>
          </Box>
        </Stack>
      </Paper>

      <PostChildList parentPost={post} />
    </Box>
  );
}
