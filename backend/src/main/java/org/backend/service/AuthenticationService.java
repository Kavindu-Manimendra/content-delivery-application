package org.backend.service;

import org.backend.dtos.JwtAuthenticationResponse;
import org.backend.dtos.SignInRequest;
import org.backend.dtos.SignUpRequest;

public interface AuthenticationService {
    void signup(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signin(SignInRequest signinRequest);
}