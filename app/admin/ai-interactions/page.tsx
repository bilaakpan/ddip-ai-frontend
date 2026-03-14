"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DataTable,
  Pagination,
  DetailModal,
  DetailField,
} from "@/components/admin";
import { aiInteractionsApi, type AIInteraction } from "@/lib/api";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max) + "...";
}

export default function AIInteractionsPage() {
  const [interactions, setInteractions] = useState<AIInteraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Detail modal state
  const [selected, setSelected] = useState<AIInteraction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchInteractions = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiInteractionsApi.list({
        page: String(p),
        limit: "10",
      });
      setInteractions(res.data);
      setTotalPages(res.pagination.totalPages);
      setTotal(res.pagination.total);
    } catch {
      setInteractions([]);
      setTotalPages(1);
      setTotal(0);
      setError(
        "Could not load AI interactions. The backend may not be running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInteractions(page);
  }, [page, fetchInteractions]);

  const openDetail = (item: AIInteraction) => {
    setSelected(item);
    setModalOpen(true);
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (item: AIInteraction) => (
        <span className="font-medium text-white">
          {item.name || "Anonymous"}
        </span>
      ),
    },
    {
      key: "message",
      label: "Message",
      render: (item: AIInteraction) => (
        <span className="text-white/60">{truncate(item.message, 60)}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (item: AIInteraction) => (
        <span className="text-white/60">{item.category || "\u2014"}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item: AIInteraction) => (
        <span className="text-white/50">{formatDate(item.createdAt)}</span>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-white">
          AI Interactions
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Browse user interactions with the AI assistant.
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
        data={interactions}
        onRowClick={openDetail}
        isLoading={loading}
        emptyMessage="No AI interactions recorded yet."
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="AI Interaction"
      >
        {selected && (
          <div className="space-y-1">
            <DetailField
              label="Name"
              value={selected.name || "Anonymous"}
            />
            <DetailField label="Email" value={selected.email} />
            <DetailField label="Phone" value={selected.phone} />
            <DetailField label="Category" value={selected.category} />
            <DetailField label="Source" value={selected.source} />
            <DetailField label="IP Address" value={selected.ipAddress} />
            <DetailField
              label="Message"
              value={
                <div className="mt-1 whitespace-pre-wrap rounded-lg border border-border-dark bg-dark-bg p-3 text-sm text-white/80">
                  {selected.message}
                </div>
              }
            />
            <DetailField
              label="Date"
              value={formatDate(selected.createdAt)}
            />
          </div>
        )}
      </DetailModal>
    </div>
  );
}
