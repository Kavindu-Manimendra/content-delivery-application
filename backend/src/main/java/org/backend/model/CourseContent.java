package org.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "course_content")
public class CourseContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="file_name", nullable=false)
    private String fileName;

    @Column(name="file_type", nullable=false)
    private String fileType;

    @Column(name="file_size", nullable=false)
    private Long fileSize;

    @Column(name="upload_date", nullable=false)
    private OffsetDateTime uploadDate;

    @Column(name="file_url", nullable=false, columnDefinition = "TEXT")
    private String fileUrl;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
