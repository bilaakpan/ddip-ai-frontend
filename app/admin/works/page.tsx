"use client";

import { useState, useEffect, useCallback } from "react";
import { worksApi, tagsApi, type Work, type Tag } from "@/lib/api";
import FileUpload from "@/components/admin/FileUpload";

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Work | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [worksRes, tagsRes] = await Promise.allSettled([
        worksApi.list(),
        tagsApi.list("work"),
      ]);
      if (worksRes.status === "fulfilled") setWorks(worksRes.value.data);
      if (tagsRes.status === "fulfilled") setTags(tagsRes.value.data);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this work?")) return;
    try {
      await worksApi.delete(id);
      fetchData();
    } catch {
      alert("Failed to delete work");
    }
  };

  const handleToggleHighlight = async (work: Work) => {
    try {
      await worksApi.update(work.id, { isHighlighted: !work.isHighlighted });
      fetchData();
    } catch {
      alert("Failed to update work");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">
            Works / Portfolio
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage portfolio items. Highlighted items appear on the homepage.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add Work
        </button>
      </div>

      {/* Works Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {loading ? (
          <div className="col-span-2 rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : works.length === 0 ? (
          <div className="col-span-2 rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No works yet. Click &quot;+ Add Work&quot; to create one.
          </div>
        ) : (
          works.map((work) => (
            <div
              key={work.id}
              className="rounded-xl border border-border-dark bg-dark-surface p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-medium text-white">
                      {work.title}
                    </h3>
                    {work.field && (
                      <span className="shrink-0 rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase text-white/40">
                        {work.field}
                      </span>
                    )}
                  </div>
                  {work.body && (
                    <p className="mt-1 text-xs text-white/40 line-clamp-2">
                      {work.body}
                    </p>
                  )}
                  {work.tags && work.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {work.tags.map((wt) => (
                        <span
                          key={wt.tag.id}
                          className="rounded-full border border-border-dark px-2 py-0.5 text-[10px] text-white/40"
                        >
                          {wt.tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="ml-3 flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => handleToggleHighlight(work)}
                    title={work.isHighlighted ? "Remove from homepage" : "Show on homepage"}
                    className={`rounded-lg p-2 transition-colors ${
                      work.isHighlighted
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "text-white/20 hover:text-white/40"
                    }`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setEditing(work);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <WorkForm
          work={editing}
          availableTags={tags}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchData();
          }}
          onTagCreated={fetchData}
        />
      )}
    </div>
  );
}

function WorkForm({
  work,
  availableTags,
  onClose,
  onSaved,
  onTagCreated,
}: {
  work: Work | null;
  availableTags: Tag[];
  onClose: () => void;
  onSaved: () => void;
  onTagCreated: () => void;
}) {
  const [form, setForm] = useState({
    title: work?.title ?? "",
    body: work?.body ?? "",
    field: work?.field ?? "",
    mediaUrl: work?.mediaUrl ?? "",
    mediaType: work?.mediaType ?? "video",
    isHighlighted: work?.isHighlighted ?? false,
  });
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    work?.tags?.map((wt) => wt.tag.id) ?? []
  );
  const [newTagName, setNewTagName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, tagIds: selectedTagIds };
      if (work) {
        await worksApi.update(work.id, data);
      } else {
        await worksApi.create(data);
      }
      onSaved();
    } catch {
      alert("Failed to save work");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const res = await tagsApi.create({ name: newTagName.trim(), category: "work" });
      setSelectedTagIds([...selectedTagIds, res.data.id]);
      setNewTagName("");
      onTagCreated();
    } catch {
      alert("Failed to create tag");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          {work ? "Edit Work" : "Add Work"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
              placeholder="e.g., Vesta Global"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Description
            </label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Industry / Field
            </label>
            <input
              type="text"
              value={form.field}
              onChange={(e) => setForm({ ...form, field: e.target.value })}
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
              placeholder="e.g., REAL ESTATE"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FileUpload
              value={form.mediaUrl}
              onChange={(url) => setForm({ ...form, mediaUrl: url })}
              label="Media File"
              placeholder="Upload or paste URL"
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">
                Media Type
              </label>
              <select
                value={form.mediaType}
                onChange={(e) =>
                  setForm({ ...form, mediaType: e.target.value })
                }
                className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white focus:border-teal-500 focus:outline-none"
              >
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() =>
                    setSelectedTagIds(
                      selectedTagIds.includes(tag.id)
                        ? selectedTagIds.filter((id) => id !== tag.id)
                        : [...selectedTagIds, tag.id]
                    )
                  }
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    selectedTagIds.includes(tag.id)
                      ? "border-teal-500 bg-teal-500/10 text-teal-500"
                      : "border-border-dark text-white/40 hover:text-white"
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isHighlighted"
              checked={form.isHighlighted}
              onChange={(e) =>
                setForm({ ...form, isHighlighted: e.target.checked })
              }
              className="h-4 w-4 rounded border-border-dark bg-dark-bg text-teal-500 focus:ring-teal-500"
            />
            <label htmlFor="isHighlighted" className="text-sm text-white/60">
              Highlight on homepage (&quot;Selected Work&quot;)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50"
            >
              {saving ? "Saving..." : work ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
