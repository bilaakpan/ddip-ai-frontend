"use client";

import { useState, useEffect, useCallback } from "react";
import { automationsApi, type Automation } from "@/lib/api";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Automation | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAutomations = useCallback(async () => {
    try {
      const res = await automationsApi.list();
      setAutomations(res.data);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAutomations();
  }, [fetchAutomations]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this automation?")) return;
    try {
      await automationsApi.delete(id);
      fetchAutomations();
    } catch {
      alert("Failed to delete automation");
    }
  };

  const handleToggleHighlight = async (auto: Automation) => {
    try {
      await automationsApi.update(auto.id, { isHighlighted: !auto.isHighlighted });
      fetchAutomations();
    } catch {
      alert("Failed to update automation");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">
            Automations
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage automation template cards. {automations.length} total.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add Automation
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : automations.length === 0 ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No automations yet. Click &quot;+ Add Automation&quot; to create one.
          </div>
        ) : (
          automations.map((auto) => (
            <div
              key={auto.id}
              className="flex items-center gap-4 rounded-xl border border-border-dark bg-dark-surface p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-sm font-bold text-teal-500">
                {auto.sortOrder + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">{auto.title}</p>
                <p className="mt-0.5 text-xs text-white/40">
                  {auto.icons?.length ? `${auto.icons.length} icons` : "No icons"}
                </p>
              </div>

              <button
                onClick={() => handleToggleHighlight(auto)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  auto.isHighlighted
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {auto.isHighlighted ? "Highlighted" : "Normal"}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(auto);
                    setShowForm(true);
                  }}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(auto.id)}
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
        <AutomationForm
          automation={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchAutomations();
          }}
        />
      )}
    </div>
  );
}

function AutomationForm({
  automation,
  onClose,
  onSaved,
}: {
  automation: Automation | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: automation?.title ?? "",
    isHighlighted: automation?.isHighlighted ?? false,
    sortOrder: automation?.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (automation) {
        await automationsApi.update(automation.id, form);
      } else {
        await automationsApi.create(form);
      }
      onSaved();
    } catch {
      alert("Failed to save automation");
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
          {automation ? "Edit Automation" : "Add Automation"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className={inputClass} />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="checkbox" checked={form.isHighlighted} onChange={(e) => setForm({ ...form, isHighlighted: e.target.checked })} className="h-4 w-4 rounded border-border-dark bg-dark-bg text-teal-500" />
            Highlighted (show on main automations page)
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50">
              {saving ? "Saving..." : automation ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
