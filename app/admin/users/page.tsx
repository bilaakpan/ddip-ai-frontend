"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { usersApi, type AdminUser } from "@/lib/api";
import {
  DataTable,
  StatusBadge,
  DetailModal,
  DetailField,
} from "@/components/admin";

// ─── Types ───

type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

interface CreateUserForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "VIEWER", label: "Viewer" },
  { value: "EDITOR", label: "Editor" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
];

const emptyCreateForm: CreateUserForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "VIEWER",
};

// ─── Page Component ───

export default function UsersPage() {
  const { user: currentUser, isSuperAdmin, isLoading: authLoading } = useAuth();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Detail modal
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editRole, setEditRole] = useState<UserRole>("VIEWER");
  const [editActive, setEditActive] = useState(true);
  const [editPassword, setEditPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  // Create modal
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<CreateUserForm>(emptyCreateForm);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // ─── Load Users ───

  useEffect(() => {
    if (!isSuperAdmin) {
      setIsLoading(false);
      return;
    }

    async function loadUsers() {
      try {
        const response = await usersApi.list();
        setUsers(response.data ?? []);
      } catch {
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, [isSuperAdmin]);

  // ─── Access Check ───

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <svg
          className="h-8 w-8 animate-spin text-teal-500"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-8 py-6 text-center">
          <svg
            className="mx-auto mb-3 h-10 w-10 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <h2 className="text-lg font-medium text-red-400">Access Denied</h2>
          <p className="mt-1 text-sm text-white/40">
            Only Super Admins can manage users.
          </p>
        </div>
      </div>
    );
  }

  // ─── Handlers ───

  function handleRowClick(user: AdminUser) {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditActive(user.isActive ?? true);
    setEditPassword("");
    setSaveError("");
    setSaveSuccess("");
  }

  function closeDetailModal() {
    setSelectedUser(null);
    setEditPassword("");
    setSaveError("");
    setSaveSuccess("");
  }

  async function handleSaveUser() {
    if (!selectedUser) return;

    // Validate password if provided
    if (editPassword && editPassword.length < 8) {
      setSaveError("Password must be at least 8 characters.");
      return;
    }

    setSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const updateData: {
        role: UserRole;
        isActive: boolean;
        password?: string;
      } = {
        role: editRole,
        isActive: editActive,
      };

      // Only include password if user entered a new one
      if (editPassword) {
        updateData.password = editPassword;
      }

      const response = await usersApi.update(selectedUser.id, updateData);

      // Update list
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? response.data : u))
      );
      setSelectedUser(response.data);
      setEditPassword(""); // Clear password field after successful save

      if (editPassword) {
        setSaveSuccess("User updated and password changed successfully.");
      } else {
        setSaveSuccess("User updated successfully.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update user.";
      setSaveError(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteUser() {
    if (!selectedUser) return;

    // Prevent deleting yourself
    if (selectedUser.id === currentUser?.id) {
      setSaveError("You cannot delete your own account.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedUser.firstName} ${selectedUser.lastName}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setSaving(true);
    setSaveError("");

    try {
      await usersApi.delete(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      closeDetailModal();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete user.";
      setSaveError(message);
    } finally {
      setSaving(false);
    }
  }

  function openCreateModal() {
    setCreateForm(emptyCreateForm);
    setCreateError("");
    setShowCreate(true);
  }

  function closeCreateModal() {
    setShowCreate(false);
    setCreateError("");
  }

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateError("");

    try {
      const response = await usersApi.create({
        email: createForm.email,
        password: createForm.password,
        firstName: createForm.firstName,
        lastName: createForm.lastName,
        role: createForm.role,
      });
      setUsers((prev) => [response.data, ...prev]);
      closeCreateModal();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create user.";
      setCreateError(message);
    } finally {
      setCreating(false);
    }
  }

  // ─── Table Columns ───

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (u: AdminUser) => (
        <span className="font-medium text-white">
          {u.firstName} {u.lastName}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (u: AdminUser) => <StatusBadge status={u.role} />,
    },
    {
      key: "isActive",
      label: "Status",
      render: (u: AdminUser) => (
        <span
          className={
            u.isActive !== false
              ? "inline-flex items-center gap-1.5 text-green-400"
              : "inline-flex items-center gap-1.5 text-white/40"
          }
        >
          <span
            className={
              u.isActive !== false
                ? "h-1.5 w-1.5 rounded-full bg-green-400"
                : "h-1.5 w-1.5 rounded-full bg-white/30"
            }
          />
          {u.isActive !== false ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (u: AdminUser) =>
        u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "\u2014",
    },
  ];

  // ─── Input Styles ───

  const inputClasses =
    "w-full rounded-lg border border-[#2A2F3E] bg-[#1A1F2E] px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
  const selectClasses =
    "w-full rounded-lg border border-[#2A2F3E] bg-[#1A1F2E] px-4 py-2.5 text-sm text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
  const primaryBtnClasses =
    "rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-dark-bg transition-colors hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed";
  const secondaryBtnClasses =
    "rounded-lg border border-border-dark px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white";
  const dangerBtnClasses =
    "rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10";

  // ─── Render ───

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-white">
            User Management
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage admin users and their roles.
          </p>
        </div>

        <button onClick={openCreateModal} className={primaryBtnClasses}>
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add User
          </span>
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        emptyMessage="No users found."
      />

      {/* ─── Detail / Edit Modal ─── */}
      <DetailModal
        isOpen={!!selectedUser}
        onClose={closeDetailModal}
        title="User Details"
        actions={
          <>
            <button
              onClick={handleDeleteUser}
              disabled={saving || selectedUser?.id === currentUser?.id}
              className={dangerBtnClasses}
              title={
                selectedUser?.id === currentUser?.id
                  ? "You cannot delete your own account"
                  : undefined
              }
            >
              Delete
            </button>
            <button onClick={closeDetailModal} className={secondaryBtnClasses}>
              Cancel
            </button>
            <button
              onClick={handleSaveUser}
              disabled={saving}
              className={primaryBtnClasses}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        }
      >
        {selectedUser && (
          <div className="space-y-1">
            {saveError && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {saveError}
              </div>
            )}

            {saveSuccess && (
              <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                {saveSuccess}
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-6">
              <DetailField
                label="First Name"
                value={selectedUser.firstName}
              />
              <DetailField
                label="Last Name"
                value={selectedUser.lastName}
              />
            </div>

            <DetailField label="Email" value={selectedUser.email} />

            <DetailField
              label="Created"
              value={
                selectedUser.createdAt
                  ? new Date(selectedUser.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : undefined
              }
            />

            <DetailField
              label="Last Updated"
              value={
                selectedUser.updatedAt
                  ? new Date(selectedUser.updatedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : undefined
              }
            />

            {/* Editable Role */}
            <div className="py-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/40">
                Role
              </label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value as UserRole)}
                className={selectClasses}
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Editable Active Status */}
            <div className="py-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/40">
                Account Status
              </label>
              <button
                type="button"
                onClick={() => setEditActive(!editActive)}
                className="flex items-center gap-3 rounded-lg border border-[#2A2F3E] bg-[#1A1F2E] px-4 py-2.5"
              >
                {/* Toggle Switch */}
                <span
                  className={
                    editActive
                      ? "relative inline-flex h-5 w-9 items-center rounded-full bg-teal-500 transition-colors"
                      : "relative inline-flex h-5 w-9 items-center rounded-full bg-white/20 transition-colors"
                  }
                >
                  <span
                    className={
                      editActive
                        ? "inline-block h-3.5 w-3.5 translate-x-4 transform rounded-full bg-white transition-transform"
                        : "inline-block h-3.5 w-3.5 translate-x-0.5 transform rounded-full bg-white transition-transform"
                    }
                  />
                </span>
                <span className="text-sm text-white/80">
                  {editActive ? "Active" : "Inactive"}
                </span>
              </button>
            </div>

            {/* Change Password */}
            <div className="py-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/40">
                Change Password
              </label>
              <input
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                minLength={8}
                autoComplete="new-password"
                className={inputClasses}
              />
              <p className="mt-1.5 text-xs text-white/40">
                Minimum 8 characters. Leave blank to keep the existing password.
              </p>
            </div>

            <DetailField label="User ID" value={selectedUser.id} />
          </div>
        )}
      </DetailModal>

      {/* ─── Create User Modal ─── */}
      <DetailModal
        isOpen={showCreate}
        onClose={closeCreateModal}
        title="Create New User"
        actions={
          <>
            <button onClick={closeCreateModal} className={secondaryBtnClasses}>
              Cancel
            </button>
            <button
              type="submit"
              form="create-user-form"
              disabled={creating}
              className={primaryBtnClasses}
            >
              {creating ? "Creating..." : "Create User"}
            </button>
          </>
        }
      >
        <form
          id="create-user-form"
          onSubmit={handleCreateUser}
          className="space-y-4"
        >
          {createError && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {createError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/60">
                First Name
              </label>
              <input
                type="text"
                required
                value={createForm.firstName}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, firstName: e.target.value }))
                }
                placeholder="John"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/60">
                Last Name
              </label>
              <input
                type="text"
                required
                value={createForm.lastName}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, lastName: e.target.value }))
                }
                placeholder="Doe"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">
              Email
            </label>
            <input
              type="email"
              required
              value={createForm.email}
              onChange={(e) =>
                setCreateForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="user@ddip.ai"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={createForm.password}
              onChange={(e) =>
                setCreateForm((f) => ({ ...f, password: e.target.value }))
              }
              placeholder="Minimum 8 characters"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/60">
              Role
            </label>
            <select
              value={createForm.role}
              onChange={(e) =>
                setCreateForm((f) => ({
                  ...f,
                  role: e.target.value as UserRole,
                }))
              }
              className={selectClasses}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </DetailModal>
    </div>
  );
}
