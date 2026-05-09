import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Analytics() {
  const location = useLocation();
  // Default opportunity if navigated directly
  const defaultOpp = {
    title: "Red Onion (Garva)",
    category: "Agri",
    tag: "Grade A",
    buyLocation: "Nashik",
    buyPrice: "₹18.50",
    buyUnit: "/kg",
    buyLink: "https://enam.gov.in/",
    sellLocation: "Pune",
    sellPrice: "₹25.75",
    sellUnit: "/kg",
    sellLink: "https://puneapmc.org/",
    tax: "₹0.18",
    taxPercent: "1%",
    logistics: "₹2.10",
    roi: "19%",
    profit: "+₹4.22"
  };

  const opp = location.state?.opp || defaultOpp;

  return (
    <>
      <main className="py-8 px-margin-mobile md:px-0 max-w-container-max mx-auto">
        {/* Hero Summary Section */}
        <div className="mb-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-xs">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">{opp.buyLocation} to {opp.sellLocation}</h2>
                <span className="bg-surface-container px-3 py-1 rounded-full text-label-sm font-semibold">{opp.category}</span>
              </div>
              <p className="font-body-md text-on-surface-variant flex items-center gap-2">
                <span className="font-bold text-secondary">{opp.title}</span> • {opp.tag}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/30 text-center min-w-[120px]">
                <p className="font-label-md text-on-surface-variant uppercase mb-1">Arbitrage</p>
                <p className="font-headline-sm text-headline-sm text-secondary">{opp.profit}</p>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/30 text-center min-w-[120px]">
                <p className="font-label-md text-on-surface-variant uppercase mb-1">ROI</p>
                <p className="font-headline-sm text-headline-sm text-primary">{opp.roi}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Price Trend Column */}
          <div className="lg:col-span-8 space-y-gutter">
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/20">
              <div className="flex items-center justify-between mb-md">
                <h3 className="font-headline-sm text-headline-sm">Market Price Convergence</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 font-label-md"><span className="w-3 h-3 rounded-full bg-primary"></span> {opp.buyLocation}</span>
                  <span className="flex items-center gap-1 font-label-md"><span className="w-3 h-3 rounded-full bg-secondary"></span> {opp.sellLocation}</span>
                </div>
              </div>
              <div className="relative h-64 w-full border-b border-l border-outline-variant/30">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <path d="M0 150 Q 100 130, 200 140 T 400 110 T 600 120 T 800 100 V 200 H 0 Z" fill="rgba(71, 91, 76, 0.05)"></path>
                  <path d="M0 150 Q 100 130, 200 140 T 400 110 T 600 120 T 800 100" fill="none" stroke="#475b4c" strokeLinecap="round" strokeWidth="3"></path>
                  <path d="M0 100 Q 100 80, 200 90 T 400 60 T 600 70 T 800 40" fill="none" stroke="#94492d" strokeDasharray="8 4" strokeLinecap="round" strokeWidth="3"></path>
                  <circle cx="400" cy="110" fill="#475b4c" r="4"></circle>
                  <circle cx="400" cy="60" fill="#94492d" r="4"></circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface text-on-surface px-3 py-1 rounded shadow-lg border border-outline-variant text-xs font-bold whitespace-nowrap">
                  Spread: {opp.profit}
                </div>
              </div>
              <div className="mt-4 flex justify-between font-label-md text-on-surface-variant">
                <span>06:00 AM</span>
                <span>09:00 AM</span>
                <span>12:00 PM (Peak)</span>
                <span>03:00 PM</span>
                <span>06:00 PM</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary" data-icon="shopping_basket">shopping_basket</span>
                    <h4 className="font-headline-sm text-headline-sm text-sm">Source Market Link</h4>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mb-4">Verify current active listings directly from the source API dashboard or vendor portal.</p>
                </div>
                <a href={opp.buyLink} target="_blank" rel="noopener noreferrer" className="bg-primary-container text-on-primary-container py-3 rounded-lg text-center font-bold flex items-center justify-center gap-2 hover:brightness-95 transition-all">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span> Go to Buy Market
                </a>
              </div>
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-secondary" data-icon="storefront">storefront</span>
                    <h4 className="font-headline-sm text-headline-sm text-sm">Target Market Link</h4>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mb-4">Check live bids and selling prices in the destination market portal.</p>
                </div>
                <a href={opp.sellLink} target="_blank" rel="noopener noreferrer" className="bg-secondary-container text-on-secondary-container py-3 rounded-lg text-center font-bold flex items-center justify-center gap-2 hover:brightness-95 transition-all">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span> Go to Sell Market
                </a>
              </div>
            </div>
          </div>
          
          {/* Cost Breakdown Column */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/20 sticky top-24">
              <h3 className="font-headline-sm text-headline-sm mb-lg border-b border-outline-variant/20 pb-4">Trade Breakdown</h3>
              <div className="space-y-gutter relative">
                {/* Step 1 */}
                <div className="relative flex gap-4 step-line">
                  <div className="z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary text-[18px]" data-icon="shopping_basket">shopping_basket</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-label-md text-on-surface-variant uppercase">Market Purchase</p>
                      <p className="font-body-md font-bold text-primary">{opp.buyPrice}{opp.buyUnit}</p>
                    </div>
                    <p className="text-xs text-on-surface-variant">{opp.buyLocation} Source Market</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative flex gap-4 step-line">
                  <div className="z-10 w-8 h-8 rounded-full bg-surface-container-high border border-outline flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]" data-icon="account_balance">account_balance</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-label-md text-on-surface-variant uppercase">Taxes ({opp.taxPercent})</p>
                      <p className="font-body-md font-bold">{opp.tax}</p>
                    </div>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="relative flex gap-4 step-line">
                  <div className="z-10 w-8 h-8 rounded-full bg-surface-container-high border border-outline flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]" data-icon="local_shipping">local_shipping</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-label-md text-on-surface-variant uppercase">Logistics</p>
                      <p className="font-body-md font-bold">{opp.logistics}</p>
                    </div>
                    <p className="text-xs text-on-surface-variant">{opp.buyLocation} to {opp.sellLocation}</p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="relative flex gap-4">
                  <div className="z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary text-[18px]" data-icon="sell">sell</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-label-md text-on-surface-variant uppercase">Target Market Sale</p>
                      <p className="font-body-md font-bold text-secondary">{opp.sellPrice}{opp.sellUnit}</p>
                    </div>
                    <p className="text-xs text-on-surface-variant">{opp.sellLocation} Destination</p>
                  </div>
                </div>
              </div>
              <div className="mt-lg pt-lg border-t-2 border-dashed border-outline-variant/30">
                <div className="flex justify-between items-center mb-base">
                  <span className="font-body-md text-on-surface-variant font-bold text-primary">Estimated Profit</span>
                  <span className="font-headline-sm font-bold text-primary">{opp.profit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
