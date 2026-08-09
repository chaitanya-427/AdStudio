import React from "react";
import DataTable from "../../components/DataTable.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import { Loader } from "../../components/Loader.jsx";
import { IcBuilding, IcEdit, IcTrash } from "../../assets/icons.jsx";
import { formatCompact } from "../../api/utils/format.js";

/* ---------------------------------------------------------------------- */
/*  Advertisers tab: data table                                           */
/* ---------------------------------------------------------------------- */
export default function AdvertisersTable({ advertisers, loading, onEdit, onDelete }) {
  const columns = [
    { key: "companyName", label: "Company", render: (r) => (
      <div className="id-chip">
        <span className="av"><IcBuilding size={17} /></span>
        <span className="meta"><span className="nm">{r.companyName}</span> <span className="sb">#{r.advertiserId} · {r.industry}</span></span>
      </div>
    )},
    { key: "accountManager", label: "Account Manager ID", render: (r) => <span className="cell-muted">{r.accountManagerId}</span> },
    { key: "annualBudget", label: "Annual Budget", align: "left", mono: true, render: (r) => <span className="strong">{ formatCompact(r.annualBudget, { money : true } ) }</span> },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", label: "", align: "right", render: (r) => (
      <div className="t-actions">
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(r)}>
          <IcEdit size={15} /> Edit
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => onDelete(r)}>
          <IcTrash size={15} /> Delete
        </button>
      </div>
    )},
  ];

  if (loading) return <Loader />;
  return <DataTable columns={columns} rows={advertisers} />;
}