package com.cts.delivery.dto;

import com.cts.delivery.entity.PacingAlert.AlertType;

import jakarta.validation.constraints.NotNull;

public record PacingAlertRequest(

        @NotNull
        Long lineItemId,

        @NotNull
        AlertType alertType,

        @NotNull
        Double pacingPercent

) {
}