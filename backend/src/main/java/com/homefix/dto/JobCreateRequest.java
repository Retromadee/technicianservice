package com.homefix.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobCreateRequest {
    @NotBlank
    private String category;

    @NotBlank
    private String description;

    @NotBlank
    private String urgency;

    private String location;
}
