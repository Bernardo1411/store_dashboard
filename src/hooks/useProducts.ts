import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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
  products: Product[];
}

function useProducts(): any {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data: APIResponse = await productsAPI.getAllProducts();

      setProducts(data.products);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast.error("Erro ao carregar produtos");
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
      toast.success("Produto deletado com sucesso!");
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast.error("Erro ao deletar produto");
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
      toast.success("Produto editado com sucesso!");
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast.error("Erro ao editar produto");
    }
  };

  const addNewProduct = async (product: Product) => {
    setLoading(true);
    
    try {
      const res = await productsAPI.postAddNewProduct(product);

      setProducts([...products, res]);
      setLoading(false);
      toast.success("Produto adicionado com sucesso!");
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast.error("Erro ao adicionar produto");
    }
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await productsAPI.getCategories();

      setCategories(res);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast.error("Erro ao carregar categorias");
    }
  };

  const getProductsByCategory = async (category: string) => {
    setLoading(true);
    try {
      const res = await productsAPI.getProductsByCategory(category);

      setProducts(res.products);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast.error("Erro ao carregar produtos");
    }
  };

  const orderProductsByTitle = () => {
    setLoading(true);
    try {
      const newProducts = products.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      setProducts([...newProducts]);

      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  }

  const orderProductsByBrand = () => {
    setLoading(true);
    try {
      const newProducts = products.sort((a, b) => {
        if (a.brand < b.brand) {
          return -1;
        }
        if (a.brand > b.brand) {
          return 1;
        }
        return 0;
      });

      setProducts([...newProducts]);

      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  }

  const searchProducts = async (search: string) => {
    setLoading(true);
    try {
      const res = await productsAPI.getSearchedProducts(search);

      setProducts(res.products);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      toast.error("Erro ao buscar produtos");
    }
  }

  useEffect(() => {
    fetchProducts();

    getCategories();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    deleteProduct,
    editProduct,
    addNewProduct,
    searchProducts,
    getProductsByCategory,
    orderProductsByTitle,
    orderProductsByBrand,
  };
}

export default useProducts;
