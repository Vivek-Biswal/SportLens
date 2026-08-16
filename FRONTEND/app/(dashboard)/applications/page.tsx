
export default function ApplicationsPage() {
  return (
    <main className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
{/*  TopNavBar Component  */}
<header className="sticky top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface-container border-b border-outline-variant shadow-sm backdrop-blur-md bg-opacity-90">
<div className="flex items-center flex-1">
{/*  Mobile Menu Button  */}
<button className="md:hidden mr-4 text-on-surface-variant hover:text-primary transition-all scale-95 active:scale-100">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="relative w-64 hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-1.5 pl-9 pr-3 text-sm text-on-surface focus:outline-none focus:border-[#10B981] transition-colors placeholder-on-surface-variant" placeholder="Search applications..." type="text"/>
</div>
</div>
<div className="flex items-center space-x-4">
<button className="text-on-surface-variant hover:text-primary transition-all scale-95 active:scale-100">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-all scale-95 active:scale-100">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<button className="hidden sm:block px-4 py-1.5 bg-[#10B981] text-black font-bold rounded-lg text-sm hover:bg-opacity-90 transition-opacity scale-95 active:scale-100">
                    New Scout
                </button>
<div className="w-8 h-8 rounded-full bg-surface-variant border border-outline overflow-hidden">
<img alt="User avatar" className="w-full h-full object-cover" data-alt="A professional headshot of a young athletic talent manager or scout against a neutral dark grey background. High contrast, studio lighting, modern corporate sports aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPh4eF7GNL5qd1IgbEmFEQ-7lvX_LA3iKEz5LamMiIKzcAfNzFO1EEtdfwiE3PAmN0MXkTY6hl7QfEOIfBu7f214XwK6RCeDmQ4Q-0-GPad-bT_IQH1Q_8df2GezEe4jJ1l4Z22p432nqKJJRcKKZzwrV5fZOPUc746EqBA7LKQnCYOEZhr0tJtA7jrtuALUDVXeA7ecn5roiPGi-hd5OS0gtTJa7V-mCisIDwhsJFMA8Oug05t9PNWg"/>
</div>
</div>
</header>
{/*  Page Canvas  */}
<div className="p-4 md:p-container-padding max-w-[1440px] mx-auto w-full space-y-section-gap">
{/*  Header & Overview Stats  */}
<section className="space-y-6">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">My Applications</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage your active opportunities and track scouting progress.</p>
</div>
{/*  Bento Grid for Stats  */}
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-center items-center">
<span className="font-stats-number text-stats-number text-on-surface-variant">3</span>
<span className="font-label-caps text-label-caps text-on-surface-variant mt-1 text-center">Draft</span>
</div>
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-center items-center">
<span className="font-stats-number text-stats-number text-primary">12</span>
<span className="font-label-caps text-label-caps text-primary mt-1 text-center">Submitted</span>
</div>
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-center items-center">
<span className="font-stats-number text-stats-number text-[#10B981]">5</span>
<span className="font-label-caps text-label-caps text-[#10B981] mt-1 text-center">Under Review</span>
</div>
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-center items-center relative overflow-hidden group cursor-pointer hover:border-tertiary transition-colors">
<div className="absolute inset-0 bg-tertiary opacity-5 group-hover:opacity-10 transition-opacity"></div>
<span className="font-stats-number text-stats-number text-tertiary relative z-10">2</span>
<span className="font-label-caps text-label-caps text-tertiary mt-1 text-center relative z-10">Shortlisted</span>
</div>
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-center items-center">
<span className="font-stats-number text-stats-number text-[#f59e0b]">1</span>
<span className="font-label-caps text-label-caps text-[#f59e0b] mt-1 text-center">Trial</span>
</div>
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-center items-center">
<span className="font-stats-number text-stats-number text-on-surface-variant">4</span>
<span className="font-label-caps text-label-caps text-on-surface-variant mt-1 text-center">Accepted</span>
</div>
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-center items-center opacity-50">
<span className="font-stats-number text-stats-number text-on-surface-variant">8</span>
<span className="font-label-caps text-label-caps text-on-surface-variant mt-1 text-center">Archived</span>
</div>
</div>
</section>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/*  Active Applications List  */}
<div className="lg:col-span-2 space-y-6">
<h3 className="font-headline-md text-headline-md text-on-surface flex items-center border-b border-[#334155] pb-2">
<span className="material-symbols-outlined mr-2">list_alt</span> Active Applications
                    </h3>
<div className="space-y-4">
{/*  App Card 1  */}
<div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 hover:border-[#10B981] transition-colors duration-300 relative group">
<div className="flex justify-between items-start mb-4">
<div>
<h4 className="font-headline-md text-[20px] leading-[28px] font-semibold text-on-surface">Senior Defensive Analyst</h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 flex items-center">
<span className="material-symbols-outlined text-sm mr-1">corporate_fare</span> Manchester United FC
                                    </p>
</div>
<span className="status-badge px-2.5 py-1 rounded-full font-label-caps text-label-caps flex items-center border-[#10B981] text-[#10B981] bg-[#051424]">
<span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1.5"></span> Under Review
                                </span>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="font-label-caps text-[10px] tracking-wider px-2 py-1 bg-[#334155] rounded text-on-surface-variant">FULL-TIME</span>
<span className="font-label-caps text-[10px] tracking-wider px-2 py-1 bg-[#334155] rounded text-on-surface-variant">DATA SCIENCE</span>
<span className="font-label-caps text-[10px] tracking-wider px-2 py-1 bg-[#334155] rounded text-on-surface-variant">MANCHESTER, UK</span>
</div>
<div className="flex justify-between items-center pt-4 border-t border-[#334155]">
<span className="font-body-md text-sm text-on-surface-variant">Applied: Oct 12, 2023</span>
<button className="px-4 py-2 bg-transparent border border-outline-variant text-on-surface rounded-lg hover:border-on-surface transition-colors flex items-center text-sm font-semibold">
                                    View Details <span className="material-symbols-outlined ml-1 text-sm">chevron_right</span>
</button>
</div>
</div>
{/*  App Card 2  */}
<div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 hover:border-[#334155] transition-colors duration-300">
<div className="flex justify-between items-start mb-4">
<div>
<h4 className="font-headline-md text-[20px] leading-[28px] font-semibold text-on-surface">Academy Scouting Coordinator</h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 flex items-center">
<span className="material-symbols-outlined text-sm mr-1">corporate_fare</span> Bayern Munich
                                    </p>
</div>
<span className="status-badge px-2.5 py-1 rounded-full font-label-caps text-label-caps flex items-center border-tertiary text-tertiary bg-[#051424]">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5"></span> Shortlisted
                                </span>
</div>
<div className="flex justify-between items-center pt-4 border-t border-[#334155]">
<span className="font-body-md text-sm text-on-surface-variant">Applied: Sep 28, 2023</span>
<button className="px-4 py-2 bg-transparent border border-outline-variant text-on-surface rounded-lg hover:border-on-surface transition-colors flex items-center text-sm font-semibold">
                                    View Details <span className="material-symbols-outlined ml-1 text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
{/*  Sidebar / Featured Activity  */}
<div className="space-y-8">
{/*  Application Timeline Focus  */}
<div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
<h3 className="font-headline-md text-lg text-on-surface mb-6 flex items-center">
<span className="material-symbols-outlined mr-2 text-[#10B981]">track_changes</span> Lifecycle Focus
                        </h3>
<div className="mb-4">
<p className="font-body-md text-sm text-on-surface-variant">Tracking:</p>
<p className="font-headline-md text-base text-on-surface truncate">Sr Defensive Analyst</p>
</div>
<div className="relative pl-4 mt-6 space-y-6">
{/*  Timeline Line  */}
<div className="absolute left-[11px] top-2 bottom-2 timeline-line"></div>
{/*  Step 1  */}
<div className="relative flex items-start">
<div className="absolute left-[-11px] top-1 timeline-dot active"></div>
<div className="ml-6">
<p className="font-label-caps text-label-caps text-[#10B981]">CURRENT STATUS</p>
<p className="font-body-md text-base text-on-surface font-medium">Under Review</p>
<p className="font-body-md text-sm text-on-surface-variant">Committee evaluation in progress.</p>
<span className="text-xs text-on-surface-variant mt-1 block">Oct 15, 2023</span>
</div>
</div>
{/*  Step 2  */}
<div className="relative flex items-start opacity-70">
<div className="absolute left-[-11px] top-1 timeline-dot bg-surface-variant"></div>
<div className="ml-6">
<p className="font-body-md text-base text-on-surface">Application Submitted</p>
<span className="text-xs text-on-surface-variant mt-1 block">Oct 12, 2023</span>
</div>
</div>
{/*  Step 3  */}
<div className="relative flex items-start opacity-50">
<div className="absolute left-[-11px] top-1 timeline-dot bg-surface-variant"></div>
<div className="ml-6">
<p className="font-body-md text-base text-on-surface">Draft Created</p>
<span className="text-xs text-on-surface-variant mt-1 block">Oct 10, 2023</span>
</div>
</div>
</div>
</div>
{/*  Saved Opportunities Minimal  */}
<div>
<h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center">
<span className="material-symbols-outlined text-sm mr-2">bookmark</span> Saved Opportunities
                        </h3>
<div className="space-y-3">
<a className="block p-3 border-b border-[#334155] hover:bg-surface-container-high transition-colors group" href="#!">
<p className="font-body-md text-sm text-on-surface group-hover:text-primary transition-colors">Head of Analytics</p>
<p className="font-label-caps text-[10px] text-on-surface-variant mt-1">Borussia Dortmund</p>
</a>
<a className="block p-3 border-b border-[#334155] hover:bg-surface-container-high transition-colors group" href="#!">
<p className="font-body-md text-sm text-on-surface group-hover:text-primary transition-colors">First Team Scout</p>
<p className="font-label-caps text-[10px] text-on-surface-variant mt-1">AC Milan</p>
</a>
</div>
</div>
</div>
</div>
</div>
</main>
  );
}
