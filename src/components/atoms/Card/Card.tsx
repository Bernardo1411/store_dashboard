import React from "react";
import Image from "next/image";

import styles from "./Card.module.css";

interface CardProps {
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
}

function Card({
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
}: CardProps): JSX.Element {
  return (
    <div>
      <div className={styles.image_container}>
        <Image
          fill
          src={image}
          alt={title}
          sizes="100px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVSURBVHgBY+zu7v7PAAVMDEgAhQMAX74CpgpXNjAAAAAASUVORK5CYII="
        />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{brand}</p>
      <p>{category}</p>
      <p>{price}</p>
      <p>{stock}</p>
      <p>{rating}</p>
      <p>{discountOercentage}</p>
    </div>
  );
}

export default Card;
