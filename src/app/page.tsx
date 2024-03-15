"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

import useProducts from "../hooks/useProducts";

import Table from "@/components/molecules/Table";
import Select from "@/components/atoms/Select/Select";
import Modal from "@/container/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/input/Input";
import Toastfy from "@/components/atoms/Toastyfy/Toastfy";

import styles from "./page.module.css";

function Home(): JSX.Element {
  const [category, setCategory] = useState<string>("default");
  const [id, setId] = useState<number>(0);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [categoryProduct, setCategoryProduct] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  const {
    products,
    categories,
    loading,
    error,
    deleteProduct,
    editProduct,
    addNewProduct,
    getProductsByCategory,
    orderProductsByTitle,
    orderProductsByBrand,
    searchProducts,
  } = useProducts();

  const handleEditProduct = async () => {
    if (!title) {
      toast.error("Preencha o campo");
      return;
    }

    await editProduct(id, title);
    setModalEdit(false);
    setTitle("");
  };

  const handleAddNewProduct = async () => {
    if (!title || !brand || !categoryProduct || !image || !description) {
      toast.error("Preencha todos os campos");
      return;
    }

    await addNewProduct({
      title,
      brand,
      category: categoryProduct,
      image,
      description,
      discountPercentage,
      price,
      rating,
      stock,
    });

    setModalCreate(false);
    setTitle("");
    setBrand("");
    setCategoryProduct("");
    setImage("");
    setDescription("");
    setDiscountPercentage(0);
    setPrice(0);
    setRating(0);
    setStock(0);
  };

  return (
    <main className={styles.main}>
      <Toastfy />
      <section className={styles.section}>
        <Modal showModal={modalEdit} title="Insira um novo título">
          <Input
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Título"
            value={title}
          />
          <div>
            <Button
              stylesButton={{ width: "100px", marginRight: "10px" }}
              onClick={() => setModalEdit(false)}
            >
              Cancelar
            </Button>
            <Button
              stylesButton={{ width: "100px" }}
              onClick={handleEditProduct}
            >
              Editar
            </Button>
          </div>
        </Modal>
        <Modal showModal={modalCreate} title="Criar novo produto">
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Input
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Título"
              value={title}
              styleInput={{ marginRight: "10px" }}
            />
            <Input
              onChange={(event) => setBrand(event.target.value)}
              type="text"
              placeholder="Marca"
              value={brand}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Input
              onChange={(event) => setCategoryProduct(event.target.value)}
              type="text"
              placeholder="Categoria"
              value={categoryProduct}
              styleInput={{ marginRight: "10px" }}
            />
            <Input
              onChange={(event) => setRating(Number(event.target.value))}
              type="number"
              placeholder="Avaliação"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Input
              onChange={(event) => setDescription(event.target.value)}
              type="text"
              placeholder="Descrição"
              value={description}
              styleInput={{ marginRight: "10px" }}
            />
            <Input
              onChange={(event) =>
                setDiscountPercentage(Number(event.target.value))
              }
              type="number"
              placeholder="Desconto"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Input
              onChange={(event) => setPrice(Number(event.target.value))}
              type="number"
              placeholder="Preço"
              styleInput={{ marginRight: "10px" }}
            />
            <Input
              onChange={(event) => setStock(Number(event.target.value))}
              type="number"
              placeholder="Estoque"
            />
          </div>
          <Input
            onChange={(event) => setImage(event.target.value)}
            type="text"
            placeholder="Imagem"
            value={image}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button onClick={() => setModalCreate(false)}>Cancelar</Button>
            <Button onClick={handleAddNewProduct}>Salvar</Button>
          </div>
        </Modal>
        <div className={styles.head_div}>
          <h1>Dashboard</h1>
          <Button onClick={() => setModalCreate((oldState) => !oldState)}>
            Add new product
          </Button>
        </div>
        <div className={styles.div_conifg}>
          <Select
            items={categories.map((category: string) => ({
              value: category,
              label: category,
            }))}
            value={category}
            onChange={(value) => getProductsByCategory(value)}
            defaultOption="Selecione categoria"
            stylesSelect={{ marginRight: "20px" }}
          />
          <Input
            type="text"
            placeholder="Pesquisar"
            onChange={(event) => setSearch(event.target.value)}
            handleKeyDown={(event) => {
              if (event.key === "Enter") {
                searchProducts(search);
              }
            }}
            styleInput={{ width: "290px", height: "35px", marginBottom: "0px" }}
          />
        </div>
      </section>
      <section>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <Table
            orderProductsByTitle={orderProductsByTitle}
            orderProductsByBrand={orderProductsByBrand}
            products={products}
            deleteProduct={deleteProduct}
            editProduct={(id: number) => {
              setId(id);
              setModalEdit((oldState) => !oldState);
            }}
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
