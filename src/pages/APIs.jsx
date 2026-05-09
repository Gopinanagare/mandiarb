import React, { useState } from 'react';

const apiList = [
  { name: "Agmarknet Gateway", type: "Agri", status: "Scanning", latency: "124ms", quota: 85, icon: "database", color: "bg-primary-fixed" },
  { name: "Data.gov.in (OGD)", type: "Govt", status: "Active", latency: "450ms", quota: 22, icon: "public", color: "bg-tertiary-fixed" },
  { name: "UP Mandi Parishad", type: "Agri", status: "Scanning", latency: "89ms", quota: 98, icon: "location_on", color: "bg-primary-fixed" },
  { name: "MSAMB Maharashtra", type: "Agri", status: "Active", latency: "210ms", quota: 45, icon: "monitoring", color: "bg-secondary-fixed" },
  { name: "Punjab Mandi Board", type: "Agri", status: "Idle", latency: "--", quota: 0, icon: "terminal", color: "bg-surface-variant" },
  { name: "CEDA Data Portal", type: "Econ", status: "Active", latency: "310ms", quota: 15, icon: "school", color: "bg-tertiary-fixed" },
  { name: "DataYuge Price API", type: "Retail", status: "Scanning", latency: "185ms", quota: 92, icon: "shopping_cart", color: "bg-secondary-fixed" },
  { name: "Surepass Valuation", type: "Auto", status: "Active", latency: "420ms", quota: 60, icon: "directions_car", color: "bg-primary-fixed" },
  { name: "OBV Engine (Free)", type: "Auto", status: "Scanning", latency: "150ms", quota: 88, icon: "two_wheeler", color: "bg-secondary-fixed" },
  { name: "Zyla Labs Vehicles", type: "Auto", status: "Active", latency: "530ms", quota: 35, icon: "local_shipping", color: "bg-tertiary-fixed" },
  { name: "Cars24 Data Hook", type: "Auto", status: "Scanning", latency: "290ms", quota: 76, icon: "car_rental", color: "bg-primary-fixed" },
  { name: "Spinny Listings API", type: "Auto", status: "Idle", latency: "--", quota: 0, icon: "time_to_leave", color: "bg-surface-variant" },
  { name: "CarWale Scraper", type: "Auto", status: "Active", latency: "610ms", quota: 40, icon: "speed", color: "bg-secondary-fixed" },
  { name: "Commodities-API", type: "Metals", status: "Scanning", latency: "95ms", quota: 95, icon: "diamond", color: "bg-tertiary-fixed" },
  { name: "API Ninjas Market", type: "Global", status: "Active", latency: "140ms", quota: 55, icon: "public", color: "bg-primary-fixed" },
  { name: "MetalPriceAPI", type: "Metals", status: "Scanning", latency: "88ms", quota: 80, icon: "payments", color: "bg-secondary-fixed" },
  { name: "GoldAPI.io", type: "Metals", status: "Active", latency: "120ms", quota: 45, icon: "workspace_premium", color: "bg-tertiary-fixed" },
  { name: "Amazon IN Scraper", type: "Retail", status: "Scanning", latency: "850ms", quota: 99, icon: "storefront", color: "bg-primary-fixed" },
  { name: "Flipkart Product API", type: "Retail", status: "Paused", latency: "--", quota: 100, icon: "shopping_bag", color: "bg-error-container" },
  { name: "eNAM Portal Hook", type: "Agri", status: "Active", latency: "260ms", quota: 50, icon: "grass", color: "bg-secondary-fixed" },
  { name: "VAHAN Open Data", type: "Govt", status: "Scanning", latency: "340ms", quota: 70, icon: "policy", color: "bg-tertiary-fixed" },
  { name: "Housing.com API", type: "Real Estate", status: "Active", latency: "490ms", quota: 30, icon: "real_estate_agent", color: "bg-primary-fixed" },
  { name: "MP Mandi Board", type: "Agri", status: "Active", latency: "312ms", quota: 60, icon: "cloud_sync", color: "bg-primary-fixed" },
  { name: "HAFED Haryana", type: "Agri", status: "Scanning", latency: "155ms", quota: 78, icon: "hub", color: "bg-secondary-fixed" },
  { name: "Karnataka KRISHI", type: "Agri", status: "Active", latency: "510ms", quota: 33, icon: "api", color: "bg-tertiary-fixed" },
  { name: "Gujarat GGRC", type: "Agri", status: "Scanning", latency: "190ms", quota: 54, icon: "webhook", color: "bg-primary-fixed" },
  { name: "Rajasthan RSAMB", type: "Agri", status: "Paused", latency: "--", quota: 0, icon: "cell_tower", color: "bg-error-container" }
];

