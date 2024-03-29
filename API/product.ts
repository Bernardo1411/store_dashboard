interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  discountOercentage: number;
  price: number;
  rating: number;
  stock: number;
}

const productsAPI = {
  getAllProducts: async () => {
    const result = await fetch("https://dummyjson.com/products");

    const data = await result.json();

    return data;
  },

  deleteProduct: async (id: number) => {
    const result = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });

    const data = await result.json();

    return data;
  },

  putEditProduct: async (id: number, title: string) => {
    const result = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  },
  postAddNewProduct: async (product: Product) => {
    const result = await fetch(`https://dummyjson.com/products/add`, {
      method: "POST",
      body: JSON.stringify({
        ...product,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    return data;
  },
  getCategories: async () => {
    const result = await fetch("https://dummyjson.com/products/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = result.json();

    return data;
  },

  getProductsByCategory: async (category: string) => {
    const result = await fetch(
      `https://dummyjson.com/products/category/${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = result.json();

    return data;
  },

  getSearchedProducts: async (search: string) => {
    const result = await fetch(
      `https://dummyjson.com/products/search?q=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = result.json();

    return data;
  }

};

export default productsAPI;
