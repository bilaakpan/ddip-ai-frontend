"use client";

import { useState, useEffect, useCallback } from "react";
import { insightsApi, type Insight } from "@/lib/api";

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Insight | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInsights = useCallback(async () => {
    try {
      const res = await insightsApi.list({ page: String(page), limit: "15" });
      setInsights(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this insight?")) return;
    try {
      await insightsApi.delete(id);
      fetchInsights();
    } catch {
      alert("Failed to delete insight");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">
            Insights / Blog
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage blog posts and articles.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add Article
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : insights.length === 0 ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No articles yet. Click &quot;+ Add Article&quot; to create one.
          </div>
        ) : (
          insights.map((insight) => (
            <div
              key={insight.id}
              className="flex items-center gap-4 rounded-xl border border-border-dark bg-dark-surface p-4"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">{insight.title}</p>
                <p className="mt-0.5 text-xs text-white/40">
                  /{insight.slug}
                  {insight.category ? ` · ${insight.category}` : ""}
                  {" · "}
                  {new Date(insight.publishedAt).toLocaleDateString()}
                </p>
              </div>

              {insight.seoTitle && (
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  SEO
                </span>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(insight);
                    setShowForm(true);
                  }}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(insight.id)}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg px-3 py-1.5 text-sm text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
          >
            Previous
          </button>
          <span className="text-sm text-white/40">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg px-3 py-1.5 text-sm text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
          >
            Next
          </button>
        </div>
      )}

      {showForm && (
        <InsightForm
          insight={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchInsights();
          }}
        />
      )}
    </div>
  );
}

function InsightForm({
  insight,
  onClose,
  onSaved,
}: {
  insight: Insight | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: insight?.title ?? "",
    slug: insight?.slug ?? "",
    category: insight?.category ?? "",
    imageUrl: insight?.imageUrl ?? "",
    body: insight?.body ?? "",
    seoTitle: insight?.seoTitle ?? "",
    seoDescription: insight?.seoDescription ?? "",
    seoOgImage: insight?.seoOgImage ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (insight) {
        await insightsApi.update(insight.id, form);
      } else {
        await insightsApi.create(form);
      }
      onSaved();
    } catch {
      alert("Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  // Auto-generate slug from title
  const generateSlug = () => {
    setForm({
      ...form,
      slug: form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    });
  };

  const inputClass =
    "w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          {insight ? "Edit Article" : "Add Article"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 max-h-[70vh] space-y-4 overflow-y-auto pr-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Slug *</label>
            <div className="flex gap-2">
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className={inputClass} placeholder="auto-generated-from-title" />
              <button type="button" onClick={generateSlug} className="shrink-0 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/60 hover:bg-white/10">
                Generate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Category</label>
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass} placeholder="e.g., AI, Technology" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Image URL</label>
              <input type="text" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Body (Markdown) *</label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              required
              rows={12}
              className={inputClass + " font-mono"}
              placeholder="Write your article content in markdown..."
            />
          </div>

          {/* SEO Fields */}
          <div className="border-t border-border-dark pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">SEO</p>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-white/60">SEO Title</label>
                <input type="text" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white/60">SEO Description</label>
                <textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} rows={2} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white/60">OG Image URL</label>
                <input type="text" value={form.seoOgImage} onChange={(e) => setForm({ ...form, seoOgImage: e.target.value })} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50">
              {saving ? "Saving..." : insight ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
