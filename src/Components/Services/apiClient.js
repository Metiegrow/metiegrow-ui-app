export const apiClient = {
  async postJson(url, body, headers = {}) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  },

  async postMultipartJson(url, jsonKey, jsonBody, files = {}, headers = {}) {
    const form = new FormData();
    form.append(jsonKey, new Blob([JSON.stringify(jsonBody)], { type: 'application/json' }));
    Object.entries(files).forEach(([key, file]) => {
      if (file) form.append(key, file);
    });
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  },
};

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL_BACKEND;
}
