import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

export default function TrendBookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const fileRef = useRef(null);

  useEffect(() => {
    fetch(`https://library-backend-xhvu.onrender.com/api/trend-books/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data?.id) return navigate("/dashboard/trend-books");
        setName(data.name || "");
        setSlug(data.slug || "");
        setImage(data.image || "");
        setContent(data.content || "");
      });
  }, [id, navigate]);

  const uploadCover = async (file) => {
    const token = localStorage.getItem("token");
    const fd = new FormData();

    // ✅ phải match backend upload.single("file")
    fd.append("file", file);

    fd.append("trend_book_id", id);

    const res = await fetch("https://library-backend-xhvu.onrender.com/api/trend-books/upload-image", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) return alert(data.message || "Upload failed");
    if (!data.url) return alert("Upload failed");

    setImage(data.url);
  };

  const save = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://library-backend-xhvu.onrender.com/api/trend-books/update", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      // ✅ slug auto -> không cần gửi slug
      body: JSON.stringify({
        id: Number(id),
        name: name.trim(),
        image,
        content,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.status === 409) return alert("Slug already exists!");
    if (!res.ok) return alert(data.message || "Save failed!");

    // ✅ nếu backend auto-update slug theo name thì update UI
    if (data.slug) setSlug(data.slug);

    navigate("/dashboard/trend-books");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Edit Trend Book #{id}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
            gap: 3,
          }}
        >
          {/* LEFT: cover */}
          <Box>
            <Box
              sx={{
                width: "100%",
                height: 360,
                borderRadius: 0,
                overflow: "hidden",
                border: "1px solid #eee",
                bgcolor: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                objectFit: "cover",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No cover
                </Typography>
              )}
            </Box>

            <input
              ref={fileRef}
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
              onClick={() => fileRef.current?.click()}
            >
              Upload Cover
            </Button>
          </Box>

          {/* RIGHT: fields + editor */}
          <Box>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="Slug (auto)" value={slug} disabled />
            </Stack>

            <Editor
              value={content}
              onEditorChange={(v) => setContent(v)}
              apiKey="oq2a9p79qnb2jttj0svtdh35vekryddr2ub8em9r2dvzhqe6"
              init={{
                height: 520,
                menubar: true,
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                valid_elements: "*[*]",
                media_live_embeds: true,
                sandbox_iframes: false,
              }}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" onClick={save}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => navigate("/dashboard/trend-books")}>
                Back
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
