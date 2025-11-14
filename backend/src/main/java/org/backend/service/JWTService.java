package org.backend.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    String generateToken(UserDetails userDetails, Long userId);
    String extractUsername(String token);
    boolean isTokenValid(String refreshToken, UserDetails userDetails);
}