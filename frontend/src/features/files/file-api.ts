import api from "../../api/axioClients.ts";
import type {APIResponse, FileMetadata} from "../../types";
import {getUserId} from "../../utils/storage.ts";

export const uploadFile = async (
    file: File,
    onProgress?: (progress: number) => void
): Promise<FileMetadata> => {
    const form = new FormData();
    form.append("file", file);
    const userId = getUserId();

    const response = await api.post<APIResponse<FileMetadata>>(`/s3/upload/${userId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
            if (!event.total) return;
            const percent = Math.round((event.loaded * 100) / event.total);
            onProgress?.(percent);
        },
    });
    return response.data.data;
};

export const getFileMetadata = async (): Promise<FileMetadata[]> => {
    const response = await api.get<APIResponse<FileMetadata[]>>("/s3/get-metadata");
    return response.data.data;
};

export const downloadFile = async (fileName: string): Promise<{ data: Blob; headers: any }> => {
    const response = await api.get(`/s3/download/${fileName}`, { responseType: "blob" });
    return { data: response.data, headers: response.headers };
};












































