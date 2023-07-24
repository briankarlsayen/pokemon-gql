import pokeTypes from './utils/pokeTypes';
interface ITypeBadge {
  name: string;
}

export default function TypeBadge({ name }: ITypeBadge) {
  const { color, textColor } =
    pokeTypes.find((type) => type.name === name.toLowerCase()) ?? {};

  return (
    <p
      style={{ backgroundColor: color, color: textColor }}
      className='uppercase w-fit rounded-lg py-1 px-2'
    >
      {name}
    </p>
  );
}
