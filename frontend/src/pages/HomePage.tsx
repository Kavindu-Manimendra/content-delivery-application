import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Login from "../components/Login";
import Register from "../components/Register";
import FileList from "../components/FileList";

const HomePage: React.FC = () => {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {showRegister ? (
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: "100%",
                        maxWidth: 400,
                        borderRadius: 8,
                    }}
                >
                    <Register />
                    <Button
                        onClick={() => setShowRegister(false)}
                        fullWidth
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        Back to Login
                    </Button>
                </Paper>
            ) : (
                <Stack
                    spacing={2}
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                        width: "100%",
                        maxWidth: 900, // limit total width
                        height: { xs: "auto", md: "70vh" }, // adjust height
                        backgroundColor: "#ffffff",
                        // borderRadius: 4,
                        // boxShadow: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                    }}
                >
                        <Paper
                            elevation={4}
                            sx={{
                                p: 1,
                                height: "100%",
                                width: "100%",
                                maxWidth: 400,
                                borderRadius: 4,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Welcome Back
                            </Typography>
                            <Login />
                            <Button
                                onClick={() => setShowRegister(true)}
                                fullWidth
                                sx={{ mt: 2, borderRadius: 2 }}
                            >
                                Create an account
                            </Button>
                        </Paper>

                        <Paper
                            elevation={3}
                            sx={{
                                p: 1,
                                height: "100%",
                                width: "100%",
                                maxWidth: 400,
                                borderRadius: 4,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Uploaded Files
                            </Typography>
                            <FileList />
                        </Paper>
                </Stack>
            )}
        </Box>
    );
};

export default HomePage;
