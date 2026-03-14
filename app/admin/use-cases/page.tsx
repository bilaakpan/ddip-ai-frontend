"use client";

import { useState, useEffect, useCallback } from "react";
import { useCasesApi, tagsApi, type UseCase, type Tag } from "@/lib/api";

const PAGE_SLUGS = ["ai-influencer", "ai-content", "ai-commercial"];

export default function UseCasesPage() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<UseCase | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");

  const fetchUseCases = useCallback(async () => {
    try {
      const res = await useCasesApi.list(filter || undefined);
      setUseCases(res.data);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchUseCases();
  }, [fetchUseCases]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this use case?")) return;
    try {
      await useCasesApi.delete(id);
      fetchUseCases();
    } catch {
      alert("Failed to delete use case");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">
            Use Cases
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage use cases across pages. {useCases.length} total.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add Use Case
        </button>
      </div>

      {/* Filter */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setFilter("")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            filter === "" ? "bg-teal-500/20 text-teal-400" : "bg-white/5 text-white/40 hover:bg-white/10"
          }`}
        >
          All
        </button>
        {PAGE_SLUGS.map((slug) => (
          <button
            key={slug}
            onClick={() => setFilter(slug)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === slug ? "bg-teal-500/20 text-teal-400" : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {slug}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : useCases.length === 0 ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No use cases found.
          </div>
        ) : (
          useCases.map((uc) => (
            <div
              key={uc.id}
              className="flex items-center gap-4 rounded-xl border border-border-dark bg-dark-surface p-4"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">{uc.brand}</p>
                <p className="mt-0.5 text-xs text-white/40">
                  {uc.pageSlug}
                  {uc.tags?.length ? ` · ${uc.tags.map((t) => t.tag.name).join(", ")}` : ""}
                </p>
              </div>

              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/40">
                {uc.mediaType || "no media"}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(uc);
                    setShowForm(true);
                  }}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(uc.id)}
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

      {showForm && (
        <UseCaseForm
          useCase={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchUseCases();
          }}
        />
      )}
    </div>
  );
}

function UseCaseForm({
  useCase,
  onClose,
  onSaved,
}: {
  useCase: UseCase | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    brand: useCase?.brand ?? "",
    mediaUrl: useCase?.mediaUrl ?? "",
    mediaType: useCase?.mediaType ?? "image",
    pageSlug: useCase?.pageSlug ?? "ai-influencer",
    sortOrder: useCase?.sortOrder ?? 0,
  });
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    useCase?.tags?.map((t) => t.tag.id) ?? []
  );
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    tagsApi.list("use-case").then((res) => setAvailableTags(res.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (useCase) {
        await useCasesApi.update(useCase.id, { ...form, tagIds: selectedTagIds });
      } else {
        await useCasesApi.create({ ...form, tagIds: selectedTagIds });
      }
      onSaved();
    } catch {
      alert("Failed to save use case");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          {useCase ? "Edit Use Case" : "Add Use Case"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Brand *</label>
            <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Page *</label>
            <select value={form.pageSlug} onChange={(e) => setForm({ ...form, pageSlug: e.target.value })} className={inputClass}>
              {PAGE_SLUGS.map((slug) => (
                <option key={slug} value={slug}>{slug}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Media URL</label>
              <input type="text" value={form.mediaUrl} onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Media Type</label>
              <select value={form.mediaType} onChange={(e) => setForm({ ...form, mediaType: e.target.value })} className={inputClass}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          {availableTags.length > 0 && (
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() =>
                      setSelectedTagIds((prev) =>
                        prev.includes(tag.id)
                          ? prev.filter((id) => id !== tag.id)
                          : [...prev, tag.id]
                      )
                    }
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedTagIds.includes(tag.id)
                        ? "bg-teal-500/20 text-teal-400"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50">
              {saving ? "Saving..." : useCase ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
