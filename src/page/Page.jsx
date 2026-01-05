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
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Editor } from "@tinymce/tinymce-react";

import { Helmet } from "react-helmet-async";

export default function Page() {
    const { slug } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const canEdit = user && (user.role === "admin" || user.role === "editor");
    const navigate = useNavigate();

    /* ================= STATE ================= */
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [formHtml, setFormHtml] = useState("");

    const [menuItems, setMenuItems] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [isFormEditing, setIsFormEditing] = useState(false);
    const [isHtml, setIsHtml] = useState(false);
    const [htmlText, setHtmlText] = useState("");
    const [backupContent, setBackupContent] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };


    /* ================= HELPERS ================= */
    const extractForm = (html) => {
        const match = html.match(/<form[\s\S]*?<\/form>/);
        return match ? match[0] : "";
    };

    const removeForm = (html) =>
        html.replace(/<form[\s\S]*?<\/form>/, "");

    function UploadAdapter(loader) {
        this.loader = loader;
    }

    UploadAdapter.prototype.upload = function () {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("upload", file);       // <--- file name must be "upload"
                    formData.append("post_id", postId);    // attach Post ID

                    fetch("http://localhost:5000/api/media/upload", {
                        method: "POST",
                        body: formData,
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            resolve({
                                default: data.url, // CKEditor will insert uploaded image URL
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

    /* ================= LOAD POST ================= */
    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/slug/${slug}`)
            .then((res) => (res.status === 404 ? null : res.json()))
            .then((data) => {
                if (!data) return;

                const foundForm = extractForm(data.content || "");

                setPostId(data.id);
                setTitle(data.name);
                setFormHtml(foundForm);
                setContent(removeForm(data.content || ""));

                fetch(`http://localhost:5000/api/posts/by-page/${data.page_id}`)
                    .then((res) => res.json())
                    .then(setMenuItems);
            })
            .catch(() => navigate("/", { replace: true }));
    }, [slug, navigate]);

    /* ================= FORM ================= */
    const insertForm = () => {
        setFormHtml(`
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
`);
        setIsFormEditing(true);
    };

    /* ================= SAVE ================= */
    const saveToDatabase = async () => {
        if (!postId) return alert("Missing post ID");

        const finalContent = content + (formHtml || "");
        const token = localStorage.getItem("token");

        await fetch("http://localhost:5000/api/posts/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id: postId,
                content: finalContent,
            }),
        });

        setIsEditing(false);
        setIsFormEditing(false);
        setIsHtml(false);
    };

    /* ================= RENDER ================= */
    return (
        <Box sx={{ display: "flex", gap: 3, px: 3, py: 4, maxWidth: 1400, mx: "auto", mt: 10 }}>
            <Helmet>
                <title>{title} | HCMUE</title>
            </Helmet>

            {/* LEFT */}
            <Paper sx={{ flex: 1, p: 3, position: "relative" }}>
                <Typography variant="h5" fontWeight={700} mb={2}>
                    {title}
                </Typography>

                {/* FORM EDITOR */}
                {isFormEditing && (
                    <Box mb={3}>
                        <Typography fontWeight={700} mb={1}>
                            Form Editor (Raw HTML)
                        </Typography>

                        <TextField
                            multiline
                            fullWidth
                            minRows={10}
                            value={formHtml}
                            onChange={(e) => setFormHtml(e.target.value)}
                        />

                        <Box mt={2} display="flex" gap={2}>
                            <Button variant="contained" onClick={() => setIsFormEditing(false)}>
                                Save Form
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => setFormHtml("")}>
                                Remove Form
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* CONTENT */}
                {isEditing ? (
                    <>
                        {isHtml ? (
                            <>
                                <TextField
                                    multiline
                                    fullWidth
                                    minRows={10}
                                    value={htmlText}
                                    onChange={(e) => setHtmlText(e.target.value)}
                                />
                                <Button sx={{ mt: 2 }} onClick={() => { setContent(htmlText); setIsHtml(false); }}>
                                    Save HTML
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
                                            formData.append("upload", blobInfo.blob());
                                            formData.append("post_id", postId);

                                            const token = localStorage.getItem("token");

                                            const res = await fetch("http://localhost:5000/api/media/upload", {
                                                method: "POST",
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                                body: formData,
                                            });

                                            const data = await res.json();

                                            if (!data.url) throw new Error("Upload failed");

                                            return data.url;
                                        },

                                        /* ===== CHO PHÉP IFRAME GOOGLE MAP ===== */
                                        media_live_embeds: true,
                                        sandbox_iframes: false,
                                    }}
                                />


                                <Button sx={{ mt: 2 }} onClick={() => { setHtmlText(content); setIsHtml(true); }}>
                                    Edit HTML
                                </Button>
                            </>
                        )}

                        <Box mt={3} display="flex" gap={2}>
                            <Button variant="contained" onClick={saveToDatabase}>
                                Save Changes
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        {canEdit && (
                            <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <MoreVertIcon />
                            </IconButton>
                        )}

                        <Menu anchorEl={anchorEl} open={openMenu} onClose={() => setAnchorEl(null)}>
                            <MenuItem onClick={() => { setBackupContent(content); setIsEditing(true); setAnchorEl(null); }}>
                                Edit Content
                            </MenuItem>
                            <MenuItem onClick={() => { insertForm(); setAnchorEl(null); }}>
                                Add / Edit Form
                            </MenuItem>
                        </Menu>

                        <Box dangerouslySetInnerHTML={{ __html: content }} />
                        {formHtml && <Box mt={3} dangerouslySetInnerHTML={{ __html: formHtml }} />}

                        {(() => {
                            if (slug?.includes("thu-vien-truong-dai-hoc-su-pham")) {
                                return (
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                        <Box
                                            sx={{
                                                width: { xs: "100%", sm: "90%", md: "80%", lg: "720px" },
                                                p: 2,
                                                background: "white",
                                                borderRadius: 2,
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <iframe
                                                allowFullScreen
                                                height="450"
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2431.9133386723465!2d106.68147210753996!3d10.762044618562554!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f80e20fac13%3A0x4814b22c14d14e5c!2zTmjDoCBHOiBUw7JhIG5ow6AgdGjGsCB2aeG7h24gLSBOaMOgIGzDoG0gdmnhu4djIEdpw6FvIHPGsA!5e1!3m2!1svi!2s!4v1725941705178!5m2!1svi!2s"
                                                style={{ border: 0, width: "100%", borderRadius: "10px" }}
                                            />
                                        </Box>
                                    </Box>
                                );
                            }

                            if (slug?.includes("tai-lieu")) {

                                return (
                                    <>
                                        {/* ===== Thư viện ===== */}
                                        <Accordion
                                            expanded={expanded === "panel1"}
                                            onChange={handleChange("panel1")}
                                            disableGutters
                                            elevation={1}
                                            sx={{ borderRadius: 2, mb: 1, "&:before": { display: "none" } }}
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={800}>Thư viện</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ p: 0 }}>
                                                <List disablePadding>
                                                    <ListItemButton component={Link} to="/tai-lieu/danh-muc-sach-co-so-222-le-van-sy">
                                                        <ListItemText primary="Danh Mục Sách Cơ Sở 222 Lê Văn Sỹ" />
                                                    </ListItemButton>
                                                    <ListItemButton component={Link} to="/tai-lieu/danh-muc-sach-co-so-280-an-duong-vuong">
                                                        <ListItemText primary="Danh Mục Sách Cơ Sở 280 An Dương Vương" />
                                                    </ListItemButton>
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>

                                        {/* ===== Tủ sách khoa ===== */}
                                        <Accordion
                                            expanded={expanded === "panel2"}
                                            onChange={handleChange("panel2")}
                                            disableGutters
                                            elevation={1}
                                            sx={{ borderRadius: 2, mb: 1, "&:before": { display: "none" } }}
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={800}>Tủ sách khoa</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ p: 0 }}>
                                                <List disablePadding>
                                                    <ListItemButton component={Link} to="/tu-sach-khoa/toan">
                                                        <ListItemText primary="Khoa Giáo Dục Mầm Non" />
                                                    </ListItemButton>
                                                    <ListItemButton component={Link} to="/tu-sach-khoa/van">
                                                        <ListItemText primary="Khoa Tiếng Nga" />
                                                    </ListItemButton>
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>

                                        {/* ===== Tài liệu tham khảo ===== */}
                                        <Accordion
                                            expanded={expanded === "panel3"}
                                            onChange={handleChange("panel3")}
                                            disableGutters
                                            elevation={1}
                                            sx={{ borderRadius: 2, "&:before": { display: "none" } }}
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography fontWeight={800}>Tài liệu tham khảo</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ p: 0 }}>
                                                <List disablePadding>
                                                    <ListItemButton component={Link} to="#">
                                                        <ListItemText primary="Đang cập nhật..." />
                                                    </ListItemButton>
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                );
                            }

                            return null;
                        })()}

                    </>)}
            </Paper>

        </Box>
    );
}
