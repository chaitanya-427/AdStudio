import React from "react";
import DataTable from "../../components/DataTable.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import { IcAlert, IcClock } from "../../assets/icons.jsx";
import { formatCompact } from "../../api/utils/format.js";



/**
 * Activity section of the Dashboard: the "Recent campaigns" table
 * and the "Pacing alerts" list, side by side.
 *
 * Props:
 *  - campaigns: array of recent campaign rows for the table
 *  - alerts:    array of open pacing alert objects
 */
export default function DashboardActivity({ campaigns }) {
  const columns = [
    {
      key: "id",
      label: "Campaign",
      render: (r) => (
        <div className="id-chip">
          <span className="av">{r?.campaignName[0]}</span>
          <span className="meta">
            <span className="nm">{r?.campaignName}</span>
            <span className="sb">{r?.briefId}</span>
          </span>
        </div>
      ),
    },
    {
      key: "totalBudget",
      label: "Total Budget",
      align: "right",
      mono: true,
      render: (r) => <span className="strong">₹{r.totalBudget}</span>,
    },
    {
      key: "submittedById",
      label: "Submitted By Id",
      align: "",
      mono: true,
      render: (r) => <> {r.submittedById} </> ,
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <div className="dash-grid mt">
      <div className="card">
        <div className="card-head">
          <div>
            <h3>Recent campaigns</h3>
            <div className="sub">Latest activity across brands</div>
          </div>
          <button className="btn btn-ghost btn-sm">View all</button>
        </div>
        <DataTable columns={columns} rows={campaigns} />
      </div>

      
    </div>
  );
}
