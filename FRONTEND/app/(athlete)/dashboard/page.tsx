"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { athletesApi } from "@/lib/api/athletes";

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [perfProfile, recentResults] = await Promise.all([
          athletesApi.getPerformanceProfile(user.id).catch(() => null),
          athletesApi.getResults(user.id).catch(() => [])
        ]);
        setProfile(perfProfile);
        setResults(recentResults || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <main className="md:ml-64 pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full flex justify-center items-center h-screen">
        <p className="text-on-surface">Loading Dashboard...</p>
      </main>
    );
  }

  const confidenceScore = profile?.overallConfidence 
    ? Math.round(profile.overallConfidence * 100) 
    : 0;

  return (
    <main className="md:ml-64 pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
      {/* Header Section */}
      <section className="mb-section-gap">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg font-display-lg mb-2 text-on-surface">
              Good morning, {user?.name || "Athlete"}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Track your performance, build your profile, and discover new opportunities.
            </p>
          </div>
          
          {/* Profile Strength */}
          <div className="layer-surface border layer-border rounded-2xl p-container-padding w-full lg:w-80 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md font-semibold text-on-surface">Profile Confidence</span>
              <span className="font-stats-number text-stats-number text-emerald">{confidenceScore}%</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div className="bg-emerald h-2 rounded-full" style={{ width: `${confidenceScore}%` }}></div>
            </div>
            {!profile && (
              <button className="w-full py-2 bg-transparent border layer-border text-on-surface rounded-lg font-semibold hover:bg-surface-variant transition-colors text-sm">
                Complete Assessments
              </button>
            )}
          </div>
        </div>
      </section>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-section-gap">
        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Overall Category</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">grade</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface">
                {profile?.overallCategory ? profile.overallCategory.replace("_", " ") : "N/A"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Speed Category</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">speed</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface">
                {profile?.speedCategory || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Explosiveness</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">bolt</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface">
                {profile?.explosivenessCategory || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Agility</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">directions_run</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface">
                {profile?.agilityCategory || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-section-gap">
        {/* AI Insights (Takes up left column) */}
        <div className="lg:col-span-1 layer-surface border layer-border rounded-2xl p-container-padding flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald rounded-full opacity-5 blur-[60px]"></div>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-emerald">auto_awesome</span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">AI Recommendation</h3>
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              <strong className="text-on-surface font-semibold">Assessment:</strong> {profile?.recommendation || "Take assessments to generate AI insights."}
            </p>
          </div>
        </div>
        
        {/* Recent Performance Table (Takes up remaining 2 columns) */}
        <div className="lg:col-span-2 layer-surface border layer-border rounded-2xl p-container-padding overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Recent Results</h3>
          </div>
          <div className="overflow-x-auto">
            {results.length === 0 ? (
              <p className="text-on-surface-variant py-4">No recent performance results found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b layer-border">
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Date</th>
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Test Type</th>
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium text-right">Score</th>
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium text-center">Confidence</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-on-surface">
                  {results.map((result: any, i: number) => (
                    <tr key={i} className="border-b layer-border hover:bg-surface-variant transition-colors">
                      <td className="py-3 text-on-surface-variant">
                        {new Date(result.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <div className="font-semibold capitalize">{result.test_type.replace("_", " ")}</div>
                      </td>
                      <td className="py-3 text-right font-stats-number">
                        {result.result} {result.unit}
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-[#10B981]/20 text-[#10B981] font-label-caps text-[10px]">
                          {Math.round(result.confidence * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
