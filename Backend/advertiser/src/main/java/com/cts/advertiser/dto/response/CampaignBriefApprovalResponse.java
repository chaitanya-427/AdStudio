package com.cts.advertiser.dto.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CampaignBriefApprovalResponse {
    
    // Unique identifier of the approval record
    private Integer approvalId;

    // ID of the campaign brief that was reviewed
    private Integer briefId;

    // ID of the reviewer who made the decision
    private Integer reviewerId;

    // The decision made - Approved, Rejected, or RevisionRequired
    private String decision;

    // Optional comments from the reviewer
    private String comments;

    // When the review was made
    private LocalDateTime reviewedAt;

    // When the record was created
    private LocalDateTime createdAt;

}
