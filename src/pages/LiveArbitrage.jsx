import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PaywallModal from '../components/PaywallModal';

export const opportunities = [
  {
    id: 1,
    title: "Toor Dal",
    category: "Agri",
    tag: "High Quality",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    buyLocation: "Gulbarga",
    buyPrice: "₹7,200",
    buyUnit: "/qtl",
    buyLink: "https://enam.gov.in/web/",
    sellLocation: "Mumbai",
    sellPrice: "₹8,850",
    sellUnit: "/qtl",
    sellLink: "https://mumbaiappmc.com/",
    tax: "₹360",
    taxPercent: "5%",
    logistics: "₹2,400",
    roi: "12%",
    profit: "+₹1,290",
    profitValue: 1290,
    executionTime: "2-3 Days"
  },
  {
    id: 2,
    title: "Hyundai i20 Asta",
    category: "Auto",
    tag: "2019 Model",
    tagColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    buyLocation: "New Delhi",
    buyPrice: "₹4.5L",
    buyUnit: "",
    buyLink: "https://www.cars24.com/",
    sellLocation: "Bangalore",
    sellPrice: "₹5.8L",
    sellUnit: "",
    sellLink: "https://www.spinny.com/",
    tax: "₹18,000",
    taxPercent: "4%",
    logistics: "₹25,000",
    roi: "15%",
    profit: "+₹87,000",
    profitValue: 87000,
    executionTime: "7-10 Days"
  },
  {
    id: 3,
    title: "Basmati Rice",
    category: "Agri",
    tag: "Premium",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    buyLocation: "Karnal",
    buyPrice: "₹4,500",
    buyUnit: "/qtl",
    buyLink: "https://agmarknet.gov.in/",
    sellLocation: "Dubai Port",
    sellPrice: "₹5,900",
    sellUnit: "/qtl",
    sellLink: "https://www.agriexchange.apeda.gov.in/",
    tax: "₹225",
    taxPercent: "5%",
    logistics: "₹1,100",
    roi: "18%",
    profit: "+₹1,075",
    profitValue: 1075,
    executionTime: "14-21 Days"
  },
  {
    id: 4,
    title: "RE Classic 350",
    category: "Auto",
    tag: "Used - Good",
    tagColor: "bg-secondary-fixed text-on-secondary-fixed-variant",
    buyLocation: "Pune",
    buyPrice: "₹1.1L",
    buyUnit: "",
    buyLink: "https://www.bikewale.com/",
    sellLocation: "Goa",
    sellPrice: "₹1.45L",
    sellUnit: "",
    sellLink: "https://www.olx.in/goa_g2001150/motorcycles_c81",
    tax: "₹5,500",
    taxPercent: "5%",
    logistics: "₹4,500",
    roi: "22%",
    profit: "+₹25,000",
    profitValue: 25000,
    executionTime: "3-5 Days"
  },
  {
    id: 5,
    title: "Silver Bars",
    category: "Metals",
    tag: "99.9% Purity",
    tagColor: "bg-outline-variant/50 text-on-surface-variant",
    buyLocation: "Ahmedabad",
    buyPrice: "₹72,000",
    buyUnit: "/kg",
    buyLink: "https://www.mcxindia.com/",
    sellLocation: "Chennai",
    sellPrice: "₹75,500",
    sellUnit: "/kg",
    sellLink: "https://www.ibja.co/",
    tax: "₹2,160",
    taxPercent: "3%",
    logistics: "₹500",
    roi: "4%",
    profit: "+₹840",
    profitValue: 840,
    executionTime: "24 Hours"
  },
  {
    id: 6,
    title: "iPhone 14 Pro",
    category: "Retail",
    tag: "Refurbished",
    tagColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    buyLocation: "Mumbai",
    buyPrice: "₹60,000",
    buyUnit: "/unit",
    buyLink: "https://www.cashify.in/",
    sellLocation: "Hubli",
    sellPrice: "₹72,000",
    sellUnit: "/unit",
    sellLink: "https://www.amazon.in/refurbished/",
    tax: "₹3,000",
    taxPercent: "5%",
    logistics: "₹250",
    roi: "14%",
    profit: "+₹8,750",
    profitValue: 8750,
    executionTime: "48 Hours"
  },
  {
    id: 7,
    title: "Red Onion (Garva)",
    category: "Agri",
    tag: "Grade A",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
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
    profit: "+₹4.22",
    profitValue: 4.22,
    executionTime: "12-24 Hours"
  },
  {
    id: 8,
    title: "Maruti Swift VXi",
    category: "Auto",
    tag: "2021 Model",
    tagColor: "bg-secondary-fixed text-on-secondary-fixed-variant",
    buyLocation: "Chandigarh",
    buyPrice: "₹5.2L",
    buyUnit: "",
    buyLink: "https://www.spinny.com/",
    sellLocation: "Hyderabad",
    sellPrice: "₹6.1L",
    sellUnit: "",
    sellLink: "https://www.cars24.com/",
    tax: "₹15,000",
    taxPercent: "3%",
    logistics: "₹22,000",
    roi: "10%",
    profit: "+₹53,000",
    profitValue: 53000,
    executionTime: "8-12 Days"
  },
  {
    id: 9,
    title: "MacBook Air M1",
    category: "Retail",
    tag: "Used - Box Open",
    tagColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    buyLocation: "Delhi",
    buyPrice: "₹45,000",
    buyUnit: "/unit",
    buyLink: "https://www.olx.in/",
    sellLocation: "Bhubaneswar",
    sellPrice: "₹58,000",
    sellUnit: "/unit",
    sellLink: "https://www.amazon.in/",
    tax: "₹2,250",
    taxPercent: "5%",
    logistics: "₹650",
    roi: "22%",
    profit: "+₹10,100",
    profitValue: 10100,
    executionTime: "3-5 Days"
  },
  {
    id: 10,
    title: "Soybean",
    category: "Agri",
    tag: "Bulk Yield",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    buyLocation: "Indore",
    buyPrice: "₹4,100",
    buyUnit: "/qtl",
    buyLink: "https://agmarknet.gov.in/",
    sellLocation: "Kandla Port",
    sellPrice: "₹4,850",
    sellUnit: "/qtl",
    sellLink: "https://www.agriexchange.apeda.gov.in/",
    tax: "₹205",
    taxPercent: "5%",
    logistics: "₹180",
    roi: "8.5%",
    profit: "+₹365",
    profitValue: 365,
    executionTime: "4-7 Days"
  },
  {
    id: 11,
    title: "24k Gold Coins",
    category: "Metals",
    tag: "10g Standard",
    tagColor: "bg-outline-variant/50 text-on-surface-variant",
    buyLocation: "Dubai",
    buyPrice: "₹62,000",
    buyUnit: "/10g",
    buyLink: "https://www.dubaicityofgold.com/",
    sellLocation: "Mumbai",
    sellPrice: "₹68,500",
    sellUnit: "/10g",
    sellLink: "https://www.ibja.co/",
    tax: "₹3,500",
    taxPercent: "Customs",
    logistics: "₹800",
    roi: "3.5%",
    profit: "+₹2,200",
    profitValue: 2200,
    executionTime: "2-4 Days"
  },
  {
    id: 12,
    title: "KTM Duke 390",
    category: "Auto",
    tag: "2020 Model",
    tagColor: "bg-secondary-fixed text-on-secondary-fixed-variant",
    buyLocation: "Mumbai",
    buyPrice: "₹1.8L",
    buyUnit: "",
    buyLink: "https://www.bikewale.com/",
    sellLocation: "Indore",
    sellPrice: "₹2.2L",
    sellUnit: "",
    sellLink: "https://www.olx.in/",
    tax: "₹9,000",
    taxPercent: "5%",
    logistics: "₹6,000",
    roi: "13%",
    profit: "+₹25,000",
    profitValue: 25000,
    executionTime: "5-8 Days"
  },
  {
    id: 13,
    title: "Black Pepper",
    category: "Agri",
    tag: "Organic",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    buyLocation: "Idukki",
    buyPrice: "₹480",
    buyUnit: "/kg",
    buyLink: "https://agmarknet.gov.in/",
    sellLocation: "Chennai",
    sellPrice: "₹610",
    sellUnit: "/kg",
    sellLink: "https://chennaimarket.com/",
    tax: "₹24",
    taxPercent: "5%",
    logistics: "₹35",
    roi: "14%",
    profit: "+₹71",
    profitValue: 71,
    executionTime: "2-3 Days"
  },
  {
    id: 14,
    title: "Sony PS5 Disc Ed.",
    category: "Retail",
    tag: "Used - Mint",
    tagColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    buyLocation: "Bangalore",
    buyPrice: "₹38,000",
    buyUnit: "/unit",
    buyLink: "https://gameloot.in/",
    sellLocation: "Patna",
    sellPrice: "₹46,000",
    sellUnit: "/unit",
    sellLink: "https://www.olx.in/",
    tax: "₹1,900",
    taxPercent: "5%",
    logistics: "₹800",
    roi: "13%",
    profit: "+₹5,300",
    profitValue: 5300,
    executionTime: "3-6 Days"
  },
  {
    id: 15,
    title: "Tata Nexon EV",
    category: "Auto",
    tag: "2022 Base",
    tagColor: "bg-secondary-fixed text-on-secondary-fixed-variant",
    buyLocation: "Surat",
    buyPrice: "₹10.5L",
    buyUnit: "",
    buyLink: "https://www.cars24.com/",
    sellLocation: "Delhi NCR",
    sellPrice: "₹12.2L",
    sellUnit: "",
    sellLink: "https://www.spinny.com/",
    tax: "₹42,000",
    taxPercent: "4%",
    logistics: "₹28,000",
    roi: "9.5%",
    profit: "+₹1,00,000",
    profitValue: 100000,
    executionTime: "1-2 Weeks"
  },
  {
    id: 16,
    title: "Wheat (Lokwan)",
    category: "Agri",
    tag: "A-Grade",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    buyLocation: "Sehore",
    buyPrice: "₹2,400",
    buyUnit: "/qtl",
    buyLink: "https://enam.gov.in/",
    sellLocation: "Rajkot",
    sellPrice: "₹2,950",
    sellUnit: "/qtl",
    sellLink: "https://gujaratapmc.com/",
    tax: "₹120",
    taxPercent: "5%",
    logistics: "₹210",
    roi: "9%",
    profit: "+₹220",
    profitValue: 220,
    executionTime: "3-5 Days"
  },
  {
    id: 17,
    title: "Copper Scrap",
    category: "Metals",
    tag: "Industrial",
    tagColor: "bg-outline-variant/50 text-on-surface-variant",
    buyLocation: "Faridabad",
    buyPrice: "₹680",
    buyUnit: "/kg",
    buyLink: "https://www.scrapmonster.com/",
    sellLocation: "Coimbatore",
    sellPrice: "₹760",
    sellUnit: "/kg",
    sellLink: "https://www.indiamart.com/",
    tax: "₹122",
    taxPercent: "18%",
    logistics: "₹15",
    roi: "-8%",
    profit: "-₹57",
    profitValue: -57,
    executionTime: "7-10 Days"
  },
  {
    id: 18,
    title: "Honda City",
    category: "Auto",
    tag: "2018 VX CVT",
    tagColor: "bg-secondary-fixed text-on-secondary-fixed-variant",
    buyLocation: "Gurgaon",
    buyPrice: "₹7.2L",
    buyUnit: "",
    buyLink: "https://www.cars24.com/",
    sellLocation: "Kochi",
    sellPrice: "₹8.9L",
    sellUnit: "",
    sellLink: "https://www.olx.in/",
    tax: "₹28,800",
    taxPercent: "4%",
    logistics: "₹35,000",
    roi: "14%",
    profit: "+₹1,06,200",
    profitValue: 106200,
    executionTime: "2-3 Weeks"
  },
  {
    id: 19,
    title: "Cashew (W320)",
    category: "Agri",
    tag: "Export Quality",
    tagColor: "bg-primary-fixed text-on-primary-fixed-variant",
    buyLocation: "Mangalore",
    buyPrice: "₹650",
    buyUnit: "/kg",
    buyLink: "https://agmarknet.gov.in/",
    sellLocation: "Jaipur",
    sellPrice: "₹850",
    sellUnit: "/kg",
    sellLink: "https://rajasthanapmc.com/",
    tax: "₹32.5",
    taxPercent: "5%",
    logistics: "₹45",
    roi: "18%",
    profit: "+₹122.5",
    profitValue: 122.5,
    executionTime: "5-7 Days"
  },
  {
    id: 20,
    title: "DJI Mini 3 Pro",
    category: "Retail",
    tag: "Used - No Box",
    tagColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    buyLocation: "Hyderabad",
    buyPrice: "₹52,000",
    buyUnit: "/unit",
    buyLink: "https://www.olx.in/",
    sellLocation: "Manali",
    sellPrice: "₹68,000",
    sellUnit: "/unit",
    sellLink: "https://www.facebook.com/marketplace",
    tax: "₹0",
    taxPercent: "0%",
    logistics: "₹850",
    roi: "29%",
    profit: "+₹15,150",
    profitValue: 15150,
    executionTime: "3-5 Days"
  }
];

