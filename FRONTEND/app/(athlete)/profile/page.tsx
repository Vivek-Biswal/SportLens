"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { athletesApi } from "@/lib/api/athletes";

export default function ProfilePage() {
  const { user } = useAuth();
  const [athlete, setAthlete] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchProfileData = async () => {
      try {
        // Athlete gets their own profile by hitting the directory endpoint
        const athleteList = await athletesApi.getDirectory();
        if (athleteList && athleteList.length > 0) {
          const myAthleteData = athleteList[0];
          setAthlete(myAthleteData);
          
          // Then fetch performance profile
          const perfProfile = await athletesApi.getPerformanceProfile(myAthleteData.id).catch(() => null);
          setProfile(perfProfile);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);

  if (loading) {
    return (
      <main className="flex-1 flex justify-center items-center h-screen md:ml-64 min-w-0">
        <p className="text-on-surface">Loading Profile...</p>
      </main>
    );
  }

  const confidenceScore = profile?.overallConfidence 
    ? Math.round(profile.overallConfidence * 100) 
    : 0;

  return (
    <main className="flex-1 flex flex-col md:ml-64 min-w-0">
      {/* Page Content */}
      <div className="p-gutter md:p-container-padding space-y-8 max-w-[1440px] mx-auto w-full pt-10">
        {/* Profile Header Bento */}
        <section className="card-surface flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex-1 space-y-4 z-10 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                  {athlete?.name || user?.name || "Athlete Name"}
                </h2>
                <p className="text-primary font-label-caps tracking-widest mt-1">
                  {athlete?.sport ? athlete.sport.toUpperCase() : "SPORT NOT SPECIFIED"}
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant mt-2">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>{athlete?.location || "Location not set"}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary text-sm px-4 py-2">Edit Profile</button>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-label-caps text-on-surface-variant">PROFILE CONFIDENCE</span>
                <span className="font-stats-number text-stats-number text-emerald-green">{confidenceScore}%</span>
              </div>
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${confidenceScore}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="card-surface space-y-4">
              <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">About & Intent</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="chip">Age: {athlete?.age || "N/A"}</span>
                <span className="chip">Gender: {athlete?.gender || "N/A"}</span>
              </div>
            </section>

            {/* Performance Metrics */}
            <section className="space-y-4">
              <h3 className="font-headline-md text-headline-md text-on-surface">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="card-surface p-4 flex flex-col justify-between h-28">
                  <span className="text-xs font-label-caps text-on-surface-variant">SPEED</span>
                  <span className="font-stats-number text-display-sm text-primary">
                    {profile?.speedData?.result || "N/A"}
                    <span className="text-sm text-on-surface-variant ml-1">{profile?.speedData?.unit || ""}</span>
                  </span>
                </div>
                <div className="card-surface p-4 flex flex-col justify-between h-28">
                  <span className="text-xs font-label-caps text-on-surface-variant">EXPLOSIVENESS</span>
                  <span className="font-stats-number text-display-sm text-on-surface">
                    {profile?.explosivenessData?.result || "N/A"}
                    <span className="text-sm text-on-surface-variant ml-1">{profile?.explosivenessData?.unit || ""}</span>
                  </span>
                </div>
                <div className="card-surface p-4 flex flex-col justify-between h-28">
                  <span className="text-xs font-label-caps text-on-surface-variant">AGILITY</span>
                  <span className="font-stats-number text-display-sm text-on-surface">
                    {profile?.agilityData?.result || "N/A"}
                    <span className="text-sm text-on-surface-variant ml-1">{profile?.agilityData?.unit || ""}</span>
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="card-surface bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155] space-y-6">
              <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-green">bolt</span> AI Categories
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                  <div>
                    <p className="text-xs font-label-caps text-on-surface-variant">OVERALL</p>
                    <p className="font-stats-number text-[20px] text-emerald-green mt-1">
                      {profile?.overallCategory ? profile.overallCategory.replace("_", " ") : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                  <div>
                    <p className="text-xs font-label-caps text-on-surface-variant">SPEED</p>
                    <p className="font-stats-number text-[20px] text-on-surface mt-1">
                      {profile?.speedCategory || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                  <div>
                    <p className="text-xs font-label-caps text-on-surface-variant">EXPLOSIVENESS</p>
                    <p className="font-stats-number text-[20px] text-on-surface mt-1">
                      {profile?.explosivenessCategory || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-label-caps text-on-surface-variant">AGILITY</p>
                    <p className="font-stats-number text-[20px] text-on-surface mt-1">
                      {profile?.agilityCategory || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

  );
}
