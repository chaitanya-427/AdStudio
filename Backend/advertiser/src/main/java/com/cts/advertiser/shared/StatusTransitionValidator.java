package com.cts.advertiser.shared;

import java.util.*;

import org.springframework.stereotype.Component;

import com.cts.advertiser.entity.CampaignBrief.CampaignStatus;

@Component
public class StatusTransitionValidator {
    
    private static final Map<CampaignStatus, Set<CampaignStatus>> ALLOWED = Map.of(
        CampaignStatus.Draft, EnumSet.of(CampaignStatus.Submitted),
        CampaignStatus.Submitted, EnumSet.of(CampaignStatus.Approved, CampaignStatus.Rejected),
        CampaignStatus.Approved, EnumSet.of(CampaignStatus.Active),
        CampaignStatus.Active, EnumSet.of(CampaignStatus.Completed)
    );

    public void validate(CampaignStatus current, CampaignStatus target) {
        if(current == target) return;

        Set<CampaignStatus> allowed = ALLOWED.getOrDefault(current, EnumSet.noneOf(CampaignStatus.class));

        if(!allowed.contains(target)) {
            throw new IllegalStateException(String.format("Invalid status transition from %s to %s. Allowed next states: %s", current, target, allowed.isEmpty() ? "none" : allowed));
        }
    }
    
}
