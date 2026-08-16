
export default function MessagesPage() {
  return (
    <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen relative">
{/*  TopNavBar  */}
<header className="flex justify-between items-center h-16 px-container-padding sticky top-0 z-50 bg-surface-container dark:bg-surface-container border-b border-outline-variant shrink-0">
{/*  Mobile Menu Toggle  */}
<button className="md:hidden text-on-surface hover:text-primary transition-colors p-2 -ml-2">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="flex items-center gap-4 flex-1">
{/*  Search Bar  */}
<div className="relative max-w-md w-full hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-background border border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all" placeholder="Search athletes, scouts, clubs..." type="text"/>
</div>
</div>
{/*  Actions  */}
<div className="flex items-center gap-2 sm:gap-4">
<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80 rounded-full hover:bg-surface-variant relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container"></span>
</button>
<button className="p-2 text-primary border-b-2 border-primary transition-colors cursor-pointer active:opacity-80 rounded-t-lg hidden sm:block">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:opacity-80 rounded-full hover:bg-surface-variant hidden sm:block">
<span className="material-symbols-outlined">help</span>
</button>
<div className="h-8 w-px bg-outline-variant mx-2 hidden sm:block"></div>
<button className="flex items-center gap-3 pl-2 sm:pl-0 pr-0 cursor-pointer active:opacity-80 group">
<img alt="Athlete Avatar" className="w-9 h-9 rounded-full object-cover border border-outline-variant group-hover:border-primary transition-colors" data-alt="A professional headshot of a young athlete in training gear against a dark studio background with rim lighting, signifying an elite sports profile avatar. High contrast, sharp details." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0f4OVl2W1G7bWm8gOFh-0KvykIb4ULHxBuTBs1bdEcOjGVyCvSMkitTDOveiFDYtrzTbRsD1MHR9q_0EjfI-TCv6eEOvaUPKUYOj7RGkJRmV5sK30rqk0TUaZW99TiqGg5a3JbaS81BQnqGOrPE7676HoI2MI9SIm6womUfENa7dwNsrcxDv46FlsMDAcV4gL0L3qyARwATGzWvuWRGyGhk5nv8-wkLuji6IUfzLe_DTNWKAqwfmPww"/>
<span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors hidden lg:block">Profile</span>
</button>
</div>
</header>
{/*  Messages & Notifications Container  */}
<div className="flex-1 flex overflow-hidden bg-background">
{/*  Left Pane: Conversation List  */}
<div className="w-full sm:w-80 lg:w-96 flex flex-col border-r border-[#334155] bg-[#1E293B] shrink-0 h-full relative z-20">
<div className="p-4 border-b border-[#334155] shrink-0">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-4">Messages</h2>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 pl-9 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all" placeholder="Search conversations..." type="text"/>
</div>
</div>
<div className="flex-1 overflow-y-auto p-2 space-y-1">
{/*  Chat Item 1 (Active)  */}
<button className="w-full text-left p-3 rounded-lg flex gap-3 items-start bg-[#334155] bg-opacity-40 hover:bg-[#334155] hover:bg-opacity-60 transition-colors border border-[#334155]">
<div className="relative shrink-0">
<img className="w-12 h-12 rounded-full object-cover border border-[#10B981]" data-alt="A sharp, intense headshot of a middle-aged football scout wearing a club tracksuit jacket, shot in a slightly dark office setting with green accent lighting. High-end corporate sports aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmT7RoT-dlp1IFWaGVmRyOAaHaqFbvhlgZuL9KON_hL-LGKjip5YHSFRiHoB6rjjargrmon0DEjiDWo1nZlS36GEUub9jMw7leLVZze88JPvElUqiPOeqIuRKMiZdUbtXkVznO3U_dBIFYrcEYSR_tBRiioT89r3aqEcyTQ-aEriK7pnzGQR52HKVbYYCPZmMTCeczIekplM8z2Lz5RvBomA24_Jblle901J6u2kjJdDVmkK3eoyzQyA"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full ring-2 ring-[#1E293B]"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-semibold text-on-surface truncate pr-2">Manchester United Scout</h3>
<span className="text-xs text-[#10B981] shrink-0">10:42 AM</span>
</div>
<p className="text-sm text-on-surface-variant truncate">I've attached the preliminary trial details. Let me know...</p>
</div>
</button>
{/*  Chat Item 2 (Unread)  */}
<button className="w-full text-left p-3 rounded-lg flex gap-3 items-start hover:bg-[#334155] hover:bg-opacity-40 transition-colors border border-transparent">
<div className="relative shrink-0">
<img className="w-12 h-12 rounded-full object-cover border border-outline-variant" data-alt="Professional portrait of a female academy coach in athletic wear, standing on a dimly lit indoor training pitch. Clear, confident expression, corporate sports style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbxCF_-0i608wTIIGcYQIV-Q0egM_LB0TuwqaeZ5wDSio6WxEPGhwHtbvizr4KyEE3ayeAkt9TVZ-BFAEWN4XhraRNQfOmRCpK1piP3HQwX2x1HiYoioakihDQttdDzdy1OLlUW0EBaGXl4rdJV47fLe840tGhWndgDmQHZx3Ktv7n6NedozgXW9gNfdG4TyWfn2Zd-RfwWiMwADO4HlJMq17mb10HxNVWzBHIgdTmidwedk3F9FKT0A"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-error rounded-full ring-2 ring-[#1E293B]"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-semibold text-on-surface truncate pr-2 font-bold">National Academy Coach</h3>
<span className="text-xs text-on-surface-variant font-bold shrink-0">Yesterday</span>
</div>
<p className="text-sm text-on-surface font-semibold truncate">We are impressed with your latest sprint metrics.</p>
</div>
<div className="shrink-0 mt-6 flex justify-end">
<span className="bg-[#10B981] text-[#0F172A] text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">2</span>
</div>
</button>
{/*  Chat Item 3  */}
<button className="w-full text-left p-3 rounded-lg flex gap-3 items-start hover:bg-[#334155] hover:bg-opacity-40 transition-colors border border-transparent">
<div className="relative shrink-0">
<img className="w-12 h-12 rounded-full object-cover border border-outline-variant" data-alt="A rugged male sports agent looking seriously at the camera in a modern stadium concourse, night time lighting, high contrast and technical look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPrplneEvh2Rw_rt1aQ-GRrePq4JEUV_-EhsU197apioajvIH5AWFV1AgUpDAkrbPWxuQP26LNFs9N5ksk_ua8eLfJAABUgTSzGvarC-ROLnNLJ_59qL-ov6EocekPORkBW9R9tz5Tb0Z8fjE3Zei9o6biNEaQR1XiVQjD5752K_vy0gw8IhUo1bvc2yS7X8ppxEWiprOD4o7Pw6FrjBMunafcrS2WhIcXYIF2wUTg8BHSEZ2yqJskjw"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-on-surface-variant rounded-full ring-2 ring-[#1E293B]"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-semibold text-on-surface truncate pr-2">Elite Sports Agency</h3>
<span className="text-xs text-on-surface-variant shrink-0">Tue</span>
</div>
<p className="text-sm text-on-surface-variant truncate">Contract review is complete. Call when free.</p>
</div>
</button>
{/*  Chat Item 4  */}
<button className="w-full text-left p-3 rounded-lg flex gap-3 items-start hover:bg-[#334155] hover:bg-opacity-40 transition-colors border border-transparent">
<div className="relative shrink-0">
<div className="w-12 h-12 rounded-full border border-outline-variant bg-[#334155] flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined">group</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-semibold text-on-surface truncate pr-2">U21 Squad Group</h3>
<span className="text-xs text-on-surface-variant shrink-0">Mon</span>
</div>
<p className="text-sm text-on-surface-variant truncate">Coach: Training pushed back 30 mins tomorrow.</p>
</div>
</button>
</div>
</div>
{/*  Right Pane: Active Chat Window  */}
<div className="flex-1 flex flex-col h-full bg-[#0F172A] relative hidden sm:flex">
{/*  Chat Header  */}
<div className="px-6 py-4 border-b border-[#334155] bg-[#1E293B] shrink-0 flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="relative shrink-0">
<img className="w-10 h-10 rounded-full object-cover border border-[#10B981]" data-alt="A sharp, intense headshot of a middle-aged football scout wearing a club tracksuit jacket, shot in a slightly dark office setting with green accent lighting. High-end corporate sports aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuArY9M0zrVjPo7dXCtb-eApiB1FdWeot1lRN8L-oKqNH1s5xeDXo_fgX_FfYHvz71Ebr5ZDek7b1bbJ0_-_xJdRADgRJiOt_SF8EdQ2Vv5d6RQb-ljKw6qdlF8MIhYx_g4pbWMQUm8zAorUNeQr0cSiQoOYwaPWGSbN3pmXqkozFcSd5pEjEwKJ0sTfVjxxtZF41KIF8pbhg4JRcNu6eNPIUZDgWadxk34M5BealxnO68cFxOEWkWuYwQ"/>
<div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-2 ring-[#1E293B]"></div>
</div>
<div>
<h2 className="font-semibold text-lg text-on-surface leading-tight">Manchester United Scout</h2>
<p className="text-xs text-on-surface-variant flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                                Active now
                            </p>
</div>
</div>
<div className="flex gap-2">
<button className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-[#334155] transition-colors">
<span className="material-symbols-outlined">call</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-[#334155] transition-colors">
<span className="material-symbols-outlined">videocam</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-[#334155] transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
{/*  Messages Area  */}
<div className="flex-1 overflow-y-auto p-6 space-y-6">
{/*  Date Separator  */}
<div className="flex items-center justify-center">
<span className="bg-[#1E293B] text-on-surface-variant text-xs font-label-caps px-3 py-1 rounded-full border border-[#334155]">Today</span>
</div>
{/*  Received Message  */}
<div className="flex gap-3 max-w-[80%]">
<img className="w-8 h-8 rounded-full object-cover border border-[#334155] shrink-0 mt-auto hidden md:block" data-alt="A sharp, intense headshot of a middle-aged football scout wearing a club tracksuit jacket, shot in a slightly dark office setting with green accent lighting. High-end corporate sports aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOJSRxqjvZvstdbTdR3avVXK0IiPO-QI0aZE7MUCGbrGeEamXYXolYwRQtQC1xtFV91zf8xjFhNGXMPDQuGA21yOGdDh3-rn_vzALLmMXQS2WsbfSxhVeqoQn43OwdUFhrWHtkoPopP3wRI4fUQ0GJrfXAuJSV6qIy1pSTGVTN3B5sdwXme0-GvIJYMvqCRtzdT18SB9ehWUZqvB5w0gPA06qQRw-bwhD9M6jedB40ddrpNXK9oeTDVA"/>
<div className="space-y-1">
<div className="bg-[#1E293B] text-on-surface p-3 rounded-2xl rounded-bl-sm border border-[#334155] shadow-sm">
<p className="text-sm">Hi there. We've been reviewing your recent match footage against Academy FC. Your sprint metrics and spatial awareness on the right flank were notable.</p>
</div>
<span className="text-[10px] text-on-surface-variant px-1">10:15 AM</span>
</div>
</div>
{/*  Sent Message  */}
<div className="flex gap-3 max-w-[80%] ml-auto justify-end">
<div className="space-y-1 text-right">
<div className="bg-[#10B981] bg-opacity-20 text-[#10B981] p-3 rounded-2xl rounded-br-sm border border-[#10B981] shadow-sm text-left">
<p className="text-sm">Thank you. I've been focusing heavily on my acceleration and positioning during the off-season. Glad the data reflects that.</p>
</div>
<span className="text-[10px] text-on-surface-variant px-1 flex items-center justify-end gap-1">
                                10:28 AM <span className="material-symbols-outlined text-[14px] text-[#10B981]">done_all</span>
</span>
</div>
</div>
{/*  Received Message with Attachment Card  */}
<div className="flex gap-3 max-w-[85%]">
<img className="w-8 h-8 rounded-full object-cover border border-[#334155] shrink-0 mt-auto hidden md:block" data-alt="A sharp, intense headshot of a middle-aged football scout wearing a club tracksuit jacket, shot in a slightly dark office setting with green accent lighting. High-end corporate sports aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnR5HGBWGXDVMspPP-_bcFPQBltQMFCeZCjfWW35R_Ji4zNdyYuR1qS03YzmkoUKX7eakF3Hfwycn_wvL53c0mdWEtYZFMeMMETj7uAUt8Tgl4pOJygq4NZPpe5oSIBkofJv20-ZLeJ_gUxikbLVChQD4YsFWUNLy5TgIZeN-kpYEy2O6c8LW_pLfiCLkScmTjCt79RCX6j2mkYNEYz6Ri3zKq3y8M70XL_VjmyBQMwIE0voj4VUzOcg"/>
<div className="space-y-2 w-full">
<div className="bg-[#1E293B] text-on-surface p-3 rounded-2xl rounded-bl-sm border border-[#334155] shadow-sm inline-block">
<p className="text-sm">Excellent. I'd like to formally invite you to an assessment session next month. I've attached the preliminary trial details. Let me know if you have any questions.</p>
</div>
{/*  Attachment Card  */}
<div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 w-full max-w-sm flex flex-col gap-3">
<div className="flex items-start gap-3">
<div className="bg-[#0F172A] p-2 rounded-lg border border-[#334155] text-primary">
<span className="material-symbols-outlined">assignment</span>
</div>
<div className="flex-1">
<h4 className="font-semibold text-sm text-on-surface">Elite Forward Trial Assessment</h4>
<p className="text-xs text-on-surface-variant mt-0.5">PDF Document • 2.4 MB</p>
</div>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">download</span>
</button>
</div>
<div className="h-px bg-[#334155] w-full"></div>
<button className="w-full py-2 bg-[#10B981] text-[#0F172A] font-semibold text-sm rounded-lg hover:bg-opacity-90 transition-colors">
                                    View Details
                                </button>
</div>
<span className="text-[10px] text-on-surface-variant px-1 block">10:42 AM</span>
</div>
</div>
</div>
{/*  Input Area  */}
<div className="p-4 bg-[#1E293B] border-t border-[#334155] shrink-0">
<div className="flex items-end gap-3 bg-[#0F172A] border border-[#334155] rounded-2xl p-2 focus-within:border-[#10B981] transition-colors">
<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-full shrink-0">
<span className="material-symbols-outlined">add_circle</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-full shrink-0">
<span className="material-symbols-outlined">image</span>
</button>
<textarea className="w-full bg-transparent border-none text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-0 resize-none py-3 px-2 max-h-32 min-h-[44px]" placeholder="Type a message..." rows="1" style={{ lineHeight: '1.4' }}></textarea>
<button className="p-2 bg-[#10B981] text-[#0F172A] hover:bg-opacity-90 transition-colors rounded-full shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-sm">send</span>
</button>
</div>
</div>
</div>
{/*  Notifications Right Sidebar (Overlay on smaller screens, embedded on large)  */}
<div className="w-80 border-l border-[#334155] bg-[#1E293B] flex-col h-full hidden xl:flex shrink-0">
<div className="p-4 border-b border-[#334155] flex justify-between items-center shrink-0">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Notifications</h2>
<button className="text-xs text-primary hover:underline font-label-caps uppercase">Mark all read</button>
</div>
<div className="flex-1 overflow-y-auto p-4 space-y-4">
{/*  Notification 1  */}
<div className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 relative overflow-hidden group hover:border-primary transition-colors cursor-pointer">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
</div>
<div>
<h4 className="text-sm font-semibold text-on-surface leading-tight">94% Match for Elite Forward Trial</h4>
<p className="text-xs text-on-surface-variant mt-1">Based on your recent sprint and stamina metrics, you highly match the criteria for upcoming trials.</p>
<span className="text-[10px] text-on-surface-variant mt-2 block">2 hours ago</span>
</div>
</div>
</div>
{/*  Notification 2  */}
<div className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 relative overflow-hidden group hover:border-[#10B981] transition-colors cursor-pointer">
<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-[#10B981] bg-opacity-20 text-[#10B981] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
</div>
<div>
<h4 className="text-sm font-semibold text-on-surface leading-tight">Achievement Verified</h4>
<p className="text-xs text-on-surface-variant mt-1">Your 'Golden Boot 2023' stat has been officially verified by league administration.</p>
<span className="text-[10px] text-on-surface-variant mt-2 block">5 hours ago</span>
</div>
</div>
</div>
{/*  Notification 3  */}
<div className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 relative overflow-hidden group hover:border-outline-variant transition-colors cursor-pointer">
<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-sm">visibility</span>
</div>
<div>
<h4 className="text-sm font-semibold text-on-surface leading-tight">Profile View</h4>
<p className="text-xs text-on-surface-variant mt-1">A scout from <span className="font-semibold text-on-surface">Bayern Munich</span> viewed your tactical analysis profile.</p>
<span className="text-[10px] text-on-surface-variant mt-2 block">Yesterday</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
  );
}
