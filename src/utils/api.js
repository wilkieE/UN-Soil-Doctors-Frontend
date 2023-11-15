// src/utils/api.js
//TODO check all api responses for 401 and token expired and redirect to login page
async function apiRequest(endpoint, method = "GET", body = null, params = {}) {
  const token = localStorage.getItem("token");
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

  // Add params to the URL
  if (Object.keys(params).length) {
    const query = new URLSearchParams(params).toString();
    url = `${url}?${query}`;
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw { response: { status: response.status } };
  }

  const data = await response.json();
  return data;
}

export default apiRequest;
