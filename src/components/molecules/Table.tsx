import React, { useState } from "react";

import Button from "../atoms/Button/Button";
import Element from "../atoms/Element/Element";

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

interface TableProps {
  products: Product[];
  deleteProduct: (id: number) => void;
  editProduct: (id: number) => void;
}

function Table({ products, deleteProduct, editProduct }: TableProps) {
  const [pagination, setPagination] = useState(0);

  return (
    products &&
    products.length > 0 && (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Image</th>
              <th>Description</th>
              <th>Discount Percentage</th>
              <th>Price</th>
              <th>Rating</th>
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
                  title={product.title}
                  brand={product.brand}
                  category={product.category}
                  image={product.image}
                  description={product.description}
                  discountOercentage={product.discountOercentage}
                  price={product.price}
                  rating={product.rating}
                  stock={product.stock}
                  deleteProduct={deleteProduct}
                  editProduct={editProduct}
                />
              ))}
          </tbody>
        </table>
        <Button
          onClick={() => setPagination(pagination - 1)}
          disabled={pagination === 0}
        >
          Previous
        </Button>
        {products.length > 0 &&
          new Array(Math.floor(products.length / 6)).fill(0).map((_, index) => (
            <Button
              key={index}
              onClick={() => setPagination(index)}
              disabled={pagination === index}
            >
              {index + 1}
            </Button>
          ))}
        <Button
          onClick={() => setPagination(pagination + 1)}
          disabled={pagination + 1 === Math.floor(products.length / 6)}
        >
          Next
        </Button>
      </div>
    )
  );
}

export default Table;
