package com.homefix.controller;

import com.homefix.dto.DiagnosisRequest;
import com.homefix.dto.DiagnosisResponse;
import com.homefix.service.AIService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/jobs/diagnose")
public class DiagnosisController {

    @Autowired
    private AIService aiService;

    @PostMapping
    public DiagnosisResponse diagnoseProblem(@Valid @RequestBody DiagnosisRequest request) {
        return aiService.diagnose(request.getDescription(), request.getCategory(), request.getImages());
    }
}
