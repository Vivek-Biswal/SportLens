
export default function SettingsPage() {
  return (
    <main className="flex-1 p-4 md:p-container-padding max-w-[1440px] mx-auto w-full">
<div className="mb-8">
<h2 className="font-display-lg text-display-lg md:font-display-lg font-bold text-on-surface">Settings</h2>
<p className="text-on-surface-variant mt-2 font-body-md text-body-md">Manage your account preferences and professional profile.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/*  Left Column  */}
<div className="lg:col-span-2 flex flex-col gap-6">
{/*  Account Settings Card  */}
<div className="card">
<h3 className="font-headline-md text-headline-md mb-6 border-b border-outline-variant pb-4">Account Information</h3>
<form className="space-y-4">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className="block text-sm font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">First Name</label>
<input className="input-field" type="text" value="Marcus"/>
</div>
<div>
<label className="block text-sm font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Last Name</label>
<input className="input-field" type="text" value="Johnson"/>
</div>
</div>
<div>
<label className="block text-sm font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Email Address</label>
<input className="input-field" type="email" value="marcus.j@eliteathlete.com"/>
</div>
<div>
<label className="block text-sm font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Phone Number</label>
<input className="input-field" type="tel" value="+1 (555) 019-2834"/>
</div>
<div className="pt-4 flex justify-end">
<button className="btn-primary" type="button">Save Changes</button>
</div>
</form>
</div>
{/*  Profile Visibility Card  */}
<div className="card">
<h3 className="font-headline-md text-headline-md mb-6 border-b border-outline-variant pb-4">Profile Visibility</h3>
<div className="space-y-6">
<div className="flex items-center justify-between">
<div>
<h4 className="font-bold text-on-surface">Public Profile</h4>
<p className="text-sm text-on-surface-variant">Allow your profile to be discovered on search engines.</p>
</div>
<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
<input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="toggle1" name="toggle1" type="checkbox"/>
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle1"></label>
</div>
</div>
<div className="flex items-center justify-between">
<div>
<h4 className="font-bold text-on-surface">Visible to Scouts</h4>
<p className="text-sm text-on-surface-variant">Show your full performance metrics to registered scouts.</p>
</div>
<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
<input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="toggle2" name="toggle2" type="checkbox"/>
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle2"></label>
</div>
</div>
<div className="flex items-center justify-between">
<div>
<h4 className="font-bold text-on-surface">Show Performance Data</h4>
<p className="text-sm text-on-surface-variant">Display detailed analytics charts on your public profile.</p>
</div>
<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="toggle3" name="toggle3" type="checkbox"/>
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle3"></label>
</div>
</div>
<div className="pt-4 border-t border-outline-variant">
<label className="block text-sm font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Public Profile URL</label>
<div className="flex gap-2">
<input className="input-field bg-surface-container opacity-70 cursor-not-allowed" readonly="" type="text" value="sportlens.com/p/marcus-johnson"/>
<button className="btn-secondary whitespace-nowrap"><span className="material-symbols-outlined text-sm align-middle mr-1">content_copy</span>Copy</button>
</div>
</div>
</div>
</div>
</div>
{/*  Right Column  */}
<div className="flex flex-col gap-6">
{/*  Notification Preferences  */}
<div className="card">
<h3 className="font-headline-md text-headline-md mb-6 border-b border-outline-variant pb-4">Notifications</h3>
<div className="space-y-4">
<label className="flex items-start gap-3 cursor-pointer">
<div className="flex items-center h-5 mt-1">
<input defaultChecked className="w-4 h-4 rounded border-outline-variant bg-surface-container text-emerald-500 focus:ring-emerald-500 focus:ring-offset-background" type="checkbox"/>
</div>
<div className="flex flex-col">
<span className="text-on-surface font-medium">Email Alerts</span>
<span className="text-xs text-on-surface-variant">Daily summary of activity.</span>
</div>
</label>
<label className="flex items-start gap-3 cursor-pointer">
<div className="flex items-center h-5 mt-1">
<input defaultChecked className="w-4 h-4 rounded border-outline-variant bg-surface-container text-emerald-500 focus:ring-emerald-500 focus:ring-offset-background" type="checkbox"/>
</div>
<div className="flex flex-col">
<span className="text-on-surface font-medium">Opportunity Matches</span>
<span className="text-xs text-on-surface-variant">Instant alerts for new team openings.</span>
</div>
</label>
<label className="flex items-start gap-3 cursor-pointer">
<div className="flex items-center h-5 mt-1">
<input defaultChecked className="w-4 h-4 rounded border-outline-variant bg-surface-container text-emerald-500 focus:ring-emerald-500 focus:ring-offset-background" type="checkbox"/>
</div>
<div className="flex flex-col">
<span className="text-on-surface font-medium">Scout Interest</span>
<span className="text-xs text-on-surface-variant">When a scout views your full profile.</span>
</div>
</label>
<label className="flex items-start gap-3 cursor-pointer">
<div className="flex items-center h-5 mt-1">
<input className="w-4 h-4 rounded border-outline-variant bg-surface-container text-emerald-500 focus:ring-emerald-500 focus:ring-offset-background" type="checkbox"/>
</div>
<div className="flex flex-col">
<span className="text-on-surface font-medium">Performance Insights</span>
<span className="text-xs text-on-surface-variant">Weekly analytics breakdown.</span>
</div>
</label>
</div>
</div>
{/*  Security & Preferences  */}
<div className="card">
<h3 className="font-headline-md text-headline-md mb-6 border-b border-outline-variant pb-4">Security &amp; Prefs</h3>
<div className="space-y-6">
<div>
<button className="btn-secondary w-full flex justify-center items-center gap-2"><span className="material-symbols-outlined text-sm">lock_reset</span>Change Password</button>
</div>
<div className="flex items-center justify-between border-b border-outline-variant pb-6">
<div>
<h4 className="font-bold text-on-surface text-sm">Two-Factor Auth</h4>
</div>
<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="toggle4" name="toggle4" type="checkbox"/>
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle4"></label>
</div>
</div>
<div className="space-y-4">
<div>
<label className="block text-xs font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Language</label>
<select className="input-field bg-surface-container appearance-none">
<option>English (US)</option>
<option>Spanish</option>
<option>French</option>
</select>
</div>
<div>
<label className="block text-xs font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Timezone</label>
<select className="input-field bg-surface-container appearance-none">
<option>UTC-08:00 (Pacific Time)</option>
<option>UTC-05:00 (Eastern Time)</option>
<option>UTC+00:00 (GMT)</option>
</select>
</div>
<div>
<label className="block text-xs font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Units</label>
<select className="input-field bg-surface-container appearance-none">
<option>Imperial (lbs, in, mi)</option>
<option>Metric (kg, cm, km)</option>
</select>
</div>
</div>
</div>
</div>
{/*  Danger Zone  */}
<div className="card border-error/30 bg-error-container/10">
<h3 className="font-headline-md text-headline-md mb-4 text-error">Danger Zone</h3>
<p className="text-sm text-on-surface-variant mb-6">Irreversible actions regarding your account data.</p>
<div className="space-y-3">
<button className="btn-secondary w-full flex justify-center items-center gap-2"><span className="material-symbols-outlined text-sm">download</span>Export Data</button>
<button className="btn-danger w-full flex justify-center items-center gap-2"><span className="material-symbols-outlined text-sm">warning</span>Deactivate Account</button>
</div>
</div>
</div>
</div>
</main>
  );
}
