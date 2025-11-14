package org.backend.dtos;

import com.amazonaws.services.s3.model.S3Object;
import lombok.Data;
import org.backend.model.CourseContent;

@Data
public class DownloadContentDto {
    private S3Object s3Object;
    private CourseContent courseContent;
}
