package com.homefix.config;

import com.homefix.model.ERole;
import com.homefix.model.Role;
import com.homefix.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            roleRepository.save(new Role(null, ERole.ROLE_USER));
        }
        if (roleRepository.findByName(ERole.ROLE_TECHNICIAN).isEmpty()) {
            roleRepository.save(new Role(null, ERole.ROLE_TECHNICIAN));
        }
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(null, ERole.ROLE_ADMIN));
        }
    }
}
