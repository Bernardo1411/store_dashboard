import { useState, useEffect } from "react";

import productsAPI from "../../API/product";

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

interface APIResponse {
  products: Product[] ;
}

function useProducts(): any {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data: APIResponse = await productsAPI.getAllProducts();

      setProducts(data.products);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    try {
      const res = await productsAPI.deleteProduct(id);

      const newProducts = products.filter(
        (product: any) => product.id !== res.id
      );

      setProducts(newProducts);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  const editProduct = async (id: number, title: string) => {
    setLoading(true);
    try {
      const res = await productsAPI.putEditProduct(id, title);

      const newProducts = products.map((product: any) =>
        product.id === res.id ? { ...product, ...res } : product
      );

      setProducts(newProducts);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  const addNewProduct = async (product: Product) => {
    setLoading(true);
    try {
      const res = await productsAPI.postAddNewProduct(product);
console.log(res)
      setProducts([...products, res]);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  // Get all categories
  const arrayCategories: string[] = products.map(
    (product: any) => product.category
  );

  // Remove duplicates
  const categories: string[] = Array.from(new Set(arrayCategories));

  const categoryHandler = (category: string) => {
    if (category === "standard") {
      setProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product: any) => product.category === category
      );
      setProducts(filteredProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    categoryHandler,
    deleteProduct,
    editProduct,
    addNewProduct,
  };
}

export default useProducts;
