export interface User {
    id: string;
    name: string;
    email: string;
}

export interface FileMetadata {
    id: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadDate: string;
}

export interface APIResponse<T> {
    message: string;
    data: T;
}

export interface SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface JwtAuthenticationResponse {
    token: string;
    userDto: {
        id: number;
        email: string;
        courseContents: FileMetadata[];
    };
}