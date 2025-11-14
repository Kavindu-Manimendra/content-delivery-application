package org.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.backend.dtos.APIResponseDto;
import org.backend.dtos.DownloadContentDto;
import org.backend.dtos.FileMetadataResponse;
import org.backend.exception.UploadFileFailedException;
import org.backend.service.ContentService;
import org.backend.service.S3Service;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/s3")
@RequiredArgsConstructor
@Slf4j
public class S3Controller {

    private final S3Service s3Service;
    private final ContentService contentService;

    // Upload a file to S3
    @PostMapping("/upload/{userId}")
    public ResponseEntity<APIResponseDto> uploadFile(@PathVariable String userId, @RequestParam("file") MultipartFile file) throws IOException {
        log.info("upload file api...");
        APIResponseDto apiResponseDto = new APIResponseDto();
        try {
            s3Service.uploadFile(userId, file);
            apiResponseDto.setMessage("File uploaded successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(apiResponseDto);
        } catch (UploadFileFailedException e) {
            log.error("upload file api error: ", e);
            apiResponseDto.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponseDto);
        } catch (Exception e) {
            log.error("upload file api error: ", e);
            apiResponseDto.setMessage("Failed to upload file.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponseDto);
        }
    }

    // Download a file
    @GetMapping("/download/{fileName}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable String fileName) {
        log.info("download file api...");
        DownloadContentDto result = s3Service.downloadFile(fileName);

        InputStreamResource resource = new InputStreamResource(result.getS3Object().getObjectContent());

        String encodedFileName = URLEncoder.encode(result.getCourseContent().getFileName(), StandardCharsets.UTF_8);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename(encodedFileName)
                .build());
        headers.setContentType(MediaType.parseMediaType(result.getCourseContent().getFileType()));
        headers.setContentLength(result.getCourseContent().getFileSize());

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    // Metadata Retrieval
    @GetMapping("/get-metadata")
    public ResponseEntity<APIResponseDto> getMetadata() {
        log.info("get files metadata api...");
        APIResponseDto apiResponseDto = new APIResponseDto();
        try {
            List<FileMetadataResponse> responses = contentService.getFilesMetadata();
            apiResponseDto.setMessage("File metadata retrieved successfully.");
            apiResponseDto.setData(responses);
            return ResponseEntity.status(HttpStatus.OK).body(apiResponseDto);
        }  catch (Exception e) {
            log.error("Failed to retrieve metadata: ", e);
            apiResponseDto.setMessage("File metadata retrieval failed.");
            apiResponseDto.setData(null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponseDto);
        }
    }
}
