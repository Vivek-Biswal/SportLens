
import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="hidden md:flex flex-col h-screen py-gutter px-4 w-64 fixed left-0 top-0 bg-surface-container border-r border-outline-variant z-40">
<div className="flex items-center gap-3 px-4 py-6 mb-4">
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex items-center justify-center">
<img alt="Athlete Profile Picture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmv_H_kE1hKicARlms6nQH0CN19-g12gxJ-r5IM0XSezD_LfVZ4YhB3YyRn7FVecdQgVSSyjiPJTU_F9KOgAoVu0x0WUDbJbeva0xO5OAe2y2Ox9CVKIdpp_-LeWcvWUSMiKaFcPeEgziGh0UG3IDctUlLIkJlSGVqxYHbWvgSuu2HYK-mHbj0b0SnlU-irurFTsCtM9vrMiEq0ajrfAmBs8mNmf55_-pCVzVTrMtCPzJFWMjC_0RUXA"/>
</div>
<div>
<h1 className="font-headline-md text-headline-md font-bold text-on-surface">SportLens</h1>
<p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Pro Analytics</p>
</div>
</div>
<ul className="flex flex-col gap-2 flex-grow overflow-y-auto custom-scrollbar">
<li>
<Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg cursor-pointer active:scale-95 transition-transform duration-200" href="/dashboard">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
<span>Dashboard</span>
</Link>
</li>
<li>
<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors duration-200 cursor-pointer active:scale-95" href="/profile">
<span className="material-symbols-outlined">person</span>
<span>My Profile</span>
</Link>
</li>
<li>
<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors duration-200 cursor-pointer active:scale-95" href="/performance">
<span className="material-symbols-outlined">insights</span>
<span>Performance</span>
</Link>
</li>

<li>
<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors duration-200 cursor-pointer active:scale-95" href="/settings">
<span className="material-symbols-outlined">settings</span>
<span>Settings</span>
</Link>
</li>
</ul>
<div className="mt-auto pt-6 border-t border-outline-variant flex flex-col gap-4">
<button className="w-full py-3 bg-emerald text-primary-container font-bold rounded-lg hover:bg-opacity-90 transition-opacity">
                Upgrade to Pro
            </button>
<ul className="flex flex-col gap-2">
<li>
<Link className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors duration-200 cursor-pointer active:scale-95" href="#help">
<span className="material-symbols-outlined">help</span>
<span>Help</span>
</Link>
</li>
<li>
<Link className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors duration-200 cursor-pointer active:scale-95" href="/login">
<span className="material-symbols-outlined">logout</span>
<span>Logout</span>
</Link>
</li>
</ul>
</div>
</nav>
  );
}
