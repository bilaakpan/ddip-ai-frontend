"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DataTable,
  StatusBadge,
  Pagination,
  DetailModal,
  DetailField,
} from "@/components/admin";
import {
  projectsApi,
  type ProjectSubmission,
} from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";

const PROJECT_STATUSES = [
  "NEW",
  "IN_REVIEW",
  "CONTACTED",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
] as const;

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ProjectsPage() {
  const { isEditorOrAbove } = useAuth();

  const [projects, setProjects] = useState<ProjectSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Detail modal state
  const [selected, setSelected] = useState<ProjectSubmission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProjects = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectsApi.list({ page: String(p), limit: "10" });
      setProjects(res.data);
      setTotalPages(res.pagination.totalPages);
      setTotal(res.pagination.total);
    } catch {
      setProjects([]);
      setTotalPages(1);
      setTotal(0);
      setError("Could not load projects. The backend may not be running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects(page);
  }, [page, fetchProjects]);

  const openDetail = (item: ProjectSubmission) => {
    setSelected(item);
    setEditStatus(item.status);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!selected || editStatus === selected.status) return;
    setSaving(true);
    try {
      const res = await projectsApi.update(selected.id, { status: editStatus });
      setSelected(res.data);
      // Refresh list to reflect change
      fetchProjects(page);
    } catch {
      // Silently handle — user can retry
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: "fullName",
      label: "Name",
      render: (item: ProjectSubmission) => (
        <span className="font-medium text-white">{item.fullName}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "projectType",
      label: "Type",
      render: (item: ProjectSubmission) => (
        <span className="text-white/60">{item.projectType || "\u2014"}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: ProjectSubmission) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item: ProjectSubmission) => (
        <span className="text-white/50">{formatDate(item.createdAt)}</span>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-white">
          Project Submissions
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Manage and review incoming project submissions.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-400">
          {error}
        </div>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={projects}
        onRowClick={openDetail}
        isLoading={loading}
        emptyMessage="No project submissions yet."
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Project Submission"
        actions={
          isEditorOrAbove ? (
            <>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white outline-none focus:border-teal-500"
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSave}
                disabled={saving || editStatus === selected?.status}
                className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-dark-bg transition-colors hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Status"}
              </button>
            </>
          ) : undefined
        }
      >
        {selected && (
          <div className="space-y-1">
            <DetailField label="Full Name" value={selected.fullName} />
            <DetailField label="Email" value={selected.email} />
            <DetailField label="Phone" value={selected.phone} />
            <DetailField label="Company" value={selected.company} />
            <DetailField label="Title" value={selected.title} />
            <DetailField label="Project Type" value={selected.projectType} />
            <DetailField
              label="Status"
              value={<StatusBadge status={selected.status} />}
            />
            <DetailField
              label="Project Description"
              value={selected.projectDescription}
            />
            <DetailField label="Style Reference" value={selected.styleReference} />
            <DetailField label="Brand Guide" value={selected.brandGuide} />
            <DetailField label="Brief Details" value={selected.briefDetails} />
            <DetailField label="Brief File" value={selected.briefFile} />
            <DetailField label="Source" value={selected.source} />
            <DetailField label="Internal Notes" value={selected.internalNotes} />
            <DetailField
              label="Submitted"
              value={formatDate(selected.createdAt)}
            />
            <DetailField
              label="Last Updated"
              value={formatDate(selected.updatedAt)}
            />
          </div>
        )}
      </DetailModal>
    </div>
  );
}
