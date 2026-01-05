import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Typography, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function VanBanList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/vanban")
            .then((res) => res.json())
            .then((data) => {
                setRows(Array.isArray(data) ? data : data.data || []);
            });
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm("Delete this document?")) return;

        await fetch(`http://localhost:5000/api/vanban/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setRows((prev) => prev.filter((row) => row.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },

        {
            field: "tieu_de",
            headerName: "Tiêu đề",
            flex: 1,
            minWidth: 250,
        },

        {
            field: "so_hieu",
            headerName: "Số hiệu",
            width: 160,
        },

        {
            field: "category",
            headerName: "Loại",
            width: 160,
        },

        {
            field: "created_at",
            headerName: "Ngày tạo",
            width: 180,
            renderCell: (params) => {
                const value = params?.row?.created_at;
                if (!value) return "-";
                return new Date(value).toLocaleDateString("vi-VN");
            },
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 260,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to={`/dashboard/vanban/view/${params.row.id}`}
                    >
                        View
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to={`/dashboard/vanban/edit/${params.row.id}`}
                    >
                        Edit
                    </Button>

                    <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: "100%" }}>
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight={700}>
                    Văn bản / Công văn
                </Typography>

                <Button
                    variant="contained"
                    component={Link}
                    to="/dashboard/vanban/add"
                >
                    Add Văn bản
                </Button>
            </Box>

            {/* TABLE */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 2,
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    pageSizeOptions={[10, 20, 50]}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    sx={{
                        width: "100%",
                        minWidth: 0,
                        border: "none",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f9fafb",
                            fontWeight: 700,
                        },
                        "& .MuiDataGrid-cell": {
                            display: "flex",
                            alignItems: "center",
                        },
                    }}
                />
            </Paper>
        </Box>
    );
}
