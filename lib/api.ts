const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface ApiOptions extends RequestInit {
  token?: string;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Get stored JWT token from localStorage.
 */
function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ddip_admin_token");
}

/**
 * Fetch wrapper for API calls.
 * Handles JSON serialization, auth headers, and error responses.
 * Automatically attaches stored JWT token for admin routes.
 */
async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  // Auto-attach stored token for admin routes if no explicit token
  const authToken = token || (endpoint.startsWith("/admin") ? getStoredToken() : null);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    // Auto-redirect to login on 401 for admin routes
    if (
      response.status === 401 &&
      endpoint.startsWith("/admin") &&
      !endpoint.includes("/auth/login") &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("ddip_admin_token");
      localStorage.removeItem("ddip_admin_user");
      window.location.href = "/admin/login";
    }

    throw new ApiError(
      response.status,
      errorData?.error || `API error: ${response.status}`,
      errorData
    );
  }

  return response.json();
}

// ─── Response Types ───

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─── Entity Types ───

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectSubmission {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  projectType?: string;
  projectDescription?: string;
  influencerDetails?: Record<string, unknown>;
  styleReference?: string;
  brandGuide?: string;
  briefDetails?: string;
  briefFile?: string;
  source?: string;
  status: "NEW" | "IN_REVIEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
  status: "NEW" | "RESPONDED" | "ARCHIVED";
  createdAt: string;
}

