import React from "react";
import DataTable from "../../components/DataTable.jsx";
import { Loader } from "../../components/Loader.jsx";
import { IcTrash } from "../../assets/icons.jsx";
import "./forms-and-modal.css";

export default function AudiencesTable({ rows, loading, onDelete }) {
  const columns = [
    {
      key: "id",
      label: "Audience",
      render: (r) => (
        <span className="meta">
          <div className="strong">Audience #{r.audienceId}</div>
          <div className="sb cell-muted">Brief ID {r.briefId}</div>
        </span>
      ),
    },
    { key: "ageRange", label: "Age", render: (r) => <span className="badge badge-gray">{r.ageRange}</span> },
    { key: "gender", label: "Gender", render: (r) => <span className="cell-muted">{r.gender}</span> },
    { key: "geography", label: "Geography", render: (r) => <span className="cell-muted">{r.geography || "—"}</span> },
    { key: "interests", label: "Interests", render: (r) => <span className="cell-muted">{r.interests}</span> },
    { key: "deviceType", label: "Device", render: (r) => <span className="badge badge-blue">{r.deviceType}</span> },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (r) => (
        <div className="t-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => onDelete?.(r)}>
            <IcTrash size={14} /> Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <Loader />;
  return <DataTable columns={columns} rows={rows} />;
}