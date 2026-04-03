package com.homefix.repository;

import com.homefix.model.Quote;
import com.homefix.model.ServiceRequest;
import com.homefix.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByServiceRequest(ServiceRequest serviceRequest);
    List<Quote> findByTechnician(User technician);
}
