import React from "react";

interface CardSelectorsProps {
  children: string | JSX.Element | any;
  onClick: () => void;
}

function CardSelectors({ children, onClick }: CardSelectorsProps): JSX.Element {
  return (
    <button onClick={onClick}>
      <span>{children}</span>
    </button>
  );
}

export default CardSelectors;
