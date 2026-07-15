package com.cts.advertiser.service;

import java.util.List;

import com.cts.advertiser.dto.request.CampaignBriefApprovalRequest;
import com.cts.advertiser.dto.response.CampaignBriefApprovalResponse;
import com.cts.advertiser.dto.response.CampaignBriefResponse;

public interface CampaignBriefApprovalService {

    // Submits a campaign brief for approval - changes status from Draft to Submitted
    CampaignBriefResponse submitForApproval(Integer briefId);

    // Records a reviewer's decision and updates the brief status accordingly
    CampaignBriefApprovalResponse makeDecision(Integer briefId, CampaignBriefApprovalRequest request);

    // Activates an approved campaign brief - changes status from Approved to Active
    CampaignBriefResponse activateBrief(Integer briefId);

    // Returns the full approval history for a specific campaign brief
    List<CampaignBriefApprovalResponse> getApprovalHistory(Integer briefId);

}