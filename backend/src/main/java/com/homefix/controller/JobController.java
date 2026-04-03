package com.homefix.controller;

import com.homefix.dto.JobDto;
import com.homefix.model.ServiceRequest;
import com.homefix.model.User;
import com.homefix.repository.ServiceRequestRepository;
import com.homefix.repository.UserRepository;
import com.homefix.security.UserDetailsImpl;
import com.homefix.service.FirestoreSyncService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    ServiceRequestRepository jobRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private FirestoreSyncService firestoreSyncService;

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable Long id) {
        ServiceRequest job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Job not found."));
        return ResponseEntity.ok(convertToDto(job));
    }

    @GetMapping
    public List<JobDto> getAllJobs(@RequestParam(required = false) String category) {
        List<ServiceRequest> jobs;
        if (category != null && !category.isEmpty()) {
            jobs = jobRepository.findByCategoryAndStatus(category, "active");
        } else {
            jobs = jobRepository.findByStatus("active");
        }

        return jobs.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<JobDto> createJob(@Valid @RequestBody JobDto jobDto) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        ServiceRequest job = ServiceRequest.builder()
                .user(user)
                .title(jobDto.getTitle())
                .category(jobDto.getCategory())
                .description(jobDto.getDescription())
                .status("active")
                .urgency(jobDto.getUrgency() != null ? jobDto.getUrgency() : "medium")
                .location(jobDto.getLocation())
                .build();

        job = jobRepository.save(job);
        JobDto savedJobDto = convertToDto(job);
        
        // Trigger real-time update to Firestore
        firestoreSyncService.syncJob(savedJobDto);
        
        return ResponseEntity.ok(savedJobDto);
    }

    private JobDto convertToDto(ServiceRequest job) {
        return JobDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .category(job.getCategory())
                .urgency(job.getUrgency())
                .status(job.getStatus())
                .location(job.getLocation())
                .userId(job.getUser().getId())
                .createdAt(job.getCreatedAt())
                .build();
    }
}
