
export default function DashboardPage() {
  return (
    <main className="md:ml-64 pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
{/*  Header Section  */}
<section className="mb-section-gap">
<div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
<div>
<h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg font-display-lg mb-2 text-on-surface">Good morning, Athlete</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Track your performance, build your profile, and discover new opportunities.</p>
</div>
{/*  Profile Strength  */}
<div className="layer-surface border layer-border rounded-2xl p-container-padding w-full lg:w-80 flex flex-col gap-4">
<div className="flex justify-between items-center">
<span className="font-body-md text-body-md font-semibold text-on-surface">Profile Strength</span>
<span className="font-stats-number text-stats-number text-emerald">82%</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-emerald h-2 rounded-full" style={{ width: '82%' }}></div>
</div>
<button className="w-full py-2 bg-transparent border layer-border text-on-surface rounded-lg font-semibold hover:bg-surface-variant transition-colors text-sm">
                        Complete Profile
                    </button>
</div>
</div>
</section>
{/*  KPI Cards Grid  */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-section-gap">
{/*  KPI 1  */}
<div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
<div className="flex justify-between items-start">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Performance Score</span>
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">monitoring</span>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-headline-lg font-bold text-on-surface">87<span className="text-xl text-on-surface-variant">/100</span></span>
</div>
<div className="flex items-center gap-1 mt-1 text-sm text-emerald">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+8% this month</span>
</div>
</div>
</div>
{/*  KPI 2  */}
<div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
<div className="flex justify-between items-start">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Profile Views</span>
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">visibility</span>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-headline-lg font-bold text-on-surface">1,284</span>
</div>
<div className="flex items-center gap-1 mt-1 text-sm text-emerald">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+18% this month</span>
</div>
</div>
</div>
{/*  KPI 3  */}
<div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
<div className="flex justify-between items-start">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Scout Interest</span>
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">star</span>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-headline-lg font-bold text-on-surface">24</span>
</div>
<div className="flex items-center gap-1 mt-1 text-sm text-emerald">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+6 this month</span>
</div>
</div>
</div>
{/*  KPI 4  */}
<div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
<div className="flex justify-between items-start">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Opportunities</span>
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">work</span>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-headline-lg font-bold text-on-surface">12</span>
</div>
<div className="flex items-center gap-1 mt-1 text-sm text-on-surface-variant">
<span className="material-symbols-outlined text-sm">fiber_new</span>
<span>3 new this week</span>
</div>
</div>
</div>
</section>
{/*  Main Bento Grid  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-section-gap">
{/*  Performance Overview Chart (Spans 2 columns)  */}
<div className="lg:col-span-2 layer-surface border layer-border rounded-2xl p-container-padding flex flex-col">
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
<div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Performance Overview</h3>
<p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">6-month composite score progression</p>
</div>
<div className="flex bg-layer-base border layer-border rounded-lg p-1">
<button className="px-3 py-1 text-sm font-semibold rounded-md text-on-surface-variant hover:text-on-surface">7D</button>
<button className="px-3 py-1 text-sm font-semibold rounded-md text-on-surface-variant hover:text-on-surface">30D</button>
<button className="px-3 py-1 text-sm font-semibold rounded-md bg-surface-variant text-on-surface">6M</button>
<button className="px-3 py-1 text-sm font-semibold rounded-md text-on-surface-variant hover:text-on-surface">1Y</button>
</div>
</div>
{/*  Chart Area Placeholder  */}
<div className="flex-grow w-full h-64 relative border-b border-l layer-border flex items-end">
{/*  Y-axis labels  */}
<div className="absolute left-[-30px] top-0 bottom-0 flex flex-col justify-between text-xs text-on-surface-variant py-2">
<span>100</span>
<span>75</span>
<span>50</span>
<span>25</span>
</div>
{/*  Mock SVG Line Chart for Emerald Green data line  */}
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
{/*  Grid lines  */}
<line stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25"></line>
<line stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="100" y1="50" y2="50"></line>
<line stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="100" y1="75" y2="75"></line>
{/*  Data Line  */}
<polyline fill="none" points="0,60 20,55 40,40 60,45 80,20 100,15" stroke="#10B981" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
{/*  Points  */}
<circle cx="0" cy="60" fill="#10B981" r="1.5"></circle>
<circle cx="20" cy="55" fill="#10B981" r="1.5"></circle>
<circle cx="40" cy="40" fill="#10B981" r="1.5"></circle>
<circle cx="60" cy="45" fill="#10B981" r="1.5"></circle>
<circle cx="80" cy="20" fill="#10B981" r="1.5"></circle>
<circle cx="100" cy="15" fill="#10B981" r="1.5"></circle>
</svg>
{/*  X-axis labels  */}
<div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-on-surface-variant px-2">
<span>Jan</span>
<span>Feb</span>
<span>Mar</span>
<span>Apr</span>
<span>May</span>
<span>Jun</span>
</div>
</div>
</div>
{/*  AI Insights (1 column)  */}
<div className="lg:col-span-1 layer-surface border layer-border rounded-2xl p-container-padding flex flex-col relative overflow-hidden">
{/*  Premium subtle background effect  */}
<div className="absolute top-0 right-0 w-32 h-32 bg-emerald rounded-full opacity-5 blur-[60px]"></div>
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-emerald">auto_awesome</span>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">AI Insights</h3>
</div>
<ul className="flex flex-col gap-4 flex-grow">
<li className="flex items-start gap-3">
<span className="w-1.5 h-1.5 rounded-full bg-emerald mt-2 flex-shrink-0"></span>
<p className="font-body-md text-body-md text-on-surface-variant text-sm"><strong className="text-on-surface font-semibold">Sprint performance improved by 12%</strong> over the last 30 days, placing you in the top 5% of your cohort.</p>
</li>
<li className="flex items-start gap-3">
<span className="w-1.5 h-1.5 rounded-full bg-emerald mt-2 flex-shrink-0"></span>
<p className="font-body-md text-body-md text-on-surface-variant text-sm"><strong className="text-on-surface font-semibold">Consistency flagged:</strong> Agility drill scores show high variance. Focus on form stabilization during lateral movements.</p>
</li>
<li className="flex items-start gap-3">
<span className="w-1.5 h-1.5 rounded-full bg-emerald mt-2 flex-shrink-0"></span>
<p className="font-body-md text-body-md text-on-surface-variant text-sm"><strong className="text-on-surface font-semibold">Scout Match:</strong> Your recent endurance metrics strongly align with profiles sought by 'FC Dynamics'.</p>
</li>
</ul>
<button className="mt-6 w-full py-2 bg-transparent border layer-border text-on-surface rounded-lg font-semibold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 text-sm">
                    View Full Analysis
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
{/*  Secondary Sections Grid  */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-section-gap">
{/*  Recent Performance Table  */}
<div className="layer-surface border layer-border rounded-2xl p-container-padding overflow-hidden flex flex-col">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Recent Performance</h3>
<button className="text-sm text-emerald hover:text-opacity-80 font-semibold">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b layer-border">
<th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Date</th>
<th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Event/Category</th>
<th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium text-right">Score</th>
<th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium text-center">Rating</th>
</tr>
</thead>
<tbody className="text-sm text-on-surface">
<tr className="border-b layer-border hover:bg-surface-variant transition-colors">
<td className="py-3 text-on-surface-variant">Oct 24</td>
<td className="py-3">
<div className="font-semibold">Pro Combine 2023</div>
<div className="text-xs text-on-surface-variant">40yd Dash</div>
</td>
<td className="py-3 text-right font-stats-number">4.32s</td>
<td className="py-3 text-center">
<span className="inline-block px-2 py-1 rounded bg-[#10B981]/20 text-[#10B981] font-label-caps text-[10px]">ELITE</span>
</td>
</tr>
<tr className="border-b layer-border hover:bg-surface-variant transition-colors">
<td className="py-3 text-on-surface-variant">Oct 18</td>
<td className="py-3">
<div className="font-semibold">Regional Trials</div>
<div className="text-xs text-on-surface-variant">Vertical Jump</div>
</td>
<td className="py-3 text-right font-stats-number">38.5"</td>
<td className="py-3 text-center">
<span className="inline-block px-2 py-1 rounded bg-[#10B981]/20 text-[#10B981] font-label-caps text-[10px]">ELITE</span>
</td>
</tr>
<tr className="border-b layer-border hover:bg-surface-variant transition-colors">
<td className="py-3 text-on-surface-variant">Oct 12</td>
<td className="py-3">
<div className="font-semibold">Academy Assessment</div>
<div className="text-xs text-on-surface-variant">Agility Drill</div>
</td>
<td className="py-3 text-right font-stats-number">6.8s</td>
<td className="py-3 text-center">
<span className="inline-block px-2 py-1 rounded bg-surface-variant text-on-surface-variant border layer-border font-label-caps text-[10px]">GOOD</span>
</td>
</tr>
<tr className="hover:bg-surface-variant transition-colors">
<td className="py-3 text-on-surface-variant">Oct 05</td>
<td className="py-3">
<div className="font-semibold">Endurance Test</div>
<div className="text-xs text-on-surface-variant">Beep Test</div>
</td>
<td className="py-3 text-right font-stats-number">Lvl 14</td>
<td className="py-3 text-center">
<span className="inline-block px-2 py-1 rounded bg-[#10B981]/20 text-[#10B981] font-label-caps text-[10px]">ELITE</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
{/*  Recommended Opportunities  */}
<div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Recommended Opportunities</h3>
<button className="text-sm text-emerald hover:text-opacity-80 font-semibold">View All</button>
</div>
<div className="flex flex-col gap-4">
{/*  Opp 1  */}
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border layer-border bg-layer-base hover:border-emerald transition-colors">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-variant flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-surface-variant">sports_soccer</span>
</div>
<div>
<h4 className="font-semibold text-on-surface text-sm">Senior Squad Tryouts</h4>
<p className="text-xs text-on-surface-variant">FC Dynamics • Manchester, UK</p>
<div className="flex items-center gap-2 mt-1">
<span className="text-[10px] bg-emerald/20 text-emerald px-1.5 py-0.5 rounded font-label-caps">94% MATCH</span>
<span className="text-[10px] text-on-surface-variant">Deadline: Nov 15</span>
</div>
</div>
</div>
<div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
<button className="p-2 border layer-border rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors flex-grow sm:flex-grow-0 flex justify-center">
<span className="material-symbols-outlined text-[20px]">bookmark_border</span>
</button>
<button className="px-4 py-2 bg-emerald text-primary-container font-semibold rounded-lg hover:bg-opacity-90 transition-opacity text-sm flex-grow sm:flex-grow-0">
                                Apply
                            </button>
</div>
</div>
{/*  Opp 2  */}
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border layer-border bg-layer-base hover:border-emerald transition-colors">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-variant flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-surface-variant">sports_football</span>
</div>
<div>
<h4 className="font-semibold text-on-surface text-sm">Development Camp</h4>
<p className="text-xs text-on-surface-variant">National Athletic • London, UK</p>
<div className="flex items-center gap-2 mt-1">
<span className="text-[10px] bg-emerald/20 text-emerald px-1.5 py-0.5 rounded font-label-caps">88% MATCH</span>
<span className="text-[10px] text-on-surface-variant">Deadline: Nov 20</span>
</div>
</div>
</div>
<div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
<button className="p-2 border layer-border rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors flex-grow sm:flex-grow-0 flex justify-center">
<span className="material-symbols-outlined text-[20px]">bookmark_border</span>
</button>
<button className="px-4 py-2 bg-transparent border layer-border text-on-surface font-semibold rounded-lg hover:bg-surface-variant transition-colors text-sm flex-grow sm:flex-grow-0">
                                Applied
                            </button>
</div>
</div>
</div>
</div>
</div>
</main>
  );
}
