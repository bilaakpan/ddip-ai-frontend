"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin";
import { projectsApi, contactsApi, aiInteractionsApi, usersApi } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    aiInteractions: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, contactsRes, aiRes, usersRes] =
          await Promise.allSettled([
            projectsApi.list({ limit: "1" }),
            contactsApi.list({ limit: "1" }),
            aiInteractionsApi.list({ limit: "1" }),
            usersApi.list(),
          ]);

        setStats({
          projects:
            projectsRes.status === "fulfilled"
              ? projectsRes.value.pagination?.total ?? 0
              : 0,
          contacts:
            contactsRes.status === "fulfilled"
              ? contactsRes.value.pagination?.total ?? 0
              : 0,
          aiInteractions:
            aiRes.status === "fulfilled"
              ? aiRes.value.pagination?.total ?? 0
              : 0,
          users:
            usersRes.status === "fulfilled"
              ? Array.isArray(usersRes.value.data)
                ? usersRes.value.data.length
                : 0
              : 0,
        });
      } catch {
        // Backend may not be running — keep defaults at 0
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      {/* Header */}
      <h1 className="font-heading text-2xl font-medium text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-white/40">
        Overview of your admin panel activity
      </p>

      {/* Stat Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Projects"
          value={loading ? "..." : stats.projects}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          }
        />
        <StatCard
          label="Total Contacts"
          value={loading ? "..." : stats.contacts}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          }
        />
        <StatCard
          label="AI Interactions"
          value={loading ? "..." : stats.aiInteractions}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <StatCard
          label="Active Users"
          value={loading ? "..." : stats.users}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          }
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="font-heading text-lg font-medium text-white">
          Recent Activity
        </h2>
        <div className="mt-4 rounded-xl border border-border-dark bg-dark-surface p-6">
          {loading ? (
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 animate-spin text-teal-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-sm text-white/40">
                Loading activity...
              </span>
            </div>
          ) : (
            <p className="text-sm text-white/40">
              No recent activity to display. Activity from projects, contacts,
              and AI interactions will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
