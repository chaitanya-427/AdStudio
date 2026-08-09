import React from "react";
import { Loader } from "../../components/Loader.jsx";
import { useApiData } from "../../api/useApiData.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import {
  MOCK_DASHBOARD_SUMMARY, MOCK_SPEND_TREND, MOCK_CHANNEL_MIX,
  MOCK_RECENT_CAMPAIGNS, MOCK_PACING_ALERTS,
  MOCK_DELIVERY_RECORDS,
} from "../../data/mockData.js";

import DashboardHeader from "./DashboardHeader.jsx";
import DashboardOverview from "./DashboardOverview.jsx";
import DashboardActivity from "./DashboardActivity.jsx";

/**
 * Dashboard page container.
 * Fetches/derives all dashboard data and hands it down to the three
 * presentational sub-components: Header, Overview and Activity.
 */
export default function Dashboard() {
  const trend = MOCK_SPEND_TREND;
  const mix = MOCK_CHANNEL_MIX;

    const { data: campaigns, loading: loading, isMock, reload:reloadCampaigns } = useApiData(ENDPOINTS.campaignBriefs, MOCK_RECENT_CAMPAIGNS);
   const { data: alerts_raw, loading: laa , reload: reloadAlerts} = useApiData(
    ENDPOINTS.pacingAlerts,     MOCK_PACING_ALERTS   );

 

  const alerts = (alerts_raw || []).filter((a) => a.status === "OPEN").slice(0, 4);

  if (loading ) return <Loader label="Loading dashboard…" />;

  return (
    <div className="page">
      <DashboardHeader isMock={isMock} reload_it={()=>{reloadCampaigns(); reloadAlerts();}}/>
      <DashboardOverview countCamp={campaigns.length} alerts={alerts} />
      <DashboardActivity campaigns={campaigns} />
    </div>
  );
}
