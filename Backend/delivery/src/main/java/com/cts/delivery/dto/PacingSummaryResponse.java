package com.cts.delivery.dto;

public record PacingSummaryResponse(
        Long lineItemId,
        Long totalImpressions,
        Long totalClicks,
        Double totalSpend
) {
}