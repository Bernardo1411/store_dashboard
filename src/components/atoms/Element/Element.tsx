import React from "react";
import Image from "next/image";
import useProducts from "@/hooks/useProducts";

import Button from "../Button/Button";

import styles from "./Element.module.css";

interface ElementProps {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  discountOercentage: number;
  price: number;
  rating: number;
  stock: number;
  deleteProduct: (id: number) => void;
  editProduct: (id: number) => void;
}

function Element({
  id,
  title,
  brand,
  category,
  description,
  image,
  discountOercentage,
  price,
  rating,
  stock,
  deleteProduct,
  editProduct,
}: ElementProps): JSX.Element {

  return (
    <tr>
      <td>
        <div className={styles.image_container}>
          {image && (
            <Image
              fill
              src={image}
              alt={title}
              sizes="100px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVSURBVHgBY+zu7v7PAAVMDEgAhQMAX74CpgpXNjAAAAAASUVORK5CYII="
            />
          )}
        </div>
      </td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{brand}</td>
      <td>{category}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td>{rating}</td>
      <td>{discountOercentage}</td>
      <td>{id}</td>
      <td>
        <Button onClick={() => deleteProduct(id)}>Delete</Button>
        <Button onClick={() => editProduct(id)}>Edit</Button>
      </td>
    </tr>
  );
}

export default Element;
