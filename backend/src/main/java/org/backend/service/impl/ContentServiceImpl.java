package org.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.backend.dtos.FileMetadataResponse;
import org.backend.model.CourseContent;
import org.backend.repo.CourseContentRepository;
import org.backend.service.ContentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContentServiceImpl implements ContentService {

    private final CourseContentRepository courseContentRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<FileMetadataResponse> getFilesMetadata() {
        log.info("getFilesMetadata service...");
        List<CourseContent> courseContents = courseContentRepository.findAll();
        List<FileMetadataResponse> result = new ArrayList<>();
        for (CourseContent courseContent : courseContents) {
            result.add(convertToDto(courseContent));
        }
        return result;
    }

    private FileMetadataResponse convertToDto(CourseContent courseContent) {
        return modelMapper.map(courseContent, FileMetadataResponse.class);
    }
}