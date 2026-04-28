"use client";

import { useState, useRef } from "react";
import { uploadFile } from "@/lib/api";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  placeholder?: string;
  /**
   * Recommended size hint shown under the label (e.g. "1920×1080, JPG/PNG/WebP, max 5 MB").
   * Helps content editors upload correctly-sized assets.
   */
  sizeHint?: string;
  /**
   * Pixel dimensions to validate after the user selects a file.
   * If set and the uploaded image does NOT match, the user gets a confirm
   * prompt with the actual vs expected size before the upload proceeds.
   */
  recommendedDimensions?: { width: number; height: number };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function getFullUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  // Convert relative /uploads/... path to full backend URL
  const base = API_BASE_URL.replace(/\/api$/, "");
  return `${base}${url}`;
}

export default function FileUpload({
  value,
  onChange,
  accept = "image/*,video/*",
  label = "Media",
  placeholder = "Upload a file or paste URL",
  sizeHint,
  recommendedDimensions,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Read pixel dimensions for image files only; returns null for non-images. */
  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number } | null> =>
    new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve(null);
        return;
      }
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });

  const handleFile = async (file: File) => {
    if (recommendedDimensions) {
      const dims = await getImageDimensions(file);
      if (
        dims &&
        (dims.width !== recommendedDimensions.width ||
          dims.height !== recommendedDimensions.height)
      ) {
        const proceed = window.confirm(
          `This image is ${dims.width}×${dims.height}.\n` +
            `Recommended: ${recommendedDimensions.width}×${recommendedDimensions.height}.\n\n` +
            `Upload anyway?`
        );
        if (!proceed) return;
      }
    }

    setUploading(true);
    try {
      const res = await uploadFile(file);
      onChange(res.data.url);
    } catch (err) {
      console.error("[FileUpload] upload failed:", err);
      const msg =
        err instanceof Error ? err.message : "Please try again.";
      alert(`Upload failed. ${msg}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const isImage = value && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value);
  const fullUrl = getFullUrl(value);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-white/60">
        {label}
        {sizeHint && (
          <span className="ml-2 text-xs font-normal text-white/30">
            ({sizeHint})
          </span>
        )}
      </label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-4 transition-colors ${
          dragOver
            ? "border-teal-500 bg-teal-500/5"
            : "border-border-dark bg-dark-bg hover:border-white/20"
        }`}
      >
        {uploading ? (
          <p className="text-sm text-teal-400">Uploading...</p>
        ) : value ? (
          <div className="flex w-full items-center gap-3">
            {isImage && fullUrl && (
              <img
                src={fullUrl}
                alt="Preview"
                className="h-12 w-12 rounded-lg object-cover"
              />
            )}
            <p className="flex-1 truncate text-xs text-white/60">{value}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="shrink-0 rounded p-1 text-white/30 hover:text-red-400"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <svg
              className="mb-1 h-6 w-6 text-white/20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-xs text-white/30">
              Drop file here or click to browse
            </p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Fallback URL input */}
      <div className="mt-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border-dark bg-dark-bg px-3 py-1.5 text-xs text-white/60 placeholder-white/20 focus:border-teal-500 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
