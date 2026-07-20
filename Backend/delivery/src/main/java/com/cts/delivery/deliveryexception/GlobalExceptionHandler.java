package com.cts.delivery.deliveryexception;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            DeliveryNotFoundException.class)
    public ResponseEntity<?> handleNotFound(
            DeliveryNotFoundException ex) {

        return ResponseEntity.badRequest()
                .body(
                        Map.of(
                                "timestamp",
                                LocalDateTime.now(),
                                "message",
                                ex.getMessage()
                        )
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneral(
            Exception ex) {

        return ResponseEntity.internalServerError()
                .body(
                        Map.of(
                                "timestamp",
                                LocalDateTime.now(),
                                "message",
                                ex.getMessage()
                        )
                );
    }
    @ExceptionHandler(PacingNotFoundException.class)
public ResponseEntity<String> handlePacingNotFound(
        PacingNotFoundException ex) {

    return ResponseEntity.badRequest()
            .body(ex.getMessage());
}
}