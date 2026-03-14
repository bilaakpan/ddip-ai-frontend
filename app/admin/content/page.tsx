"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, DetailModal } from "@/components/admin";
import { contentApi, type ContentBlock } from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max) + "...";
}

const CONTENT_TYPES = ["TEXT", "HTML", "JSON", "IMAGE_URL"] as const;

export default function ContentPage() {
  const { isEditorOrAbove } = useAuth();

  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit modal state
  const [selected, setSelected] = useState<ContentBlock | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editType, setEditType] = useState<string>("TEXT");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await contentApi.list();
      setBlocks(res.data);
    } catch {
      setBlocks([]);
      setError("Could not load content blocks. The backend may not be running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const openEdit = (item: ContentBlock) => {
    setSelected(item);
    setEditValue(item.value);
    setEditType(item.type);
    setSaveSuccess(false);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      await contentApi.update(selected.key, {
        value: editValue,
        type: editType,
      });
      setSaveSuccess(true);
      // Refresh list to reflect change
      fetchContent();
      // Update selected to show new values
      setSelected((prev) =>
        prev
          ? {
              ...prev,
              value: editValue,
              type: editType as ContentBlock["type"],
              updatedAt: new Date().toISOString(),
            }
          : null
      );
    } catch {
      // Silently handle — user can retry
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: "key",
      label: "Key",
      render: (item: ContentBlock) => (
        <span className="font-mono text-xs font-medium text-teal-400">
          {item.key}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (item: ContentBlock) => (
        <span className="inline-flex rounded bg-white/5 px-2 py-0.5 text-xs text-white/50">
          {item.type}
        </span>
      ),
    },
    {
      key: "value",
      label: "Value",
      render: (item: ContentBlock) => (
        <span className="text-white/60">{truncate(item.value, 50)}</span>
      ),
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      render: (item: ContentBlock) => (
        <span className="text-white/50">{formatDate(item.updatedAt)}</span>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-white">
          Content Blocks
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Manage dynamic content used across the site.
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
        data={blocks}
        onRowClick={openEdit}
        isLoading={loading}
        emptyMessage="No content blocks found."
      />

      {/* Edit Modal */}
      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? `Edit: ${selected.key}` : "Edit Content"}
        actions={
          isEditorOrAbove ? (
            <>
              {saveSuccess && (
                <span className="mr-auto text-sm text-green-400">
                  Saved successfully
                </span>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-border-dark px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-dark-bg transition-colors hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : undefined
        }
      >
        {selected && (
          <div className="space-y-4">
            {/* Key (read-only) */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                Key
              </label>
              <div className="rounded-lg border border-border-dark bg-dark-bg px-3 py-2 font-mono text-sm text-teal-400">
                {selected.key}
              </div>
            </div>

            {/* Type selector */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                Type
              </label>
              {isEditorOrAbove ? (
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white outline-none focus:border-teal-500"
                >
                  {CONTENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white/60">
                  {selected.type}
                </div>
              )}
            </div>

            {/* Value textarea */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                Value
              </label>
              {isEditorOrAbove ? (
                <textarea
                  value={editValue}
                  onChange={(e) => {
                    setEditValue(e.target.value);
                    setSaveSuccess(false);
                  }}
                  rows={8}
                  className="w-full resize-y rounded-lg border border-border-dark bg-dark-bg px-3 py-2 font-mono text-sm text-white outline-none focus:border-teal-500"
                  placeholder="Enter content value..."
                />
              ) : (
                <div className="whitespace-pre-wrap rounded-lg border border-border-dark bg-dark-bg p-3 font-mono text-sm text-white/80">
                  {selected.value}
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-6 border-t border-border-dark pt-3">
              {selected.updatedBy && (
                <span className="text-xs text-white/30">
                  Updated by: {selected.updatedBy}
                </span>
              )}
              <span className="text-xs text-white/30">
                Last updated: {formatDate(selected.updatedAt)}
              </span>
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
