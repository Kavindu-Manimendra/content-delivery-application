import { useState } from "react";
import {
    Box,
    Button,
    LinearProgress,
    Paper,
    Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {uploadFile} from "../features/files/file-api.ts";
import { useSnackbar } from "notistack";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isPending } = useMutation({
        mutationFn: (file: File) => uploadFile(file, setProgress),
        onSuccess: () => {
            enqueueSnackbar("File uploaded successfully!", { variant: "success" });
            setSelectedFile(null);
            setProgress(0);
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
        onError: () => {
            enqueueSnackbar("Failed to upload file. Please try again.", {
                variant: "error",
            });
            setProgress(0);
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setProgress(0);
    };

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            enqueueSnackbar("⚠️ Please select a file to upload.", { variant: "warning" });
            return;
        }
        mutate(selectedFile);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                overflow: "auto",
                display: "grid",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Typography variant="h6" gutterBottom>
                Upload a File
            </Typography>

            <Box
                component="form"
                onSubmit={handleUpload}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <input
                    accept="*/*"
                    type="file"
                    id="file-input"
                    hidden
                    onChange={handleFileChange}
                />

                <label htmlFor="file-input">
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                    >
                        Choose File
                    </Button>
                </label>

                {selectedFile && (
                    <Typography variant="body1" color="text.secondary">
                        Selected: {selectedFile.name}
                    </Typography>
                )}

                {progress > 0 && (
                    <Box>
                        <Typography variant="body2" gutterBottom>
                            Uploading: {progress}%
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ borderRadius: 1 }}
                        />
                    </Box>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending || !selectedFile}
                    sx={{
                        borderRadius: 3,
                        fontSize: "1rem",
                        textTransform: "none",
                        alignSelf: "flex-start",
                    }}
                >
                    {isPending ? "Uploading..." : "Upload"}
                </Button>
            </Box>
        </Paper>
    );
};

export default FileUpload;
