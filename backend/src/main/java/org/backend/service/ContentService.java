package org.backend.service;

import org.backend.dtos.FileMetadataResponse;

import java.util.List;

public interface ContentService {
    List<FileMetadataResponse> getFilesMetadata();
}

