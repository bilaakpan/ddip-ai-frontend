"use client";

import { useState, useEffect, useCallback } from "react";
import { influencersApi, type Influencer } from "@/lib/api";
import FileUpload from "@/components/admin/FileUpload";

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Influencer | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchInfluencers = useCallback(async () => {
    try {
      const res = await influencersApi.list();
      setInfluencers(res.data);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfluencers();
  }, [fetchInfluencers]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this influencer?")) return;
    try {
      await influencersApi.delete(id);
      fetchInfluencers();
    } catch {
      alert("Failed to delete influencer");
    }
  };

  const handleToggleHomepage = async (inf: Influencer) => {
    try {
      await influencersApi.update(inf.id, { showOnHomepage: !inf.showOnHomepage });
      fetchInfluencers();
    } catch {
      alert("Failed to update influencer");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">
            AI Influencers
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage AI influencer profiles. {influencers.length} total.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add Influencer
        </button>
      </div>

      {/* List */}
      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : influencers.length === 0 ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No influencers yet. Click &quot;+ Add Influencer&quot; to create one.
          </div>
        ) : (
          influencers.map((inf) => (
            <div
              key={inf.id}
              className="flex items-center gap-4 rounded-xl border border-border-dark bg-dark-surface p-4"
            >
              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-lg font-bold text-teal-500">
                {inf.name[0]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {inf.name} {inf.surname || ""}
                </p>
                <p className="mt-0.5 truncate text-xs text-white/40">
                  {[inf.category, inf.country, inf.language].filter(Boolean).join(" · ")}
                </p>
              </div>

              {/* Badges */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleHomepage(inf)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    inf.showOnHomepage
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-white/5 text-white/30"
                  }`}
                >
                  Homepage
                </button>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    inf.showOnAiinf
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {inf.showOnAiinf ? "Visible" : "Hidden"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(inf);
                    setShowForm(true);
                  }}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(inf.id)}
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
        <InfluencerForm
          influencer={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchInfluencers();
          }}
        />
      )}
    </div>
  );
}

function InfluencerForm({
  influencer,
  onClose,
  onSaved,
}: {
  influencer: Influencer | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: influencer?.name ?? "",
    surname: influencer?.surname ?? "",
    country: influencer?.country ?? "",
    countryCode: influencer?.countryCode ?? "",
    region: influencer?.region ?? "",
    language: influencer?.language ?? "",
    category: influencer?.category ?? "Influencer",
    persona: influencer?.persona ?? "",
    gender: influencer?.gender ?? "",
    title: influencer?.title ?? "",
    age: influencer?.age as number | undefined,
    summary: influencer?.summary ?? "",
    profile: influencer?.profile ?? "",
    contentFocus: influencer?.contentFocus ?? "",
    visualStyle: influencer?.visualStyle ?? "",
    tone: influencer?.tone ?? "",
    brandFit: influencer?.brandFit ?? "",
    imageUrl: influencer?.imageUrl ?? "",
    videoUrl: influencer?.videoUrl ?? "",
    textOnImage: influencer?.textOnImage ?? "",
    cardColor: influencer?.cardColor ?? "",
    showOnHomepage: influencer?.showOnHomepage ?? false,
    showOnAiinf: influencer?.showOnAiinf ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (influencer) {
        await influencersApi.update(influencer.id, form);
      } else {
        await influencersApi.create(form);
      }
      onSaved();
    } catch {
      alert("Failed to save influencer");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          {influencer ? "Edit Influencer" : "Add Influencer"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 max-h-[70vh] space-y-4 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Surname</label>
              <input type="text" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Country</label>
              <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} placeholder="e.g., Turkey" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">
                Country Code
                <span className="ml-1 text-white/30">(ISO-2)</span>
              </label>
              <input
                type="text"
                value={form.countryCode}
                onChange={(e) => setForm({ ...form, countryCode: e.target.value.toUpperCase().slice(0, 2) })}
                maxLength={2}
                className={inputClass}
                placeholder="TR"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Region</label>
              <input type="text" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Language</label>
              <input type="text" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                <option value="Influencer">Influencer</option>
                <option value="Ambassador">Ambassador</option>
                <option value="Mascot">Mascot</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Gender</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className={inputClass}>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Persona</label>
              <input type="text" value={form.persona} onChange={(e) => setForm({ ...form, persona: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="e.g., Coach, Mascot" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Age</label>
              <input
                type="number"
                value={form.age ?? ""}
                onChange={(e) => setForm({ ...form, age: e.target.value === "" ? undefined : Number(e.target.value) })}
                min={0}
                max={200}
                className={inputClass}
                placeholder="e.g., 24"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">
                Card Color
                <span className="ml-1 text-white/30">(homepage card background)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.cardColor || "#CDDBC0"}
                  onChange={(e) => setForm({ ...form, cardColor: e.target.value })}
                  className="h-10 w-16 cursor-pointer rounded-lg border border-border-dark bg-dark-bg"
                />
                <input
                  type="text"
                  value={form.cardColor}
                  onChange={(e) => setForm({ ...form, cardColor: e.target.value })}
                  className={inputClass}
                  placeholder="#CDDBC0 — leave blank for auto"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Summary</label>
            <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Profile</label>
            <textarea value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} rows={3} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Content Focus</label>
              <input type="text" value={form.contentFocus} onChange={(e) => setForm({ ...form, contentFocus: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Visual Style</label>
              <input type="text" value={form.visualStyle} onChange={(e) => setForm({ ...form, visualStyle: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Tone</label>
              <input type="text" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/60">Brand Fit</label>
              <input type="text" value={form.brandFit} onChange={(e) => setForm({ ...form, brandFit: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FileUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              accept="image/*"
              label="Profile Image"
              placeholder="Upload image or paste URL"
              sizeHint="800×1000 portrait, JPG/PNG/WebP, max 5 MB"
            />
            <FileUpload
              value={form.videoUrl}
              onChange={(url) => setForm({ ...form, videoUrl: url })}
              accept="video/*"
              label="Video"
              placeholder="Upload video or paste URL"
              sizeHint="MP4 H.264, 1080×1350, ≤30 s, max 25 MB"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Text on Image</label>
            <input type="text" value={form.textOnImage} onChange={(e) => setForm({ ...form, textOnImage: e.target.value })} className={inputClass} placeholder="Overlay text for popup" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-white/60">
              <input type="checkbox" checked={form.showOnHomepage} onChange={(e) => setForm({ ...form, showOnHomepage: e.target.checked })} className="h-4 w-4 rounded border-border-dark bg-dark-bg text-teal-500" />
              Show on Homepage
            </label>
            <label className="flex items-center gap-2 text-sm text-white/60">
              <input type="checkbox" checked={form.showOnAiinf} onChange={(e) => setForm({ ...form, showOnAiinf: e.target.checked })} className="h-4 w-4 rounded border-border-dark bg-dark-bg text-teal-500" />
              Show on AI Influencer page
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50">
              {saving ? "Saving..." : influencer ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
