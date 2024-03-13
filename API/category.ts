const categoryAPI = {
  getCategories: () => {
    return fetch("https://dummyjson.com/products/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default categoryAPI;
