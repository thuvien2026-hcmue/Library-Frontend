import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    Divider,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Editor } from "@tinymce/tinymce-react";
import { Helmet } from "react-helmet-async";

export default function Post() {
    const { category, slug } = useParams(); // <-- get slug from URL
    const user = JSON.parse(localStorage.getItem("user"));
    const canEdit = user && (user.role === "admin" || user.role === "editor");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const navigate = useNavigate();
    const insertFormToContent = () => {
        const formHtml = `
<form class="page-form" data-form="true">
  <div class="form-group">
    <label>Full name</label>
    <input type="text" name="name" />
  </div>

  <div class="form-group">
    <label>Email</label>
    <input type="email" name="email" />
  </div>

  <div class="form-group">
    <label>Message</label>
    <textarea name="message"></textarea>
  </div>

  <button type="submit">Submit</button>
</form>
`;

        setBackupContent(content);
        setContent(content + formHtml);
        setIsEditing(true);
    };

    const [content, setContent] = useState("");
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState("");

    const [backupContent, setBackupContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isHtml, setIsHtml] = useState(false);
    const [htmlText, setHtmlText] = useState("");
    const [menuItems, setMenuItems] = useState([]);


    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);


    // ---------------- IMAGE UPLOAD ----------------
    function UploadAdapter(loader) {
        this.loader = loader;
    }

    UploadAdapter.prototype.upload = function () {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("upload", file);
                    formData.append("post_id", postId);

                    const token = localStorage.getItem("token");

                    fetch("http://localhost:5000/api/media/upload", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`, // 🔥 BẮT BUỘC
                        },
                        body: formData,
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (!data.url) {
                                reject("Upload failed");
                                return;
                            }

                            resolve({
                                default: data.url, // CKEditor REQUIRE
                            });
                        })
                        .catch((err) => reject(err));
                })
        );
    };


    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
        };
    }

    useEffect(() => {
        if (!postId) return;

        const handleSubmit = async (e) => {
            const form = e.target;

            // 🔥 chỉ bắt form do CMS tạo
            if (!form.matches("form[data-form='true']")) return;

            e.preventDefault();

            const formData = new FormData(form);
            const data = {};

            for (let [key, value] of formData.entries()) {
                if (key.endsWith("[]")) {
                    const k = key.replace("[]", "");
                    if (!data[k]) data[k] = [];
                    data[k].push(value);
                } else {
                    if (data[key]) {
                        if (!Array.isArray(data[key])) data[key] = [data[key]];
                        data[key].push(value);
                    } else {
                        data[key] = value;
                    }
                }
            }

            try {
                await fetch("http://localhost:5000/api/form-results/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        post_id: postId,
                        post_slug: slug,
                        form_data: data,
                    }),
                });

                alert("Gửi thành công");
                form.reset();
            } catch (err) {
                alert("Gửi thất bại");
            }
        };

        // 🔥 event delegation
        document.addEventListener("submit", handleSubmit);

        return () => {
            document.removeEventListener("submit", handleSubmit);
        };
    }, [postId, slug]);


    // ---------------- END IMAGE UPLOAD ------------

    // LOAD POST BY SLUG
    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/slug/${slug}`)
            .then((res) => {
                if (res.status === 404) {
                    navigate("/", { replace: true });  // ⭐ redirect if slug invalid
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (!data) return;

                setContent(data.content || "");
                setPostId(data.id);
                setTitle(data.name);

                fetch(`http://localhost:5000/api/posts/by-page/${data.page_id}`)
                    .then(res => res.json())
                    .then(setMenuItems);
            })
            .catch(() => {
                navigate("/", { replace: true });
            });
    }, [slug]);


    // SAVE HTML MODE
    const saveHtml = () => {
        setContent(htmlText);
        setIsHtml(false);
    };

    // SAVE UPDATE TO BACKEND
    const saveToDatabase = async () => {
        if (!postId) return alert("Post ID is missing!");

        const token = localStorage.getItem("token");

        await fetch("http://localhost:5000/api/posts/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: postId, content }),
        });

        setIsEditing(false);
    };


    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                px: { xs: 2, md: 4 },
                py: 4,
                maxWidth: 1400,
                mx: "auto",
                flexDirection: { xs: "column", md: "row" },
                mt: { xs: 6, md: 10 },
            }}
        >
            <Helmet>
                <title>{title} | HCMUE</title>
            </Helmet>
            {/* LEFT CONTENT */}
            <Paper elevation={3} sx={{ flex: 1, p: 3, position: "relative" }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    {title}
                </Typography>

                {isEditing ? (
                    <>
                        {isHtml ? (
                            <Box>
                                <TextField
                                    multiline
                                    fullWidth
                                    minRows={10}
                                    value={htmlText}
                                    onChange={(e) => setHtmlText(e.target.value)}
                                />

                                <Button variant="contained" sx={{ mt: 2, mr: 1 }} onClick={saveHtml}>
                                    Save HTML
                                </Button>
                                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setIsHtml(false)}>
                                    Cancel
                                </Button>
                            </Box>
                        ) : (
                            <>
                                <Editor
                                    value={content}
                                    onEditorChange={(newValue) => setContent(newValue)}
                                    apiKey="lnx4b7wzoac3yanvgdy73rbpz9ayrsuawwmm87xk7l6t6h3h"
                                    init={{
                                        height: 500,
                                        menubar: true,

                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',


                                        /* ===== CHO PHÉP HTML TỰ DO ===== */
                                        valid_elements: "*[*]",
                                        extended_valid_elements:
                                            "iframe[src|width|height|name|align|class|allowfullscreen|frameborder]," +
                                            "form[action|method|class|id|data-form]," +
                                            "input[type|name|value|class|id|placeholder]," +
                                            "textarea[name|class|id]," +
                                            "button[type|class|id]",

                                        /* ===== UPLOAD ẢNH ===== */
                                        images_upload_handler: async (blobInfo) => {
                                            const formData = new FormData();

                                            // ✅ phải là "file" để khớp upload.single("file")
                                            formData.append("file", blobInfo.blob(), blobInfo.filename());
                                            formData.append("post_id", postId);

                                            const token = localStorage.getItem("token");

                                            const res = await fetch("http://localhost:5000/api/media/upload", {
                                                method: "POST",
                                                headers: { Authorization: `Bearer ${token}` },
                                                body: formData,
                                            });

                                            const data = await res.json();
                                            if (!data.url) throw new Error(data.message || "Upload failed");

                                            return data.url; // TinyMCE cần URL string
                                        },

                                        /* ===== CHO PHÉP IFRAME GOOGLE MAP ===== */
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

                        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                            <Button variant="contained" onClick={saveToDatabase}>
                                Save Changes
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setContent(backupContent);
                                    setIsEditing(false);
                                    setIsHtml(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        {canEdit && (
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
                                    setIsEditing(true);
                                }}
                            >
                                Edit Content
                            </MenuItem>

                            <MenuItem
                                onClick={() => {
                                    handleMenuClose();
                                    insertFormToContent();
                                }}
                            >
                                Add Form
                            </MenuItem>
                        </Menu>

                        <Box sx={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: content }} />

                        {slug === "lien-lac" ? (
                            <p><iframe allowfullscreen="" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2431.9133386723465!2d106.68147210753996!3d10.762044618562554!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f80e20fac13%3A0x4814b22c14d14e5c!2zTmjDoCBHOiBUw7JhIG5ow6AgdGjGsCB2aeG7h24gLSBOaMOgIGzDoG0gdmnhu4djIEdpw6FvIHPGsA!5e1!3m2!1svi!2s!4v1725941705178!5m2!1svi!2s" width="720"></iframe></p>
                        ) : (
                            ""
                        )}
                    </>
                )}
            </Paper>

            {/* RIGHT SIDEBAR */}

            {menuItems.length > 1 && (
                <Box
                    sx={{
                        width: 260,
                        position: "sticky",
                        top: { md: scrolled ? 110 : 100 },
                        transition: "top 0.3s",
                        alignSelf: "flex-start",
                        display: { xs: "none", lg: "block" },
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{ p: 2, borderRadius: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                            {menuItems[0]?.page_name}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <List>
                            {menuItems.map(item => (
                                <ListItemButton
                                    key={item.id}
                                    component={Link}
                                    to={`/${item.page_slug}/${item.slug}`}
                                    selected={slug === item.slug}
                                >
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Box>
            )}
        </Box>
    );
}
