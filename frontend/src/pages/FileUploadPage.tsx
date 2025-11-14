import React from "react";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import {removeToken, removeUserId} from "../utils/storage.ts";
import {useQueryClient} from "@tanstack/react-query";

const FileUploadPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        removeToken();
        removeUserId();
        // Clear cached user data after logout
        queryClient.invalidateQueries({queryKey: ["auth"]});
        navigate("/");
    };

    return (
        <Container maxWidth="lg" sx={{height: "100vh", p: 3, background: "#ffffff"}}>
            <Grid
                container
                spacing={3}
                sx={{height: "100%", display: "flex", flexDirection: "column"}}
            >
                <Grid sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h4" fontWeight="bold">
                        File Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                        sx={{borderRadius: 2}}
                    >
                        Logout
                    </Button>
                </Grid>

                <Grid sx={{flex: 1, overflowY: "auto"}}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {xs: "column", md: "row"},
                            gap: 4,
                            mt: 3,
                        }}
                    >
                        <Box sx={{flex: 1}}>
                            <FileUpload/>
                        </Box>
                        <Box sx={{flex: 2}}>
                            <FileList/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FileUploadPage;
