package com.cts.advertiser.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CampaignBriefApprovalRequest {
    
    // ID of the reviewer making the decision
    @NotNull(message = "Reviewer ID is required")
    private Integer reviewerId;

    // The decision - Approved, Rejected, or RevisionRequired
    @NotBlank(message = "Decision is required")
    private String decision;

    // Optional comments from the reviewer
    private String comments;

}
