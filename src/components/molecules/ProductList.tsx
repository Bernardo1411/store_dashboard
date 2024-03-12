import React, { useState } from "react";

import Button from "../atoms/Button/Button";
import Card from "../atoms/Card/Card";

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

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  const [pagination, setPagination] = useState(0);

  console.log(pagination)

  return (
    products &&
    products.length > 0 && (
      <div>
        <ul>
          {products
            .slice(0 + pagination * 6, 6 + pagination * 6)
            .map((product) => (
              <li key={product.id}>
                <Card
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
                />
              </li>
            ))}
        </ul>
        <Button
          onClick={() => setPagination(pagination - 1)}
          disabled={pagination === 0}
        >
          Previous
        </Button>
        {products.length > 0 &&
          new Array(products.length / 6).fill(0).map((_, index) => (
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
          disabled={pagination === Math.floor(products.length / 6)}
        >
          Next
        </Button>
      </div>
    )
  );
}

export default ProductList;
