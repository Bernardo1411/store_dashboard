"use client";
import React, { useEffect, useState } from "react";

import useProducts from "../hooks/useProducts";

import CardSelector from "@/components/atoms/CardSelectors/CardSelector";
import ProductList from "@/components/molecules/ProductList";
import Select from "@/components/atoms/Select/Select";
import Card from "@/components/atoms/Card/Card";

import styles from "./page.module.css";

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

function Home(): JSX.Element {
  const [order, setOrder] = useState("standard");
  const [category, setCategory] = useState("standard");

  const {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    categoryHandler,
  } = useProducts();

  useEffect(() => {
    if (!products || products.length === 0) fetchProducts();
  }, [products, fetchProducts]);

  return (
    <main className={styles.main}>
      <section>
        <div>
          <h1>Home Page</h1>
          <p>
            Welcome to the home page. This is the place where you can find
            products and categories.
          </p>
        </div>
        <div>
          <h2>Categories</h2>
          {loading && <p>Loading...</p>}
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <CardSelector onClick={() => categoryHandler(category)}>
                  {category}
                </CardSelector>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Products</h2>
          <Select
            items={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            value={category}
            onChange={(value) => setCategory(value)}
          />
          <p>Ordenar</p>
          <Select
            items={[
              {
                value: "priceUp",
                label: "Menor preço",
              },
              {
                value: "priceDown",
                label: "Maior preço",
              },
              {
                value: "alpha",
                label: "Ordem alfabética",
              },
            ]}
            onChange={(value) => setOrder(value)}
            value={order}
          />
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ProductList products={products} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
