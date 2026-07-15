package com.cts.advertiser.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "campaignbriefapproval")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaignBriefApproval {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApprovalID")
    private Integer approvalId;

    // Links to the campaign brief being reviewed
    @Column(name = "BriefID", nullable = false)
    private Integer briefId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BriefID", insertable = false, updatable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private CampaignBrief campaignBrief;

    // ID of user who reviewed the brief
    @Column(name = "ReviewerID")
    private Integer reviewerId;

    // The decision made by the reviewer
    @Enumerated(EnumType.STRING)
    @Column(name = "Decision", nullable = false)
    private ApprovalDecision decision;

    // Opitonal comments from the reviewer
    @Column(name = "Comments", columnDefinition = "TEXT")
    private String comments;

    // When the review was made
    @Column(name = "ReviewedAt", updatable = false)
    private LocalDateTime reviewedAt;

    // When the record was created
    @Column(name = "CreatedAt", updatable = false)
    private LocalDateTime createdAt;

    // Automatically sets timestamps before insert
    @PrePersist
    public void prePersist() {

        this.reviewedAt = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();

    }

    // ENUM for the three possible approval decisions
    public enum ApprovalDecision {

        Approved, Rejected, RevisionRequired

    }

}
