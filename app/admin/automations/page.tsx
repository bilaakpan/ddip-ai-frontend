"use client";

import { useState, useEffect, useCallback } from "react";
import { automationsApi, type Automation, type AutomationIcon } from "@/lib/api";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [icons, setIcons] = useState<AutomationIcon[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Automation | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showIconManager, setShowIconManager] = useState(false);

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

  const fetchIcons = useCallback(async () => {
    try {
      const res = await automationsApi.listIcons();
      setIcons(res.data);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchAutomations();
    fetchIcons();
  }, [fetchAutomations, fetchIcons]);

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
        <div className="flex gap-2">
          <button
            onClick={() => setShowIconManager(true)}
            className="rounded-lg border border-border-dark px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            Manage Icons
          </button>
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
                  {auto.icons?.length ? (
                    <span className="flex items-center gap-1">
                      {auto.icons.slice(0, 5).map((ai) => (
                        <img key={ai.icon.id} src={ai.icon.iconUrl} alt={ai.icon.name} className="inline-block h-4 w-4 rounded" />
                      ))}
                      {auto.icons.length > 5 && <span>+{auto.icons.length - 5} more</span>}
                    </span>
                  ) : "No icons"}
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
          availableIcons={icons}
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

      {showIconManager && (
        <IconManager
          icons={icons}
          onClose={() => setShowIconManager(false)}
          onChanged={() => {
            fetchIcons();
            fetchAutomations();
          }}
        />
      )}
    </div>
  );
}

function AutomationForm({
  automation,
  availableIcons,
  onClose,
  onSaved,
}: {
  automation: Automation | null;
  availableIcons: AutomationIcon[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: automation?.title ?? "",
    isHighlighted: automation?.isHighlighted ?? false,
    sortOrder: automation?.sortOrder ?? 0,
  });
  const [selectedIconIds, setSelectedIconIds] = useState<string[]>(
    automation?.icons?.map((ai) => ai.icon.id) ?? []
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (automation) {
        await automationsApi.update(automation.id, { ...form, iconIds: selectedIconIds });
      } else {
        await automationsApi.create({ ...form, iconIds: selectedIconIds });
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

          {/* Icon Selection */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">Icons</label>
            {availableIcons.length === 0 ? (
              <p className="text-xs text-white/30">No icons available. Use &quot;Manage Icons&quot; to add some.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableIcons.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() =>
                      setSelectedIconIds((prev) =>
                        prev.includes(icon.id)
                          ? prev.filter((id) => id !== icon.id)
                          : [...prev, icon.id]
                      )
                    }
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                      selectedIconIds.includes(icon.id)
                        ? "border-teal-500 bg-teal-500/10 text-teal-400"
                        : "border-border-dark bg-white/5 text-white/40 hover:text-white"
                    }`}
                  >
                    <img src={icon.iconUrl} alt={icon.name} className="h-4 w-4 rounded" />
                    {icon.name}
                  </button>
                ))}
              </div>
            )}
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

function IconManager({
  icons,
  onClose,
  onChanged,
}: {
  icons: AutomationIcon[];
  onClose: () => void;
  onChanged: () => void;
}) {
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newName.trim() || !newUrl.trim()) return;
    setCreating(true);
    try {
      await automationsApi.createIcon({ name: newName.trim(), iconUrl: newUrl.trim() });
      setNewName("");
      setNewUrl("");
      onChanged();
    } catch {
      alert("Failed to create icon");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this icon? It will be removed from all automations.")) return;
    try {
      await automationsApi.deleteIcon(id);
      onChanged();
    } catch {
      alert("Failed to delete icon");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          Manage Icons
        </h2>
        <p className="mt-1 text-xs text-white/40">
          Add or remove icons from the shared icon library.
        </p>

        {/* Existing Icons */}
        <div className="mt-4 max-h-[40vh] space-y-2 overflow-y-auto">
          {icons.length === 0 ? (
            <p className="py-4 text-center text-sm text-white/30">No icons yet.</p>
          ) : (
            icons.map((icon) => (
              <div
                key={icon.id}
                className="flex items-center gap-3 rounded-lg border border-border-dark bg-dark-bg p-3"
              >
                <img src={icon.iconUrl} alt={icon.name} className="h-8 w-8 rounded" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">{icon.name}</p>
                  <p className="truncate text-xs text-white/30">{icon.iconUrl}</p>
                </div>
                <button
                  onClick={() => handleDelete(icon.id)}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add New Icon */}
        <div className="mt-4 border-t border-border-dark pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">Add New Icon</p>
          <div className="space-y-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Icon name (e.g., Slack)"
              className={inputClass}
            />
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Icon URL (e.g., https://...)"
              className={inputClass}
            />
            <button
              type="button"
              onClick={handleCreate}
              disabled={creating || !newName.trim() || !newUrl.trim()}
              className="w-full rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50"
            >
              {creating ? "Adding..." : "Add Icon"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
