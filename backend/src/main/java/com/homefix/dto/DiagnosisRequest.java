package com.homefix.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class DiagnosisRequest {
    @NotBlank
    private String description;

    @NotBlank
    private String category;

    private List<String> images;
}
