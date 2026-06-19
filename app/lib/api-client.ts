const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("mcp_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("mcp_token");
    window.location.href = "/signin";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Auth
  signup: (data: { name: string; email: string; password: string }) =>
    request<{ token: string; user: Record<string, unknown> }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  signin: (data: { email: string; password: string }) =>
    request<{ token: string; user: Record<string, unknown> }>("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () =>
    request<{ user: Record<string, unknown>; consent: Record<string, boolean> }>("/api/auth/me"),

  // Consent
  getConsent: () =>
    request<{ qa: boolean; alerts: boolean; fd: boolean; investments: boolean }>("/api/consent/"),

  updateConsent: (data: {
    qa?: boolean;
    alerts?: boolean;
    fd?: boolean;
    investments?: boolean;
  }) =>
    request<{ qa: boolean; alerts: boolean; fd: boolean; investments: boolean }>("/api/consent/", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteUserData: () =>
    request<{ message: string }>("/api/consent/user/data", { method: "DELETE" }),

  // Chat
  chat: (data: { message: string; conversation_id?: string }) =>
    request<{ reply: string; metadata?: Record<string, unknown>; conversation_id: string }>("/api/chat/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  chatHistory: (conversation_id?: string) =>
    request<{ messages: { role: string; content: string; created_at: string }[] }>(
      `/api/chat/history${conversation_id ? `?conversation_id=${conversation_id}` : ""}`
    ),

  // Banking
  getAccounts: () =>
    request<{ id: string; number: string; type: string; balance: number; label: string }[]>("/api/banking/accounts"),

  getPrimaryAccount: () =>
    request<{ id: string; balance: number; number: string }>("/api/banking/accounts/primary"),

  recommendInvestment: (data: { account_id: string; amount?: number }) =>
    request<{ plan: { fund: string; amount: number; risk: string }[]; total: number; explanation: string }>(
      "/api/banking/investments/recommend",
      { method: "POST", body: JSON.stringify(data) }
    ),

  confirmInvestment: (plan_id: string) =>
    request<{ status: string; txn_id: string; message: string }>("/api/banking/investments/confirm", {
      method: "POST",
      body: JSON.stringify({ plan_id }),
    }),

  // Audit
  getAuditLogs: () =>
    request<{ logs: Record<string, unknown>[] }>("/api/audit/logs"),
};
