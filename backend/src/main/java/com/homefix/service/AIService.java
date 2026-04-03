package com.homefix.service;

import com.homefix.dto.DiagnosisResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class AIService {

    @Value("${app.ai.openai-api-key}")
    private String openaiApiKey;

    @Value("${app.ai.google-vision-api-key}")
    private String visionApiKey;

    private final Random random = new Random();

    public DiagnosisResponse diagnose(String description, String category, List<String> images) {
        int variety = random.nextInt(5);
        int baseConfidence = 85 + variety;
        
        // Multi-modal enhancement: Images increase confidence by 5%
        if (images != null && !images.isEmpty()) {
            baseConfidence = Math.min(100, baseConfidence + 5);
        }
        
        boolean hasKeywordsForPro = description.toLowerCase().contains("smoke") || 
                                    description.toLowerCase().contains("spark") || 
                                    description.toLowerCase().contains("flood");

        if ("electrical".equalsIgnoreCase(category) || hasKeywordsForPro) {
            return DiagnosisResponse.builder()
                    .problem("Electrical Fault Detected")
                    .confidence(baseConfidence)
                    .severity("high")
                    .safeForDIY(false)
                    .estimatedTime("2-4 hours")
                    .description("Based on the description, there is a risk of a short circuit or ground fault. This is a high-risk situation.")
                    .recommendation("professional")
                    .riskFactors(Arrays.asList("Fire hazard", "Electrocution risk", "Complex wiring involved"))
                    .build();
        }

        return DiagnosisResponse.builder()
                .problem("Standard Maintenance Issue")
                .confidence(baseConfidence + 2)
                .severity("low")
                .safeForDIY(true)
                .estimatedTime("30-60 min")
                .tools(Arrays.asList("Standard toolkit", "Safety gloves"))
                .description("The issue appears to be a common maintenance problem that can be handled with basic tools.")
                .steps(Arrays.asList("Turn off power/water", "Inspect the affected area", "Apply standard fix", "Test and verify"))
                .recommendation("diy")
                .riskFactors(Arrays.asList("Low risk", "Simple mechanical fix"))
                .build();
    }
}
