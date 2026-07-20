package com.cts.delivery.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "lineItemId",
                                "ioId",
                                "reportingDate"
                        })
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

    private Long lineItemId;

    private Long ioId;

    private LocalDate reportingDate;

    private Integer deliveredImpressions;

    private Integer clicks;

    private BigDecimal spend;

    @Enumerated(EnumType.STRING)
    private Source source;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Source {
        PublisherReport,
        InternalEntry
    }

    public enum Status {
        Accepted,
        Disputed,
        PendingVerification
    }
}