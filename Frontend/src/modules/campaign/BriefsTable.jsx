import React from "react";
import DataTable from "../../components/DataTable.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import { Loader } from "../../components/Loader.jsx";
import { IcCheck, IcClose, IcSend, IcTrash } from "../../assets/icons.jsx";
import { formatCompact } from "../../api/utils/format.js";
import "./forms-and-modal.css";

const OBJECTIVE_TONE = {
  Awareness: "badge-blue",
  Consideration: "badge-navy",
  Conversion: "badge-green",
  Retention: "badge-amber",
};

export default function BriefsTable({ rows, loading, onSubmit, onApprove, onReject, onDelete }) {
  const columns = [
    {
      key: "briefId",
      label: "Brief ID",
      align: "",
      mono: true,
      render: (r) => <span className="strong">{r.briefId}</span>,
    },
    {
      key: "campaignName",
      label: "Campaign",
      render: (r) => (
        <span className="meta">
          <div className="strong">{r.campaignName}</div>
          <div className="sb cell-muted">
            Brand ID {r.brandId}
          </div>
        </span>
      ),
    },
    {
      key: "objective",
      label: "Objective",
      render: (r) => <span className={`badge ${OBJECTIVE_TONE[r.objective] || "badge-gray"}`}>{r.objective}</span>,
    },
    {
      key: "channelPreference",
      label: "Channels",
      render: (r) => <span className="cell-muted">{r.channelPreference || "—"}</span>,
    },
    {
      key: "flight",
      label: "Flight",
      render: (r) => (
        <span className="cell-muted cell-num">
          {r.startDate.slice(5)} → {r.endDate.slice(5)}
        </span>
      ),
    },
    {
      key: "totalBudget",
      label: "Budget",
      align: "right",
      mono: true,
      render: (r) => <span className="strong">{formatCompact(r.totalBudget, { money: true })}</span>,
    },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (r) => {
        let statusAction = null;
        if (r.status === "Draft") {
          statusAction = (
            <button className="btn btn-outline btn-sm" onClick={() => onSubmit?.(r)}>
              <IcSend size={14} /> Submit
            </button>
          );
        } else if (r.status === "Submitted") {
          if (onApprove || onReject) {
            statusAction = (
              <>
                {onApprove && (
                  <button className="btn btn-success btn-sm" onClick={() => onApprove(r)}>
                    <IcCheck size={14} /> Approve
                  </button>
                )}
                {onReject && (
                  <button className="btn btn-danger btn-sm" onClick={() => onReject(r)}>
                    <IcClose size={14} /> Reject
                  </button>
                )}
              </>
            );
          } else {
            statusAction = <span className="cell-muted txt-sm">Awaiting review</span>;
          }
        }
        return (
          <div className="t-actions">
            {statusAction}
            <button className="btn btn-ghost btn-sm" onClick={() => onDelete?.(r)}>
              <IcTrash size={14} /> Delete
            </button>
          </div>
        );
      },
    },
  ];

  if (loading) return <Loader />;
  return <DataTable columns={columns} rows={rows} />;
}