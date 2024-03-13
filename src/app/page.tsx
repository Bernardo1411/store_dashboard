"use client";
import React, { useState } from "react";

import useProducts from "../hooks/useProducts";

import CardSelector from "@/components/atoms/CardSelectors/CardSelector";
import Table from "@/components/molecules/Table";
import Select from "@/components/atoms/Select/Select";
import Modal from "@/container/Modal";
import Button from "@/components/atoms/Button/Button";

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
  const [id, setId] = useState(0);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);

  const {
    products,
    categories,
    loading,
    error,
    categoryHandler,
    deleteProduct,
    editProduct,
    addNewProduct,
  } = useProducts();

  return (
    <main className={styles.main}>
      <section>
        {modalEdit && (
          <Modal>
            <Button onClick={() => setModalEdit(false)}>Close</Button>
            <Button onClick={() => editProduct(id, "iphone 10")}>Save</Button>
          </Modal>
        )}
        {modalCreate && (
          <Modal>
            <Button onClick={() => setModalCreate(false)}>Close</Button>
            <Button
              onClick={() =>
                addNewProduct({
                  title: "iphone 10",
                  brand: "epou",
                  category: "smartphone",
                  image: "https://dummyimage.com/600x400/000/fff",
                  description: "iphone 10",
                  discountOercentage: 0,
                  price: 1000,
                  rating: 5,
                  stock: 100,
                })
              }
            >
              Save
            </Button>
          </Modal>
        )}
        <div>
          <h1>Home Page</h1>
          <p>
            Welcome to the home page. This is the place where you can find
            products and categories.
          </p>
          <Button onClick={() => setModalCreate((oldState) => !oldState)}>
            Add new product
          </Button>
        </div>
        <div>
          <h2>Categories</h2>
          {loading && <p>Loading...</p>}
          <ul>
            {categories.map((category: string) => (
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
            items={categories.map((category: string) => ({
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
            <Table
              products={products}
              deleteProduct={deleteProduct}
              editProduct={(id: number) => {
                setId(id);
                setModalEdit((oldState) => !oldState);
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
