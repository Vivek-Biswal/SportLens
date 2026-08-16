"use client";

import { useEffect, useState } from "react";
import { coachApi } from "@/lib/api/coach";
import { useAuth } from "@/lib/auth/AuthContext";

export default function CoachDashboardPage() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await coachApi.getDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to load coach dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="md:ml-64 pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full flex justify-center items-center h-screen">
        <p className="text-on-surface">Loading Coach Dashboard...</p>
      </main>
    );
  }

  const stats = dashboardData?.statistics || {};
  const recentAssessments = dashboardData?.recent_assessments || [];
  const recentResults = dashboardData?.recent_results || [];

  return (
    <main className="md:ml-64 pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
      {/* Header Section */}
      <section className="mb-section-gap">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg font-display-lg mb-2 text-on-surface">
              Coach Dashboard
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Welcome back, {user?.name}. Overview of your athletes' assessments and metrics.
            </p>
          </div>
        </div>
      </section>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-section-gap">
        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Athletes</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">groups</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface">
                {stats.total_athletes || 0}
              </span>
            </div>
          </div>
        </div>
        
        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Assessments</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">assignment</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface">
                {stats.total_assessments || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Completed</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">task_alt</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface text-emerald">
                {stats.completed_assessments || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="layer-surface border layer-border rounded-2xl p-container-padding flex flex-col justify-between h-40 group hover:border-emerald transition-colors">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">In Progress</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-emerald transition-colors">pending</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-headline-lg font-bold text-on-surface text-primary">
                {stats.in_progress_assessments || 0}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-section-gap">
        
        {/* Recent Results */}
        <div className="layer-surface border layer-border rounded-2xl p-container-padding overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Recent Results</h3>
          </div>
          <div className="overflow-x-auto">
            {recentResults.length === 0 ? (
              <p className="text-on-surface-variant py-4">No recent performance results found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b layer-border">
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Athlete</th>
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Test Type</th>
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-on-surface">
                  {recentResults.map((result: any, i: number) => (
                    <tr key={i} className="border-b layer-border hover:bg-surface-variant transition-colors">
                      <td className="py-3">
                        <div className="font-semibold">{result.athlete_name}</div>
                        <div className="text-xs text-on-surface-variant">{new Date(result.timestamp).toLocaleDateString()}</div>
                      </td>
                      <td className="py-3 capitalize">
                        {result.test_type.replace("_", " ")}
                      </td>
                      <td className="py-3 text-right font-stats-number">
                        {result.result} {result.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Assessments */}
        <div className="layer-surface border layer-border rounded-2xl p-container-padding overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Recent Assessments</h3>
          </div>
          <div className="overflow-x-auto">
            {recentAssessments.length === 0 ? (
              <p className="text-on-surface-variant py-4">No recent assessments found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b layer-border">
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Athlete</th>
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium">Test Type</th>
                    <th className="font-label-caps text-label-caps text-on-surface-variant uppercase pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-on-surface">
                  {recentAssessments.map((assessment: any, i: number) => (
                    <tr key={i} className="border-b layer-border hover:bg-surface-variant transition-colors">
                      <td className="py-3">
                        <div className="font-semibold">{assessment.athlete_name}</div>
                        <div className="text-xs text-on-surface-variant">{new Date(assessment.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="py-3 capitalize">
                        {assessment.test_type.replace("_", " ")}
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-block px-2 py-1 rounded font-label-caps text-[10px] ${assessment.status === 'completed' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-surface-variant text-on-surface-variant'}`}>
                          {assessment.status.toUpperCase()}
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
