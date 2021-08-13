import { fetchJson } from "./http";

export function bookingApi() {
  const bookApi = {
    listBooks: async () => {
      const res = await fetchJson("/api/orders");
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },

    getBook: async (id) => {
      const res = await fetchJson(`/api/orders/${id}`);
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
  };
}
