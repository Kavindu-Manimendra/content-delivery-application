import { useQuery } from "@tanstack/react-query";
import { Paper, Typography, Stack, CircularProgress, Box } from "@mui/material";
import FileItem from "./FileItem";
import type { FileMetadata } from "../types";
import {getFileMetadata} from "../features/files/file-api.ts";

const FileList = () => {
    const { data, isLoading, isError } = useQuery<FileMetadata[]>({
        queryKey: ["files"],
        queryFn: getFileMetadata,
    });

    if (isLoading)
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <CircularProgress size={30} sx={{ mb: 2 }} />
                <Typography>Loading files...</Typography>
            </Box>
        );

    if (isError)
        return (
            <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography color="error">Failed to load files.</Typography>
            </Box>
        );

    return (
        <Paper
            elevation={6}
            sx={{
                p: 2,
                borderRadius: 4,
                height: { xs: "auto", md: "60vh" },
                overflowY: "auto",
                backgroundColor: "#ffffff"
            }}
        >
            <Stack spacing={2}>
                {data && data.length > 0 ? (
                    data.map((file) => <FileItem key={file.id} file={file} />)
                ) : (
                    <Typography
                        color="text.secondary"
                        align="center"
                        sx={{ mt: 4, fontStyle: "italic" }}
                    >
                        No files uploaded yet.
                    </Typography>
                )}
            </Stack>
        </Paper>
    );
};

export default FileList;

