import React from "react";
import StatCard from "../../components/StatCard.jsx";
import LineChart from "../../components/charts/LineChart.jsx";
import DonutChart from "../../components/charts/DonutChart.jsx";
import {
  IcCampaign, IcWallet, IcEye, IcPercent, IcTrendUp,
  IcAlert,
  IcClock,
} from "../../assets/icons.jsx";
import { formatCompact, getSpendByChannel, getSpendByChannelWithColor } from "../../api/utils/format.js";
import useApiData from "../../api/useApiData.js";
import { MOCK_DELIVERY_RECORDS } from "../../data/mockData.js";
import ENDPOINTS from "../../api/endpoints.js";

/**
 * Overview section of the Dashboard: the four top-level stat cards
 * (active campaigns, spend, impressions, CTR) plus the spend-over-time
 * line chart and channel-mix donut chart.
 *
 * Props:
 *  - summary: the dashboard summary object (activeCampaigns, totalSpend, ...)
 *  - trend:   array of { label, value } points for the spend trend chart
 *  - mix:     array of { label, value, color } points for the channel mix chart
 */

const ALERT_TONE = {
  UnderDelivery: "ai-red",
  BudgetExhausted: "ai-red",
  OverDelivery: "ai-amber",
  FlightEndApproaching: "ai-amber",
};

const ALERT_TEXT = {
  UnderDelivery: "Under-delivering",
  OverDelivery: "Over-delivering",
  BudgetExhausted: "Budget exhausted",
  FlightEndApproaching: "Flight ending soon",
};
export default function DashboardOverview({ countCamp=0 , alerts}) {

     const {  data: delivery_records,   loading: lr,  isMock : isMockRecords,   reload: reloadRecords, } 
       = useApiData(ENDPOINTS.deliveryRecords, MOCK_DELIVERY_RECORDS);
   
  const { data: lineItems, loading: laba , reload: reloadLLineItems} =  useApiData(  "api/line-items/all",[]  );

    const spendByChannel = getSpendByChannelWithColor(lineItems);

    
  
    const totalSpend = (delivery_records || []).reduce((s, r) => s + r.spend, 0);
   const totalImp = (delivery_records || []).reduce((s, r) => s + r.deliveredImpressions, 0);
   const totalClicks = (delivery_records || []).reduce((s, r) => s + r.clicks, 0);



  return (
    <>
      <div className="stat-grid">
        <StatCard
          Icon={IcCampaign}
          label="Active Campaigns"
          value={countCamp}
          foot={<><IcTrendUp size={13} /></>}
        />
        <StatCard
          Icon={IcWallet}
          label="Total Spend"
          value={formatCompact(totalSpend, { money: true })}
          foot={<></>}
        />
        <StatCard
          Icon={IcEye}
          label="Impressions"
          value={formatCompact(totalImp)}
        />
        <StatCard
          Icon={IcPercent}
          label="Avg. CTR"
          value={`${((totalClicks/totalImp)*100).toFixed(2)}%`}
        />
      </div>

      <div className="dash-grid mt">
        

        <div className="card">
          <div className="card-head">
            <div>
              <h3>Channel mix</h3>
              <div className="sub">Spend share by channel</div>
            </div>
          </div>
          <div className="card-pad">
            <div className="chart-row" style={{ justifyContent: "center" }}>
              <DonutChart data={spendByChannel} size={180} thickness={26} centerValue={totalSpend} centerLabel="Total spend" />
              <div className="legend-list">
                {spendByChannel.map((m) => (
                  <div className="ll" key={m.label}>
                    <span className="sw" style={{ background: m.color }} />
                    <span className="lt">{m.label}</span>
                    <span className="lv">{m.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          </div>

          <div className="card">
        <div className="card-head">
          <div>
            <h3>Pacing alerts</h3>
            <div className="sub">{alerts.length} open</div>
          </div>
          <span className="icon-btn" style={{ color: "var(--red-500)" }}><IcAlert size={20} /></span>
        </div>
        <div className="alert-list">
          {alerts.map((a, index) => (
            <div className="alert-item" key={index}>
              <div className={`ai-ic ${ALERT_TONE[a.alertType] || "ai-blue"}`}><IcAlert /></div>
              <div className="ai-body">
                <div className="ti">{ALERT_TEXT[a.alertType] || a.alertType}</div>
                <div className="ds">{a.channel} · line item {a.lineItem} · pacing {a.pacingPercent}%</div>
              </div>
              <div className="ai-time">
                <IcClock size={13} style={{ display: "inline", verticalAlign: "-2px" }} /> {a.alertDate.slice(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
        
      </div>
    </>
  );
}
