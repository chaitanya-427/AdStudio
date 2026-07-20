package com.cts.delivery.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DeliveryRequest(
        Long lineItemId,
        Long ioId,
        LocalDate reportingDate,
        Integer deliveredImpressions,
        Integer clicks,
        BigDecimal spend,
        String source,
        String status
) {
}