package com.homefix.controller;

import com.homefix.dto.MessageResponse;
import com.homefix.dto.QuoteDto;
import com.homefix.model.Quote;
import com.homefix.model.ServiceRequest;
import com.homefix.model.User;
import com.homefix.repository.QuoteRepository;
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
@RequestMapping("/api/marketplace")
public class MarketplaceController {

    @Autowired
    QuoteRepository quoteRepository;

    @Autowired
    ServiceRequestRepository jobRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FirestoreSyncService firestoreSyncService;

    @GetMapping("/jobs/{jobId}/quotes")
    public List<QuoteDto> getQuotesForJob(@PathVariable Long jobId) {
        ServiceRequest job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Error: Job not found."));
        
        return quoteRepository.findByServiceRequest(job).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/quotes")
    public ResponseEntity<?> submitQuote(@Valid @RequestBody QuoteDto quoteRequest) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User technician = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Error: Technician not found."));

        ServiceRequest job = jobRepository.findById(quoteRequest.getJobId())
                .orElseThrow(() -> new RuntimeException("Error: Job not found."));

        Quote quote = Quote.builder()
                .serviceRequest(job)
                .technician(technician)
                .price(quoteRequest.getPrice())
                .estimatedTime(quoteRequest.getEstimatedTime())
                .message(quoteRequest.getMessage())
                .availability(quoteRequest.getAvailability())
                .build();

        quote = quoteRepository.save(quote);
        
        // Trigger real-time update to Firestore
        firestoreSyncService.syncQuote(convertToDto(quote));
        
        return ResponseEntity.ok(new MessageResponse("Quote submitted successfully!"));
    }

    private QuoteDto convertToDto(Quote quote) {
        return QuoteDto.builder()
                .id(quote.getId())
                .jobId(quote.getServiceRequest().getId())
                .techId(quote.getTechnician().getId())
                .techName(quote.getTechnician().getFirstName() + " " + quote.getTechnician().getLastName())
                .price(quote.getPrice())
                .estimatedTime(quote.getEstimatedTime())
                .message(quote.getMessage())
                .availability(quote.getAvailability())
                .createdAt(quote.getCreatedAt())
                .build();
    }
}
