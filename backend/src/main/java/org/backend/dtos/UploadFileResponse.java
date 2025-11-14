package org.backend.dtos;

import lombok.Data;

@Data
public class UploadFileResponse {
    private Long id;
    private String fileName;
    private String fileUrl;
}
