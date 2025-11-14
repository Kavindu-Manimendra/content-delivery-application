package org.backend.exception;

public class UploadFileFailedException extends RuntimeException {
    public UploadFileFailedException(String message) {
        super(message);
    }
}
