import React from 'react';
import { Box, Container, Typography, Button, Stack, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, Mail } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            sx={{
                mt: 8,
                py: 6,
                background: "linear-gradient(135deg, #1a237e, #0b3256)",
                color: "white",
                boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
            }}
        >
            <Container maxWidth="lg">

                {/* TOP SECTION */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 3,
                    }}
                >
                    {/* LEFT SIDE */}
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                            University Library
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            Phone: (84) 123 456 789
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            Email: library@university.edu
                        </Typography>
                    </Box>

                    {/* RIGHT SIDE BUTTON */}
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            px: 4,
                            py: 1.2,
                            fontWeight: 600,
                            borderRadius: "10px",
                            boxShadow: "0px 4px 12px rgba(255,255,255,0.2)",
                            transition: "0.3s",
                            '&:hover': {
                                transform: "scale(1.05)",
                                boxShadow: "0px 6px 16px rgba(255,255,255,0.35)",
                            },
                        }}
                    >
                        Contact us
                    </Button>
                </Box>

                {/* DIVIDER LINE */}
                <Box
                    sx={{
                        height: "1px",
                        backgroundColor: "rgba(255,255,255,0.3)",
                        my: 4,
                    }}
                />

                {/* SOCIAL SECTION */}
                <Stack direction="row" spacing={2} justifyContent="center">
                    <IconButton sx={{ color: "white", '&:hover': { color: '#ffea00' } }}>
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: "white", '&:hover': { color: '#ffea00' } }}>
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: "white", '&:hover': { color: '#ffea00' } }}>
                        <YouTube />
                    </IconButton>
                    <IconButton sx={{ color: "white", '&:hover': { color: '#ffea00' } }}>
                        <Mail />
                    </IconButton>
                </Stack>

                {/* COPYRIGHT */}
                <Typography
                    variant="body2"
                    sx={{
                        mt: 3,
                        textAlign: "center",
                        opacity: 0.7,
                    }}
                >
                    © {new Date().getFullYear()} University Library — All rights reserved.
                </Typography>

            </Container>
        </Box>
    );
}