export default function LiveArbitrage() {
  const navigate = useNavigate();
  const { isSubscribed, unlockedOpps } = useAuth();
  const [selectedOpp, setSelectedOpp] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [buyCity, setBuyCity] = useState("All");
  const [sellCity, setSellCity] = useState("All");

  const categories = ["All", "Agri", "Auto", "Metals", "Retail"];
  
  // Extract unique cities
  const uniqueBuyCities = ["All", ...new Set(opportunities.map(o => o.buyLocation))].sort();
  const uniqueSellCities = ["All", ...new Set(opportunities.map(o => o.sellLocation))].sort();

  // Filter and sort by descending profit value
  const filteredAndSortedOpportunities = useMemo(() => {
    return opportunities
      .filter(o => activeCategory === "All" || o.category === activeCategory)
      .filter(o => buyCity === "All" || o.buyLocation === buyCity)
      .filter(o => sellCity === "All" || o.sellLocation === sellCity)
      .sort((a, b) => b.profitValue - a.profitValue);
  }, [activeCategory, buyCity, sellCity]);

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile py-8">
      {/* Dashboard Header */}
      <div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Omni-Channel Arbitrage</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Live cross-market price spreads. Ranked by maximum absolute profit.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md border transition-all ${
                activeCategory === cat 
                ? 'bg-primary text-on-primary border-primary' 
                : 'bg-transparent text-on-surface-variant border-outline-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Route Filters */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 mb-lg flex flex-col md:flex-row items-center gap-4">
        <span className="material-symbols-outlined text-outline">filter_alt</span>
        <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <label className="block font-label-sm text-outline mb-1 uppercase tracking-wider">Source (Buy City)</label>
            <select 
              value={buyCity}
              onChange={(e) => setBuyCity(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {uniqueBuyCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-center pt-4">
            <span className="material-symbols-outlined text-outline-variant">arrow_forward</span>
          </div>
          <div className="flex-1">
            <label className="block font-label-sm text-outline mb-1 uppercase tracking-wider">Destination (Sell City)</label>
            <select 
              value={sellCity}
              onChange={(e) => setSellCity(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {uniqueSellCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>
        <div className="md:ml-auto">
          <button 
            onClick={() => { setBuyCity("All"); setSellCity("All"); setActiveCategory("All"); }}
            className="text-secondary font-label-md hover:underline"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">Results Found</span>
            <div className="font-headline-md text-headline-md text-on-surface">{filteredAndSortedOpportunities.length}</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-container text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">list_alt</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">Max Available Profit</span>
            <div className="font-headline-md text-headline-md text-secondary">
              {filteredAndSortedOpportunities.length > 0 
                ? filteredAndSortedOpportunities[0].profit 
                : "₹0"}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">payments</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(95,116,100,0.06)] border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">Markets Tracked</span>
            <div className="font-headline-md text-headline-md text-on-surface">1,402</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-tertiary-container text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">monitoring</span>
          </div>
        </div>
      </div>

      {/* Live Arbitrage List */}
      <div className="space-y-md">
        {filteredAndSortedOpportunities.length === 0 ? (
          <div className="text-center py-xl bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">search_off</span>
            <h3 className="font-headline-sm text-on-surface mb-2">No exact routes found</h3>
            <p className="font-body-md text-on-surface-variant">Try expanding your search by clearing the city filters.</p>
            <button 
              onClick={() => { setBuyCity("All"); setSellCity("All"); }}
              className="mt-4 bg-primary text-on-primary px-6 py-2 rounded-full font-label-md"
            >
              Reset City Filters
            </button>
          </div>
        ) : (
          filteredAndSortedOpportunities.map((opp) => {
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
                      <a href={opp.buyLink} target="_blank" rel="noopener noreferrer" className="text-primary font-label-sm hover:underline mt-1 flex items-center gap-1 w-fit bg-primary/5 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span> Direct Buy Link
                      </a>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-outline-variant" data-icon="trending_flat">trending_flat</span>
                      <div className="mt-2 flex flex-col items-center text-outline text-xs text-center">
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                        <span>Est: {opp.executionTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-outline">Sell at</span>
                      <span className="font-body-md text-body-md font-semibold">{opp.sellLocation}</span>
                      <span className="font-headline-sm text-headline-sm text-secondary">{opp.sellPrice} <span className="text-label-sm font-normal">{opp.sellUnit}</span></span>
                      <a href={opp.sellLink} target="_blank" rel="noopener noreferrer" className="text-secondary font-label-sm hover:underline mt-1 flex items-center gap-1 w-fit bg-secondary/5 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span> Target Market
                      </a>
                    </div>
                  </div>
                </div>
                <div className="h-px md:h-12 w-full md:w-px bg-outline-variant/30"></div>
                <div className={`flex-1 grid grid-cols-2 md:grid-cols-3 gap-sm ${isLocked ? 'blur-sm select-none' : ''}`}>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-outline">Tax: {opp.taxPercent}</span>
                    <span className="font-body-md text-body-md">{opp.tax}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-outline">Logistics</span>
                    <span className="font-body-md text-body-md">{opp.logistics}</span>
                  </div>
                  <div className="flex flex-col col-span-2 md:col-span-1">
                    <span className="font-label-md text-label-md text-outline">ROI</span>
                    <span className={`font-body-md text-body-md font-bold ${opp.roi.startsWith('-') ? 'text-error' : 'text-secondary'}`}>{opp.roi}</span>
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
              
              {/* Optional: Add a lock overlay across the blurred area on desktop if locked */}
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
      </div>
      
      {selectedOpp && (
        <PaywallModal opp={selectedOpp} onClose={() => setSelectedOpp(null)} />
      )}
    </main>
  );
}
