import pokeTypes from './utils/pokeTypes';
interface ITypeBadge {
  name: string;
}

export default function TypeBadge({ name }: ITypeBadge) {
  const bgColor =
    pokeTypes.find((type) => type.name === name.toLowerCase())?.color ?? 'blue';

  return (
    <p
      style={{ backgroundColor: bgColor }}
      className='uppercase w-fit rounded-lg py-1 px-2'
    >
      {name}
    </p>
  );
}
