import React, { useState } from "react";

import Button from "../atoms/Button/Button";
import Element from "../atoms/Element/Element";

import styles from "./Table.module.css";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  images: string[];
  description: string;
  discountPercentage: number;
  price: number;
  rating: number;
  stock: number;
}

interface TableProps {
  products: Product[];
  deleteProduct: (id: number) => void;
  editProduct: (id: number) => void;
  orderProductsByTitle: () => void;
  orderProductsByBrand: () => void;
}

function Table({
  products,
  deleteProduct,
  editProduct,
  orderProductsByTitle,
  orderProductsByBrand,
}: TableProps) {
  const [pagination, setPagination] = useState(0);

  return (
    products &&
    products.length > 0 && (
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>
                Title
                <button style={{
                  backgroundColor: '#00000000',
                  border: 'none',
                  }}
                  onClick={orderProductsByTitle}
                  >
                <Image
                  src="/arrows-up-down.png"
                  width={15}
                  height={15}
                  alt="arrow up and down"
                />
                </button>
              </th>
              <th>Description</th>
              <th>
                Brand
                <button style={{
                  backgroundColor: '#00000000',
                  border: 'none',
                  }}
                  onClick={orderProductsByBrand}
                  >
                <Image
                  src="/arrows-up-down.png"
                  width={15}
                  height={15}
                  alt="arrow up and down"
                />
                </button>
              </th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Discount Percentage</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products
              .slice(0 + pagination * 6, 6 + pagination * 6)
              .map((product) => (
                <Element
                  key={product.id}
                  id={product.id}
                  image={product.images[0]}
                  title={product.title}
                  brand={product.brand}
                  category={product.category}
                  description={product.description}
                  discountPercentage={product.discountPercentage}
                  price={product.price}
                  rating={product.rating}
                  stock={product.stock}
                  deleteProduct={deleteProduct}
                  editProduct={editProduct}
                />
              ))}
          </tbody>
        </table>
        <div className={styles.div_buttons}>
          {Math.floor(products.length / 6) > 0 && <Button
            squareButton
            onClick={() => setPagination(pagination - 1)}
            disabled={pagination === 0}
          >
            {"<"}
          </Button>}
          {products.length > 0 &&
            new Array(Math.floor(products.length / 6))
              .fill(0)
              .map((_, index) => (
                <Button
                  key={index}
                  squareButton
                  onClick={() => setPagination(index)}
                  disabled={pagination === index}
                >
                  {index + 1}
                </Button>
              ))}
          {Math.floor(products.length / 6) > 0 && <Button
            onClick={() => setPagination(pagination + 1)}
            squareButton
            disabled={pagination + 1 === Math.floor(products.length / 6)}
          >
            {">"}
          </Button>}
        </div>
      </div>
    )
  );
}

export default Table;
