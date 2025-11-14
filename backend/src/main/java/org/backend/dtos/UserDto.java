package org.backend.dtos;

import lombok.Data;
import org.backend.model.CourseContent;

import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String email;
    private List<CourseContent> courseContents;
}
