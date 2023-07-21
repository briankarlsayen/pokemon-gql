import React from 'react';
import TypeBadge from './TypeBadge';

interface ITypes {
  __typename: 'string';
  name: 'string';
}

interface IPokemonCard {
  name: string;
  num: number;
  types: ITypes[];
  image: string;
}

export default function PokemonCard({ name, num, types, image }: IPokemonCard) {
  return (
    <div className='border border-300 rounded-lg max-w-[300px] w-full p-4 shadow-lg'>
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>#{num}</p>
      <div>
        {types.map((type) => (
          <TypeBadge key={type.name} name={type.name} />
        ))}
      </div>
    </div>
  );
}
