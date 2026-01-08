import { useEffect, useState } from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useToast } from "../../context/ToastContext";
import { useLocation } from "react-router-dom";
import { apiFetch } from "../../services/api";

export default function PostAdd() {
  const location = useLocation();
  const parentId = new URLSearchParams(location.search).get("parent_id");

  const [post, setPost] = useState({
    page_id: "",
    parent_id: parentId ? Number(parentId) : null, // 👈 THÊM
    name: "",
    description: "",
    content: "",
  });


  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!parentId) return;

    apiFetch(`/posts/${parentId}`)
      .then((res) => res.json())
      .then((parentPost) => {
        setPost((prev) => ({
          ...prev,
          page_id: parentPost.page_id,
        }));
      });
  }, [parentId]);


  useEffect(() => {
    apiFetch("/pages")
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  const resetForm = () => {
    setPost({
      page_id: "",
      name: "",
      description: "",
      content: "",
    });
  };

  const submit = async () => {
    if (!post.page_id || !post.name) {
      return showToast("Please fill required fields!", "error");
    }

    setLoading(true);

    const apiUrl = parentId
      ? "/posts/child/add"
      : "/posts/add";

    const res = await apiFetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(data.message || "Failed to create post", "error");
      return;
    }

    showToast(
      parentId ? "Child post created successfully!" : "Post created successfully!"
    );

    resetForm();
  };


  return (
    <Box sx={{ maxWidth: 800 }}>
      <TextField
        fullWidth
        select
        label={parentId ? "Post" : "Page"}
        value={post.page_id}
        disabled={!!parentId}
        onChange={(e) => setPost({ ...post, page_id: e.target.value })}
        sx={{ mb: 2 }}
      >
        {pages.map((p) => (
          <MenuItem value={p.id} key={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label={parentId ? "Post Child Name" : "Post Name"}
        value={post.name}
        onChange={(e) => setPost({ ...post, name: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={post.description}
        sx={{ mb: 2 }}
        onChange={(e) =>
          setPost({ ...post, description: e.target.value })
        }
      />

      <Editor
        value={post.content}
        onEditorChange={(newValue) =>
          setPost({ ...post, content: newValue })
        }
        apiKey="oq2a9p79qnb2jttj0svtdh35vekryddr2ub8em9r2dvzhqe6"
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
              "https://library-backend-xhvu.onrender.com/api/media/upload",
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


      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Create"}
      </Button>
    </Box>
  );
}
