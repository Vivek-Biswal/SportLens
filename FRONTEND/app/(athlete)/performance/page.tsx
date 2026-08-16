
export default function PerformancePage() {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-hidden space-y-8 max-w-[1440px] mx-auto w-full">
{/*  Header Section  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface mb-2">Performance Analytics</h2>
<p className="text-on-surface-variant text-body-lg">Understand your performance, identify trends, and improve your results.</p>
</div>
<div className="flex flex-wrap items-center gap-2 bg-surface-container p-1.5 rounded-xl border border-outline-variant shadow-sm w-fit">
<button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors">7D</button>
<button className="px-4 py-1.5 text-sm font-medium bg-secondary-container text-on-secondary-container rounded-lg shadow-sm border border-outline-variant transition-all">30D</button>
<button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors">3M</button>
<button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors">6M</button>
<button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors">1Y</button>
<div className="w-px h-5 bg-outline-variant mx-1"></div>
<button className="px-3 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        Custom
                    </button>
</div>
</div>
{/*  Top Row: Overall Score & AI Analysis  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/*  Overall Score Card  */}
<div className="glass-panel rounded-2xl p-6 lg:col-span-1 relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
<div className="relative z-10 flex flex-col h-full justify-between">
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="text-on-surface-variant font-medium text-sm tracking-wider uppercase">Overall Performance Score</h3>
<div className="mt-4 flex items-baseline gap-2">
<span className="text-6xl font-display-lg text-on-surface tabular-nums tracking-tighter">87</span>
<span className="text-2xl text-on-surface-variant font-medium">/ 100</span>
</div>
</div>
<div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
<span className="material-symbols-outlined text-emerald-400 text-2xl">trophy</span>
</div>
</div>
<div>
<div className="flex items-center gap-2 mb-4">
<span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold border border-emerald-500/20">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
                                    +8.4%
                                </span>
<span className="text-on-surface-variant text-sm">vs. previous 30 days</span>
</div>
{/*  Simplified Radial Progress representation  */}
<div className="h-2 w-full bg-primary-container rounded-full overflow-hidden mt-6">
<div className="h-full bg-emerald-500 rounded-full relative" style={{ width: '87%' }}>
<div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
</div>
</div>
<div className="flex justify-between mt-2 text-xs text-on-surface-variant font-label-caps">
<span>Elite Tier</span>
<span>Top 5%</span>
</div>
</div>
</div>
</div>
{/*  AI Analysis Card  */}
<div className="glass-panel rounded-2xl p-6 lg:col-span-2 relative overflow-hidden border-t-2 border-t-emerald-500/50">
<div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-9xl">auto_awesome</span>
</div>
<div className="flex items-center gap-3 mb-6 relative z-10">
<div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
<span className="material-symbols-outlined text-emerald-400 text-sm">psychology</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">AI Performance Analysis</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
<div className="space-y-4">
<div>
<h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-[18px]">bolt</span> Key Strengths
                                </h4>
<ul className="space-y-2 text-sm text-on-surface-variant">
<li className="flex items-start gap-2">
<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
<span>Sprint acceleration improved by 12% in the last macrocycle.</span>
</li>
<li className="flex items-start gap-2">
<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
<span>Exceptional consistency in Zone 4 heart rate maintenance.</span>
</li>
</ul>
</div>
<div>
<h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-[18px]">warning</span> Areas for Focus
                                </h4>
<ul className="space-y-2 text-sm text-on-surface-variant">
<li className="flex items-start gap-2">
<div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
<span>Lateral agility scores are plateauing compared to peers.</span>
</li>
</ul>
</div>
</div>
<div className="bg-primary-container/50 rounded-xl p-4 border border-outline-variant/50">
<h4 className="text-sm font-semibold text-on-surface flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-[18px] text-emerald-400">target</span> Recommended Protocol
                            </h4>
<p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                                Based on recent load data and slight decline in reactive strength index, shift next week's focus to <strong>plyometric recovery</strong> and <strong>lateral multidirectional drills</strong> while maintaining aerobic base.
                            </p>
<button className="w-full py-2 bg-surface text-on-surface text-sm font-medium rounded-lg border border-outline-variant hover:bg-surface-variant hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2">
                                View Suggested Workout Plan
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
{/*  Metrics Grid  */}
<div>
<h3 className="font-headline-md text-lg font-semibold text-on-surface mb-4">Core Metrics</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{/*  Metric Card 1  */}
<div className="bg-surface-container rounded-xl p-5 border border-outline-variant hover:border-emerald-500/30 transition-colors group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">speed</span> Speed
                            </span>
<span className="text-xs font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span> 4.2%
                            </span>
</div>
<div className="flex items-end gap-2 mb-4">
<span className="text-3xl font-bold text-on-surface tabular-nums">92</span>
<span className="text-sm text-on-surface-variant mb-1">/ 100</span>
</div>
<div className="space-y-1.5">
<div className="flex justify-between text-xs text-on-surface-variant font-label-caps">
<span>Prev: 88</span>
<span>Target: 95</span>
</div>
<div className="h-1.5 w-full bg-primary-container rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
</div>
</div>
</div>
{/*  Metric Card 2  */}
<div className="bg-surface-container rounded-xl p-5 border border-outline-variant hover:border-emerald-500/30 transition-colors group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">fitness_center</span> Strength
                            </span>
<span className="text-xs font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span> 1.5%
                            </span>
</div>
<div className="flex items-end gap-2 mb-4">
<span className="text-3xl font-bold text-on-surface tabular-nums">85</span>
<span className="text-sm text-on-surface-variant mb-1">/ 100</span>
</div>
<div className="space-y-1.5">
<div className="flex justify-between text-xs text-on-surface-variant font-label-caps">
<span>Prev: 83</span>
<span>Target: 90</span>
</div>
<div className="h-1.5 w-full bg-primary-container rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
</div>
</div>
</div>
{/*  Metric Card 3  */}
<div className="bg-surface-container rounded-xl p-5 border border-outline-variant hover:border-emerald-500/30 transition-colors group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">monitor_heart</span> Endurance
                            </span>
<span className="text-xs font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span> 6.8%
                            </span>
</div>
<div className="flex items-end gap-2 mb-4">
<span className="text-3xl font-bold text-on-surface tabular-nums">89</span>
<span className="text-sm text-on-surface-variant mb-1">/ 100</span>
</div>
<div className="space-y-1.5">
<div className="flex justify-between text-xs text-on-surface-variant font-label-caps">
<span>Prev: 83</span>
<span>Target: 90</span>
</div>
<div className="h-1.5 w-full bg-primary-container rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 rounded-full" style={{ width: '89%' }}></div>
</div>
</div>
</div>
{/*  Metric Card 4  */}
<div className="bg-surface-container rounded-xl p-5 border border-outline-variant hover:border-emerald-500/30 transition-colors group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">directions_run</span> Agility
                            </span>
<span className="text-xs font-semibold text-amber-400 flex items-center bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
<span className="material-symbols-outlined text-[14px]">horizontal_rule</span> 0.0%
                            </span>
</div>
<div className="flex items-end gap-2 mb-4">
<span className="text-3xl font-bold text-on-surface tabular-nums">78</span>
<span className="text-sm text-on-surface-variant mb-1">/ 100</span>
</div>
<div className="space-y-1.5">
<div className="flex justify-between text-xs text-on-surface-variant font-label-caps">
<span>Prev: 78</span>
<span>Target: 85</span>
</div>
<div className="h-1.5 w-full bg-primary-container rounded-full overflow-hidden">
<div className="h-full bg-amber-400 rounded-full" style={{ width: '78%' }}></div>
</div>
</div>
</div>
{/*  Metric Card 5  */}
<div className="bg-surface-container rounded-xl p-5 border border-outline-variant hover:border-emerald-500/30 transition-colors group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">model_training</span> Technique
                            </span>
<span className="text-xs font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span> 2.1%
                            </span>
</div>
<div className="flex items-end gap-2 mb-4">
<span className="text-3xl font-bold text-on-surface tabular-nums">94</span>
<span className="text-sm text-on-surface-variant mb-1">/ 100</span>
</div>
<div className="space-y-1.5">
<div className="flex justify-between text-xs text-on-surface-variant font-label-caps">
<span>Prev: 92</span>
<span>Target: 95</span>
</div>
<div className="h-1.5 w-full bg-primary-container rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
</div>
</div>
</div>
{/*  Metric Card 6  */}
<div className="bg-surface-container rounded-xl p-5 border border-outline-variant hover:border-emerald-500/30 transition-colors group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">sync</span> Consistency
                            </span>
<span className="text-xs font-semibold text-error flex items-center bg-error-container/20 px-1.5 py-0.5 rounded border border-error/30">
<span className="material-symbols-outlined text-[14px]">arrow_downward</span> -1.2%
                            </span>
</div>
<div className="flex items-end gap-2 mb-4">
<span className="text-3xl font-bold text-on-surface tabular-nums">82</span>
<span className="text-sm text-on-surface-variant mb-1">/ 100</span>
</div>
<div className="space-y-1.5">
<div className="flex justify-between text-xs text-on-surface-variant font-label-caps">
<span>Prev: 83</span>
<span>Target: 90</span>
</div>
<div className="h-1.5 w-full bg-primary-container rounded-full overflow-hidden">
<div className="h-full bg-error rounded-full" style={{ width: '82%' }}></div>
</div>
</div>
</div>
</div>
</div>
{/*  Charts Section  */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
{/*  Performance Progression Chart  */}
<div className="bg-surface-container rounded-2xl p-6 border border-outline-variant flex flex-col h-[400px]">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="font-headline-md text-lg font-semibold text-on-surface">Performance Score Progression</h3>
<p className="text-sm text-on-surface-variant">Trailing 6 months trend</p>
</div>
<button className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
{/*  Faux Line Chart Area  */}
<div className="flex-1 relative w-full h-full mt-2">
{/*  Y-Axis Grid Lines  */}
<div className="absolute inset-0 flex flex-col justify-between text-[10px] text-on-surface-variant font-label-caps">
<div className="flex items-center gap-2 w-full"><span className="w-6 text-right">100</span><div className="flex-1 border-b border-outline-variant/30 border-dashed"></div></div>
<div className="flex items-center gap-2 w-full"><span className="w-6 text-right">80</span><div className="flex-1 border-b border-outline-variant/30 border-dashed"></div></div>
<div className="flex items-center gap-2 w-full"><span className="w-6 text-right">60</span><div className="flex-1 border-b border-outline-variant/30 border-dashed"></div></div>
<div className="flex items-center gap-2 w-full"><span className="w-6 text-right">40</span><div className="flex-1 border-b border-outline-variant/30 border-dashed"></div></div>
</div>
{/*  SVG Line (Placeholder for actual chart)  */}
<div className="absolute inset-0 left-8 right-2 top-2 bottom-6 z-10">
<svg className="overflow-visible" height="100%" preserveAspectRatio="none" viewBox="0 0 500 200" width="100%">
{/*  Area Fill  */}
<defs>
<linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#10b981" stopOpacity="0.2"></stop>
<stop offset="100%" stopColor="#10b981" stopOpacity="0"></stop>
</linearGradient>
</defs>
<path d="M0,150 L80,130 L160,140 L240,90 L320,110 L400,60 L500,40 L500,200 L0,200 Z" fill="url(#chartGradient)"></path>
{/*  Line  */}
<path d="M0,150 L80,130 L160,140 L240,90 L320,110 L400,60 L500,40" fill="none" stroke="#10b981" strokeWidth="3" vectorEffect="non-scaling-stroke"></path>
{/*  Data Points  */}
<circle cx="80" cy="130" fill="#0f172a" r="4" stroke="#10b981" strokeWidth="2"></circle>
<circle cx="240" cy="90" fill="#0f172a" r="4" stroke="#10b981" strokeWidth="2"></circle>
<circle cx="400" cy="60" fill="#0f172a" r="4" stroke="#10b981" strokeWidth="2"></circle>
<circle cx="500" cy="40" fill="#10b981" r="6" stroke="#0f172a" strokeWidth="2"></circle>
{/*  Tooltip placeholder  */}
<g transform="translate(460, 15)">
<rect fill="#1e293b" height="20" rx="4" stroke="#334155" width="40"></rect>
<text fill="#d4e4fa" fontFamily="Inter" fontSize="10" fontWeight="bold" textAnchor="middle" x="20" y="14">87</text>
</g>
</svg>
</div>
{/*  X-Axis Labels  */}
<div className="absolute bottom-0 left-8 right-2 flex justify-between text-[10px] text-on-surface-variant font-label-caps pt-2">
<span>Jan</span>
<span>Feb</span>
<span>Mar</span>
<span>Apr</span>
<span>May</span>
<span>Jun</span>
</div>
</div>
</div>
{/*  Training Load Heatmap (Abstracted as Bar Chart)  */}
<div className="bg-surface-container rounded-2xl p-6 border border-outline-variant flex flex-col h-[400px]">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="font-headline-md text-lg font-semibold text-on-surface">Training Load &amp; Recovery</h3>
<p className="text-sm text-on-surface-variant">Volume vs Intensity over 14 days</p>
</div>
<div className="flex gap-3 text-xs">
<span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Load</span>
<span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Strain</span>
</div>
</div>
<div className="flex-1 relative w-full h-full flex items-end gap-2 px-2 pb-6 pt-8">
{/*  Y-Axis Grid Lines  */}
<div className="absolute inset-0 pb-6 pt-8 flex flex-col justify-between text-[10px] text-on-surface-variant font-label-caps pointer-events-none z-0">
<div className="w-full border-b border-outline-variant/30 border-dashed"></div>
<div className="w-full border-b border-outline-variant/30 border-dashed"></div>
<div className="w-full border-b border-outline-variant/30 border-dashed"></div>
<div className="w-full border-b border-outline-variant/30 border-dashed"></div>
</div>
{/*  Faux Bars  */}
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '40%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '60%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">M</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '65%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '70%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">T</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-amber-400/20 group-hover:bg-amber-400/40 rounded-t-sm transition-colors relative" style={{ height: '85%' }}>
<div className="absolute bottom-0 w-full bg-amber-400 rounded-t-sm" style={{ height: '80%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">W</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '30%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '50%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">T</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '70%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '60%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">F</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '50%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '40%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">S</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-surface-variant group-hover:bg-outline-variant rounded-t-sm transition-colors relative" style={{ height: '10%' }}>
<div className="absolute bottom-0 w-full bg-outline-variant rounded-t-sm" style={{ height: '100%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">S</span>
</div>
{/*  Week 2 Divider  */}
<div className="w-px h-full bg-outline-variant/50 mx-1 z-0"></div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '45%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '55%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">M</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '75%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '65%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">T</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-amber-400/20 group-hover:bg-amber-400/40 rounded-t-sm transition-colors relative" style={{ height: '95%' }}>
<div className="absolute bottom-0 w-full bg-amber-400 rounded-t-sm" style={{ height: '90%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">W</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '25%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '80%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">T</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '60%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '50%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">F</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors relative" style={{ height: '40%' }}>
<div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: '40%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">S</span>
</div>
<div className="flex-1 flex flex-col justify-end h-full z-10 group cursor-pointer">
<div className="w-full bg-surface-variant group-hover:bg-outline-variant rounded-t-sm transition-colors relative" style={{ height: '5%' }}>
<div className="absolute bottom-0 w-full bg-outline-variant rounded-t-sm" style={{ height: '100%' }}></div>
</div>
<span className="text-[10px] text-on-surface-variant text-center mt-2 font-label-caps">S</span>
</div>
</div>
</div>
</div>
{/*  Bottom Row: Benchmarking & Personal Bests  */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
{/*  Benchmarking  */}
<div className="bg-surface-container rounded-2xl p-6 border border-outline-variant xl:col-span-1">
<h3 className="font-headline-md text-lg font-semibold text-on-surface mb-6">How You Compare</h3>
<div className="space-y-6">
{/*  Category 1  */}
<div>
<div className="flex justify-between text-sm mb-2">
<span className="text-on-surface-variant">Age Group (24-28)</span>
<span className="text-emerald-400 font-semibold">Top 12%</span>
</div>
<div className="relative h-2 w-full bg-primary-container rounded-full overflow-hidden">
{/*  Bell curve distribution abstract representation  */}
<div className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-surface-variant via-surface-variant to-surface-variant opacity-50"></div>
<div className="absolute left-0 top-0 bottom-0 bg-emerald-500 rounded-full" style={{ width: '88%' }}></div>
</div>
</div>
{/*  Category 2  */}
<div>
<div className="flex justify-between text-sm mb-2">
<span className="text-on-surface-variant">Weight Class</span>
<span className="text-emerald-400 font-semibold">Top 8%</span>
</div>
<div className="relative h-2 w-full bg-primary-container rounded-full overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
</div>
</div>
{/*  Category 3  */}
<div>
<div className="flex justify-between text-sm mb-2">
<span className="text-on-surface-variant">Team Average</span>
<span className="text-emerald-400 font-semibold">+14% above</span>
</div>
<div className="relative h-2 w-full bg-primary-container rounded-full overflow-hidden flex">
<div className="h-full bg-surface-variant w-[50%]"></div>
<div className="h-full bg-emerald-500 w-[14%] border-l border-surface-container"></div>
</div>
<div className="flex justify-between mt-1 px-1">
<span className="text-[10px] text-on-surface-variant font-label-caps">Team Avg</span>
<span className="text-[10px] text-emerald-400 font-label-caps">You</span>
</div>
</div>
</div>
</div>
{/*  Personal Bests List  */}
<div className="bg-surface-container rounded-2xl p-0 border border-outline-variant xl:col-span-2 overflow-hidden flex flex-col">
<div className="p-6 border-b border-outline-variant flex justify-between items-center">
<h3 className="font-headline-md text-lg font-semibold text-on-surface">Personal Bests</h3>
<button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant/50 bg-primary-container/30">
<th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-label-caps">Metric</th>
<th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-label-caps text-right">Current Best</th>
<th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-label-caps text-right">Previous</th>
<th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-label-caps text-right">Improvement</th>
<th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider font-label-caps text-right">Date Achieved</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/50">
<tr className="hover:bg-surface-variant/30 transition-colors group">
<td className="py-4 px-6 text-sm font-medium text-on-surface flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:text-emerald-400 transition-colors">
<span className="material-symbols-outlined text-[18px]">speed</span>
</div>
                                        40m Dash
                                    </td>
<td className="py-4 px-6 text-sm text-on-surface text-right font-stats-number tabular-nums">4.42s</td>
<td className="py-4 px-6 text-sm text-on-surface-variant text-right font-stats-number tabular-nums">4.48s</td>
<td className="py-4 px-6 text-sm text-right">
<span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-medium border border-emerald-500/20">
<span className="material-symbols-outlined text-[14px]">trending_up</span> 1.3%
                                        </span>
</td>
<td className="py-4 px-6 text-sm text-on-surface-variant text-right">Oct 12, 2023</td>
</tr>
<tr className="hover:bg-surface-variant/30 transition-colors group">
<td className="py-4 px-6 text-sm font-medium text-on-surface flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:text-emerald-400 transition-colors">
<span className="material-symbols-outlined text-[18px]">fitness_center</span>
</div>
                                        Deadlift (1RM)
                                    </td>
<td className="py-4 px-6 text-sm text-on-surface text-right font-stats-number tabular-nums">225 kg</td>
<td className="py-4 px-6 text-sm text-on-surface-variant text-right font-stats-number tabular-nums">215 kg</td>
<td className="py-4 px-6 text-sm text-right">
<span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-medium border border-emerald-500/20">
<span className="material-symbols-outlined text-[14px]">trending_up</span> 4.6%
                                        </span>
</td>
<td className="py-4 px-6 text-sm text-on-surface-variant text-right">Sep 28, 2023</td>
</tr>
<tr className="hover:bg-surface-variant/30 transition-colors group">
<td className="py-4 px-6 text-sm font-medium text-on-surface flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:text-emerald-400 transition-colors">
<span className="material-symbols-outlined text-[18px]">monitor_heart</span>
</div>
                                        VO2 Max
                                    </td>
<td className="py-4 px-6 text-sm text-on-surface text-right font-stats-number tabular-nums">62.4 ml/kg</td>
<td className="py-4 px-6 text-sm text-on-surface-variant text-right font-stats-number tabular-nums">61.0 ml/kg</td>
<td className="py-4 px-6 text-sm text-right">
<span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-medium border border-emerald-500/20">
<span className="material-symbols-outlined text-[14px]">trending_up</span> 2.3%
                                        </span>
</td>
<td className="py-4 px-6 text-sm text-on-surface-variant text-right">Aug 15, 2023</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/*  Bottom Action  */}
<div className="flex justify-end pt-4 pb-8">
<button className="bg-primary-container text-on-surface border border-outline-variant hover:border-emerald-500 hover:text-emerald-400 font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[20px]">download</span>
                    Download Performance Report (PDF)
                </button>
</div>
</main>
  );
}
