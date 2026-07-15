package com.cts.advertiser.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.advertiser.entity.CampaignBriefApproval;

@Repository
public interface CampaignBriefApprovalRepository extends JpaRepository<CampaignBriefApproval, Integer> {
    
    // Returns all approval records for a specific campaign brief
    public List<CampaignBriefApproval> findByBriefId(Integer briefId);

}