export interface AIInteraction {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  message: string;
  category?: string;
  source?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface ContentBlock {
  id: string;
  key: string;
  value: string;
  type: "TEXT" | "HTML" | "JSON" | "IMAGE_URL";
  updatedBy?: string;
  updatedAt: string;
}

// ─── Public API ───

export const publicApi = {
  /** Submit AI interaction */
  submitAIInteraction: (data: {
    name?: string;
    email?: string;
    phone?: string;
    message: string;
    category?: string;
  }) =>
    apiClient<ApiResponse<{ id: string }>>("/ai-interaction", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** Submit project brief */
  submitProject: (data: Record<string, unknown>) =>
    apiClient<ApiResponse<{ id: string }>>("/project/submit", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** Submit contact form */
  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) =>
    apiClient<ApiResponse<{ id: string }>>("/contact/submit", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** Get dynamic content by key */
  getContent: (key: string) =>
    apiClient<ApiResponse<ContentBlock>>(`/content/${key}`),
};

// ─── Admin Auth API ───

export const authApi = {
  login: (email: string, password: string) =>
    apiClient<ApiResponse<{ token: string; user: AdminUser }>>(
      "/admin/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    ),

  refresh: (token: string) =>
    apiClient<ApiResponse<{ token: string }>>("/admin/auth/refresh", {
      method: "POST",
      token,
    }),
};

// ─── Admin Projects API ───

export const projectsApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return apiClient<PaginatedResponse<ProjectSubmission>>(`/admin/projects${query}`);
  },
  get: (id: string) =>
    apiClient<ApiResponse<ProjectSubmission>>(`/admin/projects/${id}`),
  update: (id: string, data: { status?: string; internalNotes?: string }) =>
    apiClient<ApiResponse<ProjectSubmission>>(`/admin/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/projects/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin Contacts API ───

export const contactsApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return apiClient<PaginatedResponse<ContactSubmission>>(`/admin/contacts${query}`);
  },
  get: (id: string) =>
    apiClient<ApiResponse<ContactSubmission>>(`/admin/contacts/${id}`),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/contacts/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin AI Interactions API ───

export const aiInteractionsApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return apiClient<PaginatedResponse<AIInteraction>>(`/admin/ai-interactions${query}`);
  },
  get: (id: string) =>
    apiClient<ApiResponse<AIInteraction>>(`/admin/ai-interactions/${id}`),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/ai-interactions/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin Content API ───

export const contentApi = {
  list: () => apiClient<ApiResponse<ContentBlock[]>>("/admin/content"),
  get: (key: string) =>
    apiClient<ApiResponse<ContentBlock>>(`/admin/content/${key}`),
  update: (key: string, data: { value: string; type?: string }) =>
    apiClient<ApiResponse<ContentBlock>>(`/admin/content/${key}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ─── Admin Users API ───

export const usersApi = {
  list: () => apiClient<ApiResponse<AdminUser[]>>("/admin/users"),
  get: (id: string) => apiClient<ApiResponse<AdminUser>>(`/admin/users/${id}`),
  create: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) =>
    apiClient<ApiResponse<AdminUser>>("/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      role?: string;
      isActive?: boolean;
      password?: string;
    }
  ) =>
    apiClient<ApiResponse<AdminUser>>(`/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/users/${id}`, {
      method: "DELETE",
    }),
};

// ─── Entity Types (CMS) ───

export interface HeroSlider {
  id: string;
  problem: string;
  solution: string;
  videoUrl?: string;
  buttonText?: string;
  buttonHref?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: string;
  pageSlug: string;
  question: string;
  answer: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Work {
  id: string;
  title: string;
  body?: string;
  field?: string;
  mediaUrl?: string;
  mediaType?: string;
  isHighlighted: boolean;
  sortOrder: number;
  tags?: { tag: Tag }[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  category: string;
  createdAt: string;
}

export interface FilterOption {
  id: string;
  group: string;
  value: string;
  sortOrder: number;
}

// ─── Admin Hero Sliders API ───

export const heroSlidersApi = {
  list: () =>
    apiClient<ApiResponse<HeroSlider[]>>("/admin/hero-sliders"),
  get: (id: string) =>
    apiClient<ApiResponse<HeroSlider>>(`/admin/hero-sliders/${id}`),
  create: (data: Partial<HeroSlider>) =>
    apiClient<ApiResponse<HeroSlider>>("/admin/hero-sliders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<HeroSlider>) =>
    apiClient<ApiResponse<HeroSlider>>(`/admin/hero-sliders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/hero-sliders/${id}`, {
      method: "DELETE",
    }),
  reorder: (items: { id: string; sortOrder: number }[]) =>
    apiClient<ApiResponse<HeroSlider[]>>("/admin/hero-sliders/reorder", {
      method: "PATCH",
      body: JSON.stringify({ items }),
    }),
};

// ─── Admin FAQs API ───

export const faqsApi = {
  list: (pageSlug?: string) => {
    const query = pageSlug ? `?page_slug=${pageSlug}` : "";
    return apiClient<ApiResponse<Faq[]>>(`/admin/faqs${query}`);
  },
  get: (id: string) =>
    apiClient<ApiResponse<Faq>>(`/admin/faqs/${id}`),
  create: (data: { pageSlug: string; question: string; answer: string; sortOrder?: number }) =>
    apiClient<ApiResponse<Faq>>("/admin/faqs", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Faq>) =>
    apiClient<ApiResponse<Faq>>(`/admin/faqs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/faqs/${id}`, {
      method: "DELETE",
    }),
  reorder: (items: { id: string; sortOrder: number }[]) =>
    apiClient<ApiResponse<{ reordered: boolean }>>("/admin/faqs/reorder", {
      method: "PATCH",
      body: JSON.stringify({ items }),
    }),
};

// ─── Admin Works API ───

export const worksApi = {
  list: () =>
    apiClient<ApiResponse<Work[]>>("/admin/works"),
  get: (id: string) =>
    apiClient<ApiResponse<Work>>(`/admin/works/${id}`),
  create: (data: Partial<Work> & { tagIds?: string[] }) =>
    apiClient<ApiResponse<Work>>("/admin/works", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Work> & { tagIds?: string[] }) =>
    apiClient<ApiResponse<Work>>(`/admin/works/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/works/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin Tags API ───

export const tagsApi = {
  list: (category?: string) => {
    const query = category ? `?category=${category}` : "";
    return apiClient<ApiResponse<Tag[]>>(`/admin/tags${query}`);
  },
  create: (data: { name: string; category: string }) =>
    apiClient<ApiResponse<Tag>>("/admin/tags", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/tags/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin Filter Options API ───

export const filterOptionsApi = {
  list: (group?: string) => {
    const query = group ? `?group=${group}` : "";
    return apiClient<ApiResponse<FilterOption[]>>(`/admin/filter-options${query}`);
  },
  create: (data: { group: string; value: string; sortOrder?: number }) =>
    apiClient<ApiResponse<FilterOption>>("/admin/filter-options", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/filter-options/${id}`, {
      method: "DELETE",
    }),
};

// ─── Entity Types (CMS — Extended) ───

export interface Influencer {
  id: string;
  name: string;
  surname?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  language?: string;
  category?: string;
  persona?: string;
  gender?: string;
  title?: string;
  age?: number;
  summary?: string;
  profile?: string;
  contentFocus?: string;
  visualStyle?: string;
  tone?: string;
  brandFit?: string;
  imageUrl?: string;
  videoUrl?: string;
  textOnImage?: string;
  cardColor?: string;
  showOnHomepage: boolean;
  showOnAiinf: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AiSolution {
  id: string;
  title: string;
  body?: string;
  mediaUrl?: string;
  mediaType?: string;
  slug: string;
  sortOrder: number;
  tags?: { tag: Tag }[];
  createdAt: string;
  updatedAt: string;
}

export interface Automation {
  id: string;
  title: string;
  isHighlighted: boolean;
  sortOrder: number;
  icons?: { icon: AutomationIcon }[];
  createdAt: string;
  updatedAt: string;
}

export interface AutomationIcon {
  id: string;
  name: string;
  iconUrl: string;
  createdAt: string;
}

export interface UseCase {
  id: string;
  brand: string;
  mediaUrl?: string;
  mediaType?: string;
  pageSlug: string;
  sortOrder: number;
  tags?: { tag: Tag }[];
  createdAt: string;
  updatedAt: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  category?: string;
  imageUrl?: string;
  body: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Admin Influencers API ───

export const influencersApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return apiClient<ApiResponse<Influencer[]>>(`/admin/influencers${query}`);
  },
  get: (id: string) =>
    apiClient<ApiResponse<Influencer>>(`/admin/influencers/${id}`),
  create: (data: Partial<Influencer>) =>
    apiClient<ApiResponse<Influencer>>("/admin/influencers", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Influencer>) =>
    apiClient<ApiResponse<Influencer>>(`/admin/influencers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/influencers/${id}`, {
      method: "DELETE",
    }),
  reorder: (items: { id: string; sortOrder: number }[]) =>
    apiClient<ApiResponse<{ reordered: boolean }>>("/admin/influencers/reorder", {
      method: "PATCH",
      body: JSON.stringify({ items }),
    }),
};

// ─── Admin AI Solutions API ───

export const aiSolutionsApi = {
  list: () =>
    apiClient<ApiResponse<AiSolution[]>>("/admin/ai-solutions"),
  get: (id: string) =>
    apiClient<ApiResponse<AiSolution>>(`/admin/ai-solutions/${id}`),
  create: (data: Partial<AiSolution> & { tagIds?: string[] }) =>
    apiClient<ApiResponse<AiSolution>>("/admin/ai-solutions", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<AiSolution> & { tagIds?: string[] }) =>
    apiClient<ApiResponse<AiSolution>>(`/admin/ai-solutions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/ai-solutions/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin Automations API ───

export const automationsApi = {
  list: () =>
    apiClient<ApiResponse<Automation[]>>("/admin/automations"),
  get: (id: string) =>
    apiClient<ApiResponse<Automation>>(`/admin/automations/${id}`),
  create: (data: Partial<Automation> & { iconIds?: string[] }) =>
    apiClient<ApiResponse<Automation>>("/admin/automations", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Automation> & { iconIds?: string[] }) =>
    apiClient<ApiResponse<Automation>>(`/admin/automations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/automations/${id}`, {
      method: "DELETE",
    }),
  listIcons: () =>
    apiClient<ApiResponse<AutomationIcon[]>>("/admin/automations/icons"),
  createIcon: (data: { name: string; iconUrl: string }) =>
    apiClient<ApiResponse<AutomationIcon>>("/admin/automations/icons", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteIcon: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/automations/icons/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin Use Cases API ───

export const useCasesApi = {
  list: (pageSlug?: string) => {
    const query = pageSlug ? `?page_slug=${pageSlug}` : "";
    return apiClient<ApiResponse<UseCase[]>>(`/admin/use-cases${query}`);
  },
  get: (id: string) =>
    apiClient<ApiResponse<UseCase>>(`/admin/use-cases/${id}`),
  create: (data: Partial<UseCase> & { tagIds?: string[] }) =>
    apiClient<ApiResponse<UseCase>>("/admin/use-cases", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<UseCase> & { tagIds?: string[] }) =>
    apiClient<ApiResponse<UseCase>>(`/admin/use-cases/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/use-cases/${id}`, {
      method: "DELETE",
    }),
};

// ─── Admin Insights API ───

export const insightsApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return apiClient<PaginatedResponse<Insight>>(`/admin/insights${query}`);
  },
  get: (id: string) =>
    apiClient<ApiResponse<Insight>>(`/admin/insights/${id}`),
  create: (data: Partial<Insight>) =>
    apiClient<ApiResponse<Insight>>("/admin/insights", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Insight>) =>
    apiClient<ApiResponse<Insight>>(`/admin/insights/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<ApiResponse<{ deleted: boolean }>>(`/admin/insights/${id}`, {
      method: "DELETE",
    }),
};

// ─── File Upload API ───

export interface UploadResult {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export async function uploadFile(file: File): Promise<ApiResponse<UploadResult>> {
  const token = getStoredToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/admin/upload`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      errorData?.error || `Upload failed: ${response.status}`,
      errorData
    );
  }

  return response.json();
}

// ─── Public CMS API (no auth required) ───

export const cmsApi = {
  /** Get active hero sliders */
  heroSliders: () =>
    apiClient<ApiResponse<HeroSlider[]>>("/cms/hero-sliders"),

  /** Get FAQs for a specific page */
  faqs: (pageSlug: string) =>
    apiClient<ApiResponse<Faq[]>>(`/cms/faqs?page_slug=${pageSlug}`),

  /** Get works, optionally filtered by highlighted */
  works: (highlighted?: boolean) => {
    const query = highlighted ? "?highlighted=true" : "";
    return apiClient<ApiResponse<Work[]>>(`/cms/works${query}`);
  },

  /** Get all AI solutions */
  aiSolutions: () =>
    apiClient<ApiResponse<AiSolution[]>>("/cms/ai-solutions"),

  /** Get a single AI solution by slug */
  aiSolutionBySlug: (slug: string) =>
    apiClient<ApiResponse<AiSolution>>(`/cms/ai-solutions/${slug}`),

  /** Get influencers, with optional filters */
  influencers: (params?: { category?: string; region?: string; homepage?: boolean }) => {
    const search = new URLSearchParams();
    if (params?.category) search.set("category", params.category);
    if (params?.region) search.set("region", params.region);
    if (params?.homepage) search.set("homepage", "true");
    const query = search.toString() ? `?${search.toString()}` : "";
    return apiClient<ApiResponse<Influencer[]>>(`/cms/influencers${query}`);
  },

  /** Get automations, optionally filtered by highlighted */
  automations: (highlighted?: boolean) => {
    const query = highlighted ? "?highlighted=true" : "";
    return apiClient<ApiResponse<Automation[]>>(`/cms/automations${query}`);
  },

  /** Get use cases for a specific page */
  useCases: (pageSlug: string) =>
    apiClient<ApiResponse<UseCase[]>>(`/cms/use-cases?page_slug=${pageSlug}`),

  /** Get paginated insights */
  insights: (params?: { page?: number; limit?: number; category?: string }) => {
    const search = new URLSearchParams();
    if (params?.page) search.set("page", String(params.page));
    if (params?.limit) search.set("limit", String(params.limit));
    if (params?.category) search.set("category", params.category);
    const query = search.toString() ? `?${search.toString()}` : "";
    return apiClient<PaginatedResponse<Insight>>(`/cms/insights${query}`);
  },

  /** Get a single insight by slug */
  insightBySlug: (slug: string) =>
    apiClient<ApiResponse<Insight>>(`/cms/insights/${slug}`),

  /** Get filter options by group */
  filterOptions: (group: string) =>
    apiClient<ApiResponse<FilterOption[]>>(`/cms/filter-options?group=${group}`),
};

export { apiClient, ApiError };
