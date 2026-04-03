package com.homefix.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class QuoteDto {
    private Long id;
    private Long jobId;
    private Long techId;
    private String techName;
    private BigDecimal price;
    private String estimatedTime;
    private String message;
    private String availability;
    private LocalDateTime createdAt;
}
