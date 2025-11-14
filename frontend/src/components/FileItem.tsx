import {
    Button,
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useMutation } from "@tanstack/react-query";
import type { FileMetadata } from "../types";
import {downloadFile} from "../features/files/file-api.ts";
import { useSnackbar } from "notistack";

interface FileItemProps {
    file: FileMetadata;
}

const FileItem = ({ file }: FileItemProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { data, headers } = await downloadFile(file.fileName);
            const contentDisposition = headers["content-disposition"];
            const suggestedName =
                contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
                file.fileName;

            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", suggestedName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
        onSuccess: () => {
            enqueueSnackbar("File downloaded successfully!", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Failed to download file. Please try again.", { variant: "error" });
        },
    });

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                },
                backgroundColor: "#ffffff",
            }}
        >
            <CardContent sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {file.fileName}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {file.fileType} • {(file.fileSize / 1024).toFixed(1)} KB
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 0.5 }}
                        >
                            Uploaded: {new Date(file.uploadDate).toLocaleString()}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                            borderRadius: 3,
                            px: 2,
                            py: 0.6,
                            minWidth: 110,
                            textTransform: "none",
                            fontSize: "0.8rem",
                            alignSelf: { xs: "flex-end", sm: "center" },
                        }}
                        disabled={isPending}
                        onClick={() => mutate()}
                        startIcon={<DownloadIcon />}
                    >
                        {isPending ? "Downloading..." : "Download"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default FileItem;

