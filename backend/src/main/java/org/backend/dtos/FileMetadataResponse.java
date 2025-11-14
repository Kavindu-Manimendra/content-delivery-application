package org.backend.dtos;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class FileMetadataResponse {
    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private OffsetDateTime uploadDate;
}
