package com.cts.delivery.deliveryexception;

public class DeliveryNotFoundException
        extends RuntimeException {

    public DeliveryNotFoundException(
            String message) {

        super(message);
    }
}