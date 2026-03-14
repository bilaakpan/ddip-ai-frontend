"use client";

import { useState, useEffect, useCallback } from "react";
import { faqsApi, type Faq } from "@/lib/api";

const PAGE_OPTIONS = [
  { value: "main", label: "Main Page" },
  { value: "ai-influencer", label: "AI Influencer" },
  { value: "automation", label: "AI Automation" },
  { value: "ai-content", label: "AI Content Creation" },
  { value: "ai-commercial", label: "AI Commercial" },
];

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [editing, setEditing] = useState<Faq | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await faqsApi.list(selectedPage || undefined);
      setFaqs(res.data);
    } catch {
      // Backend may not be running
    } finally {
      setLoading(false);
    }
  }, [selectedPage]);

  useEffect(() => {
    setLoading(true);
    fetchFaqs();
  }, [fetchFaqs]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await faqsApi.delete(id);
      fetchFaqs();
    } catch {
      alert("Failed to delete FAQ");
    }
  };

  // Group FAQs by page
  const groupedFaqs = faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
    if (!acc[faq.pageSlug]) acc[faq.pageSlug] = [];
    acc[faq.pageSlug].push(faq);
    return acc;
  }, {});

  const getPageLabel = (slug: string) =>
    PAGE_OPTIONS.find((p) => p.value === slug)?.label ?? slug;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-white">FAQs</h1>
          <p className="mt-1 text-sm text-white/40">
            Manage FAQ items per page section.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          + Add FAQ
        </button>
      </div>

      {/* Page Filter */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setSelectedPage("")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedPage === ""
              ? "bg-teal-500/10 text-teal-500"
              : "text-white/40 hover:text-white"
          }`}
        >
          All Pages
        </button>
        {PAGE_OPTIONS.map((page) => (
          <button
            key={page.value}
            onClick={() => setSelectedPage(page.value)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedPage === page.value
                ? "bg-teal-500/10 text-teal-500"
                : "text-white/40 hover:text-white"
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="mt-6 space-y-6">
        {loading ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            Loading...
          </div>
        ) : faqs.length === 0 ? (
          <div className="rounded-xl border border-border-dark bg-dark-surface p-8 text-center text-white/40">
            No FAQs found. Click &quot;+ Add FAQ&quot; to create one.
          </div>
        ) : (
          Object.entries(groupedFaqs).map(([pageSlug, items]) => (
            <div key={pageSlug}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/30">
                {getPageLabel(pageSlug)} ({items.length})
              </h3>
              <div className="space-y-2">
                {items.map((faq) => (
                  <div
                    key={faq.id}
                    className="flex items-start gap-4 rounded-xl border border-border-dark bg-dark-surface p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {faq.question}
                      </p>
                      <p className="mt-1 text-xs text-white/40 line-clamp-2">
                        {faq.answer}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => {
                          setEditing(faq);
                          setShowForm(true);
                        }}
                        className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <FaqForm
          faq={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchFaqs();
          }}
        />
      )}
    </div>
  );
}

function FaqForm({
  faq,
  onClose,
  onSaved,
}: {
  faq: Faq | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    pageSlug: faq?.pageSlug ?? "main",
    question: faq?.question ?? "",
    answer: faq?.answer ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (faq) {
        await faqsApi.update(faq.id, form);
      } else {
        await faqsApi.create(form);
      }
      onSaved();
    } catch {
      alert("Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border-dark bg-dark-surface p-6">
        <h2 className="font-heading text-lg font-medium text-white">
          {faq ? "Edit FAQ" : "Add FAQ"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Page *
            </label>
            <select
              value={form.pageSlug}
              onChange={(e) => setForm({ ...form, pageSlug: e.target.value })}
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white focus:border-teal-500 focus:outline-none"
            >
              {PAGE_OPTIONS.map((page) => (
                <option key={page.value} value={page.value}>
                  {page.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Question *
            </label>
            <input
              type="text"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              required
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
              placeholder="e.g., What is an AI influencer?"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/60">
              Answer *
            </label>
            <textarea
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              required
              rows={4}
              className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-teal-500 focus:outline-none"
              placeholder="Plain text answer..."
            />
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
              {saving ? "Saving..." : faq ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
