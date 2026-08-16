
export default function OpportunitiesPage() {
  return (
    <main className="flex-1 overflow-y-auto custom-scrollbar p-gutter md:p-container-padding pb-32 md:pb-container-padding">
{/*  Page Header Section  */}
<div className="mb-section-gap max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface mb-2 tracking-tight">Discover Opportunities</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Find opportunities that match your skills, performance, and goals.</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-on-surface hover:bg-[#2c3a4c] transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span>
<span className="font-body-md">Filters</span>
<span className="ml-1 px-1.5 py-0.5 bg-emerald-green/20 text-emerald-green text-xs rounded-full font-bold">3</span>
</button>
<div className="relative group">
<button className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-on-surface hover:bg-[#2c3a4c] transition-colors">
<span className="material-symbols-outlined text-sm">sort</span>
<span className="font-body-md">Sort: Match Score</span>
<span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
</button>
</div>
</div>
</div>
{/*  Active Filters Bar  */}
<div className="flex flex-wrap items-center gap-2 mb-8">
<span className="text-sm text-on-surface-variant mr-2">Active:</span>
<div className="flex items-center gap-1.5 px-3 py-1 bg-[#334155] rounded-full border border-[#45464d]">
<span className="font-label-caps text-label-caps text-on-surface">Soccer</span>
<button className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined text-[14px]">close</span></button>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 bg-[#334155] rounded-full border border-[#45464d]">
<span className="font-label-caps text-label-caps text-on-surface">U19</span>
<button className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined text-[14px]">close</span></button>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 bg-[#334155] rounded-full border border-[#45464d]">
<span className="font-label-caps text-label-caps text-on-surface">Pro Academy</span>
<button className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined text-[14px]">close</span></button>
</div>
<button className="text-sm text-emerald-green hover:underline ml-2">Clear all</button>
</div>
{/*  Opportunities Grid (Bento/Card layout)  */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
{/*  Card 1  */}
<div className="bg-[#1E293B] border border-[#334155] rounded-[24px] p-6 hover:border-emerald-green/50 transition-colors group relative overflow-hidden flex flex-col">
<div className="absolute top-0 right-0 w-32 h-32 bg-emerald-green/5 rounded-bl-full -z-0"></div>
<div className="flex justify-between items-start mb-4 relative z-10">
<div className="flex items-center gap-4">
<div className="w-16 h-16 bg-[#0F172A] rounded-xl border border-[#334155] p-2 flex items-center justify-center shrink-0 shadow-sm">
<img alt="Club Logo" className="w-full h-full object-contain" data-alt="A sleek, modern crest logo for a premier soccer academy, featuring a shield and star motif in metallic silver and dark blue tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn_ZXwAY1pqi3dHgE7G8XGGAxAwb9UDM0qs9JWrNoowfjwfn2Pq4cRRwUeXZJeP4WkQMYkaSOjsYmOvgXmLOCqsVIdC1cZam5oGl8MDRQot_jsXg8YJQGVt86UOVf-QBwvTYTO9Tr0ueD7Mw9fecIQx1M6sxNhLhfjF_Uh9e1wvWejm9V1fiO7Xtb-Iu3njBYMhecw5W7luKRXyJYCx78wceaWV6hPUPrdSz3uVXAS_3lsFxVVVm7gww"/>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface leading-tight mb-1 group-hover:text-primary transition-colors">Elite Forward Trial</h3>
<p className="font-body-md text-on-surface-variant">Metro City F.C. Academy</p>
</div>
</div>
<div className="flex flex-col items-end gap-2">
<div className="px-3 py-1 bg-emerald-green/10 border border-emerald-green/30 rounded-full flex items-center gap-1.5">
<span className="material-symbols-outlined text-emerald-green text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<span className="font-stats-number text-emerald-green text-sm">94% Match</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface p-1">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>bookmark_border</span>
</button>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6 relative z-10">
<span className="px-2 py-1 bg-[#0F172A] border border-[#334155] rounded text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> London, UK
                            </span>
<span className="px-2 py-1 bg-[#0F172A] border border-[#334155] rounded text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">sports_soccer</span> Soccer
                            </span>
<span className="px-2 py-1 bg-[#0F172A] border border-[#334155] rounded text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">event</span> Trial
                            </span>
</div>
<div className="bg-[#0F172A] rounded-xl p-4 border border-[#334155] mb-6 flex-grow relative z-10">
<h4 className="font-label-caps text-label-caps text-on-surface-variant mb-3 uppercase tracking-wider">Requirements Preview</h4>
<div className="flex flex-wrap gap-2">
<div className="px-3 py-1 bg-[#334155] rounded-full font-label-caps text-xs text-on-surface">Sprint Speed &gt; 32km/h</div>
<div className="px-3 py-1 bg-[#334155] rounded-full font-label-caps text-xs text-on-surface">Age 17-19</div>
<div className="px-3 py-1 bg-[#334155] rounded-full font-label-caps text-xs text-on-surface">Min 20 Goals/Season</div>
</div>
</div>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#334155] relative z-10">
<div className="flex items-center gap-2 text-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-error">schedule</span>
<span>Closes in 4 days</span>
</div>
<button className="bg-emerald-green text-[#0F172A] px-6 py-2 rounded-lg font-body-md font-bold hover:bg-emerald-500 transition-colors">
                                Apply Now
                            </button>
</div>
</div>
{/*  Card 2  */}
<div className="bg-[#1E293B] border border-[#334155] rounded-[24px] p-6 hover:border-emerald-green/50 transition-colors group relative overflow-hidden flex flex-col">
<div className="absolute top-0 right-0 w-32 h-32 bg-emerald-green/5 rounded-bl-full -z-0"></div>
<div className="flex justify-between items-start mb-4 relative z-10">
<div className="flex items-center gap-4">
<div className="w-16 h-16 bg-[#0F172A] rounded-xl border border-[#334155] p-2 flex items-center justify-center shrink-0 shadow-sm">
<img alt="Org Logo" className="w-full h-full object-contain" data-alt="A minimalist logo for a sports university program, featuring a stylized eagle and geometric lettering in deep amber and charcoal colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCMkHS1-EX3j6BSc1rJhDsRR146WLBuV14EwseCxAzkgCnTD62zH1hlmZQPuI93TQhLoQfTJdl-FllDwbEN96x5KtjB899S2ku6zSkm81q3vcWnNuyrFsbQ8Ngtb2G1QJCkRh-Gky11H8wskvk35LNCX-yTOpL4QAPc6nTG67f25V2dD9B1Ifd1D4rF8ZNFqPl1fHnMqYTlNv7GhGuRa412TEGTegK3K7qDKsUm7l0jMIcIuX9mm3xPQ"/>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface leading-tight mb-1 group-hover:text-primary transition-colors">Full Scholarship - Midfield</h3>
<p className="font-body-md text-on-surface-variant">Vanguard University</p>
</div>
</div>
<div className="flex flex-col items-end gap-2">
<div className="px-3 py-1 bg-emerald-green/10 border border-emerald-green/30 rounded-full flex items-center gap-1.5">
<span className="material-symbols-outlined text-emerald-green text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<span className="font-stats-number text-emerald-green text-sm">88% Match</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface p-1">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>bookmark_border</span>
</button>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6 relative z-10">
<span className="px-2 py-1 bg-[#0F172A] border border-[#334155] rounded text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Boston, USA
                            </span>
<span className="px-2 py-1 bg-[#0F172A] border border-[#334155] rounded text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">sports_soccer</span> Soccer
                            </span>
<span className="px-2 py-1 bg-[#0F172A] border border-[#334155] rounded text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">school</span> Scholarship
                            </span>
</div>
<div className="bg-[#0F172A] rounded-xl p-4 border border-[#334155] mb-6 flex-grow relative z-10">
<h4 className="font-label-caps text-label-caps text-on-surface-variant mb-3 uppercase tracking-wider">Requirements Preview</h4>
<div className="flex flex-wrap gap-2">
<div className="px-3 py-1 bg-[#334155] rounded-full font-label-caps text-xs text-on-surface">Pass Accuracy &gt; 85%</div>
<div className="px-3 py-1 bg-[#334155] rounded-full font-label-caps text-xs text-on-surface">GPA 3.5+</div>
<div className="px-3 py-1 bg-[#334155] rounded-full font-label-caps text-xs text-on-surface">High Stamina</div>
</div>
</div>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#334155] relative z-10">
<div className="flex items-center gap-2 text-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">schedule</span>
<span>Closes in 14 days</span>
</div>
<button className="bg-emerald-green text-[#0F172A] px-6 py-2 rounded-lg font-body-md font-bold hover:bg-emerald-500 transition-colors">
                                Apply Now
                            </button>
</div>
</div>
</div>
</div>
</main>
  );
}
