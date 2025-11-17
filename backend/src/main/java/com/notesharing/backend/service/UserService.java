package com.notesharing.backend.service;

import com.notesharing.backend.model.User;
import com.notesharing.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Signup
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login
    public User login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return null; // user not found
        }

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            return null; // wrong password
        }

        return user; // login success
    }

    // Get user by email (for JWT)
    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
