
export default function TopNav() {
  return (
    <header className="flex justify-between items-center h-16 px-gutter sticky top-0 z-30 md:ml-64 bg-surface-container border-b border-outline-variant">
<div className="flex items-center gap-4">
{/*  Mobile Menu Toggle (Visible only on mobile)  */}
<button className="md:hidden text-on-surface-variant hover:text-on-surface transition-colors duration-200 cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="hidden md:flex items-center gap-2 bg-layer-base border layer-border rounded-lg px-3 py-2 w-64 focus-within:border-emerald transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">search</span>
<input className="bg-transparent border-none outline-none text-on-surface w-full placeholder-on-surface-variant font-body-md text-body-md h-full py-0" placeholder="Search..." type="text"/>
</div>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-4">
<button className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80 relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-emerald rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">forum</span>
</button>
<button className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80 hidden sm:block">
<span className="material-symbols-outlined">help</span>
</button>
</div>
<div className="flex items-center gap-3 border-l border-outline-variant pl-6 cursor-pointer hover:opacity-80 transition-opacity">
<span className="font-body-md text-body-md font-semibold text-primary hidden sm:block">Profile</span>
<div className="w-8 h-8 rounded-full overflow-hidden bg-surface-variant border layer-border">
<img alt="Athlete Avatar" className="w-full h-full object-cover" data-alt="A close up portrait of an elite professional athlete in dramatic, high-contrast studio lighting, capturing intense focus. The background is a deep dark navy #0F172A, maintaining the modern corporate, data-driven aesthetic of a high-end scouting war room." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHDRKlPKqDELMIcxjD4Gg_sSerIIvWz_YHFnwEd3VnivGMHkZmjMvngmNrk5s82MguysIsz9xSeP1KKAtjwWsh5W_4f9uSKTLtOwxCg1nPJoWAVr5NYEPfVCziB78SJAfU4o5LxajLmgaa9ykpEbpC_KA2yCndbpT1wG_lzuhStinMpAuqMHMgbyHfZ2d0PIks0wqVf-5wCcN0PmUsOcKk0uNpuWKOEoFQzPReYpaOVN-85ucwkt1ayw"/>
</div>
</div>
</div>
</header>
  );
}
