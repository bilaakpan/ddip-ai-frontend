"use client";

import { useState, useEffect, useCallback } from "react";
import { aiSolutionsApi, tagsApi, type AiSolution, type Tag } from "@/lib/api";
import FileUpload from "@/components/admin/FileUpload";

export default function AiSolutionsPage() {
  const [solutions, setSolutions] = useState<AiSolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AiSolution | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchSolutions = useCallback(async () => {
    try {
      const res = await aiSolutionsApi.list();
      setSolutions(res.data);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this AI solution?")) return;
    try {
      await aiSolutionsApi.delete(id);
      fetchSolutions();
    } catch {
      alert("Failed to delete AI solution");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">
            AI Solutions
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage AI solution cards. {solutions.length} total.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add Solution
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : solutions.length === 0 ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No AI solutions yet. Click &quot;+ Add Solution&quot; to create one.
          </div>
        ) : (
          solutions.map((solution) => (
            <div
              key={solution.id}
              className="flex items-center gap-4 rounded-xl border border-border-dark bg-dark-surface p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-sm font-bold text-teal-500">
                {solution.sortOrder + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">{solution.title}</p>
                <p className="mt-0.5 truncate text-xs text-white/40">
                  /{solution.slug}
                  {solution.tags?.length ? ` · ${solution.tags.map((t) => t.tag.name).join(", ")}` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(solution);
                    setShowForm(true);
                  }}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(solution.id)}
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
        <SolutionForm
          solution={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchSolutions();
          }}
        />
      )}
    </div>
  );
}

function SolutionForm({
  solution,
  onClose,
  onSaved,
}: {
  solution: AiSolution | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: solution?.title ?? "",
    body: solution?.body ?? "",
    mediaUrl: solution?.mediaUrl ?? "",
    mediaType: solution?.mediaType ?? "image",
    slug: solution?.slug ?? "",
    sortOrder: solution?.sortOrder ?? 0,
  });
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    solution?.tags?.map((t) => t.tag.id) ?? []
  );
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchTags = useCallback(() => {
    tagsApi.list("ai-solution").then((res) => setAvailableTags(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (solution) {
        await aiSolutionsApi.update(solution.id, { ...form, tagIds: selectedTagIds });
      } else {
        await aiSolutionsApi.create({ ...form, tagIds: selectedTagIds });
      }
      onSaved();
    } catch {
      alert("Failed to save AI solution");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const res = await tagsApi.create({ name: newTagName.trim(), category: "ai-solution" });
      setSelectedTagIds([...selectedTagIds, res.data.id]);
      setNewTagName("");
      fetchTags();
    } catch {
      alert("Failed to create tag");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          {solution ? "Edit AI Solution" : "Add AI Solution"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Slug *</label>
            <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className={inputClass} placeholder="e.g., ai-content-creation" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Body</label>
            <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={3} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FileUpload
              value={form.mediaUrl}
              onChange={(url) => setForm({ ...form, mediaUrl: url })}
              label="Media File"
              placeholder="Upload or paste URL"
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Media Type</label>
              <select value={form.mediaType} onChange={(e) => setForm({ ...form, mediaType: e.target.value })} className={inputClass}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          {/* Tags */}
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
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateTag();
                  }
                }}
                placeholder="Add new tag..."
                className="flex-1 rounded-lg border border-border-dark bg-dark-bg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCreateTag}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:text-white"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50">
              {saving ? "Saving..." : solution ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
