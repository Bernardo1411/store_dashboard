const productsAPI = {
  getAllProducts: async () => {
    const result = await fetch("https://dummyjson.com/products");

    const data = await result.json();

    return data;
  },
};

export default productsAPI;
