"use client";

import { useState, useEffect, useCallback } from "react";
import { heroSlidersApi, type HeroSlider } from "@/lib/api";
import FileUpload from "@/components/admin/FileUpload";

export default function HeroSlidersPage() {
  const [sliders, setSliders] = useState<HeroSlider[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HeroSlider | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchSliders = useCallback(async () => {
    try {
      const res = await heroSlidersApi.list();
      setSliders(res.data);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slider?")) return;
    try {
      await heroSlidersApi.delete(id);
      fetchSliders();
    } catch {
      alert("Failed to delete slider");
    }
  };

  const handleToggleActive = async (slider: HeroSlider) => {
    try {
      await heroSlidersApi.update(slider.id, { isActive: !slider.isActive });
      fetchSliders();
    } catch {
      alert("Failed to update slider");
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const items = sliders.map((s, i) => ({
      id: s.id,
      sortOrder: i === index ? index - 1 : i === index - 1 ? index : i,
    }));
    try {
      await heroSlidersApi.reorder(items);
      fetchSliders();
    } catch {
      alert("Failed to reorder");
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === sliders.length - 1) return;
    const items = sliders.map((s, i) => ({
      id: s.id,
      sortOrder: i === index ? index + 1 : i === index + 1 ? index : i,
    }));
    try {
      await heroSlidersApi.reorder(items);
      fetchSliders();
    } catch {
      alert("Failed to reorder");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">
            Hero Sliders
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage homepage hero slider items. Drag to reorder.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add Slider
        </button>
      </div>

      {/* Slider List */}
      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : sliders.length === 0 ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No hero sliders yet. Click &quot;+ Add Slider&quot; to create one.
          </div>
        ) : (
          sliders.map((slider, index) => (
            <div
              key={slider.id}
              className="flex items-center gap-4 rounded-xl border border-border-dark bg-dark-surface p-4"
            >
              {/* Order controls */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="rounded p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === sliders.length - 1}
                  className="rounded p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Slider number */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-sm font-bold text-teal-500">
                S{index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {slider.problem}
                </p>
                <p className="mt-0.5 truncate text-xs text-white/40">
                  {slider.solution}
                </p>
              </div>

              {/* Active toggle */}
              <button
                onClick={() => handleToggleActive(slider)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  slider.isActive
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {slider.isActive ? "Active" : "Inactive"}
              </button>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(slider);
                    setShowForm(true);
                  }}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(slider.id)}
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

      {/* Form Modal */}
      {showForm && (
        <SliderForm
          slider={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchSliders();
          }}
        />
      )}
    </div>
  );
}

function SliderForm({
  slider,
  onClose,
  onSaved,
}: {
  slider: HeroSlider | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    problem: slider?.problem ?? "",
    solution: slider?.solution ?? "",
    videoUrl: slider?.videoUrl ?? "",
    buttonText: slider?.buttonText ?? "",
    buttonHref: slider?.buttonHref ?? "",
    isActive: slider?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (slider) {
        await heroSlidersApi.update(slider.id, form);
      } else {
        await heroSlidersApi.create(form);
      }
      onSaved();
    } catch {
      alert("Failed to save slider");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          {slider ? "Edit Slider" : "Add Slider"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Problem Statement *
            </label>
            <input
              type="text"
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              required
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
              placeholder="e.g., Your brand needs a face"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Solution Statement *
            </label>
            <input
              type="text"
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
              required
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
              placeholder="e.g., We create AI influencers"
            />
          </div>

          <FileUpload
            value={form.videoUrl}
            onChange={(url) => setForm({ ...form, videoUrl: url })}
            accept="video/*"
            label="Background Video"
            placeholder="Upload video or paste URL"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">
                Button Text
              </label>
              <input
                type="text"
                value={form.buttonText}
                onChange={(e) =>
                  setForm({ ...form, buttonText: e.target.value })
                }
                className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
                placeholder="e.g., Learn More"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">
                Button Link
              </label>
              <input
                type="text"
                value={form.buttonHref}
                onChange={(e) =>
                  setForm({ ...form, buttonHref: e.target.value })
                }
                className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
                placeholder="e.g., /ai-solutions"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
              className="h-4 w-4 rounded border-border-dark bg-dark-bg text-teal-500 focus:ring-teal-500"
            />
            <label htmlFor="isActive" className="text-sm text-white/60">
              Active (visible on frontend)
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
              {saving ? "Saving..." : slider ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
