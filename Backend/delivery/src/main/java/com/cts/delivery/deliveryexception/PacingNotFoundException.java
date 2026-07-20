package com.cts.delivery.deliveryexception;

public class PacingNotFoundException
        extends RuntimeException {

    public PacingNotFoundException(
            String message) {

        super(message);
    }
}