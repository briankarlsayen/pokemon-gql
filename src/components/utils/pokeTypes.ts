interface IPokeType {
  name: string;
  color: string;
  textColor: string;
}

const defaultTextColor = '#fff';

const pokeTypes: IPokeType[] = [
  {
    name: 'water',
    color: '#86BAFF',
    textColor: defaultTextColor,
  },
  {
    name: 'steel',
    color: 'gray',
    textColor: defaultTextColor,
  },
  {
    name: 'grass',
    color: '#9BCC50',
    textColor: defaultTextColor,
  },
  {
    name: 'poison',
    color: '#B97FC9',
    textColor: defaultTextColor,
  },
  {
    name: 'fire',
    color: '#FF5F3E',
    textColor: defaultTextColor,
  },
  {
    name: 'flying',
    color: '#5F52BE',
    textColor: defaultTextColor,
  },
  {
    name: 'dragon',
    color: '#8A7BEC',
    textColor: defaultTextColor,
  },
  {
    name: 'bug',
    color: '#AABB22',
    textColor: defaultTextColor,
  },
  {
    name: 'normal',
    color: '#B7B6A3',
    textColor: defaultTextColor,
  },
  {
    name: 'dark',
    color: '#FFFFFF',
    textColor: defaultTextColor,
  },
  {
    name: 'dark',
    color: '#8B6D5B',
    textColor: defaultTextColor,
  },
  {
    name: 'electric',
    color: '#FFCC33',
    textColor: defaultTextColor,
  },
  {
    name: 'psychic',
    color: '#FF6DA3',
    textColor: defaultTextColor,
  },
  {
    name: 'ground',
    color: '#E2C469',
    textColor: defaultTextColor,
  },
];

export default pokeTypes;
