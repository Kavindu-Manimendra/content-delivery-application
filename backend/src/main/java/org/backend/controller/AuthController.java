package org.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.backend.dtos.APIResponseDto;
import org.backend.dtos.JwtAuthenticationResponse;
import org.backend.dtos.SignInRequest;
import org.backend.dtos.SignUpRequest;
import org.backend.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<APIResponseDto> signup(@RequestBody SignUpRequest signUpRequest) {
        log.info("signup request received...");
        APIResponseDto apiResponseDto = new APIResponseDto();
        try {
            authenticationService.signup(signUpRequest);
            apiResponseDto.setMessage("Registration Successful.");
            return ResponseEntity.status(HttpStatus.OK).body(apiResponseDto);
        } catch (IllegalArgumentException e) {
            apiResponseDto.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponseDto);
        } catch (Exception e) {
            apiResponseDto.setMessage("An unexpected error occurred during signup.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponseDto);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<APIResponseDto> signin(@RequestBody SignInRequest signinRequest) {
        log.info("signIn request received...");
        APIResponseDto apiResponseDto = new APIResponseDto();
        try {
            JwtAuthenticationResponse response = authenticationService.signin(signinRequest);
            apiResponseDto.setMessage("Login Successful.");
            apiResponseDto.setData(response);
            return ResponseEntity.status(HttpStatus.OK).body(apiResponseDto);
        } catch (IllegalArgumentException e) {
            apiResponseDto.setMessage("Login Failed.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiResponseDto);
        } catch (Exception e) {
            apiResponseDto.setMessage("An unexpected error occurred during signIn.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponseDto);
        }
    }
}
