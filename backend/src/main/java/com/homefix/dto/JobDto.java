package com.homefix.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JobDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String urgency;
    private String status;
    private String location;
    private Long userId;
    private LocalDateTime createdAt;
}
