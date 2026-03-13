"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DataTable,
  StatusBadge,
  Pagination,
  DetailModal,
  DetailField,
} from "@/components/admin";
import { contactsApi, type ContactSubmission } from "@/lib/api";

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

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Detail modal state
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchContacts = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await contactsApi.list({ page: String(p), limit: "10" });
      setContacts(res.data);
      setTotalPages(res.pagination.totalPages);
      setTotal(res.pagination.total);
    } catch {
      setContacts([]);
      setTotalPages(1);
      setTotal(0);
      setError("Could not load contacts. The backend may not be running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts(page);
  }, [page, fetchContacts]);

  const openDetail = (item: ContactSubmission) => {
    setSelected(item);
    setModalOpen(true);
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (item: ContactSubmission) => (
        <span className="font-medium text-white">{item.name}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "subject",
      label: "Subject",
      render: (item: ContactSubmission) => (
        <span className="text-white/60">{item.subject || "\u2014"}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: ContactSubmission) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item: ContactSubmission) => (
        <span className="text-white/50">{formatDate(item.createdAt)}</span>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-white">
          Contact Submissions
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Review messages from the contact form.
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
        data={contacts}
        onRowClick={openDetail}
        isLoading={loading}
        emptyMessage="No contact submissions yet."
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
        title="Contact Submission"
      >
        {selected && (
          <div className="space-y-1">
            <DetailField label="Name" value={selected.name} />
            <DetailField label="Email" value={selected.email} />
            <DetailField label="Phone" value={selected.phone} />
            <DetailField label="Subject" value={selected.subject} />
            <DetailField
              label="Status"
              value={<StatusBadge status={selected.status} />}
            />
            <DetailField label="Source" value={selected.source} />
            <DetailField
              label="Message"
              value={
                <div className="mt-1 whitespace-pre-wrap rounded-lg border border-border-dark bg-dark-bg p-3 text-sm text-white/80">
                  {selected.message}
                </div>
              }
            />
            <DetailField
              label="Submitted"
              value={formatDate(selected.createdAt)}
            />
          </div>
        )}
      </DetailModal>
    </div>
  );
}
