package com.cts.delivery.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.delivery.entity.PacingAlert;
import com.cts.delivery.entity.PacingAlert.AlertStatus;

public interface PacingAlertRepository
        extends JpaRepository<PacingAlert, Long> {

    List<PacingAlert> findByStatus(
            AlertStatus status);

    List<PacingAlert> findByLineItemId(
            Long lineItemId);
}