export default function APIs() {
  const [filter, setFilter] = useState("");

  const filteredApis = apiList.filter(api => 
    api.name.toLowerCase().includes(filter.toLowerCase()) || 
    api.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="max-w-[1280px] mx-auto p-margin-mobile md:p-gutter pb-32">
      {/* Header Section */}
      <section className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Omni-Channel APIs</h2>
        <p className="text-on-surface-variant font-body-md">Manage 25+ data source connections across Agriculture, Automotive, Retail, and Metals markets in real-time.</p>
      </section>

      {/* Top Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
        {/* Data Scanned Gauge */}
        <div className="md:col-span-2 tonal-card bg-surface-container-lowest rounded-xl p-md flex flex-col md:flex-row items-center gap-md">
          <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-surface-container-high" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="132" strokeWidth="12"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-headline-md text-headline-md text-primary">82%</span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Utilized</span>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Global Scan Throughput</h3>
              <p className="text-on-surface-variant text-body-sm">Consolidated metric across all active {apiList.length} data hooks.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-sm rounded-lg">
                <span className="font-label-md text-label-md text-on-surface-variant block mb-1">DATA SCANNED</span>
                <span className="font-headline-sm text-headline-sm text-primary">41.8 GB</span>
              </div>
              <div className="bg-surface-container-low p-sm rounded-lg">
                <span className="font-label-md text-label-md text-on-surface-variant block mb-1">DAILY LIMIT</span>
                <span className="font-headline-sm text-headline-sm text-secondary">50.0 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion / Identity Card */}
        <div className="tonal-card bg-primary-container rounded-xl p-md flex flex-col justify-between text-on-primary-container relative overflow-hidden">
          <div className="z-10">
            <span className="font-label-md text-label-md uppercase tracking-wider opacity-80 mb-2 block">Quick Action</span>
            <h3 className="font-headline-md text-headline-md mb-2">Sync All Markets</h3>
            <p className="text-body-sm opacity-90 mb-4">Trigger a global refresh across all agriculture, automotive, and retail data providers.</p>
            <button className="bg-surface-container-lowest text-primary px-6 py-2 rounded-full font-label-md flex items-center gap-2 hover:bg-surface-bright transition-all active:scale-95 shadow-md w-fit">
              <span className="material-symbols-outlined" data-icon="sync">sync</span>
              GLOBAL REFRESH
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <span className="material-symbols-outlined text-[160px]" data-icon="query_stats">query_stats</span>
          </div>
        </div>
      </div>

      {/* API Management Table */}
      <div className="tonal-card bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/20">
        <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low flex-wrap gap-4">
          <h3 className="font-headline-sm text-headline-sm text-primary">Active Data Hooks ({apiList.length})</h3>
          <div className="flex gap-base items-center bg-surface-container-lowest rounded-full px-4 py-2 border border-outline-variant">
            <span className="material-symbols-outlined text-outline" data-icon="search">search</span>
            <input 
              type="text" 
              placeholder="Search APIs or Categories..." 
              className="border-none bg-transparent focus:outline-none text-body-sm w-48"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-hide">
          <table className="w-full text-left border-collapse relative">
            <thead className="bg-surface-container-high text-primary font-label-md text-label-md sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-md py-4 font-semibold uppercase tracking-wider">API SOURCE NAME</th>
                <th className="px-md py-4 font-semibold uppercase tracking-wider">CATEGORY</th>
                <th className="px-md py-4 font-semibold uppercase tracking-wider">STATUS</th>
                <th className="px-md py-4 font-semibold uppercase tracking-wider">LATENCY</th>
                <th className="px-md py-4 font-semibold uppercase tracking-wider">DAILY QUOTA</th>
                <th className="px-md py-4 text-right font-semibold uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredApis.map((api, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-md py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-on-surface flex items-center justify-center ${api.color}`}>
                        <span className="material-symbols-outlined">{api.icon}</span>
                      </div>
                      <div>
                        <span className="font-body-md font-semibold block">{api.name}</span>
                        <span className="text-label-sm text-on-surface-variant font-label-sm">v2.4 Production</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-4">
                    <span className="text-label-md font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">{api.type}</span>
                  </td>
                  <td className="px-md py-4">
                    <span className={`px-3 py-1 rounded-full text-label-sm flex items-center gap-1 w-fit ${api.status === 'Paused' ? 'bg-error-container text-on-error-container' : api.status === 'Idle' ? 'bg-surface-variant text-on-surface-variant' : 'bg-primary-fixed text-on-primary-fixed-variant'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${api.status === 'Paused' ? 'bg-error' : api.status === 'Idle' ? 'bg-outline' : 'bg-primary'}`}></span> {api.status}
                    </span>
                  </td>
                  <td className="px-md py-4 font-label-md text-on-surface-variant">{api.latency}</td>
                  <td className="px-md py-4">
                    <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className={`h-full ${api.quota > 80 ? 'bg-error' : api.quota > 50 ? 'bg-secondary' : 'bg-primary'}`} style={{width: `${api.quota}%`}}></div>
                    </div>
                  </td>
                  <td className="px-md py-4 text-right">
                    <button className="text-secondary hover:underline font-label-md flex items-center justify-end gap-1 ml-auto transition-transform active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">refresh</span> Refresh
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApis.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-md py-8 text-center text-on-surface-variant font-body-md">
                    No APIs found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Logs / Export Section */}
      <div className="mt-lg grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="tonal-card bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/20">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined" data-icon="history">history</span>
            System Logs
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4 border-l-2 border-primary pl-4 py-1">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block">12:45 PM</span>
                <p className="text-body-sm">Cars24 Data Hook re-authenticated successfully. Scanning resumed.</p>
              </div>
            </li>
            <li className="flex gap-4 border-l-2 border-secondary pl-4 py-1">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block">11:30 AM</span>
                <p className="text-body-sm">Daily quota exceeded for Rajasthan RSAMB and Flipkart API. Auto-pausing hooks.</p>
              </div>
            </li>
            <li className="flex gap-4 border-l-2 border-outline pl-4 py-1">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block">09:00 AM</span>
                <p className="text-body-sm">Global refresh triggered. All Omni-Channel APIs updated successfully.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="tonal-card bg-surface-bright border border-outline-variant rounded-xl p-md flex items-center justify-center relative overflow-hidden group shadow-[0px_4px_20px_rgba(95,116,100,0.06)]">
          <div className="text-center z-10">
            <span className="material-symbols-outlined text-primary text-[48px] mb-2" data-icon="cloud_download">cloud_download</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Export Omni-Data</h3>
            <p className="text-on-surface-variant text-body-sm mb-4">Download the last 24 hours of raw pricing data across all 27 sources in CSV or JSON format.</p>
            <div className="flex gap-2 justify-center">
              <button className="border border-primary text-primary px-4 py-2 rounded-full font-label-md hover:bg-primary hover:text-white transition-all active:scale-95">CSV</button>
              <button className="border border-primary text-primary px-4 py-2 rounded-full font-label-md hover:bg-primary hover:text-white transition-all active:scale-95">JSON</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-500"></div>
        </div>
      </div>
    </main>
  );
}
