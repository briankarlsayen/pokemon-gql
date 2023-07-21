import React from 'react';
import pokeTypes from './utils/pokeTypes';
interface ITypeBadge {
  name: string;
}

export default function TypeBadge({ name }: ITypeBadge) {
  const bgColor = pokeTypes.find((type) => type.name === name)?.color;
  console.log('bgColor', bgColor);
  return (
    <p className={`uppercase bg-[${bgColor}] w-fit rounded-lg py-1 px-2`}>
      {name}
    </p>
  );
}
