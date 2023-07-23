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
  onClick: any;
}

export default function PokemonCard({
  name,
  num,
  types,
  image,
  onClick,
}: IPokemonCard) {
  return (
    <div
      className='border border-300 rounded-lg max-w-[300px] w-full p-4 shadow-lg min-h-[300px] h-full flex flex-col hover:bg-slate-50 cursor-pointer'
      onClick={() => onClick(name)}
    >
      <div className='flex h-full w-full flex-1 items-center justify-center'>
        <img src={image} alt={name} />
      </div>
      <div className='basis-1/3 text-center'>
        <h4 className='capitalize'>{name}</h4>
        <p>#{num}</p>
        <div className='flex gap-2 justify-center'>
          {types.map((type) => (
            <TypeBadge key={type.name} name={type.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
