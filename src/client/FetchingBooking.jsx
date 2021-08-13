export function FetchingBooking() {
  const orderApi = {
    listBooks: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },

    getBook: async (id) => {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
  };
}
