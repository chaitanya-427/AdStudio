import React from "react";
import PageHeader from "../../components/PageHeader.jsx";
import { MockFlag } from "../../components/Loader.jsx";
import { IcDashboard, IcRefresh, IcDownload } from "../../assets/icons.jsx";

/**
 * Top page header for the Dashboard: icon, title, subtitle and
 * the Refresh / Export action buttons. Shows the "mock data" flag
 * when the summary data being displayed is not live.
 */
export default function DashboardHeader({ isMock, reload_it }) {
  return (
    <PageHeader
      Icon={IcDashboard}
      title="Dashboard"
      subtitle="Live snapshot of campaigns, spend and delivery"
      actions={
        <>
          {isMock && <MockFlag />}
          <button className="btn btn-primary btn-sm" onClick={reload_it}>
            <IcRefresh /> Refresh
          </button>
        </>
      }
    />
  );
}
