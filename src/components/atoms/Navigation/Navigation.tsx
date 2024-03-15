import React from "react";
import Image from "next/image";

import styles from "./Navigation.module.css";

function Navigation(): JSX.Element {
  return (
    <div className={styles.container}>
      <Image src="/logo.svg" alt="logo" width={50} height={50} />
    </div>
  );
}

export default Navigation;
