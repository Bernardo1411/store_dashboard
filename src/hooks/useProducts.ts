import { useState } from "react";

import productsAPI from "../../API/product";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productsAPI.getAllProducts();

      setProducts(data.products);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  // Get all categories
  const arrayCategories: string[] = products.map((product: any) => product.category);

  // Remove duplicates
  const categories: string[] = Array.from(new Set(arrayCategories));

  const categoryHandler = (category: string) => {
    if (category === "standard") {
      setProducts(products);
    } else {
      const filteredProducts = products.filter((product: any) => product.category === category);
      setProducts(filteredProducts);
    }
  }

  return { products, categories, loading, error, fetchProducts, categoryHandler };
}

export default useProducts;
