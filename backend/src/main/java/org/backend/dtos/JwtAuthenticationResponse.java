package org.backend.dtos;

import lombok.Data;
import org.backend.model.User;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private UserDto userDto;
}
