import React from "react";
import { Container, Box, Paper, Divider } from "@mui/material";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

const FilesPage: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                }}
            >
                <Box>
                    <FileUpload />
                </Box>

                <Divider />

                <Box>
                    <FileList />
                </Box>
            </Paper>
        </Container>
    );
};

export default FilesPage;
