package org.backend.service.impl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.backend.dtos.DownloadContentDto;
import org.backend.exception.UploadFileFailedException;
import org.backend.model.CourseContent;
import org.backend.model.User;
import org.backend.repo.CourseContentRepository;
import org.backend.repo.UserRepository;
import org.backend.service.S3Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3ServiceImpl implements S3Service {

    private final AmazonS3 amazonS3;
    private final CourseContentRepository courseContentRepository;
    private final UserRepository userRepository;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    // Upload file to S3 bucket
    @Override
    @Transactional
    public void uploadFile(String userId, MultipartFile file) throws UploadFileFailedException {
        log.info("Uploading file to bucket...");
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            String key = "uploads/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

            amazonS3.putObject(new PutObjectRequest(bucketName, key, file.getInputStream(), metadata));
            String fileUrl =  amazonS3.getUrl(bucketName, key).toString();

            User user = userRepository.findById(Long.parseLong(userId))
                    .orElseThrow(() -> new UploadFileFailedException("User not found."));

            CourseContent courseContent = new CourseContent();
            courseContent.setFileName(file.getOriginalFilename());
            courseContent.setFileType(file.getContentType());
            courseContent.setFileSize(file.getSize());
            courseContent.setUploadDate(OffsetDateTime.now());
            courseContent.setFileUrl(fileUrl);
            courseContent.setUser(user);

            courseContentRepository.save(courseContent);
        } catch (UploadFileFailedException e) {
            throw e;
        } catch (IOException e) {
            throw new RuntimeException("Error reading file input stream", e);
        } catch (AmazonServiceException e) {
            throw new RuntimeException("Failed to upload to S3: " + e.getErrorMessage(), e);
        } catch (SdkClientException e) {
            throw new RuntimeException("S3 client error: " + e.getMessage(), e);
        }
    }

    // Download file from S3 bucket
    @Override
    public DownloadContentDto downloadFile(String fileName) {
        CourseContent content = courseContentRepository.findByFileName(fileName)
                .orElseThrow(() -> new RuntimeException("File not found in database: " + fileName));

        String s3Key = extractKeyFromUrl(content.getFileUrl());
        S3Object s3Object = amazonS3.getObject(new GetObjectRequest(bucketName, s3Key));

        DownloadContentDto downloadContentDto = new DownloadContentDto();
        downloadContentDto.setS3Object(s3Object);
        downloadContentDto.setCourseContent(content);
        return  downloadContentDto;
    }

    private String extractKeyFromUrl(String fileUrl) {
        String keyPart = fileUrl.substring(fileUrl.indexOf(".com/") + 5);
        return URLDecoder.decode(keyPart, StandardCharsets.UTF_8);
    }
}