import React, { useState } from "react";
import PageHeader from "../../components/PageHeader.jsx";
import Tabs from "../../components/Tabs.jsx";
import { MockFlag } from "../../components/Loader.jsx";
import { useApiData } from "../../api/useApiData.js";
import { useAuth } from "../../context/AuthContext.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

import { API_BASE, ENDPOINTS } from "../../api/endpoints.js";
import { IcCampaign, IcCheckList, IcPlus, IcTarget } from "../../assets/icons.jsx";
import { MOCK_BRIEFS, MOCK_AUDIENCES } from "../../data/mockData.js";

import Modal from "./Modal.jsx";
import BriefsTable from "./BriefsTable.jsx";
import AudiencesTable from "./AudiencesTable.jsx";
import CampaignBriefForm from "./forms/CampaignBriefForm.jsx";
import TargetAudienceForm from "./forms/TargetAudienceForm.jsx";
import apiClient from "../../api/apiClient.js";

export default function CampaignBriefs() {
  const { user } = useAuth();
  const [tab, setTab] = useState("briefs");

  const { data: briefsData, loading: lb, isMock } = useApiData(ENDPOINTS.campaignBriefs, MOCK_BRIEFS);
  const { data: audiencesData, loading: la } = useApiData(ENDPOINTS.targetAudiences, MOCK_AUDIENCES);

  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [audienceModalOpen, setAudienceModalOpen] = useState(false);
  const [historyModal, setHistoryModal] = useState(null); // null | { campaignName, records }

  const briefs = briefsData || [];
  const audiences = audiencesData || [];

  const tabs = [
    { key: "briefs", label: "Campaign Briefs", count: briefs.length },
    { key: "audiences", label: "Target Audiences", count: audiences.length },
  ];

  // Only Admins are allowed to review a brief (see SecurityConfig on the
  // Gateway: POST /campaign-briefs/*/decision is restricted to ADMIN).
  const isAdmin = user?.role === "ADMIN";

  // ---- Create handlers ----
  // Every write reloads the whole page, so there's no need to merge
  // the created row into local state — the next load pulls fresh data.

  const handleCreateBrief = async (payload) => {
    await apiClient.post(ENDPOINTS.campaignBriefs, payload);
    window.location.reload();
  };

  const handleCreateAudience = async (payload) => {
    await apiClient.post(ENDPOINTS.targetAudiences, payload);
    window.location.reload();
  };

  // ---- Status transition handlers ----

  const handleSubmitBrief = async (row) => {
    const customEndPoint = `api/campaign-briefs/${row.briefId}/submit`;
    await apiClient.post(customEndPoint);
    window.location.reload();
  };

  // Approve/Reject now go through the real decision endpoint, which
  // records who reviewed it (reviewerId) and blocks self-approval on
  // the backend. This replaces the old direct-status-update shortcut.
  const handleApproveBrief = async (row) => { // test-thiss
    const customEndPoint = `api/campaign-briefs/${row.briefId}/decision`;
    await apiClient.post(customEndPoint,  
      { reviewerId: user?.userId, decision: "Approved" } );
    window.location.reload();
  };

  const handleRejectBrief = async (row) => {
    const customEndPoint = `api/campaign-briefs/${row.briefId}/decision`;

    await apiClient.post(customEndPoint,  
      { reviewerId: user?.userId, decision: "Rejected" } );
    window.location.reload();
  };

  const handleDeleteBrief = async (row) => {
    if (!window.confirm(`Delete campaign brief "${row.campaignName}"? This will also delete its target audiences. This cannot be undone.`)) return;
    const customEndPoint = `api/campaign-briefs/${row.briefId}`;
    await apiClient.del(customEndPoint);
    window.location.reload();
  };

  const handleDeleteAudience = async (row) => {
    if (!window.confirm(`Delete target audience #${row.audienceId}? This cannot be undone.`)) return;
    const customEndPoint = `api/target-audiences/${row.audienceId}`;
    await apiClient.del(customEndPoint);
    window.location.reload();
  };

  const handleActivateBrief = async (row) => {
    const customEndPoint = `api/campaign-briefs/${row.briefId}/activate`;
    await apiClient.post(customEndPoint);
    window.location.reload();
  };

  const handleViewHistory = async (row) => {
    const customEndPoint = `api/campaign-briefs/${row.briefId}/approval-history`;
    const records = await apiClient.get(customEndPoint);
    setHistoryModal({ campaignName: row.campaignName, records: records || [] });
  };

  return (
    <div className="page">
      <PageHeader
        Icon={IcCheckList}
        title="Campaign Planning & Briefing"
        subtitle="Capture briefs, objectives and target audiences, then run the approval workflow"
        actions={
          <>
            {isMock && <MockFlag />}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => (tab === "audiences" ? setAudienceModalOpen(true) : setBriefModalOpen(true))}
            >
              <IcPlus /> {tab === "audiences" ? "New audience" : "New brief"}
            </button>
          </>
        }
      />

      <div className="toolbar">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
      </div>

      <div className="card">
        {tab === "briefs" ? (
          <BriefsTable
            rows={briefs}
            loading={lb}
            onSubmit={handleSubmitBrief}
            onApprove={isAdmin ? handleApproveBrief : undefined}
            onReject={isAdmin ? handleRejectBrief : undefined}
            onActivate={isAdmin ? handleActivateBrief : undefined}
            onDelete={handleDeleteBrief}
            onViewHistory={handleViewHistory}
          />
        ) : (
          <AudiencesTable rows={audiences} loading={la} onDelete={handleDeleteAudience} />
        )}
      </div>

      <Modal open={briefModalOpen} title="New campaign brief" onClose={() => setBriefModalOpen(false)}>
        <CampaignBriefForm onSubmit={handleCreateBrief} onCancel={() => setBriefModalOpen(false)} />
      </Modal>

      <Modal open={audienceModalOpen} title="New target audience" onClose={() => setAudienceModalOpen(false)}>
        <TargetAudienceForm
          briefs={briefs}
          onSubmit={handleCreateAudience}
          onCancel={() => setAudienceModalOpen(false)}
        />
      </Modal>

      {historyModal && (
        <Modal open={!!historyModal} title={`Approval history — ${historyModal.campaignName}`} onClose={() => setHistoryModal(null)}>
          {historyModal.records.length === 0 ? (
            <p className="cell-muted">No approval decisions recorded yet.</p>
          ) : (
            historyModal.records.map((rec) => (
              <div key={rec.approvalId} style={{ marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--line-soft)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <StatusBadge status={rec.decision} />
                  <span className="cell-muted txt-sm">Reviewer #{rec.reviewerId}</span>
                </div>
                {rec.comments && <div className="cell-muted txt-sm" style={{ marginBottom: 4 }}>{rec.comments}</div>}
                <div className="cell-muted txt-sm">{new Date(rec.reviewedAt).toLocaleString()}</div>
              </div>
            ))
          )}
        </Modal>
      )}
    </div>
  );
}