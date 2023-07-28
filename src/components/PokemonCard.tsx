import TypeBadge from './TypeBadge';
import Image from './Image';
import { ITypes } from './types';

export interface IPokemonCard {
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
      className='rounded-lg sm:max-w-[300px] max-w-full w-full p-4 shadow-lg h-[300px] flex flex-col cursor-pointer card-container'
      onClick={() => onClick(name)}
    >
      <div className='flex h-full w-full flex-1 items-center justify-center'>
        <Image name={name} src={image} />
      </div>
      <div className='basis-1/3 text-center'>
        <p className='capitalize'>{name}</p>
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
