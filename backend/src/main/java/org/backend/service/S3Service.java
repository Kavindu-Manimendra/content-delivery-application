package org.backend.service;

import org.backend.dtos.DownloadContentDto;
import org.backend.exception.UploadFileFailedException;
import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
    void uploadFile(String userId, MultipartFile file) throws UploadFileFailedException;
    DownloadContentDto downloadFile(String fileName);
}
