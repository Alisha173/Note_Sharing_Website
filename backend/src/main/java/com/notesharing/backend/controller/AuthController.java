package com.notesharing.backend.controller;

import com.notesharing.backend.model.User;
import com.notesharing.backend.security.JwtUtil;
import com.notesharing.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    // ------------ SIGNUP ------------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userService.getByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User savedUser = userService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    // ------------ LOGIN ------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {

        User user = userService.login(request.getEmail(), request.getPassword());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(token);
    }
}
