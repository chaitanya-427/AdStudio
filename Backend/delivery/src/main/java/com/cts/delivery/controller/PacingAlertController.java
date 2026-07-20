package com.cts.delivery.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cts.delivery.dto.PacingAlertRequest;
import com.cts.delivery.service.PacingAlertService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pacing-alerts")
@RequiredArgsConstructor
public class PacingAlertController {

    private final PacingAlertService service;

    @PostMapping
    public ResponseEntity<?> createAlert(
            @Valid
            @RequestBody
            PacingAlertRequest request) {

        return ResponseEntity.ok(
                service.createAlert(request));
    }

    @GetMapping
    public ResponseEntity<?> getAllAlerts() {

        return ResponseEntity.ok(
                service.getAllAlerts());
    }

    @GetMapping("/{alertId}")
    public ResponseEntity<?> getAlert(
            @PathVariable Long alertId) {

        return ResponseEntity.ok(
                service.getAlert(alertId));
    }

    @GetMapping("/open")
    public ResponseEntity<?> getOpenAlerts() {

        return ResponseEntity.ok(
                service.getOpenAlerts());
    }

    @GetMapping("/line-item/{lineItemId}")
    public ResponseEntity<?> getLineItemAlerts(
            @PathVariable Long lineItemId) {

        return ResponseEntity.ok(
                service.getLineItemAlerts(
                        lineItemId));
    }

    @PutMapping("/{alertId}/action")
    public ResponseEntity<?> actionAlert(
            @PathVariable Long alertId) {

        return ResponseEntity.ok(
                service.actionAlert(alertId));
    }

    @PutMapping("/{alertId}/close")
    public ResponseEntity<?> closeAlert(
            @PathVariable Long alertId) {

        return ResponseEntity.ok(
                service.closeAlert(alertId));
    }

    @DeleteMapping("/{alertId}")
    public ResponseEntity<?> deleteAlert(
            @PathVariable Long alertId) {

        service.deleteAlert(alertId);

        return ResponseEntity.ok(
                "Alert deleted successfully");
    }
}