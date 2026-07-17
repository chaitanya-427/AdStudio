import React, { useState } from "react";
import PageHeader from "../../components/PageHeader.jsx";
import DataTable from "../../components/DataTable.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import Tabs from "../../components/Tabs.jsx";
import { Loader, MockFlag } from "../../components/Loader.jsx";
import { useApiData } from "../../hooks/useApiData.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import { IcMediaPlan, IcPlus, IcSend, IcCheck, IcClose } from "../../assets/icons.jsx";
import { MOCK_MEDIA_PLANS, MOCK_LINE_ITEMS, MOCK_INSERTION_ORDERS } from "../../data/mockData.js";
import { formatCompact, formatNumber } from "../../utils/format.js";

const CHANNEL_TONE = {
  Display: "badge-blue", Video: "badge-navy", Social: "badge-green",
  Search: "badge-amber", OOH: "badge-gray", Print: "badge-gray", Radio: "badge-gray",
};

export default function MediaPlanning() {
  const [tab, setTab] = useState("plans");
  const { data: plans, loading: lp, isMock } = useApiData(ENDPOINTS.mediaPlans, MOCK_MEDIA_PLANS);
  const { data: lineItems, loading: ll } = useApiData(ENDPOINTS.lineItems, MOCK_LINE_ITEMS);
  const { data: ios, loading: li } = useApiData(ENDPOINTS.insertionOrders, MOCK_INSERTION_ORDERS);

  const planColumns = [
    { key: "id", label: "Plan", render: (r) => <span className="meta"><div className="strong">{r.id}</div><div className="sb cell-muted">{r.brief}</div></span> },
    { key: "planner", label: "Planner", render: (r) => <span className="cell-muted">{r.planner}</span> },
    { key: "channelMix", label: "Channel mix", render: (r) => <span className="cell-muted txt-sm">{r.channelMix}</span> },
    { key: "totalBudget", label: "Budget", align: "right", mono: true, render: (r) => <span className="strong">{formatCompact(r.totalBudget, { money: true })}</span> },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", label: "", align: "right", render: (r) =>
      r.status === "Draft"
        ? <div className="t-actions"><button className="btn btn-outline btn-sm"><IcSend size={14} /> Submit</button></div>
        : <span className="cell-muted txt-sm">—</span>
    },
  ];

  const lineColumns = [
    { key: "id", label: "Line item", render: (r) => <span className="meta"><div className="strong">{r.id}</div><div className="sb cell-muted">{r.plan} · {r.format}</div></span> },
    { key: "channel", label: "Channel", render: (r) => <span className={`badge ${CHANNEL_TONE[r.channel] || "badge-gray"}`}>{r.channel}</span> },
    { key: "publisher", label: "Publisher", render: (r) => <span className="cell-muted">{r.publisher}</span> },
    { key: "plannedImpressions", label: "Impressions", align: "right", mono: true, render: (r) => formatCompact(r.plannedImpressions) },
    { key: "cpm", label: "CPM", align: "right", mono: true, render: (r) => `$${r.cpm.toFixed(2)}` },
    { key: "plannedBudget", label: "Budget", align: "right", mono: true, render: (r) => <span className="strong">{formatCompact(r.plannedBudget, { money: true })}</span> },
    { key: "progress", label: "Flight", render: (r) => (
      <div className="flight-bar-wrap">
        <div className="flight-bar"><span style={{ width: `${r.progress}%`, left: 0 }} /></div>
        <div className="flight-label">{r.flightStart.slice(5)} → {r.flightEnd.slice(5)} · {r.progress}%</div>
      </div>
    )},
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", label: "", align: "right", render: (r) =>
      r.status === "Planned"
        ? <div className="t-actions"><button className="btn btn-primary btn-sm"><IcSend size={14} /> Generate IO</button></div>
        : <span className="cell-muted txt-sm">—</span>
    },
  ];

  const ioColumns = [
    { key: "id", label: "IO", render: (r) => <span className="meta"><div className="strong">{r.id}</div><div className="sb cell-muted">line item {r.lineItem}</div></span> },
    { key: "publisher", label: "Publisher", render: (r) => <span className="cell-muted">{r.publisher}</span> },
    { key: "orderDate", label: "Ordered", render: (r) => <span className="cell-muted cell-num">{r.orderDate}</span> },
    { key: "committedImpressions", label: "Committed", align: "right", mono: true, render: (r) => formatNumber(r.committedImpressions) },
    { key: "orderValue", label: "Value", align: "right", mono: true, render: (r) => <span className="strong">{formatCompact(r.orderValue, { money: true })}</span> },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", label: "", align: "right", render: (r) =>
      r.status === "Sent"
        ? <div className="t-actions"><button className="btn btn-success btn-sm"><IcCheck size={14} /> Confirm</button><button className="btn btn-danger btn-sm"><IcClose size={14} /></button></div>
        : <span className="cell-muted txt-sm">—</span>
    },
  ];

  const tabs = [
    { key: "plans", label: "Media Plans", count: (plans || []).length },
    { key: "lines", label: "Line Items", count: (lineItems || []).length },
    { key: "ios", label: "Insertion Orders", count: (ios || []).length },
  ];

  return (
    <div className="page">
      <PageHeader
        Icon={IcMediaPlan}
        title="Media Plan & Insertion Orders"
        subtitle="Build multi-channel plans, schedule line items and track publisher confirmations"
        actions={<>{isMock && <MockFlag />}<button className="btn btn-primary btn-sm"><IcPlus /> New media plan</button></>}
      />

      <div className="toolbar"><Tabs tabs={tabs} active={tab} onChange={setTab} /></div>

      <div className="card">
        {tab === "plans" && (lp ? <Loader /> : <DataTable columns={planColumns} rows={plans} />)}
        {tab === "lines" && (ll ? <Loader /> : <DataTable columns={lineColumns} rows={lineItems} />)}
        {tab === "ios" && (li ? <Loader /> : <DataTable columns={ioColumns} rows={ios} />)}
      </div>
    </div>
  );
}
