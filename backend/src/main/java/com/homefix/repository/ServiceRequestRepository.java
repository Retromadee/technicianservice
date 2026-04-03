package com.homefix.repository;

import com.homefix.model.ServiceRequest;
import com.homefix.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByUser(User user);
    List<ServiceRequest> findByStatus(String status);
    List<ServiceRequest> findByCategoryAndStatus(String category, String status);
}
