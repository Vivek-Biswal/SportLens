
export default function ProfilePage() {
  return (
    <main className="flex-1 flex flex-col md:ml-64 min-w-0">
{/*  TopNavBar  */}
<header className="flex justify-between items-center h-16 px-gutter sticky top-0 z-30 bg-surface-container border-b border-outline-variant w-full">
<div className="flex items-center gap-4 flex-1">
{/*  Mobile menu button placeholder  */}
<button className="md:hidden text-on-surface p-2">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="relative w-full max-w-md hidden md:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-2 rounded-lg input-surface text-on-surface placeholder-on-surface-variant focus:ring-1 focus:ring-emerald-green" placeholder="Search athletes, stats..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">forum</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80 hidden sm:block">
<span className="material-symbols-outlined">help</span>
</button>
<div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant ml-2 cursor-pointer">
<img alt="Athlete Avatar" className="w-full h-full object-cover" data-alt="A cinematic, high-contrast portrait of a young male soccer player looking determined, dramatically lit with rim lighting against a dark technical background, professional sports photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuHtST_KW0tY3KzqQWEPmQOSBl8INQj64v3rHz7ShYnoz6s6UYMUEegtUa_IbGxuNxLhQxiZwfrbBS5bThfvX-Hlr6IAzbtFYlfBbln2tVTImX8hqmzUFRhE_XKd2zoJZcFs4o0z_fbIDaG7B4FJLdloxXh24XKXGhimzv4KN_Mp_vyySXQAlf0et4O3wdzsWozt16wVBhhmORs5L164qcfTBFyyaCTA5cIVr3PcerGHs0WMUJo3QtRg"/>
</div>
</div>
</header>
{/*  Page Content  */}
<div className="p-gutter md:p-container-padding space-y-8 max-w-[1440px] mx-auto w-full">
{/*  Profile Header Bento  */}
<section className="card-surface flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
{/*  Background ambient effect  */}
<div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
<div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-outline-variant relative">
<img alt="Marcus Chen Profile" className="w-full h-full object-cover" data-alt="Close up action shot portrait of a male professional soccer player in a dark athletic uniform, dynamic lighting, serious expression, high-end commercial sports photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyw4C02WMdaQq_J7ClWAqtXS5AbqNS1ewuFTJLZdJbXvOnsHCBXVDwRqSXxCr-GiNipF0kA74G642zAyTWMx1L_7B7q8apk25A_TdeND1_Pr9DnvROwyqPPCxfHSg4O4DFE5J3V2ZdAlTKBZkEm8ZaK4d5GeSLSLjbQXw84lYdFF8dswQrOYjWhCgRuPHq8FndHlNrokPw28pj83dxHULsMIsAhfs-7XBj7A7vWSPDbwk1IneOsH4ePA"/>
<div className="absolute bottom-2 right-2 bg-emerald-green text-black rounded-full p-1 flex items-center justify-center" title="Verified Athlete">
<span className="material-symbols-outlined text-sm font-bold">check</span>
</div>
</div>
<div className="flex-1 space-y-4 z-10 w-full">
<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
<div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Marcus Chen</h2>
<p className="text-primary font-label-caps tracking-widest mt-1">FOOTBALL (SOCCER) • STRIKER</p>
<div className="flex items-center gap-2 text-on-surface-variant mt-2">
<span className="material-symbols-outlined text-sm">location_on</span>
<span>London, UK</span>
</div>
</div>
<div className="flex gap-3">
<button className="btn-secondary text-sm px-4 py-2">Edit Profile</button>
<button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">share</span> Share
                            </button>
</div>
</div>
<div className="pt-4 border-t border-outline-variant">
<div className="flex justify-between items-end mb-2">
<span className="text-sm font-label-caps text-on-surface-variant">PROFILE STRENGTH</span>
<span className="font-stats-number text-stats-number text-emerald-green">92%</span>
</div>
<div className="w-full h-2 bg-surface rounded-full overflow-hidden">
<div className="h-full bg-[#10B981] w-[92%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
</div>
</div>
</div>
</section>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/*  Left Column (Wider)  */}
<div className="lg:col-span-2 space-y-8">
{/*  About Section  */}
<section className="card-surface space-y-4">
<h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">About &amp; Intent</h3>
<p className="text-on-surface-variant leading-relaxed">
                            Dynamic and highly tactical Striker with 12 years of competitive playing experience. Known for exceptional spatial awareness, rapid acceleration in the final third, and clinical finishing. Currently developing advanced pressing structures at London Elite Academy. Seeking professional trial opportunities to transition into first-team senior football.
                        </p>
<div className="flex flex-wrap gap-2 pt-2">
<span className="chip">London Elite Academy</span>
<span className="chip">12 Yrs Exp</span>
<span className="chip">Pro-Contract Seeking</span>
</div>
</section>
{/*  Physical Attributes Grid  */}
<section className="space-y-4">
<h3 className="font-headline-md text-headline-md text-on-surface">Physical Metrics</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="card-surface p-4 flex flex-col justify-between h-28">
<span className="text-xs font-label-caps text-on-surface-variant">HEIGHT</span>
<span className="font-stats-number text-display-lg text-on-surface">185<span className="text-sm text-on-surface-variant ml-1">cm</span></span>
</div>
<div className="card-surface p-4 flex flex-col justify-between h-28">
<span className="text-xs font-label-caps text-on-surface-variant">WEIGHT</span>
<span className="font-stats-number text-display-lg text-on-surface">82<span className="text-sm text-on-surface-variant ml-1">kg</span></span>
</div>
<div className="card-surface p-4 flex flex-col justify-between h-28">
<span className="text-xs font-label-caps text-on-surface-variant">TOP SPEED</span>
<span className="font-stats-number text-display-lg text-primary">34.2<span className="text-sm text-on-surface-variant ml-1">km/h</span></span>
</div>
<div className="card-surface p-4 flex flex-col justify-between h-28">
<span className="text-xs font-label-caps text-on-surface-variant">VERT JUMP</span>
<span className="font-stats-number text-display-lg text-on-surface">68<span className="text-sm text-on-surface-variant ml-1">cm</span></span>
</div>
{/*  Index Bars  */}
<div className="card-surface p-4 col-span-2 md:col-span-4 flex flex-col md:flex-row gap-6">
<div className="flex-1 space-y-2">
<div className="flex justify-between text-sm"><span className="font-label-caps">ENDURANCE</span> <span className="font-stats-number">92/100</span></div>
<div className="h-1.5 bg-surface rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div></div>
</div>
<div className="flex-1 space-y-2">
<div className="flex justify-between text-sm"><span className="font-label-caps">STRENGTH</span> <span className="font-stats-number">88/100</span></div>
<div className="h-1.5 bg-surface rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div></div>
</div>
<div className="flex-1 space-y-2">
<div className="flex justify-between text-sm"><span className="font-label-caps text-on-surface-variant">FLEXIBILITY</span> <span className="font-stats-number text-on-surface-variant">75/100</span></div>
<div className="h-1.5 bg-surface rounded-full"><div className="h-full bg-outline-variant rounded-full" style={{ width: '75%' }}></div></div>
</div>
</div>
</div>
</section>
{/*  Media Portfolio  */}
<section className="card-surface space-y-4">
<div className="flex justify-between items-center border-b border-outline-variant pb-2">
<h3 className="font-headline-md text-headline-md text-on-surface">Media Vault</h3>
<button className="text-primary hover:text-emerald-green text-sm flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-sm">add</span> Upload
                            </button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
{/*  Video Thumbnail 1  */}
<div className="relative rounded-lg overflow-hidden border border-outline-variant group cursor-pointer aspect-video bg-surface">
<img alt="Highlight Reel" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" data-alt="Action shot of a soccer player scoring a goal during a night match, stadium lights glaring, high contrast, dramatic sports action photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb0O0TR-icsNVdREIpa5dT8pDlNyQ-FPZ3-Lt2zV2PY0MayYb4VexqXh-OdEZOjvW0z7_Ve0h_b-rpZeuyD8LEhVPjXb9c_2M-qLHD9m8-u8idqkqgyv0SxJ4TyaEGBL1z950-R2Ax4VylViGQg3FYXGEcg9f1qbaErKQibgSGaqCXqI2JriURbfGJmK56cjZzCKHWgWWuKxziZ7WBmTFsY7-YvfUuJxj3FnkByALr9f5Mvr3zH2br0Q"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
<span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
<p className="text-sm font-semibold">2023 Season Highlights</p>
<p className="text-xs text-on-surface-variant">3m 42s</p>
</div>
</div>
{/*  Video Thumbnail 2  */}
<div className="relative rounded-lg overflow-hidden border border-outline-variant group cursor-pointer aspect-video bg-surface">
<img alt="Training Drills" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" data-alt="A soccer player running through agility cones during a training session, outdoor pitch, sunny day, professional sports training context, shallow depth of field." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNURcraCcVKhD3E6HOspaTZdnORMiRnkmFjo0lN2S3hB5-SK0dFw_D_-NMNJSje0BBaF0fT6kqcYvyiZI8o1jbk44sUIU0Plv-cA47XxCPwodPhUuMnWhvwLvfiuxIcCbeDZqMf4nQTZBEKblvnZ48laPXkzxwFKtptsu5RbXWCBbyC7OG5tCfssMWOP5jArVRLOcN_earbL7D91NqS5Cmo3-UmkMPkt90YyCFFBE7KZTU5Vcoz9rYeA"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
<span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
<p className="text-sm font-semibold">Agility &amp; Finishing Drills</p>
<p className="text-xs text-on-surface-variant">1m 15s</p>
</div>
</div>
</div>
</section>
</div>
{/*  Right Column (Narrower)  */}
<div className="space-y-8">
{/*  Performance Highlights  */}
<section className="card-surface bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155] space-y-6">
<h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-emerald-green">bolt</span> High Impact
                        </h3>
<div className="space-y-4">
<div className="flex justify-between items-center border-b border-outline-variant pb-3">
<div>
<p className="text-xs font-label-caps text-on-surface-variant">SPORTLENS SCORE</p>
<p className="font-stats-number text-[28px] text-emerald-green leading-none mt-1">87<span className="text-sm text-on-surface-variant">/100</span></p>
</div>
<div className="w-10 h-10 rounded-full border border-emerald-green flex items-center justify-center text-emerald-green">
<span className="material-symbols-outlined">trending_up</span>
</div>
</div>
<div className="flex justify-between items-center border-b border-outline-variant pb-3">
<div>
<p className="text-xs font-label-caps text-on-surface-variant">GLOBAL RANKING</p>
<p className="font-stats-number text-[20px] text-on-surface mt-1">Top 5%</p>
</div>
<span className="chip bg-surface-variant text-on-surface">U18 Striker</span>
</div>
<div className="flex justify-between items-center">
<div>
<p className="text-xs font-label-caps text-on-surface-variant">PERSONAL BEST</p>
<p className="font-stats-number text-[20px] text-on-surface mt-1">10.4s</p>
</div>
<span className="text-xs text-on-surface-variant text-right">100m Dash<br/>Equivalent</span>
</div>
</div>
</section>
{/*  Achievements  */}
<section className="space-y-3">
<h3 className="font-headline-md text-headline-md text-on-surface mb-4">Trophies</h3>
<div className="card-surface p-4 flex items-center gap-4 hover:bg-surface-variant transition-colors cursor-pointer border-l-4 border-l-[#F59E0B]">
<div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] shrink-0">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<div className="flex-1">
<p className="font-semibold text-sm">Golden Boot 2023</p>
<p className="text-xs text-on-surface-variant">U18 Premier League North</p>
</div>
<span className="material-symbols-outlined text-emerald-green text-sm" title="Verified">verified</span>
</div>
<div className="card-surface p-4 flex items-center gap-4 hover:bg-surface-variant transition-colors cursor-pointer border-l-4 border-l-primary">
<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
</div>
<div className="flex-1">
<p className="font-semibold text-sm">League MVP</p>
<p className="text-xs text-on-surface-variant">London Youth Cup '22</p>
</div>
<span className="material-symbols-outlined text-emerald-green text-sm" title="Verified">verified</span>
</div>
<div className="card-surface p-4 flex items-center gap-4 hover:bg-surface-variant transition-colors cursor-pointer border-l-4 border-l-surface-variant">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant shrink-0">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
</div>
<div className="flex-1">
<p className="font-semibold text-sm">National Trialist</p>
<p className="text-xs text-on-surface-variant">FA U17 Camp</p>
</div>
</div>
</section>
{/*  Career Timeline  */}
<section className="card-surface">
<h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-4 mb-4">Career Flow</h3>
<div className="relative border-l border-outline-variant ml-3 space-y-6">
<div className="relative pl-6">
<div className="absolute w-3 h-3 bg-emerald-green rounded-full -left-[6.5px] top-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
<p className="text-xs text-on-surface-variant font-label-caps">2022 - PRESENT</p>
<p className="font-semibold text-sm mt-1">London Elite Academy U21</p>
<p className="text-xs text-on-surface-variant mt-1">Senior integration phase. 14 goals in 20 appearances.</p>
</div>
<div className="relative pl-6">
<div className="absolute w-3 h-3 bg-surface border-2 border-outline-variant rounded-full -left-[6.5px] top-1.5"></div>
<p className="text-xs text-on-surface-variant font-label-caps">2020 - 2022</p>
<p className="font-semibold text-sm mt-1">Westside Rovers U18</p>
<p className="text-xs text-on-surface-variant mt-1">Youth league champions. Golden boot winner.</p>
</div>
<div className="relative pl-6">
<div className="absolute w-3 h-3 bg-surface border-2 border-outline-variant rounded-full -left-[6.5px] top-1.5"></div>
<p className="text-xs text-on-surface-variant font-label-caps">2015 - 2020</p>
<p className="font-semibold text-sm mt-1">City Youth Development</p>
<p className="text-xs text-on-surface-variant mt-1">Foundational training program.</p>
</div>
</div>
</section>
{/*  Visibility Settings Widget  */}
<section className="card-surface border-dashed border-[#334155] bg-transparent">
<div className="flex items-center gap-2 mb-4 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">visibility</span>
<span className="text-sm font-label-caps tracking-wider">PROFILE VISIBILITY</span>
</div>
<div className="space-y-3">
<label className="flex items-center gap-3 cursor-pointer group">
<input defaultChecked className="form-radio text-emerald-green bg-surface border-outline-variant focus:ring-emerald-green focus:ring-offset-surface w-4 h-4" name="visibility" type="radio"/>
<span className="text-sm group-hover:text-on-surface transition-colors">Public <span className="text-xs text-on-surface-variant ml-1">(Searchable)</span></span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="form-radio text-emerald-green bg-surface border-outline-variant focus:ring-emerald-green focus:ring-offset-surface w-4 h-4" name="visibility" type="radio"/>
<span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Scouts &amp; Coaches Only</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group opacity-50">
<input className="form-radio text-emerald-green bg-surface border-outline-variant focus:ring-emerald-green focus:ring-offset-surface w-4 h-4" disabled="" name="visibility" type="radio"/>
<span className="text-sm text-on-surface-variant">Private</span>
</label>
</div>
</section>
</div>
</div>
</div>
</main>
  );
}
