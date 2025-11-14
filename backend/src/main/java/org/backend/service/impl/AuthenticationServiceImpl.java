package org.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.backend.dtos.*;
import org.backend.model.User;
import org.backend.repo.UserRepository;
import org.backend.service.AuthenticationService;
import org.backend.service.JWTService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public void signup(SignUpRequest signUpRequest) {
        log.info("signup service...");
        try {
            if (signUpRequest.getEmail() == null || signUpRequest.getEmail().isBlank()) {
                throw new IllegalArgumentException("Email cannot be empty.");
            }

            String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
            if (!signUpRequest.getEmail().matches(emailRegex)) {
                throw new IllegalArgumentException("Invalid email format.");
            }

            if (signUpRequest.getPassword() == null || signUpRequest.getConfirmPassword() == null) {
                throw new IllegalArgumentException("Password fields cannot be empty.");
            }

            if (signUpRequest.getPassword().isBlank() || signUpRequest.getConfirmPassword().isBlank()) {
                throw new IllegalArgumentException("Password fields cannot be empty.");
            }

            if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
                throw new IllegalArgumentException("Passwords do not match.");
            }

            if (userRepo.existsByEmail(signUpRequest.getEmail())) {
                throw new IllegalArgumentException("An account with this email already exists.");
            }

            User user = new User();
            user.setEmail(signUpRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

            userRepo.save(user);

        } catch (IllegalArgumentException e) {
            log.error("signup service error: ", e);
            throw e;
        } catch (Exception e) {
            log.error("signup service error: ", e);
            throw new RuntimeException("An unexpected error occurred during signup.", e);
        }
    }

    @Override
    @Transactional
    public JwtAuthenticationResponse signin(SignInRequest signinRequest) {
        log.info("signin service...");
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    signinRequest.getEmail(), signinRequest.getPassword()));

            var user = userRepo.findByEmail(signinRequest.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid email or password!"));

            var jwt = jwtService.generateToken(user, user.getId());

            UserDto userDto = convertToDto(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setUserDto(userDto);

            return jwtAuthenticationResponse;
        } catch (BadCredentialsException e) {
            log.error("signin service error: ", e);
            throw new IllegalArgumentException("Invalid email or password.");
        } catch (IllegalArgumentException e) {
            log.error("signin service error: ", e);
            throw e;
        } catch (Exception e) {
            log.error("signin service error: ", e);
            throw new RuntimeException("An unexpected error occurred during signIn.", e);
        }
    }

    private UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
