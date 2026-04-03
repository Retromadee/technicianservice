package com.homefix.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DiagnosisResponse {
    private String problem;
    private int confidence;
    private String severity;
    private boolean safeForDIY;
    private String estimatedTime;
    private List<String> tools;
    private String description;
    private List<String> steps;
    private String recommendation; // diy, professional
    private List<String> riskFactors;
}
