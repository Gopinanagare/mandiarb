import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { opportunities } from './LiveArbitrage';
import { useAuth } from '../context/AuthContext';
import PaywallModal from '../components/PaywallModal';

export default function Markets() {
  const navigate = useNavigate();
  const { isSubscribed, unlockedOpps } = useAuth();
  const [selectedOpp, setSelectedOpp] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [recentSearches, setRecentSearches] = useState([
    { title: "Honda City", subtitle: "Delhi NCR → Bangalore", icon: "directions_car", query: "Honda" },
    { title: "Black Pepper", subtitle: "Idukki → Chennai", icon: "grass", query: "Black Pepper" },
    { title: "24k Gold Coins", subtitle: "Dubai → Mumbai", icon: "diamond", query: "Gold" },
    { title: "Refurbished iPhones", subtitle: "Metro → Tier 2/3 Cities", icon: "smartphone", query: "iPhone" }
  ]);

  const categories = [
    { name: "All", icon: "explore", color: "bg-surface-variant text-on-surface-variant" },
    { name: "Agri", icon: "grass", color: "bg-primary-fixed text-on-primary-fixed-variant" },
    { name: "Auto", icon: "directions_car", color: "bg-secondary-fixed text-on-secondary-fixed-variant" },
    { name: "Metals", icon: "diamond", color: "bg-surface-variant text-on-surface-variant" },
    { name: "Retail", icon: "devices", color: "bg-tertiary-fixed text-on-tertiary-fixed-variant" }
  ];

  // Search logic
  const searchResults = useMemo(() => {
    if (!searchQuery && activeCategory === "All") return [];
    
    return opportunities.filter(opp => {
      const matchesSearch = searchQuery === "" || 
                            opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            opp.buyLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            opp.sellLocation.toLowerCase().includes(searchQuery.toLowerCase());
                            
      const matchesCategory = activeCategory === "All" || opp.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const isSearching = searchQuery.length > 0 || activeCategory !== "All";

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
  };

  const handleClearHistory = () => {
    setRecentSearches([]);
  };

  // Find specific opps for trending cards
  const macbookOpp = opportunities.find(o => o.title.includes("MacBook")) || opportunities[0];
  const autoOpp = opportunities.find(o => o.title.includes("Hyundai")) || opportunities[0];

  return (
    <main className="py-8 px-margin-mobile md:px-0 max-w-container-max mx-auto">
      {/* Hero Search Section */}
      <section className="mb-lg">
        <div className="max-w-3xl mx-auto text-center mb-md">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Global Omni-Parity</h2>
          <p className="font-body-md text-on-surface-variant">Discover high-margin arbitrage opportunities across Agri, Auto, Metals, and Retail.</p>
        </div>
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input 
            className="w-full h-16 pl-14 pr-32 bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] focus:ring-2 focus:ring-primary-container text-body-lg placeholder:text-outline-variant transition-all" 
            placeholder="Search commodities, vehicles, or electronics..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-2 right-2 flex items-center gap-2">
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
            <button className="h-12 px-6 bg-primary text-on-primary font-label-md rounded-lg hover:opacity-90 active:scale-95 transition-transform flex items-center gap-2">
              Deep Search
            </button>
          </div>
        </div>
      </section>

      {/* Filter Chips Section */}
      <section className="mb-lg overflow-x-auto scrollbar-hide -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        <div className="flex items-center gap-sm min-w-max pb-2">
          {categories.map((cat) => (
             <div 
               key={cat.name}
               onClick={() => setActiveCategory(cat.name)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-colors ${
                 activeCategory === cat.name 
                 ? 'bg-primary-container text-on-primary-container border-primary-container' 
                 : 'bg-surface-container-high border-outline-variant hover:bg-surface-variant'
               }`}
             >
               <span className="material-symbols-outlined text-body-sm">{cat.icon}</span>
               <span className="font-label-md">{cat.name}</span>
             </div>
          ))}
          <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
          <button 
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="text-secondary font-label-md flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-body-sm">filter_list_off</span>
            Clear All
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      {isSearching ? (
        <section className="animate-fade-in space-y-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-sm text-headline-sm">Search Results ({searchResults.length})</h3>
          </div>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-xl bg-surface-container-lowest rounded-xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">search_off</span>
              <h3 className="font-headline-sm text-on-surface mb-2">No matching opportunities found</h3>
              <p className="font-body-md text-on-surface-variant">Try adjusting your search terms or clearing categories.</p>
            </div>
          ) : (
            searchResults.map((opp) => {
              const isLocked = !isSubscribed && !unlockedOpps.includes(opp.id);
              return (
              <div key={opp.id} className="bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/20 hover:shadow-[0px_8px_30px_rgba(95,116,100,0.12)] transition-all group relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-xs flex-wrap">
                      <span className={`font-headline-sm text-headline-sm text-on-surface ${isLocked ? 'blur-sm select-none' : ''}`}>{isLocked ? "Hidden Commodity" : opp.title}</span>
                      <span className={`${opp.tagColor} px-2 py-0.5 rounded-full font-label-sm text-label-sm ${isLocked ? 'blur-sm select-none' : ''}`}>{opp.tag}</span>
                      <span className="bg-surface-container px-2 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface-variant ml-2">{opp.category}</span>
                    </div>
                    <div className={`flex items-center gap-4 ${isLocked ? 'blur-sm select-none pointer-events-none' : ''}`}>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-outline">Buy from</span>
                        <span className="font-body-md text-body-md font-semibold">{opp.buyLocation}</span>
                        <span className="font-headline-sm text-headline-sm text-primary">{opp.buyPrice} <span className="text-label-sm font-normal">{opp.buyUnit}</span></span>
                      </div>
                      <div className="flex items-center text-outline-variant">
                        <span className="material-symbols-outlined" data-icon="trending_flat">trending_flat</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-outline">Sell at</span>
                        <span className="font-body-md text-body-md font-semibold">{opp.sellLocation}</span>
                        <span className="font-headline-sm text-headline-sm text-secondary">{opp.sellPrice} <span className="text-label-sm font-normal">{opp.sellUnit}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex-1 grid grid-cols-2 gap-sm border-l border-outline-variant/30 pl-4 ${isLocked ? 'blur-sm select-none' : ''}`}>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-outline">ROI</span>
                      <span className={`font-body-md text-body-md font-bold ${opp.roi.startsWith('-') ? 'text-error' : 'text-secondary'}`}>{opp.roi}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-outline">Est. Time</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">{opp.executionTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch justify-center min-w-[180px] w-full md:w-[200px] z-10 relative">
                    <span className="font-label-md text-label-md text-outline mb-xs text-center">Est. Profit</span>
                    <div className={`bg-primary-container text-on-primary-container px-4 py-3 rounded-lg font-headline-sm text-headline-sm mb-2 w-full text-center whitespace-nowrap ${opp.profit.startsWith('-') ? 'bg-error-container text-on-error-container' : ''}`}>
                      {opp.profit}
                    </div>
                    {isLocked ? (
                      <button onClick={() => setSelectedOpp(opp)} className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-widest shadow hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">lock</span> Unlock
                      </button>
                    ) : (
                      <button onClick={() => navigate('/analytics', { state: { opp } })} className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md uppercase tracking-widest shadow hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        Analyze <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {isLocked && (
                  <div className="absolute inset-y-0 left-0 w-2/3 hidden md:flex items-center justify-center pointer-events-none z-0">
                    <div className="bg-surface/60 p-3 rounded-full backdrop-blur-sm border border-outline-variant/30 flex items-center gap-2 shadow-sm text-on-surface-variant font-label-md">
                      <span className="material-symbols-outlined text-[18px]">lock</span> Premium Trade Route
                    </div>
                  </div>
                )}
              </div>
              );
            })
          )}
        </section>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter animate-fade-in">
          {/* Recent Searches */}
          <aside className="lg:col-span-4 space-y-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm">Deep Search History</h3>
              {recentSearches.length > 0 && (
                <button onClick={handleClearHistory} className="text-label-md text-outline hover:text-primary transition-colors">Clear All</button>
              )}
            </div>
            
            <div className="space-y-sm">
              {recentSearches.length === 0 ? (
                <p className="text-on-surface-variant font-body-sm italic">No recent searches.</p>
              ) : (
                recentSearches.map((search, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleRecentSearchClick(search.query)}
                    className="p-4 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] flex items-center justify-between hover:shadow-[0px_8px_30px_rgba(95,116,100,0.12)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-fixed">
                        <span className="material-symbols-outlined">{search.icon}</span>
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface">{search.title}</p>
                        <p className="font-label-sm text-on-surface-variant">{search.subtitle}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">search</span>
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* Trending Categories & Items */}
          <section className="lg:col-span-8">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-sm text-headline-sm">Trending Multi-Market Parities</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-variant">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-variant">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
            
            {/* Main Trending Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="md:row-span-2 p-6 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] flex flex-col justify-between group hover:shadow-[0px_8px_30px_rgba(95,116,100,0.12)] transition-all border border-outline-variant/10">
                <div>
                  <div className="flex justify-between items-start mb-md">
                    <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[28px]">directions_car</span>
                    </div>
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm shadow-sm">+21.4% Margin</span>
                  </div>
                  <h5 className="font-headline-md text-on-surface">Compact SUVs (Used)</h5>
                  <p className="text-body-sm text-on-surface-variant mt-xs">Prices dropping in Delhi due to new 10-year diesel rule. Massive demand in Kerala/Bangalore.</p>
                </div>
                <div className="mt-xl">
                  <div className="flex items-center gap-2 mb-sm text-secondary font-semibold">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="font-label-md">Delhi NCR → Kochi / Bangalore</span>
                  </div>
                  <div className="flex justify-between mb-4 px-2">
                    <span className="text-label-sm text-outline">Est. Transport: ₹35k</span>
                    <span className="text-label-sm text-outline">RTO Transfer: ₹15k</span>
                  </div>
                  <button onClick={() => navigate('/analytics', { state: { opp: autoOpp } })} className="block text-center w-full py-3 bg-secondary text-white font-label-md rounded-full hover:brightness-110 shadow-md transition-all active:scale-95">Analyze Auto Trade Path</button>
                </div>
              </div>
              
              <div className="p-6 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] hover:shadow-[0px_8px_30px_rgba(95,116,100,0.12)] transition-all border border-outline-variant/10 cursor-pointer" onClick={() => handleRecentSearchClick("Red Onion")}>
                <div className="flex justify-between items-center mb-md">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">grass</span>
                    <h5 className="font-headline-sm text-on-surface">Red Onion (Garva)</h5>
                  </div>
                  <span className="px-2 py-1 bg-primary-fixed text-primary rounded font-label-sm">High Vol</span>
                </div>
                <div className="space-y-sm">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-on-surface-variant">Current Avg</span>
                    <span className="font-label-md text-on-surface">₹2,450/q</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary"></div>
                  </div>
                  <p className="text-label-sm text-on-surface-variant">Price up 4% this week in APMC</p>
                </div>
              </div>
              
              <div className="p-6 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] hover:shadow-[0px_8px_30px_rgba(95,116,100,0.12)] transition-all border border-outline-variant/10 cursor-pointer" onClick={() => navigate('/analytics', { state: { opp: macbookOpp } })}>
                <div className="flex justify-between items-center mb-md">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">laptop_mac</span>
                    <h5 className="font-headline-sm text-on-surface">Used MacBooks (M1)</h5>
                  </div>
                  <span className="material-symbols-outlined text-secondary">trending_up</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-headline-md font-bold text-on-surface">₹45k</span>
                  <span className="text-label-sm text-on-surface-variant mb-1">Buy Price</span>
                  <span className="text-headline-md font-bold text-secondary ml-2">₹58k</span>
                  <span className="text-label-sm text-on-surface-variant mb-1">Sell Price</span>
                </div>
                <div className="mt-md flex gap-2">
                  <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-on-surface-variant">Delhi/Mumbai</span>
                  <span className="material-symbols-outlined text-sm text-outline-variant self-center">arrow_forward</span>
                  <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-on-surface-variant">Bhubaneswar/Patna</span>
                </div>
              </div>
            </div>
            
          </section>
        </div>
      )}
      
      {selectedOpp && (
        <PaywallModal opp={selectedOpp} onClose={() => setSelectedOpp(null)} />
      )}
    </main>
  );
}
